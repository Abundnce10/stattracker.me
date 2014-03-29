$(document).ready(function(e) {

	if (navigator.vibrate) {
			navigator.vibrate([200, 100, 150]);
	}


	var $court = $("#basketball-court-container");
	

var createCourtSVG = function(width) {
    var width = width;
    var height = width * 0.75;
    var widthString = width.toString()
    var heightString = height.toString()

    // create <svg> element, populate width/height
    var html = '<svg id="basketball_court" xmlns="http://www.w3.org/2000/svg" height="'+ heightString  +'" width="'+ widthString +'">'  
    
    // create Boundary
    html += '<line x1="0" y1="0" x2="0" y2="'+ heightString +'" class="boundary" />';
    html += '<line x1="0" y1="0" x2="'+ widthString +'" y2="0" class="boundary" />';
    html += '<line x1="0" y1="'+ heightString +'" x2="'+ widthString +'" y2="'+ heightString +'" class="boundary" />';
    html += '<line x1="'+ widthString +'" y1="0" x2="'+ widthString +'" y2="'+ heightString +'" class="boundary" />';
    
    // create 3 Point Arc
    var arcX1 = Math.round(0.11 * width).toString();  // straight line, left corner
    var arcX2 = Math.round(0.8875 * width).toString();  // straight line, right corner
    var straightLine = Math.round(0.1 * height).toString();  // length of straight lines in corner
    html += '<path d="M '+ arcX1 +' 0 V '+ straightLine +'" />';
    html += '<path d="M '+ arcX2 +' 0 V '+ straightLine +'" />';
    var arcPath = ["M", arcX1, straightLine, "C", arcX1, height, arcX2, height, arcX2, straightLine].join(" ");
    html += '<path d="'+ arcPath +'" fill="transparent" />';
    
    // create Key Outline
    var keyX1 = Math.round(0.35 *width);
    var keyWidth = Math.round(0.3 * width);
    var keyHeight = Math.round(0.57 * height);
    var keyPath = ["M", keyX1, 0, "v", keyHeight, "h", keyWidth, "v", "-"+keyHeight].join(" ");
    html += '<path d="'+ keyPath +'" fill="transparent" />';
    
    // create Top of Key
    var centerX = Math.round(0.5 * width).toString();
    var topR = Math.round(0.15 * width).toString();
    html += '<circle cx="'+ centerX +'" cy="'+ keyHeight.toString() +'" r="'+ topR +'" fill="transparent" />';
    
    // create Backboard
    var backX1 = Math.round(0.41 * width);
    var backY = Math.round(0.033 * height);
    var backWidth = Math.round(0.18 * width);
    var backPath = ["M", backX1, backY, 'h', backWidth].join(' ');
    html += '<path d="'+ backPath +'" />';
    
    // create Basket
    var basketY = Math.round(0.08 * height).toString();
    var basketR = Math.round(0.03 * width).toString();
    html += '<circle cx="'+ centerX +'" cy="'+ basketY +'" r="'+ basketR +'" fill="transparent" />';
    
    
    // close <svg>
    html += '</svg>'
    
    return html
};


	var $courtWidth = $("#basketball-court-container").outerWidth();
	var $courtHTML = createCourtSVG($courtWidth);

	// append <svg>
	$court.append($courtHTML);


});








// -------------------------------------
//
// ANGULAR 
//
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