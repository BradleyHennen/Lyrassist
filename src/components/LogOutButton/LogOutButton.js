import React from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import ExitIcon from '@material-ui/icons/ExitToApp';

const button = {
  marginRight: 5,
  fontSize: 20,
}

const LogOutButton = props => (
  <Button
    className={props.className}
    color="secondary"
    variant="contained"
    onClick={() => props.dispatch({ type: 'LOGOUT' })}
  >
    <ExitIcon style={button}/>
    Log Out
  </Button>
);

// This component doesn't need 'mapStateToProps'
// because it doesn't care what the current state is.
// No matter what the redux state is, this button will always be a log out button
// this component still needs 'connect' though, because it is going to dispatch a redux action
export default connect()(LogOutButton);
