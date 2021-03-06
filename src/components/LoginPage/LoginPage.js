import React, { Component } from 'react';
import { connect } from 'react-redux';

//----Material UI----
import PropTypes from 'prop-types';
import { withStyles, TextField } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  root: {
    flexGrow: 1,
    textAlign: "center",
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  paper: {
    margin: "auto",
    maxWidth: 700,
    padding: theme.spacing.unit * 2,
    textAlign: "center",
  },
  button: {
    marginTop: 20,
    marginBottom: 15,
    paddingLeft: "5%",
    paddingRight: "5%",
  },
})

class LoginPage extends Component {
  state = {
    username: '',
    password: '',
  };

  login = (event) => {
    event.preventDefault();

    if (this.state.username && this.state.password) {
      this.props.dispatch({
        type: 'LOGIN',
        payload: {
          username: this.state.username,
          password: this.state.password,
        },
      });
      this.props.history.push('/userprofile');
    } else {
      this.props.dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  } // end login

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            spacing={24}
          >
            {this.props.errors.loginMessage && (
              <Typography
                className="alert"
                role="alert"
                variant="h3"
              >
                {this.props.errors.loginMessage}
              </Typography>
            )}
            <Grid item xs={12}>
              <form onSubmit={this.login}>
                <Typography variant="h1">Login</Typography>
                <TextField
                  required
                  label="Username"
                  value={this.state.username}
                  className={classes.textField}
                  onChange={this.handleInputChangeFor('username')}
                  margin="normal"
                />
                <TextField
                  required
                  type="password"
                  label="Password"
                  value={this.state.password}
                  className={classes.textField}
                  onChange={this.handleInputChangeFor('password')}
                  margin="normal"
                />
                <br />
                <Button
                  type="submit"
                  name="submit"
                  className={classes.button}
                  variant="contained"
                  color="primary"
                >
                  Log In
            </Button>
              </form>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h5">Need An Account?</Typography>
              <Button
                type="button"
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={() => {
                  this.props.dispatch({ type: 'SET_TO_REGISTER_MODE' });
                  this.props.history.push('./register');
                }}
              >
                Register
            </Button>
            </Grid>
          </Grid>
        </Paper>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  errors: state.errors,
});

LoginPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(withStyles(styles)(LoginPage));
