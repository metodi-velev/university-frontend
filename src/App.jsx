import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { StudentProvider } from './context/StudentContext';
import Layout from './components/layout/Layout';
import StudentList from './components/students/StudentList';
import StudentDetails from './components/students/StudentDetails';
import './App.css';

function App() {
  return (
    <StudentProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<StudentList />} />
            <Route path="/students" element={<StudentList />} />
            <Route path="/students/new" element={<StudentList />} />
            <Route path="/students/:id" element={<StudentDetails />} />
          </Routes>
        </Layout>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </Router>
    </StudentProvider>
  );
}

export default App;