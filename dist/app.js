(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

const domString = (movieArray) => {
  let domString = "";
  for (let i = 0; i < movieArray.length; i++){
    if (i % 3 === 0) {
      domString += `<div class="row">`;
    }
    domString += `<div class="col-sm-6 col-md-4">`;
    domString +=    `<div class="thumbnail">`;
    domString +=      `<img src="" alt="">`;
    domString +=      `<div class="caption">`;
    domString +=        `<h3>${movieArray[i].original_title}</h3>`;
    domString +=        `<p>${movieArray[i].overview}</p>`;
    domString +=        `<p><a href="#" class="btn btn-primary" role="button">Review</a> <a href="#" class="btn btn-default" role="button">Watchlist</a></p>`;
    domString +=        `</div>`;
    domString +=      `</div>`;
    domString +=    `</div>`;
    if (i % 3 === 2 || i === movieArray.length - 1){
      domString += `</div>`;
    }
  }

  printToDom(domString);
};

const printToDom = (strang) => {
  $("#movies").append(strang);
};

module.exports = {domString};
},{}],2:[function(require,module,exports){
"use strict";

let dom = require('./dom');

let singleMovie = {
  adult:false,
  backdrop_path:"/c2Ax8Rox5g6CneChwy1gmu4UbSb.jpg",
  genre_ids:[28, 12, 878, 14],
  id:140607,
  original_language:"en",
  original_title:"Star Wars: The Force Awakens",
  overview:"Thirty years after defeating the Galactic Empire, Han Solo and his allies face a new threat from the evil Kylo Ren and his army of Stormtroopers.",
  popularity:49.408373,
  poster_path:"/weUSwMdQIa3NaXVzwUoIIcAi85d.jpg",
  release_date:"2015-12-15",
  title:"Star Wars: The Force Awakens",
  video:false,
  vote_average:7.5,
  vote_count:7965
};

dom.domString([singleMovie, singleMovie, singleMovie, singleMovie]);
},{"./dom":1}]},{},[2]);
