'use strict';
/** 
 * controllers for GoogleMap  
 * AngularJS Directive 
 */
app.controller("FormDurableCtrl", ["$scope", "$http", "$timeout", "$stateParams", "SweetAlert", "test",
    function($scope, $http, $timeout, $stateParams, SweetAlert, test) {
        var selected = [];
        $.fn.dataTable.ext.buttons.deletespec = {
            className: 'buttons-alert',
            action: function(e, dt, node, config) {
                $scope.DeleteDu('DELETE', '')
            }
        };
        var dataarr = [];
        var table = $('#DurableListTbl').DataTable({
            "processing": true,
            "serverSide": true,
            "ajax": {
                "url": "assets/scripts/server_processing_durable.php",
                "type": "POST",
                "data": function(d) {
                    d.sectionid = 1;
                }
            },
            "createdRow": function(row, data, index) {
                if (data[1] == 'Unknown') {
                    $(row).addClass('highlight');
                }
            },
            "rowCallback": function(row, data) {
                var rowid = data.DT_RowId;
                var rowidres = rowid.substring(4);
                if ($.inArray(rowidres, dataarr) !== -1) {
                    $(row).addClass('selected');
                }
            },
            "dom": '<"top"B<"text-right"l>>rt<"bottom"ip><"clear">',
            "stateSave": true,
            stateSaveCallback: function(settings, data) {
                localStorage.setItem('DataTables_' + settings.sInstance, JSON.stringify(data))
            },
            stateLoadCallback: function(settings) {
                return JSON.parse(localStorage.getItem('DataTables_' + settings.sInstance))
            },
            "scrollX": true,
            "scrollY": "400px",
            "scrollCollapse": true,
            "lengthMenu": [
                [10, 30, 50],
                ['10 rows', '30 rows', '50 rows']
            ],
            "buttons": ['colvis', {
                extend: 'deletespec',
                text: 'Delete',
                enabled: true
            }, {
                text: 'Select all',
                action: function(row) {
                    table.rows().select();
                    $(row).addClass('selected');
                    var data = table.rows('.selected').select().data();
                    for (var i = 0; i < data.length; i++) {
                        var rowid = data[i]['DT_RowId'];
                        var rowidres = rowid.substring(4);
                        dataarr.push(rowidres);
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
            }],
            "columns": [{
                "class": "select-checkbox",
                "orderable": false,
                "data": null,
                "defaultContent": "",
                "width": "10px"
            }, {
                "data": "0",
                "width": "30px"
            }, {
                "data": "1",
                "width": "200px"
            }, {
                "data": "2",
                "width": "25%"
            }, {
                "data": "3",
                "width": "16%"
            }, {
                "data": "4",
                "width": "25%"
            }, {
                "data": "5",
                "width": "16%"
            }, {
                "data": "6",
                "width": "25%"
            }, {
                "data": "7",
                "width": "16%"
            }, {
                "data": "8",
                "width": "16%"
            }],
            "order": [
                [1, 'asc']
            ],
            "columnDefs": [{
                "targets": 1,
                "orderable": false
            }, {
                "targets": 2,
                "orderable": false
            }, {
                "targets": 3,
                "orderable": false
            }, {
                "targets": 4,
                "orderable": false
            }, {
                "targets": 5,
                "orderable": false
            }, {
                "targets": 6,
                "orderable": false
            }, {
                "targets": 7,
                "orderable": false
            }, {
                "targets": 8,
                "visible": false
            }, {
                render: function(data, type, full, meta) {
                    return "<div class='text-wrap'>" + data + "</div>";
                },
                "targets": 2
            }, {
                render: function(data, type, full, meta) {
                    return '<a href="' + "#/app/form/gridform_duedit/" + full[8] + '"' + 'class="btn btn-transparent btn-xs"' + '>' + '<i class="' + 'fa fa-pencil' + '"></i>';
                },
                "targets": 9,
                "width": "6%",
                "orderable": false
            }],
            "order": []
        });

        function filterColumnspec(i) {
            var ii = $('#col' + i + '_filter').val();
            $('#DurableListTbl').DataTable().column(i).search(ii).draw();
        }
        $('input.column_filterspec').on('keyup', function() {
            filterColumnspec($(this).parents('DIV').attr('data-column'));
            /* filterColumnspec($(this).parents('tr').attr('data-column'));*/
        });
        $('#DurableListTbl td').css('white-space', 'initial');
        $('.material-datatables label').addClass('form-group');
        $('#DurableListTbl tbody').on('click', '.select-checkbox', function() {
            var tr = $(this).closest('tr');
            var data = table.row($(this).closest('tr')).data();
            var id = data.DT_RowId;
            var idres = id.substring(4);
            var index = $.inArray(idres, dataarr);
            var a = data[5];
            var b = data[6];
            var c = data[7];
            var d = data[8];
            var data = $.param({
                sCode: a,
                sYear: b,
                sNumber: c,
                sSpecNumber: d
            });
            if (index === -1) {
                dataarr.push(idres);
            } else {
                dataarr.splice(index, 1);
            }
            if ($(tr).hasClass('selected')) {
                $(tr).removeClass('selected');
                table.rows($(this).closest('tr')).deselect();
            } else {
                $(tr).addClass('selected');
            }
        });
        $scope.DeleteDu = function(action, form) {
            var data;
            var durableid = dataarr;
            var a = JSON.stringify(durableid);
            if (action == "DELETE") {
                data = $.param({
                    taction: action,
                    durableid: a
                });
            }
            SweetAlert.swal({
                title: "Are you sure?",
                text: "Your Edited data request will be recorded in database!",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes, save it!",
                cancelButtonText: "No, cancel plx!",
                closeOnConfirm: false,
                closeOnCancel: false
            }, function(isConfirm) {
                if (isConfirm) {
                    $http({
                        method: 'POST',
                        url: "assets/views/action/dbdelete_du.php",
                        data: data,
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        },
                    }).success(function(response) {
                        SweetAlert.swal({
                            title: "Edited!",
                            text: "Your imaginary file has been Edited.",
                            type: "success",
                            confirmButtonColor: "#007AFF"
                        }, function(isConfirm) {
                            dataarr = [];
                            table.draw();
                        });
                    })
                } else {
                    SweetAlert.swal({
                        title: "Cancelled",
                        text: "Your imaginary file is cancelled :)",
                        type: "error",
                        confirmButtonColor: "#007AFF"
                    });
                }
            });
        }
        $scope.initialise = function() {
            $scope.tabData = [{
                heading: 'One',
                route: 'app.form.gridform_durable.test01',
                url: 'app/form/gridform_durable/:test01',
                controller: 'ExampleCtrl',
                class: 'first-tab'
            }, {
                heading: 'Two',
                route: 'app.form.gridform_durable.test02',
                class: 'second-tab'
            }];
        };
        $scope.initialise();
    }
])