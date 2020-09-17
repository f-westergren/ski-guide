import React, { useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'; 
import { Grid } from '@material-ui/core';
import GuideList from './GuideList';
import Search from './Search';
import Header from './Header';
import NotFound from './NotFound';

const Routes = () => {
  return (
    <BrowserRouter>
      <Grid container direction="column">
        <Grid item>
          <Header />
        </Grid>
        <Grid item container>
          <Grid xs={false} sm={2} />
          <Grid item xs={12} sm={8}>
            <Switch>
              <Route exact path="/guides" component={GuideList} />
              <Route component={NotFound} />
            </Switch>
          </Grid>
          <Grid xs={false} sm={2} />
        </Grid>
      </Grid>
    </BrowserRouter>
  )
}

export default Routes;