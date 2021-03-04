import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import AuthLayout from './components/AuthLayout';
import Success from './components/Alert';
import Activate from './components/Activate';
import Google from './components/Google';
import Layout from './components/Layout';
import { Provider } from 'react-redux';
import store from './store';


const App = () => (
    <Provider store={store}>
        <Router>
        <Layout>
                <Switch>
                    <Route exact path='/' component={AuthLayout} />
                    <Route exact path='/success' component={Success} />
                    <Route exact path='/dashboard' component={Home} />
                    <Route exact path='/google' component={Google} />
                    <Route exact path='/activate/:uid/:token' component={Activate} />
                </Switch>
        </Layout>
        </Router>
    </Provider>
);

export default App;