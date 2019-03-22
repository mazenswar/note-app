class NoteAdapter {

  static getAllNotes() {
    return fetch('http://localhost:3000/api/v1/notes').then(r => r.json())
  }

  static addNewNote(newNoteTitle, newNoteContent) {
    return fetch('http://localhost:3000/api/v1/notes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({title: newNoteTitle, content: newNoteContent })
    }).then(r => r.json())
  }

  static deleteNote(id) {
    return fetch(`http://localhost:3000/api/v1/notes/${id}`, { method: 'DELETE'} )
  }

  static patchNote(noteId, noteTitle, noteContent) {
      if (noteTitle === "") {
        const note = Note.findNote(noteId)
        noteTitle = note.title;
      }
      return fetch(`http://localhost:3000/api/v1/notes/${noteId}`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify({title: noteTitle, content: noteContent})
      }).then( r => r.json() )

  }


/////
}
