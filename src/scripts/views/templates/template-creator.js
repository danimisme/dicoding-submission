import CONFIG from '../../globals/config';

const createRestaurantDetailTemplate = (restaurant) => `
  <h2 class="restaurant__title">${restaurant.name}</h2>
  <img class="restaurant__poster" src="${restaurant.pictureId ? `${CONFIG.BASE_IMAGE_URL}/medium/${restaurant.pictureId}` : 'https://picsum.photos/id/666/800/450?grayscale'}" alt="${restaurant.name}" />
  <div class="restaurant__info">
  <h3>Information</h3>
    <h4>Category</h4>
    <p>${restaurant.categories.map((category) => ` ${category.name}`)}</p>
    <h4>City</h4>
    <p>${restaurant.city}</p>
    <h4>Address</h4>
    <p>${restaurant.address} minutes</p>
    <h4>Rating</h4>
    <p>${restaurant.rating}</p>
  </div>
  <div class="restaurant__overview">
    <h3>Overview</h3>
    <p>${restaurant.description}</p>
    <div class="restaurant__menu">
      <h3>Menu</h3>
      <p> <b> Foods: </b>  ${restaurant.menus.foods.map((food) => ` ${food.name}`)}</p>
      <p> <b> Drinks: </b> ${restaurant.menus.drinks.map((drink) => ` ${drink.name}`)}</p>
    </div>
  </div>
  
  <div class="restaurant__review">
  <h3>Customer Review</h3>
  ${restaurant.customerReviews.map((review) => `
    <div class="review">
    <p class="review__name">${review.name} , ${review.date}</p>
    <p></p>
    <p>${review.review}</p>
    </div>
    `).join('')}
  </div>

  <div class="review-section">
  <h3 class="review-section-title">Add Your Review</h3>
  <form id="addReviewForm" class="form-container">
    <input 
      type="text" 
      id="reviewerName" 
      class="form-input" 
      name="name" 
      placeholder="Your Name" 
      required 
    />
    <textarea 
      id="reviewText" 
      class="form-textarea" 
      name="review" 
      placeholder="Write your review..." 
      required
    ></textarea>
    <button type="submit" class="form-submit">Submit Review</button>
  </form>
</div>

  
`;

const createRestaurantItemTemplate = (restaurant) => `
  <div class="restaurant-item">
    <div class="restaurant-item__header">
      <img class="restaurant-item__header__poster" alt="${restaurant.name}"
           src="${restaurant.pictureId ? `${CONFIG.BASE_IMAGE_URL}/medium/${restaurant.pictureId}` : 'https://picsum.photos/id/666/800/450?grayscale'}">
      <div class="restaurant-item__header__rating">
        <p>⭐️<span class="restaurant-item__header__rating__score">${restaurant.rating}</span></p>
      </div>
    </div>
    <p class="restaurant-item__city">${restaurant.city}</p>
    <div class="restaurant-item__content">
      <h3><a href="/#/detail/${restaurant.id}">${restaurant.name}</a></h3>
      <p>${restaurant.description.substring(0, 50)} ...</p>
    </div>
  </div>
`;

const createFavouriteButtonTemplate = () => `
  <button aria-label="favourite this restaurant" id="favouriteButton" class="favourite">
    <i class="fa fa-heart-o" aria-hidden="true"></i>
  </button>
`;

const createFavouritedButtonTemplate = () => `
  <button aria-label="unfavourite this restaurant" id="favouriteButton" class="favourite">
    <i class="fa fa-heart" aria-hidden="true"></i>
  </button>
`;

export {
  createRestaurantItemTemplate,
  createRestaurantDetailTemplate,
  createFavouriteButtonTemplate,
  createFavouritedButtonTemplate,
};
