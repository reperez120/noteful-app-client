import React from 'react';
import AddButton from '../AddButton/AddButton';
import ApiContext from '../ApiContext';
import { findNote } from '../notes-helpers';
import NotefulError from '../NotefulError';
import './NotePageNav.css'

export default class NotePageNav extends React.Component {
  static defaultProps = {
    history: {
      goBack: () => { }
    },
    match: {
      params: {}
    }
  }
  static contextType = ApiContext;

 findFolder = (folders=[], folderId) =>
  folders.find(folder => folder.id === folderId)

  // findNote = (notes=[], noteId) => 
  // notes.find(note => note.id === Number(noteId))



//  findFolder = (folders=[], folderId) => {
  // folders.find(folder => +folder.id === +folderId)
//  }

  render() {
    const notes = []
    const { noteId } = this.props.match.params
    const note = findNote(notes, noteId) || {}
    const folder = this.findFolder(this.context.folders, note.folder)
   
    return (
      <div className='NotePageNav'>
      <NotefulError>
        <AddButton
          tag='button'
          role='link'
          onClick={() => this.props.history.goBack()}
          className='NotePageNav__back-button'
        >
          <br />
          Back
        </AddButton>
        {folder && (
          <h3 className='NotePageNav__folder-name'>
            {folder.name}
          </h3>
        )}
        </NotefulError>
      </div>
    )
  }
}
