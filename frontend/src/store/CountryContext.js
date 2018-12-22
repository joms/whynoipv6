import React from 'react';
import { apiFetch } from '../utils/api';

let CountryContext;
const { Provider, Consumer } = (CountryContext = React.createContext());

class CountryProvider extends React.Component {
    state = {
        countries: [],
        isFetching: 0,
        error: null,
        _didFetch: false,
    };

    componentDidMount() {
        this.debounce = window.setTimeout(() => {
            if (!this.state._didFetch) {
                this.fetchCountries();
            }
        }, 1500);
    }

    componentWillUnmount() {
        this.debounce && window.clearTimeout(this.debounce);
    }

    fetchCountries = () => {
        this.setState({ isFetching: this.state.isFetching + 1, _didFetch: true });
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
