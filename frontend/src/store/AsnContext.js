import React from 'react';
import { apiFetch } from '../utils/api';
import { arrayNormalizer } from '../utils/normalizers';

let AsnContext;
const { Provider, Consumer } = (AsnContext = React.createContext());

class AsnProvider extends React.Component {
    state = {
        systems: {},
        isFetching: 0,
        error: null,
    };

    componentDidMount() {
        this.debounce = window.setTimeout(() => {
            this.fetchSystems();
        }, 1500);
    }

    componentWillUnmount() {
        this.debounce && window.clearTimeout(this.debounce);
    }

    fetchSystems = () => {
        this.setState({ isFetching: this.state.isFetching + 1 });
        apiFetch('/stats/asn')
            .then(systems => {
                this.setState({
                    systems: arrayNormalizer(systems, 'asn'),
                    isFetching: this.state.isFetching - 1,
                });
            })
            .catch(error => this.setState({ error, isFetching: this.state.isFetching - 1 }));
    };

    fetchAsn = asnId => {
        this.setState({ isFetching: this.state.isFetching + 1 });
        apiFetch('/stats/asn/' + asnId)
            .then(asn =>
                this.setState({
                    systems: {
                        ...this.state.systems,
                        [asnId]: {
                            ...this.state.systems[asnId],
                            ...asn,
                        },
                    },
                    isFetching: this.state.isFetching - 1,
                })
            )
            .catch(error => this.setState({ error, isFetching: this.state.isFeching - 1 }));
    };

    render() {
        return (
            <Provider value={{ ...this.state, fetchSystems: this.fetchSystems, fetchAsn: this.fetchAsn }}>
                {this.props.children}
            </Provider>
        );
    }
}

export { AsnProvider, Consumer as AsnConsumer, AsnContext };
