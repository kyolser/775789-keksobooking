'use strict';

var startWork = function () {
  renderMapPins(allAds);
  mapBlock.classList.remove('map--faded');
  form.classList.remove('ad-form--disabled');
  for (var field = 0; field < fieldsetArray.length; field++) {
    fieldsetArray[field].removeAttribute('disabled', true);
  }
};
