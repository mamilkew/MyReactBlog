import React, { Component } from 'react';

// const lists = [
//   {
//     'id': 1,
//     'title': '1st Item',
//     'description': 'Description here.'
//   },
//   {
//     'id': 2,
//     'title': '2nd Item',
//     'description': 'Another description here.'
//   },
//   {
//     'id': 3,
//     'title': '3rd Item',
//     'description': 'Third description here.'
//   }
// ];
// class Ex_fetch extends Component {
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

class Ex_fetch extends Component {
  constructor(props){
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      list: [],
    };
  }

  componentDidMount() {
    fetch('http://127.0.0.1:8000/gradebooks/api_learner/')
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
    const { error, isLoaded, list } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          {list.map(item => (
            <div key={item.name} id={item.id}>
              <h1>{item.grade}</h1>
              <span>{item.email}</span>
            </div>
          ))}
        </div>
      );
    }
  }
}

export default Ex_fetch;
