import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; // Import Router components
import './App.css';
import LoginPage from './components/login_page/login_page';
import MainPage from './components/main_page/main_page'
import BasePage from './components/base_page/base_page';
import AdminPage from './components/admin_page/admin_page';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/main" element={<MainPage />} />

          {/* UPDATED: Added /* to allow nested routes like /main/base/products */}
          <Route path="/main/base/*" element={<BasePage />} />
          <Route path="/main/admin/*" element={<AdminPage />} />

          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;