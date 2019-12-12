import io from 'socket.io-client';

const socket = io('http://localhost:7777');

const configureSocket = dispatch => {

  socket.on('connect', () => {
    console.log('connected :)')
  });

  socket.on('UPDATE_POT', state => {
    dispatch({type: 'DELIVER_UPDATE_POT_TO_REDUCER', updatePot: state})
  });

  socket.on('GUESS_WHO_PITCHED_IN', name => {
    dispatch({type: 'PITCHED_IN', name})
  });

  socket.on('CURRENT_POT', pot => {
    dispatch({type: 'CURRENT_POT_TO_REDUCER', pot: pot})
  });

  socket.on('SEND_NAMES_TO_CLIENTS', names => {
    dispatch({type: 'PUT_ALL_NAMES_TO_REDUCER', names})
  });

  socket.on('GUESS_WHO_GOT_ONE', name => dispatch({
    type: 'GOT_ONE', name
  }));

  return socket;

};

export const getCurrentPot = () => socket.emit('GET_CURRENT_POT');

export const sendNameToServer = name => socket.emit('SEND_NAME_TO_SERVER', name);

export const sendPitchInToServer = name => socket.emit('SOMEONE_PITCHED_IN', name);

export const sendGetOneToServer = name => socket.emit('SOMEONE_GOT_ONE', name);

export default configureSocket;
