import React from 'react'

const ApiContext =  React.createContext({

  render() {
    const contextValue = {
    folders: this.state.folders,
    notes: [],
    addFolder: this.addFolder,
    addNote: this.addNote,
    deleteNote: this.deleteNote,
    updateNote: this.updateNote,
    updateFolder:this.updateFolder,
    deleteFolder: this.deleteFolder
    }
  }

})

export default ApiContext