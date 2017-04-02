angular.module("listaTelefonica").controller("listaTelefonicaCtrl", function($scope, $http){
	$scope.app = "Lista Telefonica";
	$scope.contatos = [];
	$scope.operadoras = [];

	var carregarContatos = function(){
		$http.get("address get").success(function(data){
			//console.log(data);
			$scope.contatos = data
		}).error(function(data, status){
			$scope.message = "Aconteceu um problema: " + data;
		});
	};

	var carregarOperadoras = function(){
		$http.get("address get").success(function(data){
			//console.log(data);
			$scope.operadoras = data
		});
	}

	$scope.adicionarContato = function (contato) {
		$scope.contatos.push(angular.copy(contato));
		delete $scope.contato
		$scope.contatoForm.$setPristine();

		// comunication between back-end
		/*contato.data = new Date();
		$http.post("address post", contato).success(function(data){
			delete $scope.contato
			$scope.contatoForm.$setPristine();
			carregarContatos();
		});		*/			
	};
	$scope.apagarContatos = function(contatos){
		$scope.contatos = contatos.filter(function(contato){
			if(!contato.selecionado) return contato;
		});
	};
	$scope.isContatoSelecionado = function(contatos){
		return contatos.some(function(contato){
			return contato.selecionado;
		});
	};
	$scope.ordenarPor = function(campo){
		$scope.criterioDeOrdenacao = campo;
		$scope.direcaoDaOrdenacao = !$scope.direcaoDaOrdenacao;
	};
	//carregarContatos();
	//carregarOperadoras();
});