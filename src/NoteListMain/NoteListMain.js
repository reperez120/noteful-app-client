import React from 'react';
import { Link } from 'react-router-dom';
import Note from '../Note/Note';
import AddButton from '../AddButton/AddButton';
import ApiContext from '../ApiContext';
import NotefulError from '../NotefulError';
import './NoteListMain.css'

export default class NoteListMain extends React.Component {
  static defaultProps = {
    match: {
      params: {}
    }
  }
  static contextType = ApiContext

getNotes = (folders = []) => {
  let newNotes = []
  if (!folders.length) return folders
    folders.forEach(folder => {
      folder.notes = folder.notes || []
      if (folder.notes.length) {
        folder.notes.forEach(note =>
        { note.folder = folder.id
          newNotes.push(note)  
        }
        )}   
    } 
    )
    return newNotes
}

getNotesForFolder = (folders = [], folderId) => {
  return (!folderId)
    ? this.getNotes(folders)
    : this.getNotes(folders).filter(note => note.folder === +folderId)
}

  render() {
    const { folders=[] } = this.context
    const notes =  this.getNotesForFolder(folders, this.props.match.params.folderId) || []

    return (
      <section className='NoteListMain'>
        <NotefulError>
        <ul> 
          {notes.map(note => 
            <li key={note.id}>
              <Note
                id={note.id}
                name={note.name}
                content={note.content}
                modified={note.date}
              />
            </li>
          )}
        </ul>
        <div className='NoteListMain__button-container'>
          <AddButton
            tag={Link}
            to='/add-note'
            type='button'
            className='NoteListMain__add-note-button'
          >
          Add Note
            <br />
          </AddButton>      
        </div>
        </NotefulError>
      </section>
    )
  }
}
