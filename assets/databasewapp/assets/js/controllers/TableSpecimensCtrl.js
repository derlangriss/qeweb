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
            "lengthMenu": [
                [20, 30, 50],
                ['20 rows', '30 rows', '50 rows']
            ],
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
                if (data[1] == 'Unknown') {
                    $(row).addClass('highlight');
                }
            },
            "dom": '<"top"l><"clear">rtp',
            "scrollX": true,
            "scrollY": "500px",
            "scrollCollapse": true,
            "order": [
                [7, "desc"],
                [8, "asc"],
                [9, "asc"]
            ],
            "columns": [{
                "class": "details-control",
                "orderable": false,
                "data": null,
                "defaultContent": "",
                "visible": false
            }, {
                "data": "0",
                "width": "25%",
                "orderable": false
            }, {
                "data": "1",
                "width": "16%",
                "orderable": false
            }, {
                "data": "2",
                "width": "16%",
                "orderable": false
            }, {
                "data": "3",
                "width": "16%",
                "orderable": false
            }, {
                "data": "4",
                "width": "16%",
                "orderable": false
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
                    return '<a href="' + "#/app/table/viewdata/" + full[10] + '"' + 'class="btn btn-transparent btn-xs"' + '>' + '<i class="' + 'fa fa-info-circle' + '"></i>' + '</a>';
                },
                targets: 11,
                "width": "6%",
                "orderable": false,
                "visible": true
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