import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import PlayerAnalysis from './components/PlayerAnalysis';
import SquadBuilder from './components/SquadBuilder';
import NavBar from './components/NavBar';
import LoginPage from './pages/LoginPage';
import { AuthProvider } from './context/AuthContext';
import RegisterPage from './pages/RegisterPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex">
          {/* NavBar could be conditionally rendered based on auth state */}
          <NavBar />
          <main className="flex-grow p-8">
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/" element={<Dashboard />} />
              <Route path="/players" element={<PlayerAnalysis />} />
              <Route path="/squad-builder" element={<SquadBuilder />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;