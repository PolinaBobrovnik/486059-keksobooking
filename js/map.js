'use strict';

var pinMapElement = document.querySelector('.tokyo__pin-map');

var numberOfAvatar = [1, 2, 3, 4, 5, 6, 7, 8];
var titles = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var types = ['flat', 'house', 'bungalo'];
var checkinAndOut = ['12:00', '13:00', '14:00'];
var allFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

var shuffledArray = function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
};

var shuffledFeatures = function shuffleFeatures() {
  for (var i = allFeatures.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = allFeatures[i];
    allFeatures[i] = allFeatures[j];
    allFeatures[j] = temp;
  }
  return allFeatures.slice(Math.floor(Math.random() * 6));
};


shuffledArray(numberOfAvatar);
shuffledArray(titles);

var similarAds = [];

for (var i = 0; i < 8; i++) {
  similarAds[i] = {
    author: {
      avatar: 'img/avatars/user0' + numberOfAvatar[i] + '.png'
    },

    offer: {
      title: titles[i],
      address: 'similarAds[i].location.x, similarAds[i].location.y',
      price: Math.floor(Math.random() * 999001) + 1000,
      type: types[Math.floor(Math.random() * 3)],
      rooms: Math.floor(Math.random() * 5) + 1,
      guests: Math.floor(Math.random() * 4) + 1,
      checkin: checkinAndOut[Math.floor(Math.random() * 3)],
      checkout: checkinAndOut[Math.floor(Math.random() * 3)],
      features: shuffledFeatures(),
      description: '',
      photos: []
    },

    location: {
      x: Math.floor(Math.random() * 601) + 300,
      y: Math.floor(Math.random() * 401) + 100
    }
  };
}

var fragment1 = document.createDocumentFragment();

for (var j = 0; j < 8; j++) {
  var newElement = document.createElement('div');
  newElement.className = 'pin';
  newElement.style = 'left: {{location.x}}px; top: {{location.y}}px';
  newElement.innerHTML = '<img src=\"' + similarAds[j].author.avatar + '\" class=\"rounded\" width=\"40\" height=\"40\">';

  fragment1.appendChild(newElement);
}

pinMapElement.appendChild(fragment1);

var firstAd = document.querySelector('.dialog__panel');
var lodgeTemplate = document.querySelector('#lodge-template').content;

var renderFirstAd = function (similarAd) {
  var AdElement = lodgeTemplate.cloneNode(true);

  AdElement.querySelector('.lodge__title').textContent = similarAds.offer.title;
  AdElement.querySelector('.lodge__address').textContent = similarAds.offer.address;
  AdElement.querySelector('.lodge__price').textContent = similarAds.offer.price + '&#x20bd;/ночь';
  if (similarAds.offer.type === 'flat') {
    similarAd.querySelector('.lodge__type').textContent = 'Квартира';
  } else if (similarAds.offer.type === 'bungalo') {
    similarAd.querySelector('.lodge__type').textContent = 'Бунгало';
  } else if (similarAds.offer.type === 'house') {
    similarAd.querySelector('.lodge__type').textContent = 'Дом';
  }

  AdElement.querySelector('.lodge__rooms-and-guests').textContent = 'Для ' + similarAds.offer.guests + ' гостей в ' + similarAds.offer.rooms + ' комнатах';
  AdElement.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + similarAds.offer.checkin + ', выезд до ' + similarAds.offer.checkout;
  AdElement.querySelector('.lodge__features').innerHTML = '<span class=\"feature__image\" class="feature__image--';
  AdElement.querySelector('.lodge__description').textContent = similarAds.offer.description;
  AdElement.querySelector('.dialog__title').src = similarAds.author.avatar;

  return AdElement;
};

var fragment2 = document.createDocumentFragment();
fragment2.appendChild(renderFirstAd(similarAds[0]));
firstAd.appendChild(fragment2);