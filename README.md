# E-commerce SaaS Authentication Service

An authentication service for an e-commerce SaaS platform, supporting user registration, login, and Google social authentication. Built with Node.js, Express, and TypeScript, using MongoDB for data storage.

## Features

- User registration and login (email/password)
- Google social authentication
- Session management with Passport.js
- Input validation using Zod

## Technologies

- **Node.js**
- **Express**
- **TypeScript**
- **MongoDB** (with Mongoose)
- **Passport.js**
- **Zod**

## Getting Started

### Prerequisites

- Node.js (14+)
- MongoDB (local or Atlas)
- Git

### Installation

1. Clone the repository:

   ```bash
   git clone <your-repository-url>
   cd <your-project-directory>
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file:

   ```plaintext
   MONGO_URI=mongodb://localhost:27017/your-database-name
   SESSION_SECRET=your-session-secret
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   ```

### Running the Application

Start the server:

```bash
npm run dev
```

Access the API at `http://localhost:3000`.

### API Endpoints

- `POST /auth/register`: Register a new user
- `POST /auth/login`: Login
- `GET /auth/google`: Start Google authentication
- `GET /auth/google/callback`: Google callback handler

### Contribution

Contributions are welcome! Open issues or submit pull requests.

### License

MIT License - see the [LICENSE](LICENSE) file for details.

### Acknowledgments

- [Passport.js](http://www.passportjs.org/)
- [MongoDB](https://www.mongodb.com/)
- [Express](https://expressjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Zod](https://zod.dev/)
