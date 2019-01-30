import React from 'react';
import { StatsContext } from '../store/StatsContext';

class StatsSummary extends React.Component {
    static contextType = StatsContext;

    componentDidMount() {
        if (!Object.keys(this.context.stats).length && !this.context.isFetching) {
            this.context.fetchStats();
        }
    }

    render() {
        if (!Object.keys(this.context.stats.all).length) {
            return <React.Fragment />;
        }

        const { stats } = this.context;

        return (
            <p>
                Out of the top 1000 Alexa sites, only {stats.all.top_1k_v6} has IPv6 enabled, and {stats.all.top_1k_v6}{' '}
                of them use name servers with IPv6 enabled.
                <br />
                Of the total {stats.all.sites} sites only {stats.all.percent_v6}% of them have IPv6. This is a huge
                shame!
            </p>
        );
    }
}

export default StatsSummary;
