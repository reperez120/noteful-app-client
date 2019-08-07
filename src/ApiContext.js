import React from 'react'

export default React.createContext({

  // updateArticle = updatedArticle => {
  //      const newArticles = this.state.articles.map(art =>
  //        (art.id === updatedArticle.id)
  //          ? updatedArticle
  //          : art
  //      )
  //      this.setState({
  //       articles: newArticles
  //      })
  //   };

render() {
  const contextvalue = {
  folders: [],
  notes: [],
  addFolder: () => {},
  addNote: () => {},
  deleteNote: () => {},
  updateNote: () => {},
  updateFolder: () => {},
  deleteFolder: () => {}
  }
}
})