'use strict';
/**  
 * controllers for GoogleMap  
 * AngularJS Directive  
 */
app.controller("FormMainSpecCtrl", ["$scope", "$http", "$timeout", "$stateParams", "$state", "SweetAlert", "info", "ngNotify", "$aside",
    function($scope, $http, $timeout, $stateParams, $state, SweetAlert, info, ngNotify, $aside) {
        $scope.ReportSearch = function() {
            var a = $scope.reportModel.month;
            var b = $scope.reportModel.year;
            if (a && b !== undefined) {
                $state.go('app.form.transfer_specimens', {
                    "monthid": a,
                    "yearid": b
                }) 
            } else {
                alert("กรุณาเลือกเดือนและปีของการรายงาน");
            }
        }
        $scope.ReportSearchnew = function() {
            var a = $scope.reportModel.month;
            var b = $scope.reportModel.year;
            if (a && b !== undefined) {
                $state.go('app.form.managespecimens', {
                    "monthid": a,
                    "yearid": b
                })
            } else {
                alert("กรุณาเลือกเดือนและปีของการรายงาน");
            }
        }
        $scope.formatDateReport = function(i,x) {
       
            var month = new Array();
            month[0] = "January";
            month[1] = "February";
            month[2] = "March";
            month[3] = "April";
            month[4] = "May";
            month[5] = "June";
            month[6] = "July";
            month[7] = "August";
            month[8] = "September";
            month[9] = "October";
            month[10] = "November";
            month[11] = "December";
            var mm = month[i];
            var yyyy = x;
            if (mm < 10) {
                mm = '0' + mm;
            }
            var engmonth = mm + ' ' + yyyy;
            return engmonth
        }
        $scope.reportboxlist = [];
        $http({
            method: 'GET',
            url: 'assets/views/action/getOverallBoxView.php'
        }).success(function(result) {
            $scope.reportboxlist = result;
        });
        $scope.mreportspeclist = [];
        $http({
            method: 'GET',
            url: 'assets/views/action/getOveralllatestspecView.php'
        }).success(function(result) {
            $scope.mreportspeclist = result;
           $scope.test =  $scope.formatDateReport('1',2018);
           console.log($scope.test)
        });
    }
])