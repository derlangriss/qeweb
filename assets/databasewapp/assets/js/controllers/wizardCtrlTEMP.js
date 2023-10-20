'use strict';
/** 
  * controller for Wizard Form example
*/
app.controller('WizardCtrl', ['$scope', 'ngNotify',
function ($scope, ngNotify) {
    $scope.currentStep = 1;

    // Initial Value
    $scope.form =  function (form) {

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
              
            }
        }
  


   
}]);

/*
'use strict';
/** 
  * controller for Wizard Form example
*/

/*
app.controller('WizardCtrl', ['$scope', 'ngNotify',
function ($scope, ngNotify) {
   
    // Initial Value
    $scope.form = {
 
        next: function (form) {

            $scope.toTheTop(); 

            if (form.$valid) {
                form.$setPristine();
               
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
        }
    };


   
}]);
*/