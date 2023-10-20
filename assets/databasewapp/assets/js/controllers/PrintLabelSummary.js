'use strict';
/** 
 * controllers for GoogleMap 
 * AngularJS Directive 
 */
app.controller("PrintSummary", ["$rootScope", "$scope", "files", "$timeout", "$stateParams", "printsum",
    function($rootScope, $scope, files, $timeout, $stateParams, printsum) {

        printsum.getdata(function(data) {
            $scope.contactList = data;
        })
        printsum.totaldata(function(result) {
            $rootScope.totaltest = result[0].totallabel;
        })



        $scope.labelprint = {};

        $scope.labelprint.Click = function() {

            $.ajax({
                url: "views/action/LabelPDF.php",
                type: "GET",
                dataType: 'binary',
                success: function(result) {
                    var url = URL.createObjectURL(result);
                    var $a = $('<a />', {
                        'href': url,
                        'download': 'document.pdf',
                        'text': "click"
                    }).hide().appendTo("body")[0].click();
                    setTimeout(function() {
                        URL.revokeObjectURL(url);
                    }, 10000);
                }
            });




        }


    }









])