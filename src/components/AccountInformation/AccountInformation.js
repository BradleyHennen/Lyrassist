import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';


const styles = {
    
};

const AccountInformation = (props) => {

    const { classes } = props;
    return (
        <div>
            <Typography variant="h3">Account Information</Typography>
            <Paper>
                <Typography variant="h6">Your Story:</Typography>
                <Typography variant="body1">{props.user.description}</Typography>
                <Typography variant="h6">First Name:</Typography>
                <Typography variant="body1">{props.user.first_name}</Typography>
                <Typography variant="h6">Last Name:</Typography>
                <Typography variant="body1">{props.user.last_name}</Typography>
                <Typography variant="h6">User Name:</Typography>
                <Typography variant="body1">{props.user.username}</Typography>
                <Typography variant="h6">Email:</Typography>
                <Typography variant="body1">{props.user.email}</Typography>
                <Typography variant="h6">Password:</Typography>
                <Button variant="contained" color="primary">Change Password</Button>
            </Paper>
        </div>
    )
}

const mapStateToProps = state => ({
    user: state.user,
});

AccountInformation.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(withStyles(styles)(AccountInformation));