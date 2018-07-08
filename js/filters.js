'use strict';

(function () {

  var PRICE_TYPES = {
    MIDDLE: 'middle',
    LOW: 'low',
    HIGH: 'high'
  };

  var PRICE_VALUE = {
    PRICE_ONE: 10000,
    PRICE_TWO: 50000
  };

  var ANY = 'any';

  var filtresForm = document.querySelector('.map__filters');
  var housingTypeField = filtresForm.querySelector('#housing-type');
  var housingPriceField = filtresForm.querySelector('#housing-price');
  var housingRoomsField = filtresForm.querySelector('#housing-rooms');
  var housingGuestsField = filtresForm.querySelector('#housing-guests');
  var feauturesList = filtresForm.querySelectorAll('input[name="features"]');

  var compareFiltres = function (filterValue, compareValue) {
    return filterValue === ANY || compareValue === filterValue;
  };

  var compareByPrice = function (filterValue, offerPrice) {
    switch (filterValue) {
      case PRICE_TYPES.MIDDLE:
        return offerPrice >= PRICE_VALUE.PRICE_ONE && offerPrice < PRICE_VALUE.PRICE_TWO;
      case PRICE_TYPES.LOW:
        return offerPrice < PRICE_VALUE.PRICE_ONE;
      case PRICE_TYPES.HIGH:
        return offerPrice >= PRICE_VALUE.PRICE_TWO;
      default:
        return true;
    }
  };

  var compareByFeatures = function (filteredFetures, comparedValues) {
    for (var i = 0; i < filteredFetures.length; i++) {
      if (!comparedValues.includes(filteredFetures[i])) {
        return false;
      }
    }
    return true;
  };

  var setFiltres = function () {
    var feauturesArr = Array.from(feauturesList);
    var selectedFeautures = feauturesArr.filter(function (it) {
      return it.checked;
    }).map(function (it) {
      return it.value;
    });

    return window.globalVar.allLoadedPins.filter(function (it) {

      if (!compareFiltres(housingTypeField.value, it.offer.type)) {
        return false;
      }

      if (!compareFiltres(housingRoomsField.value, it.offer.rooms.toString())) {
        return false;
      }

      if (!compareFiltres(housingGuestsField.value, it.offer.guests.toString())) {
        return false;
      }

      if (!compareByPrice(housingPriceField.value, it.offer.price)) {
        return false;
      }

      if (!compareByFeatures(selectedFeautures, it.offer.features)) {
        return false;
      }

      return true;
    });
  };

  var filtresFormChangeHandler = window.debounce(function () {
    window.createCards.mapCardRemove();
    window.createPins.removeMapPins();
    var filterPins = setFiltres();
    filterPins.splice(window.globalVar.CUT_START, window.globalVar.CUT_QUANTITY);
    window.createPins.renderMapPins(filterPins);
  });

  filtresForm.addEventListener('change', filtresFormChangeHandler);

})();
