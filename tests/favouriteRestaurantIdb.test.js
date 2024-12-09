
import FavouriteRestaurant from '../src/scripts/data/favourite-restaurant';
import { itActsAsFavoriteRestaurantModel } from './contracts/favouriteRestaurantContract';
 
describe('Favorite Restaurant Idb Contract Test Implementation', () => {
  afterEach(async () => {
    (await FavouriteRestaurant.getAllRestaurants()).forEach(async (restaurant) => {
      await FavouriteRestaurant.deleteRestaurant(restaurant.id);
    });
  });
 
  itActsAsFavoriteRestaurantModel(FavouriteRestaurant);
});