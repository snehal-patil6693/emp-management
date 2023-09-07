import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';
import AdminPanel from './pages/AdminPanel';
import UserPanel from './pages/UserPanel';
import LoginApi from './pages/LoginApi';

function App() {
  return (
    <>
        <Router>
           <Routes>
              <Route path='/' exact element = {<LoginApi />} />
              <Route path='/adminpanel' element={<AdminPanel />} />
              <Route path='/userpanel' element={<UserPanel />} />    
           </Routes>
        </Router>  
    
        </> 
  );
}

export default App;
