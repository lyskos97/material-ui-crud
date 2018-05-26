import * as React from 'react';
import { Switch, Route } from 'react-router-dom';

import Header from './Header';
import Notes from './Notes';
import About from './About';
import { Paper } from '@material-ui/core';

const style = {
  root: {
    padding: 20
  }
};

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Header />
        <Paper style={style.root} component="main">
          <Switch>
            <Route exact path="/" component={Notes} />
            <Route path="/about" component={About} />
          </Switch>
        </Paper>
      </React.Fragment>
    );
  }
}

export default App;
