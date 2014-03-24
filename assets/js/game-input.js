var app = angular.module("basicBasketballApp", []);

app.controller("AppCtrl", function($scope) {
	$scope.stats = {
		Points: 0,
		FGM: 0,
		FGA: 0,
		ThreeM: 0,
		ThreeA: 0,
		FTM: 0,
		FTA: 0,
		OREB: 0,
		DREB: 0,
		ASST: 0,
		STL: 0,
		BLK: 0,
		TRN: 0,
		FOULS: 0
	};

	$scope.make = function(shotType) {
		if(shotType == 'FG') {
			$scope.stats.FGM += 1;
			$scope.stats.FGA += 1;
			$scope.stats.Points += 2;
		} else if (shotType == 'FT') {
			$scope.stats.FTM += 1;
			$scope.stats.FTA += 1;
			$scope.stats.Points += 1;
		} else if (shotType == 'Three') {
			$scope.stats.ThreeM += 1;
			$scope.stats.ThreeA += 1;
			$scope.stats.FGM += 1;
			$scope.stats.FGA += 1;
			$scope.stats.Points += 3;
		}
	};

	$scope.miss = function(shotType) {
		if(shotType == 'FG') {
			$scope.stats.FGA += 1;
		} else if (shotType == 'FT') {
			$scope.stats.FTA += 1;
		} else if (shotType == 'Three') {
			$scope.stats.ThreeA += 1;
			$scope.stats.FGA += 1;
		}
	};

	$scope.FGmake = function() {
		$scope.stats.FGM += 1;
		$scope.stats.FGA += 1;
		$scope.stats.Points += 2;
	};

	$scope.FGmiss = function() {
		$scope.stats.FGA += 1;
	};

	$scope.FTmake = function() {
		$scope.stats.FTM += 1;
		$scope.stats.FTA += 1;
		$scope.stats.Points += 1;
	};

	$scope.FTmiss = function() {
		$scope.stats.FTA += 1;
	};

	$scope.Threemake = function() {
		$scope.stats.ThreeM += 1;
		$scope.stats.ThreeA += 1;
		$scope.stats.FGM += 1;
		$scope.stats.FGA += 1;
		$scope.stats.Points += 3;
	};

	$scope.Threemiss = function() {
		$scope.stats.ThreeA += 1;
		$scope.stats.FGA += 1;
	};	


});

app.directive("stat", function() {
	return function(scope, element, attrs) {
		element.bind("click", function() {
			scope.$apply(attrs.stat);
		});
	}	
})