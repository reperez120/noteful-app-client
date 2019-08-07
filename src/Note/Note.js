import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import ApiContext from '../ApiContext';
import EditNote from '../EditNote/EditNote';
import config from '../config';
import PropTypes from 'prop-types';
import './Note.css'

export default class Note extends React.Component {
  static defaultProps ={
    folders: [],
    onDeleteNote: () => {},
    notes: []
  }
  static contextType = ApiContext;

  handleClickDelete = e => {
    e.preventDefault()
    const noteId = this.props.id

    fetch(`${config.API_ENDPOINT}/api/notes/${noteId}`, {
      method: 'DELETE'
    })
      .then(res => {
        console.log(res)
        if (!res.ok)
          return res.json().then(e => Promise.reject(e))
        return res
      })
      .then(() => {
        this.context.deleteNote(noteId)
      })
      .catch(error => {
        console.error({ error })
      })
  }


  render() {
    const { name, id, content, modified } = this.props
    console.log(this.props)
    return (
      <div className='Note'>
        <h2 className='Note__title'>
          <Link to={`/note/${id}`}>
            {name}
          </Link>
        </h2>
        <button
          className='Note__delete'
          type='button'
          onClick={this.handleClickDelete}
        >
          {' '}
          remove
        </button>
           <Link to=
           {`/edit/:noteId`}>
             Edit Note
           </Link>
        <div className='Note__dates'>
          <div className='Note__dates-modified'>
            Modified
            {' '}
            <span className='Date'>
              {format(modified, 'YYYY MMM Do')}
            </span>
          </div>
        </div>
          <div className='NotePageMain__content'>
          </div> 
          <p>{(content || '').replace(/\n\n/g, '</p> <p>').replace(/\n/g, '<br />')}</p>
      </div>
      
    )
  }
}

Note.propTypes = {
  note: PropTypes.objectOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    modified: PropTypes.number.isRequired,
  })) 
};

