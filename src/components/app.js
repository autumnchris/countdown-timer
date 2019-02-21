import React, { Component } from 'react';
import moment from 'moment';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state= {
      countdown: '',
      dateInput: '',
      timeInput: '',
      ampm: 'am',
      modalStyle: {display: 'none'},
      countdownStyle: {display: 'none'},
      infoMessage: 'Click the Settings button to set a new countdown.',
      infoStyle: {display: 'block'},
      errorMessage: '',
      errorStyle: {display: 'none'}
    };
    this.timer = null;
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  startCountdown(event) {
    event.preventDefault();
    const endDate = moment(`${this.state.dateInput} ${this.state.timeInput} ${this.state.ampm}`, 'MM-DD-YYYY hh:mm a').format('X');
    let distance,
    days,
    hours,
    minutes,
    seconds;

    if (endDate <= moment().format('X')) {
      this.setState({
        errorMessage: 'The countdown must be set to a future date.',
        errorStyle: {display: 'block'}
      });
    }
    else if (!moment(this.state.dateInput, 'MM-DD-YYYY', true).isValid()) {
      this.setState({
        errorMessage: 'Date input must be a valid date set in MM-DD-YYYY format.',
        errorStyle: {display: 'block'}
      });
    }
    else if (!moment(this.state.timeInput, 'hh:mm', true).isValid()) {
      this.setState({
        errorMessage: 'Time input must be valid according to the 12-hour clock set in hh:mm format.',
        errorStyle: {display: 'block'}
      });
    }
    else {
      clearInterval(this.timer);
      this.timer = setInterval(() => {
        distance = endDate - moment().format('X');

        if (distance > 0) {
          days = parseInt(distance / (60 * 60 * 24), 10);
          hours = parseInt(distance % (60 * 60 * 24) / (60 * 60), 10);
          minutes = parseInt(distance % (60 * 60) / (60), 10);
          seconds = parseInt(distance % 60, 10);
          this.setState({
            countdown: `Countdown ends in ${days} Days ${hours} Hours ${minutes} Minutes ${seconds} Seconds`
          });
        }
        else {
          clearInterval(this.timer);
          this.setState({
            countdown: '',
            countdownStyle: {display: 'none'},
            infoMessage: `Countdown ended. Click the Settings button to set a new countdown.`,
            infoStyle: {display: 'block'}
          });
        }
      });

      this.setState({
        countdownStyle: {display: 'block'},
        infoStyle: {display: 'none'},
        errorMessage: '',
        errorStyle: {display: 'none'}
      });
      this.closeModal();
    }
  }

  openModal() {
    this.setState({
      modalStyle: {display: 'block'}
    });
  }

  closeModal() {
    this.setState({
      modalStyle: {display: 'none'}
    });
  }

  componentDidMount() {
    window.addEventListener('click', (event) => {

      if (event.target.id === 'modal') {
        this.closeModal();
      }
    });
  }

  render() {
    return (
      <div className="body">
        {/* HEADER */}
        <header>
          <h1>Countdown Timer</h1>
          <div className="button-group">
            <button type="button" className="clear">Clear</button>
            <button type="button" className="settings" onClick={() => this.openModal()}>Settings</button>
          </div>
        </header>
        <main>
          {/* SETTINGS MODAL */}
          <div id="modal" style={this.state.modalStyle}>
            <div className="modal-content">
              <div className="modal-header">Countdown Settings</div>
              <div className="modal-body">
                <form onSubmit={(event) => this.startCountdown(event)}>
                  <div className="form-group">
                    <label htmlFor="date-input">Date:</label>
                    <input type="text" name="dateInput" onChange={(event) => this.handleChange(event)} value={this.state.dateInput} placeholder="MM-DD-YYYY" id="date-input" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="time-input">Time:</label>
                    <input type="text" name="timeInput" onChange={(event) => this.handleChange(event)} value={this.state.timeInput} placeholder="hh:mm" id="time-input" required />
                  </div>
                  <div className="form-group">
                    <fieldset>
                      <legend>AM/PM:</legend>
                      <select name="ampm" onChange={(event) => this.handleChange(event)} value={this.state.ampm}>
                        <option value="am">AM</option>
                        <option value="pm">PM</option>
                      </select>
                    </fieldset>
                  </div>
                  {/* ERROR MESSAGE */}
                  <p className="message error-message" style={this.state.errorStyle}><span className="fa fa-exclamation-circle fa-lg fa-fw"></span> {this.state.errorMessage}</p>
                  <div className="button-group">
                    <input type="submit" value="Start" />
                    <input type="button" onClick={() => this.closeModal()} value="Cancel" />
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="countdown" style={this.state.countdownStyle}>{this.state.countdown}</div>
          <p className="message info-message" style={this.state.infoStyle}><span className="fa fa-info-circle fa-lg fa-fw"></span> {this.state.infoMessage}</p>
        </main>
        {/* FOOTER */}
        <footer>Coded by <a href="https://autumnbullard-portfolio.herokuapp.com" target="_blank">Autumn Bullard</a></footer>
      </div>
    );
  }
}
