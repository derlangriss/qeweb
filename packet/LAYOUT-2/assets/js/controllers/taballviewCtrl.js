'use strict';
/**  
 * controllers for GoogleMap  
 * AngularJS Directive  
 */
app.controller("taballviewCtrl", ["$scope", "$http", "$timeout", "$stateParams", "$state", "SweetAlert", "info", "ngNotify", "$aside",
    function($scope, $http, $timeout, $stateParams, $state, SweetAlert, info, ngNotify, $aside) {
        $scope.datareportspec = [];
        $http({
            method: 'GET',
            url: 'assets/views/action/getOverallBoxView.php'
        }).success(function(result) {
            $scope.datareportspec = result;
        });
    }
])