import React, { useEffect, useContext } from 'react';
import LazyLoad from 'react-lazy-load';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { CountryContext } from '../store/CountryContext';

const CountryList = props => {
    const {_didFetch, isFetching, fetchCountries, countries} = useContext(CountryContext);

    useEffect(() => {
        if (!_didFetch && !isFetching) {
            fetchCountries();
        }
    });

    return Object.values(countries)
        .sort((a, b) => {
            const nameA = a.countrycode;
            const nameB = b.countrycode;
            if (nameA < nameB) return -1;
            if (nameA > nameB) return 1;
            return 0;
        })
        .map(country => (
            <Link to={`${props.url}/${country.countrycode.toLowerCase()}`} key={country.countrycode}>
                <LazyLoad debounce={false} offsetVertical={500}>
                    <img
                        src={`https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.1.0/flags/4x3/${country.countrycode.toLowerCase()}.svg`}
                        alt={country.countryname}
                    />
                </LazyLoad>
                {country.countrycode}
            </Link>
        ));
};

CountryList.defaultProps = {
    url: '',
};

CountryList.propTypes = {
    url: PropTypes.string,
};

export default CountryList;
