/*navigator.vibrate = navigator.vibrate ||
       navigator.webkitVibrate ||
       navigator.mozVibrate ||
       navigator.msVibrate;
       
var vibrateClient = function(duration) {
    navigator.vibrate(duration)
};

vibrateClient([120, 40, 120]);
*/


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
      FGA: 0,
      FTM: 0,
      FTA: 0
    },
    points : 0,
    secondary : {
			OREB: 0,
			DREB: 0,
			AST: 0,
			STL: 0,
			BLK: 0,
			TRN: 0,
			FOUL: 0
    }
  };

  var _gameLogId = 0;
  var _gameLogs = [];

  var timestampToTime = function() {
  	var now = new Date();
  	// var hour = now.getHours();
  	var hour = now.getHours()>12?now.getHours()-12:now.getHours()<1?12:now.getHours();
  	var mins = (now.getMinutes()<10?'0':'') + now.getMinutes();
  	var secs = (now.getSeconds()<10?'0':'') + now.getSeconds();
  	return [hour, mins, secs].join(':');
  };

  var addLog = function(statType, distinction) {
  	var time = timestampToTime();
  	_gameLogId += 1;

  	switch (statType)
  	{
  		case "FG":
  			if (distinction) {
	  			_gameLogs.push({msg: "Made 2pt Field Goal", time: time, id: _gameLogId, type: "FGM"});
	  			break;
	  		} else {
	  			_gameLogs.push({msg: "Missed 2pt Field Goal", time: time, id: _gameLogId, type: "FGA"});
	  			break;
	  		};
	  	case "FT":
  			if (distinction) {
	  			_gameLogs.push({msg: "Made Free Throw", time: time, id: _gameLogId, type: "FTM"});
	  			break;
	  		} else {
	  			_gameLogs.push({msg: "Missed Free Throw", time: time, id: _gameLogId, type: "FTA"});
	  			break;
	  		};
	  	case "DREB":
	  		_gameLogs.push({msg: "Defensive Rebound", time: time, id: _gameLogId, type: statType});
	  		break;
	  	case "OREB":
	  		_gameLogs.push({msg: "Offensive Rebound", time: time, id: _gameLogId, type: statType});
	  		break;
	  	case "AST":
	  		_gameLogs.push({msg: "Assist", time: time, id: _gameLogId, type: statType});
	  		break;
	  	case "STL":
	  		_gameLogs.push({msg: "Steal", time: time, id: _gameLogId, type: statType});
	  		break;
	  	case "BLK":
	  		_gameLogs.push({msg: "Block", time: time, id: _gameLogId, type: statType});
	  		break;
	  	case "TRN":
	  		_gameLogs.push({msg: "Turnover", time: time, id: _gameLogId, type: statType});
	  		break;
	  	case "FOUL":
	  		_gameLogs.push({msg: "Foul", time: time, id: _gameLogId, type: statType});
	  		break;
  	}

  };
  
  
  return {
    addShot : function(shot){
      console.log(shot);
      _stats.shots.push(shot);
      _stats.shooting.FGA += 1;
      // made FG?
      if (shot.shotResult) { 
      	_stats.shooting.FGM += 1;
      	_stats.points += 2;
      }
      // send to gameLogs
      addLog('FG', shot.shotResult)
    },
    addStat : function(stat){
      console.log(stat);
      _stats.secondary[stat] += 1;
      console.log(_stats);
      addLog(stat)
    },
    addFreeThrow : function(freeThrow){
    	console.log(freeThrow);
    	_stats.shooting.FTA += 1;
    	// made free throw?
    	if (freeThrow) { 
    		_stats.shooting.FTM += 1;
    		_stats.points += 1;
      }
      addLog('FT', freeThrow);
    },
    stats : _stats,
    gameLogs : _gameLogs
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
    $scope.addFreeThrow = GameData.addFreeThrow;
    
    $scope.gameStats = GameData.stats;
  }
]);


myApp.controller('SummaryCtrl', ['$scope','GameData',
  
  function($scope, GameData) {
    
    $scope.gameStats = GameData.stats;
    
  }
]);


myApp.controller('GameLogsCtrl', ['$scope', 'GameData',
	
	function($scope, GameData) {

		$scope.gameLogs = GameData.gameLogs;

	}
]);


myApp.filter('reverse', function() {
  return function(items) {
    return items.slice().reverse();
  };
});




