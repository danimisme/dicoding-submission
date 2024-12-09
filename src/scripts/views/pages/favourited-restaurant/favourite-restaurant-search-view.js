import { createRestaurantItemTemplate } from "../../templates/template-creator";

class FavoriteRestaurantSearchView {
  getTemplate() {
    return `
      <div class="content">
        <div id="restaurant-search-container">
          <h2 class="content__heading">Restaurant List</h2>
          <input id="query" type="text" placeholder="Search for a restaurant...">
        </div>
        <div id="restaurants" class="restaurants"></div>
      </div>
    `
  }

  getFavoriteRestaurantTemplate() {
    return `
      <div class="content">
        <h2 class="content__heading">Your Liked Restaurant</h2>
        <div id="restaurants" class="restaurants">
        </div>
      </div>
    `;
  }

  runWhenUserIsSearching(callback) {
    document.getElementById('query').addEventListener('change', (event) => {
      callback(event.target.value);
    });
  }

  showRestaurant(restaurants) {
    let html;
    if (!restaurants || !Array.isArray(restaurants)) {
      restaurants = []; 
    }
    if (restaurants.length > 0) {
      html = restaurants.reduce((carry, restaurant) => carry.concat(createRestaurantItemTemplate(restaurant)), ''
      );
    } else {
      html = `
        <div class="restaurant-item__not__found">
          <p>Tidak ada restoran untuk ditampilkan</p>
        </div>
      `;
    }

    document.querySelector('#restaurants').innerHTML = html;

    document
    // .getElementById('restaurant-search-container')
    .getElementById('restaurants')
    .dispatchEvent(new Event('restaurants:searched:updated'));
  }
}

export default FavoriteRestaurantSearchView;