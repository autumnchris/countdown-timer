import React, { Component } from 'react';

export default class App extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="body">
        {/* HEADER */}
        <header>
          <h1>Countdown Timer</h1>
          <div className="button-group">
            <button type="button" className="clear">Clear</button>
            <button type="button" className="settings">Settings</button>
          </div>
        </header>
        {/* FOOTER */}
        <footer>Coded by <a href="https://autumnbullard-portfolio.herokuapp.com" target="_blank">Autumn Bullard</a></footer>
      </div>
    );
  }
}
