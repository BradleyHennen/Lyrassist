import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import LogOutButton from '../LogOutButton/LogOutButton';
import ProfileButton from '../ProfileButton/ProfileButton';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
// import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
        marginLeft: 30,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    images: {
        width: 100,
        // marginTop: 10,
        // marginBottom: 10,
        // marginRight: 20,
        margin: theme.spacing.unit,
    },
    button: {
        margin: theme.spacing.unit,
    }
});

const Header = (props) => {

    const { classes } = props;
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    {/* <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                        <MenuIcon />
                    </IconButton> */}
                    <img className={classes.images} src="/images/LyrAssist_logo.svg" alt="lyrAssist Logo" />

                    <Typography variant="h6" color="inherit" className={classes.grow}>
                        Welcome, {props.user.first_name} {props.user.last_name}!
                    </Typography>
                    <ProfileButton className={classes.button}/>
                    <LogOutButton />
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