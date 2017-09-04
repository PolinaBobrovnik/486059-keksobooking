'use strict';


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
};

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

var ads = getSimilarAds();

var tokyoPinMap = document.querySelector('.tokyo__pin-map');
var mapItems = document.createDocumentFragment();

for (var i = 0; i < ads.length; i++) {
  var div = document.createElement('div');
  div.classList.add('pin');
  div.style.left = ads[i].location.x + 20 + 'px';
  div.style.top = ads[i].location.y + 44 +'px';
  var img = document.createElement('img');
  img.src = ads[i].author.avatar;
  img.classList.add('rounded');
  img.width = 40;
  img.height = 40;
  div.appendChild(img);

  mapItems.appendChild(div);
}
tokyoPinMap.appendChild(mapItems);

var featuresClass = ads[0].offer.features.map(function(feature) {
  return 'feature__image--' + feature;
});
var featuresClasses = featuresClass.join(' ');
console.log(featuresClasses);

function replaceDialogPanel(newDialogPanel) {
   var offerDialog = document.querySelector('#offer-dialog');
   var oldDialogPanel = document.querySelector('.dialog__panel');
 
   offerDialog.replaceChild(newDialogPanel, oldDialogPanel);
 }


function renderAd(add) {
  var lodgeTemplate = document.querySelector('#lodge-template').content;
  var adElement = lodgeTemplate.cloneNode(true);

  adElement.querySelector('.lodge__title').textContent = add.offer.title;
  adElement.querySelector('.lodge__address').textContent = add.offer.address;
  adElement.querySelector('.lodge__price').textContent = add.offer.price + '\u20BD/ночь';
  adElement.querySelector('.lodge__type').textContent = typeMaps[add.offer.type];
  adElement.querySelector('.lodge__rooms-and-guests').textContent = 'Для ' + add.offer.guests + ' гостей в ' + add.offer.rooms + ' комнатах';
  adElement.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + add.offer.checkin + ', выезд до ' + add.offer.checkout;
  var featuresHtml = '';
  for (var j = 0; j < add.offer.features.length; j++) {
    featuresHtml += '<span class="feature__image  feature__image--' + add.offer.features[j] + '"></span>';
  }
  adElement.querySelector('.lodge__features').innerHTML = featuresHtml;
  adElement.querySelector('.lodge__description').textContent = add.offer.description;
  replaceDialogPanel(adElement);
  document.querySelector('.dialog__title img').src = add.author.avatar;

};

renderAd(ads[0]);
