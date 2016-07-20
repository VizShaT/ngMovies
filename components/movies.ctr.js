(function(){

	"use strict";
	angular
		.module("ngMovies")
		.controller("moviesCtrl", function($scope, $http, moviesFactory, $mdSidenav, $mdToast, $mdDialog){
			moviesFactory.getMovies().then(function(movies){
				$scope.movies = movies.data;
				$scope.categories = getCategories($scope.movies);
			});
			
			var director = {
				name: "Bruce Wyane",
				phone: "(666) 666 6666",
				email: "bruce@kungfupanda.com"
			}

			

			$scope.openSidebar = function(){
				$mdSidenav('left').open();
			}

			$scope.closeSidebar = function(){
				$mdSidenav('left').close();
			}

			$scope.saveMovie = function(movie){
				if(movie){
					movie.director = director;
					$scope.movies.push(movie);
					$scope.movie = {};
					$scope.closeSidebar();
					showToast("Movie Saved!");
				}				
			}

			$scope.editMovie = function(movie){
				$scope.editing = true;
				$scope.openSidebar();
				$scope.movie = movie;
			}

			$scope.saveEdit = function(){
				$scope.editing = false;
				$scope.movie = {};
				$scope.closeSidebar();
				showToast("Edit Saved!");
			}

			$scope.deleteMovie = function(event, movie){
				var confirm = $mdDialog.confirm()
					.title('Are you sure wants to delete ' + movie.title + ' ?')
					.ok('Yes')
					.cancel('No')
					.targetEvent(event);

				$mdDialog.show(confirm).then(function(){
					var index = $scope.movies.indexOf(movie);
					$scope.movies.splice(index, 1);
				}, function(){

				});
				
			}

			function showToast(message){
				$mdToast.show(
					$mdToast.simple()
						.content(message)
						.position('top, right')
						.hideDelay(4000)
				);
			}

			function getCategories(movies){
				var categories = [];
				angular.forEach(movies, function(item){
					angular.forEach(item.categories, function(category){
						categories.push(category);
					});
				});
				return _.uniq(categories);
			}
		});
})();