'use strict';

/* Controllers */
angular.module('weddingControllers', ['weddingServices', 'ngRoute', 'ngDialog'])
	.controller('WeddingController', ['$scope', '$location', 'ngDialog',
        function($scope, $location, ngDialog){
			var hash =  isEmpty($location.path()) ? null : $location.path().substr(1);
			$scope.hash = hash;
			$scope.gotoQrCode = function(hash){
				console.log("ahahahaa", hash);
				$location.path("/"+hash.toLowerCase()).replace();
				$scope.hash = hash;
			};
			$scope.refreshQrCode = function(){
				this.gotoQrCode(this.hash);
			};
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
	]).controller('RSVPController', ['$scope', 'weddingService', '$location',
	    function($scope, weddingService, $location){
			weddingService.getQrCode($scope.ngDialogData.hash).$promise.then(function(qrCode){
				$scope.qrCode= qrCode;
				sessionStorage.setItem("qrCode", qrCode.hash);
			},function(reason){
				if(reason.status == "404"){
					alert("Cette réservation n'existe pas");
				}
				console.log("scope",$scope);
				$scope.ngDialogData.hash = null;
				sessionStorage.removeItem("qrCode");
				console.log("Error", reason);
				$scope.closeThisDialog();
				$scope.$apply($location.path("/"));
			});
		}
	]);

