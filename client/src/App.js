import './App.css';
import { Routes, Route } from "react-router-dom";
import { Fragment } from 'react';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Layout from './Layout/Layout';
import socket from './socket/socket';




function App() {
  // const sendMsg =()=>{
  //   socket.emit('hel','dig')
  // }


  return (
  <Fragment>
     <Layout>
      <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="about" element={<AboutUs />} />
        </Routes>
     </Layout>
  </Fragment>
     
  );
}



export default App;
