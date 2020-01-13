import mapboxgl from 'mapbox-gl';
import Highway from '@dogstudio/highway';
import Fade from './fade';

const H = new Highway.Core({
  transitions: {
    default: Fade
  }
});



// const bounds = [
//   [4.591389, 52.492103], // Southwest coordinates
//   [ 4.95168,52.330216] // Northeast coordinates
// ];
// const Hs = new Highway.Core();

H.on('NAVIGATE_IN',function () {
  if(location.pathname == '/explore.html') {
    loadMap()
  }
});


if(location.pathname == '/explore.html') {
  loadMap();
}


function loadMap() {
  mapboxgl.accessToken = 'pk.eyJ1IjoiZXlvYndlc3RlcmluayIsImEiOiJjazRjdW9kaHMwcmdxM25tbmgxczl1bDNqIn0.sxOt8treIKFQksKjZoEwfQ';
  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/eyobwesterink/ck4cup6am3dwk1co42q9wwmxo',
    center: [4.895168, 52.370216],
    zoom: 10,
    minZoom: 14,
    maxZoom: 15,
    // maxBounds: bounds // Sets bounds as max

  });

// setTimeout(function () {
//   map.flyTo({
//     center: [4.730281, 52.40595],
//     zoom: 15,
//     speed: 0.8
//   })
// },2000)

  map.on('load', function () {
    map.addSource('heatmap', {
      "type": "geojson",
      // "data": "data/convertcsv.geojson",
      "data": "data/mean_no2.geojson",
      "maxzoom": 15
    });

    // map.addLayer({
    //
    //   "id": "heatmap",
    //   "type": "heatmap",
    //   "source": "heatmap",
    //   "circle": {
    //     "heatmap-radius": 100,
    //     "heatmap-weight": {
    //       'property': 'conc_ana',
    //       'type': 'exponential',
    //       'stops': [[2, 60], [10, 1]]
    //       // "stops": [[1, 100], [4, 2]]
    //     },
    //     "heatmap-intensity": 100,
    //     "heatmap-color": [
    //       // "interpolate",
    //       // ["linear"],
    //       ["heatmap-density"],
    //       0, "rgba(0, 0, 255, 0)",
    //       0.1, "royalblue",
    //       0.3, "cyan",
    //       0.5, "lime",
    //       0.7, "yellow",
    //       1, "red"
    //     ]
    //   }
    // }, 'waterway-label');

//   map.addLayer({
//
//     'id': 'population',
//     'type': 'circle',
//     'source': {
//       type: 'vector',
//       url: 'mapbox://examples.8fgz4egr'
//     },
//     'source-layer': 'sf2010',
//     'paint': {
// // make circles larger as the user zooms from z12 to z22
//       'circle-radius': {
//         'base': 100,
//         'stops': [
//           [12, 2],
//           [22, 180]
//         ]
//       },
// // color circles by ethnicity, using a match expression
// // https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-match
//       'circle-color': [
//
//         'match',
//         ['get', 'ethnicity'],
//
//         'White',
//         '#fb44b6',
//         'Black',
//         '#223b53',
//         'Hispanic',
//         '#e55e5e',
//         'Asian',
//         '#3bb2d0',
//         /* other */ '#ccc'
//       ]
//     }
//   });

    // map.addLayer({
    //   "id": "simple-tiles",
    //   "type": "raster",
    //   "source": {
    //     "type": "raster",
    //     "tiles": ["https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=874718354841f0e0250b4b06a05a971e"],
    //     "tileSize": 256
    //   },
    //   "minzoom": 0,
    //   "maxzoom": 22
    // });
    // map.addLayer({
    //   'id': 'terrain-data',
    //   'type': 'raster',
    //   'source': {
    //     type: 'raster',
    //     url: 'mapbox://mapbox.satellite'
    //   },
    //   'source-layer': 'contour',
    //   'layout': {
    //     'line-join': 'round',
    //     'line-cap': 'round'
    //   }
    //   ,
    //   'paint': {
    //     'line-color': '#ff69b4',
    //     'line-width': 1
    //   }
    // });

// });


//   map.addLayer({
//     id: 'heatmap',
//     type: 'heatmap',
//     source: 'heatmap',
//     maxzoom: 15,
//     paint: {
//       // increase weight as diameter breast height increases
//       'heatmap-weight': {
//         property: 'conc_ana',
//         type: 'exponential',
//         stops: [
//           [1, 0],
//           [62, 1]
//         ]
//       },
//       // increase intensity as zoom level increases
//       'heatmap-intensity': {
//         stops: [
//           [11, 1],
//           [15, 3]
//         ]
//       },
//       // assign color values be applied to points depending on their density
//       'heatmap-color': [
//         'interpolate',
//         ['linear'],
//         ['heatmap-density'],
//         0, 'rgba(236,222,239,0)',
//         0.2, 'rgb(208,209,230)',
//         0.4, 'rgb(166,189,219)',
//         0.6, 'rgb(103,169,207)',
//         0.8, 'rgb(28,144,153)'
//       ],
//       // increase radius as zoom increases
//       'heatmap-radius': {
//         stops: [
//           [11, 15],
//           [15, 20]
//         ]
//       },
//       // decrease opacity to transition into the circle layer
//       'heatmap-opacity': {
//         default: 1,
//         stops: [
//           [14, 1],
//           [15, 0]
//         ]
//       },
//     }
//   }, 'waterway-label');
// });
//
//   map.addSource('10m-bathymetry-81bsvj', {
//     type: 'vector',
//     url: 'mapbox://mapbox.9tm8dx88'
//   });
//
//   map.addLayer(
//     {
//       'id': '10m-bathymetry-81bsvj',
//       'type': 'fill',
//       'source': '10m-bathymetry-81bsvj',
//       'source-layer': '10m-bathymetry-81bsvj',
//       'layout': {},
//       'paint': {
//         'fill-outline-color': 'hsla(337, 82%, 62%, 0)',
// // cubic bezier is a four point curve for smooth and precise styling
// // adjust the points to change the rate and intensity of interpolation
//         'fill-color': [
//           'interpolate',
//           ['cubic-bezier', 0, 0.5, 1, 0.5],
//           ['get', 'DEPTH'],
//           200,
//           '#78bced',
//           9000,
//           '#15659f'
//         ]
//       }
//     },
//     'land-structure-polygon'
//   );
// });


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
            ['interpolate', ['linear'], ['get', 'conc_ana'], 1, 10, 10, 40],
            15,
            ['interpolate', ['linear'], ['get', 'conc_ana'], 10, 100, 90, 90],
          ],
// Color circle by earthquake magnitude
          'circle-color': [

            'interpolate',
            ['cubic-bezier', 0, 0.5, 1, 0.5],
            ['get', 'conc_ana'],
            15, 'rgba(0, 0, 102, 0.5)',
            25, 'rgba(235, 39, 0, 0.5)',
            55, 'rgba(255, 204, 0, 0.5)'
          ],
          'circle-blur': 1,
          'circle-opacity': 0.9
          // 'circle-stroke-color': 'white',
          // 'circle-stroke-width': 1,
// Transition from heatmap to circle layer by zoom level
//       'circle-opacity': [
//         'interpolate',
//         ['linear'],
//         ['zoom'],
//         7,
//         0,
//         8,
//         1
//       ]
        }
      },
      'waterway-label'
    );


    const geojson = {
      type: 'FeatureCollection',
      features: [{
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [4.9007825, 52.3707833]
        },
        "properties": {
          "conc_ana": 20.36156
        }
      }]
    };

// add markers to map
    geojson.features.forEach(function (marker) {

      // create a HTML element for each feature
      const el = document.createElement('div');
      el.className = 'marker';

      // make a marker for each feature and add to the map
      new mapboxgl.Marker(el)
        .setLngLat(marker.geometry.coordinates)
        .addTo(map);


      new mapboxgl.Marker(el)
        .setLngLat(marker.geometry.coordinates)
        .setPopup(new mapboxgl.Popup({offset: 25}) // add popups
          .setHTML(`<h3>No2 waarde</h3><p>${  Math.floor(marker.properties.conc_ana)  }</p>`))
        .addTo(map);

      const div = document.querySelector('.nox-value');
      div.innerHTML = Math.floor(marker.properties.conc_ana);
      console.log(marker.properties.conc_ana)

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




// }
//
// });




