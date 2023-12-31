'use strict';
app.controller("SettingsCtrl", ['$rootScope', '$state', '$scope', '$stateParams',
    function($rootScope, $state, $scope) {
        $scope.initialise = function() {
            $scope.tabData = [{
                heading: 'One',
                route: 'user.settings.one',
                url: 'user/settings/one/:test',
                controller: 'ExampleCtrl',
                class: 'first-tab'
            }, {
                heading: 'Two',
                route: 'user.settings.two',
                class: 'second-tab'
            }];
        };
        $scope.initialise();
    }
]);