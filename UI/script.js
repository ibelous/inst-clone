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
console.log('started');
var modul = (function () {
    function addPhotoPost(post){
        if(validatePhotoPost(post)){
            postArray.push(post);
            console.log('added post');
            return true;
            }
        console.log('invalid post');
        return false;
        }
    function validatePhotoPost(post) {
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
    function getPhotoPost(id) {
        var result;
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
    function removePhotoPost(id) {
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
})();

