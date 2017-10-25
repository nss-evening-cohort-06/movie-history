"use strict";

const domString = (movieArray, imgConfig, divName) => {
  let domString = "";
  for (let i = 0; i < movieArray.length; i++){
    if (i % 3 === 0) {
      domString += `<div class="row">`;
    }
    domString += `<div class="col-sm-6 col-md-4 movie">`;
    domString +=    `<div class="thumbnail">`;
    domString +=      `<img class="poster_path" src="${imgConfig.base_url}/w342/${movieArray[i].poster_path}" alt="">`;
    domString +=      `<div class="caption">`;
    domString +=        `<h3 class="title">${movieArray[i].title}</h3>`;
    domString +=        `<p class="overview">${movieArray[i].overview}</p>`;
    domString +=        `<p>`;
    domString +=           `<a class="btn btn-primary review" role="button">Review</a>`;
    domString +=           `<a class="btn btn-default wishlist" role="button">Wishlist</a>`;
    domString +=        `</p>`;
    domString +=        `</div>`;
    domString +=      `</div>`;
    domString +=    `</div>`;
    if (i % 3 === 2 || i === movieArray.length - 1){
      domString += `</div>`;
    }
  }

  printToDom(domString, divName);
};

const printToDom = (strang, divName) => {
  $(`#${divName}`).append(strang);
};

const clearDom = (divName) => {
  $(`#${divName}`).empty();
};

module.exports = {domString, clearDom};
