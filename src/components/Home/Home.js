import React from 'react';
import { connect } from 'react-redux';
import Header from '../Header/Header';
import AssistantResults from '../AssistantResults/AssistantResults';
import Create from '../Create/Create';
import Grid from '@material-ui/core/Grid';


// this could also be written with destructuring parameters as:
// const UserPage = ({ user }) => (
// and then instead of `props.user.username` you could use `user.username`
const Home = (props) => (
  <div>
    <Header/>
    <Grid 
      container
      direction="row"
      justify="flex-start"
      alignItems="flex-start"
      spacing={24}
    >
      <Grid item md={6}>
        <AssistantResults />
      </Grid>
      <Grid item md={6}>
        <Create />
      </Grid>
    </Grid>
  </div>
);

export default connect()(Home);
