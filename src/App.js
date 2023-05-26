import React, { useState, useEffect } from 'react';
import moment from 'moment';
import Header from './components/Header';
import Footer from './components/Footer';
import SettingsModal from './components/SettingsModal';
import Countdown from './components/Countdown';
import InfoMessage from './components/InfoMessage';
import LoadingSpinner from './components/LoadingSpinner';
import getCountdownDate from './utils/getCountdownDate';

const App = () => {
  const initialCountdownSettings = {
    eventNameValue: '',
    dateValue: '',
    timeValue: '',
    ampmValue: 'am'
  };

  const [countdownSettings, setCountdownSettings] = useState({ ...getCountdownDate() });
  const [countdownTimer, setCountdownTimer] = useState(null);
  const [countdownInfoMessage, setCountdownInfoMessage] = useState('');
  const [modalVisibility, setModalVisibility] = useState(false);

  useEffect(() => {
    if(!countdownSettings.unixEndDate) setCountdownInfoMessage('Click the Settings button to start a new countdown.');

    window.addEventListener('click', event => {
      if(event.target.id === 'modal') setModalVisibility(false);
    });

    window.addEventListener('keydown', event => {
      if(modalVisibility && event.key === 'Escape') setModalVisibility(false);
    });

    modalVisibility ? document.querySelector('body').classList.add('modal-open') : document.querySelector('body').classList.remove('modal-open');
  }, [modalVisibility]);

  useEffect(() => {
    let timer = null;

    if (countdownSettings.unixEndDate) {
      timer = setInterval(() => playTimer(countdownSettings.unixEndDate), 1000);
    }
    getCountdownDate(countdownSettings);

    return () => {
      clearInterval(timer);
      timer = null;
    }
  }, [countdownSettings.unixEndDate, countdownSettings.eventName]);

  useEffect(() => {
    setCountdownSettings(getCountdownDate());
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
      <Header clearCountdown={clearCountdown} setModalVisibility={setModalVisibility} />
      <main>
        {modalVisibility && <SettingsModal setModalVisibility={setModalVisibility} countdownSettings={countdownSettings} setCountdownSettings={setCountdownSettings} />}
        {countdownSettings.unixEndDate && !countdownTimer ? <LoadingSpinner /> : countdownTimer ? <Countdown countdownTimer={countdownTimer} unixEndDate={countdownSettings.unixEndDate} eventName={countdownSettings.eventName} /> : <InfoMessage messageText={countdownInfoMessage} />}
      </main>
      <Footer />
    </React.Fragment>
  );
}

export default App;
