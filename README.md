# ticket2calendar

https://x8bitrain.github.io/ticket2calendar/

Proof of concept and fully clientside boarding pass scanner in your browser. Built in React, using a web assembly build of the barcode scanning library [xzing](https://github.com/yushulx/zxing-cpp-emscripten). Take any boarding pass with a PDF-417 or Aztec barcode and scan it to view your flight itinerary and add it to any popular online calendar.

## How to use
Point your camera to a boarding pass that looks like this or this, when the barcode is detected the page will display your ticket's itinerary with a map of the route.

## Dependancies
	"bcbp-parser": "https://github.com/x8BitRain/bcbp-parser/tarball/master",
    "ics": "^2.18.0",
    "mapbox-gl": "^1.6.1",
    "moment": "^2.24.0",
    "node-sass": "^4.13.0",
    "openflights-cached": "^1.2.0",

## Setup and Run

Clone this repository:

`git clone https://github.com/x8BitRain/ticket2calendar.git`  &  `cd ticket2calendar/`

Install all required dependencies first:

    yarn install

Start the local Webpack Dev Server:

    yarn start

To lint all JavaScript files in the  `src`  folder:

    yarn lint

To build and output static HTML and JS files:

    webpack -p
