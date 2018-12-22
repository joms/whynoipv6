import React from 'react';
import { apiFetch } from '../utils/api';

let ListContext;
const { Consumer, Provider } = (ListContext = React.createContext());

class ListProvider extends React.Component {
    state = {
        sites: [],
        isFetching: 0,
        error: null,
    };

    fetchList = () => {
        this.setState({ isFetching: this.state.isFetching + 1 });
        apiFetch()
            .then(sites => this.setState({ sites, isFetching: this.state.isFetching - 1 }))
            .catch(error => this.setState({ error, isFetching: this.state.isFetching - 1 }));
    };

    render() {
        return <Provider value={{ ...this.state, fetchList: this.fetchList }}>{this.props.children}</Provider>;
    }
}

export { ListProvider, Consumer as ListConsumer, ListContext };
