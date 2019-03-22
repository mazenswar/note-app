class Tag {

  static renderTags(note) {
    let ulTag = document.createElement('ul');
    ulTag.id = "tags-ul";
    note.tags.forEach(tag => ulTag.innerHTML += `<li class="tags-li">${tag.name}</li>`);
    return ulTag;
  }
}
