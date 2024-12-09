class FavoriteRestaurantSearchPresenter {

  constructor({ favoriteRestaurant, view }) {
    this._favoriteRestaurant = favoriteRestaurant;
    this._view = view;
    this._listenToSearchRequestByUser();
  }

  _listenToSearchRequestByUser() {
    this._view.runWhenUserIsSearching((latestQuery) => {
      this._searchRestaurants(latestQuery);
    });
  }

  async _searchRestaurants(latestQuery) {
    this._latestQuery = latestQuery.trim();
    let foundRestaurant;
    if (this.latestQuery.length > 0) {
      foundRestaurant = await this._favoriteRestaurant.searchRestaurants(this.latestQuery);
    } else {
      foundRestaurant = await this._favoriteRestaurant.getAllRestaurants();
    }
    this._showFoundRestaurants(foundRestaurant);
  }

  _showFoundRestaurants(restaurants) {
    this._view.showRestaurant(restaurants);
  }

  get latestQuery() {
    return this._latestQuery.trim();
  }

}

export default FavoriteRestaurantSearchPresenter;