import React, {Component} from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import {connect} from 'react-redux';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'

import Home from '../Home/Home';
import UserProfile from '../UserProfile/UserProfile';
import Welcome from '../Welcome/Welcome';
import RegisterPage from '../RegisterPage/RegisterPage';
import LoginPage from '../LoginPage/LoginPage';

import './App.css';

class App extends Component {
  componentDidMount () {
    this.props.dispatch({type: 'FETCH_USER'})
  }

  render() {
    return (
      <Router>
        <Switch>
          <Redirect exact from="/" to="/welcome" />
          <Route exact path="/welcome" component={Welcome}/>
          <Route exact path="/register" component={RegisterPage} />
          <Route exact path="/login" component={LoginPage}/>
          <ProtectedRoute
            exact
            path="/home"
            component={Home}
          />
          <ProtectedRoute
            exact
            path="/userprofile"
            component={UserProfile}
          />
        </Switch>
      </Router>
  )}
}

export default connect()(App);

// <div>
// <Nav />
// <Switch>
//   {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
  // <Redirect exact from="/" to="/home" />
//   {/* Visiting localhost:3000/about will show the about page.
//   This is a route anyone can see, no login necessary */}
//   <Route
//     exact
//     path="/about"
//     component={AboutPage}
//   />
//   {/* For protected routes, the view could show one of several things on the same route.
//   Visiting localhost:3000/home will show the UserPage if the user is logged in.
//   If the user is not logged in, the ProtectedRoute will show the 'Login' or 'Register' page.
//   Even though it seems like they are different pages, the user is always on localhost:3000/home */}
//   <ProtectedRoute
//     exact
//     path="/home"
//     component={UserPage}
//   />
//   {/* This works the same as the other protected route, except that if the user is logged in,
//   they will see the info page instead. */}
//   <ProtectedRoute
//     exact
//     path="/info"
//     component={InfoPage}
//   />
//   {/* If none of the other routes matched, we will show a 404. */}
//   <Route render={() => <h1>404</h1>} />
// </Switch>
// <Footer />
// </div>