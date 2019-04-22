import React, { Component } from 'react';
import { connect } from 'react-redux';
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
    marginRight: '4%',
    marginLeft: '4%',
    padding: theme.spacing.unit * 2,
    textAlign: "center",
  }
})

class RegisterPage extends Component {
  state = {
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
    firstName: '',
    lastName: '',
    description: '',
  };

  registerUser = (event) => {
    event.preventDefault();

    if (this.state.username && this.state.password && this.state.password === this.state.confirmPassword) {
      this.props.dispatch({
        type: 'REGISTER',
        payload: {
          username: this.state.username,
          password: this.state.password,
          email: this.state.email,
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          description: this.state.description,
        },
      });
      this.props.history.push('/home');
    } else {
      this.props.dispatch({ type: 'REGISTRATION_INPUT_ERROR' });
    }
  } // end registerUser

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          spacing={24}
        >
          <Paper className={classes.paper}>
            {this.props.errors.registrationMessage && (
             <Typography
                variant="h2"
                className="alert"
                role="alert"
              >
                {this.props.errors.registrationMessage}
              </Typography>
            )}

            <form className={classes.container} noValidate autoComplete="off" onSubmit={this.registerUser}>
              <Typography variant="h2">Register User</Typography>
              <Grid item xs={12}>
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
                <TextField
                  required  
                  type="password"
                  label="Confrim Password"
                  className={classes.textField}
                  value={this.state.confirmPassword}
                  onChange={this.handleInputChangeFor('confirmPassword')}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  label="Email Address"
                  type="email"
                  className={classes.textField}
                  value={this.state.email}
                  onChange={this.handleInputChangeFor('email')}
                  margin="normal"
                />
                <TextField
                  label="First Name"
                  type="text"
                  className={classes.textField}
                  value={this.state.firstName}
                  onChange={this.handleInputChangeFor('firstName')}
                  margin="normal"
                />
                <TextField
                  label="Last Name"
                  type="text"
                  className={classes.textField}
                  value={this.state.lastName}
                  onChange={this.handleInputChangeFor('lastName')}
                  margin="normal"
                />
              </Grid>
              <TextField
                label="Description"
                multiline
                rows="5"
                value={this.state.description}
                onChange={this.handleInputChangeFor('description')}
                className={classes.textField}
                margin="normal"
                fullWidth
              />
              <Button
                type="submit"
                name="submit"
                variant="contained"
                color="primary"
              >
                Register
              </Button>
            </form>
          </Paper>
          <Grid item xs={12}>
              <Typography variant="h2" >Already Registered?</Typography>
              <Button
                type="button"
                variant="contained"
                color="primary"
                onClick={() => { 
                  this.props.dispatch({type: 'SET_TO_LOGIN_MODE'}); 
                  this.props.history.push('/login'); 
                }}
              >
                Login
              </Button>
            </Grid>
        </Grid>
      </div>
    );
  }
}

// Instead of taking everything from state, we just want the error messages.
// if you wanted you could write this code like this:
// const mapStateToProps = ({errors}) => ({ errors });
const mapStateToProps = state => ({
  errors: state.errors,
});

RegisterPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(withStyles(styles)(RegisterPage));

