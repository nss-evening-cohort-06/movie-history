"use strict";

const tmdb = require('./tmdb');
const dom = require('./dom');
const firebaseApi = require('./firebaseApi');

const pressEnter = () => {
  $(document).keypress((e) => {
    if (e.key === 'Enter'){
      let searchText = $('#searchBar').val();
      let query = searchText.replace(/\s/g, "%20");
      tmdb.searchMovies(query);
    }
  });

};

const myLinks = () => {
	$(document).click((e) =>{
		if(e.target.id === "navSearch"){
			$("#search").removeClass("hide");
			$("#myMovies").addClass("hide");
			$("#authScreen").addClass("hide");
		}else if (e.target.id === "mine") {
			$("#search").addClass("hide");
			$("#myMovies").removeClass("hide");
			$("#authScreen").addClass("hide");
			firebaseApi.getMovieList().then((results) =>{
				dom.clearDom('moviesMine');
				dom.domString(results, tmdb.getImgConfig(), 'moviesMine', false);
			}).catch((err) =>{
				console.log("error in getMovieList", err);
			});
		}else if (e.target.id === "authenticate"){
			$("#search").addClass("hide");
			$("#myMovies").addClass("hide");
			$("#authScreen").removeClass("hide");
		}
	});
};

const googleAuth = () => {
	$('#googleButton').click((e) =>{
		firebaseApi.authenticateGoogle().then().catch((err) =>{
			console.log("error in authenticateGoogle", err);
		});
	});
};


const wishListEvents = () => {
	$('body').on('click', '.wishlist', (e) => {
		let mommy = e.target.closest('.movie');

		let newMovie = {
			"title":$(mommy).find('.title').html(),
			"overview": $(mommy).find('.overview').html(),
			"poster_path":$(mommy).find('.poster_path').attr('src').split('/').pop(),
			"rating": 0,
			"isWatched": false,
			"uid": ""
		};

		firebaseApi.saveMovie(newMovie).then(() =>{
			$(mommy).remove();
		}).catch((err) =>{
			console.log("error in saveMovie", err);
		});
	});
};


const reviewEvents = () => {
	$('body').on('click', '.review', (e) => {
		let mommy = e.target.closest('.movie');

		let newMovie = {
			"title":$(mommy).find('.title').html(),
			"overview": $(mommy).find('.overview').html(),
			"poster_path":$(mommy).find('.poster_path').attr('src').split('/').pop(),
			"rating": 0,
			"isWatched": true,
			"uid": ""
		};

		firebaseApi.saveMovie(newMovie).then(() =>{
			$(mommy).remove();
		}).catch((err) =>{
			console.log("error in saveMovie", err);
		});
	});
};

const deleteMovie = () => {
	$('body').on('click', '.delete', (e) => {
		let movieId = $(e.target).data('firebase-id');

		firebaseApi.deleteMovie(movieId).then((results) =>{
			console.log("results", results);
		}).catch((err) => {
			console.log("error in deleteMovie", err);
		});
	});
};







const init = () =>{
	myLinks();
	googleAuth();
	pressEnter();
	wishListEvents();
	reviewEvents();
	deleteMovie();
};






module.exports = {init};