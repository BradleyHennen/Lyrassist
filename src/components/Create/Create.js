import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import qs from 'query-string';
import { withRouter } from "react-router";
import { withStyles } from '@material-ui/core';
import moment from 'moment';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import CreateLyricCards from '../CreateLyricCards/CreateLyricCards';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


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
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
});

class Create extends Component {

    state = {
        open: false,
        songPartId: 1,
        songId: 0,
        title: this.props.lyricInfo.title,
    }

    componentDidMount = () => {
        this.props.dispatch({ type: 'GET_SONG_PART_LIST' });
        const searchObject = qs.parse(this.props.location.search);
        console.log('search Object', searchObject.songId);
        this.setState({
            songId: searchObject.songId,
        })
        this.props.dispatch({ type: 'GET_LYRICS', payload: searchObject.songId });
        this.props.dispatch({type: 'GET_LYRIC_INFO', payload: searchObject.songId});

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
        console.log('moment time', moment(this.props.reduxState.lyricInfo.date_created).format("MMM Do YY"));
        
        return (
            <div >
                <Grid item xs={12}>
                <Typography variant="h2" align="center">Lyrics</Typography>
                <Paper className={classes.paper}>  
                    <Typography inline={true} variant="h6" color="primary">Title: </Typography>
                    <Typography inline={true} variant="h6">{this.props.reduxState.lyricInfo.title}&nbsp;&nbsp;&nbsp;&nbsp;</Typography>
                    <Typography inline={true} variant="h6" color="primary">Author: </Typography>
                    <Typography inline={true} variant="h6">{this.props.reduxState.lyricInfo.author}</Typography>
                    <br/>
                    <Button className={classes.button} variant="contained" onClick={this.handleClickOpen} color="primary">Add Lyric Card</Button>
                    <Button className={classes.button} variant="contained" onClick={this.saveLyrics} color="primary">Save & Exit</Button>
                </Paper>
                </Grid>
                {/* {JSON.stringify(this.props.lyricInfo)} */}
                {/* {JSON.stringify(this.state)} */}
                
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
                <br />
                <Grid item xs={12}>
                    {this.props.reduxState.lyrics.map(lyricData => {
                        return (
                            <Grid item xs={12}>
                            <CreateLyricCards key={lyricData.lyrics_id} className="lyricCards" lyricData={lyricData} songId={this.state.songId} />
                            </Grid>
                        )
                    })}
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