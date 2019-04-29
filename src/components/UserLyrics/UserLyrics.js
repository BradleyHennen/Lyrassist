import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import UserLyricInfo from '../UserLyricInfo/UserLyricInfo';


const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 2,
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
    button: {
        width: "50%",
        height: 40,
        marginLeft: "auto",
        marginRight: "auto",
        display: "block",
    },
    typography: {
        margin: theme.spacing.unit * 3,
    }
})

class UserLyrics extends Component {

    state = {
        open: false,
        newSong: {
            title: '',
            author: '',
        }
    }

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    onChange = propertyName => (event) => {
        this.setState({
            newSong: {
                ...this.state.newSong,
                [propertyName]: event.target.value,
            }
        })
    }

    componentDidMount = () => {
        this.props.dispatch({ type: 'GET_USER_LYRICS' })

    }

    createNewSong = () => {
        this.props.dispatch({type: 'ADD_NEW_SONG', payload: this.state.newSong})
        this.handleClose();
    }

    render() {
        const { classes } = this.props;


        return (
            <div >
                <Button 
                    variant="contained" 
                    color="primary" 
                    className={classes.button}
                    onClick={this.handleOpen}
                    >Create New Song
                </Button>
                <Paper className={classes.root}>
                    <Typography className={classes.typography} align="center" variant="h3">Your Lyrics</Typography>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Title</TableCell>
                                <TableCell align="right">Author</TableCell>
                                <TableCell align="right">Date Created</TableCell>
                                <TableCell align="right">Last Edited</TableCell>
                                <TableCell align="right">Edit</TableCell>
                                <TableCell align="right">Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.props.reduxState.userLyrics.map(info => {
                                return <UserLyricInfo key={info.id} info={info} />
                            })}
                        </TableBody>
                    </Table>
                </Paper>

                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                >
                <form  autoComplete="off" onSubmit={this.createNewSong}>
                    <DialogTitle>Create New Song</DialogTitle>
                    <DialogContent>
                        
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="title"
                            label="Song Title"
                            type="text"
                            onChange={this.onChange('title')}
                            value={this.state.newSong.title}
                            fullWidth
                        />
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="author"
                            label="Song Author"
                            type="text"
                            onChange={this.onChange('author')}
                            value={this.state.newSong.author}
                            fullWidth
                        />
                        
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button type="submit" color="primary">
                            Create
                        </Button>
                    </DialogActions>
                    </form>
                </Dialog>
            </div>
        );
    }
}

const mapStateToProps = reduxState => ({
    reduxState,
});

UserLyrics.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(withStyles(styles)(UserLyrics));