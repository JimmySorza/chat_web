import React from 'react';
import Slide from '@material-ui/core/Slide';
import Snackbar from '@material-ui/core/Snackbar';

function TransitionDown(props) {
  return <Slide {...props} direction="down" />
}

class SnackbarNotif extends React.Component {
  render() {
    const { snackbarIsOpen, name, closeSnackbar, mode } = this.props;
    return (
      <Snackbar
        open={snackbarIsOpen}
        onClose={closeSnackbar}
        autoHideDuration={1000}
        transitionDuration={TransitionDown}
        ContentProps={{
          'aria-describedby': 'message-id'
        }}
        message={
          <span id="message-id">
            {name} {mode === 'pitch' ? 'pitched in!!' : 'obtenido!!'}
          </span>
        }
      />
    )
  }
}

export default SnackbarNotif;
