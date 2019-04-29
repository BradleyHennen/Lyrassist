import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import LogOutButton from '../LogOutButton/LogOutButton';
import ProfileButton from '../ProfileButton/ProfileButton';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
        marginLeft: 30,
    },
    images: {
        width: 100,
        margin: theme.spacing.unit,
    },
    button: {
        margin: theme.spacing.unit,
    }
});

const Header = (props) => {
    const { classes } = props;
    console.log('Props header: ', props);
    
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <img className={classes.images} src="/images/LyrAssist_logo.svg" alt="lyrAssist Logo" />
                    <Typography variant="h6" color="inherit" className={classes.grow}>
                        Welcome, {props.user.first_name} {props.user.last_name}!
                    </Typography>
                    {window.location.hash !== '#/userprofile' ?
                    <ProfileButton className={classes.button}/>
                    : <span></span>}
                    <LogOutButton className={classes.button}/>
                </Toolbar>
            </AppBar>
        </div>
    )
}

// Instead of taking everything from state, we just want the error messages.
// if you wanted you could write this code like this:
// const mapStateToProps = ({errors}) => ({ errors });
const mapStateToProps = state => ({
    errors: state.errors,
    user: state.user,
});

Header.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(withStyles(styles)(Header));