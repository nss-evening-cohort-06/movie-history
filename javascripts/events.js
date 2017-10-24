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
				dom.domString(results, tmdb.getImgConfig(), 'moviesMine');
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





module.exports = {pressEnter, myLinks, googleAuth};