import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles, TextField } from '@material-ui/core';
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

    state= {
        editLyrics: false,
        lyrics: this.props.lyricData.lyrics,
    }

    handleDelete = () => {
        this.props.dispatch({type: 'DELETE_LYRIC_CARD', payload: this.props.lyricData.lyrics_id})
        console.log('songId params', this.props.songId);
        
        this.props.dispatch({ type: 'GET_LYRICS', payload: this.props.songId });
    }

    handleEdit = () => {
        this.setState({
            editLyrics: true,
        })
    }

    handleSave = () => {
        this.setState({
            editLyrics: false,
        });
        this.props.dispatch({type: 'SAVE_LYRIC_CARD'})
    }

    handleChangeForLyrics = (event) => {
        this.setState({
            lyrics: event.target.value
        })
    }

    renderCards = () => {
        if(this.state.editLyrics === false) {
           return (
               <Paper>
                    <Typography variant="h5">{this.props.lyricData.label_name}</Typography>
                    <Typography variant="body1">{this.state.lyrics}</Typography>
                    <Button variant="contained" color="primary" onClick={this.handleEdit}>Edit</Button>
                </Paper>
           )
        } 
        else {
            return (
                <Paper>
                    <Typography variant="h5">{this.props.lyricData.label_name}</Typography>
                    <TextField 
                        label="Edit"
                        multiline
                        rows="4"
                        value={this.state.lyrics}
                        onChange={this.handleChangeForLyrics}
                        margin="normal"
                    >
                    </TextField>
                    <Button variant="contained" color="primary" onClick={this.handleDelete}>Delete</Button>
                    <Button variant="contained" color="primary" onClick={this.handleSave}>Save</Button>
                </Paper>
            )
        }
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.container}>
                {this.renderCards()} 
            </div>
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