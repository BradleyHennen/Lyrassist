import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles, TextField } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
// import Grid from '@material-ui/core/Grid';
import CreateLyrics from '../CreateLyrics/CreateLyrics';
import { Droppable } from 'react-beautiful-dnd';



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

    state = {
        editLyrics: false,
        updatedLyrics: {
            lyric_id: this.props.lyricData.lyrics_id,
            song_label_id: this.props.lyricData.song_label_id,
            label_name: this.props.lyricData.label_name,
            lyrics: this.props.lyricData.lyrics,
        }
    }

    componentDidMount = () => {
        this.props.dispatch({ type: 'GET_SONG_PART_LIST' });
        this.props.dispatch({ type: 'GET_LYRICS', payload: this.props.songId });
    }

    handleDelete = () => {
        this.props.dispatch({ type: 'DELETE_LYRIC_CARD', payload: this.props.lyricData.lyrics_id })
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
        this.props.dispatch({ type: 'UPDATE_LYRIC_CARD', payload: this.state.updatedLyrics });
        this.props.dispatch({ type: 'GET_LYRICS', payload: this.props.songId });
    }

    handleChangeForLyrics = propertyName => (event) => {
        this.setState({
            updatedLyrics: {
                ...this.state.updatedLyrics,
                [propertyName]: event.target.value
            }
        })
    }

    renderCards = () => {
        if (this.state.editLyrics === false) {
            return (
                <Paper>
                    <Typography variant="h5">{this.state.updatedLyrics.label_name}</Typography>
                    <Typography variant="body1">{this.state.updatedLyrics.lyrics}</Typography>
                    <Button variant="contained" color="primary" onClick={this.handleEdit}>Edit</Button>
                </Paper>
            )
        }
        else {
            return (
                <Paper>
                    <form>
                        <TextField
                            select
                            autoFocus
                            margin="dense"
                            label="Change Song Part"
                            className="textField"
                            value={this.state.updatedLyrics.song_label_id}
                            onChange={this.handleChangeForLyrics('song_label_id')}
                            SelectProps={{
                                MenuProps: {
                                    className: "menu",
                                },
                            }}
                            margin="normal"
                        >
                            {this.props.reduxState.songPartList.map(option => (
                                <MenuItem key={option.id} value={option.id}>
                                    {option.label_name}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            label="Edit Lyrics"
                            multiline
                            rows="4"
                            className="textFieldMultiline"
                            value={this.state.updatedLyrics.lyrics}
                            onChange={this.handleChangeForLyrics('lyrics')}
                            margin="normal"
                        >
                        </TextField>
                    </form>
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