'use strict';

angular.module('myAppRename.view3', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/view3', {
            templateUrl: 'app/view3/categories.html',
            controller: 'View3Ctrl'
        });
    }])

    .controller('View3Ctrl', function ($scope, $http) {

    });
