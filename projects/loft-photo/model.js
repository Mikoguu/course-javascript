const APP_ID = 51763202;
const SETTINGS_FRIENDS = 2;
const SETTINGS_PHOTOS = 4;


export default {
  getRandomElement(array) {
    const arrLenght = array?.length || 0;

    const idx = Math.round(Math.random() * (arrLenght - 1));
    return array[idx];
  },

 async getNextPhoto() {
    const friend = this.getRandomElement(this.friends.items);
    const photos = await this.getFriendPhotos(friend);
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
   });
},

getFriends() {
  const params = {
    fields: ['photo_50', 'photo_100']
  };
  return this.callAPI('friends.get', params);
},

async init() {
  this.photoCache = {};
  this.friends = await this.getFriends();
},

getPhotos(owner) {
  return this.callAPI('photos.getAll', {owner_id: owner.id});
},

async getFriendPhotos(id) {
  let photos = this.photoCache[id];

  if (photos) {
    return photos;
  };
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
