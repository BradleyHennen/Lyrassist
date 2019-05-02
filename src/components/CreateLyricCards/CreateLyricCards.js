import React, { Component } from 'react';
import { connect } from 'react-redux';

//----Drag and Drop
import { Draggable } from 'react-beautiful-dnd';

//----Material UI----
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles, TextField } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import EditIcon from '@material-ui/icons/Create';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
import PlusIcon from '@material-ui/icons/PlusOne';

const styles = theme => ({
    textField: {
        width: 200,
        marginRight: theme.spacing.unit,
    },
    paper: {
        padding: theme.spacing.unit * 1.5,
        marginTop: 10,
    },
    menu: {
        width: 200,
    },
    container: {
        borderRadius: "10px",
        flexGrow: 1,
        padding: 1,
    },
    button: {
        margin: theme.spacing.unit,
    },
    leftIcon: {
        marginRight: theme.spacing.unit,
    },
    iconSmall: {
        fontSize: 20,
    },
    buttonEdit: {
        float: "left"
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

    //Gets song part list for drop down
    componentDidMount = () => {
        this.props.dispatch({ type: 'GET_SONG_PART_LIST' });
    };

    //Deletes lyric cards and gets new info
    handleDelete = () => {
        this.setState({
            editLyrics: false,
        });
        const deleteCard = {
            songId: this.state.updatedLyrics.song_id,
            lyricId: this.state.updatedLyrics.lyric_id,
        }
        this.props.dispatch({ type: 'DELETE_LYRIC_CARD', payload: deleteCard })
    }

    //Renders lyric card with inputs to be edited 
    handleEdit = () => {
        this.setState({
            editLyrics: true,
        })
    }

    //Updates lyric card info and renders original view
    handleSave = (event) => {
        event.preventDefault();
        this.props.finishReorder();
        this.setState({
            editLyrics: false,
        });
        this.props.dispatch({ type: 'UPDATE_LYRIC_CARD', payload: this.state.updatedLyrics });
    }

    //Handles change for inputs
    handleChangeForLyrics = propertyName => (event) => {
        this.setState({
            updatedLyrics: {
                ...this.state.updatedLyrics,
                [propertyName]: event.target.value
            }
        })
    }

    //Posts current copy of state to data base and gets new data
    handleDuplicate = () => {
        this.props.dispatch({ type: 'ADD_LYRIC_CARD', payload: this.state.updatedLyrics });
    }

    //Renders song part header based on song_label_id state and database names/id pairs
    displaySongPart = () => {
        let names = this.props.reduxState.songPartList;

        for (const name of names) {
            if (name.id === this.state.updatedLyrics.song_label_id) {
                return name.label_name;
            }
        }
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
                                <Grid container spacing={16}>
                                    <Grid item xs={10}>
                                        <Typography variant="h6">
                                            {this.displaySongPart()}
                                        </Typography>
                                        <Typography style={{ whiteSpace: 'pre-line' }} variant="body1">{this.state.updatedLyrics.lyrics}</Typography>
                                    </Grid>
                                    <Grid item lg={2}>
                                        <div className="section-to-hide">
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                className={classes.buttonEdit}
                                                onClick={this.handleEdit}
                                            >
                                                <EditIcon className={classNames(classes.leftIcon, classes.iconSmall)} />
                                                Edit
                                    </Button>
                                        </div>
                                    </Grid>
                                </Grid>
                            </Paper>

                            :
                            <Paper className={classes.paper}>
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
                                        rowsMax="50"
                                        className={classes.textFieldMultiline}
                                        value={this.state.updatedLyrics.lyrics}
                                        onChange={this.handleChangeForLyrics('lyrics')}
                                        margin="normal"
                                    >
                                    </TextField>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        className={classes.button}
                                        onClick={this.handleDuplicate}
                                    >
                                        <PlusIcon className={classNames(classes.leftIcon, classes.iconSmall)} />
                                        Duplicate
                                </Button>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        className={classes.button}
                                        onClick={this.handleDelete}
                                    >
                                        <DeleteIcon className={classNames(classes.leftIcon, classes.iconSmall)} />
                                        Delete
                                </Button>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        className={classes.button}
                                        onClick={this.handleSave}
                                    >
                                        <SaveIcon className={classNames(classes.leftIcon, classes.iconSmall)} />
                                        Save
                                </Button>
                                </form>
                            </Paper>
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