import React from 'react';
import { Typography, Paper, Divider, List, ListItem } from '@material-ui/core';

export default () => (
  <React.Fragment>
    <Paper style={{ padding: 20 }}>
      <Typography variant="display1">About</Typography>
      <Divider style={{ margin: '15px 0' }} />
      <Typography variant="title" gutterBottom>
        Material-UI based CRUD React App
      </Typography>
      <Typography variant="body1" gutterBottom>
        Made by{' '}
        <a href="https://github.com/lyskos97" target="_blank">
          @lyskos97
        </a>{' '}
        for RESTful APIs with bearer-based auth
      </Typography>
      <Typography variant="headline">Featuring</Typography>
      <List  dense={true}>
        <ListItem>React Router</ListItem>
        <ListItem>Axios</ListItem>
        <ListItem>Webpack</ListItem>
      </List>
    </Paper>
  </React.Fragment>
);
