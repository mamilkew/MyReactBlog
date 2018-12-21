import React, {
  Component
} from 'react';
import ReactTable from "react-table";
import 'react-table/react-table.css'


class React_table extends Component {
  constructor(){
    super();
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
            list: result,
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
        <ReactTable
        data={list.results}
        columns={
          [
            {
              Header: "Username",
              accessor: "username"
            },
            {
              Header: "Grade",
              accessor: "grades"
            },
            {
              Header: "Email",
              accessor: "email"
            },
          ]
        }
        defaultPageSize={10}
         />
        </div>
      );
    }
  }
}
export default React_table;
