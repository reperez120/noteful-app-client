import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import AddButton from '../AddButton/AddButton'
import ApiContext from '../ApiContext'
import './NoteListNav.css'
import PropTypes from 'prop-types'
import config from '../config';

export default class NoteListNav extends React.Component {
  static defaultProps = {
    folders: []
  }
  static contextType = ApiContext;

  state = {
    noteLength: null
  }

  handleClickDelete = (folderId, e) => {
    e.preventDefault()

    fetch(`${config.API_ENDPOINT}/api/folders/${folderId}`, {
      method: 'DELETE'
    })
    .then(res => {
      if (!res.ok)
        return res.json().then(e => Promise.reject(e))
      return res
    })
    .then(() => {
      this.context.deleteFolder(folderId)
    })
    .catch(error => {
      console.error({ error })
    })
  }

  countNotes = (folders) => {
    if (!folders.length) return folders
     folders.forEach(folder => {
       folder.notes = folder.notes || []
       if (folder.notes.length) {
          let length = folder.notes.length
          return length
       }
    })
  }

  render() {
    const { folders={}} = this.context
    this.countNotes(folders)
    
    return (
      <div className='NoteListNav'>
        <ul className='NoteListNav__list'>
          {(folders.map(folder =>
            <li key={folder.id}>
            <NavLink
                className='NoteListNav__folder-link'
                to={`/folder/${folder.id}`}>
                <span className='NoteListNav__num-notes'>
                {this.countNotes(folders)}
                {folder.notes.length}
                </span>
                {folder.name}
                <span className="Content">
              </span>      
              <div className='buttons'>
                <button
            className='Folder_delete'
            type='button'
            onClick={this.handleClickDelete.bind(null, folder.id)}
          >
          remove
          </button>
          <div className='editFolder'>
          <Link to=
          {`/folders/${folder.id}/edit`}>
          edit
          </Link>
          </div>
          </div>
          </NavLink>
            </li>
          ))}
        </ul>
        <div className='NoteListNav__button-wrapper'>
          <AddButton
            tag={Link}
            to='/add-folder'
            type='button'
            className='NoteListNav__add-folder-button'
          >
           Add Folder
            <br />
          </AddButton>
        </div>
      </div>
    )
  }
}

NoteListNav.propTypes = {
  folder: PropTypes.objectOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })) 
};
