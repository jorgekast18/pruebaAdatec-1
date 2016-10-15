angular.module('pokedex')
.factory('GetPokemon', ['$http', function ($http) {
	
	var config = {
        headers : {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
        }
    }

	var obj = {};

	obj.getPokemons = function(scope){
		$http.get("http://127.0.0.1:8000/pokemons/")
			.success(function(response){
				scope.retPokemons=response;
				scope.errorServer=false;										
			})
			.error(function(error){					
				scope.msg='Error, revise el servidor';
				scope.errorServer=true;
			});		
	}

	obj.getDetail = function(scope, pk){	
		$http.get("http://127.0.0.1:8000/pokemons/"+pk+"/")
			.success(function(response){
				scope.retDetailPokemon=response;
				scope.errorServer=false;				
			})
			.error(function(error){					
				scope.msg='Error, revise el servidor';
				scope.errorServer=true;
			});				
	}
	
	obj.updateSale = function(scope, json, pk){											
		$http.put("http://127.0.0.1:8000/pokemons/"+pk+"/", JSON.stringify(json), config)
			.success(function(data, status, headers, config){																
				scope.msgUpdate = 'Se ha actualizado el pokemon.';
				obj.getPokemons(scope);									
				setTimeout(function(){	
					scope.$apply(function(){
						scope.msgUpdate = ''; 
					})																	
				}, 2000);
			})
			.error(function(data, status, headers, config){
				scope.msgUpdate = 'Error al actualizar el pokemon.';	
			});						
	}

	obj.deletePokemon = function(scope, pk){									            				
		$http.delete("http://127.0.0.1:8000/pokemons/"+pk+"/", config)
			.success(function(data, status, headers, config){																
				scope.msg = 'Se ha eliminado el pokemon.';	
				obj.getPokemons(scope);									
				setTimeout(function(){									
					scope.$apply(function(){
						scope.msg = ''; 
					})
				}, 2000);
			})
			.error(function(data, status, headers, config){
				scope.msg = 'Error al eliminar el pokemon.';	
			});						
	}
	return obj;	
}]);