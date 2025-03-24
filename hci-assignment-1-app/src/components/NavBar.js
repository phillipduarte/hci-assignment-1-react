import React from 'react';

const NavBar = ({ onFavoritesClick, onSettingsClick, onLocationClick }) => {
  return (
    <div className="nav-bar">
      <div className="icon">📅</div>
      <div className="icon">📡</div>
      <div>
        <img
          src="/assets/arrow.webp"
          alt="logo"
          className="location-icon"
          onClick={onLocationClick} 
        />
      </div>
      <div className="icon" onClick={onFavoritesClick}>⭐</div>
      <div className="icon" onClick={onSettingsClick}>⚙️</div>
    </div>
  );
};

export default NavBar;