import React from 'react';
import moment from 'moment';
import SettingsModal from './settings-modal';
import Countdown from './countdown';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      dateValue: '',
      timeValue: '',
      ampmValue: 'am',
      countdown: {
        days: '',
        hours: '',
        mins: '',
        secs: ''
      },
      isCountdownSet: true,
      isModalOpen: false,
      infoMessage: '',
      settingsFormError: false,
      errorMessage: ''
    };
    this.timer = null;
    this.countDownDate = {
      dateValue: this.state.dateValue,
      timeValue: this.state.timeValue,
      ampmValue: this.state.ampmValue,
      unixEndDate: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.showModal = this.showModal.bind(this);
  }

  renderCountdownDate(countDownDate) {
    countDownDate ? localStorage.setItem('countDownDate', JSON.stringify(countDownDate)): null;
    return JSON.parse(localStorage.getItem('countDownDate')) || this.countDownDate;
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event, dateValue, timeValue, ampmValue) {
    event.preventDefault();
    const unixEndDate = Number(moment(`${dateValue} ${timeValue} ${ampmValue}`, 'MM-DD-YYYY hh:mm A').format('X'));

    if ((unixEndDate - moment().format('X')) < 1) {
      this.setState({
        settingsFormError: true,
        errorMessage: 'The countdown must be set to a future date.'
      });
    }
    else if (!moment(dateValue, 'MM-DD-YYYY', true).isValid()) {
      this.setState({
        settingsFormError: true,
        errorMessage: 'Date input must be a valid date set in MM-DD-YYYY format.'
      });
    }
    else if (!moment(timeValue, 'hh:mm', true).isValid()) {
      this.setState({
        settingsFormError: true,
        errorMessage: 'Time input must be valid according to the 12-hour clock set in hh:mm format.'
      });
    }
    else {
      this.startCountdown(this.renderCountdownDate({
        dateValue,
        timeValue,
        ampmValue,
        unixEndDate
      }));
      this.showModal(false);
    }
  }

  startCountdown(endDate) {
    clearInterval(this.timer);
    this.timer = null;

    if (endDate.unixEndDate !== '') {
      this.timer = setInterval(() => this.playTimer(endDate.unixEndDate), 1000);
    }
    else {
      this.setState({
        isCountdownSet: false,
        infoMessage: 'Click the Settings button to start a new countdown.'
      });
    }
  }

  playTimer(unixEndDate) {
    const distance = unixEndDate - moment().format('X');

    if (distance > 0) {
      this.setState({
        countdown: {
          days: parseInt(distance / (60 * 60 * 24), 10),
          hours: parseInt(distance % (60 * 60 * 24) / (60 * 60), 10),
          mins: parseInt(distance % (60 * 60) / (60), 10),
          secs: parseInt(distance % 60, 10)
        },
        isCountdownSet: true,
        infoMessage: ''
      });
    }
    else {
      clearInterval(this.timer);
      this.timer = null;
      this.renderCountdownDate(this.countDownDate);
      this.setState({
        isCountdownSet: false,
        infoMessage: 'Countdown ended. Click the Settings button to start a new countdown.'
      });
    }
  }

  clearCountdown() {

    if (this.renderCountdownDate().unixEndDate !== '') {

      if (confirm('Are you sure you want to clear your currently running countdown?')) {
        clearInterval(this.timer);
        this.timer = null;
        this.setState({
          isCountdownSet: false,
          infoMessage: 'Countdown cleared. Click the Settings button to start a new countdown.',
        });
        this.renderCountdownDate(this.countDownDate);
      }
    }
    else {
      alert('No countdown has been set. Please click the Settings button to start a new countdown.');
    }
  }

  showModal(status) {
    this.setState({
      dateValue: this.renderCountdownDate().dateValue,
      timeValue: this.renderCountdownDate().timeValue,
      ampmValue: this.renderCountdownDate().ampmValue,
      isModalOpen: status,
      settingsFormError: false
    });
  }

  componentDidMount() {
    this.startCountdown(this.renderCountdownDate());

    window.addEventListener('click', event => {

      if (event.target.id === 'modal') {
        this.showModal(false);
      }
    });
  }

  render() {
    return (
      <React.Fragment>
        <header>
          <h1 className="header-item">Countdown Timer</h1>
          <div className="button-group header-item">
            <button type="button" className="button header-button clear" onClick={() => this.clearCountdown()}>Clear</button>
            <button type="button" className="button header-button settings" onClick={() => this.showModal(true)}>Settings</button>
          </div>
        </header>
        <main>
          {this.state.isModalOpen ? <SettingsModal dateValue={this.state.dateValue} timeValue={this.state.timeValue} ampmValue={this.state.ampmValue} handleChange={this.handleChange} handleSubmit={this.handleSubmit} settingsFormError={this.state.settingsFormError} errorMessage={this.state.errorMessage} showModal={this.showModal} /> : null}
          {this.state.isCountdownSet ? <Countdown countdown={this.state.countdown} unixEndDate={this.renderCountdownDate().unixEndDate} /> : <p className="message info-message"><span className="fa fa-info-circle fa-lg fa-fw"></span> {this.state.infoMessage}</p>}
        </main>
        <footer>Created by <a href="https://autumnbullard-portfolio.herokuapp.com" target="_blank">Autumn Bullard</a> &copy; {new Date().getFullYear()}</footer>
      </React.Fragment>
    );
  }
}

export default App;
