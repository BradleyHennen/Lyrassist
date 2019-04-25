import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import PropTypes from 'prop-types';
import qs from 'query-string';
import { withRouter } from "react-router";
import { withStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
// import Grid from '@material-ui/core/Grid';
import CreateLyricCards from '../CreateLyricCards/CreateLyricCards';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const styles = theme => ({
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    menu: {
        width: 200,
    },
})

class Create extends Component {

    state = {
        open: false,
        songPartId: 1,
        songId: null,
        title: this.props.reduxState.lyricInfo.title,
    }

    componentDidMount = () => {
        this.props.dispatch({ type: 'GET_SONG_PART_LIST' });
        const searchObject = qs.parse(this.props.location.search);
        console.log('search Object', searchObject.songId);
        this.setState({
            songId: searchObject.songId,
        })
        this.props.dispatch({type: 'GET_LYRIC_INFO', payload: searchObject.songId})
        this.props.dispatch({ type: 'GET_LYRICS', payload: searchObject.songId });
    }

    onDragEnd = result => {
        const { destination, source, draggableId } = result;

        if (!destination) {
            return;
        }
        if (
            destination.draggableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        const column = this.state.column;

        const newTaskIds = Array.from(column.taskIds);

        newTaskIds.splice(source.index, 1);
        newTaskIds.splice(destination.index, 0, draggableId);
        console.log('newTaskIds', newTaskIds);


        const newColumn = {
            ...this.state.column,
            taskIds: newTaskIds,
        };
        console.log('newColumn', newColumn);

        const newState = {
            ...this.state,
            column: {
                ...this.state.column,
                taskIds: newColumn.taskIds,
            }
        }
        console.log('newState', newState);

        this.setState(newState);
    }

    handleInputChangeFor = propertyName => (event) => {
        this.setState({
            [propertyName]: event.target.value,
        });
    }

    handleClickOpen = (event) => {
        event.preventDefault();
        this.setState({ open: true });
    };

    handleAddLyricCard = (event) => {
        event.preventDefault();
        this.setState({
            open: false
        });
        const newCard = {
            songLabelId: this.state.songPartId,
            lyricId: this.state.songId,
        }
        this.props.dispatch({ type: 'ADD_LYRIC_CARD', payload: newCard });
    };

    saveLyrics = () => {
        this.props.history.push('/userprofile')
    }


    render() {
        const { classes } = this.props;
        // const tasks = this.state.column.taskIds.map(taskId => this.state.tasks[taskId]);

        return (
            <div>
                <Typography variant="h1">Lyrics</Typography>
                <Typography variant="h3">{this.props.reduxState.lyricInfo.title}</Typography>
                {JSON.stringify(this.props.reduxState.lyricInfo)}
                {JSON.stringify(this.state)}
                <Button variant="contained" onClick={this.handleClickOpen} color="primary">Add Lyric Card</Button>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                >
                    <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Select A Song Part You Want To Add
                            </DialogContentText>
                        <TextField
                            select
                            fullWidth
                            autoFocus
                            margin="dense"
                            label="Song Part"
                            className={classes.textField}
                            value={this.state.songPartId}
                            onChange={this.handleInputChangeFor('songPartId')}
                            SelectProps={{
                                MenuProps: {
                                    className: classes.menu,
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
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleAddLyricCard} color="primary">
                            Add
                            </Button>
                    </DialogActions>
                </Dialog>
                <Button variant="contained" onClick={this.saveLyrics} color="primary">Save & Exit</Button>
                <br />
                <div>
                    {this.props.reduxState.lyrics.map(lyricData => {
                        return (
                            <CreateLyricCards className="lyricCards" lyricData={lyricData} songId={this.state.songId} />
                        )
                    })}
                </div>
            </div>
        );
    }
}

const mapStateToProps = reduxState => ({
    reduxState
});

Create.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withRouter(connect(mapStateToProps)(withStyles(styles)(Create)));