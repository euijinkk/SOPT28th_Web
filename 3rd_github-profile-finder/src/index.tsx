import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import '@fortawesome/fontawesome-free/js/all.js';
import { RecoilRoot } from 'recoil';

ReactDOM.render(
    <React.StrictMode>
        <RecoilRoot>
            <App />
        </RecoilRoot>
    </React.StrictMode>,
    document.getElementById('root')
);
