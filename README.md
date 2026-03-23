# 📚 Online Course Management System (Frontend)

## 🔹 Description
This is the frontend of the Online Course Management System (OCMS) built using React. It provides an interactive UI for users to register, login, view courses, and enroll in them.

---

## 🚀 Features

### 👨‍🎓 Student
- Register and Login
- View available courses
- Enroll in courses
- View enrolled course content

### 👨‍💼 Admin
- Login as admin
- Create courses
- Delete courses
- Add course content

---

## 🛠 Tech Stack
- React.js
- Axios
- Bootstrap
- JavaScript (ES6)

---

## 📁 Project Structure
src/
├── pages/
│ ├── Courses.js # Displays all courses
│ ├── CourseContent.js # Shows content of selected course
│ ├── MyCourses.js # Displays enrolled courses
│ ├── Login.js # Handles login functionality
│ └── Register.js # Handles user registration
│
├── components/
│ └── Navbar.js # Navigation bar
│
├── App.js # Routing and layout
└── index.js # Entry point


---

## 🔍 Key Components

- **Courses.js**: Fetches and displays all available courses from backend
- **CourseContent.js**: Shows course details and content
- **Login/Register.js**: Handles authentication via backend APIs
- **Navbar.js**: Navigation between pages
- **App.js**: Handles routing and page structure

---

## 🔗 Backend Repository
👉 https://github.com/Jvivekvardhan/OCMS-Backend

---

## ▶️ How to Run

```bash
npm install
npm start
