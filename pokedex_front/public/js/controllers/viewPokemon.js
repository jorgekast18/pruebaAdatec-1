angular.module('pokedex')
.controller('viewPokeCtrl', ['$scope','GetPokemon', function ($scope, GetPokemon) {

	$scope.retPokemon;
	$scope.errorServer;		
	$scope.msg;	
	$scope.msgUpdate;	
	$scope.pkPokemon;	
	GetPokemon.getPokemons($scope);

	$scope.types = [
		  {id: 'Tierra'},
		  {id: 'Agua'},
		  {id: 'Eléctrico'},
		  {id: 'Fuego'},
		  {id: 'Normal'}
	];
	$scope.getDetail = function(pk){		
		GetPokemon.getDetail($scope, pk);		
	}

	$scope.updateSale = function(pokemon){
		GetPokemon.updateSale($scope, pokemon, pokemon.pk);						
	}

	$scope.setDeletePokemon = function(pk){		
		$scope.pkPokemon = pk	
		console.log($scope.pkPokemon);	
	}	

	$scope.deletePokemon = function(){		
		GetPokemon.deletePokemon($scope, $scope.pkPokemon);				
	}	

	$scope.orderBy = function(orden){		
		$scope.selectedOrden = orden;
	};
}]);

