'use strict';

/* Directives */
var whichOnesDirectives = angular.module('weddingDirectives', ['ngDialog', 'weddingControllers'])
	.directive('rsvpButton', ['ngDialog', '$location',function(ngDialog, $location){
		return {
			restrict: 'A',
			controller: 'WeddingController',
			template : 
				'<a class="openRsvp" data-open-rsvp data-ng-hide="!hash || hash == \'\'")>RSVP</a>'+
				'<span data-ng-hide="hash && hash != \'\'"><input type="text" data-ng-model="newhash" placeholder="Code RSVP" /><button data-ng-click="gotoQrCode(newhash)" >Go</button></span>',
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
	}])
	.directive('guestSave', ['ngDialog', function(ngDialog){
		return {
			restrict: 'A',
			scope : {guest : "="},
			link : function($scope){
				var qrCode = $scope.$parent.$parent.qrCode;
				$scope.$parent.$watch("guest.answerId", function(newHash, old){
					if(newHash != null && newHash != old){
						qrCode.$save();
					}
				});
			}
		};
	}]);
