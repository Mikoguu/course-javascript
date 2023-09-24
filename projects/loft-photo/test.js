function getNextPhoto() {
  const photosDB = require('./photos.json');
  const friendsDB = require ('./friends.json');
  
  let friendArrLength = friendsDB.length;
  let randomFriendIdx = parseInt(Math.random() * friendArrLength);
  let photoArrLength = photosDB[randomFriendIdx].length;
  let randomPhotoIdx = parseInt(Math.random() * photoArrLength);

  let friendId = randomFriendIdx;
  let friend = friendsDB[randomFriendIdx];
  let friendPhoto = photosDB[friendId][randomPhotoIdx].url;
  let friendEntries = {};

  friendEntries.friend = friend;
  friendEntries.url = friendPhoto;


  return friendEntries;

}


const photo = getNextPhoto();
console.log(photo);

