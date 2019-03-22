class Note {
  constructor(id, title, content, tags) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.tags = tags;
    Note.all.push(this);
  }

  static newNoteForm() {
    return `
    <form class="new-note-wrapper">
      <input type="submit" id="save-button" name="save-note"></input>
      <input required id="new-note-title" type="text" name="note-title" placeholder="Note Title">
      <textarea required id="new-note-content" name="note-content" placeholder="Note Content" rows="30" cols="80"></textarea>
    </form>`
  }

  static findNote(id) {
    return Note.all.find(note => note.id === Number(id));
  }

  static deleteNoteObj(id) {
    let noteToDelete = Note.findNote(id);
    let i = Note.all.indexOf(noteToDelete);
    Note.all.splice(i, 1);
  }

  renderNoteLI() {
   let li = document.createElement('li');
   li.className = "notes-li"
   li.innerText = this.title;
   li.dataset.id = this.id;
   return li;
  }

  renderNoteContent() {
    let noteTag = `
    <button id="edit-button" data-id="${this.id}" type="button" name="edit">Edit</button>
    <button id="delete-button" data-id="${this.id}" type="button" name="delete">Delete</button>
    <h1>${this.title}</h1>
    <p>${this.content}</p>
    `
    document.querySelector('.note-content-wrapper').innerHTML = noteTag;
    if (this.tags.length > 0) {
      document.querySelector('.note-content-wrapper').prepend(Tag.renderTags(this));
    }

  }

  renderEditForm() {
    return `
    <button id="save-changes">Save</button>
    <div data-id="${this.id}" id="edit-note-form">
      <label for="edit-note-title">Title</label>
      <input type="text" id="edit-note-title" name="edit-note-title" placeholder="${this.title}"></input>
      <label for="edit-note-content">Content</label>
      <textarea id="edit-note-content" name="edit-note-content" rows="30" cols="80">${this.content}</textarea>
    </div>
    `
  }

  static sortAplha() {
    function compare(a,b) {
      const titleA = a.title.toLowerCase();
      const titleB = b.title.toLowerCase();
      if (titleA > titleB) {
        return 1;
      } else if (titleA < titleB) {
        return -1;
      } else {
        return 0;
      }
    }
    let allNotes = [...Note.all];
    return allNotes.sort(compare);
  }

  static createNoteObjects(allNotesarr){
    allNotesarr.map(note => {
      return new Note(note.id, note.title, note.content, note.tags);
    })
  }

  static appendAllNotes(notesUlTag) {
    Note.all.forEach(note => notesUlTag.append(note.renderNoteLI()) );
  }

  static dynamicSearch(value) {
    let searchList = []
    let sanitizedValue = value.toLowerCase()
    Note.all.forEach( note => {
      if (note.title.toLowerCase().search(sanitizedValue) > -1) {
        searchList.push(note);
      }
    })
    return searchList;
  }


////////
}

Note.all = []
