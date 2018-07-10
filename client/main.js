import { Meteor } from 'meteor/meteor';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Switch, Route, withRouter } from 'react-router-dom';
import {Tracker} from 'meteor/tracker';
import createHistory from 'history/createBrowserHistory'
import {Session} from 'meteor/session';
import Dashboard from '../imports/ui/Dashboard';
import NotFound from '../imports/ui/NotFound';

export const history = createHistory();


//switch moves through route definitions in order till it finds a match so anything that
//doesnt match it defaults to the bottom router
//browserrouter requires 1 child element

//the inline rendering for route can be found at the bottom url
//https://www.sitepoint.com/react-router-v4-complete-guide/
const routes = (
  <Router history={history}>
            <Switch>


                <Route path="/" exact={true} render={ (props) => <Dashboard priavteOrPublic= {"privateRoute"} {...props} />} />


                <Route path="*" component={NotFound} />
            </Switch>
  </Router>
);




//on startup set the selected note to be undefined
Meteor.startup(() => {
  ReactDOM.render(routes, document.getElementById('app'));
});
