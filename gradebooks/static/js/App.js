import React, { Component } from 'react';
import logo from '../media/logo.svg';
import '../css/App.css';
import HelloApp from './HelloApp';
// import MyStatelessComponent from './MyStatelessComponent';
import Table_app from './Table';
// import { LocaleProvider, DatePicker, message } from 'antd';
// The default locale is en-US, but we can change it to other language
// import frFR from 'antd/lib/locale-provider/th_TH';
// import moment from 'moment';
// import 'moment/locale/th';

// moment.locale('th');

class App extends Component {
  render() {
    return (
      <div className="App">

        // <header className="App-header">
        //   <img src={logo} className="App-logo" alt="logo" />
        //   <p>
        //     Edit <code>src/App.js</code> and save to reload.
        //   </p>
        //   <a
        //     className="App-link"
        //     href="https://reactjs.org"
        //     target="_blank"
        //     rel="noopener noreferrer"
        //   >
        //     Learn React
        //   </a>
        // </header>


        <HelloApp message="This is message sent from App.js"/>

        // <MyStatelessComponent
        //   title="Stateless"
        //   message="Example of Stateless Component"
        // />

        <Table_app />
      </div>
    );
  }
}




export default App;
