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
	]);

