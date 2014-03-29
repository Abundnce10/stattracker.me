navigator.vibrate = navigator.vibrate ||
       navigator.webkitVibrate ||
       navigator.mozVibrate ||
       navigator.msVibrate;

var vibrateClient = function(duration) {
    navigator.vibrate(duration)
};

vibrateClient([120, 40, 120]);


var app = angular.module("basicBasketballApp", []);

app.controller("AppCtrl", function($scope) {
	$scope.stats = {
		Points: 0,
		Rebounds: 0,
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
		FOUL: 0
	};

	$scope.make = function(shotType) {
        
        // vibrate client
        vibrateClient([120, 40, 120]);
        
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
        
        // vibrate client
        vibrateClient([120, 40, 120]);
        
		if (shotType == 'FG') {
			$scope.stats.FGA += 1;
		} else if (shotType == 'FT') {
			$scope.stats.FTA += 1;
		} else if (shotType == 'Three') {
			$scope.stats.ThreeA += 1;
			$scope.stats.FGA += 1;
		}
	};

	$scope.increment = function(statType) {

		
		// vibrate client
        vibrateClient([120, 40, 120]);

		if (statType == 'OREB') {
			$scope.stats.OREB += 1;
			$scope.stats.Rebounds += 1;
		} else if (statType == 'DREB') {
			$scope.stats.DREB += 1;
			$scope.stats.Rebounds += 1;
		} else if (statType == 'ASST') {
			$scope.stats.ASST += 1;
		} else if (statType == 'BLK') {
			$scope.stats.BLK += 1;
		} else if (statType == 'STL') {
			$scope.stats.STL += 1;
		} else if (statType == 'TRN') {
			$scope.stats.TRN += 1;
		} else if (statType == 'FOUL') {
			$scope.stats.FOUL += 1;
		}
	};


});

app.directive("stat", function() {
	return function(scope, element, attrs) {
		element.bind("click", function() {
			scope.$apply(attrs.stat);
		});
	}	
})