import React, { Component } from 'react';
import logo from '../media/logo.svg';
import '../css/App.css';
import HelloApp from './HelloApp';
import MyStatelessComponent from './MyStatelessComponent';

class App extends Component {
  render() {
    return (
      <div className="App">
        <HelloApp message="This is message sent from App.js"/>

         <MyStatelessComponent
            title="Stateless"
            message="Example of Stateless Component"
          />

        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
