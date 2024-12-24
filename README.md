# Task Manager
This project allows a user to create, update and delete his own tasks.

## Features

### User Authentication
- **Signup Page**: A registration api for new users.
- **Login Page**: A login api for existing users. 

### User Profile
- **Profile**: user can see his details

### Backend Security
- **Role-Based Access Control**: Routes are protected based on user roles
- **JWT Middleware**: Secures routes that require authentication.
- **Password Hashing**: Passwords are hashed using bcrypt before being saved to the database.
 
## Tech Stack 
- **Backend**: Node.js, Express, MongoDB.
- **Authentication**: JWT (JSON Web Tokens) 

## Installation Guide:

1. Clone the repository:
   ```bash
   git clonehttps://github.com/bazil-1854/Bscs22072_FInal_Exam_Frontend.git
   cd <where-you-cloned>
   ```

   
2. Install dependancies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm run dev
   ```
