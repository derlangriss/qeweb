'use strict';
/**   
 * controllers for GoogleMap  
 * AngularJS Directive  
 */
app.controller("FormContainerManageCtrl", ["$scope", "$http", "$timeout", "$stateParams", "SweetAlert", "$state", "info", "ServicePDF",
    function($scope, $http, $timeout, $stateParams, SweetAlert, $state, info, ServicePDF) {
        var previousWindowKeyDown = window.onkeydown;
        $scope.jqueryScrollbarOptions = {
            "onScroll": function(y, x) {
                if (y.scroll == y.maxScroll) {}
            }
        };
        $scope.obj = {
            value1: 1,
            value2: false
        }
        $scope.checkValue1 = function() {
            return $scope.obj.value1 === 'someothervalue';
        }
        $scope.tab = 1;
        $scope.changestyle = function(tabno) {
            return $scope.obj.value1 === tabno;
        };












        $scope.setTab = function(newTab) {
            var Boxidmodel = getIfNotSet($scope.BoxShowDetailsBoxid, 0, true);
            if (newTab == 1 && Boxidmodel !== 0) {
                $scope.updatetype = 1
            }
            if (newTab == 2 && Boxidmodel !== 0) {
                $scope.updatetype = 2
            }
            if (newTab == 3 && Boxidmodel !== 0) {
                $scope.updatetype = 1
            }
            if (newTab == 4 && Boxidmodel !== 0) {
                $scope.updatetype = 1
            }
            if (newTab == 1 && Boxidmodel == 0) {
                $scope.updatetype = 0
            }
            if (newTab == 2 && Boxidmodel == 0) {
                $scope.updatetype = 0
            }
            if (newTab == 3 && Boxidmodel == 0) {
                $scope.updatetype = 0
            }
            if (newTab == 4 && Boxidmodel == 0) {
                $scope.updatetype = 0
            }
            $scope.tab = newTab;
            $scope.obj.value1 = newTab;
        };
        $scope.isSet = function(tabNum) {
            return $scope.tab === tabNum;
        };

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
        $scope.EditSpecimens = function(action, form) {
            var data;
            var speicmensids = dataarr;
            var a = JSON.stringify(speicmensids);
            if (action == "DELETE") {
                data = $.param({
                    taction: action,
                    speicmensids: a
                });
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
                    window.onkeydown = previousWindowKeyDown;
                    if (isConfirm) {
                        $http({
                            method: 'POST',
                            url: "assets/views/action/dbdelete_spec.php",
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
                                window.onkeydown = previousWindowKeyDown;
                                dataarr = [];
                                tableSpecReportList.draw();
                                $scope.ViewsAvartarFunction();
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
            if (action == "REMOVESPEC") {
                var speicmensidsfrombox = dataarrSpecbox;
                var abox = JSON.stringify(speicmensidsfrombox);
                var container_id = getIfNotSet($scope.BoxShowDetailsBoxid, '', true);
                var container_type = 1;
                var report_month = getIfNotSet($stateParams.monthid, '0', true);
                var report_year = getIfNotSet($stateParams.yearid, '0', true);
                data = $.param({
                    taction: action,
                    speicmensids: abox,
                    tcontainer_id: container_id,
                    tcontainer_type: container_type,
                    treport_month: report_month,
                    treport_year: report_year
                });
                if (typeof speicmensidsfrombox !== 'undefined' && speicmensidsfrombox.length > 0) {
                    SweetAlert.swal({
                        title: "Are you sure?",
                        text: "Your Selected Specimens wil be remove from box!",
                        type: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "Yes, save it!",
                        cancelButtonText: "No, cancel plx!",
                        closeOnConfirm: false,
                        closeOnCancel: false
                    }, function(isConfirm) {
                        window.onkeydown = previousWindowKeyDown;
                        if (isConfirm) {
                            $http({
                                method: 'POST',
                                url: "assets/views/action/dbdelete_spec.php",
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
                                    window.onkeydown = previousWindowKeyDown;
                                    dataarrSpecbox = [];
                                    tableDrawer.page('next').draw('page');
                                    $scope.countSpecimens(monthshow, yearshow, container_type, container_id);
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
                } else {
                    alert('Please Select Item');
                }
            }
            if (action == "MOVETOBOX") {
                var speicmensidsfromall = dataarr;
                var cbox = JSON.stringify(speicmensidsfromall);
                var container_id = getIfNotSet($scope.BoxShowDetailsBoxid, '', true);
                var container_type = 1;
                var report_month = getIfNotSet($stateParams.monthid, '0', true);
                var report_year = getIfNotSet($stateParams.yearid, '0', true);
                data = $.param({
                    taction: action,
                    speicmensids: cbox,
                    tcontainer_id: container_id,
                    tcontainer_type: container_type,
                    treport_month: report_month,
                    treport_year: report_year
                });
                if (typeof speicmensidsfromall !== 'undefined' && speicmensidsfromall.length > 0 && container_id !== '' && $scope.boxstatus_id !== '2') {
                    SweetAlert.swal({
                        title: "Are you sure?",
                        text: "Your Selected Specimens wil be move to the box!",
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
                                url: "assets/views/action/dbdelete_spec.php",
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
                                    window.onkeydown = previousWindowKeyDown;
                                    if (response[0].success == 0) {} else {
                                        dataarr = [];
                                        tableSpecReportList.draw();
                                        tableDrawer.draw();
                                        $scope.countSpecimens(monthshow, yearshow, container_type, container_id);
                                        console.log($scope.boxstatus_id);
                                    }
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
                } else {
                    alert('Please Select Item');
                }
            }
            if (action == "TRANSFERTOMUSEUM") {
                var drawerid = dataarrSpecbox;
                var container_type = 2;
                var a = getIfNotSet($scope.specModelFamily.family_id, 0, true);
                var b = JSON.stringify(drawerid);
                var action = 'UPDATE';
                var data = $.param({
                    tdrawer_ids: b,
                    tfamily_id: a,
                    action: action
                });
                if (typeof drawerid !== 'undefined' && drawerid.length > 0 && a !== 'undefined') {
                    SweetAlert.swal({
                        title: "Are you sure?",
                        text: "Your Selected Specimens wil be move to the box!",
                        type: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "Yes, save it!",
                        cancelButtonText: "No, cancel plx!",
                        closeOnConfirm: false,
                        closeOnCancel: false
                    }, function(isConfirm) {
                        if (isConfirm) {
                            window.onkeydown = previousWindowKeyDown;
                            $http({
                                method: 'POST',
                                url: "assets/views/action/dbupdateDrawer.php",
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
                                    window.onkeydown = previousWindowKeyDown;
                                    if (response[0].success == 0) {} else {
                                        dataarrSpecbox = [];
                                        tableSpecReportList.draw();
                                        tableDrawer.draw(false);
                                    }
                                });
                            })
                        } else {
                            window.onkeydown = previousWindowKeyDown;
                            SweetAlert.swal({
                                title: "Cancelled",
                                text: "Your imaginary file is cancelled :)",
                                type: "error",
                                confirmButtonColor: "#007AFF"
                            });
                        }
                    });
                } else {
                    alert('Please Select Item');
                }
            }
        }
        $.fn.dataTable.ext.buttons.deletespec = {
            /* className: 'buttons-alert',*/
            action: function(e, dt, node, config) {
                $scope.EditSpecimens('DELETE', 'specimens_form')
            }
        };
        $.fn.dataTable.ext.buttons.removespec = {
            action: function(e, dt, node, config) {
                $scope.EditSpecimens('REMOVESPEC', 'specimens_form')
            }
        };
        $.fn.dataTable.ext.buttons.transfertomuseum = {
            action: function(e, dt, node, config) {
                $scope.EditSpecimens('TRANSFERTOMUSEUM', 'specimens_form')
            }
        };
        var dataarrSpecbox = [];
        var tableDrawer = $('#DrawerListTbl').DataTable({
            "processing": true,
            "serverSide": true,
            "stateSave": true,
            "ajax": {
                "url": "assets/scripts/server_processing_drawerlist.php",
                "type": "POST"
            },
            "createdRow": function(row, data, index) {
                if (data[1] == 'Unknown') {
                    $(row).addClass('highlight');
                }
            },
            "rowCallback": function(row, data) {
                var rowid = data.DT_RowId;
                var rowidres = rowid.substring(4);
                if ($.inArray(rowidres, dataarrSpecbox) !== -1) {
                    $(row).addClass('selected');
                }
            },
            stateSaveCallback: function(settings, data) {
                localStorage.setItem('DataTables_' + settings.sInstance, JSON.stringify(data))
            },
            stateLoadCallback: function(settings) {
                return JSON.parse(localStorage.getItem('DataTables_' + settings.sInstance))
            },
            "scrollCollapse": true,
            "lengthMenu": [
                [10, 30, 50],
                ['10 rows', '30 rows', '50 rows']
            ],
            "pagingType": "input",
            "buttons": [{
                extend: 'transfertomuseum',
                text: 'Assign Box',
                className: 'btn btn-primary btn-wide btn-scroll btn-scroll-top fa fa-tag',
                enabled: true
            }, {
                text: '<i class="fa fa-check-square"></i> Select all',
                action: function(row) {
                    tableDrawer.rows().select();
                    $(row).addClass('selected');
                    var data = tableDrawer.rows('.selected').select().data();
                    for (var i = 0; i < data.length; i++) {
                        var rowid = data[i]['DT_RowId'];
                        var rowidres = rowid.substring(4);
                        dataarrSpecbox.push(rowidres);
                    }
                    return dataarrSpecbox;
                },
                className: 'btn btn-o btn-wide btn-success btn-scroll btn-scroll-top fa fa-check-square',
                enabled: true
            }, {
                text: '<i class="fa fa-check-square-o"></i> Select none',
                action: function() {
                    tableDrawer.rows().deselect();
                    dataarrSpecbox = [];
                },
                className: 'btn btn-o btn-wide btn-warning btn-scroll btn-scroll-top fa fa-check-square-o',
                enabled: true
            }],
            "columns": [{
                "class": "select-checkbox",
                "orderable": false,
                "data": null,
                "defaultContent": ""
            }, {
                "data": "0",
                "width": "5%",
                "orderable": false
            }, {
                "data": "1",
                "width": "10%",
                "orderable": false
            }, {
                "data": "2",
                "width": "20%",
                "orderable": false
            }, {
                "data": "3",
                "width": "25%",
                "orderable": false
            }, {
                "data": "4",
                "width": "40%",
                "orderable": false
            }, {
                "data": "5",
                "visible": false
            }],
            "columnDefs": [{
                render: function(data, type, full, meta) {
                    if (full[6] == 0) {
                        return '<span class="badge badge-danger"' + '>' + 'Empty' + '</a>';
                    } else {
                        return '<span class="badge badge-info"' + '>' + full[4] + '</a>';
                    }
                },
                "targets": 5,
                "width": "30%"
            }, {
                width: 200,
                targets: 0
            }],
            "order": [
                [6, 'asc']
            ]
        });
        $('#DrawerListTbl tbody').on('click', '.select-checkbox', function() {
            var tr = $(this).closest('tr');
            var data = tableDrawer.row($(this).closest('tr')).data();
            var id = data.DT_RowId;
            var idres = id.substring(4);
            var index = $.inArray(idres, dataarrSpecbox);
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
                dataarrSpecbox.push(idres);
            } else {
                dataarrSpecbox.splice(index, 1);
            }
            if ($(tr).hasClass('selected')) {
                $(tr).removeClass('selected');
                tableDrawer.rows($(this).closest('tr')).deselect();
            } else {
                $(tr).addClass('selected');
            }
        });
        var dataarr = [];
        var groupColumn = 2;
        var groupColumn1 = 3;
        var tableSpecReportList = $('#SpecimensReportListTbl').DataTable({
            "processing": true,
            "serverSide": true,
            "ajax": {
                "url": "assets/scripts/server_processing_movetobox.php",
                "type": "POST",
                "data": function(d) {
                    d.treport_month = getIfNotSet($stateParams.monthid, '', true);
                    d.treport_year = getIfNotSet($stateParams.yearid, '', true);
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
            "drawCallback": function(settings) {
                var api = this.api();
                var rows = api.rows({
                    page: 'current'
                }).nodes();
                var last = null;
                var columns = [2, 3];
                for (var x = 0; x < columns.length; x++) {
                    api.column(columns[x], {
                        page: 'current'
                    }).data().each(function(group, i) {
                        var rowData = api.row(i).data();
                        if (x == 0) {}
                        if (x == 1) {
                            /*last is null data*/
                            if (group == 'Unknown') {
                                group = rowData[1] + group
                                var rowDatatest = rowData[1]
                                if (last !== group) {
                                    $(rows).eq(i).before('<tr class="group label-default  bigfonttr"><td class="groupheader uppercase" colspan="2">' + rowData[1] + '</td><td class="uppercase" colspan="5">' + rowData[2] + '</td><td colspan="1"><a class="btn-tableselect btn-wide btn-primary checkall"><i class="fa  fa-check-square"></i> Select all Item</a></td>' + '</td><td colspan="1"><a class="btn-tableselect btn-wide btn-primary cancelall"><i class="fa fa-ban"></i> Cancel All</a></td></tr>');
                                }
                                last = group
                            } else {
                                if (last !== group) {
                                    var rowData = api.row(i).data();
                                    $(rows).eq(i).before('<tr class="group label-default  bigfonttr"><td class="groupheader uppercase" colspan="2">' + rowData[1] + '</td><td class="uppercase" colspan="5">' + rowData[2] + '</td><td colspan="1"><a class="btn-tableselect btn-wide btn-primary checkall"><i class="fa  fa-check-square"></i> Select all Item</a></td>' + '</td><td colspan="1"><a class="btn-tableselect btn-wide btn-primary cancelall"><i class="fa fa-ban"></i> Cancel All</a></td></tr>');
                                }
                                last = group;
                            }
                            /*
                            if (group == 'Unknown') {
                              
                                $(rows).eq(i).before('<tr class="group label-default  bigfonttr"><td class="groupheader uppercase" colspan="2">' + rowData[1] + '</td><td class="uppercase" colspan="5">' + rowData[2] + '</td><td colspan="1"><a class="btn-tableselect btn-wide btn-primary checkall"><i class="fa  fa-check-square"></i> Select all Item</a></td>' + '</td><td colspan="1"><a class="btn-tableselect btn-wide btn-primary cancelall"><i class="fa fa-ban"></i> Cancel All</a></td></tr>');
                                console.log(last)

                            }*/
                        }
                        /*
                        if (x = 0 && group == 'Unknown') {
                             var rowData = api.row(i).data();
                             $(rows).eq(i).before('<tr class="group label-default  bigfonttr"><td class="groupheader uppercase" colspan="2">' + rowData[1] + '</td><td class="uppercase" colspan="5">' + rowData[2] + '</td><td colspan="1"><a class="btn-tableselect btn-wide btn-primary checkall"><i class="fa  fa-check-square"></i> Select all Item</a></td>' + '</td><td colspan="1"><a class="btn-tableselect btn-wide btn-primary cancelall"><i class="fa fa-ban"></i> Cancel All</a></td></tr>');
                        } else {
                            if (x == 0) {
                                if (last !== group) {
                                    var rowData = api.row(i).data();
                                }
                                last = group;
                            } else {
                                if (last !== group) {
                                    var rowData = api.row(i).data();
                                    $(rows).eq(i).before('<tr class="group label-default  bigfonttr"><td class="groupheader uppercase" colspan="2">' + rowData[1] + '</td><td class="uppercase" colspan="5">' + rowData[2] + '</td><td colspan="1"><a class="btn-tableselect btn-wide btn-primary checkall"><i class="fa  fa-check-square"></i> Select all Item</a></td>' + '</td><td colspan="1"><a class="btn-tableselect btn-wide btn-primary cancelall"><i class="fa fa-ban"></i> Cancel All</a></td></tr>');
                                }
                                last = group;
                            }
                        }*/
                    });
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
            "scrollCollapse": true,
            "lengthMenu": [
                [10, 30, 50],
                ['10 rows', '30 rows', '50 rows']
            ],
            "buttons": [{
                extend: 'transfertomuseum',
                text: 'Transfer to Museum',
                enabled: true,
                className: 'btnadapt btn-primary btn-wide btn-scroll btn-scroll-top fa fa-upload'
            }, {
                extend: 'deletespec',
                text: 'Delete',
                enabled: true
            }, {
                text: 'Select all',
                action: function(row) {
                    tableSpecReportList.rows().select();
                    $(row).addClass('selected');
                    var data = tableSpecReportList.rows('.selected').select().data();
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
                    tableSpecReportList.rows().deselect();
                    dataarr = [];
                },
                enabled: true
            }],
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
            }, {
                "data": "11",
            }, {
                "data": "12",
            }, {
                "data": "13",
            }],
            "columnDefs": [{
                "visible": true,
                "targets": groupColumn
            }, {
                "visible": true,
                "targets": groupColumn1
            }, {
                "visible": true,
                "targets": 6
            }, {
                "visible": true,
                "targets": 7
            }, {
                "visible": false,
                "targets": 8
            }, {
                "visible": false,
                "targets": 9
            }, {
                "visible": false,
                "targets": 10
            }, {
                "visible": false,
                "targets": 11
            }, {
                "visible": false,
                "targets": 12
            }, {
                "visible": false,
                "targets": 13
            }, {
                render: function(data, type, full, meta) {
                    if (full[9] == true) {
                        return '<a href="' + "#/app/form/collection_data/" + full[9] + '"' + 'class="btn btn-transparent btn-xs"' + '>' + '<i class="' + 'fa fa-pencil' + '"></i>' + '</a>' + '<a ' + 'class="bookmark btn-transparent btn-xs"' + '>' + '<i class="' + 'fa fa-bookmark' + '"></i>' + '</a>';
                    } else {
                        return '<a href="' + "#/app/form/collection_data/" + full[9] + '"' + 'class="btn btn-transparent btn-xs"' + '>' + '<i class="' + 'fa fa-pencil' + '"></i>' + '</a>' + '<a ' + 'class="bookmark btn-transparent btn-xs"' + '>' + '<i class="' + 'fa fa-bookmark-o' + '"></i>' + '</a>';
                    }
                },
                "targets": 14,
                "width": "6%",
                "orderable": false
            }],
            "order": [
                [2, 'asc'],
                [3, 'asc'],
                [1, 'asc'],
                [4, 'asc']
            ]
        });

        function filterColumnContainer(i) {
            $('#DrawerListTbl').DataTable().column(i).search($('#col' + i + '_filter').val()).draw();
        }
        $('input.column_filter_coninfo').on('keyup', function() {
            filterColumnContainer($(this).parents('DIV').attr('data-column'));
        });
        $scope.changeOrder = function() {
            $scope.specModelFamily = {
                torder_torder_id: '',
                family_name: ''
            };
            $scope.specModelGenus = {
                family_family_id: '',
                genus_id: '',
                genus_name: '',
                sub_family: ''
            };
            $scope.specModelSpecies = {
                genus_genus_id: '',
                species_id: '',
                species_name: '',
                sub_genus: ''
            };
        };
        $scope.changeFamily = function() {
            $scope.specModelGenus = {
                family_family_id: '',
                genus_id: '',
                genus_name: '',
                sub_family: ''
            };
            $scope.specModelSpecies = {
                genus_genus_id: '',
                species_id: '',
                species_name: '',
                sub_genus: ''
            };
        };
        $scope.specModelOrder = '';
        $scope.specModelFamily = '';
        $scope.specModelGenus = '';
        $scope.specModelSpecies = '';
        $scope.myModelCollectorList = '';
        $scope.onSelect = function($item, $model, $label) {}
        $scope.CollectorKeyup = function(viewValue) {
            return $http.get('./assets/views/action/getCollectorList.php?sCollector=' + viewValue).then(function(res) {
                return res.data;
            });
        }
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
        $scope.ctrans_container = function() {
            $scope.translocker = {
                subcabinet_id: '',
                specModelFamily: '',
                cabinet_cabinet_id: ''
            };
            $scope.transdrawer = {
                spec_box_id: '',
                spec_box: '',
                subcabinet_subcabinet_id: ''
            };
        };
        $scope.ctrans_locker = function() {
            $scope.transdrawer = {
                spec_box_id: '',
                spec_box: '',
                subcabinet_subcabinet_id: ''
            };
        };

    }
]);