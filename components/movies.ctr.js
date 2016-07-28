(function(){

	"use strict";
	angular
		.module("ngMovies")
		.controller("moviesCtrl", function($scope, $http, moviesFactory, $mdSidenav, $mdToast, $mdDialog){

			var vm = this;

			vm.openSidebar = openSidebar;
			vm.closeSidebar = closeSidebar;
			vm.saveMovie = saveMovie;
			vm.editMovie = editMovie;
			vm.saveEdit = saveEdit;
			vm.deleteMovie = deleteMovie;

			vm.movies;
			vm.categories;
			vm.editing;
			vm.movie;

			moviesFactory.getMovies().then(function(movies){
				vm.movies = movies.data;
				vm.categories = getCategories(vm.movies);
			});
			
			var director = {
				name: "Bruce Wyane",
				phone: "(666) 666 6666",
				email: "bruce@kungfupanda.com"
			}

			function openSidebar(){
				$mdSidenav('left').open();
			}

			function closeSidebar(){
				$mdSidenav('left').close();
			}

			function saveMovie(movie){
				if(movie){
					movie.director = director;
					vm.movies.push(movie);
					vm.movie = {};
					closeSidebar();
					showToast("Movie Saved!");
				}				
			}

			function editMovie(movie){
				vm.editing = true;
				openSidebar();
				vm.movie = movie;
			}

			function saveEdit(){
				vm.editing = false;
				vm.movie = {};
				closeSidebar();
				showToast("Edit Saved!");
			}

			function deleteMovie(event, movie){
				var confirm = $mdDialog.confirm()
					.title('Are you sure wants to delete ' + movie.title + ' ?')
					.ok('Yes')
					.cancel('No')
					.targetEvent(event);

				$mdDialog.show(confirm).then(function(){
					var index = vm.movies.indexOf(movie);
					vm.movies.splice(index, 1);
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