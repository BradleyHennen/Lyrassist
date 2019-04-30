import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import PropTypes from 'prop-types';
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
        marginTop: 30,
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

    handleClose = () => {
    this.setState({
        anchorEl: null,
    });
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
        
        this.props.dispatch({ type: 'GET_DATAMUSE', payload: updatedQuery })
    }

    mouseEnter = (event) => {
        console.log('click!!!!!');
        event.preventDefault();
  
        if (this.state.queryId === 1) {
            this.setState({
                help: 'rhyme',
            });
        }
        else if (this.state.queryId === 2) {
            this.setState({
                help: 'rhyme',
            });
        }
        else if (this.state.queryId === 3) {
            this.setState({
                help: 'rhyme',
            });
        }
        else if (this.state.queryId === 4) {
            this.setState({
                help: 'rhyme',
            });
        }
        else if (this.state.queryId === 5) {
            this.setState({
                help: 'rhyme',
            });
        }
        else if (this.state.queryId === 6) {
            this.setState({
                help: 'rhyme',
            });
        }
        else if (this.state.queryId === 7) {
            this.setState({
                help: 'rhyme',
            });
        }
        else if (this.state.queryId === 8) {
            this.setState({
                help: 'rhyme',
            });
        }
        else if (this.state.queryId === 9) {
            this.setState({
                help: 'rhyme',
            });
        }
        else if (this.state.queryId === 10) {
            this.setState({
                help: 'rhyme',
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
                            <HelpIcon onClick={this.mouseEnter} className={classes.info}/>
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
                                onChange={this.handleChangeForQuery}
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