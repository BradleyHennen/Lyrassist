import React from 'react';
import { connect } from 'react-redux';

//----Component Imports
import Header from '../Header/Header';
import AssistantResults from '../AssistantResults/AssistantResults';

//----Material UI----
import Create from '../Create/Create';
import Grid from '@material-ui/core/Grid';

const Home = (props) => (
  <div>
    <Header />
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
