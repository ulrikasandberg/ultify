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
module('UltifyDetails').
controller('UltifyDetailsController', function($scope, $http, $routeParams, $sce) {
	 $scope.frameUrl = '';
	 
	 var showDetails = function(response) {
	 	switch($routeParams.type) {
			case 'track':
				$scope.track = response.data;
				$scope.duration = function(ms) {
					var minutes = Math.floor(ms / 60000);
					var seconds = ((ms % 60000) / 1000).toFixed(0);
					return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
				}($scope.result.duration_ms);
				break;
			case 'artist':
				$scope.artist = response.data;
				break;
			case 'album':
				break;
			case 'playlist':
				break;
			default:
				break;
		 }
	 };
	 
	 $http.get(atob($routeParams.url)).then(showDetails);
	 
	 $scope.playPreview = function() {
	 	angular.element(document.querySelector("#preview-frame")).removeClass("ul-hidden");
	 	angular.element(document.querySelector("#preview-play")).addClass("ul-hidden");
	 	$scope.frameUrl = $sce.trustAsResourceUrl($scope.result.preview_url);
	 };
});