import React, { Component } from 'react';
import { connect } from 'react-redux';

//----Material UI----
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';

//----Drag and Drop
import { Droppable } from 'react-beautiful-dnd';

//----Component Import----
import CreateLyricCards from '../CreateLyricCards/CreateLyricCards';



const styles = () => ({
    task: {
        padding: 2,
    },
})

class CreateLyrics extends Component {

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.test}>
                <Droppable droppableId="this-id">
                    {provided => (
                        <div
                            className={classes.task}
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            {this.props.tasks.map((task, index) =>
                                <CreateLyricCards
                                    key={task.lyrics_id}
                                    task={task}
                                    index={index}
                                    songId={this.props.songId}
                                    finishReorder={this.props.finishReorder} />
                            )}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </div>
        );
    }
}

CreateLyrics.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect()(withStyles(styles)(CreateLyrics));