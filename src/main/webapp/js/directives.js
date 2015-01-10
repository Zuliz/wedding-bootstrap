'use strict';

/* Directives */
var whichOnesDirectives = angular.module('weddingDirectives', ['ngDialog', 'weddingControllers'])
	.directive('rsvpButton', ['ngDialog', '$location',function(ngDialog, $location){
		return {
			restrict: 'A',
			link: function($scope,$element){
				$scope.$watch("hash", function(newHash){
					if(!isEmpty(newHash)){
						$element.append($("<a />").click(function(){
							ngDialog.open({
								template: "partials/rsvp.html", 
								data : {hash : newHash}, 
								controller : "RSVPController"
							});
						}).text("RSVP"));
					}else{
						$element.append(
									$("<input />")
										.attr("type", "text")
										.attr("placeholder", "Code RSVP"))
								.append(
									$("<button />")
										.text("Go")
										.click(function(){
											$scope.gotoQrCode($(this).siblings("input:first").val());
										}));
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
	}]);