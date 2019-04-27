import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
// import Typography from '@material-ui/core/Typography';
// import Button from '@material-ui/core/Button';
// import Grid from '@material-ui/core/Grid';

import { Droppable } from 'react-beautiful-dnd';
import CreateLyricCards from '../CreateLyricCards/CreateLyricCards';



const styles = theme => ({
    // container: {
    //     border: "1px solid black",
    //     borderRadius: "10px",
    //     padding: "8px",
    //     marginBottom: "8px",
    //     backgroundColor: "white",
    // },
    task: {
        padding: 8,
    }
})

class CreateLyrics extends Component {


    render() {
        const { classes } = this.props;
        
        return (
                <div >
                {/* {JSON.stringify(this.props.tasks)} */}
                    <Droppable droppableId="this-id">
                        {provided => (
                            <div
                                className={classes.task}
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                            >
                                {this.props.tasks.map((task, index) => 
                                    <CreateLyricCards key={task.lyrics_id} task={task} index={index} songId={this.props.songId}/>
                                )}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                    <button onClick={this.props.finishReorder}>Done</button>
                </div>
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

// {/* <Draggable draggableId={this.props.task.id} index={this.props.index}>
//                 {provided => (
//                     <div
//                         {...provided.draggableProps}
//                         {...provided.dragHandleProps}
//                         ref={provided.innerRef}
//                         className={classes.container}
//                     >
//                         <div><strong>{this.props.task.header}</strong></div>
//                         {this.props.task.content}
//                     </div>
//                 )}
// </Draggable> */}