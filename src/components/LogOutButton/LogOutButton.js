import React from 'react';
import { connect } from 'react-redux';

//----Material UI----
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
    <ExitIcon style={button} />
    Log Out
  </Button>
);
export default connect()(LogOutButton);
