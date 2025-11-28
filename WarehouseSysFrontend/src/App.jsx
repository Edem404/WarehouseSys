import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; // Import Router components
import './App.css';
import LoginPage from './components/login_page/login_page';
import MainPage from './components/main_page/main_page'


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Route for Login Page */}
          <Route path="/login" element={<LoginPage />} />
          
          {/* Route for Main Page */}
          <Route path="/main" element={<MainPage />} />

          {/* Default redirect: If user goes to "/", redirect to "/login" */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          
          {/* Catch-all: Redirect unknown routes to login */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;