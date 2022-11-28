import React from 'react';


class Login extends React.Component {

  async getData() {
    await fetch(process.env.REACT_APP_SERVER_URL, {
        method: "GET",
        headers: new Headers({
            "Content-Type": 'application/json',
        })
    })
        .then((res) => res.json())
        .then((obj) => {
          console.log(obj.login, obj.password);
        });
}

  render() {
    return (
      <>
        <p>Log in page</p>
        <button onClick={() => {this.getData();}}>Get data</button>
      </>
    );
  }
}

export default Login;

