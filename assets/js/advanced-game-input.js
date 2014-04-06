navigator.vibrate = navigator.vibrate ||
       navigator.webkitVibrate ||
       navigator.mozVibrate ||
       navigator.msVibrate;
       
var vibrateClient = function(duration) {
    navigator.vibrate(duration)
};

vibrateClient([120, 40, 120]);



var myApp = angular.module('myApp', []);


myApp.directive('court', ['$window','$timeout', function($window,$timeout) {
  // 1. grab width of #basketball-container (parent)
  // 2. apply sizing calculations
  // 3. return <svg>
 
  function _linkDirective(scope, element, attributes) {
    
    scope.uiParams = {
      window : {
        h : 100,
        w : 100
      },
      court : {
        h: 5,
        w : 5
      }
    };
    
    scope.addShot = function(makeMiss, ev){
      var shotResult, style;
      
      console.log(ev);
      console.log(scope.uiParams.court.w);
      
      var xPrct = Math.round(ev.offsetX /scope.uiParams.court.w * 100) / 100;
      var yPrct = Math.round(ev.offsetY /scope.uiParams.court.h * 100) / 100;
      
      // random for now
      shotResult = Math.floor(Math.random()*2);
      if (shotResult) {
        style = 'shotSuccess';
      } else {
        style = 'shotMiss';
      }
      
      /*
      // determine if made/missed shot
      if (makeMiss) {
        shotResult = 1;
        style = 'shotSuccess';
      } else {
        shotResult = 0;
        style = 'shotMiss';
      }
      */
      
      var newShot = { x : ev.offsetX, 
                      y : ev.offsetY, 
                      r : 10, 
                      'class': style,
                      xPrct: xPrct,
                      yPrct: yPrct,
                      shotResult: shotResult
      };
      scope.onShot(newShot);
      
      console.log(scope.stats);
    };
    
    scope.recalculate = function(){
      scope.uiParams.court.w = element.width();
      scope.uiParams.court.h = scope.uiParams.court.w * 0.75;
    };
    
    
    angular.element($window).bind('resize', function(){
      $timeout(function(){
        redrawUI();
      },0);
    });
    
      
    function redrawUI(){
      scope.uiParams.window.h = $window.innerHeight;
      scope.uiParams.window.w = $window.innerWidth;
      
      scope.recalculate();
    }
    
    //fire once to set it off
    redrawUI();
  }

  //this is the directive API.
  return {
    //replace tells ng to replace the element with our template.
    replace: true,
    
    templateUrl : './templates/court.html',
    
    //restrict : 'E' for <my-thing>, 'A' for <div my-thing>, 'EA' for both
    restrict: 'E',

    //scope allows us to bring in values from the controller.
    scope: {
      stats: '=',
      onShot: '='
    },
  
    //this fires once - its where you want to set up your listeners.
    link: _linkDirective
    }

  }
]);


myApp.factory('GameData',function(){
  
  var _stats = {
    shots : [],
    shooting : {
      FGM: 0,
      FGA: 0
    },
    secondary : {
			OREB: 0,
			DREB: 0,
			ASST: 0,
			STL: 0,
			BLK: 0,
			TRN: 0,
			FOUL: 0
    }
  };
  
  
  return {
    addShot : function(shot){
      console.log(shot);
      _stats.shots.push(shot);
      _stats.shooting.FGA += 1;
      // determine if made/missed
      if (shot.shotResult) { _stats.shooting.FGM += 1; }
    },
    addStat : function(stat){
      console.log(stat);
      _stats.secondary[stat] += 1;
      console.log(_stats);
    },
    stats : _stats
  };
});


myApp.controller('ShotCtrl', ['$scope','GameData',
  
  function($scope, GameData) {
    
    //connect the stats object to scope.
    $scope.gameStats = GameData.stats;
    
    $scope.addShotToData = GameData.addShot;

  }
]);



myApp.controller('StatCtrl', ['$scope','GameData',
  
  function($scope, GameData) {
    
    $scope.addStat = GameData.addStat;
    
    $scope.gameStats = GameData.stats;
  }
]);


myApp.controller('SummaryCtrl', ['$scope','GameData',
  
  function($scope, GameData) {
    
    $scope.gameStats = GameData.stats;
    
  }
]);










/*
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

	$scope.test = function() {

		alert('clicked <svg>');

	};


});

app.directive("stat", function() {
	return function(scope, element, attrs) {
		element.bind("click", function() {
			scope.$apply(attrs.stat);
		});
	}	
})
*/