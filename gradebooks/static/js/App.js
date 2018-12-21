import React, { Component } from 'react';
import logo from '../media/logo.svg';
import '../css/App.css';
// import HelloApp from './HelloApp';
// import MyStatelessComponent from './MyStatelessComponent';
import { Table } from 'antd';
// import reqwest from 'reqwest';
// import { LocaleProvider, DatePicker, message } from 'antd';
// The default locale is en-US, but we can change it to other language
// import frFR from 'antd/lib/locale-provider/th_TH';
// import moment from 'moment';
// import 'moment/locale/th';

// moment.locale('th');



const lists = [
  {
    'id': 1,
    'title': '1st Item',
    'description': 'Description here.'
  },
  {
    'id': 2,
    'title': '2nd Item',
    'description': 'Another description here.'
  },
  {
    'id': 3,
    'title': '3rd Item',
    'description': 'Third description here.'
  }
];
// class App extends Component {
//   constructor(props) {
//     super(props);
//     this.state = { lists };
//   }
//
//   render() {
//     return (
//       <div>
//         {this.state.lists.map(item => (
//           <div>
//             <h1>{item.title}</h1>
//             <span>{item.description}</span>
//           </div>
//         ))}
//       </div>
//     );
//   }
// }
//

const columns = [{
  title: 'Name',
  dataIndex: 'username',
  sorter: true,
  width: '30%',
}, {
  title: 'Grade',
  dataIndex: 'grade',
  width: '20%',
}, {
  title: 'Email',
  dataIndex: 'email',
}];

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      list: [],
      columns: [],
    };
  }

  componentDidMount() {
    fetch('http://cbbd438c.ngrok.io/api/learner/') //http://127.0.0.1:8000/gradebooks/api_learner/
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            list: result.results,
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    const { error, isLoaded, list, columns } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          {/*<Table columns={columns} dataSource={list} />*/}
          {list.map(item => (
            <div key={item.username} id={item.learner_id}>
              <h1>{item.grades}</h1>
              <span>{item.email}</span>
            </div>
          ))}
        </div>
      );
    }
  }
}

// class App extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       date: '',
//     };
//   }
//   handleChange(date) {
//     message.info('Selected Date: ' + (date ? date.toString() : ''));
//     this.setState({ date });
//   }
//   render() {
//     return (
//       <LocaleProvider locale={frFR}>
//         <div style={{ width: 400, margin: '100px auto' }}>
//           <DatePicker onChange={value => this.handleChange(value)} />
//           <div style={{ marginTop: 20 }}>Date: {this.state.date && this.state.date.toString()}</div>
//         </div>
//       </LocaleProvider>
//     );
//   }
// }


export default App;
