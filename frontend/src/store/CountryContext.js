import React from 'react';
import { apiFetch } from '../utils/api';

let CountryContext;
const { Provider, Consumer } = (CountryContext = React.createContext());

class CountryProvider extends React.Component {
    state = {
        countries: [],
        isFetching: 0,
        error: null,
    };

    fetchCountries = () => {
        this.setState({ isFetching: this.state.isFetching + 1 });
        apiFetch('/country')
            .then(countries => this.setState({ countries, isFetching: this.state.isFetching - 1 }))
            .catch(error => this.setState({ error, isFetching: this.state.isFetching - 1 }));
    };

    render() {
        return (
            <Provider value={{ ...this.state, fetchCountries: this.fetchCountries }}>{this.props.children}</Provider>
        );
    }
}

export { CountryProvider, Consumer as CountryConsumer, CountryContext };
