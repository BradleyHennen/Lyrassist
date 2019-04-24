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
// import Grid from '@material-ui/core/Grid';
import CreateLyricCards from '../CreateLyricCards/CreateLyricCards';
import UserLyricInfo from '../UserLyricInfo/UserLyricInfo';


const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
})

class UserLyrics extends Component {

    componentDidMount = () => {
        this.props.dispatch({type: 'GET_USER_LYRICS'})
    }

    render() {
        const { classes } = this.props;


        return (
            <Paper className={classes.root}>
                <Typography variant="h3">Your Lyrics</Typography>
                {/* {JSON.stringify(this.props.user.id)} */}
                {JSON.stringify(this.props.reduxState.userLyrics)}
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Title</TableCell>
                            <TableCell align="right">Author</TableCell>
                            <TableCell align="right">Date Created</TableCell>
                            <TableCell align="right">Last Edited</TableCell>
                            <TableCell align="right">Edit</TableCell>
                            <TableCell align="right">Delete</TableCell>
                            <TableCell align="right">Print</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.props.reduxState.userLyrics.map(info => {
                            return <UserLyricInfo info={info}/>
                        })}
                    </TableBody>
                </Table>
            </Paper>
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