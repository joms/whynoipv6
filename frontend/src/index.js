import React from 'react';
import { render } from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/style.scss';
import '@fortawesome/fontawesome-free/css/all.css';

import App from './App';
import { CountryProvider } from './store/CountryContext';
import { ListProvider } from './store/ListContext';
import { StatsProvider } from './store/StatsContext';

render(
    <StatsProvider>
        <ListProvider>
            <CountryProvider>
                <App />
            </CountryProvider>
        </ListProvider>
    </StatsProvider>,
    document.getElementById('root')
);

// Hot Module Replacement
if (module.hot) {
    module.hot.accept();
}
