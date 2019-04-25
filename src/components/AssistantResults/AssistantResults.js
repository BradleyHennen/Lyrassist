import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
// import Typography from '@material-ui/core/Typography';
// import Button from '@material-ui/core/Button';
// import Grid from '@material-ui/core/Grid';

const styles = theme => ({
    root: {
      width: '100%',
      marginTop: theme.spacing.unit * 3,
      overflowX: 'auto',
    },
    table: {
      minWidth: 700,
    },
  });

class AssistantResults extends Component {

    componentDidMount = () => {
        this.props.dispatch({type: 'GET_DATAMUSE'})
    }
    render() {
        const { classes } = this.props;
        return (
            <Paper className={classes.root}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>Word/Phrase</TableCell>
                  <TableCell align="right">Ranking</TableCell>
                  <TableCell align="right">Syllables</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.props.reduxState.datamuseData.map((datamuse, i) => (
                  <TableRow key={i}>
                    <TableCell component="th" scope="row">
                      {datamuse.word}
                    </TableCell>
                    <TableCell align="right">{datamuse.score}</TableCell>
                    <TableCell align="right">{datamuse.numSyllables}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        );
    }
}

const mapStateToProps = reduxState => ({
    reduxState
});

AssistantResults.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(withStyles(styles)(AssistantResults));