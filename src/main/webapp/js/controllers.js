'use strict';

/* Controllers */
angular.module('weddingControllers', ['weddingServices', 'ngRoute', 'ngDialog'])
	.controller('WeddingController', ['$scope', '$rootScope', '$location', 'ngDialog',
        function($scope, $rootScope, $location, ngDialog){
			var hash =  isEmpty($location.path()) ? null : $location.path().substr(1);
			$scope.hash = hash;
			$scope.gotoQrCode = function(hash){
				$location.path("/"+hash.toLowerCase()).replace();
				$scope.hash = hash;
			};
			$scope.refreshQrCode = function(){
				this.gotoQrCode(this.hash);
			};
			$rootScope.$on("wrongQrCode", function(e, hashCode){
				$scope.hash = null;
			});

		}
	])
	.controller('BestMenController', ['$scope', 'weddingService',
	    function($scope, weddingService){
			weddingService.getBestMen().$promise.then(function(bestMen){
				$scope.bestMen = bestMen;
				angular.forEach($scope.bestMen, function(bestMan, index){
					bestMan.imgSrc = "img/"+bestMan.firstName.toLowerCase()+".png";
				});
			});
		}
	]).controller('RSVPController', ['$scope', '$rootScope', 'weddingService', '$location',
	    function($scope, $rootScope, weddingService, $location){
			weddingService.getQrCode($scope.ngDialogData.hash).$promise.then(function(qrCode){
				$scope.qrCode= qrCode;
				sessionStorage.setItem("qrCode", qrCode.hash);
				$scope.error = null;
			},function(reason){
				if(reason.status == "404"){
					$scope.error ="Le code réponse "+$scope.ngDialogData.hash+" n'existe pas";
				}else{
					$scope.error ="Erreur au chargement de l'invitation"
				}
				$rootScope.$emit("wrongQrCode", $scope.ngDialogData.hash);
				sessionStorage.removeItem("qrCode");
				console.log("Error", reason);
			});
		}
	]);

