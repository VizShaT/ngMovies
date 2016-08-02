(function(){
	"use strict";

	angular
		.module('ngMovies')
		.controller('newMoviesCtrl', function($scope, $state, $mdSidenav, $timeout, $mdDialog, moviesFactory){
			var vm = this;
			vm.closeSidebar = closeSidebar;

			$timeout(function() {
				$mdSidenav('left').open();
			});

			$scope.$watch('vm.sidenavOpen', function(sidenav){
				if(sidenav === false){
					$mdSidenav('left')
						.close()
						.then(function(){
							$state.go("movies");
						});
				}
			});

			function closeSidebar(){
				vm.sidenavOpen = false;
			}
		})
})();