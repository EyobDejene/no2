import mapboxgl from 'mapbox-gl';
import Highway from '@dogstudio/highway';
import Fade from './fade';
// import Slide from './slide';
import {getGeoCode} from './geocode';
import {barchart} from './barchart';
import {furnace} from './furnace';
import {thermostat} from './thermostat';
import {shower} from './shower';
import {travel} from './travel';


const queryString = require('query-string');

const H = new Highway.Core({
  transitions: {
    default: Fade
  }
});



  const parsed = queryString.parse(location.search);
  let streetName = parsed.place;
  let houseNumber = parsed.number;
  let postalCode = parsed.postalcode;



  //let placename = JSON.parse(localStorage.getItem('location')).placename;

function checkForm() {
  let form = document.getElementById('submit');

  if (form) {
    form.addEventListener('click', function (evt) {
      let street = document.getElementById('place').value;
      let number = document.getElementById('number').value;
      let postalcode = document.getElementById('postalcode').value;
      evt.preventDefault()
      if (street && number && postalcode !== "") {
        getGeoCode(street, number, postalcode)
          .then(data => {
            // console.log(data)
            if (data == false) {
              let message = "Geen data gevonden voor deze locatie.";
              let boxMessage = document.querySelector('.message');
              boxMessage.innerHTML = message;
            } else {
              console.log(data)
              window.location.href = '/explore.html?place=' + street + '&number=' + number + '&postalcode=' + postalcode;
            }
          });
      } else {
        let message = "Niet alle velden zijn ingevuld.";
        let boxMessage = document.querySelector('.message');
        boxMessage.innerHTML = message;
      }

    });
  }

}




H.on('NAVIGATE_IN',function () {
  if(location.pathname == '/explore.html') {
      getCordinatesAndShowMap();
  }
});


if(location.pathname == '/explore.html') {
     getCordinatesAndShowMap();
}



function getCordinatesAndShowMap(){
  getGeoCode(streetName,houseNumber,postalCode).then(function(){
    let geometry = JSON.parse(localStorage.getItem('location')).geometry;
    loadMap(geometry.lng, geometry.lat)
  });
}


function loadMap(long,lat) {
  const bounds = [
    [4.7287589, 52.278174], // Southwest coordinates
    [ 5.0791619,52.431064] // Northeast coordinates
  ];

  mapboxgl.accessToken = 'pk.eyJ1IjoiZXlvYndlc3RlcmluayIsImEiOiJjazRjdW9kaHMwcmdxM25tbmgxczl1bDNqIn0.sxOt8treIKFQksKjZoEwfQ';
  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/eyobwesterink/ck4cup6am3dwk1co42q9wwmxo',
    center: [long, lat],
    zoom: 14,
    minZoom: 14,
    maxZoom: 15,
    maxBounds: bounds // Sets bounds as max

  });


  map.on('load', function () {
    map.addSource('heatmap', {
      "type": "geojson",
      // "data": "data/convertcsv.geojson",
      "data": "data/mean_no2.geojson",
      //  "data": ":http://oege.ie.hva.nl/~westere6/no2/mean_no2.geojson",
      "maxzoom": 15
    });


    map.addLayer(
      {
        'id': 'heatmap',
        'type': 'circle',
        'source': 'heatmap',
        'minzoom': 7,
        'paint': {
// Size circle radius by earthquake magnitude and zoom level
          'circle-radius': [
            'interpolate',
            ['linear'],
            ['zoom'],
            7,
            ['interpolate', ['linear'], ['get', 'conc_ana'], 1, 100, 190, 90],
            15,
            ['interpolate', ['linear'], ['get', 'conc_ana'], 100, 100, 190, 20],
          ],
// Color circle by earthquake magnitude
          'circle-color': [

            'interpolate',
            ['cubic-bezier', 0, 0.5, 1, 0.5],
            ['get', 'conc_ana'],
            // 0,  'rgba(48, 96, 207, 0.2)',
            // 10,  'rgba(48, 96, 207, 0.5)',
            // 12, 'rgba(105, 127, 207, 0.5)',
            // 14, 'rgba(250, 231, 172, 0.5)',
            // 16,  'rgba(191, 195, 199, 0.5)',
            // 18, 'rgba(236, 237, 210, 0.5)',
            // 20, 'rgba(250, 231, 172, 0.5)',
            // 25,  'rgba(196, 69, 58, 0.5)',
            // 30,  'rgba(227, 146, 109, 0.5)',
            // 35,  'rgba(214, 108, 81, 0.5)',
            // 39,  'rgba(196, 69, 58, 0.5)',
            // 40,  'rgba(176, 29, 27, 0.5)',


            0,  'rgba(255, 255, 204,0.5)',
            10, 'rgba(255, 255, 204,0.5)',
            12, 'rgba(255, 241, 169,0.5)',
            14, 'rgba(254, 224, 135,0.5)',
            16, 'rgba(254, 201, 102,0.5)',
            18, 'rgba(254, 171, 75,0.5)',
            20, 'rgba(253, 137, 60,0.5)',
            25, 'rgba(250, 92, 46,0.5)',
            30, 'rgba(236, 48, 35,0.5)',
            35, 'rgba(211, 17, 33,0.5)',
            39, 'rgba(175, 2, 37,0.5)',
            40, 'rgba(175, 2, 37,0.5)',
          ],
          'circle-blur': 4,
          'circle-opacity': 0.9
        }
      },
      'waterway-label'
    );


    // fire marker when everything is loaded
    let loaded = true
    map.on('idle',function() {
      if(loaded){
        console.log('loaded')
        setMarker();
        loaded = false;
      }
    });


    //create a HTML element for each feature
   function setMarker() {
     const el = document.createElement('div');
     el.className = 'marker';
     let marker = new mapboxgl.Marker(el).setLngLat([long, lat]);
     marker.addTo(map);
     let position = (marker._pos);

     let features = map.queryRenderedFeatures(position);
     let displayProperties = ['properties'];
     let displayFeatures = features.map(function (feat) {
       let displayFeat = {};
       displayProperties.forEach(function (prop) {
         displayFeat[prop] = feat[prop];
       });
       return displayFeat;
     });

     let noxValueBox = document.querySelector('.nox-value');
     if(noxValueBox) {
       let streetnameBox = document.querySelector('.streetName')
       let housenumberBox = document.querySelector('.houseNumber');
       let nox = Math.floor(displayFeatures[1].properties.conc_ana)

       noxValueBox.innerHTML = nox + "&micro;g/&#x33a5";
       streetnameBox.innerHTML = streetName;
       housenumberBox.innerHTML = houseNumber;

       new mapboxgl.Popup()
         .setLngLat([long, lat])
         .setHTML(`<h3>No2 waarde</h3><p>${ nox } &micro;g/&#x33a5;</p>`)
         .addTo(map);
     }
     // console.log(Math.floor(displayFeatures[0].properties.conc_ana));
   }


    document.querySelector('.ownLocation').addEventListener('click',function () {
  console.log('fly');
      map.flyTo({
        center: [long,lat],
        zoom: 10,
        bearing: 0,
        speed: 0.2, // make the flying slow
        curve: 1, // change the speed at which it zooms out
        easing: function(t) {
          return t;
        },
        essential: true
      });
    });



//   map.on('click', 'heatmap', function(e) {
//     const coordinates = e.features[0].geometry.coordinates.slice();
//     const description = e.features[0].properties.conc_ana;
//
// // Ensure that if the map is zoomed out such that multiple
// // copies of the feature are visible, the popup appears
// // over the copy being pointed to.
//     while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
//       coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
//     }
//
//     new mapboxgl.Popup()
//       .setLngLat(coordinates)
//       .setHTML(description)
//       .addTo(map);
//   });


    map.on('click', 'heatmap', function (e) {
      new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML(`<h3>No2 waarde</h3><p>${ Math.floor(e.features[0].properties.conc_ana) } &micro;g/&#x33a5;</p>`)
        .addTo(map);
    });


    // Change the cursor to a pointer when the mouse is over the places layer.
    map.on('mouseenter', 'heatmap', function () {
      map.getCanvas().style.cursor = 'default';
    });

// Change it back to a pointer when it leaves.
    map.on('mouseleave', 'heatmap', function () {
      map.getCanvas().style.cursor = '';
    });



  });
}


/**
 * when load page
 */
H.on('NAVIGATE_IN', ({ to, trigger, location }) => {
  checkControls();
  checkControls_shower();
  barchart();
  checkForm();
  checkFurnace();
  clickInformation();
  furnace();
  shower();
  thermostat();


  let tempStored = JSON.parse(localStorage.getItem('thermostat'));
  if(tempStored) {
    tempStored = tempStored.temprature;
    thermostat(tempStored);
  }
  travel(true);
  changeTravelInpute()
});

checkControls();
checkControls_shower();
barchart();
checkFurnace();
checkForm();
clickInformation();
travel(true);
changeTravelInpute()
// let tempStored = JSON.parse(localStorage.getItem('thermostat'));
// if(tempStored) {
//   tempStored = tempStored.temprature;
//   thermostat(tempStored);
// }

/**
 * Thermostat
 */
function checkControls() {
  let tempStored = JSON.parse(localStorage.getItem('thermostat'));
  let tempratureField =  document.querySelector('.temprature');
  if(tempStored && tempratureField) {
    tempStored = tempStored.temprature;
    let unit = '&#xb0;';
    tempratureField.setAttribute('data-temprature', tempStored);
    tempratureField.innerHTML = tempStored + unit;
  }

  let controls = document.querySelectorAll('.thermostat .controls');
  if(controls) {
    for (let i = 0; i < controls.length; i++) {
      controls[i].addEventListener('click', function () {
        let state = this.classList;
        if (state.contains('plus')) {
          getvalue(state)
        } else {
          getvalue(state)
        }
      });
    }
  }
}

function getvalue(state) {
  let tempratureField = document.querySelector('.temprature');
  let temprature = document.querySelector('.temprature').getAttribute('data-temprature');
  let unit = '&#xb0;';
  temprature = Number(temprature);
  if (state.contains('plus')) {
    if (temprature == 90){
      temprature = 90;
    }else {
      temprature += 1;
      document.querySelector('.temprature').setAttribute('data-temprature', temprature);
    }
  } else {
    if (temprature == 0){
      temprature = 0;
    } else {
      temprature -= 1;
      document.querySelector('.temprature').setAttribute('data-temprature', temprature);
    }
  }
  tempratureField.innerHTML = temprature + unit;
  thermostat(temprature);
}


/**
 * Shower settings
 */
function checkControls_shower() {
  let controls = document.querySelectorAll('.shower .controls');
  if(controls) {
    for (let i = 0; i < controls.length; i++) {
      controls[i].addEventListener('click', function () {
        let state = this.classList;
        getvalueTimer(state);
      });
    }
  }
}

function getvalueTimer(state) {
  let minutes = document.querySelector('.minutes').getAttribute('data-minutes');
  let minutesFields = document.querySelector('.minutes');
  let showerValue = document.querySelector('.timer-value');
  minutes = Number(minutes);

  if (state.contains('minutPlus')) {
    minutes += 1;
    if(minutes > 59){
      minutes = 59;
    }
    minutesFields.innerHTML = minutes;
    document.querySelector('.minutes').setAttribute('data-minutes',minutes);
    shower(minutes);
  }
  if(state.contains('minutMin')){
    if(minutes > 0){
      minutes -=1;
    }
    minutesFields.innerHTML = minutes;
    document.querySelector('.minutes').setAttribute('data-minutes',minutes);
    shower(minutes);
  }
}



function clickInformation() {
  let informationIcon = document.querySelectorAll('.information');
  let countIcons = informationIcon.length -1;
  let pageInformation = document.querySelectorAll('.page-information');
  let countpageInformation = pageInformation.length -1;
  if (pageInformation.length > 0) {

      informationIcon[countIcons].addEventListener('click', function () {
        console.log(countIcons)
        if (pageInformation[countpageInformation].classList.contains('active')) {
          pageInformation[countpageInformation].classList.remove('active');
        } else {
          pageInformation[countpageInformation].classList.add('active');
        }
      });
  }
}


/**
 *
 * furnace
 */

function checkFurnace() {
  const buttons = document.querySelectorAll(".radioOptions");
  for (const button of buttons) {
    button.addEventListener('click', function () {
      furnace();
    })
  }
}

/**
 *
 * travel
 */

function changeTravelInpute() {
  document.querySelectorAll('.input-number').forEach(field => {
    field.addEventListener('keyup', function () {
      travel(false);
    });
  });
}
