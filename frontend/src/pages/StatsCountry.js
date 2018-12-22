import React from 'react';
import { CountryContext } from '../store/CountryContext';

class StatsCountry extends React.Component {
    static contextType = CountryContext;

    state = {
        sortBy: 'Sites',
    };

    componentDidMount() {
        if (!this.context._didFetch) {
            this.context.fetchCountries();
        }
    }

    setSort = sortBy => {
        this.setState({ sortBy });
    };

    get sortCountries() {
        const key = this.state.sortBy;
        return Object.values(this.context.countries).sort((a, b) => {
            return b[key] - a[key];
        });
    }

    render() {
        const { sortBy } = this.state;

        return (
            <React.Fragment>
                <h3>IPv6 per Country Statistics</h3>
                <hr />
                <p>This is a list of the top 50 countries with IPv6 enabled</p>
                <div className="btn-group">
                    <button
                        className={`btn btn-outline-dark ${sortBy === 'Sites' ? 'active' : ''}`}
                        role="button"
                        onClick={() => this.setSort('Sites')}
                    >
                        Order by Sites
                    </button>
                    <button
                        className={`btn btn-outline-dark ${sortBy === 'Percent' ? 'active' : ''}`}
                        role="button"
                        onClick={() => this.setSort('Percent')}
                    >
                        Order by Progress
                    </button>
                </div>
                <br />
                <br />
                <div className="row justify-content-md-center">
                    <div className="col-md">
                        <table className="table table-borderless v6-tables">
                            <thead className="thead-light">
                                <tr>
                                    <th scope="col">Country</th>
                                    <th scope="col">Progress</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.sortCountries.map(country => (
                                    <tr key={country.CountryCode}>
                                        <td className="site">
                                            <a
                                                href={`/country/${country.CountryCode.toLowerCase()}`}
                                                className="noline"
                                            >
                                                <img
                                                    className="stats-page-flag"
                                                    src={`https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.1.0/flags/1x1/${country.CountryCode.toLowerCase()}.svg`}
                                                    alt={country.CountryName}
                                                />
                                                {country.CountryName}
                                            </a>
                                        </td>
                                        <td width="60%" className="progress-text">
                                            {country.V6sites} Dual-Stack / {country.Sites} Total<span className="float-right">
                                                {country.Percent}%
                                            </span>
                                            <div className="progress progress-small">
                                                <div
                                                    style={{ width: `${country.Percent}%` }}
                                                    className="progress-bar"
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default StatsCountry;
