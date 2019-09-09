import React, { Component } from 'react';
import NotefulForm from '../NotefulForm/NotefulForm';
import NotefulError from '../NotefulError';
import PropTypes from 'prop-types';
import './AddFolder.css';
import { withRouter } from 'react-router-dom';
import ApiContext from '../ApiContext';
import config from '../config';

class AddFolder extends Component {

  state = {
    error: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      name: ''
    }
  }

  static contextType = ApiContext;

  handleFolderSubmit = e => {
    e.preventDefault()
    const {name} = e.target
    const folder = {
      name: name.value
    }
    const url = `${config.API_ENDPOINT}/api/folders`
    
    const options = {
    method: 'POST',
    headers: {
        'content-type': 'application/json'
    },
    body: JSON.stringify(folder),
    }
    this.setState({ error: null })
    fetch(url, options)
      .then(res => {
        if(!res.ok) {
          throw new Error('Something went wrong, please try again later');
        }
        return res.json();
      })
      .then((data) => {
        this.context.addFolder(data)
        this.props.history.push('/')
      })
      .catch(err => {
        this.setState({
          error: err.message
        });
      })
  }

  render() {
    return (
      <section className='AddFolder'>
        <NotefulError>
        <h2>Create a folder</h2>
        <NotefulForm onSubmit={this.handleFolderSubmit}>
          <div className='field'>
            <label htmlFor='name-input'>
              Name
            </label>
            <input type='text' id='name'/>
          </div>
          <div className='buttons'>
            <button type='submit' className="addFolderButton">
              Add folder
            </button>
          </div>
        </NotefulForm>
        </NotefulError>
      </section>
    )
  }
}

AddFolder.propTypes = {
  addFolder: PropTypes.func.isRequired,
  folders: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired
  })) 
};

export default withRouter(AddFolder);