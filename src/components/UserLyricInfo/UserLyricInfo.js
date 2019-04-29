import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import moment from 'moment';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
    hide: {
        display: "none",
    },
    leftIcon: {
        marginRight: theme.spacing.unit,
    },
    iconSmall: {
        fontSize: 20,
    },
})

class UserLyrics extends Component {

    handleClickDelete = (event) => {
        event.preventDefault();
        this.props.dispatch({ type: 'DELETE_LYRICS', payload: this.props.info.id })
    }

    handleClickEdit = (event) => {
        event.preventDefault();
        this.props.dispatch({ type: 'GET_LYRICS', payload: this.props.info.id });
        this.props.dispatch({ type: 'GET_LYRIC_INFO', payload: this.props.info.id });
        this.props.history.push(`/home?songId=${this.props.info.id}`);
    }

    handlePrint = () => {
        window.print("adfasdf");
    }



    render() {
        const { classes } = this.props;


        return (
           
                <TableRow>
                    <TableCell>{this.props.info.title}</TableCell>
                    <TableCell align="right">{this.props.info.author}</TableCell>
                    <TableCell align="right">{moment(this.props.info.date_created).format("MMM Do YYYY")}</TableCell>
                    <TableCell align="right">{moment(this.props.info.date_edited).format("MMM Do YYYY")}</TableCell>
                    <TableCell align="right">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={this.handleClickEdit}
                        >
                            <EditIcon className={classNames(classes.leftIcon, classes.iconSmall)} />
                            Edit
                        </Button>
                    </TableCell>
                    <TableCell align="right">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={this.handleClickDelete}
                        >
                            <DeleteIcon className={classNames(classes.leftIcon, classes.iconSmall)} />
                            Delete
                        </Button>
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