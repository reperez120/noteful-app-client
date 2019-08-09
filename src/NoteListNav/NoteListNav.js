import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import AddButton from '../AddButton/AddButton'
import ApiContext from '../ApiContext'
import { countNotesForFolder } from '../notes-helpers'
import EditFolder from'../EditFolder/EditFolder';
import './NoteListNav.css'
import PropTypes from 'prop-types'
import config from '../config'

export default class NoteListNav extends React.Component {
  static defaultProps ={
    folders: [],
    onDeleteFolder: () => {},
    onEditFolder: () => {}
  }
  static contextType = ApiContext;

  handleClickDelete = (folderId, e) => {
    e.preventDefault()

    fetch(`${config.API_ENDPOINT}/api/folders/${folderId}`, {
      method: 'DELETE'
    })
    .then(res => {
      console.log(res)
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

  render() {
    const { folders=[], notes=[] } = this.context
    return (
      <div className='NoteListNav'>
        <ul className='NoteListNav__list'>
          {folders.map(folder =>
            <li key={folder.id}>
              <NavLink
                className='NoteListNav__folder-link'
                to={`/folder/${folder.id}`}
              >
                <span className='NoteListNav__num-notes'>
                  {countNotesForFolder(notes, folder.id)}
                </span>
                {folder.name}
                {/* {folder.notes.length} */}

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
          )}
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
