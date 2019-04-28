import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import qs from 'query-string';
import { withRouter } from "react-router";
import { withStyles } from '@material-ui/core';
// import moment from 'moment';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { DragDropContext } from 'react-beautiful-dnd';
import CreateLyrics from '../CreateLyrics/CreateLyrics';


const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

const styles = theme => ({
    root: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    menu: {
        width: 200,
    },
    paper: {
        margin: "auto",
        maxWidth: 700,
        padding: theme.spacing.unit * 2,
        textAlign: "center",
    },
    button: {
        width: 200,
        margin: theme.spacing.unit,
    },
});

class Create extends Component {

    state = {
        open: false,
        songPartId: 1,
        songId: 0,
        lyrics: [],
    }

    onDragEnd = (result) => {
        // reorder results
        const reorderedTasks = reorder(
            this.state.lyrics, // starting array data
            result.source.index,         // starting array index
            result.destination.index     // ending array index
        );

        // update our state
        this.setState({
            lyrics: reorderedTasks,
        });
    }

    finishReorder = () => {
        console.log('Initial index order: ', this.state.lyrics);
        let index = 1;
        const lyricArray = this.state.lyrics
        for (let i = 0; i < lyricArray.length; i++) {
            console.log('LyricArray initial', lyricArray[i]);
            lyricArray[i] = {
                ...lyricArray[i],
                index: index
            };
            index = index + 1;
            this.props.dispatch({ type: 'UPDATE_LYRIC_CARD_ORDER', payload: lyricArray[i]});
            console.log('LyricArray updated', lyricArray[i]);
        }
        // this function could dispatch to a saga for your PUT/update

        // prove our order is correct in state
        console.log('Updated index order: ', this.state.lyrics);
        // this.props.dispatch({ type: 'UPDATE_LYRIC_CARD_ORDER', payload: this.state.lyrics });

    }

    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        // console.log('prevProps', prevProps);
        
        if (this.props.reduxState.lyrics !== prevProps.reduxState.lyrics) {
            this.setState({
                lyrics: this.props.reduxState.lyrics
            })
        }
    }

    componentDidMount = () => {
        this.props.dispatch({ type: 'GET_SONG_PART_LIST' });


        const searchObject = qs.parse(this.props.location.search);
        console.log('search Object', searchObject.songId);
        this.setState({
            songId: searchObject.songId,
        })

        this.props.dispatch({ type: 'GET_LYRICS', payload: searchObject.songId });
        this.props.dispatch({ type: 'GET_LYRIC_INFO', payload: searchObject.songId });

    };

    handleInputChangeFor = propertyName => (event) => {
        this.setState({
            [propertyName]: event.target.value,
        });
    }

    handleClickOpen = (event) => {
        event.preventDefault();
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    }

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

        return (
            <div >
                {/* {JSON.stringify(this.props.reduxState.lyrics)} */}
                <Grid item xs={12}>
                    <Typography variant="h2" align="center">Lyrics</Typography>
                    <Paper className={classes.paper}>
                        <Typography inline={true} variant="h6" color="primary">Title: </Typography>
                        <Typography inline={true} variant="h6">{this.props.reduxState.lyricInfo.title}&nbsp;&nbsp;&nbsp;&nbsp;</Typography>
                        <Typography inline={true} variant="h6" color="primary">Author: </Typography>
                        <Typography inline={true} variant="h6">{this.props.reduxState.lyricInfo.author}</Typography>
                        <br />
                        <Button className={classes.button} variant="contained" onClick={this.handleClickOpen} color="primary">Add Lyric Card</Button>
                        <Button className={classes.button} variant="contained" onClick={this.saveLyrics} color="primary">Save & Exit</Button>
                    </Paper>
                </Grid>
                {/* {JSON.stringify(this.props.lyricInfo)} */}
                {/* {JSON.stringify(this.state.lyrics)} */}

                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                >
                    <DialogTitle id="form-dialog-title">Add Lyric Card</DialogTitle>
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
                        >
                            {this.props.reduxState.songPartList.map(option => (
                                <MenuItem key={option.id} value={option.id}>
                                    {option.label_name}
                                </MenuItem>
                            ))}
                        </TextField>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Close
                        </Button>
                        <Button onClick={this.handleAddLyricCard} color="primary">
                            Add
                        </Button>
                    </DialogActions>
                </Dialog>
                <br />
                <Grid item xs={12}>
                    <DragDropContext onDragEnd={this.onDragEnd}>
                        {/* tasks must be the current tasks from state, not initialData */}
                        <CreateLyrics tasks={this.state.lyrics} finishReorder={this.finishReorder} songId={this.state.songId} />
                    </DragDropContext>
                </Grid>

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