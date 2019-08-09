import React, { Component } from 'react';
import './EditFolder.css';
import ApiContext from '../ApiContext';

export default class EditFolder extends Component {

    state = {
        name: ""
    }

    static contextType = ApiContext

    componentDidMount() {

    const folderId = this.props.match.params.folderId

    fetch(`http://localhost:8000/api/folders/${folderId}`, { method: 'GET'})
        .then(res => {
        if(!res.ok) {
            throw new Error('Something went wrong, please try again later');
        }
        return res.json();
        })  
    .then(data => {
         this.setState({
                 name: data.name
         })
        })
    .catch(err => {
        this.setState({
            error: err.message
            });
        })
    }

    handleSubmit = e => {
        e.preventDefault()
        const folderName = e.target.name.value
        this.setState ({
           name: folderName
        })

        console.log(this.state)

        const folderId = this.props.match.params.folderId

        const url = `http://localhost:8000/api/folders/${folderId}`
        const options = {
            method: 'PATCH',
             headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(this.state.inputValues)
        }
        fetch(url, options)
        .then(res => {
        this.context.updateFolder(res)
        if(!res.ok) {
            throw new Error('Something went wrong, please try again later');
        }
        return res.json();
        })  
        .then(data => {
            this.context.updateFolder(data)
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
                    // onChange={this.handleNameChange}
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