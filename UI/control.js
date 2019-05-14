class Controller {
  constructor() {
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
    this.model = new PostModel(posts);
    this.view = new View();
  }

  addPhotoPost(post) {
    if (this.model.addPhotoPost(post) === true) {
      this.view.addPost(post, this.model.getPostIndex(post.id));
    }
  }

  removePhotoPost(id) {
    if (this.model.removePhotoPost(id) === true) {
      this.view.removePost(id);
    }
  }

  getPostsCount() {
    return this.model.getPostsCount();
  }

  editPhotoPost(id, edits) {
    if (this.model.editPhotoPost(id, edits) === true) {
      this.view.editPost(this.model.getPhotoPost(id));
    }
  }

  static loadMore(mainController) {
    const currentPostCount = document.querySelectorAll('.post-container').length;
    mainController.showPhotoPosts(currentPostCount, 10);
    mainController.showElementsIfAuthorized();
  }

  static createFilter() {
    const config = {};
    const inputs = document.querySelector('.filter');
    const date = inputs.querySelector('date').value;
    let time;
    let from = new Date(-8640000000000000);
    if (date !== '') {
      from = new Date(date);
      time = from.split(':');
      from.setUTCHours(time[0]);
      from.setUTCMinutes(time[1]);
    }

    const nodeTags = inputs.querySelectorAll('.filter__tag');
    const tags = [].map.call(nodeTags, item => item.innerHTML);

    config.dateFrom = from;
    config.authorName = inputs.querySelector('.authorFilter').value;
    config.hashtags = tags;
    return config;
  }

  showPhotoPosts(skip = 0, count = 10, config) {
    this.view
      .showPosts(this.model.getPhotoPosts(skip, count, config), this.model.getPostsCount(config));
  }

  static showAdd() {
    View.showAdd();
  }

  static showEdit() {
    View.showEdit();
  }

  showElementsIfAuthorized() {
    View.showElementsIfAuthorized(this.model.isAuthorized(), this.model.getName());
  }

  /*toggleLike(event) {
    if (event.target.classList.contains('like_icon')) {
      let { target } = event;
      console.log(target);
      this.view.toggleLike(event, target);
    }
  }*/

  logIn(event) {
    console.log(event.target.classList);
    if (event.target.classList.contains('login')) {
      const username = document.querySelector('.input-name').value;
      this.model.setName(username);
      this.model.toggleAuth();
      this.showElementsIfAuthorized();
    }
    else if (event.target.classList.contains('logout')) {
      this.model.toggleAuth();
      this.showElementsIfAuthorized(this.model.getName());
    }
  }
}

const control = new Controller();
control.showPhotoPosts();
control.showElementsIfAuthorized();

class Listener {
  constructor() {
    const login = document.querySelector('.header');
    login.addEventListener('click', Listener.logIn);
    const load = document.querySelector('main');
    load.addEventListener('click', Controller.showPhotoPosts);
    load.addEventListener('click', Listener.toggleLike);
    const loadMore = document.querySelector('.load');
    loadMore.addEventListener('click', Controller.loadMore.bind(null, control));
  }

  /*static toggleLike(event) {
    control.toggleLike();
  }*/

  static logIn(event) {
    const ev = event;
    if (event.target.classList.contains('login')) {
      const dialog = document.getElementById('login-dialog');
      dialog.showModal();
      const submit = document.querySelector('.submit');
      const cancel = document.querySelector('.cancel');
      submit.addEventListener('click', function() {
        control.logIn(ev);
        dialog.close();
      });
      cancel.addEventListener('click', function() {
        dialog.close();
      });
    }
    else {
      control.logIn(ev);
    }
  }
}

const listen = new Listener();
