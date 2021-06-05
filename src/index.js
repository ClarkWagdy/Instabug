import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
/*import fonts*/ 

import "./index.css";
import App from './App/App';
ReactDOM.render(
    < BrowserRouter >
    <App/>
    </ BrowserRouter >,
    document.querySelector('#root')
);

