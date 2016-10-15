angular.module('pokedex')
.controller('createPokemonCtrl', ['$scope', 'PostPoke', function ($scope, PostPoke) {
	
	$scope.errorServer;
	$scope.tipo;
	$scope.msg;
	PostPoke.getPokemon($scope);

	$scope.types = [
		  {id: 'Tierra'},
		  {id: 'Agua'},
		  {id: 'Eléctrico'},
		  {id: 'Fuego'},
		  {id: 'Normal'}
	];

	$scope.setPokemon=function(pokemon){		
		PostPoke.setPokemon($scope, pokemon);
	}
}]);
