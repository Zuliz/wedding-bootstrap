'use strict';

/* Services */

var weddingServices = angular.module('weddingServices', ['ngResource'])
	.factory('guests', ['$resource',
		function($resource){
			return $resource('rest/guests/:guestId', {guestId: '@id', q : "@q", t : "@t" });
		}
	])
	.factory('qrCodes', ['$resource',
	                    function($resource){
		return $resource('rest/guests/qrCode/:hash', {hash: '@hash'});
	}
	])
	.service('weddingService', ['guests', 'qrCodes',
        function(Guests, QrCodes){
			return {
				getBestMen : function() { return Guests.query({ t : 1 });},
				getGuestByHash : function(hash) {
					return Guests.query({ q : hash });
				},
				save : function(guest){
					return guests.$save();
				},
				get : function(id){ return  Guests.get({ id : id });},
				getQrCode : function(hash){ return  QrCodes.get({ hash : hash });}
			};
		}
	]);