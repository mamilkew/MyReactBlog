import React, { Component } from 'react';
import logo from '../media/logo.svg';
import '../css/App.css';
// import HelloApp from './HelloApp';
// import MyStatelessComponent from './MyStatelessComponent';

const list = [
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
//     this.state = { list };
//   }
//
//   render() {
//     return (
//       <div>
//         {this.state.list.map(item => (
//           <div>
//             <h1>{item.title}</h1>
//             <span>{item.description}</span>
//           </div>
//         ))}
//       </div>
//     );
//   }
// }

class App extends Component {
  state = {
    todos: []
  };

  async componentDidMount() {
    try {
      const res = await fetch('http://127.0.0.1:8000/gradebooks/api_learner/');
      const todos = await res.json();
      this.setState({
        todos
      });
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    return (
      <div>
        {this.state.todos.map(item => (
          <div key={item.grade}>
            <h1>{item.name}</h1>
            <span>{item.email}</span>
          </div>
        ))}
      </div>
    );
  }
}

export default App;
