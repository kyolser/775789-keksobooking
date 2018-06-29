'use strict';

(function () {

  var AppartmentTypes = {
    house: 'Дом',
    bungalo: 'Бунгало',
    palace: 'Дворец',
    flat: 'Квартира'
  };

  window.renderMapMark = function (adsOffer) {
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

}());
