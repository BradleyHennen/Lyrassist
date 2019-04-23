import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
// import Typography from '@material-ui/core/Typography';
// import Button from '@material-ui/core/Button';
// import Grid from '@material-ui/core/Grid';

import { Draggable } from 'react-beautiful-dnd';


const styles = theme => ({
    container: {
        border: "1px solid black",
        borderRadius: "10px",
        padding: "8px",
        marginBottom: "8px",
        backgroundColor: "white",
    }
})

class CreateLyrics extends Component {


    render() {
        const { classes } = this.props;

        return (
            <Draggable draggableId={this.props.task.id} index={this.props.index}>
                {provided => (
                    <div
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        className={classes.container}
                    >
                        <div><strong>{this.props.task.header}</strong></div>
                        {this.props.task.content}
                    </div>
                )}
            </Draggable>
        );
    }
}

const mapStateToProps = reduxState => ({
    reduxState
});

CreateLyrics.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(withStyles(styles)(CreateLyrics));