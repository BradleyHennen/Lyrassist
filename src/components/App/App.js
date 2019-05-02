import React, { Component } from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import { connect } from 'react-redux';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'

//----View imports----
import Home from '../Home/Home';
import UserProfile from '../UserProfile/UserProfile';
import Welcome from '../Welcome/Welcome';
import RegisterPage from '../RegisterPage/RegisterPage';
import LoginPage from '../LoginPage/LoginPage';

//----Styling and theme imports----
import './App.css';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import theme from './theme';

class App extends Component {
  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_USER' })
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Router>
          <Switch>
            <Redirect exact from="/" to="/welcome" />
            <Route exact path="/welcome" component={Welcome} />
            <Route exact path="/register" component={RegisterPage} />
            <Route exact path="/login" component={LoginPage} />
            <ProtectedRoute
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
      </MuiThemeProvider>
    )
  }
}

export default connect()(App);