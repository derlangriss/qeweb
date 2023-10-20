'use strict';
/** 
  * controller for angular-ladda
  * An angular directive wrapper for Ladda buttons.
*/
app.controller('AdminSettingsSmsCtrl', ["$scope", "$timeout", function ($scope, $timeout) {
   $scope.smsTabs = [
    {name: 'SMS TAB1', route: 'app.settings.sms.tab1'},
    {name: 'SMS TAB2', route: 'app.settings.sms.tab2'}
  ];
}]);