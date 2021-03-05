import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import AuthLayout from './components/AuthLayout';
import Activate from './components/Activate';
import Layout from './components/Layout';
import { Provider } from 'react-redux';
import store from './store';
import PrivateRoute from './components/RestrictedRoute'



const App = () => (
    <Provider store={store}>
        <Router>
        <Layout>
                <Switch>
                    <PrivateRoute path='/dashboard' render={(props)=> <Home {...props} />} />
                    <Route path='/activate/:uid/:token' component={Activate} />
                    <Route path='/' component={AuthLayout} />
                </Switch>
        </Layout>
        </Router>
    </Provider>
);

export default App;