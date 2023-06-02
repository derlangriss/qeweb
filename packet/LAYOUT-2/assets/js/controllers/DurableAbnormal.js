'use strict';
/** 
 * controllers for GoogleMap  
 * AngularJS Directive 
 */
app.controller("DurableAbnormalCtrl", ["$scope", "$uibModal", "$log", "$http", "$timeout", "$stateParams", "SweetAlert", "test",
    function($scope, $uibModal, $log, $http, $timeout, $stateParams, SweetAlert, test) {
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
        $.fn.dataTable.ext.buttons.deletespec = {
            className: 'buttons-alert',
            action: function(e, dt, node, config) {
                $scope.DeleteDu('DELETE', '')
            }
        };
        $.fn.dataTable.ext.buttons.test = {
            className: 'buttons-alert',
            action: function(e, dt, node, config) {
                $scope.DeleteDu('DELETE', '')
            }
        };
        var selectedabnormal = [];
        var tableAbnormalDurable = $('#AbnormalDurableTbl').DataTable({
            "processing": true,
            "serverSide": true,
            "ajax": {
                "url": "assets/scripts/server_processing_abnormaldurable.php",
                "type": "POST",
                "data": function(d) {
                    d.sectionid = 1;
                    d.statusid = 2;
                }
            },
            "createdRow": function(row, data, index) {
                /*
                var i;
                for (i = 2; i < 14; i++) {
                    var e = i + 1
                    if (data[e] !== null) {
                        $('td:eq(' + i + ')', row).html('<span class="badge badge-danger">' + data[e] + '</span>');
                    }
                }*/
            },
            "rowCallback": function(row, data) {
                /*
                if (data[3] == "") {
                    return '<a href="' + "#/app/form/collection_data/" + data[3] + '"' + 'class="btn btn-transparent btn-xs"' + '>'
                }*/
            },
            "lengthMenu": [
                [15, 30, 50],
                ['15 rows', '30 rows', '50 rows']
            ],
            "pagingType": "input",
            "dom": "<'row'<'col-sm-6'B><'col-sm-6'<'pull-right'p>>>" + "<'row'<'col-sm-12 margin-bottom-10'tr>>" + "<'row '<'col-sm-12'i>>",
            "buttons": [{
                text: '<i id="checkitemres" class="fa fa-square-o"></i>',
                action: function(row) {
                    $(row).removeClass('selected');
                    if (selectedabnormal.length > 0) {
                        tableAbnormalDurable.rows().deselect();
                        $("#checkitemres").addClass('fa-square-o');
                        $("#checkitemres").removeClass('fa-check-square-o');
                        selectedabnormal = [];
                    } else {
                        tableAbnormalDurable.rows().select();
                        $(row).addClass('selected');
                        var data = tableAbnormalDurable.rows('.selected').select().data();
                        $("#checkitemres").removeClass('fa-square-o');
                        $("#checkitemres").addClass('fa-check-square-o');
                        for (var i = 0; i < data.length; i++) {
                            var rowid = data[i]['DT_RowId'];
                            var rowidres = rowid.substring(4);
                            selectedabnormal.push(rowidres);
                        }
                        return selectedabnormal;
                    }
                },
                className: 'btn btn-wide-40',
                enabled: true
            }, {
                extend: 'deletespec',
                text: '<i class="fa fa-check-circle"></i>',
                enabled: true,
                className: 'btn btn-wide-40 btn-transparent',
            }, {
                extend: 'deletespec',
                text: '<i class="fa fa-plus"></i>',
                enabled: true,
                className: 'btn btn-wide-40 btn-transparent',
            }, {
                extend: 'deletespec',
                text: '<i class="fa fa-download"></i>',
                enabled: true,
                className: 'btn btn-wide-40 btn-transparent',
            }, {
                text: '<i class="fa fa-repeat"></i>',
                action: function() {
                    console.log("sompong")
                    tableAbnormalDurable.draw()
                },
                className: 'btn btn-wide-40 btn-transparent',
                enabled: true
            }],
            "columns": [{
                "class": "especial select-checkbox",
                "orderable": false,
                "data": null,
                "defaultContent": "",
                "width": "30%",
            }, {
                "data": "0",
                "orderable": true,
                "width": "20%",
            }, {
                "data": "1",
                "className": "text-center",
                "orderable": false,
                "width": "10%",
            }, {
                "data": "2",
                "className": "text-center",
                "orderable": false,
                "width": "10%",
            }, {
                "data": "3",
                "className": "text-center",
                "visible": false,
                "width": "10%",
            }, {
                "data": "4",
                "visible": false
            }, {
                "data": "5",
                "className": "text-center",
                "orderable": false,
                "width": "10%",
            }, {
                "data": "6",
                "width": "10%",
                "className": "text-center",
                "orderable": false
            }, {
                "data": "7",
                "className": "text-center",
                "orderable": false,
                "width": "10%",
            }, {
                "data": "8",
                "orderable": false,
                "className": "text-center",
                "width": "10%",
            }, {
                "data": "9",
                "className": "text-center",
                "visible": false
            }, {
                "data": "10",
                "className": "text-center",
                "orderable": false
            }, {
                "data": "11",
                "className": "text-center",
                "visible": false
            }, {
                "data": "12",
                "className": "text-center",
                "visible": false
            }, {
                "data": "13",
                "className": "text-center",
                "orderable": false
            }],
            "columnDefs": [{
                "mData": "IMAGE",
                render: function(data, type, full, meta) {
                    return '<div class="portrait"><img src="' + full[6] + '" /></div>';
                },
                "targets": 7
            }, {
                render: function(data, type, full, meta) {
                    return '<a ' + 'class="status-check no-padding margin-right-5 btn btn-transparent btn-xs"' + '><span class= "label label-success" >' + full[7] + '</span></a>';
                },
                "targets": 8,
                "width": "50px",
                "orderable": false
            }, {
                render: function(data, type, full, meta) {
                    return '<a ' + 'class="details-control no-padding margin-right-5 btn btn-transparent btn-xs"' + '>' + '<i class="' + 'fa fa-eye' + '"></i>' + '</a>' + '<a ' + 'class="delete btn-transparent no-padding  btn-xs"' + '>' + '<i class="' + 'fa fa-trash fa fa-white' + '"></i>' + '</a>';
                },
                "targets": 14,
                "width": "50px",
                "orderable": false
            }],
            "order": [
                [12, 'desc'],
                [10, 'asc'],
                [13, 'asc']
            ]
        });
        var selected = [];
        var dataarr = [];
        var tableDurable = $('#DurableListTbl').DataTable({
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
            "pagingType": "input",
            "dom": "<'row'<'col-sm-6'B><'col-sm-6'<'pull-right'p>>>" + "<'row'<'col-sm-12 margin-bottom-10'tr>>" + "<'row '<'col-sm-12'i>>",
            "stateSave": true,
            stateSaveCallback: function(settings, data) {
                localStorage.setItem('DataTables_' + settings.sInstance, JSON.stringify(data))
            },
            stateLoadCallback: function(settings) {
                return JSON.parse(localStorage.getItem('DataTables_' + settings.sInstance))
            },
            "scrollX": true,
            "scrollCollapse": true,
            "lengthMenu": [
                [8, 30, 50],
                ['8 rows', '30 rows', '50 rows']
            ],
            "buttons": [{
                text: '<i id="checkitemres" class="fa fa-square-o"></i>',
                action: function(row) {
                    $(row).removeClass('selected');
                    if (selected.length > 0) {
                        tableDurable.rows().deselect();
                        $("#checkitemres").addClass('fa-square-o');
                        $("#checkitemres").removeClass('fa-check-square-o');
                        selected = [];
                    } else {
                        tableDurable.rows().select();
                        $(row).addClass('selected');
                        var data = tableDurable.rows('.selected').select().data();
                        $("#checkitemres").removeClass('fa-square-o');
                        $("#checkitemres").addClass('fa-check-square-o');
                        for (var i = 0; i < data.length; i++) {
                            var rowid = data[i]['DT_RowId'];
                            var rowidres = rowid.substring(4);
                            selected.push(rowidres);
                        }
                        return selected;
                    }
                },
                className: 'btn btn-wide-40',
                enabled: true
            }, {
                extend: 'deletespec',
                text: '<i class="fa fa-check-circle"></i>',
                enabled: true,
                className: 'btn btn-wide-40 btn-transparent',
            }, {
                extend: 'deletespec',
                text: '<i class="fa fa-plus"></i>',
                enabled: true,
                className: 'btn btn-wide-40 btn-transparent',
            }, {
                extend: 'deletespec',
                text: '<i class="fa fa-download"></i>',
                enabled: true,
                className: 'btn btn-wide-40 btn-transparent',
            }, {
                text: '<i class="fa fa-repeat"></i>',
                action: function() {
                    console.log("sompong")
                    tableDurable.draw()
                },
                className: 'btn btn-wide-40 btn-transparent',
                enabled: true
            }],
            "columns": [{
                "class": "select-checkbox",
                "orderable": false,
                "data": null,
                "defaultContent": "",
                "width": "30px"
            }, {
                "data": "0",
                "width": "200px",
                "orderable": false
            }, {
                "data": "1",
                "width": "50px",
                "className": "text-center",
                "orderable": false
            }, {
                "data": "2",
                "width": "20%",
                "className": "text-center",
                "orderable": false
            }, {
                "data": "3",
                "className": "text-center",
                "visible": false
            }, {
                "data": "4",
                "visible": false
            }, {
                "data": "5",
                "width": "15%",
                "className": "text-center",
                "orderable": false
            }, {
                "data": "6",
                "width": "60px",
                "className": "text-center",
                "orderable": false
            }, {
                "data": "7",
                "width": "10%",
                "className": "text-center",
                "orderable": false
            }, {
                "data": "8",
                "width": "16%",
                "orderable": false,
                "className": "text-center"
            }, {
                "data": "9",
                "className": "text-center",
                "visible": false
            }, {
                "data": "10",
                "width": "16%",
                "className": "text-center",
                "orderable": false
            }, {
                "data": "11",
                "className": "text-center",
                "visible": false
            }, {
                "data": "12",
                "className": "text-center",
                "visible": false
            }, {
                "data": "13",
                "width": "16%",
                "className": "text-center",
                "orderable": false
            }],
            "columnDefs": [
                /*{
                    "targets": 1
                }, {
                    "targets": 2,
                    "orderable": true
                }, {
                    "targets": 3,
                    "orderable": true
                }, {
                    "targets": 4,
                    "orderable": true,
                    "visible": false
                }, {
                    "targets": 5,
                    "orderable": true,
                    "visible": false
                }, {
                    "targets": 6,
                    "orderable": true
                }, {
                    "targets": 7,
                    "orderable": true
                }, {
                    "targets": 8,
                    "orderable": true
                }, {
                    render: function(data, type, full, meta) {
                        return "<div class='text-wrap'>" + data + "</div>";
                    },
                    "targets": 2
                }, {
                    
                    render: function(data, type, full, meta) {
                        return '<a ' + 'class="details-control no-padding margin-right-5 btn btn-transparent btn-xs"' + '>' + '<i class="' + 'fa fa-eye' + '"></i>' + '</a>' + '<a ' + 'class="delete btn-transparent no-padding  btn-xs"' + '>' + '<i class="' + 'fa fa-trash fa fa-white' + '"></i>' + '</a>';
                    },
                    "targets": 11,
                    "width": "50px",
                    "orderable": false
                },*/
                {
                    render: function(data, type, full, meta) {
                        return "<div class='text-wrap'>" + data + "</div>";
                    },
                    "targets": 2
                }, {
                    "mData": "IMAGE",
                    render: function(data, type, full, meta) {
                        return '<div class="portrait"><img src="' + full[6] + '" /></div>';
                    },
                    "targets": 7
                }, {
                    render: function(data, type, full, meta) {
                        return '<a ' + 'class="status-check no-padding margin-right-5 btn btn-transparent btn-xs"' + '><span class= "label label-success" >' + full[7] + '</span></a>';
                    },
                    "targets": 8,
                    "width": "50px",
                    "orderable": false
                }, {
                    render: function(data, type, full, meta) {
                        return '<a ' + 'class="details-control no-padding margin-right-5 btn btn-transparent btn-xs"' + '>' + '<i class="' + 'fa fa-eye' + '"></i>' + '</a>' + '<a ' + 'class="delete btn-transparent no-padding  btn-xs"' + '>' + '<i class="' + 'fa fa-trash fa fa-white' + '"></i>' + '</a>';
                    },
                    "targets": 14,
                    "width": "50px",
                    "orderable": false
                }
            ],
            "order": [
                [12, 'desc'],
                [10, 'asc'],
                [13, 'asc']
            ]
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
        $scope.tab = 1;
        $scope.setTab = function(newTab) {
            var Boxidmodel = getIfNotSet($scope.BoxShowDetailsBoxid, 0, true);
            if (newTab == 1 && Boxidmodel !== 0) {
                tableDurable.draw();
            }
            if (newTab == 2) {
                tableAbnormalDurable.draw();
            }
            if (newTab == 3 && Boxidmodel !== 0) {
                $scope.updatetype = 1
            }
            $scope.tab = newTab;
        };
        $scope.isSet = function(tabNum) {
            return $scope.tab === tabNum;
        };
        $('.material-datatables label').addClass('form-group');
        /* check status */
        function ModalSelectDurableStatus(a, b) {
            var action = 'DUSTATE';
            var data = $.param({
                taction: action,
                tdurableid: a,
                tdustate: b
            });
            var config = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                }
            }
            $http({
                method: 'POST',
                url: 'assets/views/action/dbDustate.php',
                data: data,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
            }).success(function(response) {
                tableDurable.draw(false);
                tableAbnormalDurable.draw(false);
            });
        }
        $("#DurableListTbl tbody").on("click", "a.status-check", function(event) {
            var tableDurableRow = $(this).closest('tr');
            var dataDurable = tableDurable.row($(this).parents('tr')).data();
            var rowid = dataDurable.DT_RowId;
            console.log(dataDurable)
            var durableid = rowid.substring(4);
            var durableno = dataDurable[0];
            var durablename = dataDurable[1];
            var durableimage = dataDurable[6];
            var durablestatus = dataDurable[7];
            $scope.open = function(size) {
                var modalInstance = $uibModal.open({
                    templateUrl: "assets/views/ModalSelectDurableStatus.html",
                    controller: function($scope, $uibModalInstance) {
                        $scope.modalTitle = "ตรวจสอบสถานะ";
                        $scope.modalContent = "";
                        $scope.durableid = durableid;
                        $scope.durableno = durableno;
                        $scope.durablename = durablename;
                        $scope.durableimage = durableimage;
                        $scope.durablestatus = durablestatus;
                        $scope.Dustate = function(a) {
                            if (a === 'normal') {
                                ModalSelectDurableStatus($scope.durableid, 1);
                                $uibModalInstance.close();
                            }
                            if (a === 'abnormal') {
                                ModalSelectDurableStatus($scope.durableid, 2);
                                $uibModalInstance.close();
                            }
                        }
                        $scope.cancel = function() {
                            $uibModalInstance.dismiss("cancel")
                        }
                    },
                    size: size,
                    resolve: {
                        items: function() {
                            return $scope.numberofitem;
                        }
                    }
                });
                modalInstance.result.then(function(selectedItem) {
                    $scope.selected = selectedItem
                    console.log(selectedItem)
                }, function() {
                    $log.info("Modal dismissed at: " + new Date)
                })
            }
            var user_id = $scope.uid
            var action = 'MOVETOBOX';
            var data = $.param({
                taction: action,
                tdurableid: durableid
            });
            if (typeof durableid !== '0') {
                $scope.open('md');
                /*
                if (newspeciesid != oldspeciesid) {
                    if (oldspeciesid == 0) {
                        $http({
                            method: 'POST',
                            url: "assets/views/action/dbmovespectobox.php",
                            data: data,
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            },
                        }).success(function(response) {
                            if (response[0].success == 0) {} else {
                                $scope.specfullid = response[0].specimens_full_number
                                toaster.pop('success', 'SUCCESS', $scope.specfullid);
                                dataarr = [];
                             
                                $scope.GetUserCurrentBox();
                                $scope.countSpecimens(monthshow, yearshow, containertype, containerid);
                                tableRow.fadeOut(400, "swing", function() {
                                    tableSpecIdList.row(tableRow).remove().draw()
                                });
                            }
                        })
                    } else {
                        $scope.open('md');
                    }
                } else {
                    if (newspeciesid === 0 && oldspeciesid === 0) {
                        $http({
                            method: 'POST',
                            url: "assets/views/action/dbmovespectobox.php",
                            data: data,
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            },
                        }).success(function(response) {
                            if (response[0].success == 0) {} else {
                                $scope.specfullid = response[0].specimens_full_number
                                if (response[0].species_id == 0) {
                                    toaster.pop('warning', 'SUCCESS', $scope.specfullid);
                                } else {
                                    toaster.pop('success', 'SUCCESS', $scope.specfullid);
                                }
                                dataarr = [];
                               
                                tableSpecIdList.draw();
                                $scope.GetUserCurrentBox();
                                $scope.countSpecimens(monthshow, yearshow, containertype, containerid);
                                tableRow.fadeOut(400, "swing", function() {
                                    tableSpecIdList.row(tableRow).remove().draw()
                                });
                            }
                        })
                    } else {
                        $http({
                            method: 'POST',
                            url: "assets/views/action/dbmovespectobox.php",
                            data: data,
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            },
                        }).success(function(response) {
                            if (response[0].success == 0) {} else {
                                $scope.specfullid = response[0].specimens_full_number
                                toaster.pop('success', 'SUCCESS', $scope.specfullid);
                                dataarr = [];
                               
                                $scope.GetUserCurrentBox();
                                $scope.countSpecimens(monthshow, yearshow, container_type, container_id);
                                tableRow.fadeOut(400, "swing", function() {
                                    tableSpecIdList.row(tableRow).remove().draw()
                                });
                            }
                        })
                    }
                }*/
            } else {
                errorMessage()
            }
        });
        $("#AbnormalDurableTbl tbody").on("click", "a.status-check", function(event) {
            var tableDurableRow = $(this).closest('tr');
            var dataDurable = tableAbnormalDurable.row($(this).parents('tr')).data();
            var rowid = dataDurable.DT_RowId;
            console.log(dataDurable)
            var durableid = rowid.substring(4);
            var durableno = dataDurable[0];
            var durablename = dataDurable[1];
            var durableimage = dataDurable[6];
            var durablestatus = dataDurable[7];
            $scope.open = function(size) {
                var modalInstance = $uibModal.open({
                    templateUrl: "assets/views/ModalSelectDurableStatus.html",
                    controller: function($scope, $uibModalInstance) {
                        $scope.modalTitle = "ตรวจสอบสถานะ";
                        $scope.modalContent = "";
                        $scope.durableid = durableid;
                        $scope.durableno = durableno;
                        $scope.durablename = durablename;
                        $scope.durableimage = durableimage;
                        $scope.durablestatus = durablestatus;
                        $scope.Dustate = function(a) {
                            if (a === 'normal') {
                                ModalSelectDurableStatus($scope.durableid, 1);
                                $uibModalInstance.close();
                            }
                            if (a === 'abnormal') {
                                ModalSelectDurableStatus($scope.durableid, 2);
                                $uibModalInstance.close();
                            }
                        }
                        $scope.cancel = function() {
                            $uibModalInstance.dismiss("cancel")
                        }
                    },
                    size: size,
                    resolve: {
                        items: function() {
                            return $scope.numberofitem;
                        }
                    }
                });
                modalInstance.result.then(function(selectedItem) {
                    $scope.selected = selectedItem
                    console.log(selectedItem)
                }, function() {
                    $log.info("Modal dismissed at: " + new Date)
                })
            }
            var user_id = $scope.uid
            var action = 'MOVETOBOX';
            var data = $.param({
                taction: action,
                tdurableid: durableid
            });
            if (typeof durableid !== '0') {
                $scope.open('md');
            } else {
                errorMessage()
            }
        });
        $('#DurableListTbl tbody').on('click', '.select-checkbox', function() {
            var tr = $(this).closest('tr');
            var data = tableDurable.row($(this).closest('tr')).data();
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
                tableDurable.rows($(this).closest('tr')).deselect();
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