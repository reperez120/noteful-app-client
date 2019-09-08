import React, {Component} from 'react';
import {Route, Link} from 'react-router-dom';
import {withRouter} from 'react-router-dom';
import NoteListNav from '../NoteListNav/NoteListNav';
import NotePageNav from '../NotePageNav/NotePageNav';
import NoteListMain from '../NoteListMain/NoteListMain';
import NotePageMain from '../NotePageMain/NotePageMain';
import AddFolder from '../AddFolder/AddFolder';
import AddNote from '../AddNote/AddNote';
import EditNote from '../EditNote/EditNote';
import EditFolder from '../EditFolder/EditFolder';
import ApiContext from '../ApiContext';
import config from '../config';
import './App.css'

class App extends Component {

    state = {
        folders: []
    }

    addFolder = folder => {
        this.setState({ 
            folders: [ ...this.state.folders, folder 
        ]})
    }

    mergeFoldersAndNotes = (folders, notes) => {
        notes.forEach((note) => {
          const index = folders.findIndex(f => f.id === note.folder) 
          if (!folders[index].notes) {
            folders[index].notes = []
          }
          folders[index].notes.push({ 
            id: note.id, 
            name: note.name,
            content: note.content,
            date: note.date
          })
          })
        return folders
    };
 
    addNote = (folders, note) => {
        let copy = [...folders]
        const i = this.state.folders.findIndex(folder => {
           return folder.id ===  +note.folder
        })
        copy[i].notes.push(note) 
        this.setState({
            folders: copy
        })
    }
     
    handleDeleteNote = id => {
        const newFolders = this.state.folders.map(folder => {
          folder.notes = folder.notes.filter(note => note.id !== id)
          return folder
        })
        this.setState({ folders: newFolders })
      }

    handleDeleteFolder = folderId => {
        this.setState({
            folders: this.state.folders.filter(folder => folder.id !== folderId)
        });
    };

    componentDidMount() {
        Promise.all([
            fetch(`${config.API_ENDPOINT}/api/notes`),
            fetch(`${config.API_ENDPOINT}/api/folders`)
        ])
            .then(([notesRes, foldersRes]) => {
               
                if (!notesRes.ok)
                    return notesRes.json().then(e => Promise.reject(e));
                if (!foldersRes.ok)
                    return foldersRes.json().then(e => Promise.reject(e));
                    
                return Promise.all([notesRes.json(), foldersRes.json()]);
            })
            .then(([notes, folders]) => {
               const data = this.mergeFoldersAndNotes(folders, notes)
                this.setState({folders: data})
            })
            .catch(error => {
                console.error({error});
            });
    };

    updateFolder = updatedFolder => {
        const newFolders = this.state.folders.map(folder =>
          (folder.id === updatedFolder.id)
            ? updatedFolder
            : folder
        )
        this.setState({
        folders: newFolders
        })
    };

    updateNote = editedNote => {
        const folderIndex = this.state.folders.findIndex(folder => folder.id === +editedNote.folder)
        const folder = this.state.folders[folderIndex]
        const noteIndex = folder.notes.findIndex(n => n.id === editedNote.id)
        let note = folder.notes[noteIndex]
        let newNote = { ...note, ...editedNote }
        folder.notes.push(newNote)
        const newFolders = [
            ...this.state.folders.slice(0, folderIndex),
            folder,
            ...this.state.folders.slice(folderIndex + 1)
        ]
        this.setState({
           folders: newFolders
        })
    }

    renderNavRoutes() {
        return (
            <>
                {['/', '/folder/:folderId'].map(path => (
                    <Route
                        exact
                        key={path}
                        path={path}
                        component={NoteListNav}
                    />
                ))}
                <Route path="/note/:noteId" component={NotePageNav}/>
                <Route path="/add-folder" component={NotePageNav}/>
                <Route path="/add-note" component={NotePageNav}/>
            </>
        );
    }

    renderMainRoutes() {
        const notes  = this.state.folders.notes
        return (

            <>
               {['/', '/folder/:folderId'].map(path => (
                    <Route
                        exact
                        key={path}
                        path={path}
                        component={NoteListMain}
                    />
                ))} 
                <Route path='/note/:noteId'component={NotePageMain}/>
                <Route path='/add-folder' component={AddFolder}/>
                <Route path='/add-note'component={AddNote}/>
                <Route path='/folders/:folderId/edit' component={EditFolder}/> 
                <Route path='/notes/:noteId/edit' component={EditNote}/> 
            </>
            
        );
    }

    render() {
        const value = {
        folders: this.state.folders,
        notes: this.notes,
        deleteNote: this.handleDeleteNote,
        deleteFolder: this.handleDeleteFolder,
        addNote: this.addNote,
        addFolder: this.addFolder,
        updateFolder: this.updateFolder,
        updateNote: this.updateNote,
        };   

        return (
            <ApiContext.Provider value={value}>
                <div className="App">
                    <nav className="App__nav">{this.renderNavRoutes()}</nav>
                    <header className="App__header">
                        <h1>
                            <Link to="/">Noteful</Link>{' '}
                        </h1>
                    </header>
                    <main className="App__main">{this.renderMainRoutes()}</main>
                </div>
            </ApiContext.Provider>
        );
    }
}

export default withRouter(App)
