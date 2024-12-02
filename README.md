# Code Compete

A real-time competitive coding platform that brings the thrill of TypeRacer to LeetCode-style problems. Challenge other developers in live coding battles, improve your problem-solving speed, and track your progression.

<div align="center">

[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)](https://expressjs.com/)
[![AWS](https://img.shields.io/badge/AWS-232F3E?style=for-the-badge&logo=amazon-aws&logoColor=white)](https://aws.amazon.com/)
[![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
[![WebSocket](https://img.shields.io/badge/WebSocket-010101?style=for-the-badge&logo=socket.io&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket)

</div>


## Features

### 🎮 Live Competitive Coding
- Real-time 5-player lobbies
- ELO-based matchmaking system
- In-game live chat functionality
- Code execution in isolated Docker containers
- Real-time match status updates

### 📊 Performance Analytics
- Detailed post-match analysis
- Skill progression tracking
- Historical match data
- Performance metrics visualization
- Problem-solving speed statistics

## Tech Stack

### Backend
- **Node.js** - Server runtime
- **PostgreSQL** - User data and match history storage
- **AWS S3** - Code storage and submission management
- **AWS SQS** - Message queue for code execution
- **Docker** - Isolated code execution environment
- **LeetCode GraphQL API** - Fetch User Data

### Frontend
- **React + Vite** - UI framework and build tool
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI component library
- **WebSocket** - Real-time updates

### DevOps
- **GitHub Actions** - CI/CD pipeline
- **AWS** - Cloud infrastructure

<!-- ## Architecture

```
├── frontend/                 # React Vite frontend application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API service layers
│   │   └── store/          # State management
│   └── package.json
│
├── backend/                  # Node.js backend services
│   ├── src/
│   │   ├── controllers/    # Request handlers
│   │   ├── models/         # Database models
│   │   ├── services/       # Business logic
│   │   └── utils/          # Helper functions
│   └── package.json
│
├── docker/                   # Docker configuration
│   ├── Dockerfile
│   └── docker-compose.yml
│
└── .github/
    └── workflows/           # GitHub Actions CI/CD
``` -->

## Getting Started

### Prerequisites
- Node.js 18+
- Docker
- PostgreSQL
- AWS Account

### Local Development

1. Clone the repository:
```bash
git clone https://github.com/yourusername/code-compete.git
cd code-compete
```

2. Install dependencies:
```bash
# Frontend
cd frontend
npm install

# Backend
cd ../backend
npm install
```

3. Set up environment variables:
```bash
# Backend .env
DATABASE_URL=postgresql://user:password@localhost:5432/code_compete
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
LEETCODE_API_KEY=your_leetcode_api_key

# Frontend .env
VITE_API_URL=http://localhost:3000
```

4. Start the development servers:
```bash
# Backend
npm run dev

# Frontend
npm run dev
```

### Docker Setup

Run the entire application stack using Docker Compose:

```bash
docker-compose up
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
