'use strict';
/** 
  * controller for angular-ladda
  * An angular directive wrapper for Ladda buttons.
*/
app.controller('AdminSettingsCtrl', ["$scope", "$timeout", function ($scope, $timeout) {
    $scope.activeTab="GENERAL";
   $scope.tabClicked = function(tab){
     console.log(tab);
    $scope.activeTab = tab;
  }
  $scope.settingsTabs = [
    {name: 'GENERAL', route: 'app.settings.general'},
    {name: 'EMAIL', route: 'app.settings.email.tab1'},
    {name: 'SMS', route: 'app.settings.sms.tab1'}
  ];
}]);