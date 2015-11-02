angular.module('hockeyStats')
  .factory('teams', [
  '$http',

  function($http,$scope){
    var o = {
      teams: []
    };
    o.getAll = function() {
      return $http.get('/teams.json').success(function(data){
        angular.copy(data, o.teams);
        // console.log(data)
        // $scope.teamsData = data;
      });
    };
  return o;
}]);