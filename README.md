# Appointy – Doctor Appointment Management System

Appointy is a full-stack **MERN-based Doctor Appointment Management System** that connects patients with doctors through an easy-to-use web application.

The system provides separate interfaces for **Patients, Doctors, and Administrators**. Patients can search for doctors and book appointments, doctors can manage their appointments and availability, and administrators can manage doctors and the overall platform.

---

## 🚀 Features

### 👨‍⚕️ Patient

* User registration and login
* Browse available doctors
* Search and filter doctors
* View doctor profiles and details
* Book appointments
* View booked appointments
* Cancel appointments
* View appointment history
* Manage personal profile
* Online payment using Razorpay

### 🩺 Doctor

* Doctor login
* Doctor dashboard
* View scheduled appointments
* Manage appointments
* Mark appointments as completed
* Cancel appointments
* View earnings
* Manage doctor profile
* Manage availability

### 👨‍💼 Admin

* Admin dashboard
* View platform statistics
* Add doctors
* Edit doctor information
* Delete doctors
* View all appointments
* Manage appointments
* Manage doctors and users

---

## 🛠️ Technologies Used

### Frontend

* React.js
* Vite
* JavaScript
* HTML5
* CSS3
* Axios
* React Router

### Backend

* Node.js
* Express.js
* REST API
* JWT Authentication
* bcrypt

### Database

* MongoDB
* Mongoose

### Payment

* Razorpay

### Image Management

* Cloudinary

### Development Tools

* Git
* GitHub
* VS Code
* npm
* Postman

---

## 🏗️ Project Architecture

The project is divided into three major applications:

```text
                 ┌─────────────────────┐
                 │       Patient       │
                 │      Frontend       │
                 └──────────┬──────────┘
                            │
                            │ REST API
                            ▼
                 ┌─────────────────────┐
                 │       Backend       │
                 │ Node.js + Express   │
                 └──────────┬──────────┘
                            │
                            ▼
                 ┌─────────────────────┐
                 │      MongoDB        │
                 │      Database       │
                 └─────────────────────┘
                            ▲
                            │
                 ┌──────────┴──────────┐
                 │                     │
        ┌────────┴─────────┐  ┌────────┴─────────┐
        │   Doctor/Admin   │  │     Services     │
        │      Panel       │  │ Razorpay/Cloudinary│
        └──────────────────┘  └──────────────────┘
```

---

## 📂 Project Structure

```text
Appointy/
│
├── frontend/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   └── App.jsx
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── admin/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── App.jsx
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```



---

# 🔄 How the Application Works

## 1. Patient Registration/Login

A patient creates an account using the frontend application.

The frontend sends the user's information to the backend through an API request.

The backend:

1. Validates the input.
2. Checks whether the user already exists.
3. Hashes the password using bcrypt.
4. Stores the user in MongoDB.
5. Generates a JWT token for authentication.

The token is then used for authenticated requests.

---

## 2. Finding a Doctor

After logging in, the patient can browse available doctors.

The application displays information such as:

* Doctor name
* Specialization
* Experience
* Fees
* Availability
* Profile image
* Address

Patients can search/filter doctors according to their requirements.

---

## 3. Booking an Appointment

When a patient selects a doctor and available time slot:

```text
Patient
   ↓
Select Doctor
   ↓
Select Date & Time
   ↓
Book Appointment
   ↓
Backend API
   ↓
MongoDB
   ↓
Appointment Created
```

The appointment information is stored in MongoDB.

---

## 4. Payment

The application supports **Razorpay** for online appointment payments.

The general flow is:

```text
Patient
   ↓
Book Appointment
   ↓
Payment Request
   ↓
Razorpay
   ↓
Payment Verification
   ↓
Appointment Payment Updated
```

Razorpay credentials are configured through environment variables.

---

## 5. Doctor Dashboard

Doctors have a separate dashboard where they can:

* View appointments
* Manage appointments
* Cancel appointments
* Complete appointments
* View earnings
* Update profile
* Manage availability

The doctor dashboard communicates with the backend using REST APIs.

---

## 6. Admin Dashboard

The administrator has a separate panel for managing the application.

Admin can:

* Add doctors
* Edit doctors
* Delete doctors
* View doctors
* View appointments
* Manage appointments
* View application statistics

This allows the administrator to control the overall platform.

---

# 🔐 Authentication & Security

The project uses **JWT (JSON Web Token)** for authentication.

Passwords are protected using **bcrypt hashing**.

The basic authentication flow is:

```text
Login
  ↓
Backend validates credentials
  ↓
JWT Token Generated
  ↓
Token sent to Client
  ↓
Token stored by Frontend
  ↓
Token sent with protected API requests
  ↓
Backend verifies Token
  ↓
Request Allowed
```

Sensitive configuration such as database credentials and API keys is stored inside `.env`.

---

# 🗄️ Database

The project uses **MongoDB** as its database with **Mongoose** for database interaction.

The application contains models for important entities such as:

* Users
* Doctors
* Appointments

The backend uses Mongoose to create, read, update, and delete application data.

---

# 🌐 REST API

The backend is built using **Node.js and Express.js**.

The frontend communicates with the backend through REST APIs.

Examples of operations include:

```text
User Registration
User Login
Get Doctors
Get Doctor Profile
Book Appointment
Cancel Appointment
Get User Appointments
Update User Profile
Doctor Appointment Management
Admin Doctor Management
```

---

# ☁️ Cloudinary

Cloudinary is used for managing and storing images such as doctor profile images.

Instead of storing large image files directly in the database, the application can upload images to Cloudinary and store the corresponding image URL.

---

# ⚙️ Installation & Setup

## Prerequisites

Before running the project, install:

* Node.js
* npm
* MongoDB / MongoDB Atlas
* Git

---

## 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

Move into the project directory:

```bash
cd Appointy
```

---

# 2. Backend Setup

Open a terminal in VS Code:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file inside the `backend` folder.

Example:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=

CURRENCY=INR
PORT=4000
```

If Cloudinary is configured in your project, add the required Cloudinary credentials as well.

Start the backend:

```bash
npm run server
```

The backend will run on:

```text
http://localhost:4000
```

---

# 3. Frontend Setup

Open another VS Code terminal:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the frontend:

```bash
npm run dev
```

The frontend will normally run on:

```text
http://localhost:5173
```

---

# 4. Admin Panel Setup

Open another terminal:

```bash
cd admin
```

Install dependencies:

```bash
npm install
```

Start the admin panel:

```bash
npm run dev
```

The admin panel will normally run on:

```text
http://localhost:5174
```

---

# ▶️ Running the Complete Project

You need to run **three terminals** in VS Code.

### Terminal 1 – Backend

```bash
cd backend
npm run server
```

### Terminal 2 – Patient Frontend

```bash
cd frontend
npm run dev
```

### Terminal 3 – Admin/Doctor Panel

```bash
cd admin
npm run dev
```

Then open the frontend URL in your browser.

---

# 🔑 Environment Variables

The backend requires environment variables for configuration.

Example:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
CURRENCY=INR
PORT=4000
```

### Important

Never upload your real `.env` file to GitHub.

Add the following to `.gitignore`:

```gitignore
node_modules/
.env
.env.*
dist/
```

---

# 📸 Application Modules

The application consists of three main user interfaces:

### Patient Application

Patients can:

* Register/login
* Find doctors
* View doctor information
* Book appointments
* Make payments
* Manage appointments
* Update their profile

### Doctor Panel

Doctors can:

* Login
* View appointments
* Manage appointment status
* View earnings
* Update profile
* Manage availability

### Admin Panel

Admins can:

* Manage doctors
* Manage appointments
* Add/update/delete doctors
* View platform information
* Monitor application activity

---

# 🎯 Main Learning Outcomes

This project helped demonstrate practical experience with:

* MERN stack development
* React component-based development
* REST API development
* Express.js backend development
* MongoDB database management
* Mongoose
* JWT authentication
* Password hashing with bcrypt
* Role-based access
* API integration
* Appointment management
* Payment gateway integration
* Cloud image management
* Git and GitHub
* Environment variable configuration

---

# 🚀 Future Improvements

Some features that can be added in future versions:

* Email notifications
* SMS appointment reminders
* Video consultation
* Doctor reviews and ratings
* Prescription management
* Medical history
* Advanced admin analytics
* Appointment reminder notifications
* Improved mobile responsiveness

---

# 👨‍💻 Author

**Triyan Gupta**

Final Year B.Tech – Computer Science & Engineering

Interested in:

* Software Development
* Full Stack Development
* Data Structures & Algorithms
* Machine Learning

---

## ⭐ Project Purpose

Appointy was developed as a full-stack web development project to understand how a real-world appointment management system can be designed using the MERN stack.

The project demonstrates the complete flow from **frontend interaction → REST API → backend processing → database operations**, along with authentication, appointment management, payment integration, and separate dashboards for different users.
