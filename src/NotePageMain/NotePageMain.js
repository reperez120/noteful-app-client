import React from 'react';
import Note from '../Note/Note';
import ApiContext from '../ApiContext';
import NotefulError from '../NotefulError';
import './NotePageMain.css';

export default class NotePageMain extends React.Component {
  static defaultProps = {
    match: {
      params: {}
    }
  }
  static contextType = ApiContext

  render() {
    const { folders=[] } = this.context
    const  noteId  = this.props.match.params.noteId

    function getNote(id) {
      id = Number(id)
      let n
      folders.find(folder => 
        folder.notes.find(note => {
          if (note.id === id) n = note
          return n
        })
      )
      return n
    }
    const note =  getNote(noteId) || {}
 
    return (
      <section className='NotePageMain'>
        <NotefulError>
        <Note
          id={note.id}
          name={note.name}
          content={note.content}
          modified={note.date}
        />
        </NotefulError>
      </section>
    )
  }
}