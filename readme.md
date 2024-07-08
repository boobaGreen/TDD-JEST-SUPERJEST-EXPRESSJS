# 🚀 Advanced Node.js Testing with Jest and Supertest

![Project Logo](https://example.com/path/to/your/logo.png)

## 📚 Table of Contents

- [🌟 Introduction](#-introduction)
- [🛠️ Installation](#️-installation)
- [🧪 Testing Setup](#-testing-setup)
- [🔍 Running Tests](#-running-tests)
- [📋 Project Structure](#-project-structure)
- [🔐 Authentication System](#-authentication-system)
- [🔄 API Endpoints](#-api-endpoints)
- [📈 Testing Strategies](#-testing-strategies)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

## 🌟 Introduction

This project demonstrates advanced testing techniques for Node.js applications using Jest and Supertest. It showcases best practices for testing Express.js APIs, including authentication, database interactions, and complex business logic.

## 🛠️ Installation

To get started with this project, follow these steps:

1. Clone the repository
2. Install dependencies:

```bash
npm install express mongoose dotenv jsonwebtoken bcryptjs cookie-parser
npm install -D jest supertest
```

3. Install Nodemon globally or as a dev dependency:

```bash
npm install -g nodemon
# or
npm install -D nodemon
```

4. Set up your environment variables in a `.env` file

## 🧪 Testing Setup

This project uses Jest as the testing framework and Supertest for making HTTP assertions. The test setup is configured in `package.json`:

```json
"jest": {
  "setupFilesAfterEnv": [
    "<rootDir>/server/test/setupTest.js"
  ]
}
```

# 🚀 Advanced Node.js Testing with Jest and Supertest

![Project Logo](https://example.com/path/to/your/logo.png)

## 📚 Table of Contents

- [🌟 Introduction](#-introduction)
- [🛠️ Installation](#️-installation)
- [🧪 Testing Setup](#-testing-setup)
- [🔍 Running Tests](#-running-tests)
- [📋 Project Structure](#-project-structure)
- [🔐 Authentication System](#-authentication-system)
- [🔄 API Endpoints](#-api-endpoints)
- [📈 Testing Strategies](#-testing-strategies)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

## 🌟 Introduction

This project demonstrates advanced testing techniques for Node.js applications using Jest and Supertest. It showcases best practices for testing Express.js APIs, including authentication, database interactions, and complex business logic.

## 🛠️ Installation

To get started with this project, follow these steps:

1. Clone the repository
2. Install dependencies:

```bash
npm install express mongoose dotenv jsonwebtoken bcryptjs cookie-parser
npm install -D jest supertest
```

3. Install Nodemon globally or as a dev dependency:

```bash
npm install -g nodemon
# or
npm install -D nodemon
```

4. Set up your environment variables in a `.env` file

## 🧪 Testing Setup

This project uses Jest as the testing framework and Supertest for making HTTP assertions. The test setup is configured in `package.json`:

```json
"jest": {
  "setupFilesAfterEnv": [
    "<rootDir>/server/test/setupTest.js"
  ]
}
```

Our `setupTest.js` file handles:

- Connecting to a test database
- Clearing the database before all tests
- Seeding the database with test users before each test
- Closing the database connection after all tests

##** 🔍 Running Tests**
To run the tests, use the following command:

```bash
npm test
```

Our `setupTest.js` file handles:

- Connecting to a test database
- Clearing the database before all tests
- Seeding the database with test users before each test
- Closing the database connection after all tests

## 🔍 Running Tests

To run the tests, use the following command:

````bash
npm test

This will start Jest in watch mode, allowing you to rerun tests automatically as you make changes to your code.

## 📋 Project Structure

The project follows a modular structure to separate concerns and improve testability:

- `server/`
 - `models/`: Database models (e.g., `userModel.js`)
 - `routes/`: API routes (e.g., `authRoutes.js`)
 - `middleware/`: Custom middleware (e.g., `authMiddleware.js`)
 - `controllers/`: Request handlers (e.g., `authController.js`)
 - `test/`: Test files and utilities
 - `utility/`: Helper functions
 - `config/`: Configuration files (e.g., `db.js`)
- `app.js`: Express application setup
- `server.js`: Server entry point

## 🔐 Authentication System

Our authentication system uses JSON Web Tokens (JWT) for secure user sessions. Key components include:

### User Model (`userModel.js`)
```javascript
const userSchema = new mongoose.Schema({
 name: { type: String, required: true },
 email: { type: String, required: true },
 password: { type: String, required: true },
}, { timestamps: true });
````

### Authentication Middleware (`authMiddleware.js`)

```javascript
const auth = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) return res.status(400).json({ error: "no token found" });
    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(id);
    req.user = user;
    next();
  } catch (error) {
    return res.status(500).json({ error: "invalid credentials" });
  }
};
```

## 🔄 API Endpiunts

The project includes the following API endpoints:

<ol>
<li>
GET /api/auth/register: Get list of users
</li>
<li>
POST /api/auth/register: Create a new user
</li>
<li>
POST /api/auth/login: Login user
</li>
<li>
GET /api/auth/logout: Logout user
</li>
<li>
GET /api/auth/profile: Get user profile (requires authentication)
</li>
</ol>

## Testing Strategies 📈

Our testing strategy includes:

<ol>
<li>
Unit tests for utility functions
</li>
<li>
Integration tests for API endpoints
</li>
<li>
Authentication flow testing
</li>
<li>
Error handling and edge case testing
</li>
</ol>

Key test files:

<ul>
<li>
auth.test.js: Tests for authentication-related endpoints
</li>
<li>
utility.test.js: Tests for utility functions
</li>
</ul>

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.
