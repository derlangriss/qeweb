'use strict';
/**
 * controllers used for the dashboard
 */
app.controller("SpecimensCountCtrl", ["$scope", "$http", "$timeout", "$stateParams", "info", "SweetAlert", "$aside",
    function($scope, $http, $timeout, $stateParams, info, SweetAlert, $aside) {
        function getIfNotSet(value, newValue, overwriteNull) {
            if (typeof(value) === 'undefined' && overwriteNull === true) {
                return newValue;
            } else if (value === null && overwriteNull === true) {
                return newValue;
            } else if (value === 0 && overwriteNull === true) {
                return newValue;
            } else if (value === '' && overwriteNull === true) {
                return newValue;
            } else {
                return value;
            }
        }
        $scope.countSpecimens = function() {
            $http({
                method: 'GET',
                url: 'assets/views/action/countallSpecimens.php'
            }).success(function(response) {
                $scope.countspecall = response[0].countspecall
                $scope.countorder = response[0].countorder
                $scope.countfamily = response[0].countfamily
                $scope.countgenus = response[0].countgenus
                $scope.countspecies = response[0].countspecies
            });
        }
        $scope.countSpecimens();
        $scope.data = [];
        $http({
            method: 'GET',
            url: 'assets/views/action/specimensgrowth.php'
        }).success(function(result) {
            $scope.data = result[0].ceachyear;
            $scope.labels = result[0].cyear;

        });
       
        $scope.series = ['specimensall'];
        
        $scope.colors = [{
            fillColor: 'rgba(90,135,112,0.6)',
            strokeColor: 'rgba(90,135,112,1)',
            pointColor: 'rgba(90,135,112,1)'
        }, {
            fillColor: 'rgba(127,140,141,0.6)',
            strokeColor: 'rgba(127,140,141,1)',
            pointColor: 'rgba(127,140,141,1)'
        }, {
            fillColor: 'rgba(148,116,153,0.6)',
            strokeColor: 'rgba(148,116,153,1)',
            pointColor: 'rgba(148,116,153,1)'
        }];
        // Chart.js Options - complete list at http://www.chartjs.org/docs/
        $scope.options = {
            maintainAspectRatio: false,
            responsive: true,
            scaleFontFamily: "'Helvetica', 'Arial', sans-serif",
            scaleFontSize: 11,
            scaleFontColor: "#aaa",
            scaleShowGridLines: true,
            tooltipFontSize: 11,
            tooltipFontFamily: "'Helvetica', 'Arial', sans-serif",
            tooltipTitleFontFamily: "'Helvetica', 'Arial', sans-serif",
            tooltipTitleFontSize: 12,
            scaleGridLineColor: 'rgba(0,0,0,.05)',
            scaleGridLineWidth: 1,
            bezierCurve: true,
            bezierCurveTension: 0.4,
            scaleLineColor: 'transparent',
            scaleShowVerticalLines: false,
            pointDot: false,
            pointDotRadius: 2,
            pointDotStrokeWidth: 1,
            pointHitDetectionRadius: 20,
            datasetStroke: true,
            tooltipXPadding: 20,
            datasetStrokeWidth: 2,
            datasetFill: true,
            animationEasing: "easeInOutExpo"
        };
    }
]);