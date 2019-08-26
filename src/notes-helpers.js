
// export const findFolder = (folders=[], folderId) =>
//   folders.find(folder => folder.id === folderId)

export const findNote = (notes=[], noteId) => 
  notes.find(note => note.id === Number(noteId))

// export const getNotes = () => {
//     folders.forEach(folder => notes.push(...folder.notes))
//     return notes
// }

export const countNotesForFolder = (notes=[], folderId) =>
  notes.filter(note => note.folderId === folderId).length

export const countNotes = (folders, notes) => {
  return folders.map(folder => {
  // return folder.notes.length
  })
}

