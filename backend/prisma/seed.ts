import { PrismaClient, Difficulty, SubmissionStatus, QuestionProgressStatus } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

const PROGRAMMING_LANGUAGES = ['javascript', 'python', 'java', 'cpp', 'golang'];
const NUM_USERS = 50;
const NUM_QUESTIONS = 100;
const NUM_SUBMISSIONS_PER_USER = 20;

// Helper to generate random test cases
function generateTestCases() {
  const numTestCases = faker.number.int({ min: 3, max: 10 });
  return Array.from({ length: numTestCases }, (_, i) => ({
    input: faker.lorem.words(3),
    output: faker.lorem.word(),
    isHidden: i > 2  // First 3 test cases are visible
  }));
}

// Helper to generate random categories
function generateCategories() {
  const categories = [
    'arrays', 'strings', 'hash-table', 'dynamic-programming',
    'math', 'depth-first-search', 'sorting', 'greedy',
    'database', 'binary-search', 'breadth-first-search', 'tree'
  ];
  
  const numCategories = faker.number.int({ min: 1, max: 3 });
  return faker.helpers.arrayElements(categories, numCategories);
}

async function updateUserProgress(
  userId: string,
  questionId: string,
  isAccepted: boolean,
  runtime: number | null,
  memory: number | null
) {
  // First, get the existing progress if any
  const existingProgress = await prisma.userQuestionProgress.findUnique({
    where: {
      userId_questionId: {
        userId,
        questionId
      }
    }
  });

  let newBestRuntime: number | null = null;
  if (isAccepted && runtime !== null) {
    if (!existingProgress || existingProgress.bestRuntime === null) {
      newBestRuntime = runtime;
    } else {
      newBestRuntime = Math.min(runtime, existingProgress.bestRuntime);
    }
  }

  let newBestMemory: number | null = null;
  if (isAccepted && memory !== null) {
    if (!existingProgress || existingProgress.bestMemory === null) {
      newBestMemory = memory;
    } else {
      newBestMemory = Math.min(memory, existingProgress.bestMemory);
    }
  }

  return prisma.userQuestionProgress.upsert({
    where: {
      userId_questionId: {
        userId,
        questionId
      }
    },
    create: {
      userId,
      questionId,
      status: isAccepted ? QuestionProgressStatus.SOLVED : QuestionProgressStatus.ATTEMPTED,
      attemptCount: 1,
      bestRuntime: isAccepted ? runtime : null,
      bestMemory: isAccepted ? memory : null,
      lastAttemptAt: new Date()
    },
    update: {
      status: isAccepted ? QuestionProgressStatus.SOLVED : QuestionProgressStatus.ATTEMPTED,
      attemptCount: { increment: 1 },
      bestRuntime: newBestRuntime,
      bestMemory: newBestMemory,
      lastAttemptAt: new Date()
    }
  });
}
async function main() {
  console.log('🌱 Starting seed...');

  // Clear existing data
  await prisma.$transaction([
    prisma.testResult.deleteMany(),
    prisma.userQuestionProgress.deleteMany(),
    prisma.submission.deleteMany(),
    prisma.question.deleteMany(),
    prisma.user.deleteMany(),
  ]);

  // Create users
  console.log('Creating users...');
  const users = await Promise.all(
    Array.from({ length: NUM_USERS }, async () => {
      return prisma.user.create({
        data: {
          username: faker.internet.username(),
          email: faker.internet.email(),
          rating: faker.number.int({ min: 800, max: 2000 })
        }
      });
    })
  );

  // Create questions
  console.log('Creating questions...');
  const questions = await Promise.all(
    Array.from({ length: NUM_QUESTIONS }, async () => {
      const difficulty = faker.helpers.arrayElement(Object.values(Difficulty));
      return prisma.question.create({
        data: {
          title: faker.hacker.phrase().replace(/^./, (letter) => letter.toUpperCase()),
          description: faker.lorem.paragraphs(3),
          difficulty,
          categories: generateCategories(),
          testCases: generateTestCases(),
          timeLimit: faker.number.int({ min: 1000, max: 3000 }),
          memoryLimit: faker.number.int({ min: 128, max: 512 })
        }
      });
    })
  );

  // Create submissions and related data
  console.log('Creating submissions and progress...');
  for (const user of users) {
    for (let i = 0; i < NUM_SUBMISSIONS_PER_USER; i++) {
      const question = faker.helpers.arrayElement(questions);
      const isAccepted = faker.datatype.boolean();
      const language = faker.helpers.arrayElement(PROGRAMMING_LANGUAGES);
      const runtime = isAccepted ? faker.number.int({ min: 100, max: 2000 }) : null;
      const memory = isAccepted ? faker.number.int({ min: 8000, max: 32000 }) : null;
      
      // Create submission
      const submission = await prisma.submission.create({
        data: {
          userId: user.id,
          questionId: question.id,
          code: `// ${language} solution\n${faker.lorem.paragraphs(2)}`,
          language,
          status: isAccepted ? SubmissionStatus.ACCEPTED : faker.helpers.arrayElement([
            SubmissionStatus.WRONG_ANSWER,
            SubmissionStatus.TIME_LIMIT_EXCEEDED,
            SubmissionStatus.RUNTIME_ERROR
          ]),
          runtime,
          memory,
          s3CodeUrl: `s3://leetcode-submissions/${user.id}/${question.id}/${faker.string.uuid()}.${language}`
        }
      });

      // Create test results
      const numTestCases = faker.number.int({ min: 3, max: 8 });
      await Promise.all(
        Array.from({ length: numTestCases }, (_, index) => {
          return prisma.testResult.create({
            data: {
              submissionId: submission.id,
              testCaseNumber: index + 1,
              passed: isAccepted || index < faker.number.int({ min: 0, max: numTestCases - 1 }),
              output: faker.lorem.word(),
              errorMessage: isAccepted ? null : faker.lorem.sentence(),
              executionTime: faker.number.int({ min: 50, max: 1500 }),
              memoryUsed: faker.number.int({ min: 4000, max: 16000 })
            }
          });
        })
      );

      // Update user question progress
      await updateUserProgress(user.id, question.id, isAccepted, runtime, memory);
    }
  }

  console.log('✅ Seed completed!');
  
  // Print some stats
  const stats = await prisma.$transaction([
    prisma.user.count(),
    prisma.question.count(),
    prisma.submission.count(),
    prisma.testResult.count(),
    prisma.userQuestionProgress.count()
  ]);

  console.log('📊 Database statistics:');
  console.log(`Users: ${stats[0]}`);
  console.log(`Questions: ${stats[1]}`);
  console.log(`Submissions: ${stats[2]}`);
  console.log(`Test Results: ${stats[3]}`);
  console.log(`Progress Records: ${stats[4]}`);
}

main()
  .catch((e) => {
    console.error('❌ Error during seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });