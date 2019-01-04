import React, { Component } from 'react';
import { Table } from 'antd';
import reqwest from 'reqwest';



class Table_app extends Component {
  constructor(props) {
    super(props);
    this.state = {
    // state = {
      data: [],
      pagination: {},
      loading: false,
      columns: [{
          title: 'Username',
          dataIndex: 'username',
          sorter: true,
          width: 150,
          fixed: 'left',
        }, {
          title: 'Grade',
          dataIndex: 'grades',
          filters: [{
              text: 'Zero',
              value: '0.0'
            },
            {
              text: 'Full',
              value: '1.0'
            },
          ],
          fixed: 'left',
          width: 100,
        }, {
          title: 'Email',
          dataIndex: 'email',
          width: 250,
        }, {
          title: 'Assignment',
          children: [],
          width: 3500,
        },
      ],
    };
  }

  componentDidMount() {
    this.fetch();
  }

  handleTableChange = (pagination, filters, sorter) => {
      const pager = { ...this.state.pagination };
      pager.current = pagination.current;
      this.setState({
        pagination: pager,
      });

      this.fetch({
        // results: pagination.pageSize,
        page: pagination.current,
        sortField: sorter.field,
        sortOrder: sorter.order,
        ...filters,
      });
    }

  fetch = (params = {page: 1}) => {
      console.log('params:', params);
      this.setState({ loading: true });
      reqwest({
        url: 'https://5a84f018.ngrok.io/api/v1/result/',
        method: 'get',
        data: {
          // results: 20,
          // params,
          page: params.page
        },
        type: 'json',
      }).then((data) => {
        const pagination = { ...this.state.pagination };
        // Read total count from server
        // pagination.pageSize = 25;
        pagination.total = data.count;
        pagination.showTotal = (total, range) => `${range[0]}-${range[1]} of ${total} items`;
        // pagination.showSizeChanger = true;
        // pagination.total = 200;.

        this.state.columns[3].children = data.results[0].assign_list.map(
            item => Object.assign({},
              {
                title: item.assign_name,
                dataIndex: item.assign_name,
                render: score => `${item.score}`,
                width: 3500/data.results[0].assign_list.length,
              }
            )
        );

        // const ass_l = {
        //   title: 'Assignment',
        //   children: data.results[0].assign_list.map(
        //     item => Object.assign({},
        //       {
        //         title: item.assign_name,
        //         dataIndex: item.assign_name,
        //         render: score => `${item.score}`,
        //       }
        //     )
        //   )
        // };
        // columns.push(ass_l);

        this.setState({
          loading: false,
          data: data.results,
          pagination,
        });
      });
    }

  render() {
    return (
      <Table
        columns={this.state.columns}
        rowKey={record => record.username}
        dataSource={this.state.data}
        pagination={this.state.pagination}
        loading={this.state.loading}
        onChange={this.handleTableChange.bind(this)}
        size="small"
        scroll={{ x: 4000, y: 300}}
        bordered
      />
    );
  }
}

export default Table_app;
