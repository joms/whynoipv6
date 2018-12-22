import React from 'react';

class StatsAsn extends React.Component {
    state = {
        sortBy: '',
    };

    render() {
        return (
            <React.Fragment>
                <h3>IPv6 per Autonomous System</h3>
                <hr />
                <p>This is a list of the top 50 ASN's with sites that lacks IPv6</p>
                <div id="sorting">
                    <button className="btn btn-outline-dark noline active" href="?order=ipv4" role="button" id="sort">
                        Order by IPv4 Count
                    </button>
                    <button className="btn btn-outline-dark noline" href="?order=ipv6" role="button" id="sort">
                        Order by IPv6 Count
                    </button>
                    <button className="btn btn-outline-dark noline" href="?order=percent" role="button" id="sort">
                        Order by IPv6 Percent
                    </button>
                </div>
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
                                <tr>
                                    <td>AS{'.Asn'}</td>
                                    <td>{'.Asname'}</td>
                                    <td width="50%" className="progress-text">
                                        {'.CountV6'} Dual-Stack<span className="float-right">
                                            {'.CountV4'} IPv4 Only
                                        </span>
                                        {/*<div className="progress progress-small">
                                            <div style={{ width: `${country.PercentV6}%` }} className="progress-bar" />
                                        </div>*/}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default StatsAsn;
