import React from 'react';
import { AsnContext } from '../store/AsnContext';

class Asn extends React.Component {
    static contextType = AsnContext;

    state = {
        sortBy: 'count_v4',
    };

    componentDidMount() {
        if (!this.context.isFetching) {
            this.context.fetchSystems();
        }
    }

    get sortedSystems() {
        const key = this.state.sortBy;
        return Object.values(this.context.systems).sort((a, b) => {
            return b[key] - a[key];
        });
    }

    setSort = sortBy => {
        this.setState({ sortBy });
    };

    render() {
        const { sortBy } = this.state;

        return (
            <React.Fragment>
                <h3>IPv6 per Autonomous System</h3>
                <hr />
                <p>This is a list of the top 50 ASN's with sites that lacks IPv6</p>
                <div className="btn-group">
                    <button
                        className={`btn btn-outline-dark ${sortBy === 'count_v4' ? 'active' : ''}`}
                        onClick={() => this.setSort('count_v4')}
                        role="button"
                    >
                        Order by IPv4 Count
                    </button>
                    <button
                        className={`btn btn-outline-dark ${sortBy === 'count_v6' ? 'active' : ''}`}
                        onClick={() => this.setSort('count_v6')}
                        role="button"
                    >
                        Order by IPv6 Count
                    </button>
                    <button
                        className={`btn btn-outline-dark ${sortBy === 'percent_v6' ? 'active' : ''}`}
                        onClick={() => this.setSort('percent_v6')}
                        role="button"
                    >
                        Order by IPv6 Percent
                    </button>
                </div>
                <br />
                <br />
                <div className="row justify-content-md-center">
                    <div className="col-md">
                        <table className="table table-borderless v6-tables">
                            <thead className="thead-light">
                                <tr>
                                    <th scope="col">ASN</th>
                                    <th scope="col">Organization</th>
                                    <th scope="col">Dual-Stack Progress</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.sortedSystems.map(system => (
                                    <tr key={system.asn}>
                                        <td>{system.asn}</td>
                                        <td>{system.asname}</td>
                                        <td width="50%" className="progress-text">
                                            {system.count_v6} Dual-Stack<span className="float-right">
                                                {system.count_v4} IPv4 Only
                                            </span>
                                            <div className="progress progress-small">
                                                <div
                                                    style={{ width: `${system.percent_v6}%` }}
                                                    className="progress-bar"
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {/*<tr>
                                    <td>AS{'.Asn'}</td>
                                    <td>{'.Asname'}</td>
                                    <td width="50%" className="progress-text">
                                        {'.CountV6'} Dual-Stack<span className="float-right">
                                            {'.CountV4'} IPv4 Only
                                        </span>
                                        <div className="progress progress-small">
                                            <div style={{ width: `${country.PercentV6}%` }} className="progress-bar" />
                                        </div>
                                    </td>
                                </tr>*/}
                            </tbody>
                        </table>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Asn;
