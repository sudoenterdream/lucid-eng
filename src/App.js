// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Background from './components/Background';
import Letter from './components/Letter';
import Projects from './components/Projects';
import Notes from './components/Notes';
import Research from './components/Research';

function App() {
  return (
    <Router>
      <div className="App">
        <Background />
        <Routes>
          <Route path="/" element={<Letter />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/research" element={<Research />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
