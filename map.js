'use strict';

var mapBlock = document.querySelector('.map');
mapBlock.classList.remove('map--faded');

var ads = [];

var createArray = function () {

  var locationX, locationY;
  var title = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var type = ['palace', 'flat', 'house', 'bungalo'];
  var checkin = ['12:00', '13:00', '14:00'];
  var checkout = ['12:00', '13:00', '14:00'];


  for (var a = 0; a < 8; a++) {
    locationX = Math.floor(Math.random() * (900 - 300 + 1)) + 300;
    locationY = Math.floor(Math.random() * (630 - 130 + 1)) + 130;

    var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
    var featuresShuffle = function (array) {
      var featuresNum1 = Math.floor(Math.random() * (5 - 1 + 1)) + 1;
      var featuresNum2 = Math.floor(Math.random() * (5 - 1 + 1)) + 1;
      array.splice(featuresNum1, featuresNum2);
      return array;
    };

    var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
    var photoShuffle = function (array) {
      var currentIndex = array.length, temporaryValue, randomIndex;
      while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }
      return array;
    };

    ads[a] = {
      'author': {
        'avatar': 'img/avatars/user0' + (a + 1) + '.png',
      },

      'location': {
        'x': locationX,
        'y': locationY
      },

      'offer': {
        'title': title[a],
        'address': locationX + ', ' + locationY,
        'price': Math.floor(Math.random() * (1000000 - 1000 + 1)) + 1,
        'type': type[Math.floor(Math.random() * type.length)],
        'rooms': Math.floor(Math.random() * (5 - 1 + 1)) + 1,
        'guests': Math.floor(Math.random() * (5 - 1 + 1)) + 1,
        'checkin': checkin[Math.floor(Math.random() * checkin.length)],
        'checkout': checkout[Math.floor(Math.random() * checkout.length)],
        'features': featuresShuffle(features),
        'description': ' ',
        'photos': photoShuffle(photos)
      }
    };
  }
};
createArray();

var type;
var features;
var featuresNew = [];
var photosNew = [];

var mapMarkTemp = document.querySelector('.temp').content.querySelector('.map__card');
var renderMapMark = function () {
  var mapMarkElement = mapMarkTemp.cloneNode(true);
  mapMarkElement.querySelector('img').src = ads[i].author.avatar;
  mapMarkElement.querySelector('.popup__title').textContent = ads[i].offer.title;
  mapMarkElement.querySelector('.popup__text--address').textContent = ads[i].offer.address;
  mapMarkElement.querySelector('.popup__text--price').textContent = ads[i].offer.price + ' р/ночь';
  switch (ads[i].offer.type) {
    case 'palace':
      type = 'Дворец';
      break;
    case 'flat':
      type = 'Квартира';
      break;
    case 'house':
      type = 'Дом';
      break;
    case 'bungalo':
      type = 'Бунгало';
      break;
  }
  mapMarkElement.querySelector('.popup__type').textContent = type;
  mapMarkElement.querySelector('.popup__text--capacity').textContent = ads[i].offer.rooms + ' комнаты для ' + ads[i].offer.guests + ' гостей';
  mapMarkElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + ads[i].offer.checkin + ' выезд до ' + ads[i].offer.checkout;
  for (var j = 0; j < ads[i].offer.features.length; j++) {
    featuresNew[j] = '<li class="popup__feature popup__feature--' + ads[i].offer.features[j] + '"></li>';
  }
  mapMarkElement.querySelector('.popup__features').innerHTML = featuresNew.join('');
  mapMarkElement.querySelector('.popup__description').textContent = ads[i].offer.description;
  for (var p = 0; p < ads[i].offer.photos.length; p++) {
    photosNew[p] = '<img src="' + ads[i].offer.photos[p] + '" class="popup__photo" width="45" height="40" alt="Фотография жилья">';
  }
  mapMarkElement.querySelector('.popup__photos').innerHTML = photosNew.join('');
  return mapMarkElement;
};

var renderMapPin = function () {
  var pin = document.querySelector('.map__pin').cloneNode(true);
  pin.style.left = ads[i].location.x + 'px';
  pin.style.top = ads[i].location.y + 'px';
  pin.querySelector('img').src = ads[i].author.avatar;
  return pin;
};

var fragment = document.createDocumentFragment();

for (var i = 0; i < ads.length; i++) {
  fragment.appendChild(renderMapMark(ads[i]));
  fragment.appendChild(renderMapPin(ads[i]));
}

var mapPins = document.querySelector('.map__pins');
mapPins.appendChild(fragment);
