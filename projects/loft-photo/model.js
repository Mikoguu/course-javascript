const APP_ID = 51763202;
const SETTINGS_FRIENDS = 2;
const SETTINGS_PHOTOS = 4;


export default {
  getRandomElement(array) {
    let arrLength = array.length;
    let randomIdx = parseInt(Math.random() * arrLength);

    return array[randomIdx];
    
  },

  getNextPhoto() {
    const friend = this.getRandomElement(this.friends.items);
    const photos = this.getFriendPhotos(friend.id);
    const photo = this.getRandomElement(photos.items);
    const size = this.findSize(photo);

    return { friend, id: photo.id, url: size.url};
  },

  login() {
    return new Promise((resolve, reject) => {
      VK.init({
        apiId: APP_ID,
      });
      VK.Auth.login(response => {
          if (response.session) {
              resolve(response);
          } else {
              console.error(response);
              reject(response);
          }
      }, SETTINGS_FRIENDS | SETTINGS_PHOTOS);
  });
  },
  
  callAPI(method, params) {
    params.v = '5.154';
 
   return new Promise((resolve, reject) => {
       VK.api(method, params, (response) => {
           if (response.error) {
               reject(new Error(response.error.error_msg));
           } else {
               resolve(response.response);
           }
       });
   })
},

getFriends() {

  return this.callAPI('friends.get', {fields: ''});
},

async init() {
    this.photoCache = {};
    this.friends =  await this.getFriends();
},

getPhotos(owner) {
  return this.callAPI('photos.getAll', {owner_id: owner});
},

async getFriendPhotos(id) {
  const photos = this.photoCache[id];

  if (photos) {
    return photos;
  }

  // const photos = вместо этого комментария вставьте код для получения фотографии друга из ВК

  photos = await this.getPhotos(id);
  this.photoCache[id] = photos;

  return photos;
},

findSize(photo) {
  const size = photo.sizes.find((size) => size.width >= 360);

  if (!size) {
    return photo.sizes.reduce((biggest, current) => {
      if (current.width > biggest.width) {
        return current;
      }

      return biggest;
    }, photo.sizes[0]);
  }

  return size;
}
};
