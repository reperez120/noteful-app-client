import React from 'react'
import ReactDOM from 'react-dom'
// import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
// import {withRouter} from 'react-router-dom';
import App from './App'
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
      <App/>,
    div
  )
  ReactDOM.unmountComponentAtNode(div)
 })
 