import * as React from 'react';
import { GridList, Grid, Typography } from '@material-ui/core';

import Note from './Note';

const mockNotes = [
  { id: 1, title: 'Note #1', text: 'Do this and that, so I could get ', updatedAt: new Date() },
  { id: 2, title: 'Note #2', text: 'That, so I could get those', updatedAt: new Date() },
  { id: 3, title: 'Note #3', text: 'this, that, so I could get dat', updatedAt: new Date() },
  { id: 4, title: 'Note #4', text: 'Do this and that, those', updatedAt: new Date() },
  { id: 5, title: 'Note #5', text: 'Nope,this and that, so get those', updatedAt: new Date() },
  { id: 6, title: 'Note #6', text: 'Kinda that, so I could get those', updatedAt: new Date() },
  { id: 7, title: 'Note #7', text: 'Props, and that, so I could get those', updatedAt: new Date() }
];

class Notes extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: mockNotes,
      loading: false,
      error: false
    };
  }

  deleteNote = idToDelete => {
    const updatedNotes = this.state.notes.filter(({ id }) => id !== idToDelete);
    this.setState({ notes: updatedNotes });
  };

  render() {
    const { notes } = this.state;

    return (
      <React.Fragment>
        <Typography variant="headline">Your notes</Typography>
        <Grid container spacing={8}>
          {notes.map(note => (
            <Grid key={note.id} item md={4} xs={12} sm={6}>
              <Note
                note={note}
                deleteNote={() => {
                  this.deleteNote(note.id);
                }}
              />
            </Grid>
          ))}
        </Grid>
      </React.Fragment>
    );
  }
}

export default Notes;
