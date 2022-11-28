import React from 'react';


class UserHomepage extends React.Component {

  async getAllEvent() {
    await fetch(`${process.env.REACT_APP_SERVER_URL}/getalleventdata`, {
      method: "GET",
      headers: new Headers({
          "Content-Type": 'application/json',
      })
  })
      .then((res) => res.json())
      .then((obj) => {
        let { message } = obj;
        console.log(message);
      });
  }

  async getAllLocation() {
    await fetch(`${process.env.REACT_APP_SERVER_URL}/getalllocationdata`, {
      method: "GET",
      headers: new Headers({
          "Content-Type": 'application/json',
      })
  })
      .then((res) => res.json())
      .then((obj) => {
        let { message } = obj;
        console.log(message);
      });
  }

  render() {
    return (
      <>
        <p>This is user's home page</p>
        <button onClick={() => {this.getAllEvent()}}>Get events</button>
        <button onClick={() => {this.getAllLocation()}}>Get locations</button>
      </>
    );
  }
}

export default UserHomepage;