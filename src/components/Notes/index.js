import * as React from 'react';

import Note from './Note';

class Notes extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Note />
        <Note />
      </React.Fragment>
    );
  }
}

export default Notes;
