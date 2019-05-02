import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import qs from 'query-string';

//----Drag and Drop----
import { DragDropContext } from 'react-beautiful-dnd';

//----Material UI----
import { withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import classNames from 'classnames';
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
import CreateLyrics from '../CreateLyrics/CreateLyrics';
import SaveIcon from '@material-ui/icons/Save';
import PrintIcon from '@material-ui/icons/Print';
import EditIcon from '@material-ui/icons/Create';
import AddIcon from '@material-ui/icons/Add';
import ListIcon from '@material-ui/icons/List'

//(Drag and Drop) Reorders the array objects based on their dropped location
const reorder = (list, startIndex, endIndex) => {
    console.log('startIndex: ', startIndex);
    console.log('endIndex: ', endIndex);

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
        margin: theme.spacing.unit,
    },
    header: {
        marginTop: theme.spacing.unit,
    },
    h1: {
        marginTop: theme.spacing.unit,
        fontWeight: "bold",
        letterSpacing: 5,
        textShadow: '1px 1px 0 #FFF'
    },
    leftIcon: {
        marginRight: theme.spacing.unit,
    },
    iconSmall: {
        fontSize: 20,
    },
});

class Create extends Component {

    state = {
        openCard: false,
        openTitle: false,
        title: '',
        author: '',
        songPartId: 1,
        songId: 0,
        lyrics: [],
    }

    //updated the index and id numbers of the draggable items based on their drop location
    onDragEnd = (result) => {

        //Checks to see if ids are undefined or equal to each other. (Drag out of Drop Area would render undefined 
        //this allows the item to return to it's original postiton)
        if (!result.destination) {
            return;
        }
        if (
            result.destination.draggableId === result.source.droppableId &&
            result.destination.index === result.source.index
        ) {
            return;
        }

        //updates ids/indexs
        const reorderedTasks = reorder(
            this.state.lyrics,           // starting array data
            result.source.index,         // starting array index
            result.destination.index     // ending array index
        );

        this.setState({
            lyrics: reorderedTasks,
        });
    }

    //Updates the the index number on each object and posts to the database
    finishReorder = () => {
        let index = 1;
        index = 1;
        const lyricArray = this.state.lyrics
        for (let i = 0; i < lyricArray.length; i++) {
            console.log('LyricArray initial', lyricArray[i]);
            lyricArray[i] = {
                ...lyricArray[i],
                index: index
            };
            index = index + 1;
            this.props.dispatch({ type: 'UPDATE_LYRIC_CARD_ORDER', payload: lyricArray[i] });
            console.log('LyricArray updated', lyricArray[i]);
        }

        this.props.dispatch({ type: 'GET_LYRICS', payload: this.state.songId });
    }

    //Updates local state with both lyrics and lyric info reducers 
    componentDidUpdate(prevProps) {

        if (this.props.reduxState.lyrics !== prevProps.reduxState.lyrics) {
            this.setState({
                lyrics: this.props.reduxState.lyrics
            })
        };
        if (this.props.reduxState.lyricInfo !== prevProps.reduxState.lyricInfo) {
            this.setState({
                title: this.props.reduxState.lyricInfo.title,
                author: this.props.reduxState.lyricInfo.author,
            })
        };
    }

    componentDidMount = () => {
        //Gets song part list from the database to be used in drop down
        this.props.dispatch({ type: 'GET_SONG_PART_LIST' });

        //Takes URL search parameters and is used in the getting specific lyrics
        const searchObject = qs.parse(this.props.location.search);
        this.setState({
            songId: searchObject.songId,
        })

        //Gets specific song lyrics 
        this.props.dispatch({ type: 'GET_LYRICS', payload: searchObject.songId });
        //Gets specific song info 
        this.props.dispatch({ type: 'GET_LYRIC_INFO', payload: { songId: searchObject.songId } });
    };

    //Handles change for inputs
    handleInputChangeFor = propertyName => (event) => {
        this.setState({
            [propertyName]: event.target.value,
        });
    }

    //Opens dialog for creating a new lyric card
    handleClickOpenCard = () => {
        this.setState({ openCard: true });
    };

    //Opens dialog for editing the title and author of the song
    handleClickOpenTitle = () => {
        this.setState({ openTitle: true });
    };

    //Closes dialog for creating a new lyric card
    handleCloseCard = () => {
        this.setState({ openCard: false });
    }

    //Closes dialog for editing the title and author of the song
    handleCloseTitle = () => {
        this.setState({ openTitle: false });
    }

    //Posts new lyric card to the database and gets newly updated data
    handleAddLyricCard = (event) => {
        event.preventDefault();
        this.setState({
            openCard: false
        });
        const newCard = {
            song_label_id: this.state.songPartId,
            song_id: this.state.songId,
            lyrics: "Add lyrics..."
        }
        this.props.dispatch({ type: 'ADD_LYRIC_CARD', payload: newCard });
    };

    //Updates new lyric info to the database and gets newly updated data
    handleUpdateLyricInfo = (event) => {
        event.preventDefault();
        this.setState({
            openTitle: false
        });
        const newLyricInfo = {
            title: this.state.title,
            author: this.state.author,
            songId: this.state.songId,
        }
        this.props.dispatch({ type: 'UPDATE_LYRIC_INFO', payload: newLyricInfo });
    }

    //Saves order of cards and moves you to userprofile view
    saveLyrics = (event) => {
        this.finishReorder();
        this.props.history.push('/userprofile')
    }

    render() {
        const { classes } = this.props;

        return (
            <div className="scroll" id="section-to-print">
                <Grid item xs={12} >
                    <div className="section-to-hide">
                        <Typography variant="h2" align="center" color="primary" className={classes.h1}>Lyrics</Typography>
                    </div>
                    <div className={classes.header}>
                        <Paper className={classes.paper} >
                            <Grid container direction="row" alignItems="flex-start" justify="center">

                                <Grid container direction="column">
                                    <Grid item >
                                        <Grid item>
                                            <Typography inline={true} variant="h6" color="primary">Title: </Typography>
                                            <Typography inline={true} variant="h6">{this.props.reduxState.lyricInfo.title}</Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography inline={true} variant="h6" color="primary">Author: </Typography>
                                            <Typography inline={true} variant="h6">{this.props.reduxState.lyricInfo.author}</Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>

                                <Grid container direction="column">
                                    <Grid item >
                                        <Grid>
                                            <Button
                                                className={classes.button}
                                                variant="contained"
                                                onClick={this.handleClickOpenCard}
                                                color="primary"
                                            >
                                                <AddIcon className={classNames(classes.leftIcon, classes.iconSmall)} />
                                                Add Lyric Card
                                            </Button>
                                            <Button
                                                className={classes.button}
                                                variant="contained"
                                                onClick={this.finishReorder}
                                                color="primary"
                                            >
                                                <ListIcon className={classNames(classes.leftIcon, classes.iconSmall)} />
                                                Save Card Order
                                            </Button>
                                            <Button
                                                className={classes.button}
                                                variant="contained"
                                                onClick={this.handleClickOpenTitle}
                                                color="primary"
                                            >
                                                <EditIcon className={classNames(classes.leftIcon, classes.iconSmall)} />
                                                Edit Title / Author
                                            </Button>
                                            <Button
                                                className={classes.button}
                                                variant="contained"
                                                onClick={() => window.print()}
                                                color="primary"
                                            >
                                                <PrintIcon className={classNames(classes.leftIcon, classes.iconSmall)} />
                                                Print
                                            </Button>
                                            <Button
                                                className={classes.button}
                                                variant="contained"
                                                onClick={this.saveLyrics}
                                                color="primary"
                                            >
                                                <SaveIcon className={classNames(classes.leftIcon, classes.iconSmall)} />
                                                Save & Exit
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Paper>
                    </div>
                </Grid>

                <Dialog
                    open={this.state.openCard}
                    onClose={this.handleCloseCard}
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
                        <Button onClick={this.handleCloseCard} color="primary">
                            Close
                        </Button>
                        <Button onClick={this.handleAddLyricCard} color="primary">
                            Add
                        </Button>
                    </DialogActions>
                </Dialog>
                <Dialog
                    open={this.state.openTitle}
                    onClose={this.handleCloseTitle}
                >
                    <DialogTitle id="form-dialog-title">Edit Lyric Info</DialogTitle>
                    <DialogContent>
                        <TextField
                            label="Edit Title"
                            fullWidth
                            className={classes.textFieldMultiline}
                            value={this.state.title}
                            onChange={this.handleInputChangeFor('title')}
                            margin="normal"
                        >
                        </TextField>
                        <TextField
                            label="Edit Author"
                            fullWidth
                            className={classes.textFieldMultiline}
                            value={this.state.author}
                            onChange={this.handleInputChangeFor('author')}
                            margin="normal"
                        >
                        </TextField>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleCloseTitle} color="primary">
                            Close
                        </Button>
                        <Button onClick={this.handleUpdateLyricInfo} color="primary">
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>
                <br />
                <div className={classes.test}>
                    <Grid item xs={12} >
                        <DragDropContext onDragEnd={this.onDragEnd}>
                            <CreateLyrics tasks={this.state.lyrics} songId={this.state.songId} finishReorder={this.finishReorder} />
                        </DragDropContext>
                    </Grid>
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