'use strict';

(function () {

  var DEFAUTL_SELECTED_ROOM = '1';

  var RoomsCapacity = {
    '1': ['1'],
    '2': ['1', '2'],
    '3': ['1', '2', '3'],
    '100': ['0']
  };

  var selectType = document.querySelector('#type');
  var inputPrice = document.querySelector('#price');
  var selectTimeIn = document.querySelector('#timein');
  var selectTimeOut = document.querySelector('#timeout');
  var selectRoomNumber = document.querySelector('#room_number');
  var selectCapacity = document.querySelector('#capacity');
  var capacityOptions = selectCapacity.querySelectorAll('option');

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
}());
