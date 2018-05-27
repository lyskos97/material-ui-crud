import * as React from 'react';
import { Link, Redirect } from 'react-router-dom';
import {
  Paper,
  FormControl,
  Input,
  InputLabel,
  Icon,
  Grid,
  Typography,
  Button,
  Divider
} from '@material-ui/core';
import axios from 'axios';

const styles = {
  form: { padding: 20, width: 700 },
  formControl: {
    margin: '10px 0'
  },
  buttonPanel: {
    marginTop: 20
  }
};

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      success: false,
      username: '',
      password: ''
    };
  }

  handleChange = e => {
    const { name, value } = e.target;

    this.setState({ [name]: value });
  };

  handleLogin = async () => {
    const { username, password } = this.state;

    try {
      const { data } = await axios.post('/auth/login', { username, password });
      localStorage.setItem('notesApiToken', data);
      try {
        await this.props.saveUserFromToken();
      } catch (e) {
        console.log('login err', e);
      }
    } catch (e) {
      console.log('login err', e);
    }
  };

  render() {
    const { username, password, success } = this.state;

    if (this.props.loggedIn) return <Redirect to="/" />;

    return (
      <Grid container justify="center">
        <Paper style={styles.form}>
          <Typography variant="display1">Login</Typography>
          <Typography variant="subheading">Enter your credentials</Typography>
          <Divider />
          <FormControl style={styles.formControl} fullWidth>
            <InputLabel htmlFor="username">Username</InputLabel>
            <Input
              fullWidth
              id="username"
              name="username"
              value={username}
              onChange={this.handleChange}
              endAdornment={<Icon>person_icon</Icon>}
            />
          </FormControl>
          <FormControl style={styles.formControl} fullWidth>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={this.handleChange}
              endAdornment={<Icon>lock_icon</Icon>}
            />
          </FormControl>
          <div style={styles.buttonPanel}>
            <Button
              onClick={this.handleLogin}
              style={styles.button}
              fullWidth
              size="large"
              variant="raised"
              color="primary"
            >
              Login
            </Button>
            <Typography
              style={{ textAlign: 'center', margin: 10, cursor: 'default' }}
              variant="caption"
            >
              Don't have an account yet?
            </Typography>
            <Button
              style={styles.button}
              component={Link}
              to="/register"
              fullWidth
              size="large"
              variant="outlined"
              color="primary"
            >
              Register
            </Button>
          </div>
        </Paper>
      </Grid>
    );
  }
}

export default Login;
