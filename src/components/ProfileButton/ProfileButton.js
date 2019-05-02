import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router";

//----Material UI----
import Button from '@material-ui/core/Button';
import PersonIcon from '@material-ui/icons/Person';

const button = {
  marginRight: 5,
  fontSize: 20,
}

const ProfileButton = props => (
  <Button
    className={props.className}
    color="secondary"
    variant="contained"
    onClick={() => props.history.push('/userprofile')}
  >
    <PersonIcon style={button}/>
    Profile
  </Button>
);

export default withRouter(connect()(ProfileButton));