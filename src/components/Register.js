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

class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      username: '',
      password: ''
    };
  }

  handleChange = e => {
    const { name, value } = e.target;

    this.setState({ [name]: value });
  };

  handleRegister = async e => {
    const { username, password } = this.state;

    try {
      const { data } = await axios.post('/auth/register', { username, password });

      try {
        await this.props.saveUserFromToken();
      } catch (e) {
        console.log('reg err', r);
      }
    } catch (e) {
      this.setState({ error: e });
    }
  };

  render() {
    const { username, password, error, success } = this.state;

    if (this.props.loggedIn) return <Redirect to="/" />;

    return (
      <Grid container justify="center">
        <Paper style={styles.form}>
          <Typography variant="display1">Register</Typography>
          <Typography variant="subheading">Enter your credentials</Typography>
          {error && (
            <Paper>
              <Typography variant="subheading" color="error">
                {error}
              </Typography>
            </Paper>
          )}
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
              style={styles.button}
              onClick={this.handleRegister}
              fullWidth
              size="large"
              variant="raised"
              color="primary"
            >
              Register
            </Button>
            <Typography
              style={{ textAlign: 'center', margin: 10, cursor: 'default' }}
              variant="caption"
            >
              Already have an account?
            </Typography>
            <Button
              style={styles.button}
              component={Link}
              to="/login"
              fullWidth
              size="large"
              variant="outlined"
              color="primary"
            >
              Login
            </Button>
          </div>
        </Paper>
      </Grid>
    );
  }
}

export default Register;
