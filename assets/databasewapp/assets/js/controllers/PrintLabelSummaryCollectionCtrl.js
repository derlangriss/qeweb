'use strict'; 
/** 
  * controllers for GoogleMap  
  * AngularJS Directive  
*/  
app.controller("PrintLabelSummaryCtrl", ["$scope", "$http", "$timeout", "$timeout", "$stateParams", "SweetAlert", "test", "$uibModal", "$log", "printsum", "ServicePDF",
    function($scope, $http, $interval, $timeout, $stateParams, SweetAlert, test, $uibModal, $log, printsum, ServicePDF) {
        
        $scope.items = ['settings', 'home', 'options', 'other'];
        $scope.selection = $scope.items[0];

        
        printsum.printspecimendata("collection").success(function(data) {
                 $scope.bglist = data; 
        })

        printsum.totaldata("collection").success(function(data) {
                 $scope.totaltest = data[0].totallabel; 
                 var a = parseInt(data[0].totallabel);
                 var b = a / 50;
                 $scope.papersize = b;
        })

  
        $scope.config = {
            autoHideScrollbar: true,
            setHeight: 600,
            scrollInertia: 500,
            theme: 'light',
            axis: 'yx',
            advanced: {
                updateOnContentResize: false
            },
            scrollButtons: {
                scrollAmount: 'auto', // scroll amount when button pressed
                enable: true // enable scrolling buttons by default
            }
        }

        $scope.downloadPdf = function() {
            /*
                          var fileName = "file_name.pdf";
                    var a = document.createElement("a");
                    document.body.appendChild(a);
                    ServicePDF.downloadPdf().then(function (result) {
                        var file = new Blob([result.data], {type: 'application/pdf'});
                        var fileURL = window.URL.createObjectURL(file);
                        a.href = fileURL;
                        a.download = fileName;
                        a.click();
                    });*/
           
                var fileName = "file_name.pdf";
                var a = document.createElement("a");
                document.body.appendChild(a);
                ServicePDF.downloadPdf().then(function(result) {
                    var file = new Blob([result.data], {
                        type: 'application/pdf'
                    });
                    var fileURL = window.URL.createObjectURL(file);
                    a.href = fileURL;
                    a.download = fileName;
                    a.click();
                    
                });


            
        }

        /*
               $.ajax({
                type: "GET",
                data:"",
                url: "assets/views/action/LabelPDF.php",
          success: function(result) {

           var fileName = "file_name.pdf";
                var a = document.createElement("a");
                document.body.appendChild(a);
                ServicePDF.downloadPdf().then(function (result) {
                    var file = new Blob([result.data], {type: 'application/pdf'});
                    var fileURL = window.URL.createObjectURL(file);
                    a.href = fileURL;
                    a.download = fileName;
                    a.click();
                });

                setTimeout(function() {
              URL.revokeObjectURL(fileURL);
            }, 10000);

          }
        });
        */
}])



