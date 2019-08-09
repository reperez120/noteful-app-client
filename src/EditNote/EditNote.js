import React, { Component } from 'react';
import './EditNote.css';
import ApiContext from '../ApiContext';

export default class EditNote extends Component {

    state = {
        name: "",
        content: "",
        folder: ""
    }

    static contextType = ApiContext

    componentDidMount() {

    const noteId = this.props.match.params.noteId

    fetch(`http://localhost:8000/api/folders/${noteId}`, { method: 'GET'})
        .then(res => {
        if(!res.ok) {
            throw new Error('Something went wrong, please try again later');
        }
        return res.json();
        })  
    .then(data => {
         this.setState({
                 name: data.name,
                 content: data.content,
                 folder: data.folder
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
        const noteName = e.target.name.value
        this.setState ({
           name: noteName
        })

        console.log(this.state)

        const noteId = this.props.match.params.noteId

        const url = `http://localhost:8000/api/notes/${noteId}`
        console.log(url)
        const options = {
            method: 'PATCH',
             headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(this.state.inputValues)
        }
        fetch(url, options)
        .then(res => {
        this.context.updateNote(res)
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
    const { name, content, folders  } = this.state
 
    return (
      <section className='EditNote'>
        <h2>Edit Note</h2>
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
            <div className='field'>
              <label htmlFor='note-content-input'>
                Content
              </label>
              <textarea 
              type='text' 
              id='content' 
              name='content'
              defaultValue={content}/>
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
                <button className='editButton' type='submit'>
                Edit folder
                </button>
            </div>
        </form>
      </section>
    )
  }
}