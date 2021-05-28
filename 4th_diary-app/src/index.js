import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app';
import { ThemeProvider } from 'styled-components';
import theme from './components/common/theme';

ReactDOM.render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <App />
        </ThemeProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
