import React from 'react';
import { connect } from 'react-redux';
import Header from '../Header/Header';
import Assistant from '../Assistant/Assistant';
import AssistantResults from '../AssistantResults/AssistantResults';
import Create from '../Create/Create';
import Grid from '@material-ui/core/Grid';


// this could also be written with destructuring parameters as:
// const UserPage = ({ user }) => (
// and then instead of `props.user.username` you could use `user.username`
const Home = (props) => (
  <div>
    <Header/>
    <Assistant />
    <Grid 
      container
      direction="row"
      justify="flex-start"
      alignItems="flex-start"
      spacing={24}
    >
      <Grid item xs={6}>
        <AssistantResults />
      </Grid>
      <Grid item xs={6}>
        <Create />
      </Grid>
    </Grid>
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
