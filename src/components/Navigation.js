// src/components/Navigation.js
import React from 'react';
import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <span className="navigation">
      <Link to="/">home</Link>
      <Link to="/projects">projects</Link>
      <Link to="/notes">notes</Link>
      <Link to="/research">research</Link>
    </span>
  );
}

export default Navigation;
