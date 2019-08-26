import React from 'react';
import { Link } from 'react-router-dom';
import Note from '../Note/Note';
import AddButton from '../AddButton/AddButton';
import { getNotes } from '../notes-helpers';
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

  render() {
    const { folderId } = this.props.match.params
    const { folders=[] } = this.context
    const notes = []
    const getNotes = () => {
      folders.forEach(folder => notes.push(...folder.notes))
      return notes
    }

    getNotes(notes, folders)

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
