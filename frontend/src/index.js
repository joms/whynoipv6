import React from 'react';
import { render } from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/style.scss';
import '@fortawesome/fontawesome-free/css/all.css';

import App from './App';
import { CountryProvider } from './store/CountryContext';
import { ListProvider } from './store/ListContext';

render(
    <ListProvider>
        <CountryProvider>
            <App />
        </CountryProvider>
    </ListProvider>,
    document.getElementById('root')
);

// Hot Module Replacement
if (module.hot) {
    module.hot.accept();
}
