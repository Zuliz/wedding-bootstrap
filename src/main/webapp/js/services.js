'use strict';

/* Services */

var weddingServices = angular.module('weddingServices', ['ngResource'])
	.factory('guests', ['$resource',
		function($resource){
			return $resource('rest/guests/:guestId', {guestId: '@id', q : "@qrCode", t : "@type" });
		}
	])
	.service('weddingService', ['$rootScope', 'guests',
        function($rootScope, Guests){
			return {
				sheet : null,
				getSheet : function (tokenId){
					if(isEmpty(tokenId)){
						this.sheet = weddingData.getNewSheet();
					}else if(/^~sample/.test(tokenId)){
						this.sheet = weddingData.getSample({ sample : tokenId.substr(1)});
					}else{
						this.sheet = weddingData.get({tokenId:tokenId});
					}
					return this.sheet;
				},
				getOrderedLine :  function(){
					var orderedSheet = new Array();
					var sheet = this.sheet;
					angular.forEach(sheet.lines,function(line, index){
						if(!isEmpty(line.section)){
							console.log(index == 0 ? "none" :sheet.lines[index-1].section);
							if( index == 0 ||
								(index > 0 && 
										(isEmpty(sheet.lines[index-1].section) ||
										line.section.id  != sheet.lines[index-1].section.id) 
								)
							){
								orderedSheet.push({"isSection" : true, "section" : { "name" : line.section.name , "id" : line.section.id } });
							}
						}
						orderedSheet.push(line);
					});
					return orderedSheet;
				},
				mapSections : function(){
					var sections = {};
					var sheet = this.sheet;
					angular.forEach(sheet.lines,function(line, index){
						console.log(line,line.section);
						if(!isEmpty(line.section)){
							if(angular.isUndefined(sections[line.section.id])){
								sections[line.section.id] = line.section;
							}
							line.section = sections[line.section.id] ;
						}
					});
					return sections;
				},
				saveSheet: function(){
					console.log(this.sheet);
					this.prepareSheet();
				},
				saveLine: function(id){
					var line = findLine(this.sheet.lines, id);
					if(isEmpty(line.sheet) || isEmpty(line.sheet.id)){
						line.sheet = { "id" : this.sheet.id };
					}
					if(line.$resolved){
						line.$save().then(function(newLine){
							$rootScope.$broadcast( 'sheet.update' );
						});
					}else{
						line = weddingLines.save(line);
						line.$promise.then(function(newLine){
							$rootScope.$broadcast( 'sheet.update' );
						});
					}
					console.log(line);
				},
				saveSection: function(section){
					console.log(section);
					$rootScope.$broadcast( 'sheet.update' );
				},
				controleNewSheet: function(){
					this.sheet.$promise.then(function(sheet){
						console.log(sheet.token, sheet);
						if(!angular.isUndefined(sheet.token)){
							$rootScope.$broadcast( 'sheet.created' );
						}
						$rootScope.$broadcast( 'sheet.available' );
					});
				},
				createSheet: function(sheet){
					sheet.id = null;
					angular.forEach(sheet.lines,function(line){
						line.id = null;
					});
					var newSheet = weddingData.create(sheet);
					console.log(newSheet);
					this.sheet = newSheet;
					return this.sheet;
				},
				prepareSheet: function(){
					this.sheet.$promise.then(function(sheet){
						$rootScope.$broadcast( 'sheet.available' );
					});
				},
				deleteLine: function(line){
					var index = findLineIndex(this.sheet.lines, line.id);
					var $lines = this.sheet.lines;
					weddingLines.remove({lineId : line.id}).$promise.then(function(){
						$lines.splice(index,1);
						$rootScope.$broadcast( 'sheet.update' );
					});
				},
				addLineAfter: function(line){
					var newLine = {
							"data" : new Array(), 
							"selected" : false, 
							"index" : line.index+1,
							"sheet" : { "id" : this.sheet.id }
						};
					if(!isEmpty(line.section)){
						newLine.section = { 
								"name" : line.section.name,  
								"id" : line.section.id 
							};
					}
					angular.forEach(line.data,function(datum){
						newLine.data.push({"value" : "", "newValue" : true });
					});
					newLine = weddingLines.save(newLine);
					var $lines = this.sheet.lines;
					newLine.$promise.then(function(newLine){
						$lines.push(newLine);
						$rootScope.$broadcast( 'sheet.available' );
					});
				},
				addColumn: function(){
					this.sheet.headers.push({ "name" : "", "type" : "s1" , "newValue" : true });
					angular.forEach(this.sheet.lines, function(line){
						line.data.push({"value" : "", "newValue" : true});
					});
					console.log(this.sheet);
					$rootScope.$broadcast( 'sheet.update' );
				},
				removeSectionForLine: function(line){
					var index = findLineIndex(this.sheet.lines, line.id);
					delete this.sheet.lines[index].section;
					$rootScope.$broadcast( 'sheet.update' );
				}
			};
		}
	]);