import React from 'react';
import { apiFetch } from '../utils/api';
import { arrayNormalizer } from '../utils/normalizers';

let CountryContext;
const { Provider, Consumer } = (CountryContext = React.createContext());

class CountryProvider extends React.Component {
    state = {
        countries: {},
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
            .then(countries => {
                const c = { ...this.state.countries };

                const d = {};
                Object.entries(arrayNormalizer(countries, 'countrycode')).map(([key, val]) => {
                    const cd = c[key] ? c[key] : {};

                    d[key] = {
                        ...cd,
                        ...val,
                    };
                });

                this.setState({
                    countries: d,
                    isFetching: this.state.isFetching - 1,
                });
            })
            .catch(error => this.setState({ error, isFetching: this.state.isFetching - 1 }));
    };

    fetchCountrySites = countryCode => {
        this.setState({ isFetching: this.state.isFetching + 1 });
        apiFetch('/country/' + countryCode)
            .then(site_stats =>
                this.setState({
                    countries: {
                        ...this.state.countries,
                        [countryCode.toUpperCase()]: {
                            ...this.state.countries[countryCode.toUpperCase()],
                            site_stats,
                        },
                    },
                    isFetching: this.state.isFetching - 1,
                })
            )
            .catch(error => this.setState({ error, isFetching: this.state.isFetching - 1 }));
    };

    render() {
        return (
            <Provider
                value={{
                    ...this.state,
                    fetchCountries: this.fetchCountries,
                    fetchCountrySites: this.fetchCountrySites,
                }}
            >
                {this.props.children}
            </Provider>
        );
    }
}

export { CountryProvider, Consumer as CountryConsumer, CountryContext };
