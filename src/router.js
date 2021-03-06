import React from 'react';
import {Router, Route, Switch} from 'dva/router';
import dynamic from 'dva/dynamic';

function RouterConfig({history, app}) {
  const IndexPage = dynamic({
    app,
    component: () => import('./routes/IndexPage'),
  });
  const ExperimentPage = dynamic({
    app,
    component: () => import('./routes/ExperimentPage'),
  });

  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact render={(props) => <IndexPage {...props}/>}/>
        <Route path="/experiment" render={(props) => <ExperimentPage {...props}/>}/>
      </Switch>
    </Router>
  );
}

export default RouterConfig;
