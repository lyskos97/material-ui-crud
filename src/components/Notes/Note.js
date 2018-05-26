import * as React from 'react';
import { Paper, Typography, Card, CardContent, CardHeader, Icon, Button } from '@material-ui/core';

const styles = {
  root: { marginTop: 5, marginBottom: 5 }
};

class Note extends React.Component {
  render() {
    return (
      <Card style={styles.root}>
        <CardHeader
          title="Get better with Material-UI"
          action={
            <Button color="primary" variant="fab">
              <Icon>edit_icon</Icon>
            </Button>
          }
        />
        <CardContent>
          <Typography gutterBottom variant="body1" component="p" color="textSecondary">
            Learn styling, component API by writing Notes CRUD App
          </Typography>
          <Typography variant="caption">{`${new Date()}`}</Typography>
        </CardContent>
      </Card>
    );
  }
}

export default Note;
