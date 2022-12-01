import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';


const Login = () => {

  const navigate = useNavigate();  

  let login = async (e) => {

    e.preventDefault();

    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    if (username)

    await fetch(`${process.env.REACT_APP_SERVER_URL}/login`, {
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

          // no error
          window.sessionStorage.setItem("user", username);
          if (username === 'admin')
            navigate("./admin");
          else
            navigate("./user");

        });
  }

  return (
    <div>
      <p>Log in page</p>

      <form>

        <label htmlFor="username">Username</label>
        <input type="text" id="username" name="username" />
        <br/>

        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" />
        <br/>

        <button className="btn btn-success" onClick={(e) => {login(e);}}>Log In</button>

      </form>
      
    </div>
  );
}

export default Login;

