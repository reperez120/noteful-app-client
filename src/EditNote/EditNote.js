import React, { Component } from 'react';

export default class EditNote extends Component {

    componentDidMount() {

    const noteId = this.props.match.params.articleId

    fetch('http://localhost:8000/api/notes{$noteId}', { method: 'GET'})
        .then(res => {
        if(!res.ok) {
            throw new Error('Something went wrong, please try again later');
        }
        return res.json();
        })  
    .then(data => {
        this.setState({
                // note.name
                //note.content
                //folder.Id
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
            'http://localhost:8000/api/notes{$noteId}', {
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
        this.context.updateNote(data)
     })
     .catch(err => {
        this.setState({
            error: err.message
            });
        })
}


render() {
    const { name, content, folders } = this.state

    return (
      <section className='EditNote'>
        <h2>Edit Note</h2>
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
            <div className='field'>
                <label htmlFor='content-input'>
                Name
                </label>
                <input 
                    type='text' 
                    id='content' 
                    name='content'
                    value={content}
                    onChange={this.handleContentChange}
                    />
            </div>
            <div className='field'>
              <label htmlFor='note-folder-select'>
                Folder
              </label>
              <select id='selectedFolder' name='selectedFolder'>
                <option value={null}>...</option>
                {folders.map(folder =>
                  <option key={folder.id} value={folder.id}>
                    {folder.name}
                  </option>
                )}
              </select>
            </div>
            <div className='buttons'>
                <button type='submit'>
                Edit note
                </button>
            </div>
        </form>
      </section>
    )
  }
}