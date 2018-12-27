import React, { Component } from 'react';
import { Table } from 'antd';
import reqwest from 'reqwest';

const columns = [{
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
];

class Table_app extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      pagination: {},
      loading: false,
    };

    this.handleTableChange = (pagination, filters, sorter) => {
      const pager = { pagination };
      pager.current = pagination.current;
      this.setState({
        pagination: pager,
      });
      this.fetch({
        // results: pagination.pageSize,
        page: pagination.current,
        sortField: sorter.field,
        sortOrder: sorter.order,
        filters,
      });
    }

    this.fetch = (params = {page: 1}) => {
      console.log('params:', params);
      this.setState({ loading: true });
      reqwest({
        url: 'https://cbb69564.ngrok.io/api/result/',
        method: 'get',
        data: {
          // results: 20,
          // params,
          page: params.page
        },
        type: 'json',
      }).then((data) => {
        const pagination = { pagination };
        // Read total count from server
        // pagination.pageSize = 25;
        pagination.total = data.count;
        pagination.showTotal = (total, range) => `${range[0]}-${range[1]} of ${total} items`;
        // pagination.showSizeChanger = true;
        // pagination.total = 200;.

        columns[3].children = data.results[0].assign_list.map(
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
  }

  componentDidMount() {
    this.fetch();
  }

  render() {
    return (
      <Table
        columns={columns}
        rowKey={record => record.username}
        dataSource={this.state.data}
        pagination={this.state.pagination}
        loading={this.state.loading}
        onChange={this.handleTableChange}
        size="small"
        scroll={{ x: 4000, y: 300}}
        bordered
      />
    );
  }
}

export default Table_app;
