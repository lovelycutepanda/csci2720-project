import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';



const Login = () => {

  const navigate = useNavigate();  

  const login = async (e) => {
    e.preventDefault();

    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    // input validation
    if (username.length < 4 || username.length > 20)
      return console.log("Username is of 4-20 characters.");
    if (password.length < 4 || password.length > 20)
      return console.log("Password is of 4-20 characters.");

    // input verification
    await fetch(`${process.env.REACT_APP_SERVER_URL}/user/findone`, {
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
          if (obj.err) {
            console.log(obj.err);
            // warning about incorrect message
            return;
          }
          window.sessionStorage.setItem("user", username);
          if (username === 'admin')
            navigate("./admin");
          else
            navigate("./user");
        });
  }

  return (
    <div>

      {/* please work on frontend design */}
      <div className='loginform'>

      <div className='usericon'>
      <i class="fa-regular fa-user fa-5x"></i>
      </div>
      
      <h2 className='header'>Login</h2>

      <form>

      <div className='row'>
      <label htmlFor="username">Username</label>
      <input type="text" id="username" name="username" placeholder="Enter your username"/>
      <br/>
      </div>

      <div className='row'>
      <label htmlFor="password">Password</label>
      <input type="password" id="password" name="password" placeholder="Enter your password"/>
      <br/>
      </div>

      <button className="loginbutton" onClick={(e) => {login(e);}}>Log In</button>

      </form>
      </div>

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

export default Login;

