import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { browserHistory, Router, Route, IndexRoute, Link } from 'react-router';

import configureStore from './data/configureStore';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import App from './App';
import Node from './containers/Node';
import DevTools from './containers/DevTools';

const store = configureStore();

const Root = React.createClass({
    render() {
        return <div>
            <h1>Root</h1>
            <div>{ this.props.children }</div>
        </div>
    }
});

const Index = React.createClass({
    render() {
        return <div>
            <h2>Index</h2>
        </div>
    }
});

const Item = React.createClass({
    render() {
        return <div>
            <h2>Item</h2>
        </div>
    }
});

const NotFound = React.createClass({
    render() {
        return <span>Not found</span>
    }
});


ReactDOM.render(
    <Provider store={ store }>
        <Router history={ browserHistory }>
            <Route path="/" component={ App }>
                <IndexRoute component={ Index }/>
                {/*<Route path="contact/new" component={ Node }/>*/}
                <Route path="node/:id" component={ Node }/>
                 <Route path="*" component={ NotFound }/>
            </Route>
        </Router>
    </Provider>
    , document.getElementById( 'root' ) );
