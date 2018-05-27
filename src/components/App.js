import * as React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { Paper, CssBaseline, CircularProgress, Grid, Typography } from '@material-ui/core';
import axios from 'axios';

import Header from './Header';
import Notes from './Notes';
import About from './About';
import Login from './Login';
import Register from './Register';

const style = {
  root: {
    padding: 20
  },
  loadRoot: {
    height: '100vh',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  }
};

/* SETUP AXIOS */
axios.defaults.baseURL = 'http://localhost:4000/api';
axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('notesApiToken')}`;

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      loading: true
    };
  }

  async componentDidMount() {
    await this.saveUserFromToken();
    this.setState({ loading: false });
  }

  saveUserFromToken = async () => {
    axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('notesApiToken')}`;
    try {
      const { data } = await axios.get('/user');

      this.setState({ user: data });
    } catch (e) {
      console.log('/login e', e);
      this.props.history.push('/login');
    }
  };

  deleteUser = () => {
    this.setState({ user: null });
  };

  render() {
    const { user, loading } = this.state;

    if (loading)
      return (
        <Grid container style={style.loadRoot}>
          <CssBaseline />
          <CircularProgress size={60} />
          <Typography variant="title">Just a moment...</Typography>
        </Grid>
      );

    return (
      <React.Fragment>
        <CssBaseline />
        <Header user={user} deleteUser={this.deleteUser} />
        <Paper style={style.root} component="main">
          <Switch>
            <Route
              exact
              path="/"
              render={() => {
                return <Notes user={user} />;
              }}
            />
            <Route
              path="/login"
              render={() => {
                return <Login loggedIn={!!user} saveUserFromToken={this.saveUserFromToken} />;
              }}
            />
            <Route
              path="/register"
              render={() => {
                return <Register loggedIn={!!user} saveUserFromToken={this.saveUserFromToken} />;
              }}
            />
            <Route path="/about" component={About} />
          </Switch>
        </Paper>
      </React.Fragment>
    );
  }
}

export default withRouter(App);
