import React, { Component } from 'react';
import CountdownUnits from './countdown-units';
import moment from 'moment';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      countdown: [
        {
          unit: 'days',
          value: ''
        },
        {
          unit: 'hours',
          value: ''
        },
        {
          unit: 'mins',
          value: ''
        },
        {
          unit: 'secs',
          value: ''
        }
      ],
      dateInput: '',
      timeInput: '',
      ampm: 'am',
      modalStyle: {display: 'none'},
      countdownStyle: {display: 'none'},
      infoMessage: '',
      infoStyle: {display: 'none'},
      errorMessage: '',
      errorStyle: {display: 'none'}
    };
    this.timer = null;
    this.endDate = JSON.parse(localStorage.getItem('countdownTimer')) || '';
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.endDate = moment(`${this.state.dateInput} ${this.state.timeInput} ${this.state.ampm}`, 'MM-DD-YYYY hh:mm a').format('X');

    if ((this.endDate - moment().format('X')) < 1) {
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
      this.startCountdown();
      this.closeModal();
      this.setState({
        dateInput: '',
        timeInput: '',
        ampm: 'am'
      });
    }
  }

  startCountdown() {
    localStorage.setItem('countdownTimer', JSON.stringify(this.endDate));
    let countdown = this.state.countdown;
    let distance;

    clearInterval(this.timer);

    if (this.endDate !== '') {
      this.timer = setInterval(() => {
        distance = this.endDate - moment().format('X');

        if (distance > 0) {
          // Days
          countdown[0]['value'] = parseInt(distance / (60 * 60 * 24), 10);
          // Hours
          countdown[1].value = parseInt(distance % (60 * 60 * 24) / (60 * 60), 10);
          // Minutes
          countdown[2].value = parseInt(distance % (60 * 60) / (60), 10);
          // Seconds
          countdown[3].value = parseInt(distance % 60, 10);
          this.setState({
            countdown,
            countdownStyle: {display: 'block'},
            infoStyle: {display: 'none'}
          });
        }
        else {
          countdown = countdown.map(unit => {
            unit.value = '';
            return unit;
          });
          clearInterval(this.timer);
          this.setState({
            countdown,
            countdownStyle: {display: 'none'},
            infoMessage: 'Countdown ended. Click the Settings button to start a new countdown.',
            infoStyle: {display: 'block'}
          });
          this.endDate = '';
          localStorage.setItem('countdownTimer', JSON.stringify(this.endDate));
        }
      });
      this.setState({
        errorMessage: '',
        errorStyle: {display: 'none'}
      });
    }
    else {
      this.setState({
        infoMessage: 'Click the Settings button to start a new countdown.',
        infoStyle: {display: 'block'}
      });
    }
  }

  clearCountdown() {
    let countdown = this.state.countdown;

    if (this.endDate !== '') {

      if (confirm('Are you sure you want to clear your currently running countdown?')) {
        clearInterval(this.timer);
        countdown = countdown.map(unit => {
          unit.value = '';
          return unit;
        });
        this.setState({
          countdown,
          countdownStyle: {display: 'none'},
          infoMessage: 'Countdown cleared. Click the Settings button to start a new countdown.',
          infoStyle: {display: 'block'}
        });
        this.endDate = '';
        localStorage.setItem('countdownTimer', JSON.stringify(this.endDate));
      }
    }
    else {
      alert('No countdown has been set. Please click the settings button to start a new countdown.')
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
    this.startCountdown();
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
          <h1 className="header-item">Countdown Timer</h1>
          <div className="header-item button-group">
            <button type="button" className="button header-button clear" onClick={() => this.clearCountdown()}>Clear</button>
            <button type="button" className="button header-button settings" onClick={() => this.openModal()}>Settings</button>
          </div>
        </header>
        <main>
          {/* SETTINGS MODAL */}
          <div className="modal" id="modal" style={this.state.modalStyle}>
            <div className="modal-content">
              <div className="modal-header">Set New Countdown</div>
              <div className="modal-body">
                <form onSubmit={(event) => this.handleSubmit(event)}>
                  <div className="form-group">
                    <label htmlFor="date-input">Date</label>
                    <input type="text" name="dateInput" onChange={(event) => this.handleChange(event)} value={this.state.dateInput} placeholder="MM-DD-YYYY" id="date-input" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="time-input">Time</label>
                    <input type="text" name="timeInput" onChange={(event) => this.handleChange(event)} value={this.state.timeInput} placeholder="hh:mm" id="time-input" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="ampm-input">AM/PM</label>
                    <div className="select-wrapper">
                      <select name="ampm" onChange={(event) => this.handleChange(event)} value={this.state.ampm} id="ampm-input">
                        <option value="am">AM</option>
                        <option value="pm">PM</option>
                      </select>
                    </div>
                  </div>
                  {/* ERROR MESSAGE */}
                  <p className="message error-message" style={this.state.errorStyle}><span className="fa fa-exclamation-circle fa-lg fa-fw"></span> {this.state.errorMessage}</p>
                  <div className="button-group">
                    <input type="submit" className="button modal-button" value="Start" />
                    <input type="button" className="button modal-button" onClick={() => this.closeModal()} value="Cancel" />
                  </div>
                </form>
              </div>
            </div>
          </div>
          {/* COUNTDOWN TIMER */}
          <CountdownUnits countdownUnits={this.state.countdown} countdownStyle={this.state.countdownStyle} />
          <p className="message info-message" style={this.state.infoStyle}><span className="fa fa-info-circle fa-lg fa-fw"></span> {this.state.infoMessage}</p>
        </main>
        {/* FOOTER */}
        <footer>Created by <a href="https://autumnbullard-portfolio.herokuapp.com" target="_blank">Autumn Bullard</a> &copy; {new Date().getFullYear()}</footer>
      </div>
    );
  }
}
