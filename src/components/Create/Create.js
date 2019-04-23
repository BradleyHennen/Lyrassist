import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
// import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
// import Grid from '@material-ui/core/Grid';
import CreateLyricCards from '../CreateLyricCards/CreateLyricCards';

import { DragDropContext } from 'react-beautiful-dnd';
import InitialData from './initial-data';

const styles = theme => ({

})

class Create extends Component {
    state = InitialData;

    onDragEnd = result => {
        const {destination, source, draggableId} = result;

        if(!destination) {
            return;
        }
        if(
            destination.draggableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        const column = this.state.columns[source.droppableId];
        const newTaskIds = Array.from(column.taskIds);
        newTaskIds.splice(source.index, 1);
        newTaskIds.splice(destination.index, 0, draggableId);

        const newColumn = {
            ...column,
            taskIds: newTaskIds,
        };
        const newState = {
            ...this.state,
            columns: {
                ...this.state.columns,
                [newColumn.id]: newColumn,
            }
        }
        this.setState(newState);
    }

    addLyricCard = () => {
        return
    }

    saveLyrics = () => {
        return
    }

    render() {
        // const { classes } = this.props;

        return (
            <div>
                <Typography variant="h1">Lyrics</Typography>
                <Button variant="contained" onClick={this.addLyricCard} color="primary">Add Lyric Card</Button>
                <Button variant="contained" onClick={this.saveLyrics} color="primary">Add Lyric Card</Button>
                <br/>
                <DragDropContext onDragEnd={this.onDragEnd}>
                    {this.state.columnOrder.map((columnId) => {
                        const column = this.state.columns[columnId];
                        const tasks = column.taskIds.map(taskId => this.state.tasks[taskId]);

                        return <CreateLyricCards key={column.id} column={column} tasks={tasks} />
                    })}
                </DragDropContext>
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

export default connect(mapStateToProps)(withStyles(styles)(Create));