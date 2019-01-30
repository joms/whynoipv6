import React from 'react';
import { apiFetch } from '../utils/api';

let StatsContext;
const { Provider, Consumer } = (StatsContext = React.createContext());

class StatsProvider extends React.Component {
    state = {
        stats: {
            all: {},
        },
        isFetching: 0,
        error: null,
        _didFetch: false,
    };

    componentDidMount() {
        this.debounce = window.setTimeout(() => {
            if (!this.state._didFetch) {
                this.fetchStats();
            }
        }, 1500);
    }

    componentWillUnmount() {
        this.debounce && window.clearTimeout(this.debounce);
    }

    fetchStats = () => {
        this.setState({ isFetching: this.state.isFetching + 1, _didFetch: true });
        apiFetch('/stats/country')
            .then(all =>
                this.setState({
                    stats: {
                        ...this.state.stats,
                        all,
                    },
                    isFetching: this.state.isFetching - 1,
                })
            )
            .catch(error => this.setState({ error, isFetching: this.state.isFetching - 1 }));
    };

    render() {
        return <Provider value={{ ...this.state, fetchStats: this.fetchStats }}>{this.props.children}</Provider>;
    }
}

export { StatsProvider, Consumer as StatsConsumer, StatsContext };
