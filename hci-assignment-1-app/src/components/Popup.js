import React from 'react';

const Popup = ({ title, onClose, children }) => {
  return (
    <div className="popup">
      <div className="popup-content">
        <h2>{title}</h2>
        {children}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Popup;