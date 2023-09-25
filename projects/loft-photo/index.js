const photosDB = require('./photos.json');
const friendsDB = require ('./friends.json');

let methods = {
  getRandomElement(array) {
    let arrLength = array.length;
    let randomIdx = parseInt(Math.random() * arrLength);

    return array[randomIdx];
    
  },  
  
  getNextPhoto() {
    let friendArrLength = friendsDB.length;
    let randomFriendIdx = parseInt(Math.random() * friendArrLength);
    let photoArrLength = photosDB[randomFriendIdx].length;
    let randomPhotoIdx = parseInt(Math.random() * photoArrLength);
  
    let friendId = randomFriendIdx;
    let friend = friendsDB[randomFriendIdx];
    let friendPhotoUrl = photosDB[friendId][randomPhotoIdx].url;
    let friendEntries = {};
  
    friendEntries.friend = friend;
    friendEntries.url = friendPhotoUrl;
  
  
    return friendEntries;
  
  }
};

const getPhoto = methods.getNextPhoto();
const getRandomEl = methods.getRandomElement();