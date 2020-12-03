import React from 'react';
import moment from 'moment';

const SettingsModal = ({ dateValue, timeValue, ampmValue, handleChange, handleSubmit, settingsFormError, errorMessage, showModal}) => {

  return (
    <div className="modal" id="modal">
      <div className="modal-content">
        <div className="modal-header">Set New Countdown</div>
        <div className="modal-body">
          <form onSubmit={(event) => handleSubmit(event, dateValue, timeValue, ampmValue)}>
            <div className="form-group">
              <label htmlFor="date-value">Date</label>
              <input type="text" name="dateValue" onChange={(event) => handleChange(event)} value={dateValue} placeholder="MM-DD-YYYY" id="date-value" required />
            </div>
            <div className="form-group">
              <label htmlFor="time-value">Time</label>
              <input type="text" name="timeValue" onChange={(event) => handleChange(event)} value={timeValue} placeholder="hh:mm" id="time-value" required />
            </div>
            <div className="form-group">
              <label htmlFor="ampm-value">AM/PM</label>
              <div className="select-wrapper">
                <select name="ampmValue" onChange={(event) => handleChange(event)} value={ampmValue} id="ampm-value">
                  <option value="am">AM</option>
                  <option value="pm">PM</option>
                </select>
              </div>
            </div>
            <div className="button-group">
              <input type="submit" className="button modal-button" value="Start" />
              <input type="button" className="button modal-button" onClick={() => showModal(false)} value="Cancel" />
            </div>
          </form>
          {settingsFormError ? <p className="message error-message"><span className="fa fa-exclamation-circle fa-lg fa-fw"></span> {errorMessage}</p>: null}
        </div>
      </div>
    </div>
  );
}

export default SettingsModal;
