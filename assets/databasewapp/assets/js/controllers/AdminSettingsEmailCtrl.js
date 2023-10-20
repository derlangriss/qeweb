'use strict';
/** 
  * controller for angular-ladda
  * An angular directive wrapper for Ladda buttons.
*/
app.controller('AdminSettingsEmailCtrl', ["$scope", "$timeout", function ($scope, $timeout) {
   $scope.emailTabs = [
    {name: 'EMAIL TAB1', route: 'app.settings.email.tab1'},
    {name: 'EMAIL TAB2', route: 'app.settings.email.tab2'}
  ];
}]);