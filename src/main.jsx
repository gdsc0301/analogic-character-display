import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './css/index.scss'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

const keyboard = document.createElement('input');
keyboard.style.position = 'absolute';
keyboard.style.opacity = 0;
keyboard.style.pointerEvents = 'none';

document.body.appendChild(keyboard);