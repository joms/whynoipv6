import React from 'react';
import LazyLoad from 'react-lazy-load';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { CountryContext } from '../store/CountryContext';

class CountryList extends React.Component {
    static contextType = CountryContext;

    componentDidMount() {
        if (!this.context._didFetch) {
            this.context.fetchCountries();
        }
    }

    render() {
        return Object.values(this.context.countries)
            .sort((a, b) => {
                const nameA = a.countrycode;
                const nameB = b.countrycode;
                if (nameA < nameB) return -1;
                if (nameA > nameB) return 1;
                return 0;
            })
            .map(country => (
                <Link to={`${this.props.url}/${country.countrycode.toLowerCase()}`} key={country.countrycode}>
                    <LazyLoad debounce={false} offsetVertical={500}>
                        <img
                            src={`https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.1.0/flags/4x3/${country.countrycode.toLowerCase()}.svg`}
                            alt={country.countryname}
                        />
                    </LazyLoad>
                    {country.countrycode}
                </Link>
            ));
    }

    static defaultProps = {
        url: '',
    };

    static propTypes = {
        url: PropTypes.string,
    };
}

export default CountryList;
