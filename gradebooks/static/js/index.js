import React from 'react'
import ReactDOM from 'react-dom'
import '../css/index.css';
import App from './App';
import App_form from './Ant_form';
// import App from './Ant_table';
//import * as serviceWorker from './serviceWorker';
// import reqwest from 'reqwest';

ReactDOM.render(<App_form />, document.getElementById('filterForm'));
ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
//serviceWorker.unregister();


// function Welcome(props) {
//  return <h1>Hello, {props.name}</h1>;
// }
//
// const element = <Welcome name="world" />;
// ReactDOM.render(
//  element,
//  document.getElementById('root')
// );


// import {
//   Form, Input, Select, Button,
// } from 'antd';
//
// const { Option } = Select;
//
// class PriceInput extends React.Component {
//   static getDerivedStateFromProps(nextProps) {
//     // Should be a controlled component.
//     if ('value' in nextProps) {
//       return {
//         ...(nextProps.value || {}),
//       };
//     }
//     return null;
//   }
//
//   constructor(props) {
//     super(props);
//
//     const value = props.value || {};
//     this.state = {
//       number: value.number || 0,
//       currency: value.currency || 'rmb',
//     };
//   }
//
//   handleNumberChange = (e) => {
//     const number = parseInt(e.target.value || 0, 10);
//     if (Number.isNaN(number)) {
//       return;
//     }
//     if (!('value' in this.props)) {
//       this.setState({ number });
//     }
//     this.triggerChange({ number });
//   }
//
//   handleCurrencyChange = (currency) => {
//     if (!('value' in this.props)) {
//       this.setState({ currency });
//     }
//     this.triggerChange({ currency });
//   }
//
//   triggerChange = (changedValue) => {
//     // Should provide an event to pass value to Form.
//     const onChange = this.props.onChange;
//     if (onChange) {
//       onChange(Object.assign({}, this.state, changedValue));
//     }
//   }
//
//   render() {
//     const { size } = this.props;
//     const state = this.state;
//     return (
//       <span>
//         <Input
//           type="text"
//           size={size}
//           value={state.number}
//           onChange={this.handleNumberChange}
//           style={{ width: '65%', marginRight: '3%' }}
//         />
//         <Select
//           value={state.currency}
//           size={size}
//           style={{ width: '32%' }}
//           onChange={this.handleCurrencyChange}
//         >
//           <Option value="rmb">RMB</Option>
//           <Option value="dollar">Dollar</Option>
//         </Select>
//       </span>
//     );
//   }
// }
//
// class Demo extends React.Component {
//   handleSubmit = (e) => {
//     e.preventDefault();
//     this.props.form.validateFields((err, values) => {
//       if (!err) {
//         console.log('Received values of form: ', values);
//         fetch('http://127.0.0.1:8000/gradebooks/api_learner/', {
//           method: 'GET',
//           values,
//         })
//         .then(function (response) {
//           console.log(response);
//           if (response.status === 200) {
//             alert('Success!!!');
//           } else {
//             alert('Issues Problems');
//           }
//           // you cannot parse your "success" response, since that is not a valid JSON
//           // consider using valid JSON req/resp pairs.
//           return response.json();
//         })
//         .then(function(myResult) {
//           let result_json = JSON.stringify(myResult);
//           console.log(result_json);
//         }
//
//         );
//       }
//     });
//
//   }
//
//   checkPrice = (rule, value, callback) => {
//     if (value.number > 0) {
//       callback();
//       return;
//     }
//     callback('Price must greater than zero!');
//   }
//
//   render() {
//     const { getFieldDecorator } = this.props.form;
//     return (
//       <Form layout="inline" onSubmit={this.handleSubmit}>
//         <Form.Item label="Price">
//           {getFieldDecorator('price', {
//             initialValue: { number: 0, currency: 'rmb' },
//             rules: [{ validator: this.checkPrice }],
//           })(<PriceInput />)}
//         </Form.Item>
//         <Form.Item>
//           <Button type="primary" htmlType="submit">Submit</Button>
//         </Form.Item>
//       </Form>
//     );
//   }
// }
//
// const WrappedDemo = Form.create()(Demo);
//
// ReactDOM.render(<WrappedDemo />, document.getElementById('root'));
