import React from 'react';

const Header = ({ clearCountdown, setModalVisibility }) => {
  return (
    <header>
      <h1 className="header-item">Countdown Timer</h1>
      <aside>
        <div className="button-group header-item">
          <button type="button" className="button header-button clear" onClick={() => clearCountdown()} aria-label="clear countdown">Clear</button>
          <button type="button" className="button header-button settings" onClick={() => setModalVisibility(true)} aria-label="countdown settings">Settings</button>
        </div>
      </aside>
    </header>
  );
}

export default Header;