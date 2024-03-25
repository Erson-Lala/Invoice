import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CustomerList from '../customerList/customerlist';
import './header.scss';

const Header = () => {
  const [isNavVisible, setIsNavVisible] = useState(false);

  const toggleNav = () => {
    setIsNavVisible(!isNavVisible);
  };

  return (
    <header className="header">
      <div className="container">
        <h1 className="header-title">Invoicing App</h1>
        <button className={`hamburger ${isNavVisible ? 'active' : ''}`} onClick={toggleNav}>☰</button>
        <nav className={`header-nav ${isNavVisible ? 'visible' : ''}`}>
          <ul className="nav-list">
            <li className="nav-item">
              <Link to="/" className="nav-link">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/item-management" className="nav-link">Items</Link>
            </li>
            <li className="nav-item">
              <Link to="/customer-list" className="nav-link">Customers</Link>
            </li>
            <li className="nav-item">
              <a href="https://www.linkedin.com/in/erson-lala-621a531b4/" target="_blank" rel="noopener noreferrer" className="nav-link">@ Erson Lala</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
