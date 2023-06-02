'use strict'; 
/** 
  * controllers for GoogleMap  
  * AngularJS Directive  
*/   
app.controller("PrintLabelSummaryCtrl", ["$scope", "$http", "$timeout", "$timeout", "$stateParams", "SweetAlert", "test", "$uibModal", "$log", "printsum", "ServicePDF",
    function($scope, $http, $interval, $timeout, $stateParams, SweetAlert, test, $uibModal, $log, printsum, ServicePDF) {
        
        $scope.items = ['settings', 'home', 'options', 'other'];
        $scope.selection = $scope.items[0];

        
        printsum.printspecimendata("specimen").success(function(dataspecimen) {
                 $scope.specimenlist = dataspecimen; 
        })

        printsum.totaldata("specimen").success(function(dataspecimen) {
                 $scope.totallabelspecimen = dataspecimen[0].totallabel;                 
                 $scope.papersizespecimen = dataspecimen[0].totalpapersize;
        })
        
        printsum.printspecimendata("collection").success(function(datacollection) {
                 $scope.collectionlist = datacollection; 
        })

        printsum.totaldata("collection").success(function(datacollection) {
                 $scope.totallabelcollection = datacollection[0].totallabel;                 
                 $scope.papersizecollection = datacollection[0].totalpapersize;
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

        $scope.downloadPdf = function(labeltype) {
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
                ServicePDF.downloadPdf(labeltype).then(function(result) {
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



