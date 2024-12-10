import FavoriteRestaurantSearchView from '../src/scripts/views/pages/favourited-restaurant/favourite-restaurant-search-view';
import FavoriteRestaurantShowPresenter from '../src/scripts/views/pages/favourited-restaurant/favourite-restaurant-show-presenter';
import { describe, it, expect, beforeEach, jest } from '@jest/globals';

describe('Showing all favorite Restaurants', () => {
  let view;

  const renderTemplate = () => {
    view = new FavoriteRestaurantSearchView();
    document.body.innerHTML = view.getTemplate();
  };
  beforeEach(() => {
    renderTemplate();
  });

  describe('When no Restaurants have been liked', () => {
    it('should render the information that no Restaurants have been liked', () => {
      const favoriteRestaurant = {
        getAllRestaurants: jest.fn().mockImplementation(() => []),
      };

      const presenter = new FavoriteRestaurantShowPresenter({
        view,
        favoriteRestaurant,
      });

      const restaurants = [];
      presenter._displayRestaurants(restaurants);

      expect(document.querySelectorAll('.restaurant-item__not__found').length).toEqual(1);
    });

    it('should ask for the favorite Restaurants', () => {
      const favoriteRestaurant = {
        getAllRestaurants: jest.fn().mockImplementation(() => []),
      };
      new FavoriteRestaurantShowPresenter({
        view,
        favoriteRestaurant,
      });
      expect(favoriteRestaurant.getAllRestaurants).toHaveBeenCalledTimes(1);
    });

    it('should show the information that no Restaurants have been liked', (done) => {
      document.getElementById('restaurants').addEventListener('restaurants:updated', () => {
        expect(document.querySelectorAll('.restaurant-item__not__found').length).toEqual(1);
        done();
      });

      const favoriteRestaurant = {
        getAllRestaurants: jest.fn().mockImplementation(() => []),
      };

      new FavoriteRestaurantShowPresenter({
        view,
        favoriteRestaurant,
      });
    });
  });


  describe('When favorite Restaurants exist', () => {
    it('should render the Restaurants', () => {
      const favoriteRestaurant = {
        getAllRestaurants: jest.fn().mockImplementation(() => []),
      };

      const presenter = new FavoriteRestaurantShowPresenter({
        view,
        favoriteRestaurant,
      });

      presenter._displayRestaurants([
        {
          id: 'restaurant-1',
          name: 'Restaurant 1',
          description: 'Description 1',
        },
        {
          id: 'restaurant-2',
          name: 'Restaurant 2',
          description: 'Description 2',
        },
      ]);

      expect(document.querySelectorAll('.restaurant-item').length).toEqual(2);
    });

    it('should show the restaurants', (done) => {
      document.getElementById('restaurants').addEventListener('restaurants:updated', () => {
        expect(document.querySelectorAll('.restaurant-item').length).toEqual(2);
        done();
      });

      const favoriteRestaurant = {
        getAllRestaurants: jest.fn().mockImplementation(() => [
          {
            id: 'restaurant-1',
            name: 'Restaurant 1',
            description: 'Description 1',
          },
          {
            id: 'restaurant-2',
            name: 'Restaurant 2',
            description: 'Description 2',
          },
        ]),
      };

      new FavoriteRestaurantShowPresenter({
        view,
        favoriteRestaurant,
      });
    });



  });

});