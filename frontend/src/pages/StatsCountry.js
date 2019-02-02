import React from 'react';
import { CountryContext } from '../store/CountryContext';
import Icon from '../components/Icon';

class StatsCountry extends React.Component {
    static contextType = CountryContext;

    componentDidMount() {
        const { countryCode } = this.props.match.params;

        if (!this.context.countries[countryCode.toUpperCase()]) {
            this.context.fetchCountries();
            this.context.fetchCountrySites(countryCode);
        } else {
            if (!this.context.countries[countryCode.toUpperCase()].site_stats) {
                this.context.fetchCountrySites(countryCode);
            }
        }
    }

    render() {
        const { countryCode } = this.props.match.params;
        const country = this.context.countries[countryCode.toUpperCase()];

        if (!country || !country.site_stats) {
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

                <div className="row justify-content-md-center">
                    <div className="col-md">
                        <table className="table table-borderless v6-tables">
                            <thead className="thead-light">
                                <tr>
                                    <th scope="col">Alexa Rank</th>
                                    <th scope="col">Website</th>
                                    <th scope="col">IPv6</th>
                                    <th scope="col">NS IPv6</th>
                                </tr>
                            </thead>
                            <tbody>
                                {country.site_stats.map(site => (
                                    <tr key={site.rank}>
                                        <td>{site.rank}</td>
                                        <td>{site.hostname}</td>
                                        <td className="icon">
                                            {site.ipv6 && <Icon className="text-success" icon="check" />}
                                            {!site.ipv6 && <Icon className="text-danger" icon="times" />}
                                        </td>
                                        <td className="icon">
                                            {site.nsipv6 && <Icon className="text-success" icon="check" />}
                                            {!site.nsipv6 && <Icon className="text-danger" icon="times" />}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <hr />

                        <h2>{country.countryname} Statistics</h2>

                        <p>
                            Of the total {country.sites} sites, {country.sites_v6} ({country.percent}%) of them have IPv6.
                        </p>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default StatsCountry;
