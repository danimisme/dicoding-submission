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
    // Load Lodash dynamically
    const { default: _ } = await import('lodash');
    const allRestaurants = await this.getAllRestaurants();
    const loweredCaseQuery = query.toLowerCase().replace(/\s/g, '');
    return _.filter(allRestaurants, (restaurant) => {
      const loweredCaseRestaurantName = (restaurant.name || '-').toLowerCase();
      const jammedRestaurantName = loweredCaseRestaurantName.replace(/\s/g, '');
      return _.includes(jammedRestaurantName, loweredCaseQuery);
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
