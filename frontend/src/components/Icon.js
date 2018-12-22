import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

const Icon = ({ icon, type, className }) => {
    const classes = cx(type, `fa-${icon}`, className);

    return <i className={classes} />;
};

Icon.defaultProps = {
    type: 'fas',
};

Icon.propTypes = {
    icon: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['fas', 'fab', 'far']),
};

export default Icon;
