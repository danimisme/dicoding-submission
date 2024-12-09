import { describe, jest, beforeEach, it, expect } from '@jest/globals';
import FavoriteRestaurantSearchPresenter from '../src/scripts/views/pages/favourite-restaurant-presenter';
import FavoriteRestaurantSearchView from '../src/scripts/views/pages/favourited-restaurant/favourite-restaurant-search-view';

describe('Searching restaurants', () => {
  let searchPresenter;
  let favoriteRestaurant;
  let view;

  const searchRestaurants = (query) => {
    const queryElement = document.getElementById('query');
    queryElement.value = query;

    queryElement.dispatchEvent(new Event('change'));
  };

  const setRestaurantSearchContainer = () => {
    view = new FavoriteRestaurantSearchView();
    document.body.innerHTML = view.getTemplate();
  };



  const constructPresenter = () => {
    favoriteRestaurant = {
      searchRestaurants: jest.fn(),
      getAllRestaurants: jest.fn(),
    };
    searchPresenter = new FavoriteRestaurantSearchPresenter({
      favoriteRestaurant,
      view
    });
  };

  beforeEach(() => {
    setRestaurantSearchContainer();
    constructPresenter();
  });


  describe('when query is not empty', () => {
    it('should be able to capture the query typed by the user', () => {
      favoriteRestaurant.searchRestaurants.mockImplementation(() => []);
      searchRestaurants('restaurant a');
      expect(searchPresenter.latestQuery).toEqual('restaurant a');
    });

    it('should ask the model to search for restaurants', () => {
      favoriteRestaurant.searchRestaurants.mockImplementation(() => []);
      searchRestaurants('restaurant a');

      expect(favoriteRestaurant.searchRestaurants).toHaveBeenCalledWith('restaurant a');
    });

    it('should show the found favourite restaurants', () => {
      searchPresenter._showFoundRestaurants([{ id: 1 }]);
      expect(document.querySelectorAll('.restaurant-item').length).toEqual(1);
      searchPresenter._showFoundRestaurants([
        {
          id: 1,
          name: 'Satu',
        },
        {
          id: 2,
          name: 'Dua',
        },
      ]);

      expect(document.querySelectorAll('.restaurant-item').length).toEqual(2);
    });

    it('should show the name pf the found restaurants', () => {
      searchPresenter._showFoundRestaurants([
        {
          id: 1,
          name: 'Satu',
        },
      ]);
      expect(document.querySelectorAll('.restaurant__name').item(0).textContent).toEqual('Satu');
    });

    it('should show - for found restaurants without name', () => {
      searchPresenter._showFoundRestaurants([
        {
          id: 1,
        },
      ]);
      expect(document.querySelectorAll('.restaurant__name').item(0).textContent).toEqual('-');
    });

    it('should show the restaurants found by Favourite Movies', (done) => {
      document
        .getElementById('restaurants')
        .addEventListener('restaurants:searched:updated', () => {
          expect(document.querySelectorAll('.restaurant-item').length).toEqual(3);
          done();
        });

      favoriteRestaurant.searchRestaurants.mockImplementation((query) => {
        if (query === 'restaurant a') {
          return [
            { id: 111, name: 'restaurant abc' },
            { id: 222, name: 'restaurant xyz' },
            { id: 333, name: 'restaurant pqr' },
          ];
        }
        return [];
      });

      searchRestaurants('restaurant a');
    });

    it('should show the name of the restaurants found by Favourite Movies', (done) => {
      document
        .getElementById('restaurants')
        .addEventListener('restaurants:searched:updated', () => {
          const restaurantNames = document.querySelectorAll('.restaurant__name');
          expect(restaurantNames.item(0).textContent).toEqual('restaurant abc');
          expect(restaurantNames.item(1).textContent).toEqual('restaurant xyz');
          expect(restaurantNames.item(2).textContent).toEqual('restaurant pqr');
          done();
        });

      favoriteRestaurant.searchRestaurants.mockImplementation((query) => {
        if (query === 'restaurant a') {
          return [
            { id: 111, name: 'restaurant abc' },
            { id: 222, name: 'restaurant xyz' },
            { id: 333, name: 'restaurant pqr' },
          ];
        }
        return [];
      });
      searchRestaurants('restaurant a');
    });
  });

  describe('when query is empty', () => {
    it('should capture the query as empty', () => {
      favoriteRestaurant.searchRestaurants.mockImplementation(() => []);

      searchRestaurants('');
      expect(searchPresenter.latestQuery.length).toEqual(0);

      searchRestaurants(' ');
      expect(searchPresenter.latestQuery.length).toEqual(0);

      searchRestaurants('    ');
      expect(searchPresenter.latestQuery.length).toEqual(0);

      searchRestaurants('');
      expect(searchPresenter.latestQuery.length).toEqual(0);

      searchRestaurants('\t');
      expect(searchPresenter.latestQuery.length).toEqual(0);
    });

    it('should show all favourite restaurants', () => {
      favoriteRestaurant.getAllRestaurants.mockImplementation(() => []);
      searchRestaurants('');
      expect(favoriteRestaurant.getAllRestaurants).toHaveBeenCalled();
    });
  });

  describe('when no favourite restaurants could be found', () => {
    it('should show the empty message', (done) => {
      document
        .getElementById('restaurants')
        .addEventListener('restaurants:searched:updated', () => {
          expect(document.querySelectorAll('.restaurant-item__not__found').length).toEqual(1);
          done();
        });

      favoriteRestaurant.searchRestaurants.mockImplementation(() => []);
      searchRestaurants('restaurant a');
    });
  });

  it('should not show any restaurants', (done) => {
    document
      .getElementById('restaurants')
      .addEventListener('restaurants:searched:updated', () => {
        expect(document.querySelectorAll('.restaurant-item').length).toEqual(0);
        done();
      });

    favoriteRestaurant.searchRestaurants.mockImplementation(() => []);
    searchRestaurants('restaurant a');
  });
});
