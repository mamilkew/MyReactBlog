import {
  Form, Input, Select, Button,
} from 'antd';
import React from 'react';
import reqwest from 'reqwest';

const { Option } = Select;
let children = [];

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
      number: value.number || 0,
      assign: value.assign,
      condition: value.condition,
    };
  }

  handleNumberChange = (e) => {
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


  fetch = (params = {}) => {
    console.log('params:', params);
    this.setState({ loading: true });
    reqwest({
      url: 'https://f3cbec5d.ngrok.io/api/assignlist/',
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

  componentDidMount() {
    this.fetch();
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
        </Select>

        <Input
          type="text"
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
          url: 'https://f3cbec5d.ngrok.io/api/result/',
          method: 'get',
          data: values.filtering,
          type: 'json',
        }).then((data) => {
          console.log(data);
        });
      }
    });
  }

  checkScore = (rule, value, callback) => {
    if (value.number > 0) {
      callback();
      return;
    }
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
