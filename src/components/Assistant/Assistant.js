import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import PropTypes from 'prop-types';

//----Material UI----
import { withStyles, TextField } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import SearchIcon from '@material-ui/icons/Search';
import HelpIcon from '@material-ui/icons/HelpOutline';
import Popover from '@material-ui/core/Popover';

const styles = theme => ({
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    menu: {
        width: 200,
    },
    paper: {
        margin: "auto",
        // maxWidth: 700,
        padding: theme.spacing.unit * 2,
        textAlign: "center",
    },
    root: {
        marginTop: 8.6,
        flexGrow: 1,
        textAlign: "center",
        marginBottom: 15,
    },
    button: {
        marginTop: 20,
        marginBottom: 15,
        paddingLeft: "5%",
        paddingRight: "5%",
    },
    leftIcon: {
        marginRight: theme.spacing.unit,
    },
    iconSmall: {
        fontSize: 20,
    },
    info: {
        marginTop: 32,
        marginRight: 15,
    },
    typography: {
        margin: theme.spacing.unit * 2,
    },
})

class Assistant extends Component {
    state = {
        queryId: 1,
        word: '',
        anchorEl: null,
        help: '',
    };

    //handles the close of the material ui Popper
    handleClose = () => {
        this.setState({
            anchorEl: null,
        });
    };

    //Gets the list of query names for the selector
    componentDidMount = () => {
        this.props.dispatch({ type: 'GET_QUERY_LIST' });
    }

    //handles change for inputs
    handleInputChangeFor = propertyName => (event) => {
        this.setState({
            [propertyName]: event.target.value,
        });
    }

    //sends datamuse compliant query url to the API and retrieves API data to display
    searchQuery = (event) => {
        event.preventDefault();
        let updatedQuery = '';
        if (this.state.word === '') {
            return
        }
        else if (this.state.queryId === 1) {
            updatedQuery = `rel_rhy=${this.state.word}`;
        }
        else if (this.state.queryId === 2) {
            updatedQuery = `rel_ant=${this.state.word}&md=s`;
        }
        else if (this.state.queryId === 3) {
            updatedQuery = `ml=${this.state.word}&md=s`;
        }
        else if (this.state.queryId === 4) {
            updatedQuery = `rel_nry=${this.state.word}&md=s`;
        }
        else if (this.state.queryId === 5) {
            updatedQuery = `rel_hom=${this.state.word}&md=s`;
        }
        else if (this.state.queryId === 6) {
            updatedQuery = `rel_syn=${this.state.word}&md=s`;
        }
        else if (this.state.queryId === 7) {
            updatedQuery = `rel_jjb=${this.state.word}&md=s`;
        }
        else if (this.state.queryId === 8) {
            updatedQuery = `rel_par=${this.state.word}&md=s`;
        }
        else if (this.state.queryId === 9) {
            updatedQuery = `rel_bga=${this.state.word}&md=s`;
        }
        else if (this.state.queryId === 10) {
            updatedQuery = `rel_bgb=${this.state.word}&md=s`;
        }
        else if (this.state.queryId === 11) {
            updatedQuery = `rel_jja=${this.state.word}&md=s`;
        }

        this.props.dispatch({ type: 'GET_DATAMUSE', payload: updatedQuery })
    }

    //Renders more info button text based on selected searchQuery
    mouseEnter = (event) => {
        console.log('click!!!!!');
        event.preventDefault();

        if (this.state.queryId === 1) {
            this.setState({
                help: 'Use "Rhymes (Perfect)" to search for words that perfectly rhyme with one another (e.g. prime and time).',
            });
        }
        else if (this.state.queryId === 2) {
            this.setState({
                help: 'Use "Antonyms" to search for words opposite in meaning (e.g. bad and good ).',
            });
        }
        else if (this.state.queryId === 3) {
            this.setState({
                help: 'Use "Meaning Similar To..." to find words that have similar meaning (e.g. crime and law-breaking ).',
            });
        }
        else if (this.state.queryId === 4) {
            this.setState({
                help: 'Use "Rhymes (Approximate)" to search for words that closely rhyme with one another (e.g. mind and primed ).',
            });
        }
        else if (this.state.queryId === 5) {
            this.setState({
                help: 'Use "Homophones" to find for words that sound alike (e.g. course and coarse ).',
            });
        }
        else if (this.state.queryId === 6) {
            this.setState({
                help: 'Use "Synonyms" to search for words that means exactly or nearly the same as one another (e.g. ocean and sea ).',
            });
        }
        else if (this.state.queryId === 7) {
            this.setState({
                help: 'Use "Words to Describe..." to find adjectives that are often used to a given noun (e.g. beach and sandy ).',
            });
        }
        else if (this.state.queryId === 8) {
            this.setState({
                help: 'rhyme',
            });
        }
        else if (this.state.queryId === 9) {
            this.setState({
                help: 'Use "Frequent Followers" to search for words that often follow one another (e.g. havoc follows wreak).',
            });
        }
        else if (this.state.queryId === 10) {
            this.setState({
                help: 'Use "Frequent Predecessors" to search for words that often proceed one another (e.g. wreak proceeds havoc ).',
            });
        }
        else if (this.state.queryId === 11) {
            this.setState({
                help: 'Use "Described By..." to find nouns that are often modified by the given adjective (e.g. gradual and increase ).',
            });
        }

        this.setState({
            anchorEl: event.currentTarget,
        })
    };

    render() {
        const { classes } = this.props;
        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);

        return (
            <div className={classes.root}>
                <Paper className={classes.paper}>
                    <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                        spacing={24}
                    >
                        <Grid item xs={12}>

                            <form onSubmit={this.searchQuery} noValidate autoComplete="off">
                                <HelpIcon onClick={this.mouseEnter} className={classes.info} />
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
                                    label="Word or Phrase"
                                    className={classes.textField}
                                    value={this.state.word}
                                    onChange={this.handleInputChangeFor('word')}
                                    margin="normal"
                                />
                                <Button
                                    type="submit"
                                    name="submit"
                                    variant="contained"
                                    className={classes.button}
                                    color="primary"
                                >
                                    <SearchIcon className={classNames(classes.leftIcon, classes.iconSmall)} />
                                    Search
                            </Button>
                            </form>
                        </Grid>
                    </Grid>
                </Paper>
                <Popover
                    id="simple-popper"
                    open={open}
                    anchorEl={anchorEl}
                    onClose={this.handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                >
                    <Typography className={classes.typography}>{this.state.help}</Typography>
                </Popover>
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