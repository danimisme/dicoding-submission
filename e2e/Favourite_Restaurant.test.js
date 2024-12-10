const assert = require('assert');

Feature('Favourite Restaurant');

Before(({ I }) => {
  I.amOnPage('/#/favourite');
});

Scenario('showing empty favourite restaurants', ({ I }) => {
  I.seeElement('#query');
  I.see('Tidak ada restoran untuk ditampilkan', '.restaurant-item__not__found');
});

Scenario('add restaurant to favourite', async ({ I }) => {
  I.see('Tidak ada restoran untuk ditampilkan', '.restaurant-item__not__found');

  I.amOnPage('/');

  I.seeElement('.restaurant__name a');

  const firstRestaurant = locate('.restaurant__name a').first();
  const firstRestaurantName = await I.grabTextFrom(firstRestaurant);

  I.click(firstRestaurant);

  I.seeElement('#favouriteButton');
  I.click('#favouriteButton');

  I.amOnPage('/#/favourite');
  I.seeElement('.restaurant-item');

  const favouritedRestaurantName = await I.grabTextFrom('.restaurant__name');
  assert.strictEqual(firstRestaurantName, favouritedRestaurantName);
});

Scenario('searching restaurant', async ({ I }) => {
  I.see('Tidak ada restoran untuk ditampilkan', '.restaurant-item__not__found');

  I.amOnPage('/');

  I.seeElement('.restaurant__name a');

  const names =[];

  for (let i = 1 ; i <= 3 ; i++) {
    I.click(locate('.restaurant__name a').at(i));

    I.seeElement('#favouriteButton');
    I.click('#favouriteButton');
    // eslint-disable-next-line no-await-in-loop
    names.push(await I.grabTextFrom('.restaurant__name'));
    I.amOnPage('/');
  }

  I.amOnPage('/#/favourite');
  I.seeElement('#query');

  const visibleFavouritedRestaurant = await I.grabNumberOfVisibleElements('.restaurant-item');
  assert.strictEqual(names.length, visibleFavouritedRestaurant);

  const searchQuery = names[1].substring(1, 3);
  I.fillField('#query', searchQuery);
  I.pressKey('Enter');
  // mendapatkan daftar restaurant yang sesuai dengan searchQuery
  const matchingRestaurant = names.filter((title) => title.indexOf(searchQuery) !== -1);
  const visibleSearchedFavouritedRestaurant = await I.grabNumberOfVisibleElements('.restaurant-item');
  assert.strictEqual(matchingRestaurant.length, visibleSearchedFavouritedRestaurant);
  for (let i = 0; i < matchingRestaurant.length; i++) {
    // eslint-disable-next-line no-await-in-loop
    const visibleTitle = await I.grabTextFrom(locate('.restaurant__name').at(i + 1));
    assert.strictEqual(matchingRestaurant[i], visibleTitle);
  }
});
