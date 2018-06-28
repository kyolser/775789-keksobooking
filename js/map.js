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

var DEFAUTL_SELECTED_ROOM = '1';

var AVATAR_PATH = 'img/avatars/user0';
var AVATAR_EXT = '.png';

var KEY_ESCAPE = 'Escape';

var AppartmentTypes = {
  house: 'Дом',
  bungalo: 'Бунгало',
  palace: 'Дворец',
  flat: 'Квартира'
};

var RoomsCapacity = {
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3'],
  '100': ['0']
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

var documentKeydownHandler = function (evt) {
  if (evt.key === KEY_ESCAPE) {
    mapCardRemove();
    document.removeEventListener('keydown', documentKeydownHandler);
  }
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

  var cross = mapMarkElement.querySelector('.popup__close');
  cross.addEventListener('click', mapCardRemove);

  document.addEventListener('keydown', documentKeydownHandler);

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


/* --------------------------------------------*/
var fieldsetNodeList = document.querySelectorAll('fieldset');
var fieldsetArray = Array.from(fieldsetNodeList);

var setDisabled = function () {
  for (var field = 0; field < fieldsetArray.length; field++) {
    fieldsetArray[field].setAttribute('disabled', true);
  }
};
setDisabled();

var removeDisabled = function () {
  for (var field = 0; field < fieldsetArray.length; field++) {
    fieldsetArray[field].removeAttribute('disabled', true);
  }
};

var form = document.querySelector('.ad-form');
var formAdress = document.querySelector('#address');
var mapPinMain = document.querySelector('.map__pin--main');

var startWork = function () {
  mapBlock.classList.remove('map--faded');
  form.classList.remove('ad-form--disabled');
  renderMapPins(allAds);
  setEventPins();
  removeDisabled();
};


var setEventPins = function () {

  var mainPin = document.querySelector('.map__pin--main');
  var mainPinLeft = parseFloat(mainPin.style.left);
  var mainPinTop = parseFloat(mainPin.style.top);
  formAdress.value = mainPinLeft + ', ' + mainPinTop;

};

var mapCardRemove = function () {
  var mapCard = document.querySelector('.map__card');
  mapCard.parentNode.removeChild(mapCard);
};

mapPinMain.addEventListener('click', startWork);

/* ---------------------------------------------------------*/

var selectType = document.querySelector('#type');
var inputPrice = document.querySelector('#price');
var selectTimeIn = document.querySelector('#timein');
var selectTimeOut = document.querySelector('#timeout');
var selectRoomNumber = document.querySelector('#room_number');
var selectCapacity = document.querySelector('#capacity');
var capacityOptions = selectCapacity.querySelectorAll('option');


var validateForm = function () {
  selectType.addEventListener('change', function () {
    if (selectType.value === 'bungalo') {
      inputPrice.setAttribute('placeholder', 0);
      inputPrice.setAttribute('min', 0);
    } else if (selectType.value === 'flat') {
      inputPrice.setAttribute('placeholder', 1000);
      inputPrice.setAttribute('min', 1000);
    } else if (selectType.value === 'house') {
      inputPrice.setAttribute('placeholder', 5000);
      inputPrice.setAttribute('min', 5000);
    } else if (selectType.value === 'palace') {
      inputPrice.setAttribute('placeholder', 10000);
      inputPrice.setAttribute('min', 10000);
    }
  });

  selectTimeIn.addEventListener('change', function () {
    selectTimeOut.value = selectTimeIn.value;
  });

  selectTimeOut.addEventListener('change', function () {
    selectTimeIn.value = selectTimeOut.value;
  });


  var setCapacity = function (selectedValue) {
    for (var i = 0; i < capacityOptions.length; i++) {
      capacityOptions[i].disabled = !RoomsCapacity[selectedValue].includes(capacityOptions[i].value);
    }

    if (selectCapacity.options[selectCapacity.selectedIndex].disabled) {
      selectCapacity.value = RoomsCapacity[selectedValue][0];
    }
  };

  var setCapacityHandler = function (evt) {
    setCapacity(evt.currentTarget.value);
  };

  selectRoomNumber.addEventListener('change', setCapacityHandler);

  setCapacity(DEFAUTL_SELECTED_ROOM);


};


validateForm();
