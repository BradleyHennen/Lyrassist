import React from 'react';
import { connect } from 'react-redux';
import Header from '../Header/Header';
import Assistant from '../Assistant/Assistant';
import AssistantResults from '../AssistantResults/AssistantResults';
import Create from '../Create/Create';

// this could also be written with destructuring parameters as:
// const UserPage = ({ user }) => (
// and then instead of `props.user.username` you could use `user.username`
const Home = (props) => (
  <div>
    <Header/>
    <Assistant />
    <AssistantResults />
    <Create lyricInfo={props.reduxState.lyricInfo}/>
  </div>
);

// Instead of taking everything from state, we just want the user info.
// if you wanted you could write this code like this:
// const mapStateToProps = ({user}) => ({ user });
const mapStateToProps = reduxState => ({
  reduxState
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(Home);
