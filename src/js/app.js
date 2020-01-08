import mapboxgl from 'mapbox-gl';

import Highway from '@dogstudio/highway';

const H = new Highway.Core();


mapboxgl.accessToken = 'pk.eyJ1IjoiZXlvYndlc3RlcmluayIsImEiOiJjazRjdW9kaHMwcmdxM25tbmgxczl1bDNqIn0.sxOt8treIKFQksKjZoEwfQ';
const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/eyobwesterink/ck4cup6am3dwk1co42q9wwmxo',
  center: [4.895168, 52.370216],
  zoom: 12,
  minZoom: 3,
  maxZoom: 15

});

// setTimeout(function () {
//   map.flyTo({
//     center: [4.730281, 52.40595],
//     zoom: 15,
//     speed: 0.8
//   })
// },2000)

map.on('load', function() {
  map.addSource('heatmap', {
    "type": "geojson",
    "data": "data/result2.geojson",
    "maxzoom": 15
  });

  map.addLayer({

    "id": "heatmap",
    "type": "heatmap",
    "source": "heatmap",
    "circle": {
      "heatmap-radius": 100,
      "heatmap-weight": {
        'property': 'conc_ana',
        'type': 'exponential',
        'stops': [[2, 60], [10, 1]]
        // "stops": [[1, 100], [4, 2]]
      },
      "heatmap-intensity": 100,
      "heatmap-color": [
        // "interpolate",
        // ["linear"],
        ["heatmap-density"],
        0, "rgba(0, 0, 255, 0)",
        0.1, "royalblue",
        0.3, "cyan",
        0.5, "lime",
        0.7, "yellow",
        1, "red"
      ]
    }
  }, 'waterway-label');

});


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
