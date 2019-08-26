
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
        console.log('addFolder started')
        this.setState({ 
            folders: [ ...this.state.folders, folder 
        ]})
        console.log('addFolder completed')
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
      }

    addNote = (folders, note) => {
        console.log('addNote started')
        let addNewNote = (folders, note) => {
            const i = this.state.folders.findIndex(folder => folder.id === note.folderId)
            folders[i].notes.push(note)
            console.log(i)
            return folders
            console.log(folders)
        }
        console.log(addNewNote())
        console.log('addNote ran')
        const newFolders = addNewNote(folders, note) 
        console.log(addNewNote())
        console.log('new folders', newFolders) 
        this.setState({ 
            folders: newFolders
        })
        console.log('addNote completed')
     }
     
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

    handleDeleteNote = id => {
        console.log('deleteNote started')
        return this.state.folders.map(folder => {
          folder.notes = folder.notes.filter(note => note.id !== id)
          console.log(folder)
          return folder
          this.setState({ folders: folder})
          console.log(this.state)
        })
        console.log('deleteNote completed')
      }

    handleDeleteFolder = folderId => {
        this.setState({
            folders: this.state.folders.filter(folder => folder.id !== folderId)
        });
        console.log('deleteFolder ran')
    };

    getNotes = (folders, notes) => {
        this.state.folders.forEach((folder) => {
        let notes = `${folder.notes}`
        this.setState ({
            notes: notes
        })  
      })
    }

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
                this.setState({folders: data});
            })
            .catch(error => {
                console.error({error});
            });
    };

    updateNote = editedNote  => {
        const newNotes = this.state.map(note =>
            (note.id === editedNote.id)
            ? editedNote
            : note
            )
        this.setState({
            notes: newNotes
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
                <Route path="/note/:noteId" component={NotePageNav} />
                <Route path="/add-folder" component={NotePageNav} />
                <Route path="/add-note" component={NotePageNav}
                 />
                <Route path="/folder/:folderId" component={NotePageNav} />
            </>
        );
    }

    renderMainRoutes() {
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
                <Route path='/note/:noteId'component={NotePageMain} />
                <Route path='/add-folder' component={AddFolder} />
                <Route path='/add-note'component={AddNote} />
                <Route path='/folders/:folderId/edit' component={EditFolder} /> 
                <Route path='/notes/:noteId/edit' component={EditNote} /> 
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
        getNotes: this.getNotes
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
