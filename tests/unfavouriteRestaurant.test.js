import FavouriteButtonInitiator from '../src/scripts/utils/favourite-button-initiator';
import FavouriteRestaurant from '../src/scripts/data/favourite-restaurant';
import { afterEach, beforeEach, describe, expect, it } from '@jest/globals';

describe('Unfavourite Restaurant', () => {
  const addFavouriteButtonContainer = () => {
    document.body.innerHTML = '<div id="favouriteButtonContainer"></div>';
  };

  beforeEach(async () => {
    addFavouriteButtonContainer();
    await FavouriteRestaurant.putRestaurant({ id: 1 });
  });

  afterEach(async () => {
    await FavouriteRestaurant.deleteRestaurant(1);
  });

  it('should show the unfavourite button when the restaurant has been favourited before', async () => {
    await FavouriteButtonInitiator.init({
      favouriteButtonContainer: document.querySelector('#favouriteButtonContainer'),
      restaurant: {
        id: 1,
      },
    });

    expect(document.querySelector('[aria-label="unfavourite this restaurant"]')).toBeTruthy();
  });

  it('should not show the favourite button when the restaurant has not been favourited before', async () => {
    await FavouriteButtonInitiator.init({
      favouriteButtonContainer: document.querySelector('#favouriteButtonContainer'),
      restaurant: {
        id: 1,
      },
    });

    expect(document.querySelector('[aria-label="favourite this restaurant"]')).toBeFalsy();
  });

  it('should be able to unfavourite restaurant', async () => {
    await FavouriteButtonInitiator.init({
      favouriteButtonContainer: document.querySelector('#favouriteButtonContainer'),
      restaurant: {
        id: 1,
      },
    });

    document.querySelector('#favouriteButton').dispatchEvent(new Event('click'));

    expect(await FavouriteRestaurant.getAllRestaurants()).toEqual([]);
  });

  it('should not throw error when user click unfavourite button if the unfavourited restaurant is not in the list', async () => {
    await FavouriteButtonInitiator.init({
      favouriteButtonContainer: document.querySelector('#favouriteButtonContainer'),
      restaurant: {
        id: 1,
      },
    });

    await FavouriteRestaurant.deleteRestaurant(1);
    document.querySelector('#favouriteButton').dispatchEvent(new Event('click'));

    expect(await FavouriteRestaurant.getAllRestaurants()).toEqual([]);
  });

});