import React from 'react';
import './App.css'
import Login from './components/Login';
import Home from './components/Home';
import Register from './components/Register';
import Profile from './components/Profile';
import BoardUser from './components/BoardUser';
import BoardModerator from './components/BoardModerator';
import BoardAdmin from './components/BoardAdmin';
import 'react-toastify/dist/ReactToastify.css';

import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Navbar from './common/Navbar';


const App : React.FC =() => {




  return (
      
      <Router>
        <Navbar/>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/home' element={<Home/> }/>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/user' element={<BoardUser />} />
            <Route path='/mod' element={<BoardModerator />} />
            <Route path='/admin' element={<BoardAdmin/> } />

          </Routes>
       
      </Router>

    
    
  )
}

export default App

