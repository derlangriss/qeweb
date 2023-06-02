'use strict';
/** 
 * controllers for GoogleMap  
 * AngularJS Directive 
 */
app.controller("ReportMreportCtrl", ["$scope", "ngNotify", "$http", "$timeout", "$stateParams", "SweetAlert", "test", "$uibModal", "$log", "printsum", "$state", "calculatedbData",
    function($scope, ngNotify, $http, $timeout, $stateParams, SweetAlert, test, $uibModal, $log, printsum, $state, calculatedbData) {
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
            $scope.ngmodelMothDisplay = getIfNotSet(monthlysummary[0].monthDisplay, 0, true);
            $scope.ngmodelYearDisplay = getIfNotSet(monthlysummary[0].yearDisplay, 0, true);
            $scope.getCountspecimens = monthlysummary;
        });
        $('#date').datepicker({
            format: "yyyy/mm",
            todayHighlight: true,
            autoclose: true,
            minViewMode: "months"
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
            });
            table.draw();
        }
        $scope.mreset = function() {
            var tmreport_date = '';
            calculatedbData.getSummonth("MonthSum", tmreport_date).success(function(monthlysummary) {
                $scope.ngmodelMothlysum = getIfNotSet(monthlysummary[0].countspecmonth, 0, true);
                $scope.ngmodelMothDisplay = getIfNotSet(monthlysummary[0].monthDisplay, 0, true);
                $scope.ngmodelYearDisplay = getIfNotSet(monthlysummary[0].yearDisplay, 0, true);
                $scope.getCountspecimens = monthlysummary;
            });
            table.draw();
        }
        /*** test table ***/
        var table = $('.grid').not('.initialized').addClass('initialized').show().DataTable({
            "processing": true,
            "serverSide": true,
            "ajax": {
                "url": "assets/scripts/server_processing_yreport.php",
                "type": "POST",
                "data": function(d) {
                    d.mreport_date = getIfNotSet($scope.yreport_date, '', true);
                }
            },
            "rowCallback": function(row, data) {
                if ($.inArray(data.DT_RowId, dataarr) !== -1) {
                    $(row).addClass('selected');
                }
            },
            "scrollX": true,
            "scrollY": "400px",
            "scrollCollapse": true,
            "columnDefs": [{
                "visible": false,
                "targets": 0
            }],
            "order": [
                [0, 'asc']
            ],
            "stateSave": false,
            "stateDuration": 60 * 60 * 24 * 365,
            "displayLength": 100,
            "sScrollX": "100%",
            "dom": 'lfTrtip',
            "drawCallback": function(settings) {
                var api = this.api();
                var rows = api.rows({
                    page: 'current'
                }).nodes();
                var last = null;
                var colonne = api.row(0).data().length;
                var totale = new Array();
                totale['Totale'] = new Array();
                var groupid = -1;
                var subtotale = new Array();
                api.column(0, {
                    page: 'current'
                }).data().each(function(group, i) {
                    if (last !== group) {
                        groupid++;
                        $(rows).eq(i).before('<tr class="group"><td>' + group + '</td></tr>');
                        last = group;
                    }
                    var val = api.row(api.row($(rows).eq(i)).index()).data();
                    /*
                    $.each(val, function(index2, val2) {
                        if (typeof subtotale[groupid] == 'undefined') {
                            subtotale[groupid] = new Array();
                        }
                        if (typeof subtotale[groupid][index2] == 'undefined') {
                            subtotale[groupid][index2] = 0;
                        }
                        if (typeof totale['Totale'][index2] == 'undefined') {
                            totale['Totale'][index2] = 0;
                        }
                        var valore = Number(val2.replace('€', "").replace('.', "").replace(',', "."));
                        subtotale[groupid][index2] += valore;
                        totale['Totale'][index2] += valore;
                    });*/
                })
                $('tbody').find('.group').each(function(i, v) {
                    var rowCount = $(this).nextUntil('.group').length;
                    $(this).find('td:first').append($('<span />', {
                        'class': 'rowCount-grid'
                    }).append($('<b />', {
                        'text': ' (' + rowCount + ')'
                    })));
                    var subtd = '';
                    for (var a = 2; a < colonne; a++) {
                        subtd += '<td>' + subtotale[i][a] + ' OUT OF ' + totale['Totale'][a] + ' (' + Math.round(subtotale[i][a] * 100 / totale['Totale'][a], 2) + '%) ' + '</td>';
                    }
                    $(this).append(subtd);
                });
                // Collapse / Expand Click Groups
                $('.grid tbody').on('click', 'tr.group', function() {
                    var rowsCollapse = $(this).nextUntil('.group');
                    $(rowsCollapse).toggleClass('hidden');
                });
            }
        })
    }
]);