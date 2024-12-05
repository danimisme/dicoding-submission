import { beforeEach, describe, expect, it, xit } from '@jest/globals';
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

});