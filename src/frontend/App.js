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
import AdminDefault from './AdminDefault.js';
import AdminAction from './AdminAction.js';



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
            <Route path="/admin" element={account === "admin"? <AdminHomepage switchAccount={switchAccount}/> : <Navigate to='/'/>} >
              <Route path="" element={<AdminDefault />}  />
              <Route path="action/:action" element={<AdminAction />} />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
      
    </div>
  );
} 

export default App;
