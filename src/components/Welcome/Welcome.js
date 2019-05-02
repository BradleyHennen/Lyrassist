import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    root: {
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        marginRight: '4%',
        marginLeft: '4%',
        marginTop: '1%',
        background: "rgba(255,255,255,0.8)",
    },
    description: {
        textAlign: "center",
        width: "50%",
        height: "25%",
        marginTop: 20,
        marginLeft: "auto",
        marginRight: "auto",
        display: "block",
    },
    images: {
        width: "30vw",
        marginLeft: "auto",
        marginRight: "auto",
        display: "block",
    },
    button: {
        width: "20%",
        display: "block",
        marginTop: 20,
        marginLeft: "auto",
        marginRight: "auto",
    }
});

class Welcome extends Component {

    register = () => {
        this.props.history.push('/register')
    }

    render() {
        const { classes } = this.props;

        return (
            <div>
                {/* <Paper className={classes.root}>
                    <Typography variant="h2" className={classes.header}>LyrAssist</Typography>
                </Paper> */}
                <Paper className={classes.root}>
                    <img className={classes.images} src="/images/LyrAssist_logo.svg" alt="lyrAssist Logo"/>
                    <Typography variant="h3" className={classes.description}>Welcome To LyrAssist</Typography>
                    <Typography variant="subtitle1" className={classes.description}>
                        LyrAssist is an application designed to help you along your lyric writing journey. With the help of the assistant you will be 
                        able to find a plethora of words and phrases that will help you break through that writers block that has been holding you 
                        back. You will effortlessly create, edit, and manage Lyric Cards as you write. If something feels out of place just drag and drop
                        the cards to and fro until it fits the order you like best. So again, welcome to LyrAssist! Click the 'Start Writing' button to begin
                        your journey to writing the lyrics you have always wanted.  
                    </Typography>
                    <Button variant="contained" color="primary" className={classes.button} onClick={this.register}>
                        Start Writing
                    </Button>
                </Paper>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    errors: state.errors,
});

Welcome.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(withStyles(styles)(Welcome));