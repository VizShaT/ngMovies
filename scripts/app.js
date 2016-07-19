angular
	.module("ngMovies", ["ngMaterial"])
	.config(function($mdThemingProvider){
		$mdThemingProvider.theme('default')
			.primaryPalette('blue')
			.accentPalette('orange');
	})
	.directive("helloWorld", function(){
		return{
			template: "<h1>{{ message }} </h1>"
		}
	});