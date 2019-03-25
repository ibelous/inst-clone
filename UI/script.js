class PostModel {
  constructor(posts) {
    this._photoPosts = posts;
  }

  _isIntersect(postTags, configTags) {
    let num = 0;
    postTags.forEach((item) => {
      configTags.forEach((tag) => {
        if (item === tag) {
          num += 1;
        }
      });
    });
    return num === configTags.length;
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
        && (this._isIntersect(post.hashtags, filterConfig.hashtags)
          || filterConfig.hashtags.length === 0),
    ).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    const result = [];
    let number = 0;
    for (let i = skip; number < count && i < filtratedPosts.length; i += 1) {
      result.push(filtratedPosts[i]);
      number += 1;
    }
    return result;
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
      || !post.hasOwnProperty('photoLink') || typeof post.photoLink !== 'string' || post.photoLink === ''
      || !post.hasOwnProperty('hashtags')) {
      return false;
    }
    return true;
  }

  _validateUnChangeableFields(post) {
    if (!post.hasOwnProperty('id') || typeof post.id !== 'string'
      || !post.hasOwnProperty('createdAt')
      || !post.hasOwnProperty('author') || typeof post.author !== 'string' || post.author === ''
      || !post.hasOwnProperty('likes')) {
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

const validPost = {
  id: '29',
  description: 'LSome Descripton',
  createdAt: new Date('2018-02-23T23:00:00'),
  author: 'ibelous',
  photoLink: 'img/img29',
  likes: ['ibelous'],
  hashtags: ['tag2'],
};
const notValidPost = {
  id: '2',
  description: 'Descripton',
  createdAt: new Date('2018-02-23T23:00:00'),
  author: 'ibelous',
  photoLink: 'img/img22',
  likes: ['ibelous'],
  hashtags: ['tag2'],
};
const configDate = {
  dateFrom: new Date('2018-02-19T23:00:00'),
  dateTo: new Date('2018-02-22T23:00:00'),
  authorName: '',
  hashtags: [],
};
const configAuthor = {
  dateFrom: new Date(-8640000000000000),
  dateTo: new Date(8640000000000000),
  authorName: 'ibelous',
  hashtags: [],
};
const configAuthorHashtags = {
  dateFrom: new Date(-8640000000000000),
  dateTo: new Date(8640000000000000),
  authorName: 'ibelous',
  hashtags: ['test'],
};
const validPostEdit = {
  description: 'cSome Descripton',
  photoLink: 'img/img2',
  hashtags: ['changedHashtag'],
};

const allAdd = [
  {
    id: '41',
    description: 'Some Descripton',
    createdAt: new Date('2018-02-23T23:00:00'),
    author: 'ibelous',
    photoLink: 'img/img41',
    likes: ['ibelous'],
    hashtags: ['tag2'],
  },
  {
    id: '42',
    description: 'Some Descripton',
    createdAt: new Date('2018-02-23T23:00:00'),
    author: 'ibelous',
    photoLink: 'img/img42',
    likes: ['ibelous'],
    hashtags: ['tag2'],
  },
  {
    id: '4',
    description: 'Some Descripton',
    createdAt: new Date('2018-02-23T23:00:00'),
    author: 'ibelous',
    photoLink: 'img/img4',
    likes: ['ibelous'],
    hashtags: ['tag2'],
  },
];

const posts = [
  {
    id: '1',
    description: 'Some Descripton231 2312 sf s',
    createdAt: new Date('2018-02-23T23:00:00'),
    author: 'ibelous',
    photoLink: 'img/img1',
    likes: ['ibelous', 'user1'],
    hashtags: ['tag000', 'tag2'],
  },
  {
    id: '2',
    description: 'Some Descripton',
    createdAt: new Date('2018-02-23T23:00:00'),
    author: 'sasha',
    photoLink: 'img/img1',
    likes: ['ibelous', 'user1'],
    hashtags: ['tag000', 'tag2'],
  },
  {
    id: '3',
    description: 'Some Descripton sd f12 s a sf',
    createdAt: new Date('2018-02-20T23:00:00'),
    author: 'sasha',
    photoLink: 'img/img3',
    likes: ['ibelous', 'user1'],
    hashtags: ['tag000', 'tag2'],
  },
  {
    id: '4',
    description: 'Some Descripton saf a s',
    createdAt: new Date('2018-02-23T23:00:00'),
    author: 'ibelous',
    photoLink: 'img/img4',
    likes: ['ibelous', 'user1'],
    hashtags: ['tag000', 'tag2', 'test'],
  },
  {
    id: '5',
    description: 'Some Descripton',
    createdAt: new Date('2018-02-21T23:00:00'),
    author: 'ibelous',
    photoLink: 'img/img5',
    likes: ['ibelous', 'user1'],
    hashtags: ['tag000', 'tag2'],
  },
  {
    id: '6',
    description: 'Some Descripton',
    createdAt: new Date('2018-02-23T23:00:00'),
    author: 'sasha',
    photoLink: 'img/img6',
    likes: ['ibelous', 'user1'],
    hashtags: ['tag000', 'tag2'],
  },
  {
    id: '7',
    description: 'Some Descripton  f sd 23 a sf ',
    createdAt: new Date('2018-02-23T23:00:00'),
    author: 'sasha',
    photoLink: 'img/img7',
    likes: ['ibelous', 'user1'],
    hashtags: ['tag000', 'tag2'],
  },
  {
    id: '8',
    description: 'Some Descripton',
    createdAt: new Date('2018-02-23T23:00:00'),
    author: 'ibelous',
    photoLink: 'img/img8',
    likes: ['ibelous', 'user1'],
    hashtags: ['tag000', 'tag2', 'test'],
  },
  {
    id: '9',
    description: 'Some Descripton',
    createdAt: new Date('2018-02-23T23:00:00'),
    author: 'sasha',
    photoLink: 'img/img9',
    likes: ['ibelous', 'user1'],
    hashtags: ['tag000', 'tag2'],
  },
  {
    id: '10',
    description: 'Some Descripton.',
    createdAt: new Date('2018-02-23T23:00:00'),
    author: 'sasha',
    photoLink: 'img/img10',
    likes: ['ibelous', 'user1'],
    hashtags: ['tag000', 'tag2'],
  },
  {
    id: '11',
    description: 'Some Descripton',
    createdAt: new Date('2018-02-23T23:00:00'),
    author: 'sasha',
    photoLink: 'img/img11',
    likes: ['ibelous', 'user1'],
    hashtags: ['hashtag', 'tag2'],
  },
  {
    id: '12',
    description: 'Some Descripton',
    createdAt: new Date('2018-02-23T23:00:00'),
    author: 'sasha',
    photoLink: 'img/img12',
    likes: ['ibelous', 'user1'],
    hashtags: ['hashtagabc', 'tag2'],
  },
  {
    id: '13',
    description: 'Some Descripton',
    createdAt: new Date('2018-02-23T23:00:00'),
    author: 'sasha',
    photoLink: 'img/img13',
    likes: ['ibelous', 'user1'],
    hashtags: ['tag000', 'tag2'],
  },
  {
    id: '14',
    description: 'Some Descripton',
    createdAt: new Date('2018-02-23T23:00:00'),
    author: 'sasha',
    photoLink: 'img/img14',
    likes: ['ibelous', 'user1'],
    hashtags: ['tag1', 'tag2'],
  },
  {
    id: '15',
    description: 'Some Descripton',
    createdAt: new Date('2018-02-23T23:00:00'),
    author: 'sasha',
    photoLink: 'img/img15',
    likes: ['ibelous', 'user1'],
    hashtags: ['tag1', 'tag2'],
  },
  {
    id: '16',
    description: 'Some Descripton.',
    createdAt: new Date('2018-02-23T23:00:00'),
    author: 'sasha',
    photoLink: 'img/img16',
    likes: ['ibelous', 'user1'],
    hashtags: ['tag1', 'tag2'],
  },
  {
    id: '17',
    description: 'Some Descripton',
    createdAt: new Date('2018-02-23T23:00:00'),
    author: 'sasha',
    photoLink: 'img/img17',
    likes: ['ibelous', 'user1'],
    hashtags: ['tag1', 'tag2'],
  },
  {
    id: '18',
    description: 'Some Descripton',
    createdAt: new Date('2018-02-23T23:00:00'),
    author: 'sasha',
    photoLink: 'img/img18',
    likes: ['ibelous', 'user1'],
    hashtags: ['tag1', 'tag2'],
  },
  {
    id: '19',
    description: 'Some Descripton',
    createdAt: new Date('2018-02-23T23:00:00'),
    author: 'sasha',
    photoLink: 'img/img19',
    likes: ['ibelous', 'user1'],
    hashtags: ['tag1', 'tag2'],
  },
  {
    id: '20',
    description: 'Some Descripton',
    createdAt: new Date('2018-02-23T23:00:00'),
    author: 'sasha',
    photoLink: 'img/img20',
    likes: ['ibelous', 'user1'],
    hashtags: ['tag1', 'tag2'],
  },
  {
    id: '21',
    description: 'Some Descripton',
    createdAt: new Date('2018-02-23T23:00:00'),
    author: 'sasha',
    photoLink: 'img/img21',
    likes: ['ibelous', 'user1'],
    hashtags: ['tag1', 'tag2'],
  },
  {
    id: '22',
    description: 'Some Descripton',
    createdAt: new Date('2018-02-23T23:00:00'),
    author: 'sasha',
    photoLink: 'img/img22',
    likes: ['ibelous', 'user1'],
    hashtags: ['tag1', 'tag2'],
  },
  {
    id: '23',
    description: 'Some Descripton',
    createdAt: new Date('2018-02-23T23:00:00'),
    author: 'sasha',
    photoLink: 'img/img23',
    likes: ['ibelous', 'user1'],
    hashtags: ['tag1', 'tag2'],
  },
  {
    id: '24',
    description: 'Some Descripton sdf sdf w 23 113 2Some DescriptonSome DescriptonSome DescriptonSome Descripton',
    createdAt: new Date('2018-02-23T23:00:00'),
    author: 'sasha',
    photoLink: 'img/img24',
    likes: ['ibelous', 'user1'],
    hashtags: ['tag1', 'tag2'],
  },
  {
    id: '25',
    description: 'Some Descripton sdf sdf w 23 113 2',
    createdAt: new Date('2018-02-23T23:00:00'),
    author: 'sasha',
    photoLink: 'img/img25',
    likes: ['ibelous', 'user1'],
    hashtags: ['tag1', 'tag2'],
  },
];

const MODEL = new PostModel(posts);
MODEL.addPhotoPost(validPost);
MODEL.addPhotoPost(notValidPost);
MODEL.removePhotoPost('29');
MODEL.removePhotoPost('30');
MODEL.getPhotoPost('2');
MODEL.getPhotoPost('30');
MODEL.getPhotoPosts();
MODEL.getPhotoPosts(0, 5);
MODEL.getPhotoPosts(4, 5);
MODEL.getPhotoPosts(1, 7, configDate);
MODEL.getPhotoPosts(1, 7, configAuthor);
MODEL.getPhotoPosts(1, 7, configAuthorHashtags);
MODEL.editPhotoPost('2', validPostEdit);
MODEL.addAll(allAdd);
