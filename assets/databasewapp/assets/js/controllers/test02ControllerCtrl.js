'use strict';
/** 
 * controllers for GoogleMap  
 * AngularJS Directive 
 */
app.controller("testController", ["$scope", "$http", "$timeout","$state", "$stateParams", "SweetAlert", "test",
    function($scope, $http, $timeout, $stateParams,$state, SweetAlert, test) {
        $scope.go = function(route){
            $state.go(route);
        };

        $scope.active = function(route){
            return $state.is(route);
        };

        $scope.tabs = [
            { heading: "Tab 1", route:"app.test.tab1", active:false },
            { heading: "Tab 2", route:"app.test.tab2", active:false },
            { heading: "Tab 3", route:"app.test.tab3", active:false },
        ];

        $scope.$on("$stateChangeSuccess", function() {
            $scope.tabs.forEach(function(tab) {
                tab.active = $scope.active(tab.route);
            });
        });
    }
])