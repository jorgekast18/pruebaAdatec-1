angular.module('pokedex')
.factory('PostPoke', ['$http', '$location', function ($http, $location) {
	return{
		getPokemon:function(scope){	
			$http.get("http://127.0.0.1:8000/pokemons/")
				.success(function(response){
					scope.retPokemon=response;				
					scope.errorServer=false;								
				})
				.error(function(error){					
					scope.msg='Error, revise su servidor';
					scope.errorServer=true;
				});		
		},
		setPokemon:function(scope, json){	
			var config = {
                headers : {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                }
            }

			$http.post("http://127.0.0.1:8000/pokemons/", JSON.stringify(json), config)
				.success(function(data, status, headers, config){
					scope.msg='El pokemon se ha registrado en la pockedex'; 
					setTimeout(function(){									
						scope.$apply(function(){
							$location.path('/viewPokemons');
							scope.msg = ''; 
						})
					}, 2000);

				})
				.error(function(data, status, headers, config){
					scope.msg='Error, revise su servidor';
				});											
		}
	};
}]);