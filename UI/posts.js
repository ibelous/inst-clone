class PostModel {
  constructor(posts) {
    this.restoreFromLocalStorage();
    this._photoPosts = posts;
    if (this._isAuth == null) {
      this._isAuth = false;
      this._username = null;
      this._saveStatus();
    }
  }

  restoreFromLocalStorage() {
    try {
      const isAuth = localStorage.getItem('isAuth');
      const username = localStorage.getItem('username');
      this._isAuth = JSON.parse(isAuth);
      this._username = JSON.parse(username);
    } catch (e) {
      this._isAuth = null;
      this._username = null;
    }
  }

  _saveStatus() {
    const status = JSON.stringify(this._isAuth);
    const username = JSON.stringify(this._username);
    localStorage.setItem('isAuth', status);
    localStorage.setItem('username', username);
  }

  addAll(posts) {
    const notValid = [];
    posts.forEach((post) => {
      if (this.addPhotoPost(post) === false) {
        notValid.push(post);
      }
    });
    return notValid;
  }

  getName() {
    return this._username;
  }

  toggleAuth() {
    this._isAuth = !this._isAuth;
    if (!this._isAuth) {
      this._username = null;
    }
    this._saveStatus();
    return this._isAuth;
  }

  isAuthorized() {
    return this._isAuth;
  }

  setName(username) {
    this._username = username;
  }

  getPhotoPosts(skip = 0, count = 10, filterConfig = PostModel._DEFAULT_FILTER_CONFIG) {
    const filtratedPosts = this._photoPosts.filter(
      post => post.createdAt.getTime() >= filterConfig.dateFrom.getTime()
        && post.createdAt.getTime() <= filterConfig.dateTo.getTime()
        && (post.author === filterConfig.authorName
          || filterConfig.authorName === ''),
    ).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    const result = [];
    let number = 0;
    for (let i = skip; number < count && i < filtratedPosts.length; i += 1) {
      result.push(filtratedPosts[i]);
      number += 1;
    }
    return result;
  }

  getPostIndex(id) {
    return this.getPhotoPosts().findIndex(post => post.id === id);
  }

  getPhotoPost(id) {
    let result;
    this._photoPosts.forEach((item) => {
      if (item.id === id) {
        result = item;
      }
    });
    if (result !== undefined) {
      return result;
    }
    return result;
  }

  _validateChangeableFields(post) {
    if (!post.hasOwnProperty('description') || post.description.length >= 200 || typeof post.description !== 'string'
      || !post.hasOwnProperty('photoLink') || typeof post.photoLink !== 'string' || post.photoLink === '') {
      return false;
    }
    return true;
  }

  getPostsCount(config = PostModel._DEFAULT_FILTER_CONFIG) {
    return this.getPhotoPosts(0, this._photoPosts.length, config).length;
  }

  _validateUnChangeableFields(post) {
    if (!post.hasOwnProperty('id') || typeof post.id !== 'string'
      || !post.hasOwnProperty('createdAt')
      || !post.hasOwnProperty('author') || typeof post.author !== 'string' || post.author === '') {
      return false;
    }
    return true;
  }

  _validatePhotoPost(post) {
    if (this._validateUnChangeableFields(post) === false
      || this._validateChangeableFields(post) === false) {
      return false;
    }
    return true;
  }

  addPhotoPost(post) {
    if (this._validatePhotoPost(post) === true) {
      this._photoPosts.push(post);
      return true;
    }
    return false;
  }

  removePhotoPost(id) {
    let index = -1;
    this._photoPosts.forEach((item, i) => {
      if (item.id === id) {
        index = i;
      }
    });
    if (index !== -1) {
      this._photoPosts.splice(index, 1);
      return true;
    }
    return false;
  }

  editPhotoPost(id, edits) {
    const post = this.getPhotoPost(id);
    if (post !== undefined) {
      const postCopy = Object.assign(post);
      const fields = Object.keys(edits);
      for (let i = 0; i < fields.length; i += 1) {
        if (fields[i] !== 'id' && fields[i] !== 'author' && fields[i] !== 'createdAt' && fields[i] !== 'likes') {
          postCopy[fields[i]] = edits[fields[i]];
        }
      }
      if (this._validateChangeableFields(postCopy) === true) {
        this.removePhotoPost(id);
        this.addPhotoPost(postCopy);
        return true;
      }
      return false;
    }
    return false;
  }
}

PostModel._DEFAULT_FILTER_CONFIG = {
  dateFrom: new Date(-8640000000000000),
  dateTo: new Date(8640000000000000),
  authorName: '',
  hashtags: [],
};

class View {
  constructor() {
    this._postTemplate = document.querySelector('.post-template');
    this._main = document.querySelector('.main');
  }

  showPosts(posts, countSuitablePosts) {
    posts.map(this._buildPost.bind(this))
      .forEach(post => this._main.appendChild(post));
    const currentPostCount = this._main.querySelectorAll('.post-container').length;
    const loadMoreButton = document.querySelector('.load');
    if (currentPostCount < 10 || currentPostCount === countSuitablePosts) {
      loadMoreButton.setAttribute('hidden', 'true');
    } else if (loadMoreButton.hasAttribute('hidden')) {
      loadMoreButton.removeAttribute('hidden');
    }
  }

  static showAdd() {
    document.querySelector('main').classList.toggle('hidden');
    document.querySelector('.add-post-container').classList.toggle('hidden');
  }

  static showEdit() {
    document.querySelector('main').classList.toggle('hidden');
    document.querySelector('.edit-post-container').classList.toggle('hidden');
  }

  removePost(id) {
    const post = this._main.querySelector(`.post-container[data-id="${id}"]`);
    this._main.removeChild(post);
  }

  editPost(editedPost) {
    const lastPost = this._main.querySelector(`.post-container[data-id="${editedPost.id}"]`);
    this._main.replaceChild(this._buildPost(editedPost), lastPost);
  }

  addPost(post, index) {
    const posts = this._main.querySelectorAll('.post-container');
    this._main.insertBefore(this._buildPost(post), posts[index]);
  }

  /*toggleLike(event, target) {
    if (target.)
  }*/

  _buildPost(post) {
    const fragment = document.importNode(this._postTemplate.content, true);
    const key = fragment.querySelector('.post-container').getAttribute('data-id');
    fragment.querySelector('.post-container').setAttribute('data-id', post[key]);
    fragment.querySelector('.photos').setAttribute('src', post.photoLink);
    fragment.querySelector('.author').textContent = `${post.createdAt.toLocaleString()}, ${post.author}`;
    fragment.querySelector('.description').textContent = post.description;
    return fragment;
  }

  static showElementsIfAuthorized(isAuthorized, username) {
    const login = document.querySelector('.login');
    const buttons = document.querySelectorAll('.button');
    if (isAuthorized === true) {
      document.querySelector('.username').innerHTML = username;
      buttons.forEach(button => button.classList.remove('hidden'));
      login.classList.add('hidden');
    } else {
      document.querySelector('.username').innerHTML = '';
      buttons.forEach(button => button.classList.add('hidden'));
      document.querySelector('.login').classList.remove('hidden');
    }
  }
}
