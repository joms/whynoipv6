import React from 'react';
import { apiFetch } from '../utils/api';

let StatsContext;
const { Provider, Consumer } = (StatsContext = React.createContext());

class StatsProvider extends React.Component {
    state = {
        stats: {},
        isFetching: 0,
        error: null,
    };

    fetchStats = () => {
        this.setState({ isFetching: this.state.isFetching + 1 });
        apiFetch('/stats')
            .then(stats => this.setState({ stats, isFetching: this.state.isFetching - 1 }))
            .catch(error => this.setState({ error, isFetching: this.state.isFetching - 1 }));
    };

    render() {
        return <Provider value={{ ...this.state, fetchStats: this.fetchStats }}>{this.props.children}</Provider>;
    }
}

export { StatsProvider, Consumer as StatsConsumer, StatsContext };
