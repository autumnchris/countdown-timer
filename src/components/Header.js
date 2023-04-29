import React from 'react';

const Header = ({ clearCountdown, setModalVisibility }) => {
  return (
    <header>
      <h1 className="header-item">Countdown Timer</h1>
      <div className="button-group header-item">
        <button type="button" className="button header-button clear" onClick={() => clearCountdown()}>Clear</button>
        <button type="button" className="button header-button settings" onClick={() => setModalVisibility(true)}>Settings</button>
      </div>
    </header>
  );
}

export default Header;