'use strict';
/**    
 * controller for ngImgCrop
 * Simple Image Crop directive for AngularJS.
 */
app.controller('LocationManualCtrl', ["$http", "$scope", "$location", 'ngNotify', function($http, $scope, $location, $state, ngNotify) {
    $scope.CountryIns = function(Mode) {
        var a = $("#country_direct_en_enter").val();
        var b = $("#country_direct_th_enter").val();
        var data = $.param({
            tMode: Mode,
            tcountry_direct_en_enter: a,
            tcountry_direct_th_enter: b
        });
        /*
        var config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
            }
        }       
        $http.post('assets/views/action/dbinsertMethod.php', data, config).success(function(data, status, headers, config) {
            $scope.PostDataResponse = data;
        }) 
        */
        $http({
            method: 'POST',
            url: 'assets/views/action/dbinsertCountryDirect.php',
            data: data,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
        }).success(function(response) {
            table.draw();
        });
    }
    $scope.ProvinceIns = function(Mode) {
        var a = $("#province_direct_en_enter").val();
        var b = $("#province_direct_th_enter").val();
        var c = $scope.myModel.country_direct_id
        var data = $.param({
            tMode: Mode,
            tprovince_direct_en_enter: a,
            tprovince_direct_th_enter: b,
            tcountry_direct_country_direct_id: c
        });
        /*
        var config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
            }
        }       
        $http.post('assets/views/action/dbinsertMethod.php', data, config).success(function(data, status, headers, config) {
            $scope.PostDataResponse = data;
        })
        */
        $http({
            method: 'POST',
            url: 'assets/views/action/dbinsertProvinceDirect.php',
            data: data,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
        }).success(function(response) {
            table.draw();
        });
    }
    $scope.AmphurIns = function(Mode) {
        var a = $("#amphur_direct_en_enter").val();
        var b = $("#amphur_direct_th_enter").val();
        var c = $scope.myModelPro.province_direct_id
        var data = $.param({
            tMode: Mode,
            tamphur_direct_en_enter: a,
            tamphur_direct_th_enter: b,
            tprovince_direct_province_direct_id: c
        });
        /*
        var config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
            }
        }       
        $http.post('assets/views/action/dbinsertMethod.php', data, config).success(function(data, status, headers, config) {
            $scope.PostDataResponse = data;
        })
        */
        $http({
            method: 'POST',
            url: 'assets/views/action/dbinsertAmphurDirect.php',
            data: data,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
        }).success(function(response) {
            table.draw();
        });
    }
    $scope.TambonIns = function(Mode) {
        var a = $("#tambon_direct_en_enter").val();
        var b = $("#tambon_direct_th_enter").val();
        var c = $scope.myModelAmp.amphur_direct_id
        var data = $.param({
            tMode: Mode,
            ttambon_direct_en_enter: a,
            ttambon_direct_th_enter: b,
            tamphur_direct_amphur_direct_id: c
        });
        /*
        var config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
            }
        }       
        $http.post('assets/views/action/dbinsertMethod.php', data, config).success(function(data, status, headers, config) {
            $scope.PostDataResponse = data;
        })
        */
        $http({
            method: 'POST',
            url: 'assets/views/action/dbinsertTambonDirect.php',
            data: data,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
        }).success(function(response) {
            table.draw();
        });
    }
    $scope.currentStep = 1;
    // Initial Value
    $scope.myModel;
    $scope.myModelPro;
    $scope.myModelAmp;
    $scope.myModelTam;
   
    $scope.getMethod = function(viewValue) {
        return $http.get('./assets/views/action/getmethodlistTEMP.php?query=' + viewValue).then(function(res) {
            /*console.log("Response:",res);*/
            var users = [];
            angular.forEach(res.data, function(item) {
                users.push(item.collectionmethodsdetails, item.idcollectionmethods);
            });
            /*console.log("users=",users);*/
            return users;
        });
    }
    $scope.getcountry = function(viewValue) {
        return $http.get('./assets/views/action/getCountryList.php?query=' + viewValue).then(function(res) {
            return res.data;
        });
    }
    $scope.getprovince = function(viewValue) {
        var a = $scope.myModel.country_direct_id;
        return $http.get('./assets/views/action/getProvinceList.php?query=' + viewValue + '&&cdid=' + a).then(function(res) {
            return res.data;
        });
    }
    $scope.getamphur = function(viewValue) {
        var a = $scope.myModelPro.province_direct_id;
        return $http.get('./assets/views/action/getAmphurList.php?query=' + viewValue + '&&pdid=' + a).then(function(res) {
            return res.data;
        });
    }
    $scope.gettambon = function(viewValue) {
        var a = $scope.myModelAmp.amphur_direct_id;
        return $http.get('./assets/views/action/getTambonList.php?query=' + viewValue + '&&adid=' + a).then(function(res) {
            return res.data;
        });
    }
    $scope.testest = function() {
        var a = $scope.country_direct.country_direct_id
        alert(a);
    }
    $scope.ngModelOptionsSelected = function(value) {
        if (arguments.length) {
            _selected = value;
        } else {
            return _selected;
        }
    };
    $scope.modelOptions = {
        debounce: {
            default: 500,
            blur: 250
        },
        getterSetter: true
    }
    // Initial Value
    $scope.form = {
 
        next: function (form) {

            $scope.toTheTop();

            if (form.$valid) {
                form.$setPristine();
                nextStep();
            } else {
                var field = null, firstError = null;
                for (field in form) {
                    if (field[0] != '$') {
                        if (firstError === null && !form[field].$valid) {
                            firstError = form[field].$name;
                        }

                        if (form[field].$pristine) {
                            form[field].$dirty = true;
                        }
                    }
                }

                angular.element('.ng-invalid[name=' + firstError + ']').focus();
                errorMessage();
            }
        },
        prev: function (form) {
            $scope.toTheTop();
            prevStep();
        },
        goTo: function (form, i) {
            if (parseInt($scope.currentStep) > parseInt(i)) {
                $scope.toTheTop();
                goToStep(i);

            } else {
                if (form.$valid) {
                    $scope.toTheTop();
                    goToStep(i);

                } else
                    errorMessage();
            }
        },
        submit: function () {

        },
        reset: function () {

        }
    };


    var nextStep = function () {
        $scope.currentStep++;
    };
    var prevStep = function () {
        $scope.currentStep--;
    };
    var goToStep = function (i) {
        $scope.currentStep = i;
    };
    var errorMessage = function (i) {

        ngNotify.set('please complete the form in this step before proceeding', {
            theme: 'pure',
            position: 'top',
            type: 'error',
            button: 'true',
            sticky: 'false',
        });
    };
}]);