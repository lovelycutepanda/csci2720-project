import React from 'react';


class AdminHomepage extends React.Component {

  async getAllUser() {
    await fetch(`${process.env.REACT_APP_SERVER_URL}/getalluserdata`, {
      method: "GET",
      headers: new Headers({
          "Content-Type": 'application/json',
      })
  })
      .then((res) => res.json())
      .then((obj) => {
        obj.map(({username, password, favourite}, index) => {
          console.log(favourite);
          let str = `
          user ${index}
          username: ${username}
          password: ${password}
          favourite locations: ${favourite}
          `
          str = str.replace(/^ +/gm, '');
          console.log(str);
        });
      });
  }

  render() {
    return (
      <>
        <p>This is admin's home page</p>
        <button onClick={() => {this.getAllUser()}}>Get users</button>
      </>
    );
  }
}

export default AdminHomepage;