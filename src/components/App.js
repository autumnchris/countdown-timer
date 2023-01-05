import React, { useState, useEffect } from 'react';
import moment from 'moment';
import SettingsModal from './SettingsModal';
import Countdown from './Countdown';
import InfoMessage from './InfoMessage';
import LoadingSpinner from './LoadingSpinner';

const App = () => {
  const initialCountdownSettings = {
    eventNameValue: '',
    dateValue: '',
    timeValue: '',
    ampmValue: 'am'
  };

  const [countdownSettings, setCountdownSettings] = useState(JSON.parse(localStorage.getItem('countdownDate')) || { ...initialCountdownSettings });
  const [countdownTimer, setCountdownTimer] = useState(null);
  const [countdownInfoMessage, setCountdownInfoMessage] = useState('');
  const [modalVisibility, setModalVisibility] = useState(false);

  useEffect(() => {
    if (!countdownSettings.unixEndDate) setCountdownInfoMessage('Click the Settings button to start a new countdown.');

    window.addEventListener('click', event => {
      if (event.target.id === 'modal') setModalVisibility(false);
    });
  }, []);

  useEffect(() => {
    let timer = null;

    if (countdownSettings.unixEndDate) {
      timer = setInterval(() => playTimer(countdownSettings.unixEndDate), 1000);
    }
    localStorage.setItem('countdownDate', JSON.stringify(countdownSettings));

    return () => {
      clearInterval(timer);
      timer = null;
    }
  }, [countdownSettings.unixEndDate, countdownSettings.eventName]);

  useEffect(() => {
    modalVisibility ? document.querySelector('body').classList.add('modal-open') : document.querySelector('body').classList.remove('modal-open');
    setCountdownSettings(JSON.parse(localStorage.getItem('countdownDate')) || { ...initialCountdownSettings });
  }, [modalVisibility]);

  function playTimer(currentUnixEndDate) {
    const distance = currentUnixEndDate - moment().format('X');

    if (distance > 0) {
      setCountdownTimer({
        days: parseInt(distance / (60 * 60 * 24), 10),
        hours: parseInt(distance % (60 * 60 * 24) / (60 * 60), 10),
        mins: parseInt(distance % (60 * 60) / (60), 10),
        secs: parseInt(distance % 60, 10)
      });
      setCountdownInfoMessage('');
    }
    else {
      setCountdownInfoMessage('Countdown ended. Click the Settings button to start a new countdown.');
      setCountdownSettings({ ...initialCountdownSettings });
      setCountdownTimer(null);
    }
  }

  function clearCountdown() {

    if (!countdownSettings.unixEndDate) {
      alert('No countdown has been set. Please click the Settings button to start a new countdown.');
    }
    else {

      if (confirm('Are you sure you want to clear your currently running countdown?')) {
        setCountdownInfoMessage('Countdown cleared. Click the Settings button to start a new countdown.');
        setCountdownSettings({ ...initialCountdownSettings });
        setCountdownTimer(null);
      }
    }
  }

  return (
    <React.Fragment>
      <header>
        <h1 className="header-item">Countdown Timer</h1>
        <div className="button-group header-item">
          <button type="button" className="button header-button clear" onClick={() => clearCountdown()}>Clear</button>
          <button type="button" className="button header-button settings" onClick={() => setModalVisibility(true)}>Settings</button>
        </div>
      </header>
      <main>
        {modalVisibility && <SettingsModal setModalVisibility={setModalVisibility} countdownSettings={countdownSettings} setCountdownSettings={setCountdownSettings} />}
        {countdownSettings.unixEndDate && !countdownTimer ? <LoadingSpinner /> : countdownTimer ? <Countdown countdownTimer={countdownTimer} unixEndDate={countdownSettings.unixEndDate} eventName={countdownSettings.eventName} /> : <InfoMessage countdownInfoMessage={countdownInfoMessage} />}
      </main>
      <footer>Created by <a href="https://autumnchris.github.io/portfolio" target="_blank">Autumn Bullard</a> &copy; {new Date().getFullYear()}</footer>
    </React.Fragment>
  );
}

export default App;
