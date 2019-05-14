class AEcontroller {
  static addPostToModel() {
    const post = {};
    post.author = document.querySelector('.username').innerHTML;
    const dateTimeStr = Date();
    post.createdAt = new Date(dateTimeStr);
    post.description = document.querySelector('#desc').value;
    post.photoLink = document.querySelector('#uploadButton').value;
    post.likes = [];
    post.id = (control.getPostsCount() + 1).toString();
    control.addPhotoPost(post);
    Controller.showAdd();
  }

  static editPostInModel(id) {
    const edits = {};
    edits.description = document.querySelector('.edit-post-desc-input').value;
    control.editPhotoPost(id, edits);
    Controller.showEdit();
  }
}

class AEscript {
  constructor() {
    const AddButton = document.querySelector('.add-post');
    AddButton.addEventListener('click', Controller.showAdd);
    const add = document.querySelector('.add-post-add-button');
    add.addEventListener('click', AEcontroller.addPostToModel);
    const EditButton = document.querySelector('.edit');
    EditButton.addEventListener('click', Controller.showEdit);
    const edit = document.querySelector('.edit-post-add-button');
    edit.addEventListener('click', AEcontroller.editPostInModel);
  }
}

const Add = new AEscript();