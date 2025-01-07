import * as cdk from 'aws-cdk-lib';
import * as sqs from 'aws-cdk-lib/aws-sqs';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as iam from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';

export class LanguageSpecificStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const vpc = new ec2.Vpc(this, 'CodeExecutionVPC', {
      maxAzs: 2
    });

    const cluster = new ecs.Cluster(this, 'CodeExecutionCluster', {
      vpc,
      containerInsights: true
    });

    // Create language-specific queues and services
    const languages = ['javascript', 'java', 'cpp', 'golang'];
    
    languages.forEach(language => {
      // Queue for each language
      const dlq = new sqs.Queue(this, `${language}DLQ`, {
        queueName: `${language}-execution-dlq`
      });

      const queue = new sqs.Queue(this, `${language}Queue`, {
        queueName: `${language}-execution-queue`,
        deadLetterQueue: {
          queue: dlq,
          maxReceiveCount: 3
        }
      });

      // Task role for each language service
      const taskRole = new iam.Role(this, `${language}TaskRole`, {
        assumedBy: new iam.ServicePrincipal('ecs-tasks.amazonaws.com')
      });
      queue.grantConsumeMessages(taskRole);

      // Task definition for each language
      const taskDef = new ecs.FargateTaskDefinition(this, `${language}TaskDef`, {
        memoryLimitMiB: this.getMemoryForLanguage(language),
        cpu: this.getCpuForLanguage(language),
        taskRole
      });

      // Language-specific container
      taskDef.addContainer(`${language}Container`, {
        image: ecs.ContainerImage.fromAsset(`../docker/${language}`),
        logging: new ecs.AwsLogDriver({
          streamPrefix: `code-execution-${language}`
        }),
        environment: {
          QUEUE_URL: queue.queueUrl,
          LANGUAGE: language
        }
      });

      // Service for each language
      const service = new ecs.FargateService(this, `${language}Service`, {
        cluster,
        taskDefinition: taskDef,
        desiredCount: 1,
        minHealthyPercent: 50,
        maxHealthyPercent: 200
      });

      // Auto-scaling based on queue depth
      const scaling = service.autoScaleTaskCount({
        minCapacity: 1,
        maxCapacity: 5
      });

      scaling.scaleOnMetric(`${language}Scaling`, {
        metric: queue.metricApproximateNumberOfMessagesVisible(),
        scalingSteps: [
          { upper: 0, change: -1 },
          { lower: 5, change: +1 },
          { lower: 20, change: +2 }
        ]
      });
    });
  }

  private getMemoryForLanguage(language: string): number {
    const memoryMap: { [key: string]: number } = {
      javascript: 1024,
      java: 2048,
      cpp: 1024,
      golang: 1024
    };
    return memoryMap[language] || 1024;
  }

  private getCpuForLanguage(language: string): number {
    const cpuMap: { [key: string]: number } = {
      javascript: 512,
      java: 1024,
      cpp: 512,
      golang: 512
    };
    return cpuMap[language] || 512;
  }
}