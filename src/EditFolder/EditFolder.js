import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './EditFolder.css';
import ApiContext from '../ApiContext';
import config from '../config';

export default class EditFolder extends Component {

    static propTypes = {
        match: PropTypes.shape({
          params: PropTypes.object,
        }),
        history: PropTypes.shape({
          push: PropTypes.func,
        }).isRequired,
      };

    state = {
        error: null,
        id: "",
        name: ""
    };

    static contextType = ApiContext
     
    componentDidMount() {

    const folderId = this.props.match.params.folderId
   
    fetch(`${config.API_ENDPOINT}/api/folders/${folderId}`, { method: 'GET'})
        .then(res => {
        if(!res.ok) {
            throw new Error('Something went wrong, please try again later');
        }
        return res.json();
        })  
    .then(data => {
         this.setState({
            id: data.id,
            name: data.name
         })
        })
    .catch(err => {
        this.setState({
            error: err.message
            });
        })
    }

    handleNameChange = e => {
        this.setState({ name: e.target.value })
    };

    handleSubmit = e => {
        e.preventDefault()
        const folderName = e.target.name.value
       
        this.setState ({
           name: folderName
        })

        const  folderId  = this.props.match.params.folderId
        const  {id, name }  = this.state
        const newFolder =  {id, name}
        const url = `${config.API_ENDPOINT}/api/folders/${folderId}`
        const options = {
            method: 'PATCH',
             headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newFolder)
        }
        fetch(url, options)
        .then(res => {
        if(!res.ok) {
            throw new Error('Something went wrong, please try again later');
        }
        })  
        .then (() => {
            this.context.updateFolder(newFolder)
            this.props.history.push('/')
        })
        .catch(err => {
            this.setState({
                error: err.message
            });
        })
}

render() {
    const { name } = this.state
    return (
      <section className='EditFolder'>
        <h2>Edit Folder</h2>
        <form onSubmit={this.handleSubmit}> 
            <div className='field'>
                <label htmlFor='name-input'>
                Name:
                </label>
                <input 
                    type='text' 
                    id='name' 
                    name='name'
                    defaultValue={name}
                    onChange={this.handleNameChange}
                    />
            </div>
            <div className='buttons'>
                <button className='editButton' type='submit'>
                Edit folder
                </button>
            </div>
        </form>
      </section>
    )
  }
}