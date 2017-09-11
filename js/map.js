'use strict';

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var numberOfAvatar = [1, 2, 3, 4, 5, 6, 7, 8];
var titles = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var typeMaps = {
  flat: 'Квартира',
  bungalo: 'Бунгало',
  house: 'Дом'
};
var checkinAndOut = ['12:00', '13:00', '14:00'];
var allFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

shuffleArray(numberOfAvatar);
shuffleArray(titles);


function getSimilarAds() {
  var similarAds = [];
  var xCoordinate;
  var yCoordinate;

  for (var i = 0; i < 8; i++) {
    xCoordinate = getRandomInt(300, 900);
    yCoordinate = getRandomInt(100, 500);

    similarAds[i] = {
      author: {
        avatar: 'img/avatars/user0' + (numberOfAvatar[i]) + '.png'
      },
      offer: {
        title: titles[i],
        address: xCoordinate + ', ' + yCoordinate,
        price: getRandomInt(1000, 1000000),
        type: typeMaps[getRandomInt(0, typeMaps.length - 1)],
        rooms: getRandomInt(1, 5),
        guests: getRandomInt(1, 100),
        checkin: checkinAndOut[getRandomInt(0, checkinAndOut.length - 1)],
        checkout: checkinAndOut[getRandomInt(0, checkinAndOut.length - 1)],
        features: shuffleArray(allFeatures).slice(0, getRandomInt(1, allFeatures.length)),
        description: '',
        photos: []
      },
      location: {
        x: xCoordinate,
        y: yCoordinate
      }
    };
  }
  return similarAds;
}

function createPinsMap(ads) {

  var tokyoPinMap = document.querySelector('.tokyo__pin-map');
  var mapItems = document.createDocumentFragment();

  for (var i = 0; i < ads.length; i++) {
    var div = document.createElement('div');
    div.classList.add('pin');
    div.style.left = ads[i].location.x + 20 + 'px';
    div.style.top = ads[i].location.y + 44 + 'px';
    var img = document.createElement('img');
    img.src = ads[i].author.avatar;
    img.classList.add('rounded');
    img.setAttribute('tabindex', '0');
    img.width = 40;
    img.height = 40;
    div.appendChild(img);
    div.setAttribute('data-index', 'i');

    mapItems.appendChild(div);
  }

  tokyoPinMap.appendChild(mapItems);
}

var allAds = getSimilarAds();
createPinsMap(allAds);

function renderAdd(item) {
  var lodgeTemplate = document.querySelector('#lodge-template').content;
  var adElement = lodgeTemplate.cloneNode(true);

  adElement.querySelector('.lodge__title').textContent = allAds[item].offer.title;
  adElement.querySelector('.lodge__address').textContent = allAds[item].offer.address;
  adElement.querySelector('.lodge__price').textContent = allAds[item].offer.price + '\u20BD/ночь';
  adElement.querySelector('.lodge__type').textContent = typeMaps[allAds[item].offer.type];
  adElement.querySelector('.lodge__rooms-and-guests').textContent = 'Для ' + allAds[item].offer.guests + ' гостей в ' + allAds[item].offer.rooms + ' комнатах';
  adElement.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + allAds[item].offer.checkin + ', выезд до ' + allAds[item].offer.checkout;
  var featuresHtml = '';
  for (var j = 0; j < allAds[item].offer.features.length; j++) {
    featuresHtml += '<span class="feature__image  feature__image--' + allAds[item].offer.features[j] + '"></span>';
  }
  adElement.querySelector('.lodge__features').innerHTML = featuresHtml;
  adElement.querySelector('.lodge__description').textContent = allAds[item].offer.description;
  document.querySelector('.dialog__title img').src = allAds[item].author.avatar;
  return adElement;
}

var offerDialog = document.querySelector('#offer-dialog');
offerDialog.replaceChild(renderAdd(0), offerDialog.querySelector('.dialog__panel'));

var tokioPins = document.querySelector('.tokyo__pin-map');

var onEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    offerDialog.classList.add('hidden');
  }
};

document.addEventListener('keydown', onEscPress);

var closeDialog = function () {
  offerDialog.classList.add('hidden');
};

var onCrossPress = function () {
  closeDialog();
  delActivePin();
};

var dialogClose = offerDialog.querySelector('.dialog__close');
dialogClose.addEventListener('click', onCrossPress);

var changeActivePins = function (item) {
  var pinActive = tokioPins.querySelector('.pin--active');
  if (pinActive !== null) {
    pinActive.classList.remove('pin--active');
  }
  item.classList.add('pin--active');
};

var delActivePin = function () {
  var pinActive = tokioPins.querySelector('.pin--active');
  if (pinActive !== null) {
    pinActive.classList.remove('pin--active');
  }
};

var openDialog = function (evt) {
  var indexPin = evt.currentTarget.getAttribute('data-index');
  offerDialog.replaceChild(renderAdd(indexPin), offerDialog.querySelector('.dialog__panel'));
  var containHidden = offerDialog.classList.contains('hidden');
  if (containHidden !== null) {
    offerDialog.classList.remove('hidden');
  }
};

var pins = tokioPins.querySelectorAll('.pin');
changeActivePins(pins[0]);
for (var i = 0; i <= 8; i++) {

  pins[i].addEventListener('click', function (evt) {
    changeActivePins(evt.currentTarget);
    openDialog(evt);
  });

  pins[i].addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      changeActivePins(evt.currentTarget);
      openDialog(evt);
    }
  });
}
