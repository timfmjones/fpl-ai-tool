import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from 'components/Dashboard';
import PlayerAnalysis from 'components/PlayerAnalysis';
import SquadBuilder from 'components/SquadBuilder';
import NavBar from 'components/NavBar';

function App() {
  return (
    <Router>
      <div className="flex">
        <NavBar />
        <main className="flex-grow p-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/players" element={<PlayerAnalysis />} />
            <Route path="/squad-builder" element={<SquadBuilder />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;