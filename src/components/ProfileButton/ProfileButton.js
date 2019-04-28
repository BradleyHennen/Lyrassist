import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import Button from '@material-ui/core/Button';


const ProfileButton = props => (
  <Button
    className={props.className}
    color="secondary"
    variant="contained"
    onClick={() => props.history.push('/userprofile')}
  >
    Profile
  </Button>
);

export default withRouter(connect()(ProfileButton));