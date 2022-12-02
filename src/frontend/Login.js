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

      <h2>Log in page</h2>

      <form>

        <label htmlFor="username">Username</label>
        <input type="text" id="username" name="username" />
        <br/>

        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" />
        <br/>

        <button className="btn btn-success" onClick={(e) => {login(e);}}>Log In</button>

      </form>

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

