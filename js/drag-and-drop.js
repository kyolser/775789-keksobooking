'use strict';

(function () {

  var MAP_PIN_MAIN_HEIGHT = 80;
  var MAP_PIN_MAIN_WIDTH = 64;

  var MAP_HEIGHT = 630;
  var MAP_HEIGHT_MIN = 60;
  var MAP_WIDTH = document.querySelector('.map__pins').offsetWidth - MAP_PIN_MAIN_WIDTH;

  window.globalVar.mapPinMain.addEventListener('mousedown', function (evt) {

    if (window.globalVar.marker) {
      window.startWork();
      window.globalVar.marker = false;
    }

    evt.preventDefault();
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var documentMouseMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var mapPinMainTop = window.globalVar.mapPinMain.offsetTop - shift.y;
      var mapPinMainLeft = window.globalVar.mapPinMain.offsetLeft - shift.x;
      window.globalVar.mapPinMain.style.top = mapPinMainTop + 'px';
      window.globalVar.mapPinMain.style.left = mapPinMainLeft + 'px';

      window.globalVar.formAdress.value = (mapPinMainTop + MAP_PIN_MAIN_HEIGHT) + ', ' + (mapPinMainLeft + (MAP_PIN_MAIN_WIDTH / 2));

      if (mapPinMainTop <= MAP_HEIGHT_MIN) {
        window.globalVar.mapPinMain.style.top = MAP_HEIGHT_MIN + 'px';
      } else if (mapPinMainTop >= MAP_HEIGHT) {
        window.globalVar.mapPinMain.style.top = MAP_HEIGHT + 'px';
      }
      if (mapPinMainLeft <= 0) {
        window.globalVar.mapPinMain.style.left = 0;
      } else if (mapPinMainLeft >= MAP_WIDTH) {
        window.globalVar.mapPinMain.style.left = MAP_WIDTH + 'px';
      }
    };

    var documentMouseUpHandler = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', documentMouseMoveHandler);
      document.removeEventListener('mouseup', documentMouseUpHandler);
    };

    document.addEventListener('mousemove', documentMouseMoveHandler);
    document.addEventListener('mouseup', documentMouseUpHandler);
  });

}());
