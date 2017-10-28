"use strict";

let firebaseApi = require('./firebaseApi');

const domString = (movieArray, imgConfig, divName, search) => {
    let domString = "";
    for (let i = 0; i < movieArray.length; i++) {
        if (i % 3 === 0) {
            domString += `<div class="row">`;
        }
        domString += `<div class="col-sm-6 col-md-4 movie">`;
        domString += `<div class="thumbnail">`;

        if (!search) {
            domString += `<button class="btn btn-default delete" data-firebase-id="${movieArray[i].id}">X</button>`;
        }

        domString += `<img class="poster_path" src="${imgConfig.base_url}/w342/${movieArray[i].poster_path}" alt="">`;
        domString += `<div class="caption">`;
        domString += `<h3 class="title">${movieArray[i].title}</h3>`;
        domString += `<p class="overview">${movieArray[i].overview}</p>`;
        if (search) {
            domString += `<p>`;
            domString += `<a class="btn btn-primary review" role="button">Review</a>`;
            domString += `<a class="btn btn-default wishlist" role="button">Wishlist</a>`;
            domString += `</p>`;
        } else {
            domString += `<label for="stars_${movieArray[i].id}" class="control-label">Rate This</label>`;
            domString += `<input id="stars_${movieArray[i].id}" name="stars_${movieArray[i].id}" class="stars rating-loading" value="${movieArray[i].rating}">`;
        }

        domString += `</div>`;
        domString += `</div>`;
        domString += `</div>`;
        if (i % 3 === 2 || i === movieArray.length - 1) {
            domString += `</div>`;
        }
    }

    if (!search) {
        printToDom(domString, divName, movieArray);
    } else {
        printToDom(domString, divName);
    }

};

const initializeStars = (starArray) => {
    starArray.forEach((star) => {
        $("#stars_" + star.id).rating().on("rating.change", function(e, value, caption) {
            let mommy = e.target.closest('.movie');
            let movieId = $(e.target.closest('.thumbnail')).find('.delete').data('firebase-id');
            let modifiedMovie = {
                "title": $(mommy).find('.title').html(),
                "overview": $(mommy).find('.overview').html(),
                "poster_path": $(mommy).find('.poster_path').attr('src').split('/').pop(),
                "rating": value,
                "isWatched": false,
                "uid": ""
            };
            firebaseApi.editMovie(modifiedMovie, movieId).then((results) => {
                console.log(results);
            }).catch((err) => {
                console.log("editMovie error", err);
            });
        });
    });
};

const printToDom = (strang, divName, starArray) => {
    $(`#${divName}`).append(strang);

    if (starArray) {
        initializeStars(starArray);
    }
};

const clearDom = (divName) => {
    $(`#${divName}`).empty();
};

module.exports = {
    domString,
    clearDom
};