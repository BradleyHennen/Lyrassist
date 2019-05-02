import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles, TextField } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import EditIcon from '@material-ui/icons/Create';
import SaveIcon from '@material-ui/icons/Save';

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
        // width: 200,
        marginTop: 20,
        margin: theme.spacing.unit,
    },
    leftIcon: {
        marginRight: theme.spacing.unit,
        fontSize: 20,
    },
});

class AccountInformation extends Component {

    state = {
        open: false,
        userInfo: {
            first_name: this.props.user.first_name,
            last_name: this.props.user.last_name,
            username: this.props.user.username,
            email: this.props.user.email,
            description: this.props.user.description,
        }
    }

    

    handleEdit = () => {
        console.log('state', this.state);

        this.setState({
            open: !this.state.open
        })
    }

    handleSave = () => {
        this.setState({
            open: !this.state.open
        })

        this.props.dispatch({type: 'UPDATE_USER_INFO', payload: this.state.userInfo})
    }

    handleChangeForLyrics = propertyName => (event) => {
        this.setState({
            userInfo: {
                ...this.state.userInfo,
                [propertyName]: event.target.value
            }
        })
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <Paper className={classes.paper}>
                    {this.state.open === false ?
                            <Grid container spacing={16}>
                                <Grid item xs={12}>
                                    <Typography align="center" variant="h3">Account Information</Typography>
                                </Grid>
                                <Grid item xs={6} >
                                    <Typography variant="h6">Your Story:</Typography>
                                    <Typography style={{whiteSpace: 'pre-line'}} variant="body1">{this.props.user.description}</Typography>
                                </Grid>
                                <Grid item sm xs={6} container>
                                    <Grid item xs container direction="column" spacing={16}>
                                        <Typography variant="h6">First Name:</Typography>
                                        <Typography variant="body1">{this.props.user.first_name}</Typography>
                                        <Typography variant="h6">Last Name:</Typography>
                                        <Typography variant="body1">{this.props.user.last_name}</Typography>
                                        <Typography variant="h6">User Name:</Typography>
                                        <Typography variant="body1">{this.props.user.username}</Typography>
                                        <Typography variant="h6">Email:</Typography>
                                        <Typography variant="body1">{this.props.user.email}</Typography>
                                        <Button
                                            variant="contained"
                                            onClick={this.handleEdit}
                                            className={classes.button}
                                            color="primary"
                                        >
                                            <EditIcon className={classes.leftIcon} />
                                            Edit
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        :
                            <Grid container spacing={16}>

                                <Grid item xs={12}>
                                    <Typography align="center" variant="h3">Account Information</Typography>
                                </Grid>
                                <Grid item xs={6} >
                                    <Typography variant="h6">Your Story:</Typography>
                                    <TextField
                                    multiline
                                    fullWidth
                                    rowsMax="50"
                                    className={classes.textField}
                                    value={this.state.userInfo.description}
                                    onChange={this.handleChangeForLyrics('description')}
                                    >
                                    </TextField>
                                </Grid>
                                <Grid item sm xs={6} container>
                                    <Grid item xs container direction="column" spacing={16}>
                                        <Typography variant="h6">First Name:</Typography>
                                        <TextField
                                            className={classes.textField}
                                            value={this.state.userInfo.first_name}
                                            onChange={this.handleChangeForLyrics('first_name')}
                                        >
                                        </TextField>
                                        <Typography variant="h6">Last Name:</Typography>
                                        <TextField
                                            className={classes.textField}
                                            value={this.state.userInfo.last_name}
                                            onChange={this.handleChangeForLyrics('last_name')}
                                        >
                                        </TextField>
                                        <Typography variant="h6">User Name:</Typography>
                                        <TextField
                                            className={classes.textField}
                                            value={this.state.userInfo.username}
                                            onChange={this.handleChangeForLyrics('username')}
                                        >
                                        </TextField>
                                        <Typography variant="h6">Email:</Typography>
                                        <TextField
                                            className={classes.textField}
                                            value={this.state.userInfo.email}
                                            onChange={this.handleChangeForLyrics('email')}
                                        >
                                        </TextField>
                                        <Button
                                            variant="contained"
                                            onClick={this.handleSave}
                                            className={classes.button}
                                            color="primary"
                                        >
                                            <SaveIcon className={classes.leftIcon} />
                                            Save
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                    }
                </Paper>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user,
});

AccountInformation.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(withStyles(styles)(AccountInformation));