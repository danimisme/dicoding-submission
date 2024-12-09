const { default: FavoriteRestaurantSearchView } = require("../src/scripts/views/pages/favourited-restaurant/favourite-restaurant-search-view");
const { default: FavoriteRestaurantShowPresenter } = require("../src/scripts/views/pages/favourited-restaurant/favourite-restaurant-show-presenter");

describe('Showing all favorite Restaurants', () => {
  let view;
 
  const renderTemplate = () => {
    view = new FavoriteRestaurantSearchView();
    document.body.innerHTML = view.getFavoriteRestaurantTemplate();
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
    });


  
});