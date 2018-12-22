import React from 'react';
import LazyLoad from 'react-lazy-load';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { CountryContext } from '../store/CountryContext';

class CountryList extends React.Component {
    static contextType = CountryContext;

    componentDidMount() {
        if (!this.context.countries.length && !this.context.isFetching) {
            this.context.fetchCountries();
        }
    }

    render() {
        return this.context.countries
            .sort((a, b) => {
                const nameA = a.CountryCode;
                const nameB = b.CountryCode;
                if (nameA < nameB) return -1;
                if (nameA > nameB) return 1;
                return 0;
            })
            .map(country => (
                <Link to={`${this.props.url}/${country.CountryCode.toLowerCase()}`} key={country.CountryCode}>
                    <LazyLoad debounce={false} offsetVertical={500}>
                        <img
                            src={`https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.1.0/flags/4x3/${country.CountryCode.toLowerCase()}.svg`}
                            alt={country.CountryName}
                        />
                    </LazyLoad>
                    {country.CountryCode}
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
