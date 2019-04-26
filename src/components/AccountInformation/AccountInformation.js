import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';



const styles = theme => ({
    root: {
        flexGrow: 1,
        marginTop: 20,

    },
    paper: {
        margin: "auto",
        // maxWidth: 700,
        padding: theme.spacing.unit * 3,
        // textAlign: "left",
    },
    button: {
        width: 200,
        marginRight: theme.spacing.unit,
    }
});

const AccountInformation = (props) => {

    const { classes } = props;
    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
            <Grid container spacing={16}>
                <Grid item xs={12}>
                    <Typography align="center" variant="h3">Account Information</Typography>
                </Grid>
                <Grid item xs={6} >
                    <Typography variant="h6">Your Story:</Typography>
                    <Typography variant="body1">{props.user.description}</Typography>
                </Grid>
                <Grid item sm xs={6} container>
                    <Grid item xs container direction="column" spacing={16}>
                        <Typography variant="h6">First Name:</Typography>
                        <Typography variant="body1">{props.user.first_name}</Typography>
                        <Typography variant="h6">Last Name:</Typography>
                        <Typography variant="body1">{props.user.last_name}</Typography>
                        <Typography variant="h6">User Name:</Typography>
                        <Typography variant="body1">{props.user.username}</Typography>
                        <Typography variant="h6">Email:</Typography>
                        <Typography variant="body1">{props.user.email}</Typography>
                        <Typography variant="h6">Password:</Typography>
                        <Button 
                            disabled 
                            className={classes.button}
                            variant="contained" 
                            color="primary"
                        >Change Password
                        </Button>
                    </Grid>
                </Grid>
                </Grid>
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