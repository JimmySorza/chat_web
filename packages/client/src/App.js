import React, { useState, useEffect } from 'react';
import io from "socket.io-client";
import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  Typography,
  Paper,
  Grid,
  TextField,
  FormControl,
  Button
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(1),
  },
  title: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));


const socket = io.connect("http://localhost:5000");

function App() {
  const classes = useStyles();

  const [msg, setMsg] = useState('');
  const [chat, setChat] = useState([]);
  const [nickname, setNickname] = useState('');

  useEffect(() => {
    socket.on("chat message", ({ nickname, msg }) => {
     setChat([...chat, { nickname, msg }])

    });
  });

  const onTextChangeNick = e => {
    setNickname(e.target.value)
  };

  const onTextChangeMsg = e => {
    setMsg(e.target.value)
  };

  // envia el mensaje al server
  const onMessageSubmit = () => {
    socket.emit("chat message", { nickname, msg });
    setMsg('')
  };

  const renderChat =() =>
  {
    return chat.map(({ nickname, msg }, idx) => (
      <div key={idx}>
        <span style={{ color: "green" }}>{nickname}: </span>

        <span>{msg}</span>
      </div>
    ));
  }


  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            web chat with socket.io and react
          </Typography>
        </Toolbar>
      </AppBar>
      <Grid container spacing={3}>
        <Grid item xs={12} >
          <Paper className={classes.paper}>
              <TextField
                id="nickname"
                label="Nickname"
                name="nickname"
                onChange={e => onTextChangeNick(e)}
                value={nickname}
              />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper>
            {renderChat()}
          </Paper>
        </Grid>
        <Grid item xs={12} sm={10}>
          <Paper className={classes.paper}>
            <FormControl fullWidth variant="outlined">
              <TextField
                id="msg"
                label="Mensaje"
                name="msg"
                onChange={e => onTextChangeMsg(e)}
                value={msg}
              />
            </FormControl>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={2}>
          <Button variant="contained" color="primary" onClick={onMessageSubmit}>
            Enviar
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
