
(function () {
	var app = angular.module('pokedex', [
		'ngRoute',
		'httpPostFix'
	]);

	app.config(['$routeProvider', function ($routeProvider) {
		$routeProvider
			.when('/', {
				templateUrl : 'views/home.html'
			})
			.when('/viewPokemons', {
			controller: 'viewPokeCtrl',
			templateUrl: 'views/viewPokemons.html'
			})
			.when('/createPokemon', {
			controller: 'createPokemonCtrl',
			templateUrl: 'views/createPokemon.html'
			})
			.when('/instructions', {
			templateUrl: 'views/instructions.html'
			})		
	}]);

})();
