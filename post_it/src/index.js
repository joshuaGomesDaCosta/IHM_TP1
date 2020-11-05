import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Canvas from './composants/Canvas'
import reportWebVitals from './reportWebVitals';


ReactDOM.render(<Canvas />, document.getElementById('menu'));
//ReactDOM.render(< />, document.getElementById('page'));
//ReactDOM.render(< />, document.getElementById('fNewPostIt'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
