import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Store } from './app/Store.js'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={Store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
        <ToastContainer />
    </Provider>
);