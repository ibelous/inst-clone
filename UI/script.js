postArray = [
    {
        id: '1',
        descriprion: 'Description...........',
        createdAt: new Date('2019-03-01T23:00:00'),
        author: 'ibelous',
        path: '/images/img2.jpg',
        display: true,
        hashtags:['some', 'hash', 'tags'],
        likers:['User1','User2','User3','User4']
    },
    {
        id: '2',
        descriprion: '12 312 3wa asf 23 sdf',
        createdAt: new Date('2019-03-01T23:00:00'),
        author: 'UserName',
        path: '/images/img1.jpg',
        display: true,
        hashtags:['aaaa'],
        likers:['User1','User2','User3','User4']
    }
];
class PostModel {
    constructor(posts) {
        this._defaultFilterConfig = {
            dateFrom: new Date(-8640000000000000),
            dateTo: new Date(8640000000000000),
            authorName: '',
            hashtags: [],
        };
        this._photoPosts = posts;
    }
    _validatePhotoPost(post) {
        if (!post.hasOwnProperty("id") || typeof post.id != "string" ||
            !post.hasOwnProperty("description") || post.description.length >= 200 || typeof post.description != "string" ||
            !post.hasOwnProperty("createdAt") ||
            !post.hasOwnProperty("author") || typeof post.author != "string" ||
            !post.hasOwnProperty("path") || typeof post.path != "string" ||
            !post.hasOwnProperty("likes")) {
            console.log("Post with id " + post.id + " is not valid.");
            return false;
        }
        else {
            console.log("Post with id " + post.id + " is valid.");
            return true;
        }
    }
    addAll(posts) {
        const notValid = [];
        for (let i = 0; i < posts.length; i += 1) {
            if (this._validatePhotoPost(posts[i]) === true) {
                this._photoPosts.push(posts[i]);
                console.log(`Post with id ${posts[i].id} added.`);
            } else {
                notValid.push(posts[i]);
            }
        }
        console.log('Not valid posts:');
        console.log(notValid);
        return notValid;
    }

    addPhotoPost(post){
        if(validatePhotoPost(post)){
            postArray.push(post);
            console.log('added post');
            return true;
        }
        console.log('invalid post');
        return false;
    }
    getPhotoPosts(skip = 0, count = 10, filterConfig = this._defaultFilterConfig) {
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
        console.log(`skip: ${skip}; count: ${count}; filterConfig:`);
        console.log(filterConfig);
        console.log('Result:');
        console.log(result);
        return result;
    }
    getPhotoPost(id) {
        let  result;
        postArray.find()
        postArray.forEach(function (item) {
            if(item.id == id){
                console.log("id " + id + " found ");
                console.log(item);
                result = item;
            }
        });
        if (result != undefined) {
            return result;
        }
        console.log("id " + id + " is not found.");
    }
    removePhotoPost(id) {
        var index = -1;
        if(getPhotoPost(id)) {
            index = getPhotoPost(id).id;
        }
        if (index != -1) {
            postArray.splice(index, 1);
            console.log("Post with id " + id + " deleted.");
            return true;
        }
        else {
            console.log("Post with id " + id + " not found.");
            return false;
        }
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
            this.removePhotoPost(id);
            if (this._validatePhotoPost(postCopy)) {
                this.addPhotoPost(postCopy);
                console.log('Post successfully changed.');
                return true;
            }
            this.addPhotoPost(post);
        }
        console.log('Post not changed.');
        return false;
    }
}
console.log('started');

