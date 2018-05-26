import * as React from 'react';

import Header from './Header';
import Notes from './Notes';

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Header />
        <Notes />
      </React.Fragment>
    );
  }
}

export default App;
