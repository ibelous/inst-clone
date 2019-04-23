class PostModel {
  constructor(posts) {
    this._photoPosts = posts;
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

  getPhotoPosts(skip = 0, count = 10, filterConfig = PostModel._DEFAULT_FILTER) {
    const filtratedPosts = this._photoPosts.filter(
      post => post.createdAt.getTime() >= filterConfig.dateFrom.getTime()
        && post.createdAt.getTime() <= filterConfig.dateTo.getTime()
        && (post.author === filterConfig.authorName
          || filterConfig.authorName === '')
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

PostModel._DEFAULT_FILTER = {
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

  showPosts(posts) {
    while (this._main.hasChildNodes() === true) {
      this._main.removeChild(this._main.firstChild);
    }
    this._main.appendChild(this._postTemplate);
    posts.map(this._buildPost.bind(this))
      .forEach(post => this._main.appendChild(post));
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

  _buildPost(post) {
    const fragment = document.importNode(this._postTemplate.content, true);
    const key = fragment.querySelector('.post-container').getAttribute('data-id');
    fragment.querySelector('.post-container').setAttribute('data-id', post[key]);
    fragment.querySelector('.photos').setAttribute('src', post.photoLink);
    fragment.querySelector('.author').textContent = `${post.createdAt.toLocaleString()}, ${post.author}`;
    fragment.querySelector('.description').textContent = post.description;
    return fragment;
  }

  static showElementsIfAuthorized(isAuthorized) {
    const links = document.querySelectorAll('.post-container__links');
    if (isAuthorized === true) {
      /* Header buttons and name. */
      document.querySelector('.header__logInfo').innerHTML = 'ibelous';
      const buttons = document.querySelector('.header__buttons');
      const button2 = buttons.querySelector('.header__button');
      const button1 = document.createElement('button');
      button1.classList.add('header__button', 'button');
      button1.setAttribute('type', 'submit');
      button1.innerHTML = 'Add post';
      buttons.insertBefore(button1, button2);
      button2.innerHTML = 'Sign out';
      button2.onclick = '';
      /* Delete and edit links. */
      links.forEach(link => link.classList.toggle('post-container__links_hidden'));
    } else {
      /* Header buttons and name. */
      document.querySelector('.header__logInfo').innerHTML = 'Not logged';
      const buttons = document.querySelector('.header__buttons');
      if (buttons.children.length > 1) {
        buttons.removeChild(buttons.querySelector('.header__button'));
        buttons.querySelector('.header__button').innerHTML = 'Log in';
      }
      /* Delete and edit links. */
      links.forEach(link => link.classList.toggle('post-container__links_hidden'));
    }
  }
}

const Posts = (function Posts() {
  const posts = [
    {
      id: '1',
      description: 'Some Descripton231 2312 sf s',
      createdAt: new Date('2018-02-23T23:00:00'),
      author: 'ibelous',
      photoLink: 'images/img1.jpg',
      likes: ['ibelous', 'user1'],
      hashtags: ['tag000', 'tag2'],
    },
    {
      id: '2',
      description: 'Some Descripton',
      createdAt: new Date('2018-02-23T23:00:00'),
      author: 'sasha',
      photoLink: 'images/img1.jpg',
      likes: ['ibelous', 'user1'],
      hashtags: ['tag000', 'tag2'],
    },
    {
      id: '3',
      description: 'Some Descripton sd f12 s a sf',
      createdAt: new Date('2018-02-20T23:00:00'),
      author: 'sasha',
      photoLink: 'images/img3.jpg',
      likes: ['ibelous', 'user1'],
      hashtags: ['tag000', 'tag2'],
    },
    {
      id: '4',
      description: 'Some Descripton saf a s',
      createdAt: new Date('2018-02-23T23:00:00'),
      author: 'ibelous',
      photoLink: 'images/img4.jpg',
      likes: ['ibelous', 'user1'],
      hashtags: ['tag000', 'tag2', 'test'],
    },
    {
      id: '5',
      description: 'Some Descripton',
      createdAt: new Date('2018-02-21T23:00:00'),
      author: 'ibelous',
      photoLink: 'images/img1.jpg',
      likes: ['ibelous', 'user1'],
      hashtags: ['tag000', 'tag2'],
    },
    {
      id: '6',
      description: 'Some Descripton',
      createdAt: new Date('2018-02-23T23:00:00'),
      author: 'sasha',
      photoLink: 'images/img4.jpg',
      likes: ['ibelous', 'user1'],
      hashtags: ['tag000', 'tag2'],
    },
    {
      id: '7',
      description: 'Some Descripton  f sd 23 a sf ',
      createdAt: new Date('2018-02-23T23:00:00'),
      author: 'sasha',
      photoLink: 'images/img2.jpg',
      likes: ['ibelous', 'user1'],
      hashtags: ['tag000', 'tag2'],
    },
    {
      id: '8',
      description: 'Some Descripton',
      createdAt: new Date('2018-02-23T23:00:00'),
      author: 'ibelous',
      photoLink: 'images/img3.jpg',
      likes: ['ibelous', 'user1'],
      hashtags: ['tag000', 'tag2', 'test'],
    },
    {
      id: '9',
      description: 'Some Descripton',
      createdAt: new Date('2018-02-23T23:00:00'),
      author: 'sasha',
      photoLink: 'images/img2.jpg',
      likes: ['ibelous', 'user1'],
      hashtags: ['tag000', 'tag2'],
    },
    {
      id: '10',
      description: 'Some Descripton.',
      createdAt: new Date('2018-02-23T23:00:00'),
      author: 'sasha',
      photoLink: 'images/img4.jpg',
      likes: ['ibelous', 'user1'],
      hashtags: ['tag000', 'tag2'],
    },
    {
      id: '11',
      description: 'Some Descripton',
      createdAt: new Date('2018-02-23T23:00:00'),
      author: 'sasha',
      photoLink: 'images/img1.jpg',
      likes: ['ibelous', 'user1'],
      hashtags: ['hashtag', 'tag2'],
    },
    {
      id: '12',
      description: 'Some Descripton',
      createdAt: new Date('2018-02-23T23:00:00'),
      author: 'sasha',
      photoLink: 'images/img2.jpg',
      likes: ['ibelous', 'user1'],
      hashtags: ['hashtagabc', 'tag2'],
    },
    {
      id: '13',
      description: 'Some Descripton',
      createdAt: new Date('2018-02-23T23:00:00'),
      author: 'sasha',
      photoLink: 'images/img3.jpg',
      likes: ['ibelous', 'user1'],
      hashtags: ['tag000', 'tag2'],
    },
    {
      id: '14',
      description: 'Some Descripton',
      createdAt: new Date('2018-02-23T23:00:00'),
      author: 'sasha',
      photoLink: 'images/img4.jpg',
      likes: ['ibelous', 'user1'],
      hashtags: ['tag1', 'tag2'],
    },
    {
      id: '15',
      description: 'Some Descripton',
      createdAt: new Date('2018-02-23T23:00:00'),
      author: 'sasha',
      photoLink: 'images/img1.jpg',
      likes: ['ibelous', 'user1'],
      hashtags: ['tag1', 'tag2'],
    },
    {
      id: '16',
      description: 'Some Descripton.',
      createdAt: new Date('2018-02-23T23:00:00'),
      author: 'sasha',
      photoLink: 'images/img2.jpg',
      likes: ['ibelous', 'user1'],
      hashtags: ['tag1', 'tag2'],
    },
    {
      id: '17',
      description: 'Some Descripton',
      createdAt: new Date('2018-02-23T23:00:00'),
      author: 'sasha',
      photoLink: 'images/img4.jpg',
      likes: ['ibelous', 'user1'],
      hashtags: ['tag1', 'tag2'],
    },
    {
      id: '18',
      description: 'Some Descripton',
      createdAt: new Date('2018-02-23T23:00:00'),
      author: 'sasha',
      photoLink: 'images/img4.jpg',
      likes: ['ibelous', 'user1'],
      hashtags: ['tag1', 'tag2'],
    },
    {
      id: '19',
      description: 'Some Descripton',
      createdAt: new Date('2018-02-23T23:00:00'),
      author: 'sasha',
      photoLink: 'images/img3.jpg',
      likes: ['ibelous', 'user1'],
      hashtags: ['tag1', 'tag2'],
    },
    {
      id: '20',
      description: 'Some Descripton',
      createdAt: new Date('2018-02-23T23:00:00'),
      author: 'sasha',
      photoLink: 'images/img2.jpg',
      likes: ['ibelous', 'user1'],
      hashtags: ['tag1', 'tag2'],
    },
    {
      id: '21',
      description: 'Some Descripton',
      createdAt: new Date('2018-02-23T23:00:00'),
      author: 'sasha',
      photoLink: 'images/img1.jpg',
      likes: ['ibelous', 'user1'],
      hashtags: ['tag1', 'tag2'],
    },
    {
      id: '22',
      description: 'Some Descripton',
      createdAt: new Date('2018-02-23T23:00:00'),
      author: 'sasha',
      photoLink: 'images/img2.jpg',
      likes: ['ibelous', 'user1'],
      hashtags: ['tag1', 'tag2'],
    },
    {
      id: '23',
      description: 'Some Descripton',
      createdAt: new Date('2018-02-23T23:00:00'),
      author: 'sasha',
      photoLink: 'images/img2.jpg',
      likes: ['ibelous', 'user1'],
      hashtags: ['tag1', 'tag2'],
    },
    {
      id: '24',
      description: 'Some Descripton sdf sdf w 23 113 2Some DescriptonSome DescriptonSome DescriptonSome Descripton',
      createdAt: new Date('2018-02-23T23:00:00'),
      author: 'sasha',
      photoLink: 'images/img3.jpg',
      likes: ['ibelous', 'user1'],
      hashtags: ['tag1', 'tag2'],
    },
    {
      id: '25',
      description: 'Some Descripton sdf sdf w 23 113 2',
      createdAt: new Date('2018-02-23T23:00:00'),
      author: 'sasha',
      photoLink: 'images/img4.jpg',
      likes: ['ibelous', 'user1'],
      hashtags: ['tag1', 'tag2'],
    },
  ];
  const module = [];
  const model = new PostModel(posts);
  const view = new View();
  module.addPhotoPost = function addPhotoPost(post) {
    if (model.addPhotoPost(post) === true) {
      view.addPost(post, model.getPostIndex(post.id));
    }
  };
  module.removePhotoPost = function removePhotoPost(id) {
    if (model.removePhotoPost(id) === true) {
      view.removePost(id);
    }
  };
  module.editPhotoPost = function editPhotoPost(id, edits) {
    if (model.editPhotoPost(id, edits) === true) {
      view.editPost(model.getPhotoPost(id));
    }
  };
  module.showPhotoPosts = function showPhotoPosts() {
    view.showPosts(model.getPhotoPosts());
  };
  module.showElementsIfAuthorized = function showElementsIfAuthorized(isAuthorized) {
    View.showElementsIfAuthorized(isAuthorized);
  };
  return module;
}());

Posts.addPhotoPost({
  id: '2',
  description: 'Some Descripton',
  createdAt: new Date('2018-02-23T23:00:00'),
  author: 'ibelous',
  photoLink: 'images/img1.jpg',
  likes: ['ibelous', 'user1'],
});
Posts.showPhotoPosts();
