class FavoriteRestaurantShowPresenter {
  constructor({ view, favoriteRestaurant }) {
    this._view = view;
    this._favoriteRestaurant = favoriteRestaurant

    const restaurants = this._favoriteRestaurant.getAllRestaurants();
    this._displayRestaurants(restaurants);
  }
 
  _displayRestaurants(restaurants) {
    this._view.showRestaurant(restaurants);
  }
}
 
export default FavoriteRestaurantShowPresenter;
