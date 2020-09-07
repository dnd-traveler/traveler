import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { Provider } from 'react-redux';

import rootReducer from './store';
import { configureStore } from '@reduxjs/toolkit';

import { ThemeSwitcherProvider } from 'react-css-theme-switcher';

const storageState = localStorage.getItem('traveler-state');
const persistedState = storageState ? JSON.parse(storageState) : {};

const store = configureStore({
    reducer: rootReducer,
    preloadedState: persistedState
});

store.subscribe(() => {
    localStorage.setItem('traveler-state', JSON.stringify(store.getState()));
});

const themes = {
    dark: `${process.env.PUBLIC_URL}/dark-theme.css`,
    light: `${process.env.PUBLIC_URL}/light-theme.css`,
};

ReactDOM.render(
    <Provider store={store}>
        <ThemeSwitcherProvider themeMap={themes} defaultTheme="light" insertionPoint="styles-insertion-point">
            <App />
        </ThemeSwitcherProvider>
    </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
