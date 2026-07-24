import React from 'react';
import Header from '../common/Header';
import './Layout.css';

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Header />
      <main className="main-content">
        <div className="container">
          {children}
        </div>
      </main>
      <footer className="footer">
        <p>&copy; 2026 University Management System. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Layout;