'use strict';

(function () {

  var ANY = 'any';


  var mapPins = window.globalVar.mapBlock.querySelector('.map__pins');

  var renderMapPins = function (adsObjects) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < adsObjects.length; i++) {
      var pin = window.globalVar.mapMarkTemp.querySelector('.map__pin').cloneNode(true);
      pin.style.left = adsObjects[i].location.x + 'px';
      pin.style.top = adsObjects[i].location.y + 'px';
      pin.querySelector('img').src = adsObjects[i].author.avatar;
      pin.addEventListener('click', window.createCards.pinClickHandler.bind(undefined, adsObjects[i]));
      fragment.appendChild(pin);
    }
    mapPins.appendChild(fragment);
  };

  var removeMapPins = function () {
    var mapPinsChildren = mapPins.children;
    for (var children = mapPinsChildren.length - 1; children >= 0; children--) {
      mapPins.removeChild(mapPinsChildren[children]);
    }
  };


  var renderMapPinsFilter = function (adsObjects) {

    var mapFilters = document.querySelector('.map__filters');
    var housingType = mapFilters.querySelector('#housing-type');
    var adsObjectsType;
    var housingPrice = mapFilters.querySelector('#housing-price');
    var adsObjectsPrice;
    var housingRooms = mapFilters.querySelector('#housing-rooms');
    var adsObjectsRooms;
    var housingGuests = mapFilters.querySelector('#housing-guests');
    var adsObjectsGuests;

    var allPisData = [];

    housingType.addEventListener('change', function () {
      if (housingType.value === ANY) {
        adsObjectsType = adsObjects;
      } else {
        adsObjectsType = adsObjects.filter(function (type) {
          return type.offer.type === housingType.value;
        });
      }

      removeMapPins()
      renderMapPins(adsObjectsType)

    });

    housingPrice.addEventListener('change', function () {
      if (housingPrice.value === ANY) {
        adsObjectsPrice = adsObjects;
      } else {
        adsObjectsPrice = adsObjects.filter(function (price) {
          if (housingPrice.value === 'middle') {
            return price.offer.price > 10000 && price.offer.price < 50000;
          } else if (housingPrice.value === 'low') {
            return price.offer.price < 10000;
          } else if (housingPrice.value === 'high') {
            return price.offer.price > 50000;
          }
        });
      }

      removeMapPins()
      renderMapPins(adsObjectsPrice);


    });

    housingRooms.addEventListener('change', function () {
      if (housingRooms.value === ANY) {
        adsObjectsRooms = adsObjects;
      } else {
        adsObjectsRooms = adsObjects.filter(function (rooms) {
          return rooms.offer.rooms == housingRooms.value;
        });
      }
      removeMapPins()
      renderMapPins(adsObjectsRooms);


    });

    housingGuests.addEventListener('change', function () {
      if (housingGuests.value === ANY) {
        adsObjectsGuests = adsObjects;
      } else {
        adsObjectsGuests = adsObjects.filter(function (guests) {
          return guests.offer.guests == housingGuests.value;
        });
      }
      removeMapPins()
      renderMapPins(adsObjectsGuests);


    });





    /*   var housingFeatures = mapFilters.querySelector('#housing-features');
    var housingFeaturesInputs = Array.from(housingFeatures.querySelectorAll('input'));
    var adsObjectsFeaturesOfElem = [];
    var adsObjectsFeatures;
    var adsObjectsFeaturesFilter;

    for (var t = 0; t < adsObjects.length; t++) {
      adsObjectsFeaturesOfElem[t] = adsObjects[t].offer.features;
    }


    housingFeaturesInputs.forEach(function (featuresInputElem) {
      featuresInputElem.addEventListener('change', function (evt) {
        if (evt.target.checked) {
          for (var y = 0; y < adsObjectsFeaturesOfElem.length; y++) {
            console.log(adsObjectsFeaturesOfElem[y]);
          }
        }
      });
    });*/


  };


  window.renderMapPins = renderMapPins;
  window.renderMapPinsFilter = renderMapPinsFilter;


}());


