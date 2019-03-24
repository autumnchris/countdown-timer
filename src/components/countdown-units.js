import React from 'react';
import CountdownUnit from './countdown-unit';

const CountdownUnits = ({ countdownUnits, countdownStyle }) => {

  const Countdown = countdownUnits.map((countdownUnit, index) => {
    return <CountdownUnit key={index} countdownUnit={countdownUnit} />;
  });

  return (
    <div className="countdown" style={countdownStyle}>
      <p>Countdown ends in...</p>
      {Countdown}
    </div>
  );
}

export default CountdownUnits;
