import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles, TextField } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
// import CreateLyrics from '../CreateLyrics/CreateLyrics';
import { Draggable } from 'react-beautiful-dnd';



const styles = theme => ({
    textField: {
        width: 200,
        marginRight: theme.spacing.unit,
    },
    paper: {
        padding: theme.spacing.unit,
        marginTop: 10,
    },
    menu: {
        width: 200,
    },
    container: {
        // border: "1px solid black",
        borderRadius: "10px",
        padding: 1,
        // marginBottom: "8px",
        // backgroundColor: "white",
    }
});

class CreateLyricCards extends Component {

    state = {
        editLyrics: false,
        updatedLyrics: {
            lyric_id: this.props.task.lyrics_id,
            song_label_id: this.props.task.song_label_id,
            label_name: this.props.task.label_name,
            lyrics: this.props.task.lyrics,
            song_id: this.props.task.song_id,
            index: this.props.task.index,
        }
    }

    componentDidMount = () => {
        this.props.dispatch({ type: 'GET_SONG_PART_LIST' });
    }

    handleDelete = (event) => {
        event.preventDefault();
        this.setState({
            editLyrics: false,
        });

        const deleteCard = {
            songId: this.state.updatedLyrics.song_id,
            lyricId: this.state.updatedLyrics.lyric_id,
        }
        this.props.dispatch({ type: 'DELETE_LYRIC_CARD', payload: deleteCard })
    }

    handleEdit = (event) => {
        event.preventDefault();        
        this.setState({
            editLyrics: true,
        })
    }

    handleSave = (event) => {
        event.preventDefault();
        this.setState({
            editLyrics: false,
        });
        this.props.dispatch({ type: 'UPDATE_LYRIC_CARD', payload: this.state.updatedLyrics });
    }

    handleChangeForLyrics = propertyName => (event) => {
        this.setState({
            updatedLyrics: {
                ...this.state.updatedLyrics,
                [propertyName]: event.target.value
            }
        })
    }

    render() {
        const { classes } = this.props;

        return (
            <Draggable draggableId={this.props.task.lyrics_id} index={this.props.index}>
                {provided => (
                    <div
                        className={classes.container}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                    >
                       {this.state.editLyrics === false ? 
                        
                        <Paper className={classes.paper}>
                            <Typography variant="h6">{this.state.updatedLyrics.label_name}</Typography>
                            <Typography style={{whiteSpace: 'pre-line'}} variant="body1">{this.state.updatedLyrics.lyrics}</Typography>
                            <Button variant="contained" color="primary" onClick={this.handleEdit}>Edit</Button>
                        </Paper>
                     
                        :
                        <div className={classes.paper}>
                            <form noValidate autoComplete="off">
                                <TextField
                                    select
                                    autoFocus
                                    margin="dense"
                                    label="Change Song Part"
                                    className={classes.textField}
                                    value={this.state.updatedLyrics.song_label_id}
                                    onChange={this.handleChangeForLyrics('song_label_id')}
                                    SelectProps={{
                                        MenuProps: {
                                            className: classes.menu,
                                        },
                                    }}
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
                                    fullWidth
                                    rows="4"
                                    className={classes.textFieldMultiline}
                                    value={this.state.updatedLyrics.lyrics}
                                    onChange={this.handleChangeForLyrics('lyrics')}
                                    margin="normal"
                                >
                                </TextField>
                            
                                <Button variant="contained" color="primary" onClick={this.handleDelete}>Delete</Button>
                                <Button variant="contained" color="primary" onClick={this.handleSave}>Save</Button>
                            </form>
                        </div>
                    }
                    </div>
                )}
            </Draggable>
        );
    }
}

const mapStateToProps = reduxState => ({
    reduxState
});

CreateLyricCards.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(withStyles(styles)(CreateLyricCards))