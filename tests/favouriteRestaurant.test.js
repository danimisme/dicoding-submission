import { beforeEach, describe, expect, it } from '@jest/globals';
import FavouriteButtonInitiator from '../src/scripts/utils/favourite-button-initiator';
import FavouriteRestaurant from '../src/scripts/data/favourite-restaurant';


describe('Add Restaurant Favourite', () => {
  const addFavouriteButtonContainer = () => {
    document.body.innerHTML = '<div id="favouriteButtonContainer"></div>';
  };

  beforeEach(() => {
    addFavouriteButtonContainer();
  });

  it('should show the favourite button when the restaurant has not been favourited before', async () => {
    await FavouriteButtonInitiator.init({
      favouriteButtonContainer: document.querySelector('#favouriteButtonContainer'),
      restaurant: {
        id: 1,
      },
    });

    expect(document.querySelector('[aria-label="favourite this restaurant"]')).toBeTruthy();
  });

  it('should not show the unfavourite button when the restaurant has not been favourited before', async () => {
    await FavouriteButtonInitiator.init({
      favouriteButtonContainer: document.querySelector('#favouriteButtonContainer'),
      restaurant: {
        id: 1,
      },
    });

    expect(document.querySelector('[aria-label="unfavourite this restaurant"]')).toBeFalsy();
  });

  it('should be able to add favourite restaurant', async () => {
    await FavouriteButtonInitiator.init({
      favouriteButtonContainer: document.querySelector('#favouriteButtonContainer'),
      restaurant: {
        id: 1,
      },
    });

    document.querySelector('#favouriteButton').dispatchEvent(new Event('click'));

    const restaurant = await FavouriteRestaurant.getRestaurant(1);
    expect(restaurant).toEqual({ id: 1 });

    await FavouriteRestaurant.deleteRestaurant(1);
  });

  // negative test

  it('should not add favourite restaurant when already favourited', async () => {
    await FavouriteButtonInitiator.init({
      favouriteButtonContainer: document.querySelector('#favouriteButtonContainer'),
      restaurant: {
        id: 1,
      },
    });

    await FavouriteRestaurant.putRestaurant({ id: 1 });
    document.querySelector('#favouriteButton').dispatchEvent(new Event('click'));

    expect(await FavouriteRestaurant.getAllRestaurants()).toEqual([{ id: 1 }]);
    await FavouriteRestaurant.deleteRestaurant(1);
  });

  it('should not add favourite restaurant when there is no id', async () => {
    await FavouriteButtonInitiator.init({
      favouriteButtonContainer: document.querySelector('#favouriteButtonContainer'),
      restaurant: {},
    });

    document.querySelector('#favouriteButton').dispatchEvent(new Event('click'));

    expect(await FavouriteRestaurant.getAllRestaurants()).toEqual([]);
  });
});