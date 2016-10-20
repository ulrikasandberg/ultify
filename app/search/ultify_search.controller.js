/**
MIT License

Copyright (c) 2016 Ulrika Sandberg

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

angular.
module('UltifySearch').
controller('UltifySearchController', function ($scope, $http, UrlManager, $compile) {
	$scope.query = '';
	$scope.type = 'track';
	
	var manageResponse = function(response) {
		var resArray = [];
		var i, j, tmp, imgLen, items;
		
		switch($scope.type) {
			case 'track':
				items = (response.data.tracks) ? response.data.tracks.items : null;
				$scope.total = response.data.tracks.total;
				$scope.next = response.data.tracks.next;
				$scope.previous = response.data.tracks.previous;
				$scope.limit = response.data.tracks.limit;
				$scope.offset = response.data.tracks.offset;
				$scope.colNameArr = ['Namn','Album','Artist(er)','Spela'];
	
				if(items) {
					for(i = 0; i < items.length; i++) {
						tmp = {};
						tmp.id = items[i].id;
						imgLen = items[i].album.images.length;
						tmp.img = (imgLen > 0) ? items[i].album.images[imgLen - 1].url : '';
						tmp.name = items[i].name;
						tmp.col3 = items[i].album.name;
						tmp.col4 = items[i].artists.map(function(a) { return a.name }).join(', ');
						tmp.play = items[i].external_urls.spotify;
						tmp.b64href = btoa(items[i].href);
						resArray.push(tmp);
					}
				}
				$scope.res = resArray;
				break;
			case 'artist':
				items = (response.data.artists) ? response.data.artists.items : null;
				$scope.total = response.data.artists.total;
				$scope.next = response.data.artists.next;
				$scope.previous = response.data.artists.previous;
				$scope.limit = response.data.artists.limit;
				$scope.offset = response.data.artists.offset;
				$scope.colNameArr = ['Namn','Följare','Genres','Spela'];
	
				if(items) {
					for(i = 0; i < items.length; i++) {
						tmp = {};
						imgLen = items[i].images.length;
						tmp.img = (imgLen > 0) ? items[i].images[imgLen - 1].url : '';
						tmp.name = items[i].name;
						tmp.col3 = items[i].followers.total;
						tmp.col4 = items[i].genres.join(', ');
						tmp.play = items[i].external_urls.spotify;
						tmp.b64href = btoa(items[i].href);
						resArray.push(tmp);
					}
				}
				$scope.res = resArray;
				break;
			case 'album':
				items = (response.data.albums) ? response.data.albums.items : null;
				$scope.total = response.data.albums.total;
				$scope.next = response.data.albums.next;
				$scope.previous = response.data.albums.previous;
				$scope.limit = response.data.albums.limit;
				$scope.offset = response.data.albums.offset;
				$scope.colNameArr = ['Namn','Typ', '', 'Spela'];
	
				if(items) {
					for(i = 0; i < items.length; i++) {
						tmp = {};
						imgLen = items[i].images.length;
						tmp.img = (imgLen > 0) ? items[i].images[imgLen - 1].url : '';
						tmp.name = items[i].name;
						tmp.col3 = items[i].album_type;
						tmp.play = items[i].external_urls.spotify;
						tmp.b64href = btoa(items[i].href);
						resArray.push(tmp);
					}
				}
				$scope.res = resArray;
				break;
			case 'playlist':
				items = (response.data.playlists) ? response.data.playlists.items : null;
				$scope.total = response.data.playlists.total;
				$scope.next = response.data.playlists.next;
				$scope.previous = response.data.playlists.previous;
				$scope.limit = response.data.playlists.limit;
				$scope.offset = response.data.playlists.offset;
				$scope.colNameArr = ['Namn','Ägare','Antal spår','Spela'];
	
				if(items) {
					for(i = 0; i < items.length; i++) {
						tmp = {};
						imgLen = items[i].images.length;
						tmp.img = (imgLen > 0) ? items[i].images[imgLen - 1].url : '';
						tmp.name = items[i].name;
						tmp.col3 = items[i].owner.id;
						tmp.col4 = items[i].tracks.total;
						tmp.play = items[i].external_urls.spotify;
						tmp.b64href = btoa(items[i].href);
						resArray.push(tmp);
					}
				}
				$scope.res = resArray;
				break;
			default:
				break;
		}
	};
	
	$scope.search = function() {
		if($scope.query) {
			$http.get(UrlManager.searchEndpoint($scope.query, $scope.type)).then(manageResponse);
		}
	};
	
	$scope.stepNext = function() {
		if($scope.next) {
			$http.get($scope.next).then(manageResponse);
		}
	};
	
	$scope.stepPrev = function() {
		if($scope.previous) {
			$http.get($scope.previous).then(manageResponse);
		}
	};
});