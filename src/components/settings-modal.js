import React, { useState } from 'react';
import moment from 'moment';

const SettingsModal = ({ setModalVisibility, countdownSettings, setCountdownSettings }) => {
  const [settingsFormErrorMessage, setSettingsFormErrorMessage] = useState('');

  function handleChange(event) {
    setCountdownSettings(prevCountdownSettings => {
      return {
        ...prevCountdownSettings,
        [event.target.name]: event.target.value
      };
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    const eventNameValue = countdownSettings.eventNameValue.trim();
    const dateValue = countdownSettings.dateValue.trim();
    const timeValue = countdownSettings.timeValue.trim();
    const unixEndDate = Number(moment(`${dateValue} ${timeValue} ${countdownSettings.ampmValue}`, 'MM-DD-YYYY hh:mm A').format('X'));

    if (!eventNameValue) {
      setSettingsFormErrorMessage('The event name is required');
    }
    else if (!moment(dateValue, 'MM-DD-YYYY', true).isValid()) {
      setSettingsFormErrorMessage('Date input must be a valid date set in MM-DD-YYYY format.');
    }
    else if (!moment(timeValue, 'hh:mm', true).isValid()) {
      setSettingsFormErrorMessage('Time input must be valid according to the 12-hour clock set in hh:mm format.');
    }
    else if ((unixEndDate - moment().format('X')) < 1) {
      setSettingsFormErrorMessage('The countdown date must be set to a future date.');
    }
    else {
      setCountdownSettings(prevCountdownSettings => {
        return {
          ...prevCountdownSettings,
          eventNameValue,
          dateValue,
          timeValue,
          unixEndDate
        };
      });
      setModalVisibility(false);
    }
  }

  return (
    <div className="modal" id="modal">
      <div className="modal-content">
        <div className="modal-header">Set New Countdown</div>
        <div className="modal-body">
          <form onSubmit={(event) => handleSubmit(event)} noValidate>
            <div className="form-group">
              <label htmlFor="event-name-value">Event Name</label>
              <input type="text" name="eventNameValue" onChange={(event) => handleChange(event)} value={countdownSettings.eventNameValue} id="event-name-value" required />
            </div>
            <div className="form-group">
              <label htmlFor="date-value">Date</label>
              <input type="text" name="dateValue" onChange={(event) => handleChange(event)} value={countdownSettings.dateValue} placeholder="MM-DD-YYYY" id="date-value" required />
            </div>
            <div className="form-group">
              <label htmlFor="time-value">Time</label>
              <input type="text" name="timeValue" onChange={(event) => handleChange(event)} value={countdownSettings.timeValue} placeholder="hh:mm" id="time-value" required />
            </div>
            <div className="form-group">
              <label htmlFor="ampm-value">AM/PM</label>
              <div className="select-wrapper">
                <select name="ampmValue" onChange={(event) => handleChange(event)} value={countdownSettings.ampmValue} id="ampm-value" required>
                  <option value="am">AM</option>
                  <option value="pm">PM</option>
                </select>
              </div>
            </div>
            <div className="button-group">
              <button type="submit" className="button modal-button">Start</button>
              <button type="button" className="button modal-button" onClick={() => setModalVisibility(false)}>Cancel</button>
            </div>
          </form>
          {settingsFormErrorMessage ? <p className="message error-message"><span className="fa fa-exclamation-circle fa-lg fa-fw"></span> {settingsFormErrorMessage}</p>: null}
        </div>
      </div>
    </div>
  );
}

export default SettingsModal;