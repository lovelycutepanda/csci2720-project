import './App.css';
import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from 'react-router-dom';
import AdminHomepage from './AdminHomepage.js';
import UserHomepage from './UserHomepage.js';
import Login from './Login.js';



const App = () => {
  return (
    <div className="App">
      
      <BrowserRouter>
        <div style={{height: '100vh'}}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/user" element={<UserHomepage />} />
            <Route path="/admin" element={<AdminHomepage />} />
          </Routes>
        </div>
        
      {/* to be deleted */}
        <hr />
        <div>
          <ul>
            <li> <Link to="/">Log in</Link> </li>
            <li> <Link to="/user">User Homepage</Link> </li>
            <li> <Link to="/admin">Admin Homepage</Link> </li>
          </ul>
        </div>
      </BrowserRouter>

      {/* to be deleted */}
      <div>
        <br/><br/><br/>
        user <br/>
        username: testPlayer <br/>
        password: testing <br/>
        <br/>
        admin <br/>
        username: admin <br/>
        password: admin
      </div>
      
    </div>
  );
} 

export default App;
