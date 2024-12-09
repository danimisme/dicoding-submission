Feature('Favourite Restaurant');

Before(({ I }) => {
  I.amOnPage('/#/favourite');
});

Scenario('test something', ({ I }) => {
  I.seeElement('#query');
  I.see('Tidak ada restoran untuk ditampilkan', '.restaurant-item__not__found');
});