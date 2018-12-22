import React from 'react';
import { apiFetch } from '../utils/api';

let ListContext;
const { Consumer, Provider } = (ListContext = React.createContext());

class ListProvider extends React.Component {
    state = {
        sites: [],
        isFetching: 0,
        error: null,
        _didFetch: false,
    };

    componentDidMount() {
        this.debounce = window.setTimeout(() => {
            if (!this.state._didFetch) {
                this.fetchList();
            }
        }, 1500);
    }

    componentWillUnmount() {
        this.debounce && window.clearTimeout(this.debounce);
    }

    fetchList = () => {
        this.setState({ isFetching: this.state.isFetching + 1, _didFetch: true });
        apiFetch()
            .then(sites => this.setState({ sites, isFetching: this.state.isFetching - 1 }))
            .catch(error => this.setState({ error, isFetching: this.state.isFetching - 1 }));
    };

    render() {
        return <Provider value={{ ...this.state, fetchList: this.fetchList }}>{this.props.children}</Provider>;
    }
}

export { ListProvider, Consumer as ListConsumer, ListContext };
