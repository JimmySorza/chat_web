import React, { useState, useEffect } from 'react';
import io from "socket.io-client";

const socket = io.connect("http://localhost:5000");

function App() {

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
    <div>
      <span>Nickname</span>
      <input
        name="nickname"
        onChange={e => onTextChangeNick(e)}
        value={nickname}
      />
      <span>Message</span>
      <input
        name="msg"
        onChange={e => onTextChangeMsg(e)}
        value={msg}
      />
      <button onClick={onMessageSubmit}>Send</button>
      <div>{renderChat()}</div>
    </div>
  );
}

export default App;
