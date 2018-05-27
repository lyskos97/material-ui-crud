import * as React from 'react';
import {
  Grid,
  Typography,
  CircularProgress,
  Button,
  Icon,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  InputLabel,
  Input,
  FormControl
} from '@material-ui/core';
import axios from 'axios';

import Note from './Note';

const styles = {
  formField: {
    margin: '10px 0'
  }
};

class Notes extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      openDialog: false,
      newNote: {
        title: '',
        text: ''
      },
      loading: false,
      error: false,
      notes: []
    };
  }

  async componentDidMount() {
    await this.fetchNotes();
  }

  static getDerivedStateFromProps = () => {
    return null;
  };

  fetchNotes = () => {
    console.log('fetching notes...');
    this.setState({ loading: true }, async () => {
      const { data } = await axios.get('/notes');
      console.log('notes', data);
      this.setState({ notes: data.notes, loading: false });
    });
  };

  handleChange = e => {
    const { newNote } = this.state;
    const { name, value } = e.target;

    this.setState({ newNote: { ...newNote, [name]: value } });
  };

  handleDiglogOpen = () => {
    this.setState({ openDialog: true });
  };

  handleDialogClose = () => {
    this.setState({
      openDialog: false,
      newNote: {
        title: '',
        text: ''
      }
    });
  };

  handleNoteAdd = async () => {
    const { title, text } = this.state.newNote;
    try {
      await axios.post('/notes', { title, text });

      this.fetchNotes();
      this.setState({
        openDialog: false,
        newNote: {
          title: '',
          text: ''
        }
      });
    } catch (e) {
      console.log('addNote arr', e);
      this.setState({
        error: true,
        openDialog: false,
        newNote: {
          title: '',
          text: ''
        }
      });
    }
  };

  render() {
    const { notes, loading, error, openDialog, newNote } = this.state;
    const { title, text } = newNote;

    if (error) return 'error';

    return (
      <React.Fragment>
        <Typography variant="headline">Your notes</Typography>
        <Grid container spacing={8}>
          {loading ? (
            <CircularProgress />
          ) : (
            notes.map(note => (
              <Grid key={note._id} item md={4} xs={12} sm={6}>
                <Note refetchNotes={this.fetchNotes} note={note} />
              </Grid>
            ))
          )}
        </Grid>
        {this.props.user && (
          <React.Fragment>
            <Button
              onClick={this.handleDiglogOpen}
              variant="fab"
              color="primary"
              style={{ position: 'fixed', right: 50, bottom: 50 }}
            >
              <Icon>add_icon</Icon>
            </Button>
            <Dialog open={openDialog} onClose={this.handleDialogClose}>
              <DialogTitle>New note</DialogTitle>
              <DialogContent>
                {/* <DialogContentText>You know</DialogContentText> */}
                <FormControl style={styles.formField} fullWidth>
                  <InputLabel htmlFor="add-note-title">Title</InputLabel>
                  <Input
                    fullWidth
                    autoFocus
                    id="add-note-title"
                    name="title"
                    value={title}
                    onChange={this.handleChange}
                    endAdornment={<Icon>edit_icon</Icon>}
                    multiline
                  />
                </FormControl>
                <FormControl style={styles.formField} fullWidth>
                  <InputLabel htmlFor="add-note-text">Text</InputLabel>
                  <Input
                    value={text}
                    name="text"
                    id="add-note-text"
                    onChange={this.handleChange}
                    endAdornment={<Icon>edit_icon</Icon>}
                    fullWidth
                    multiline
                    rowsMax={10}
                    rows={3}
                  />
                </FormControl>
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleDialogClose} color="primary">
                  Cancel
                </Button>
                <Button onClick={this.handleNoteAdd} color="primary">
                  Save
                </Button>
              </DialogActions>
            </Dialog>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

export default Notes;
