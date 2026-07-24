# University Frontend

A modern, responsive ReactJS application for managing university students. This project serves as the frontend for the [University Spring Boot Backend](https://github.com/metodi-velev/university.git).

## 🚀 Overview

The University Frontend provides a clean and intuitive user interface to interact with student records. It allows administrators to view the student list, search for specific students by email, and add new student entries.

## 🔗 Backend Integration

This application is designed to work seamlessly with the Spring Boot Backend project:
**Repository:** [https://github.com/metodi-velev/university.git](https://github.com/metodi-velev/university.git)

By default, the app connects to `http://localhost:8080`. You can configure the backend URL using the `REACT_APP_API_URL` environment variable.

## 🛠 Tech Stack

- **Framework:** [React 18](https://reactjs.org/)
- **UI Components:** [Material UI (MUI)](https://mui.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **API Client:** [Axios](https://axios-http.com/)
- **Form Handling:** [React Hook Form](https://react-hook-form.com/) & [Yup](https://github.com/jquense/yup)
- **State Management:** React Context API
- **Styling:** CSS3 with modern layouts (Flexbox/Grid)

## ✨ Features

- **Student Dashboard:** View a complete list of enrolled students.
- **Dynamic Search:** Find students instantly by their email address.
- **Student Registration:** Add new students through a validated form.
- **Responsive Design:** Optimized for various screen sizes using MUI and custom CSS.
- **Smooth Transitions:** Enhanced user experience with Framer Motion animations.
- **Error Handling:** Robust API error management and user notifications.

## 🏁 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- Running instance of the [University Backend](https://github.com/metodi-velev/university.git)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd university-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure Environment Variables (Optional):
   Create a `.env` file in the root directory:
   ```env
   REACT_APP_API_URL=http://localhost:8080
   ```

4. Start the development server:
   ```bash
   npm start
   ```

The application will be available at [http://localhost:3000](http://localhost:3000).

## 📜 Available Scripts

In the project directory, you can run:

### `npm start`
Runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm run build`
Builds the app for production to the `build` folder. It correctly bundles React in production mode and optimizes the build for the best performance.

### `npm test`
Launches the test runner in the interactive watch mode.
