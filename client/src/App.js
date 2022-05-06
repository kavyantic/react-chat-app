import './App.css';
import { Routes, Route, Link } from "react-router-dom";
import { io } from "socket.io-client";
import { useEffect } from 'react';

const socket = io()

function App() {

  useEffect(()=>{
    fetch('/home').catch(e=>{console.log(e);}).then(e=>{console.log(e);})
    socket.emit("hello from client", 5, "6", { 7: Uint8Array.from([8]) });
    socket.on("hello from server", (...args) => {
  console.log('said hello');
    });
  })
  const sendMsg =()=>{
    socket.emit('hel','dig')
  }
  console.log(socket);


  return (
    <div className="App">
      <button onClick={sendMsg}>clieck me</button>
              <Link to="/about">About</Link>
              <Link to="/">Home</Link>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
      </Routes>
    </div>
  );
}



function Home(){
  return <h1>hello home</h1>
}


function About(){
  return <h1>dello about</h1>
}

export default App;
