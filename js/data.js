'use strict';

(function () {

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

  var ads = [];

  var getRandomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  var getRandomCountFromCollection = function (count, collection) {
    var result = [];
    for (var i = 0; i < count; i++) {
      result.push(collection[i]);
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
          'avatar': AVATAR_PATH + getPathAvatar(a) + AVATAR_EXT,
        },

        'location': {
          'x': locationX,
          'y': locationY
        },

        'offer': {
          'title': TITLES[a],
          'address': locationX + ', ' + locationY,
          'price': getRandomInt(1000, 1000000),
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

  window.data = {
    allAds: createArray()
  };

})();

