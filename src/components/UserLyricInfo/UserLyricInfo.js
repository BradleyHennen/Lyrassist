import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
// import Grid from '@material-ui/core/Grid';



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

    handleClickDelete = () => {
        this.props.dispatch({ type: 'DELETE_LYRICS', payload: this.props.info.id })
    }

    handleClickEdit = () => {
        this.props.dispatch({ type: 'GET_LYRICS', payload: this.props.info.id });
        this.props.history.push('/home');
    }


    render() {
        const { classes } = this.props;


        return (
            <TableRow>
                <TableCell>{this.props.info.title}</TableCell>
                <TableCell align="right">{this.props.info.author}</TableCell>
                <TableCell align="right">{this.props.info.date_created}</TableCell>
                <TableCell align="right">{this.props.info.date_edited}</TableCell>
                <TableCell align="right">
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={this.handleClickEdit}
                    >
                        Edit
                    </Button>
                </TableCell>
                <TableCell align="right">
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={this.handleClickDelete}
                    >
                        Delete
                    </Button>
                </TableCell>
                <TableCell align="right">
                    <Button>Print</Button>
                </TableCell>
            </TableRow>
        );
    }
}

const mapStateToProps = reduxState => ({
    reduxState,
});

UserLyrics.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withRouter(connect(mapStateToProps)(withStyles(styles)(UserLyrics)));