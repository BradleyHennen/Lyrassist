import React from 'react';
import { connect } from 'react-redux';
import Header from '../Header/Header';
import Grid from '@material-ui/core/Grid';
import AccountInformation from '../AccountInformation/AccountInformation';
import UserLyrics from '../UserLyrics/UserLyrics';


const UserProfile = (props) => (
  <div>
    <Header />
    <Grid 
      container
      direction="column"
      justify="center"
      alignItems="center"
      spacing={24}
    >
      <Grid item xs={12}>
        <AccountInformation/>
      </Grid>
      <Grid item xs={12}>
        <UserLyrics user={props.user}/>
      </Grid>
    </Grid>
  </div>
);


const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(UserProfile);