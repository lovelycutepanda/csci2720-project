import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Login.css';


const Login = (props) => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  const login = async (e) => {
    e.preventDefault();

    // input validation
    if (username.length < 4 || username.length > 20)
      return toast.error("Username is of 4-20 characters.");
    if (password.length < 4 || password.length > 20)
      return toast.error("Password is of 4-20 characters.");

    // input verification
    await fetch(`${window.location.origin}/api/user/findone`, {
        method: "POST",
        headers: new Headers({
          "Content-Type": 'application/json',
        }),
        body: JSON.stringify({
          username: username,
          password: password
        })
    })
        .then((res) => res.json())
        .then((obj) => {
          // if error is found
          if (obj.err)
            return toast.error(obj.err);
          props.switchAccount(username);
        });
  }

  return (
    <div id="login">

      {/* please work on frontend design */}
      <div className='loginform'>

      <div className='usericon'>
      <i className="fa-regular fa-user fa-5x"></i>
      </div>
      
      <h2 className='header'>Login</h2>

      <form>

      <div className='row'>
      <label htmlFor="username">Username</label>
      <input type="text" id="username" placeholder="Enter your username" value={username} onChange={(e) => setUsername(e.target.value)}/>
      <br/>
      </div>

      <div className='row'>
      <label htmlFor="password">Password</label>
      <input type="password" id="password" placeholder="Enter your password"  value={password} onChange={(e) => setPassword(e.target.value)}/>
      <br/>
      </div>

      <div className='row'>
      <button className="loginbutton" onClick={(e) => {login(e);}}>Log In</button>
      </div>

      </form>
      </div>
      <ToastContainer position="bottom-right" autoClose={3000} pauseOnFocusLoss={false} />
    </div>
  );
}

export default Login;

