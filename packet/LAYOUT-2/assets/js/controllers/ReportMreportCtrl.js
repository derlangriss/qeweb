'use strict';
/** 
 * controllers for GoogleMap  
 * AngularJS Directive 
 */
app.controller("ReportMreportCtrl", ["$scope", "ngNotify", "$http", "$timeout", "$stateParams", "SweetAlert", "test", "$uibModal", "$log", "printsum", "$state", "calculatedbData", "ServicePDF",
    function($scope, ngNotify, $http, $timeout, $stateParams, SweetAlert, test, $uibModal, $log, printsum, $state, calculatedbData, ServicePDF) {
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

        function today() {
            var today = new Date();
            /*var dd = today.getDate();*/
            var mm = today.getMonth() + 1;
            var yyyy = today.getFullYear();
            if (mm < 10) {
                mm = '0' + mm;
            }
            today = yyyy + '-' + mm;
            return today;
        }
        $scope.getCountspecimens = {};
        calculatedbData.getSummonth("MonthSum", today()).success(function(monthlysummary) {
            $scope.ngmodelMothlysum = getIfNotSet(monthlysummary[0].countspecmonth, 0, true);
            $scope.ngmodelMothDisplay = 'Non';
            $scope.ngmodelYearDisplay = 'Selected';
            $scope.getCountspecimens = monthlysummary;
        });
        $('#date').datepicker({
            format: "yyyy/mm",
            todayHighlight: true,
            autoclose: true,
            minViewMode: "months",
            defaultDate: 'now'
        });
        $("#date").datepicker("setDate", new Date());
        $.fn.dataTable.ext.buttons.alert = {
            className: 'buttons-alert',
            action: function(e, dt, node, config) {
                $scope.insertprintqueue('save', 'specimens_printqueue')
            }
        };
        var dataarr = [];
        var table = $('#ReportSpecTbl').DataTable({
            "processing": true,
            "serverSide": true,
            "ajax": {
                "url": "assets/scripts/server_processing_mreport.php",
                "type": "POST",
                "data": function(d) {
                    d.mreport_date = getIfNotSet($scope.mreport_date, '', true);
                }
            },
            "rowCallback": function(row, data) {
                if ($.inArray(data.DT_RowId, dataarr) !== -1) {
                    $(row).addClass('selected');
                }
            },
            "dom": '<"top"B<"text-right"l>>rt<"bottom"ip><"clear">',
            "scrollX": true,
            "scrollY": "400px",
            "scrollCollapse": true,
            "lengthMenu": [
                [10, 30, 50, -1],
                ['10 rows', '30 rows', '50 rows', 'All']
            ],
            buttons: [{
                extend: 'alert',
                text: 'Add to print queue',
                enabled: true
            }, {
                text: 'Select all',
                action: function(row) {
                    table.rows().select();
                    $(row).addClass('selected');
                    var data = table.rows('.selected').select().data();
                    for (var i = 0; i < data.length; i++) {
                        dataarr.push(data[i]['DT_RowId']);
                    }
                    return dataarr;
                },
                enabled: true
            }, {
                text: 'Select none',
                action: function() {
                    table.rows().deselect();
                    dataarr = [];
                },
                enabled: true
            }, {
                text: 'PrintedLabel',
                action: function(e, dt, button, config) {
                    $state.go("app.report.form_printedlabel")
                },
                enabled: true
            }],
            "order": [
                [0, "asc"]
            ],
            "columns": [{
                "class": "select-checkbox",
                "orderable": false,
                "data": null,
                "defaultContent": ""
            }, {
                "data": "0",
                "width": "20%"
            }, {
                "data": "1",
                "width": "15%"
            }, {
                "data": "2",
                "width": "15%"
            }, {
                "data": "3",
                "width": "15%"
            }, {
                "data": "4",
                "width": "15%"
            }, {
                "data": "5",
                "width": "10%"
            }, {
                "data": "6"
            }, {
                "data": "7"
            }, {
                "data": "8"
            }, {
                "data": "9"
            }, {
                "data": "10",
                "width": "5%",
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
                render: function(data, type, full, meta) {
                    return '<a href="' + "#/app/form/collection_data/" + full[0] + '"' + 'class="btn btn-transparent btn-xs"' + '>' + '<i class="' + 'fa fa-pencil' + '"></i>' + '</a>' + '<a ' + 'class="delete btn-transparent btn-xs"' + '>' + '<i class="' + 'fa fa-times fa fa-white' + '"></i>' + '</a>';
                },
                targets: 11,
                orderable: false
            }],
            order: [
                [1, 'asc']
            ]
        });
        $scope.msearch = function() {
            var tmreport_date = getIfNotSet($scope.mreport_date, '', true);
            calculatedbData.getSummonth("MonthSum", tmreport_date).success(function(monthlysummary) {
                $scope.ngmodelMothlysum = getIfNotSet(monthlysummary[0].countspecmonth, 0, true);
                $scope.ngmodelMothDisplay = getIfNotSet(monthlysummary[0].monthDisplay, 0, true);
                $scope.ngmodelYearDisplay = getIfNotSet(monthlysummary[0].yearDisplay, 0, true);
                $scope.getCountspecimens = monthlysummary;
                table.draw();
            });
        }
        $scope.mreset = function() {
            var tmreport_date = null;
            $("#date").datepicker("setDate", null);
            calculatedbData.getSummonth("MonthSum", tmreport_date).success(function(monthlysummary) {
                $scope.ngmodelMothlysum = getIfNotSet(monthlysummary[0].countspecmonth, 0, true);
                $scope.ngmodelMothDisplay = 'Non';
                $scope.ngmodelYearDisplay = 'Selected';
                $scope.getCountspecimens = monthlysummary;
                table.draw();
            });
        }
        $scope.spinner = {
            active: false,
            on: function() {
                this.active = true;
            },
            off: function() {
                this.active = false;
            }
        };

        function monthstr() {
            var month = new Array();
            month[0] = "January";
            month[1] = "February";
            month[2] = "March";
            month[3] = "April";
            month[4] = "May";
            month[5] = "June";
            month[6] = "July";
            month[7] = "August";
            month[8] = "September";
            month[9] = "October";
            month[10] = "November";
            month[11] = "December";
            var d = new Date();
            var n = month[d.getMonth()];
            return n;
        }
        $scope.PrintReport = function(reporttype) { 
            var datenow = new Date();
            var name = "Report";
            var getyear = datenow.getFullYear();
            var getdate = datenow.getDate();
            var getmonth = monthstr();
            var gethours = datenow.getHours();
            var getsecond = datenow.getSeconds();
            var getMilliseconds = datenow.getMilliseconds();
            var filename = name.concat('Report', getyear, getmonth, getdate, gethours, getsecond, getMilliseconds);
            var value = 0
            $scope.spinner.on()
            var fileName = filename + ".pdf";
            var a = document.createElement("a");
            document.body.appendChild(a);
            var tmreport_date = getIfNotSet($scope.mreport_date, '', true);
            $timeout(function() {
                ServicePDF.downloadReport(reporttype, tmreport_date).then(function(result) {
                    console.log(result);
                    var file = new Blob([result.data], {
                        type: 'application/pdf'
                    });
                    var fileURL = window.URL.createObjectURL(file);
                    a.href = fileURL;
                    a.download = fileName;
                    a.click();
                    $scope.spinner.off();
                });
            }, 2000);
        }
        $scope.PrintDurable = function(reporttype) {
            var datenow = new Date();
            var name = "Report";
            var getyear = datenow.getFullYear();
            var getdate = datenow.getDate();
            var getmonth = monthstr();
            var gethours = datenow.getHours();
            var getsecond = datenow.getSeconds();
            var getMilliseconds = datenow.getMilliseconds();
            var filename = name.concat('Durable', getyear, getmonth, getdate, gethours, getsecond, getMilliseconds);
            var value = 0
            $scope.spinner.on()
            var fileName = filename + ".pdf";
            var a = document.createElement("a");
            document.body.appendChild(a);
            $timeout(function() {
                ServicePDF.downloadDurable(reporttype).then(function(result) {
                    console.log(result);
                    var file = new Blob([result.data], {
                        type: 'application/pdf'
                    });
                    var fileURL = window.URL.createObjectURL(file);
                    a.href = fileURL;
                    a.download = fileName;
                    a.click();
                    $scope.spinner.off();
                });
            }, 2000);
        }
    }
]);
app.controller('AcquisitionCtrl', ["$scope",
    function($scope) {
        $scope.labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
        $scope.series = ['dataset'];
        $scope.data = [
            [65, 59, 80, 81, 56, 55, 40]
        ];
        $scope.colors = [{
            fillColor: 'rgba(148,116,153,0.7)',
            strokeColor: 'rgba(148,116,153,0)',
            highlightFill: 'rgba(148,116,153,1)',
            highlightStroke: 'rgba(148,116,153,1)'
        }];
        // Chart.js Options
        $scope.options = {
            maintainAspectRatio: false,
            showScale: false,
            barDatasetSpacing: 0,
            tooltipFontSize: 11,
            tooltipFontFamily: "'Helvetica', 'Arial', sans-serif",
            responsive: true,
            scaleBeginAtZero: true,
            scaleShowGridLines: false,
            scaleLineColor: 'transparent',
            barShowStroke: false,
            barValueSpacing: 5
        };
    }
]);