import './App.css';
import React, { useState, useEffect } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Navigate
} from 'react-router-dom';
import AdminHomepage from './AdminHomepage.js';
import UserHomepage from './UserHomepage.js';
import Login from './Login.js';
import SingleLocation from './SingleLocation.js';
import AllLocation from './AllLocation.js';



const App = () => {

  const [account, setAccount] = useState(() => sessionStorage.getItem("user"));

  useEffect(() => {
    sessionStorage.setItem("user", account);
  }, [account]);

  const switchAccount = (identity) => {
    setAccount(identity);
  }

  return (
    <div className="App">
      
      <BrowserRouter>
        <div style={{height: '100vh'}}>
          <Routes>
            <Route path="/" element={(account === "admin")? <Navigate to='/admin'/> : (account? <Navigate to='/user'/> : <Login switchAccount={switchAccount}/>)} />
            <Route path="/user" element={account? <UserHomepage switchAccount={switchAccount} /> : <Navigate to='/'/>} >
              <Route path="" element={<AllLocation />} />
              <Route path="location/:locationId" element={<SingleLocation />} />
            </Route>
            <Route path="/admin" element={account === "admin"? <AdminHomepage switchAccount={switchAccount}/> : <Navigate to='/'/>} />
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
