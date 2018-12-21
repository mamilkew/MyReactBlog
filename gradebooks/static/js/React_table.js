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
    };
  }

  componentDidMount() {
    fetch('http://cbbd438c.ngrok.io/api/learner/?page=2') //http://127.0.0.1:8000/gradebooks/api_learner/
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
        <h1>Count: {list.count}</h1>
        <ReactTable
        data={list.results}
        defaultPageSize={10}
        loading={this.state.loading}
        showPagination={true}
        showPaginationTop={false}
        showPaginationBottom={true}

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
            {
              Header: "Assignment",
              columns: [
                {
                  Header: "Ass Name",
                  id: "assign_name",
                  accessor: d => d.assign_name
                }
              ]
            },
          ]
        }
         />
        </div>
      );
    }
  }
}
export default React_table;
