import * as React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { Paper, CssBaseline } from '@material-ui/core';
import axios from 'axios';

import Header from './Header';
import Notes from './Notes';
import About from './About';
import Login from './Login';
import Register from './Register';

const style = {
  root: {
    padding: 20
  }
};

/* SETUP AXIOS */
axios.defaults.baseURL = 'http://localhost:4000/api';
axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('notesApiToken')}`;

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null
    };
  }

  async componentDidMount() {
    await this.saveUserFromToken();
  }

  saveUserFromToken = async () => {
    try {
      const { data } = await axios.get('/user');
      console.log('/user data', data);
      this.setState({ user: data });
    } catch (e) {
      console.log('/login e', e);
      this.props.history.push('/login');
    }
  };

  render() {
    const { user } = this.state;
    console.log('user', user);

    return (
      <React.Fragment>
        <CssBaseline />
        <Header user={user} />
        <Paper style={style.root} component="main">
          <Switch>
            <Route exact path="/" component={Notes} />
            <Route
              path="/login"
              render={() => {
                console.log('rendering log...');
                return <Login loggedIn={!!user} saveUserFromToken={this.saveUserFromToken} />;
              }}
            />
            <Route
              path="/register"
              render={() => {
                console.log('rendering reg...');
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
