//import React from 'react'
//
//const MyStatelessComponent = (props) => (
//  <div>
//    <h1>{props.title}</h1>
//    <p>{props.message}</p>
//  </div>
//)
//
//export default MyStatelessComponent



/////////////////////////////////
//ES6
/////////////////////////////////
import React from 'react'

const MyStatelessComponent = ({ title, message }) => (
  <div>
    <h1>{title}</h1>
    <p>{message}</p>
  </div>
)

export default MyStatelessComponent