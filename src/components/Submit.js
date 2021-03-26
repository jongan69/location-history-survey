import React from 'react';

class Submit extends React.Component {


  nextPath(path) {
    this.props.history.push(path);
  }

  render() {
    return (
        <button style={{ marginTop: 5 }} onClick={() => history.push('/foreground')}> Submit Results </button>
    );
  }
}

export default Submit;