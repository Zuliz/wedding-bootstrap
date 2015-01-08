'use strict';

/* Services */

var weddingServices = angular.module('weddingServices', ['ngResource'])
	.factory('guests', ['$resource',
		function($resource){
			return $resource('rest/guests/:guestId', {guestId: '@id', q : "@q", t : "@t" });
		}
	])
	.service('weddingService', ['guests',
        function(Guests){
			return {
				getBestMen : function() { return Guests.query({ t : 1 });},
				getGuestByHash : function(hash) {
					return Guests.query({ q : hash });
				},
				save : function(guest){
					return guests.$save();
				},
				get : function(id){ return  Guests.get({ id : id });}
			};
		}
	]);