import FavouriteRestaurant from '../../data/favourite-restaurant';
import FavoriteRestaurantSearchView from './favourited-restaurant/favourite-restaurant-search-view';

const Favourite = {
  async render() {
    return `
      <div class="content">
        <div id="restaurant-search-container">
        <h2 class="content__heading">Your Favourite Restaurants</h2>
          <input id="query" type="text" placeholder="Cari restaurant...">
        </div>
        <div id="restaurants" class="restaurants"></div>
      </div>
    `;
  },


  // async afterRender() {
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
    const restaurants = await FavouriteRestaurant.getAllRestaurants();
    const view = new FavoriteRestaurantSearchView({
      favoriteRestaurants: FavouriteRestaurant,
      view: FavoriteRestaurantSearchView,
    });
    view.showRestaurant(restaurants);
  },


};

export default Favourite;
