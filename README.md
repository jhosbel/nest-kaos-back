# KAOS Backend - Game Room Management System

![NestJS](https://img.shields.io/badge/nestjs-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
![GraphQL](https://img.shields.io/badge/GraphQL-E10098?style=for-the-badge&logo=graphql&logoColor=white)

Backend for the KAOS platform, developed with NestJS, implementing GraphQL and JWT authentication.

## 🚀 Description

A backend system that manages:

- User authentication and authorization
- Competitive game room management
- Economic transaction processing
- Match statistics storage
- Multimedia content administration
- CRUD operations for main entities

## ✨ Key Features

### Core

- JWT Authentication
- GraphQL API with Apollo Server
- SQLite database (development)
- Image upload to Cloudinary
- Role system (User, Moderator, Admin)
- Integrated data validation
- Initial seed data for administrators

### Main Modules

1. **Authentication**

   - User registration/login
   - JWT token renewal
   - Role-based route protection

2. **Users**

   - Full CRUD operations for users
   - Profile management
   - Bank account linking
   - Transaction history

3. **Game Rooms**

   - Room creation/deletion
   - Participant registration
   - Reward calculation
   - Result verification

4. **Transactions**

   - Credit top-ups
   - Fund withdrawals
   - Payment records
   - Transaction verification

5. **Administration**
   - Dashboard for statistics
   - Content management
   - User moderation
   - System auditing

## 🛠 Technologies Used

- **Core:**

  - NestJS
  - GraphQL (Apollo Server)
  - SQLite (TypeORM)
  - JWT
  - Cloudinary SDK

- **Main Dependencies:**
  - @nestjs/graphql
  - @nestjs/jwt
  - @nestjs/passport
  - typeorm
  - graphql-tools
  - bcrypt

## 📌 Prerequisites

  - Node.js v18+
  - npm v9+
  - Cloudinary Account
  - NestJS CLI (`npm i -g @nestjs/cli`)

## 🔧 Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/jhosbel/nest-kaos-back
    cd nest-kaos-back
    ```
2. Install dependencies:

    ```bash
    npm install
    ```
3. Set up environment variables (`.env` file):

    ```bash
    CLOUDINARY_NAME=your-cloudinary-name
    CLOUDINARY_API_KEY=your-cloudinary-api-key
    CLOUDINARY_API_SECRET=your-cloudinary-api-secret
    ```
4. Start the server:

    ```bash
    npm run start:dev
    ```
5. You can test the app with the administrator account:
    ```bash
    User: admin@hotmail.com
    Password: admin123
    ```
## ⚙ Configuration
  **Variables de Entorno**
  | Variable   |      Description      |
  |----------|:-------------:|
  | DATABASE_PATH |  	SQLite file path |
  | JWT_SECRET |    	Secret for signing JWT tokens   |
  | CLOUDINARY_* | Cloudinary credentials |
  | BACKEND_URL | 	Backend base URL |
  | ADMIN_EMAIL/PASSWORD | Initial admin credentials |

## Main Endpoints
- GraphQL Playground: http://localhost:3050/graphql
- Health Check: http://localhost:3050/api/health

## 📄 Project Structure
    /kaos-app-backend
    ├── src
    │   ├── auth
    │   ├── banks
    │   ├── cloudinary
    │   ├── games
    │   ├── rooms
    │   ├── user-banks
    │   ├── user-games
    │   ├── users
    │   ├── users-deposits
    │   ├── app.module.ts
    │   ├── main.ts
    │   ├── shcema.gql
    ├── .env
    ├── database.sqlite
    └── README.md
## 🚨 Production Considerations
  - Replace SQLite with PostgreSQL/MySQL
  - Implement rate limiting
  - Properly configure CORS
  - Use encrypted environment variables
  - Implement a professional logging system
  - Enable HTTPS

## 📄 License
MIT © Jhosbel

Note: This setup is for development. Production requires additional configurations.