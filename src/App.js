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



class App extends React.Component {
  render() {
    return (
      <div className="App">
        {/* to be replaced by express */}
        <BrowserRouter>
          <div style={{height: '100vh'}}>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/user" element={<UserHomepage />} />
              <Route path="/admin" element={<AdminHomepage />} />
            </Routes>
          </div>
          
          <hr />

          <div>
            <ul>
              <li> <Link to="/">Log in</Link> </li>
              <li> <Link to="/user">User Homepage</Link> </li>
              <li> <Link to="/admin">Admin Homepage</Link> </li>
            </ul>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
