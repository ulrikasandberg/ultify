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
controller('UltifySearchController', function ($scope, $http, UrlManager) {
	$scope.artist = '';
	
	var manageResponse = function(response) {
		var resArray = [];
		var items = (response.data.artists) ? response.data.artists.items : null;
		var i, j, tmp, imgLen;
		$scope.total = response.data.artists.total;
		$scope.next = response.data.artists.next;
		$scope.previous = response.data.artists.previous;
		$scope.limit = response.data.artists.limit;
		$scope.offset = response.data.artists.offset;
	
		if(items) {
			for(i = 0; i < items.length; i++) {
				tmp = {};
				imgLen = items[i].images.length;
				tmp.img = (imgLen > 0) ? items[i].images[imgLen - 1].url : '';
				tmp.name = items[i].name;
				tmp.followers = items[i].followers.total;
				tmp.genres = items[i].genres.join(', ');
				tmp.play = items[i].external_urls.spotify;
				resArray.push(tmp);
			}
		}
		$scope.res = resArray;
	};
	
	$scope.search = function() {
		if($scope.artist) {
			$http.get(UrlManager.searchEndpoint($scope.artist, 'artist')).then(manageResponse);
		}
	};
	
	$scope.stepNext = function() {
		if($scope.next) {
			$http.get($scope.next, 'artist').then(manageResponse);
		}
	};
	
	$scope.stepPrev = function() {
		if($scope.previous) {
			$http.get($scope.previous, 'artist').then(manageResponse);
		}
	};
});