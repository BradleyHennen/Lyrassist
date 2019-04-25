import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
// import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
// import Grid from '@material-ui/core/Grid';
import CreateLyrics from '../CreateLyrics/CreateLyrics';

import { Droppable } from 'react-beautiful-dnd';
// import Task from './task.jsx';



const styles = theme => ({
    container: {
        margin: "20px, auto",
        border: "1px solid black",
        borderRadius: 10,
        width: "50%",
    },
    list: {
        padding: 8,
    }
})

class CreateLyricCards extends Component {


    render() {
        const { classes } = this.props;

        return (
            <Paper className={classes.container}>
                <Typography variant="h5">{this.props.lyricData.label_name}</Typography>
                <Typography variant="body1">{this.props.lyricData.lyrics}</Typography>
                <Button variant="contained" color="primary">Delete</Button>
                <Button variant="contained" color="primary">Edit</Button>
            </Paper>
        );
    }
}

const mapStateToProps = reduxState => ({
    reduxState
});

CreateLyricCards.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(withStyles(styles)(CreateLyricCards));