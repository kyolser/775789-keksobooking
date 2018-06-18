'use strict';

var TITLES = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];

var TYPES = [
  'palace',
  'flat',
  'house',
  'bungalo'
];

var CHECKIN = [
  '12:00',
  '13:00',
  '14:00'
];

var CHECKOUT = [
  '12:00',
  '13:00',
  '14:00'
];

var PIN_COUNT = 8;
var FEAUTURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

var PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

var AVATAR_PATH = 'img/avatars/user0';
var AVATAR_EXT = '.png';

var AppartmentTypes = {
  house: 'Дом',
  bungalo: 'Бунгало',
  palace: 'Дворец',
  flat: 'Квартира'
};

var mapBlock = document.querySelector('.map');
var mapMarkTemp = document.querySelector('.temp').content;
var mapPins = mapBlock.querySelector('.map__pins');
var ads = [];

var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

var getRandomCountFromCollection = function (count, collection) {
  var result = [];
  for (var i = 0; i < count; i++) {
    result.push(collection[i]);
    // я решил поставить сюда collection[i] тогда получится что масиив будет тот же самый, но разной длинны и без повторов.
  }
  return result;
};

function shuffle(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[j];
    array[j] = array[i];
    array[i] = temp;
  }
  return array;
}

function getPathAvatar(number) {
  number += 1;
  return number;
}

var createArray = function () {
  for (var a = 0; a < PIN_COUNT; a++) {
    var locationX = getRandomInt(900, 300);
    var locationY = Math.floor(Math.random() * (630 - 130 + 1)) + 130;


    ads[a] = {
      'author': {
        'avatar': AVATAR_PATH + getPathAvatar(a) + AVATAR_EXT, // TODO. Вынести в отдельную функцию. getPathAvatar(i+1)
      },

      'location': {
        'x': locationX,
        'y': locationY
      },

      'offer': {
        'title': TITLES[a],
        'address': locationX + ', ' + locationY,
        'price': getRandomInt(1000, 1000000), // TODO. Пересмотреть аналогичные участки, перенсти на getRandomInt
        'type': TYPES[Math.floor(Math.random() * TYPES.length)],
        'rooms': Math.floor(Math.random() * (5 - 1 + 1)) + 1,
        'guests': Math.floor(Math.random() * (5 - 1 + 1)) + 1,
        'checkin': CHECKIN[Math.floor(Math.random() * CHECKIN.length)],
        'checkout': CHECKOUT[Math.floor(Math.random() * CHECKOUT.length)],
        'features': getRandomCountFromCollection(getRandomInt(0, 7), FEAUTURES),
        'description': ' ',
        'photos': shuffle(PHOTOS),
      }
    };
  }
  return ads;
};

var renderMapMark = function (adsOffer) {
  var mapMarkElement = mapMarkTemp.querySelector('.map__card').cloneNode(true);
  var featuresNew = [];
  var photosNew = [];
  mapMarkElement.querySelector('img').src = adsOffer.author.avatar;
  mapMarkElement.querySelector('.popup__title').textContent = adsOffer.offer.title;
  mapMarkElement.querySelector('.popup__text--address').textContent = adsOffer.offer.address;
  mapMarkElement.querySelector('.popup__text--price').textContent = adsOffer.offer.price + ' р/ночь';
  mapMarkElement.querySelector('.popup__type').textContent = AppartmentTypes[adsOffer.offer.type];
  mapMarkElement.querySelector('.popup__text--capacity').textContent = adsOffer.offer.rooms + ' комнаты для ' + adsOffer.offer.guests + ' гостей';
  mapMarkElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + adsOffer.offer.checkin + ' выезд до ' + adsOffer.offer.checkout;
  var popupFeautersElement = mapMarkElement.querySelector('.popup__features');
  for (var j = 0; j < adsOffer.offer.features.length; j++) {
    featuresNew[j] = '<li class="popup__feature popup__feature--' + adsOffer.offer.features[j] + '"></li>';
  }
  popupFeautersElement.innerHTML = featuresNew.join('');
  mapMarkElement.querySelector('.popup__description').textContent = adsOffer.offer.description;
  var popupPhotosElement = mapMarkElement.querySelector('.popup__photos');
  for (var p = 0; p < adsOffer.offer.photos.length; p++) {
    photosNew[p] = '<img src="' + adsOffer.offer.photos[p] + '" class="popup__photo" width="45" height="40" alt="Фотография жилья">';
  }
  popupPhotosElement.innerHTML = photosNew.join('');
  var existCard = mapBlock.querySelector('.map__card');
  if (existCard) {
    return mapBlock.replaceChild(mapMarkElement, existCard);
  }
  return mapBlock.appendChild(mapMarkElement);
};

var pinClickHandler = function (adsObject) {
  renderMapMark(adsObject);
};

var renderMapPins = function (adsObjects) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < adsObjects.length; i++) {
    var pin = mapMarkTemp.querySelector('.map__pin').cloneNode(true);
    pin.style.left = adsObjects[i].location.x + 'px';
    pin.style.top = adsObjects[i].location.y + 'px';
    pin.querySelector('img').src = adsObjects[i].author.avatar;
    pin.addEventListener('click', pinClickHandler.bind(undefined, adsObjects[i]));
    fragment.appendChild(pin);
  }
  mapPins.appendChild(fragment);
};

var allAds = createArray();
renderMapPins(allAds);
mapBlock.classList.remove('map--faded');
