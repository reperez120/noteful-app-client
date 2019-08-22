import { configure } from 'enzyme';
import ReactDOM from 'react-dom';
import Enzyme from 'enzyme'
// import Adapter from './ReactSixteenAdapter.js'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() })