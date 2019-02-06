import React, { useEffect, useContext } from 'react';
import { StatsContext } from '../store/StatsContext';

const StatsSummary = () => {
    const { stats, isFetching, fetchStats } = useContext(StatsContext);

    useEffect(() => {
        if (!Object.keys(stats.all).length && !isFetching) {
            fetchStats();
        }
    });

    if (!Object.keys(stats.all).length) {
        return <>Loading...</>;
    }

    return (
        <p>
            Out of the top 1000 Alexa sites, only {stats.all.top_1k_v6} has IPv6 enabled, and {stats.all.top_1k_v6} of
            them use name servers with IPv6 enabled.
            <br />
            Of the total {stats.all.sites} sites only {stats.all.percent_v6}% of them have IPv6. This is a huge shame!
        </p>
    );
};

export default StatsSummary;
