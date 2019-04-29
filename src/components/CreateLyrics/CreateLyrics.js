import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import { Droppable } from 'react-beautiful-dnd';
import CreateLyricCards from '../CreateLyricCards/CreateLyricCards';



const styles = theme => ({
    task: {
        padding: 2,
    },
})

class CreateLyrics extends Component {


    render() {
        const { classes } = this.props;
        
        return (
                <div className={classes.test}>
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