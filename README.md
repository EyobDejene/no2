[![Netlify Status](https://api.netlify.com/api/v1/badges/81b5fc19-cc48-4f80-8e96-629f4f6b306d/deploy-status)](https://app.netlify.com/sites/no2-footprint/deploys)

# No2 footprint

<img src="https://oege.ie.hva.nl/~westere6/no2/a8b31d236d707c6bb33f99ae32d511b0.gif" alt="Image from Gyazo" width="1000"/>

##  Live demo 

[Check out the demo](https://no2-footprint.netlify.com)


##  Concept

This application gives you an insight about the nitrogen dioxide values ​​in Amsterdam.
To measure your personal footprint, a number of questions are asked that map your personal emissions.


## Features
* Mapbox-gl fetch data from geojson and plot on map 
* Set marker on map based on user location input
* Save user input data in localstorage
* Barchart visualization based on results of user input 
* Smooth page transitions

> Most of the features are separated into different modules and are stored in the directory src/js


## Data usage 
Data used within the application are based on measurements from the [GGD](www.luchtmeetnet.nl) measurement network Amsterdam in collaboration with Royal Dutch Meteorological Institute [KNMI](https://www.knmi.nl/home).
The No2 concentrations are given according to a "road-following" grid. Near the streets, where you
expect greater fluctuations in concentration, there are more measurement points. 


To be able to use the dataset I first had to convert the dataset to a usable file type that mapbox accepts.
With a online tool I first converted the dataset.json file to a .csv file and then converted the .csv file to a geojson format.



## Prerequisites
You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/) (with npm)
* [Google Chrome](https://google.com/chrome/)
 
 
## Main dependencies

* [Highway](http://highway.js.org/)
* [D3](https://d3js.org/)
* [Gsap](https://greensock.com/gsap/)
* [Mapbox-gl](https://docs.mapbox.com/mapbox-gl-js/api/)


## How to use

Clone this repo and then in command line type:

* `npm install` or `yarn` - install all dependencies
* `gulp` - run dev-server and let magic happen, or
* `gulp build` - build project from sources

> The server will run on localhost:8080

## List of Gulp tasks

To run separate task type in command line `gulp [task_name]`.
Almost all tasks also have watch mode - `gulp [task_name]:watch`, but you don't need to use it directly.

### Main tasks
Task name          | Description                                                      
:------------------|:----------------------------------
`default`          | will start all tasks required by project in dev mode: initial build, watch files, run server with livereload
`build:dev`        | build dev version of project (without code optimizations)
`build`            | build production-ready project (with code optimizations)

### Other tasks
Task name          | Description                                                      
:------------------|:----------------------------------
`sass` 	         | compile .sass/.scss to .css. We also use [postcss](https://github.com/postcss/postcss) for [autoprefixer](https://github.com/postcss/autoprefixer) and [Lost](https://github.com/peterramsing/lost), so feel free to include other awesome postcss [plugins](https://github.com/postcss/postcss#plugins) when needed
`webpack`          | compile .js sources into bundle file
`copy`             | copy common files from `./src` path to `./build` path
`nunjucks`         | compile Mozilla's awesome [nunjucks](https://mozilla.github.io/nunjucks/) templates
`server`           | run dev-server powered by [BrowserSync](https://www.browsersync.io/)
`clean`            | remove `./build` folder
`list-pages`       | create index file with links to all project pages

_This is a full list of tasks, that we use in our projects, 
but not all of them should be available in current project. 
All available tasks are placed in a folder `./gulp/tasks` as separate *.js files. Usually, file name = task name._



## Other
You can also use [npm scripts](https://docs.npmjs.com/misc/scripts):

* `npm run start` - same as `gulp default`.
* `npm run build` - same as `gulp build`.
* `npm run ghpages` to push only `./build` folder to **gh-pages** branch on github (very useful for previews).
* `npm run lint` - linting javascript with **eslint**.
* `npm run lint-fix` - fix as many issues as possible relatives to **eslint** settings.



## Acknowledgements/credits
*  Convert netCDF dataset to json and calculate averages  [Bas Mijling](https://www.knmi.nl/over-het-knmi/onze-mensen/bas-mijling)
*  HighWay page transition  [DevEd](https://www.youtube.com/watch?v=1dJT-99KpiI)
*  Gsap tranisitons [Yuri Artyukh](https://www.youtube.com/watch?v=pFpqA2xCFQY)
*  User interface design  Nouel de Cneudt and Frank de Bruin
