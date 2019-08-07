import React from 'react';
import Note from '../Note/Note';
import ApiContext from '../ApiContext';
import { findNote } from '../notes-helpers';
import NotefulError from '../NotefulError';
import './NotePageMain.css'

export default class NotePageMain extends React.Component {
  constructor(props){
    super(props)
  }

  static defaultProps = {
    match: {
      params: {}
    }
  }
  static contextType = ApiContext

  render() {
    const { notes=[] } = this.context
    console.log(notes, this.props)
    const { noteId } = this.props.match.params
    const note = findNote(notes, noteId) || { content: '' }
    console.log(note)
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