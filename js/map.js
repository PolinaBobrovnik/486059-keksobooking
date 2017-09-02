'use strict';

var pinMapElement = document.querySelector('.tokyo__pin-map');

var numberOfAvatar = [1, 2, 3, 4, 5, 6, 7, 8];
var titles = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var types = ['flat', 'house', 'bungalo'];
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
};

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

shuffleArray(numberOfAvatar);
shuffleArray(titles);

var similarAds = [];

var xCoordinate;
var yCoordinate;

for (var i = 0; i < 8; i++) {
  xCoordinate = getRandomInt(300, 600);
  yCoordinate = getRandomInt(100, 400);
  similarAds[i] = {
    author: {
      avatar: 'img/avatars/user0' + numberOfAvatar[i] + '.png'
    },

    offer: {
      title: titles[i],
      address: xCoordinate + ', ' + yCoordinate,
      price: getRandomInt(1000, 1000000),
      type: types[Math.floor(Math.random() * 3)],
      rooms: getRandomInt(1, 5),
      guests: getRandomInt(1, 3),
      checkin: checkinAndOut[Math.floor(Math.random() * 3)],
      checkout: checkinAndOut[Math.floor(Math.random() * 3)],
      features: shuffleArray(allFeatures).slice(Math.floor(Math.random() * 6)),
      description: '',
      photos: []
    },

    location: {
      x: xCoordinate,
      y: yCoordinate
    }
  };
}

var fragment1 = document.createDocumentFragment();

for (var j = 0; j < 8; j++) {
  var newElement = document.createElement('div');
  newElement.className = 'pin';
  newElement.style = '\"left: ' + (xCoordinate + 20) +'; top: ' + (yCoordinate + 44) + 'px\"';
  newElement.innerHTML = '<img src=\"' + similarAds[j].author.avatar + '\" class=\"rounded\" width=\"40\" height=\"40\">';

  fragment1.appendChild(newElement);
}

pinMapElement.appendChild(fragment1);

var typeMaps = {
  flat: 'Квартира',
  bungalo: 'Бунгало',
  house: 'Дом'
};

var featuresClass = similarAds[0].offer.features.map(function(feature) {
  return 'class=\"feature__image--' + feature;
});

featuresClass.join(' '); 

var firstAd = document.querySelector('.dialog__panel');
var lodgeTemplate = document.querySelector('#lodge-template').content;

function renderAd(add) {
  var AdElement = lodgeTemplate.cloneNode(true);

  AdElement.querySelector('.lodge__title').textContent = add.offer.title;
  AdElement.querySelector('.lodge__address').textContent = add.offer.address;
  AdElement.querySelector('.lodge__price').textContent = add.offer.price + '&#x20bd;/ночь';
  AdElement.querySelector('.lodge__type').textContent = typeMaps[add.offer.type];
  AdElement.querySelector('.lodge__rooms-and-guests').textContent = 'Для ' + add.offer.guests + ' гостей в ' + add.offer.rooms + ' комнатах';
  AdElement.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + add.offer.checkin + ', выезд до ' + add.offer.checkout;
  AdElement.querySelector('.lodge__features').innerHTML = '<span class=\"feature__image ' + featuresClass + '\"></span>';
  AdElement.querySelector('.lodge__description').textContent = add.offer.description;
  AdElement.querySelector('.dialog__title img').setAttribute('src', add.author.avatar);

  return AdElement;
};

var fragment2 = document.createDocumentFragment();
fragment2.appendChild(renderAd(similarAds[0]));
firstAd.appendChild(fragment2);
