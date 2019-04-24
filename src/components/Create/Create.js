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
    // state = InitialData;
    // state = {
    //     tasks: {

    //     },
    //     column:{
    //         id: 'column',
    //         title: 
    //     }
    // }

    componentDidMount = () => {
        this.props.dispatch({type: 'GET_LYRIC_INFO'});
    }

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

        const column = this.state.column;
        
        const newTaskIds = Array.from(column.taskIds);
        
        newTaskIds.splice(source.index, 1);
        newTaskIds.splice(destination.index, 0, draggableId);
        console.log('newTaskIds', newTaskIds);


        const newColumn = {
            ...this.state.column,
            taskIds: newTaskIds,
        };
        console.log('newColumn', newColumn);
        
        const newState = {
            ...this.state,
            column: {
                ...this.state.column,
                taskIds: newColumn.taskIds,
            }
        }
        console.log('newState', newState);
        
        this.setState(newState);
    }

    addLyricCard = () => {
        return 
    }

    saveLyrics = () => {
        return
    }

    testLyricLoop = () => {
        let array = this.props.reduxState.lyrics;
        for (let i = 0; i < array.length; i++) {
            console.log('loop', array[i]);
            
        }
    }

    render() {
        // const { classes } = this.props;
        // const tasks = this.state.column.taskIds.map(taskId => this.state.tasks[taskId]);
        // const test = this.props.reduxState.lyricInfo.lyric_order.map(taskId => 
        //     this.props.reduxState.lyrics.find((element) => {
        //         console.log('element', taskId);
                
        //         return element;
        //     }
        // ));

        
        

        return (
            <div>
                <Typography variant="h1">Lyrics</Typography>
                <Button variant="contained" onClick={this.addLyricCard} color="primary">Add Lyric Card</Button>
                <Button variant="contained" onClick={this.saveLyrics} color="primary">Save</Button>
                <br/>
                {/* {JSON.stringify(this.props.reduxState.lyricInfo)} */}
                {JSON.stringify(this.props.reduxState.lyrics)}
                {/* {JSON.stringify(this.state)} */}
                {this.testLyricLoop()}
                {/* <DragDropContext onDragEnd={this.onDragEnd}>
                
                    <CreateLyricCards key={this.state.column.id} column={this.state.column} tasks={tasks} />

                </DragDropContext> */}
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