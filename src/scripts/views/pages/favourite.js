import FavouriteRestaurant from '../../data/favourite-restaurant';
import FavoriteRestaurantSearchPresenter from './favourite-restaurant-presenter';
import FavoriteRestaurantSearchView from './favourited-restaurant/favourite-restaurant-search-view';
import FavoriteRestaurantShowPresenter from './favourited-restaurant/favourite-restaurant-show-presenter';

const view = new FavoriteRestaurantSearchView();

const Favourite = {
  async render() {
    return view.getTemplate();
  },

  //   const searchPresenter = new FavoriteRestaurantSearchPresenter( {
  //     favoriteRestaurants: FavouriteRestaurant,
  //     view: FavoriteRestaurantSearchView
  //    });
  //   const restaurantsContainer = document.querySelector('#restaurants');

  //   const renderRestaurants = async (query = '') => {
  //     restaurantsContainer.innerHTML = '<p>Loading...</p>';
  //     try {
  //       let restaurants = await FavouriteRestaurant.getAllRestaurants();
  //       if (query.length > 0) {
  //         restaurants = await FavouriteRestaurant.searchRestaurants(query);
  //       }
  //       restaurantsContainer.innerHTML = '';

  //       if (restaurants.length > 0) {
  //         restaurants.forEach((restaurant) => {
  //           restaurantsContainer.innerHTML += createRestaurantItemTemplate(restaurant);
  //         });
  //       } else {
  //         restaurantsContainer.innerHTML = `
  //           <div class="restaurant-item__not__found">
  //             <p>Tidak ada restoran untuk ditampilkan</p>
  //           </div>
  //         `;
  //       }
  //     } catch (error) {
  //       restaurantsContainer.innerHTML = `<p>Error loading restaurants: ${error.message}</p>`;
  //     }
  //   };

  //   // Render initial list
  //   await renderRestaurants();

  //   // Listen for changes in query
  //   const queryElement = document.getElementById('query');
  //   queryElement.addEventListener('change', async () => {
  //     const query = searchPresenter.latestQuery;
  //     await renderRestaurants(query);
  //   });
  // },

  async afterRender() {
    new FavoriteRestaurantSearchPresenter({
      favoriteRestaurant: FavouriteRestaurant,
      view,
    });
    new FavoriteRestaurantShowPresenter({
      favoriteRestaurant: FavouriteRestaurant,
      view,
    });
  },


};

export default Favourite;
