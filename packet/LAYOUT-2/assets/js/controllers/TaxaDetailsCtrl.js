'use strict';
/** 
 * controller for Wizard Form example
 */
app.controller('TaxaDetailsCtrl', ['$scope', 'ngNotify', "$http", "$location",
    function($scope, ngNotify, $http, $location) {
        $scope.currentStep = 1;
        // Initial Value
        $scope.form = {
            next: function(form) {
                $scope.toTheTop();
                if (form.$valid) {
                    form.$setPristine();
                    nextStep();
                } else {
                    var field = null,
                        firstError = null;
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
            prev: function(form) {
                $scope.toTheTop();
                prevStep();
            },
            goTo: function(form, i) {
                if (parseInt($scope.currentStep) > parseInt(i)) {
                    $scope.toTheTop();
                    goToStep(i);
                } else {
                    if (form.$valid) {
                        $scope.toTheTop();
                        goToStep(i);
                    } else errorMessage();
                }
            },
            submit: function() {},
            reset: function() {
                alert("reset");
                goToStep(1);
                this.form.reset();
            }
        };
        var nextStep = function() {
            $scope.currentStep++;
        };
        var prevStep = function() {
            $scope.currentStep--;
        };
        var goToStep = function(i) {
            $scope.currentStep = i;
        };
        var errorMessage = function(i) {
            ngNotify.set('please complete the form in this step before proceeding', {
                theme: 'pure',
                position: 'top',
                type: 'error',
                button: 'true',
                sticky: 'false',
            });
        };
        $scope.clearCountry = function() {
            $(':input', '#countrydirectform').not(':button, :submit, :reset, :hidden').val('').removeAttr('checked').removeAttr('selected');
        }
        $scope.clearProvince = function() {
            $(':input', '#provincedirectform').not(':button, :submit, :reset, :hidden').val('').removeAttr('checked').removeAttr('selected');
        }
        $scope.clearAmphur = function() {
            $(':input', '#amphurdirectform').not(':button, :submit, :reset, :hidden').val('').removeAttr('checked').removeAttr('selected');
        }
        $scope.clearTambon = function() {
            $(':input', '#tambondirectform').not(':button, :submit, :reset, :hidden').val('').removeAttr('checked').removeAttr('selected');
        }
        $scope.OrderIns = function(Mode) {
            var a = $("#order_name_enter").val();
            var data = $.param({
                tMode: Mode,
                ttaxatype: "Order",
                torder_name: a
            });
            $http({
                method: 'POST',
                url: 'assets/views/action/dbinsertTaxa.php',
                data: data,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
            }).success(function(response) {
                $scope.answer = response;
                if ($scope.answer.answer == 'exist') {
                    alert("Order already exist");
                }
                if ($scope.answer.answer == 'added') {
                    alert("Complete");
                }
                $scope.clearOrder();
            });
        }
        $scope.FamilyIns = function(Mode) {
            var a = $("#family_name_enter").val();
            var b = $scope.specModelOrder.torder_id
            var data = $.param({
                tMode: Mode,
                ttaxatype: "Family",
                tfamily_name: a,
                torder_id: b
            });
            $http({
                method: 'POST',
                url: 'assets/views/action/dbinsertTaxa.php',
                data: data,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
            }).success(function(response) {
                $scope.clearFamily();
            });
        }
        $scope.GenusIns = function(Mode) {
            var a = $("#genus_name_enter").val();
            var b = $("#sub_family_enter").val();
            var c = $scope.specModelFamily.family_id;
            var data = $.param({
                tMode: Mode,
                ttaxatype: "Genus",
                tgenus_name: a,
                tsub_family: b,
                tfamily_id: c
            });
            $http({
                method: 'POST',
                url: 'assets/views/action/dbinsertTaxa.php',
                data: data,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
            }).success(function(response) {
                $scope.clearGenus();
            });
        }
        $scope.SpeciesIns = function(Mode) {
            var a = $("#species_name_enter").val();
            var b = $("#sub_genus_enter").val();
            var c = $scope.specModelGenus.genus_id
            var data = $.param({
                tMode: Mode,
                ttaxatype: "Species",
                tspecies_name: a,
                tsub_genus: b,
                tgenus_id: c
            });
            $http({
                method: 'POST',
                url: 'assets/views/action/dbinsertTaxa.php',
                data: data,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
            }).success(function(response) {
                $scope.clearSpecies();
            });
        }
        $scope.clearOrder = function() {
            $(':input', '#orderform').not(':button, :submit, :reset, :hidden').val('').removeAttr('checked').removeAttr('selected');
        }
        $scope.clearFamily = function() {
            $(':input', '#familyform').not(':button, :submit, :reset, :hidden').val('').removeAttr('checked').removeAttr('selected');
        }
        $scope.clearGenus = function() {
            $(':input', '#genusform').not(':button, :submit, :reset, :hidden').val('').removeAttr('checked').removeAttr('selected');
        }
        $scope.clearSpecies = function() {
            $(':input', '#speciesform').not(':button, :submit, :reset, :hidden').val('').removeAttr('checked').removeAttr('selected');
        }
        $scope.specModelOrder = '';
        $scope.specModelFamily = '';
        $scope.specModelGenus = '';
        $scope.specModelSpecies = '';
        $scope.onSelect = function($item, $model, $label) {}
        $scope.OrderKeyup = function(viewValue) {
            return $http.get('./assets/views/action/ReturnTaxaList.php?sOrder=' + viewValue).then(function(res) {
                return res.data;
            });
        }
        $scope.FamilyKeyup = function(viewValue) {
            var a = $scope.specModelOrder.torder_id;
            return $http.get('./assets/views/action/ReturnTaxaList.php?sFamily=' + viewValue + '&&torderid=' + a).then(function(res) {
                return res.data;
            });
        }
        $scope.GenusKeyup = function(viewValue) {
            var a = $scope.specModelFamily.family_id;
            return $http.get('./assets/views/action/ReturnTaxaList.php?sGenus=' + viewValue + '&&familyid=' + a).then(function(res) {
                return res.data;
            });
        }
        $scope.SpeciesKeyup = function(viewValue) {
            var a = $scope.specModelGenus.genus_id;
            return $http.get('./assets/views/action/ReturnTaxaList.php?sSpecies=' + viewValue + '&&genusid=' + a).then(function(res) {
                return res.data;
            });
        }
        $scope.master = {};
        $scope.update = function(user) {
            $scope.master = angular.copy(user);
        };
        $scope.reset = function(form) {
            
                goToStep(1);
           
            angular.copy($scope.master,form);

        };
        
    }
]);