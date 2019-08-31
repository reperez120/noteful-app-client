import React from 'react'

const ApiContext =  React.createContext({

  render() {
    console.log('context', this)
    const contextValue = {
    folders: this.folders,
    addFolder: this.addFolder,
    addNote: this.addNote,
    deleteNote: this.deleteNote,
    updateNote: this.updateNote,
    updateFolder:this.updateFolder,
    deleteFolder: this.deleteFolder,
    }
  }

})

export default ApiContext