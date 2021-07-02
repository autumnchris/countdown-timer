import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import 'file-loader?name=[name].[ext]!./index.html';
import 'file-loader?name=[name].[ext]!./favicon.ico';
import 'normalize.css';
import './stylesheets/style.scss';

ReactDOM.render(<App />, document.getElementById('app'));
