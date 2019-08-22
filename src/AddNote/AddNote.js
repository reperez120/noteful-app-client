import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import NotefulForm from '../NotefulForm/NotefulForm';
import ValidationError from './ValidationError';
import NotefulError from '../NotefulError';
import './AddNote.css'

class AddNote extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      nameValid: false,
      formValid: false,
      validationMessage: {
        name: ''
      }
    }
  }

  verifyNameLength(name) {
    this.setState({name}, () => {this.validateName(name)});
  }

  handleNoteSubmit = e => {
    e.preventDefault();
    const { name, selectedFolder, content } = e.target;
    const note = {
      name: name.value,
      folder: selectedFolder.value,
      content: content.value,
      date: new Date()
    }
    console.log(note)
    
    const options = {           
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(note)
    }
    this.setState({ error: null })
    fetch('http://localhost:8000/api/notes', options)
      .then(res => {
        if(!res.ok) {
          throw new Error('Something went wrong, please try again later');
        }
        return res.json();
      })
    .then(data => {
      this.props.addNote(data)
      this.props.history.push('/')
    })
    .catch(err => {
      this.setState({
        error: err.message
      });
    });
  }

  validateName(fieldValue) {
    const fieldErrors = {...this.state.validationMessage};
    let hasError = false;
    fieldValue = fieldValue.trim();
    if(fieldValue.length === 0) {
      fieldErrors.name = 'A note name is required.';
      hasError = true;
    } else {
      fieldErrors.name = '';
      hasError = false;
    }
    this.setState({
      validationMessage: fieldErrors,
      nameValid: !hasError
    }, this.formValid );
  }
formValid() {
  this.setState({
      formValid: this.state.nameValid
  });
}

  render() {
    const folders = this.props.folders
    return (
      <section className='AddNote'>
        <NotefulError>
          <h2>Create a note</h2>
          <NotefulForm onSubmit={this.handleNoteSubmit}>
            <div className='field'>
              <label htmlFor='note-name-input'>
                Name
              </label>
              <input type='text' id='name' name='name' onChange={e => this.verifyNameLength(e.target.value)}/>
              <ValidationError hasError={!this.state.nameVaild} message={this.state.validationMessage.name}/>
            </div>
            <div className='field'>
              <label htmlFor='note-content-input'>
                Content
              </label>
              <textarea type='text' id='content' name='content'/>
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
              <button type='submit' disabled={!this.state.formValid} >
                Add note
              </button>
            </div>
          </NotefulForm>
        </NotefulError>
      </section>
    )
  }
}

export default withRouter(AddNote);