'use strict';

/* Controllers */
angular.module('weddingControllers', ['weddingServices', 'ngRoute'])
	.controller('weddingController', ['$scope', '$rootScope', '$location',
        function($scope, $rootScope, $location, weddingService){
		 	$scope.gotoElement = function(id) {
		      // set the location.hash to the id of
		      // the element you wish to scroll to.
		      $location.hash(id);
		      $anchorScroll();
		    };
		}
	])
	.controller('bestMenController', ['$scope', 'weddingService',
	    function($scope, weddingService){
			weddingService.getBestMen().$promise.then(function(bestMen){
				$scope.bestMen = bestMen;
			});
		}
	]).controller('rsvpController', ['$scope', 'weddingService',
	    function($scope, weddingService){
			weddingService.getGuestByHash("pelletier").$promise.then(function(guests){
				$scope.guests = guests;
			});
		}
	]);

