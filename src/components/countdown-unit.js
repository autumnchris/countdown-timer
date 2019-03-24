import React from 'react';

const CountdownUnit = ({ countdownUnit }) => {

  return (
    <div className="card">
      <div className="countdown-value">{countdownUnit.value}</div>
      <div className="countdown-unit">{countdownUnit.unit}</div>
    </div>
  );
}

export default CountdownUnit;
