const notesUlTag = document.querySelector('ul#notes');
const notesUlWrapper = document.querySelector('.notes-ul-wrapper')
const saveButton = document.querySelector('button#save-button')
const newNoteDiv = document.querySelector('form.new-note-wrapper');
const noteContentDiv = document.querySelector('.note-content-wrapper');

//--------------------------- helper methods -----------------------//

//////////////////// default placeholder text /////////////////////////

const placeholderHTML = `<h3 id="note-content-placeholder">Click on a note from the sidebar or press the button to create a new note</h3>
<button type="button" id="new-note-button" name="new-note-button">+</button>`

//////////////////  GET AND RENDER ALL NOTES //////////////////////
const getNotes = () => {
  NoteAdapter.getAllNotes().then( allNotesarr => {
    Note.createNoteObjects(allNotesarr);
    Note.appendAllNotes(notesUlTag);
  });
}
//////////////////  CREATE AND RENDER A NEW NOTE //////////////////////
const addNote = (newNoteTitle, newNoteContent) => {
  NoteAdapter.addNewNote(newNoteTitle, newNoteContent).then(note => {
    let newNote = new Note(note.id, note.title, note.content);
    notesUlTag.append(newNote.renderNoteLI());
  })
}
//--------------------------- End helper methods -----------------------//


//--------------------------- Event Listeners -----------------------//

/////////////////////// display note contents && new note form && sort note LIs ///////////////////////////////

notesUlWrapper.addEventListener('click', (e) => {
  if(e.target.className === 'notes-li') {
    const noteId = Number(e.target.dataset.id);
    let noteObj = Note.findNote(noteId)
    noteObj.renderNoteContent();
  } else if (e.target.id === "sort-alpha") {
    notesUlTag.innerHTML = '';
    let sorted = Note.sortAplha();
    sorted.forEach(note => notesUlTag.append(note.renderNoteLI()) );
  }
})

////////////////////// create new note ///////////////////////

noteContentDiv.addEventListener('submit', (e) => {
  e.preventDefault();
    const newNoteTitle = e.target.parentElement.querySelector('#new-note-title').value;
    const newNoteContent = e.target.parentElement.querySelector('#new-note-content').value;
    addNote(newNoteTitle, newNoteContent);
    e.target.parentElement.querySelector('#new-note-title').value = "";
    e.target.parentElement.querySelector('#new-note-content').value = "";
})

//////////////////////////////   Edit and Delete Note   /////////////////////////

noteContentDiv.addEventListener('click', (e) => {
  const note = e.target.parentElement;
  const noteId = e.target.dataset.id;
  const noteObj = Note.findNote(noteId);

  if(e.target.id === "edit-button") {
    e.preventDefault();
    const noteTitle = e.target.parentElement.querySelector('h1').innerText
    const noteContent = e.target.parentElement.querySelector('p').innerText
    note.innerHTML = noteObj.renderEditForm();

  } else if (e.target.id === "delete-button") {
    NoteAdapter.deleteNote(noteId).then(response => {
      if (response.ok) {
        note.innerHTML = placeholderHTML;
        const listItem = notesUlTag.querySelector(`[data-id~="${noteId}"]`);
        listItem.remove();
        Note.deleteNoteObj(noteId);
      }
    })
  } else if (e.target.id === "new-note-button") {
    noteContentDiv.innerHTML = Note.newNoteForm();
  }
})

/////////////////////////////////// save changes ////////////////////////////

noteContentDiv.addEventListener('click', (e) => {
  if (e.target.id === "save-changes") {

      const noteId = Number(e.target.nextElementSibling.dataset.id);
      const noteLi = document.querySelector(`li[data-id~="${noteId}"]`);
      const noteObj = Note.findNote(noteId);
      const newNoteTitle = e.target.parentElement.querySelector('#edit-note-title').value;
      const newNoteContent = e.target.parentElement.querySelector('#edit-note-content').value;
      if (newNoteContent != noteObj.content || newNoteTitle != "") {
        NoteAdapter.patchNote(noteId, newNoteTitle, newNoteContent).then(response => {
            let noteToUpdate = Note.findNote(noteId)
            noteToUpdate.title = response.title;
            noteToUpdate.content = response.content;
            const updatedNote = noteToUpdate;
            updatedNote.renderNoteContent()
            noteLi.innerText = noteObj.title;
        });
      } else {
        alert('no changes were made to the note');
      }
  }

})

/////////////////////// escape //////////////////

document.querySelector('#escape').addEventListener('click', (e) =>{
  noteContentDiv.innerHTML = placeholderHTML;
})


///////////////////// search ///////////////////

document.querySelector('#search-bar').addEventListener('keyup', (e) => {
  // debugger
  let seachList = Note.dynamicSearch(e.target.value)
  notesUlTag.innerHTML = "";
  seachList.forEach(item => {
    notesUlTag.append(item.renderNoteLI() );
  })
})





//--------------------------- End Event Listeners -----------------------//

////////////////////////////// DOM CONTENT LOADED //////////////////////////////////

document.addEventListener('DOMContentLoaded', () => {
  getNotes();
})
