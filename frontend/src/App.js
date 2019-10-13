import React, { lazy, Suspense, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Icon from './components/Icon';

const MainPage = lazy(() => import('./pages/Main'));
const Country = lazy(() => import('./pages/Country'));
const StatsCountry = lazy(() => import('./pages/StatsCountry'));
const Asn = lazy(() => import('./pages/Asn'));
const About = lazy(() => import('./pages/About'));

const App = () => {
    const [showMenu, setShowMenu] = useState(false);

    const toggleMenu = () => setShowMenu(!showMenu);

    const hideMenuCond = () => (showMenu ? setShowMenu(false) : null);

    return (
        <Router>
            <div id="wrapper" className={`${showMenu ? 'toggled' : ''}`}>
                <div className="d-flex">
                    <div id="sidebar-wrapper" className="bg-light">
                        <Sidebar onClick={hideMenuCond} />
                    </div>

                    <div id="page-content-wrapper" className="mt-4 container" onClick={hideMenuCond}>
                        <button
                            className="btn btn-dark d-md-none"
                            onClick={toggleMenu}
                            style={{
                                position: 'absolute',
                                top: '1rem',
                                right: '1rem',
                            }}
                        >
                            <Icon icon="bars" />
                        </button>

                        <main role="main">
                            <h1>
                                <Link to="/" className="noline">
                                    Why No IPv6?
                                </Link>
                            </h1>

                            <Switch>
                                <Suspense fallback={<div>Loading...</div>}>
                                    <Route exact path="/" component={MainPage} />
                                    <Route exact path="/country" component={Country} />
                                    <Route exact path="/country/:countryCode" component={StatsCountry} />
                                    <Route exact path="/stats/asn" component={Asn} />
                                    <Route exact path="/about" component={About} />
                                </Suspense>
                                <Route component={() => <h1>404</h1>} />
                            </Switch>
                        </main>

                        <footer>
                            <p>
                                Built by <a href="https://twitter.com/hasselaugen">Lasse Haugen</a> with data from{' '}
                                <a href="https://crawler.ninja/">crawler.ninja</a>
                            </p>
                        </footer>
                    </div>
                </div>
            </div>
        </Router>
    );
};

export default App;
