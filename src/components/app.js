import React, { Component } from 'react';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state= {
      dateInput: '',
      timeInput: '',
      ampm: 'am',
      modalStyle: {display: 'none'},
      infoMessage: 'Click the Settings button to set a new countdown.',
      infoStyle: {display: 'block'},
      errorMessage: '',
      errorStyle: {display: 'none'}
    };
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
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
                <form>
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
          <p className="message info-message" style={this.state.infoStyle}><span className="fa fa-info-circle fa-lg fa-fw"></span> {this.state.infoMessage}</p>
        </main>
        {/* FOOTER */}
        <footer>Coded by <a href="https://autumnbullard-portfolio.herokuapp.com" target="_blank">Autumn Bullard</a></footer>
      </div>
    );
  }
}
