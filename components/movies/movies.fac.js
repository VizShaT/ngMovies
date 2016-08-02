(function(){
	"user strict";

	angular
		.module('ngMovies')
		.factory('moviesFactory', function($http){
			function getMovies(){
				return $http.get("data/movies.json");
			}
			return {
				getMovies: getMovies
			}
		})
})();