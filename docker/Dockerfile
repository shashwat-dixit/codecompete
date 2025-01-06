# JavaScript (docker/javascript/Dockerfile)
FROM node:18-slim
RUN useradd -m -s /bin/bash coder
WORKDIR /home/coder
COPY --chown=coder:coder scripts/execute.sh /home/coder/execute.sh
USER coder
ENV MAX_MEMORY=1024M
CMD ["node", "worker.js"]

# Java (docker/java/Dockerfile)
FROM openjdk:17-slim
RUN useradd -m -s /bin/bash coder
WORKDIR /home/coder
COPY --chown=coder:coder scripts/execute.sh /home/coder/execute.sh
USER coder
ENV MAX_MEMORY=2048M
CMD ["java", "Worker.java"]

# C++ (docker/cpp/Dockerfile)
FROM gcc:latest
RUN useradd -m -s /bin/bash coder
WORKDIR /home/coder
COPY --chown=coder:coder scripts/execute.sh /home/coder/execute.sh
USER coder
ENV MAX_MEMORY=1024M
CMD ["./worker"]

# Golang (docker/golang/Dockerfile)
FROM golang:1.21-alpine
RUN adduser -D coder
WORKDIR /home/coder
COPY --chown=coder:coder scripts/execute.sh /home/coder/execute.sh
USER coder
ENV MAX_MEMORY=1024M
CMD ["./worker"]
