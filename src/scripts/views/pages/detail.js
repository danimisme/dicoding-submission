import RestaurantSource from '../../data/restaurant-source';
import UrlParser from '../../routes/url-parser';
import FavouriteButtonInitiator from '../../utils/favourite-button-initiator';
import { createRestaurantDetailTemplate } from '../templates/template-creator';

const Detail = {
  async render() {
    return `
      <div id="restaurant" class="restaurant"></div>
      <div id="favouriteButtonContainer"></div>
    `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const restaurant = await RestaurantSource.detailRestaurant(url.id);
    const restaurantContainer = document.querySelector('#restaurant');
    restaurantContainer.innerHTML = createRestaurantDetailTemplate(restaurant);

    FavouriteButtonInitiator.init({
      favouriteButtonContainer: document.querySelector('#favouriteButtonContainer'),
      restaurant: {
        id: restaurant.id,
        city: restaurant.city,
        name: restaurant.name,
        description: restaurant.description,
        pictureId: restaurant.pictureId,
        rating: restaurant.rating,
      },
    });

    // Handle form submission
    const reviewForm = document.querySelector('#addReviewForm');
    reviewForm.addEventListener('submit', async (event) => {
      event.preventDefault(); // Prevent default form submission behavior

      const reviewerName = document.querySelector('#reviewerName').value;
      const reviewText = document.querySelector('#reviewText').value;

      const newReview = {
        id: url.id,
        name: reviewerName,
        review: reviewText,
      };

      try {
        // Send new review to backend
        await RestaurantSource.addReview(newReview);

        // Update review list on the page
        const reviewList = document.querySelector('.restaurant__review');
        reviewList.innerHTML += `
          <div class="review">
            <p class="review__name">${reviewerName} , Baru saja</p>
            <p>${reviewText}</p>
          </div>
        `;
        // Reset the form
        reviewForm.reset();
      } catch (error) {
        console.error('Failed to submit review:', error);
        alert('Failed to submit your review. Please try again.');
      }
    });
  },
};

export default Detail;
