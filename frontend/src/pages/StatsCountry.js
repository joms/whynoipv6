import React from 'react';
import { CountryContext } from '../store/CountryContext';

class StatsCountry extends React.Component {
    static contextType = CountryContext;

    componentDidMount() {
        const { countryCode } = this.props.match.params;

        // TODO Fetch country details as well as stats
        if (
            !this.context.countries[countryCode.toUpperCase()] ||
            this.context.countries[countryCode.toUpperCase()].sites
        ) {
            this.context.fetchCountry(countryCode);
        }
    }

    render() {
        const { countryCode } = this.props.match.params;
        const country = this.context.countries[countryCode.toUpperCase()];

        if (!country) {
            // TODO Fix this
            return <h1>Loading...</h1>;
        }

        return (
            <React.Fragment>
                <img
                    className="country-page-flag"
                    src={`https://cdn.jsdelivr.net/npm/flag-icon-css@3.0.0/flags/4x3/${countryCode}.svg`}
                    alt={country.countryname}
                />
                <h3>The Most Popular Websites Without IPv6 In {country.countryname}</h3>
                <hr />

                <p>
                    Each of the following websites is sorted by Alexa rank and loads over an <strong>IPv4 only</strong>{' '}
                    connections.
                </p>
            </React.Fragment>
        );
    }
}

export default StatsCountry;
