'use strict';

/* Directives */
var whichOnesDirectives = angular.module('weddingDirectives', ['ngDialog', 'weddingControllers'])
	.directive('rsvpButton', ['ngDialog', '$location',function(ngDialog, $location){
		return {
			restrict: 'A',
			controller: 'WeddingController',
			template : 
				'<a class="openRsvp" data-open-rsvp data-ng-if="hash && hash != \'\'")>RSVP</a>'+
				'<span data-ng-if="!hash" class="changeLocation"><input type="text" data-ng-model="hash"/><button data-ng-click="refreshQrCode()" >Go</button></span>',
			link: function($scope,$element){
				console.log("Is it watching ", $scope.hash);
				$element.children(".openRsvp").click(function(){
					console.log("hashhhh",  $scope.hash);
					ngDialog.open({
						template: "partials/rsvp.html", 
						data : {hash : $scope.hash}, 
						controller : "RSVPController"
					});
				});
			}
		};
	}])
	.directive('initRsvp', ['ngDialog', function(ngDialog){
		return {
			restrict: 'A',
			link : function($scope){
				$scope.$watch("hash", function(newHash){
					console.log("Is it here ", newHash);
					if(!isEmpty(newHash)){
						ngDialog.open({ 
							template: "partials/rsvp.html", 
							data : {hash : newHash}, 
							controller : "RSVPController"
						});
					}else{
						sessionStorage.removeItem("qrCode");
					}
				});
			}
		};
	}]);