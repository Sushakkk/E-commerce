import ReactDOM from 'react-dom/client'
import React from 'react';
import {BrowserRouter} from "react-router-dom";
import "regenerator-runtime"
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <BrowserRouter >
        <App />
    </BrowserRouter>
)


if (module.hot) {
    module.hot.accept();
  }
  