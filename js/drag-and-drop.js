'use strict';

(function () {

  var MAP_PIN_MAIN_HEIGHT = 80;
  var MAP_PIN_MAIN_WIDTH = 64;

  var MAP_HEIGHT = 600;
  var MAP_WIDTH = 1140;


  var formAdress = document.querySelector('#address');

  window.globalVar.mapPinMain.addEventListener('mousedown', function (evt) {

    window.startWork();

    evt.preventDefault();
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
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

      formAdress.value = (mapPinMainTop + MAP_PIN_MAIN_HEIGHT) + ', ' + (mapPinMainLeft + (MAP_PIN_MAIN_WIDTH / 2));

      if (mapPinMainTop <= 0) {
        window.globalVar.mapPinMain.style.top = 0;
      } else if (mapPinMainTop >= MAP_HEIGHT) {
        window.globalVar.mapPinMain.style.top = MAP_HEIGHT + 'px';
      }
      if (mapPinMainLeft <= 0) {
        window.globalVar.mapPinMain.style.left = 0;
      } else if (mapPinMainLeft >= MAP_WIDTH) {
        window.globalVar.mapPinMain.style.left = MAP_WIDTH + 'px';
      }
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

}());
