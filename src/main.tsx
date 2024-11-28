import ReactDOM from 'react-dom/client'
import {BrowserRouter} from "react-router-dom";

import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <BrowserRouter basename='/E-commerce' >
        <App />
    </BrowserRouter>
)

if ("serviceWorker" in navigator) {
    window.addEventListener("load", function() {
      navigator.serviceWorker
        .register("/E-commerce/serviceWorker.js")
    })
}
