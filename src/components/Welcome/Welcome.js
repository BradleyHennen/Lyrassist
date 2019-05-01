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
        width: "40vw",
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
                    <Typography variant="body1" className={classes.description}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tristique lectus nulla, vitae accumsan neque luctus quis. Ut rhoncus, libero id tristique ornare, odio sapien tincidunt enim, ac mattis elit ligula eget nulla. Suspendisse tempus arcu magna, non aliquet ex molestie sed. Aliquam vel dolor eget lorem sollicitudin ultricies vel et nisl. Proin ac enim tincidunt, pellentesque lectus nec, laoreet nisl. Donec eros leo, fringilla et odio sed, ultrices placerat eros. Cras tincidunt risus lectus, quis placerat risus sagittis sit amet. Suspendisse finibus diam eget augue gravida placerat. Mgula vel, vestibulum ultrices felis. Nulla semper maximus consequat. Nunc in malesuada risus. Nullam viverra ornare nulla, non cursus felis convallis sit amet. Nullam consequat ligula ante.
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