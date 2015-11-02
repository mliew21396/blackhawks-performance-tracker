angular.module('hockeyStats',['ui.router', 'templates'])
  .config([
    '$stateProvider',
    '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

      $stateProvider
        .state('home', {
          url: '/home',
          templateUrl: 'home/_home.html',
          controller: 'MainCtrl',
          resolve: {
            teamPromise: ['teams', function(teams){
              return teams.getAll();
            }]
          }
        });
      $urlRouterProvider.otherwise('home');
    }
  ])
