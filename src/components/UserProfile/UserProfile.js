import React from 'react';
import { connect } from 'react-redux';
import Header from '../Header/Header';
import AccountInformation from '../AccountInformation/AccountInformation';
import UserLyrics from '../UserLyrics/UserLyrics';


const UserProfile = (props) => (
  <div>
    <Header />
    <AccountInformation/>
    <UserLyrics user={props.user}/>
  </div>
);


const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(UserProfile);