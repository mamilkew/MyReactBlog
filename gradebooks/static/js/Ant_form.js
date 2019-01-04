import {
  Form, Input, Select, Button,
} from 'antd';
import React from 'react';
import reqwest from 'reqwest';
import Table_app from './Table';

const { Option } = Select;
let children = [];
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

class FilterInput extends React.Component {
  static getDerivedStateFromProps(nextProps) {
    // Should be a controlled component.
    if ('value' in nextProps) {
      return {
        ...(nextProps.value || {}),
      };
    }
    return null;
  }

  constructor(props) {
    super(props);
    const value = props.value || {};
    this.state = {
      number: value.number,
      assign: value.assign,
      condition: value.condition,
    };
  }

  handleNumberChange = (e) => {
      console.log(e.target.value);
    const number = parseFloat(e.target.value || 0, 10);
    if (Number.isNaN(number)) {
      return;
    }
    if (!('value' in this.props)) {
      this.setState({ number });
    }
    this.triggerChange({ number });
  }

  handleAssignChange = (assign) => {
    if (!('value' in this.props)) {
      this.setState({ assign });
    }
    this.triggerChange({ assign });
  }

  handleConditionChange = (condition) => {
    if (!('value' in this.props)) {
      this.setState({ condition });
    }
    this.triggerChange({ condition });
  }

  triggerChange = (changedValue) => {
    // Should provide an event to pass value to Form.
    const onChange = this.props.onChange;
    if (onChange) {
      onChange(Object.assign({}, this.state, changedValue));
    }
  }

  componentDidMount() {
    this.fetch();
  }

  fetch = (params = {}) => {
    console.log('params:', params);
    this.setState({ loading: true });
    reqwest({
      url: 'https://5a84f018.ngrok.io/api/v1/assignlist/',
      method: 'get',
      data: {},
      type: 'json',
    }).then((data) => {
      children = data.results.map(
        ass => <Option key={ass.assign_name}>{ass.assign_name}</Option>
      );

      this.setState({
        loading: false,
      });
    });
  }


  render() {
    const { size } = this.props;
    const state = this.state;
    return (
      <span>
        <Select
          mode="multiple"
          style={{ width: '100%' }}
          placeholder="Please select"
          size={size}
          onChange={this.handleAssignChange}
        >
        {children}
        </Select>

        <Select
          value={state.condition}
          size={size}
          style={{ width: '50%' }}
          onChange={this.handleConditionChange}
        >
          <Option value="lessThan">Less Than</Option>
          <Option value="moreThan">More Than</Option>
          <Option value="moreThanAndEquals">More Than and Equals</Option>
        </Select>

        <Input
          type="number"
          size={size}
          value={state.number}
          onChange={this.handleNumberChange}
          style={{ width: '65%', marginRight: '3%' }}
        />
      </span>
    );
  }
}

class Demo extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        reqwest({
          url: 'https://5a84f018.ngrok.io/api/v1/result/',
          method: 'post',
          data: values.filtering,
          type: 'json',
        }).then((data) => {
            console.log(data);
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
            // Table_app = (pagination, filters, sorter) => {this.props.handleTableChange(pagination, filters, sorter)};
            Table_app.state({
                loading: false,
                data: data.results,
                pagination,
                columns: columns,
            });
        });}
    });
  }

  checkScore = (rule, value, callback) => {
    // if (value.number > 0) {
      callback();
      return;
    // }
    callback('Score must greater than zero!');
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form layout="inline" onSubmit={this.handleSubmit}>
        <Form.Item label="Filtering">
          {getFieldDecorator('filtering', {
            initialValue: { number: 0, assign: [], condition: '' },
            rules: [{ validator: this.checkScore }],
          })
          (<FilterInput />)}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">Submit</Button>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedDemo = Form.create()(Demo);

class FilterFormApp extends React.Component {
  render() {
    return (
      <div>
        <WrappedDemo />
        <div className="search-result-list">Search Result</div>
      </div>
    );
  }
}

export default FilterFormApp;
