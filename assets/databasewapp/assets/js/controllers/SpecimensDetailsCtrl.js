'use strict';
/** 
 * controllers for GoogleMap  
 * AngularJS Directive 
 */
app.controller("SpecimensDetailsCtrl", ["$scope", "$http", "$timeout", "$stateParams", "info", "SweetAlert", "$aside",
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
        /**initiate collection form value **/
        $scope.specdata = {};
        info.specno($stateParams.idspecimens).success(function(result) {
            if (result[0].view_mode === 2) {
                console.log(result[0].view_mode);
                $scope.specdata.collectionid = result[0].coll_id;
                $scope.specdata.coll_code = result[0].coll_code;
                $scope.specdata.coll_year = result[0].coll_year;
                $scope.specdata.coll_number = result[0].coll_number;
                $scope.specdata.specimens_number = result[0].spec_number;
                $("#col6_filter").val(result[0].coll_code);
                $("#col7_filter").val(result[0].coll_year);
                $("#col8_filter").val(result[0].coll_number);
                filterColumnspec(6)
                filterColumnspec(7)
                filterColumnspec(8)
            } else if (result[0].coll_id === undefined) {} else {
                $scope.specdata.startdate = result[0].coll_start_date;
                $scope.specdata.enddate = result[0].coll_end_date;
                $scope.specdata.locality = result[0].coll_locality;
                $scope.specdata.specificlocality = result[0].coll_specific_locality;
                $scope.specdata.habitat = result[0].coll_habitat;
                $scope.specdata.province = result[0].province_en;
                $scope.specdata.amphur = result[0].amphur_en;
                $scope.specdata.latdecimal = Math.round(result[0].coll_lat_dec);
                $scope.specdata.longdecimal =  Math.round(result[0].coll_long_dec);
                $scope.specdata.masl = result[0].coll_masl;
                $scope.specdata.specfullnumber = result[0].specimens_full_number;
                $scope.specdata.tordername = result[0].torder_name;
                $scope.specdata.familyname = result[0].family_name;
                $scope.specdata.genusname = result[0].genus_name;
                $scope.specdata.speciesname = result[0].species_name;
                $scope.specdata.method = result[0].method;
            }
        });
        $scope.obj = {
            value1: 1,
            value2: false
        }
        $scope.checkValue1 = function() {
            return $scope.obj.value1 === 'someothervalue';
        }
        $scope.tab = 1;
        $scope.changestyle = function(tabno) {
            return $scope.obj.value1 === tabno;
        };
        $scope.setTab = function(newTab) {
            var Boxidmodel = getIfNotSet($scope.BoxShowDetailsBoxid, 0, true);
            if (newTab == 1 && Boxidmodel !== 0) {
                $scope.updatetype = 1
            }
            if (newTab == 2 && Boxidmodel !== 0) {
                $scope.updatetype = 2
            }
            if (newTab == 3 && Boxidmodel !== 0) {
                $scope.updatetype = 1
            }
            if (newTab == 4 && Boxidmodel !== 0) {
                $scope.updatetype = 1
            }
            if (newTab == 1 && Boxidmodel == 0) {
                $scope.updatetype = 0
            }
            if (newTab == 2 && Boxidmodel == 0) {
                $scope.updatetype = 0
            }
            if (newTab == 3 && Boxidmodel == 0) {
                $scope.updatetype = 0
            }
            if (newTab == 4 && Boxidmodel == 0) {
                $scope.updatetype = 0
            }
            $scope.tab = newTab;
            $scope.obj.value1 = newTab;
        };
        $scope.isSet = function(tabNum) {
            return $scope.tab === tabNum;
        };
    }
])