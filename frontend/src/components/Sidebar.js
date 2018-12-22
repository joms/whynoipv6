import React from 'react';
import { withRouter, NavLink, Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import Icon from './Icon';

const Sidebar = ({ history, match, location }) => {
    const urlSplit = location.pathname.split('/');
    const { hash } = location;
    const active = urlSplit[urlSplit.length - 1];

    return (
        <nav className="col-md-2 d-none d-md-block bg-light sidebar">
            <div className="sidebar-sticky">
                <ul className="nav flex-column">
                    <li className="nav-item">
                        <Link className={`nav-link ${!hash && active === '' ? 'active' : ''}`} to="/" onClick={() => window.scrollTo(0, 0)}>
                            <Icon icon="home" />
                            Home <span className="sr-only">(current)</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <HashLink className={`nav-link ${hash === '#country' ? 'active' : ''}`} to="/#country">
                            <Icon icon="layer-group" />
                            Country List
                        </HashLink>
                    </li>
                    <li className="nav-item">
                        <HashLink className={`nav-link ${hash === '#resources' ? 'active' : ''}`} to="/#resources">
                            <Icon icon="bookmark" />
                            Resources
                        </HashLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/about">
                            <Icon icon="info-circle" />
                            About
                        </NavLink>
                    </li>
                </ul>

                <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                    <span>Statistics</span>
                    <a className="d-flex align-items-center text-muted" href="#" />
                </h6>
                <ul className="nav flex-column mb-2">
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/stats/country">
                            <Icon icon="file-alt" />
                            By Country
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/stats/asn">
                            <Icon icon="file-alt" />
                            By Autonomous System
                        </NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default withRouter(Sidebar);
