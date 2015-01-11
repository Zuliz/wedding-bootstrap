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
				$element.children(".openRsvp").click(function(){
					ngDialog.open({
						template: "partials/rsvp.html", 
						data : {hash : $scope.hash}, 
						controller : "RSVPController"
					});
				});
				$element.children("span").children("input[type=text]").bind("keydown keypress", function(event){
					if(event.which === 13) {
						$element.children("span").children("button").click();
	                }
				});
			}
		};
	}])
	.directive('initRsvp', ['ngDialog', function(ngDialog){
		return {
			restrict: 'A',
			link : function($scope){
				$scope.$watch("hash", function(newHash){
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
	}])
	.filter('newlines', function() {
	  return function(text) {
	    return text.split(/\n/g);
	  };
	});
