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

  var cross = mapMarkElement.querySelector('.popup__close');
  cross.addEventListener('click', mapCardRemove);

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

var pinsArray;
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

var setCoords = function () {
  var mainPinLeft = parseFloat(this.style.left);
  var mainPinTop = parseFloat(this.style.top);
  formAdress.value = mainPinLeft + ', ' + mainPinTop;
};

var setEventPins = function () {
  var pinsNodeList = document.querySelectorAll('.map__pin');
  pinsArray = Array.from(pinsNodeList);
  for (var j = 0; j < pinsArray.length; j++) {
    pinsArray[j].addEventListener('click', setCoords);
  }
};

var mapCardRemove = function () {
  var mapCard = document.querySelector('.map__card');
  mapCard.parentNode.removeChild(mapCard);

};

var closeCard = function () {
  var crossNodeList = document.querySelectorAll('.popup__close');
  var crossArray = Array.from(crossNodeList);
  for (var cross = 0; cross < crossArray.length; cross++) {
    crossArray[cross].addEventListener('click', mapCardRemove);
  }
};

mapPinMain.addEventListener('click', startWork);

/*---------------------------------------------------------*/

var selectType = document.querySelector('#type');
var inputPrice = document.querySelector('#price');
var selectTimeIn = document.querySelector('#timein');
var selectTimeOut = document.querySelector('#timeout');
var selectRoomNumber = document.querySelector('#room_number');
var selectCapacity = document.querySelector('#capacity');
var optionsCapacity = selectCapacity.querySelectorAll('option')
var mainForm = document.querySelector('.ad-form');

var validateForm = function() {
  selectType.addEventListener('change', function (evt) {
    if (selectType.value == 'bungalo') {
      inputPrice.setAttribute('placeholder', 0)
      inputPrice.setAttribute('minlength', 0)
    } else if (selectType.value == 'flat') {
      inputPrice.setAttribute('placeholder', 1000)
      inputPrice.setAttribute('minlength', 1000)
    } else if (selectType.value == 'house') {
      inputPrice.setAttribute('placeholder', 5000)
      inputPrice.setAttribute('minlength', 5000)
    } else if (selectType.value == 'palace') {
      inputPrice.setAttribute('placeholder', 10000)
      inputPrice.setAttribute('minlength', 10000)
    }
  });

  selectTimeIn.addEventListener('change', function (evt) {
    selectTimeOut.value = selectTimeIn.value
  });

  selectTimeOut.addEventListener('change', function (evt) {
    selectTimeIn.value = selectTimeOut.value
  });

/*  selectRoomNumber.addEventListener('change', function (evt) {
   for (var i = 0; i < optionsCapacity.length; i++) {
    optionsCapacity[i].setAttribute('disabled', true)
  }
  if (selectRoomNumber.value == '1') {
    selectCapacity.value == "1"
  } else if (selectRoomNumber.value == '2'){
   selectCapacity.value == "2"
 } else if (selectRoomNumber.value == '3'){
   selectCapacity.value == "3"
 } else if (selectRoomNumber.value == '100'){
   selectCapacity.value == "0"
 }
})*/




}

/*mainForm.addEventListener()*/

validateForm()
