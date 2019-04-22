import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles, TextField } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
      },
})

class Assistant extends Component {
    state = {
        word: '',
        query: 'ml=breakfast',
      };

    handleInputChangeFor = propertyName => (event) => {
        this.setState({
            [propertyName]: event.target.value,
        });
    }

    searchQuery = (event) => {
        this.props.dispatch({type: 'GET_DATAMUSE', payload: this.state})
    }

    render() {
        const { classes } = this.props;

        return (
            <div>
                {JSON.stringify(this.state)}
                <form onSubmit={this.searchQuery}>
                    <TextField
                        required
                        label="Word"
                        className={classes.textField}
                        value={this.state.word}
                        onChange={this.handleInputChangeFor('word')}
                        margin="normal"
                    />
                    <Button
                        type="submit"
                        name="submit"
                        variant="contained"
                        color="primary"
                    >
                    Search
                    </Button>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    errors: state.errors,
});

Assistant.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(withStyles(styles)(Assistant));