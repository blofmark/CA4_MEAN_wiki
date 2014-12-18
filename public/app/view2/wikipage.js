'use strict';

angular.module('myAppRename.view2', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view2', {
    templateUrl: 'app/view2/wikipage.html',
    controller: 'View2Ctrl'
  });
}])

.controller('View2Ctrl',function($scope, $http) {
          $http({
            method: 'GET',
            url: ''
          })

});
