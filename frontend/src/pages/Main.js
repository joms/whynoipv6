import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import Icon from '../components/Icon';
import CountryList from '../components/CountryList';
import { ListContext } from '../store/ListContext';
import StatsSummary from '../components/StatsSummary';

class Main extends React.Component {
    static contextType = ListContext;

    componentDidMount() {
        if (!this.context.sites.length && !this.context.isFetching) {
            this.context.fetchList();
        }
    }

    render() {
        return (
            <React.Fragment>
                <p>
                    It’s currently 2018 and it has been nearly 25 years since the work began on the IPv6 protocol
                    specifications. We have come a long way since then, surpassing milestones like allocating the last,
                    big IPV4 address blocks in 2011 to IEFT declaring IPv6 as an Internet Standard in 2017. Sadly, only
                    a fraction of the top one million websites today is IPv6-compliant.
                </p>
                <p>
                    So today we need to start shaming.
                    <strong>Shame! Shame! Shame!</strong>
                    <br /> Prepare for the future, dual-stack today!
                    <br />
                </p>
                <hr />
                <h2>Alexa Top 1 Million Websites - tagged by IPv6-compatibility </h2>
                <p>
                    As a part of this shaming-strategy, we supply all interested parties with an updated list over
                    Alexa’s top 1 million websites and their corresponding (lack of) IPv6 support clearly stated.
                    <br />
                    Each of the listed websites (top 100) lack an AAAA-record. In addition the nameserver-support for
                    IPv6 is displayed.
                </p>
                <hr />

                <h2>Some statistics</h2>
                <StatsSummary />
                <hr />
                <div className="row justify-content-md-center">
                    <div className="col-md-auto">
                        <table className="table table-borderless">
                            <thead className="thead-light">
                                <tr>
                                    <th scope="col">Alexa Rank</th>
                                    <th scope="col">Website</th>
                                    <th
                                        scope="col"
                                        data-toggle="tooltip"
                                        data-placement="top"
                                        title="If the site has an AAAA record"
                                    >
                                        IPv6
                                    </th>
                                    <th
                                        scope="col"
                                        data-toggle="tooltip"
                                        data-placement="top"
                                        title="If one or more of the nameserver for the site has AAAA record.
                                This is a required step towards proper IPv6 setup."
                                    >
                                        NS IPv6
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.context.sites.map(row => (
                                    <tr key={row.rank}>
                                        <td className="number">{row.rank}</td>
                                        <td className="site">
                                            {row.country && (
                                                <img
                                                    src={`https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.1.0/flags/4x3/${row.country.toLowerCase()}.svg`}
                                                />
                                            )}
                                            {row.hostname}
                                        </td>
                                        <td className="icon">
                                            {row.ipv6 && <Icon className="text-success" icon="check" />}
                                            {!row.ipv6 && <Icon className="text-danger" icon="times" />}
                                        </td>
                                        <td className="icon">
                                            {row.nsipv6 && <Icon className="text-success" icon="check" />}
                                            {!row.nsipv6 && <Icon className="text-danger" icon="times" />}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <hr />
                <h2 id="country">Reports by Country</h2>
                <p>Each of the following countries has a localised report of the top 50 websites without IPv6.</p>
                <div className="countries">
                    <CountryList url="country" />
                </div>

                <hr />

                <h2 id="resources">Resources for Going IPv6</h2>
                <p>
                    If you're responsible for a website and aren't sure why IPv6 is important or would like resources to
                    help make the transition, try these:
                </p>
                <ol>
                    <li>
                        <a href="https://www.internetsociety.org/deploy360/ipv6/training/">IPv6 Training</a>
                    </li>
                    <li>
                        <a href="https://www.google.com/intl/en/ipv6/statistics.html#tab=ipv6-adoption">
                            IPv6 adoption statistics
                        </a>
                    </li>
                    <li>
                        <a href="https://ready.chair6.net/">Is your site IPv6 ready?</a>
                    </li>
                    <li>
                        <a href="http://www.worldipv6launch.org/">World IPv6 Launch</a>
                    </li>
                </ol>
            </React.Fragment>
        );
    }
}

export default withRouter(Main);
