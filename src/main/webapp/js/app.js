'use strict';

/* App Module */

var wedding = angular.module('wedding', [
  'duScroll',
  'weddingDirectives',
  'weddingControllers',
  'ui.bootstrap'
])/*.run(function($rootScope, $location){
	$rootScope.$on('duScrollspy:becameActive', function($event, $element){
	    //Automaticly update location
	    var hash = $element.prop('hash');
	    if(hash){
			if(history.pushState) {
			    history.pushState(null, null,hash);
			}else {
			    location.hash = hash;
			}
	    }
	});
})*/;

function isEmpty(o){
	if(angular.isUndefined(o)){
		return true;
	}
	if( Object.prototype.toString.call( o ) === '[object Array]' && o.length == 1){
		return $.isEmptyObject(o[0]);
	}else{
		return $.isEmptyObject(o);
	}
}