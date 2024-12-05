import Detail from '../views/pages/detail';
import RestaurantList from '../views/pages/restaurant-list';
import Favourite from '../views/pages/favourite';

const routes = {
  '/': RestaurantList, // default page
  '/restaurant-list': RestaurantList,
  '/detail/:id': Detail,
  '/favourite': Favourite,
};

export default routes;
