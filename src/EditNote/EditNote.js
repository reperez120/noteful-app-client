import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './EditNote.css';
import ApiContext from '../ApiContext';
import config from '../config';
 
export default class EditNote extends Component {
    
    static propTypes = {
        match: PropTypes.shape({
          params: PropTypes.object,
        }),
        history: PropTypes.shape({
          push: PropTypes.func,
        }).isRequired,
      };

    static contextType = ApiContext

   state = {
       error: null,
       id: "",
       name: "",
       content: "",
       folder: ""
    }
 
   static contextType = ApiContext
 
   componentDidMount() {
 
    const noteId  = this.props.match.params.noteId

   fetch(`${config.API_ENDPOINT}/api/notes/${noteId}`, { method: 'GET'})
       .then(res => {
       if(!res.ok) {
           throw new Error('Something went wrong, please try again later');
       }
       return res.json();
       }) 
    .then(data => {
        this.setState({
            id: data.id,
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
 
   handleNameChange = e => {
       this.setState({ name: e.target.value })
    };
 
   handleContentChange = e => {
       this.setState({ content: e.target.value })
   };
 
   handleFolderChange = e => {
       this.setState({ folder: e.target.value })
     };

   handleSubmit = e => {
       e.preventDefault()
       const noteName = e.target.name.value
       const noteContent = e.target.content.value
     
       this.setState ({
          name: noteName,
          content: noteContent,
       })
       const noteId = this.props.match.params.noteId
       const { id, name, content, folder } = this.state
       const newNote = { id, name, content, folder }
       
       const url = `${config.API_ENDPOINT}/${noteId}`
       const options = {
           method: 'PATCH',
            headers: {
               'content-type': 'application/json'
           },
           body: JSON.stringify(newNote)
       }
       fetch(url, options)
       .then(res => {
       if(!res.ok) {
           throw new Error('Something went wrong, please try again later');
       }
       }) 
       .then(() => {
           this.context.updateNote(newNote)
           this.props.history.push('/')
       })
        .catch(err => {
            this.setState({
                error: err.message
            });
       })
}

render() {
   const { name, content, folder  } = this.state
   const folders = this.context.folders
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
                   onChange={this.handleNameChange}
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
             defaultValue={content}
             onChange={this.handleContentChange}/>
           </div>
           <div className='field'>
             <label htmlFor='note-folder-select'>
               Folder
             </label>
             <select id='selectedFolder' name='selectedFolder' defaultValue={folder} onChange={this.handleFolderChange} >
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
               Edit note
               </button>
           </div>
       </form>
     </section>
   )
 }
}

