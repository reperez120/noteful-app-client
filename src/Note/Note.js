import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import ApiContext from '../ApiContext';
import config from '../config';
import PropTypes from 'prop-types';
import './Note.css'

export default class Note extends React.Component {
  static defaultProps = {
    folders: [],
    notes: []
  }

  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.object,
    }),
    history: PropTypes.shape({
      push: PropTypes.func,
    }).isRequired,
  };

  static contextType = ApiContext;

  handleClickDelete = (noteId, e) => {
    e.preventDefault()
  
    fetch(`${config.API_ENDPOINT}/api/notes/${noteId}`, {
      method: 'DELETE'
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(e => Promise.reject(e))
        // return res
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

    return (
      <div className='Note'>
        <h2 className='Note__title'>
          <Link to={`/note/${id}`}>
            {name}
          </Link>
        </h2>
        <div className="folderButtons">
        <button
          className='Note__delete'
          type='button'
          onClick={this.handleClickDelete.bind(null, id)}
        >
          {' '}
          remove
        </button>
        <div className='editNote'>
           <Link to=
           {`/notes/${id}/edit`}>
             edit
           </Link>
        </div>
        </div>
        <div className='Note__dates'>
          <div className='Note__dates-modified'>
            modified:
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

