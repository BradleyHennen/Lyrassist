import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles, TextField } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
// import Paper from '@material-ui/core/Paper';
// import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
// import Grid from '@material-ui/core/Grid';

const styles = theme => ({
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    menu: {
        width: 200,
    },
})

class Assistant extends Component {
    state = {
        queryId: 1,
        word: '',
    };

    componentDidMount = () => {
        this.props.dispatch({ type: 'GET_QUERY_LIST' });
    }

    handleInputChangeFor = propertyName => (event) => {
        this.setState({
            [propertyName]: event.target.value,
        });
    }

    handleChangeForQuery = (event) => {
        this.setState({
            word: event.target.value
        })
    }

    searchQuery = (event) => {
        let updatedQuery = '';
        if (this.state.word === '') {
            return
        }
        else if (this.state.queryId === 1) {
            updatedQuery = `rel_rhy=${this.state.word}`;
            console.log('updatedQuery', updatedQuery);
        }
        else if (this.state.queryId === 2) {
            updatedQuery = `rel_ant=${this.state.word}`;
        }
        this.props.dispatch({ type: 'GET_DATAMUSE', payload: updatedQuery })
    }

    render() {
        const { classes } = this.props;

        return (
            <div>
                {JSON.stringify(this.state.querys)}
                <form onSubmit={this.searchQuery}>
                    <TextField
                        select
                        label="What To Search"
                        className={classes.textField}
                        value={this.state.queryId}
                        onChange={this.handleInputChangeFor('queryId')}
                        SelectProps={{
                            MenuProps: {
                                className: classes.menu,
                            },
                        }}
                        margin="normal"
                    >
                        {this.props.reduxState.queryList.map(option => (
                            <MenuItem key={option.id} value={option.id}>
                                {option.query}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        required
                        label="Word"
                        className={classes.textField}
                        value={this.state.word}
                        onChange={this.handleChangeForQuery}
                        margin="normal"
                    />
                    {/* {this.searchConditional()} */}

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

const mapStateToProps = reduxState => ({
    reduxState
});

Assistant.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(withStyles(styles)(Assistant));