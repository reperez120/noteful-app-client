import React, { Component } from 'react';

export default class EditFolderForm extends Component {

    componentDidMount() {

    const folderId = this.props.match.params.articleId

    fetch('http://localhost:8000/api/folders/${this.props.match.params.folderId}', { method: 'GET'})
        .then(res => {
        if(!res.ok) {
            throw new Error('Something went wrong, please try again later');
        }
        return res.json();
        })  
    .then(data => {
        this.setState({
                // folder.name
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

        fetch(
            'http://localhost:8000/api/folders/${this.props.match.params.folderId}', {
             method: 'PATCH',
            body: JSON.stringify(this.state.inputValues)
        })
        .then(res => {
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
      <section className='EditFolderForm'>
        <h2>Edit Folder</h2>
        <form onSubmit={this.handleSubmit}> 
            <div className='field'>
                <label htmlFor='name-input'>
                Name
                </label>
                <input 
                    type='text' 
                    id='name' 
                    name='name'
                    value={name}
                    onChange={this.handleNameChange}
                    />
            </div>
            <div className='buttons'>
                <button type='submit'>
                Edit folder
                </button>
            </div>
        </form>
      </section>
    )
  }
}