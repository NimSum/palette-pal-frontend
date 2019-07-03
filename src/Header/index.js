import React from 'react';
import { Link, NavLink } from 'react-router-dom';

function Header() {
  return (
    <header className="top-bar">
      <Link exact="true" to="/" className="header-left">
        <img className="logo-img" src={require('../images/logo.png')} alt="Palette pal logo of paint palette" />
        <h1 className="logo-text">Palette Pal</h1>
      </Link>
      <div className="header-right">
        <nav className="header-nav">
          <NavLink exact to="/" className="nav-link">Pick New Palette</NavLink>
          <NavLink exact to="/projects" className="nav-link">My Projects</NavLink>
          <NavLink exact to="/login" className="nav-link">Log In / Sign Up</NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Header;
