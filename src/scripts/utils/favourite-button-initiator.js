
import FavouriteRestaurant from '../data/favourite-restaurant';
import { createFavouriteButtonTemplate, createFavouritedButtonTemplate } from '../views/templates/template-creator';

const FavouriteButtonInitiator = {
  async init({ favouriteButtonContainer, restaurant }) {
    this._favouriteButtonContainer = favouriteButtonContainer;
    this._restaurant = restaurant;

    await this._renderButton();
  },

  async _renderButton() {
    const { id } = this._restaurant;

    if (await this._isRestaurantExist(id)) {
      this._renderFavourited();
    } else {
      this._renderFavourite();
    }
  },

  async _isRestaurantExist(id) {
    const restaurant = await FavouriteRestaurant.getRestaurant(id);
    return !!restaurant;
  },

  _renderFavourite() {
    this._favouriteButtonContainer.innerHTML = createFavouriteButtonTemplate();

    const favouriteButton = document.querySelector('#favouriteButton');
    favouriteButton.addEventListener('click', async () => {
      await FavouriteRestaurant.putRestaurant(this._restaurant);
      this._renderButton();
    });
  },

  _renderFavourited() {
    this._favouriteButtonContainer.innerHTML = createFavouritedButtonTemplate();

    const favouriteButton = document.querySelector('#favouriteButton');
    favouriteButton.addEventListener('click', async () => {
      await FavouriteRestaurant.deleteRestaurant(this._restaurant.id);
      this._renderButton();
    });
  },
};

export default FavouriteButtonInitiator;
