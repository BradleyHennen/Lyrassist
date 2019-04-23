import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
// import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
// import Button from '@material-ui/core/Button';
// import Grid from '@material-ui/core/Grid';
import CreateLyrics from '../CreateLyrics/CreateLyrics';

import { Droppable } from 'react-beautiful-dnd';
// import Task from './task.jsx';



const styles = theme => ({
    container: {
        margin: "20px, auto",
        border: "1px solid black",
        borderRadius: 10,
        width: "50%",
    },
    list: {
        padding: 8,
    }
})

class CreateLyricCards extends Component {


    render() {
        const { classes } = this.props;

        return (
            <div className={classes.container}>
                <div className={classes.container}>
                <Typography variant="h4">{this.props.column.title}</Typography>
                {/* {JSON.stringify(this.props.column)} */}
                {/* <Droppable droppableId={this.props.column.id}>
                    {provided => (
                        <div
                            className={classes.list}
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            {this.props.tasks.map((task, index) => 
                                <CreateLyrics key={task.id} task={task} index={index} />
                            )}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable> */}
                <Droppable droppableId={this.props.column.id}>
                    {provided => (
                        <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            {this.props.tasks.map((task, index) => 
                                <CreateLyrics key={task.id} task={task} index={index} />
                            )}
                            {provided.placeholder}
                        </div>
                    )}

                </Droppable>
                </div>
            </div>
        );
    }
}

const mapStateToProps = reduxState => ({
    reduxState
});

CreateLyricCards.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(withStyles(styles)(CreateLyricCards));