import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles, Typography } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TablePaginationActions from './TablePagination';
import TableSorting from './TableSorting';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Assistant from '../Assistant/Assistant';


TableSorting.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

const styles = theme => ({
  root: {
    width: '100%',
    overflowX: 'auto',
    marginTop: theme.spacing.unit,
  },
  h1: {
    marginTop: theme.spacing.unit,
    fontWeight: "bold",
    letterSpacing: 5,
    textShadow: '1px 1px 0 #FFF'
  },
  typography: {
    padding: theme.spacing.unit * 2,
  },
  button: {
    // width: 200,
    margin: theme.spacing.unit,
  }, 
  dialogTitle: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    textTransform: 'capitalize',
    margin: 0,
    padding: theme.spacing.unit * 2,
  },
  dialogContent: {
    margin: 0,
    padding: theme.spacing.unit * 2,
  },
  dialogActions: {
    marginLeft: "auto",
    padding: theme.spacing.unit * 2,
  },
  def: {
    minWidth: 400,
  }
});

class AssistantResults extends Component {

  state = {
    order: 'asc',
    orderBy: 'ranking',
    data: [],
    page: 0,
    rowsPerPage: 8,
    open: false,
    word: '',
  }

  componentDidMount = () => {
    this.props.dispatch({ type: 'GET_DATAMUSE' })
  }

  componentDidUpdate(prevProps) {
    if (this.props.reduxState.datamuseData !== prevProps.reduxState.datamuseData) {
      this.setState({
        data: this.props.reduxState.datamuseData,
      })
    }
  }

  handleClickOpen = (search) => {
    this.setState({
      word: search,
      open: true,
    });
    this.props.dispatch({type: 'GET_WEBSTER', payload: search});
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    this.setState({ order, orderBy });
  };


  handleClick = (event, id) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    this.setState({ selected: newSelected });
  };

  desc = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  stableSort = (array, cmp) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = cmp(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
  }

  getSorting = (order, orderBy) => {
    return order === 'desc' ? (a, b) => this.desc(a, b, orderBy) : (a, b) => -this.desc(a, b, orderBy);
  }

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ page: 0, rowsPerPage: Number(event.target.value) });
  };

  audio = () => {
    if (this.props.reduxState.websterData) {
      return
    }
  }


  render() {
    const { classes } = this.props;
    const { data, order, orderBy, rowsPerPage, page } = this.state;


    return (
      <div className="scroll">
        <Typography variant="h2" align="center" className={classes.h1} color="primary">Results</Typography>
        <Paper className={classes.paper} >
            <Assistant />         
        </Paper>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableSorting
              order={order}
              orderBy={orderBy}
              onRequestSort={this.handleRequestSort}
              rowCount={data.length} />
            <TableBody>
              {this.stableSort(data, this.getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((data, index) => {
                  return (
                    <TableRow
                      hover
                      tabIndex={-1}
                      key={index}
                    >
                      <TableCell >
                          <Button variant="outlined" color="secondary" onClick={()=> this.handleClickOpen(data.word)} className={classes.button}>
                              {data.word}
                          </Button>
                      </TableCell>
                      <TableCell align="right">{data.score}</TableCell>
                      <TableCell align="right">{data.numSyllables}</TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[10, 15, 20, 25, 30]}
                  colSpan={3}
                  count={data.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    native: true,
                  }}
                  onChangePage={this.handleChangePage}
                  onChangeRowsPerPage={this.handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </Paper>

      
        <Dialog
          onClose={this.handleClose}
          open={this.state.open}
        >
          <div className={classes.def}>
            <div className={classes.dialogTitle}>
              <Typography variant="h4">{this.state.word}</Typography>
              <audio
                  controls
                  src={this.audio()}
              >
                      Your browser does not support the
                      <code>audio</code> element.
              </audio>
            </div>
            <div className={classes.dialogContent}>
              <Typography variant="h6">Definition: </Typography>
              <ul>
              {this.props.reduxState.websterData.slice(0, 1).map((data) => {
                return data.shortdef.map((data, i) => {
                  return <li key={i} className={classes.def}><Typography variant="body1">{data}</Typography></li>
                })
              })}
              </ul>
            </div>
            <div className={classes.dialogActions}>
              <Button onClick={this.handleClose} variant="contained" color="primary">
                Close
              </Button>
            </div>
          </div>
        </Dialog>
      </div>
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
