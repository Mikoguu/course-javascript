
let methods = {
  getRandomElement(array) {
    let arrLength = array.length;
    let randomIdx = parseInt(Math.random() * arrLength);

    return array[randomIdx];
    
  },  

  getNextPhoto() {
    // const photosDBUnparsed = JSON.stringify(require('./photos.json'));
    const photosDB = require('./photos.json');
    const friendsDB = require ('./friends.json');
    
    let friendArrLength = friendsDB.length;
    let randomFriendIdx = parseInt(Math.random() * friendArrLength);

    let friendId = friendsDB[randomFriendIdx].id;
    let friendPhoto = photosDB.friendId[randomIdx].url;
    let friendEntries = {};

    friendEntries.friend = friendId;
    friendEntries.photo = friendPhoto;

    return friendEntries;

  }
}

let photo = methods.getNextPhoto;

console.log(photo.url);