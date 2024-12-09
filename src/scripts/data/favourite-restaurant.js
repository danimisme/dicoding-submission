import { openDB } from 'idb';
import CONFIG from '../globals/config';

const { DATABASE_NAME, DATABASE_VERSION, OBJECT_STORE_NAME } = CONFIG;

const dbPromise = openDB(DATABASE_NAME, DATABASE_VERSION, {
  upgrade(database) {
    database.createObjectStore(OBJECT_STORE_NAME, { keyPath: 'id' });
  },
});

const FavouriteRestaurant = {
  async getRestaurant(id) {
    if (!id) {
      return;
    }
    return (await dbPromise).get(OBJECT_STORE_NAME, id);
  },
  async getAllRestaurants() {
    return (await dbPromise).getAll(OBJECT_STORE_NAME);
  },
  async searchRestaurants(query) {
    // const db = await dbPromise;
    // const allRestaurants = await db.getAll(OBJECT_STORE_NAME);  
    // // Filter restoran berdasarkan query
    // if (query.length > 0) {
    //   const lowerCaseQuery = query.toLowerCase();
    //   return allRestaurants.filter((restaurant) =>
    //     restaurant.name.toLowerCase().includes(lowerCaseQuery)
    //   );
    // }
  
    // return allRestaurants; // Jika query kosong, kembalikan semua restoran

    return (await this.getAllRestaurants()).filter((restaurant) => {
      const loweredCaseRestaurantName = (restaurant.name || '-').toLowerCase();
      const jammedRestaurantName = loweredCaseRestaurantName.replace(/\s/g, '');
 
      const loweredCaseQuery = query.toLowerCase();
      const jammedQuery = loweredCaseQuery.replace(/\s/g, '');
 
      return jammedRestaurantName.indexOf(jammedQuery) !== -1;
    });
  
  },

  async putRestaurant(restaurant) {
    if (!Object.prototype.hasOwnProperty.call(restaurant, 'id')) {
      return;
    }
    return (await dbPromise).put(OBJECT_STORE_NAME, restaurant);
  },
  async deleteRestaurant(id) {
    return (await dbPromise).delete(OBJECT_STORE_NAME, id);
  },
};

export default FavouriteRestaurant;
