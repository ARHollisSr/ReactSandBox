import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    const helloWorld = "Welcome to the Road to learn React";
    var user = {
      firstName: "Anthony",
      lastName: "Hollis"
    };
    return (
      <div className="App">
       <h2>{helloWorld}</h2>
       <p>{user.firstName}</p>
       <p>{user.lastName}</p>
      </div>
    );
  }
}

export default App;
