angular
	.module("ngMovies", ["ngMaterial", "ui.router"])
	.config(function($mdThemingProvider, $stateProvider){
		$mdThemingProvider.theme('default')
			.primaryPalette('blue')
			.accentPalette('orange');
	
		$stateProvider
			.state('movies', {
				url: "/movies",
				templateUrl: "components/movies/movies.tpl.html",
				controller: "moviesCtrl as vm"
			})
	});