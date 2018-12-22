import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';

const MainPage = lazy(() => import('./pages/Main'));
const About = lazy(() => import('./pages/About'));

const App = () => {
    return (
        <Router>
            <div className="container-fluid">
                <div className="row">
                    <Sidebar />

                    <div className="row">
                        <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
                            <Switch>
                                <Suspense fallback={<div>Loading...</div>}>
                                    <Route exact path="/" component={MainPage} />
                                    <Route exact path="/about" component={About} />
                                </Suspense>
                                <Route component={() => <h1>404</h1>} />
                            </Switch>
                        </main>

                        <footer className="col-md-9 ml-sm-auto col-lg-10 px-4">
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
