'use strict';
/** 
  * controller for angular-aside
  * Off canvas side menu to use with ui-bootstrap. Extends ui-bootstrap's $uibModal provider.
*/
app.controller('AsideCtrl', ["$scope", "$aside", function ($scope, $aside) {
    $scope.openAside = function (position) {
        $aside.open({
            templateUrl: 'assets/views/ui_modals.html',
            placement: position,
            size: 'lg',
            backdrop: true,
            controller: function ($scope, $uibModalInstance) {
                $scope.ok = function (e) {
                    $uibModalInstance.close();
                    e.stopPropagation();
                };
                $scope.cancel = function (e) {
                    $uibModalInstance.dismiss();
                    e.stopPropagation();
                };
            }
        });
    };
}]);