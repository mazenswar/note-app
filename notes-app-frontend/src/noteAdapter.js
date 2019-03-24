class NoteAdapter {

  static getAllNotes() {
    return fetch('http://localhost:3000/api/v1/notes').then(r => r.json())
  }

  static addNewNote(newNoteTitle, newNoteTags, newNoteContent) {
    return fetch('http://localhost:3000/api/v1/notes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({title: newNoteTitle, content: newNoteContent, tags: newNoteTags})
    }).then(r => r.json())
  }

  static deleteNote(id) {
    return fetch(`http://localhost:3000/api/v1/notes/${id}`, { method: 'DELETE'} )
  }

  static patchNote(noteId, noteTitle, noteTags, noteContent) {
      const note = Note.findNote(noteId)
      if (noteTitle === "") {
        noteTitle = note.title;
      } else if (noteTags === "") {
        noteTags = note.tags;
      }
      return fetch(`http://localhost:3000/api/v1/notes/${noteId}`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify({title: noteTitle, content: noteContent, tags: noteTags})
      }).then( r => r.json() )

  }


/////
}
