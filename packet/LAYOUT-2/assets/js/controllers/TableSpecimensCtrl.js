'use strict';
/** 
 * controllers for GoogleMap  
 * AngularJS Directive 
 */
app.controller("TableSepcimensCtrl", ["$scope", "$http", "$timeout", "$stateParams", "SweetAlert", "$aside",
    function($scope, $http, $timeout, $stateParams, SweetAlert, $aside) {
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
        var dataarr = [];
        var table = $('#TableSpecimens').DataTable({
            "processing": true,
            "serverSide": true,
            "ajax": {
                "url": "assets/scripts/server_processing_specimensTbl.php",
                "type": "POST",
                "data": function(d) {
                    d.collyear = getIfNotSet($scope.collyear, '0', true);
                    d.collnumber = getIfNotSet($scope.collnumber, '0', true);
                }
            },
            "rowCallback": function(row, data) {
                if ($.inArray(data.DT_RowId, dataarr) !== -1) {
                    $(row).addClass('selected');
                }
            },
            "createdRow": function(row, data, index) {
                if (data[2] == 'Unknown') {
                    $(row).addClass('highlight');
                }
            },
            "dom": '<"top"li><"clear">rtp',
            "scrollX": true,
            "scrollY": "500px",
            "scrollCollapse": true,
            "order": [
                [1, "asc"]
            ],
            "columns": [{
                "class": "select-checkbox",
                "orderable": false,
                "data": null,
                "defaultContent": ""
            }, {
                "data": "0",
                "width": "25%"
            }, {
                "data": "1",
                "width": "16%"
            }, {
                "data": "2",
                "width": "16%"
            }, {
                "data": "3",
                "width": "16%"
            }, {
                "data": "4",
                "width": "16%"
            }, {
                "data": "5",
            }, {
                "data": "6",
            }, {
                "data": "7",
            }, {
                "data": "8",
            }, {
                "data": "9",
            }, {
                "data": "10",
            }],
            "columnDefs": [{
                "visible": false,
                targets: 6
            }, {
                "visible": false,
                targets: 7
            }, {
                "visible": false,
                targets: 8
            }, {
                "visible": false,
                targets: 9
            }, {
                "visible": false,
                targets: 10
            }, {
                render: function(data, type, full, meta) {
                    if (full[9] == true) {
                        return '<a href="' + "#/app/form/collection_data/" + full[9] + '"' + 'class="btn btn-transparent btn-xs"' + '>' + '<i class="' + 'fa fa-pencil' + '"></i>' + '</a>' + '<a ' + 'class="bookmark btn-transparent btn-xs"' + '>' + '<i class="' + 'fa fa-bookmark' + '"></i>' + '</a>';
                    } else {
                        return '<a href="' + "#/app/form/collection_data/" + full[9] + '"' + 'class="btn btn-transparent btn-xs"' + '>' + '<i class="' + 'fa fa-pencil' + '"></i>' + '</a>' + '<a ' + 'class="bookmark btn-transparent btn-xs"' + '>' + '<i class="' + 'fa fa-bookmark-o' + '"></i>' + '</a>';
                    }
                },
                targets: 11,
                "width": "6%",
                "orderable": false
            }],
        });

        function filterColumnSpecimens(i) {
            $('#TableSpecimens').DataTable().column(i).search($('#col' + i + '_filter').val()).draw();
             
        }
        $('input.column_filter_printcoll').on('keyup', function() {

            filterColumnSpecimens($(this).parents('DIV').attr('data-column'));
        });
        /*
               function modalpreins(a, b) {
                   $scope.collyear = a;
                   $scope.collnumber = b;
                   return $scope.collyear, $scope.collnumber;
               }
              
               $scope.openAside = function(position) {
                   $aside.open({
                       templateUrl: 'assets/views/SearchSpecContent.html',
                       placement: position,
                       size: 'md',
                       backdrop: true,
                       controller: function($scope, $uibModalInstance) {
                           $scope.Labelinsert = function() {
                               var a = $scope.collyear;
                               var b = $scope.collnumber;
                               modalpreins(a, b)
                               table.draw();
                               $uibModalInstance.close()
                           }
                           $scope.cancel = function() {
                               $uibModalInstance.dismiss("cancel")
                           }
                         
                       }
                   });
               };*/
    }
])