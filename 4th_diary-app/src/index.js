import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app';
import { ThemeProvider } from 'styled-components';
import theme from './components/common/theme';
import { RecoilRoot } from 'recoil'

ReactDOM.render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <RecoilRoot>
                <App />
            </RecoilRoot>
        </ThemeProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
