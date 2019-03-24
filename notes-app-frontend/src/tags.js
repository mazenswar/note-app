class Tag {

  static renderTags(note) {
    let ulTag = document.createElement('ul');
    ulTag.id = "tags-ul";
    ulTag.innerHTML += '<h3>Tags</h3>';
    note.tags.forEach(tag => ulTag.innerHTML += `<li class="tags-li">${tag.name}</li>`);
    return ulTag;
  }





}
