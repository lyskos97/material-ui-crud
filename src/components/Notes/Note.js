import * as React from 'react';
import {
  Typography,
  Card,
  CardContent,
  CardHeader,
  Icon,
  Button,
  FormControl,
  InputLabel,
  Input,
  Divider
} from '@material-ui/core';

const styles = {
  root: { marginTop: 5, marginBottom: 5 },
  button: { margin: 5 },
  header: { paddingBottom: 10 },
  content: { paddingTop: 5 }
};

class Note extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      edit: false,
      note: props.note
    };
  }

  handleEdit = () => {
    this.setState({ edit: true });
  };

  handleCancel = () => {
    this.setState({ note: this.props.note, edit: false });
  };

  handleSave = () => {
    // TODO:
    this.setState({ edit: false });
  };

  handleChange = e => {
    const { note } = this.state;
    const { name, value } = e.target;

    this.setState({ note: { ...note, [name]: value } });
  };

  render() {
    const { edit, note } = this.state;
    const { title, text, updatedAt } = note;

    return (
      <Card style={styles.root}>
        <CardHeader
          title={
            edit ? (
              <FormControl fullWidth>
                <InputLabel htmlFor="note-title">Title</InputLabel>
                <Input
                  fullWidth
                  id="note-title"
                  name="title"
                  value={title}
                  onChange={this.handleChange}
                  endAdornment={<Icon>edit_icon</Icon>}
                  multiline
                />
              </FormControl>
            ) : (
              title
            )
          }
          style={styles.header}
          action={
            edit ? (
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <Button
                  onClick={this.handleCancel}
                  style={styles.button}
                  color="secondary"
                  variant="fab"
                  mini
                >
                  <Icon>close_icon</Icon>
                </Button>
                <Button
                  onClick={this.handleSave}
                  style={styles.button}
                  mini
                  variant="fab"
                  color="primary"
                >
                  <Icon>check_icon</Icon>
                </Button>
              </div>
            ) : (
              <React.Fragment>
                <Button onClick={this.handleEdit} style={styles.button} variant="fab">
                  <Icon>edit_icon</Icon>
                </Button>
                <Button
                  onClick={this.props.deleteNote}
                  style={styles.button}
                  color="secondary"
                  variant="fab"
                >
                  <Icon>delete_icon</Icon>
                </Button>
              </React.Fragment>
            )
          }
        />
        <CardContent style={styles.content}>
          {edit ? (
            <FormControl fullWidth>
              <InputLabel htmlFor="note-text">Text</InputLabel>
              <Input
                value={text}
                name="text"
                id="note-text"
                onChange={this.handleChange}
                endAdornment={<Icon>edit_icon</Icon>}
                fullWidth
                multiline
                rowsMax={8}
              />
            </FormControl>
          ) : (
            <Typography gutterBottom variant="body1" component="p">
              {text}
            </Typography>
          )}
          <Divider style={{ marginTop: 15, marginBottom: 10 }} />
          <Typography variant="caption">{updatedAt.toLocaleString()}</Typography>
        </CardContent>
      </Card>
    );
  }
}

export default Note;
