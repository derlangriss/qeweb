'use strict';
/** 
 * controllers for GoogleMap  
 * AngularJS Directive 
 */
app.controller("DurableMainCtrl", ["$scope", "$uibModal", "$log", "$http", "$timeout", "$stateParams", "SweetAlert", "ServicePDF",
    function($scope, $uibModal, $log, $http, $timeout, $stateParams, SweetAlert, ServicePDF) {
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
        $scope.setTab = function(newTab) {
            $scope.tab = newTab;
        };
        $scope.isSet = function(tabNum) {
            return $scope.tab === tabNum;
        };
        $.fn.dataTable.ext.buttons.deletespec = {
            className: 'buttons-alert',
            action: function(e, dt, node, config) {
                $scope.DeleteDu('DELETE', '')
            }
        };
        $.fn.dataTable.ext.buttons.downloadnormal = {
            className: 'buttons-alert',
            action: function(e, dt, node, config) {
                $scope.PrintDurable("NormalDuReport")
            }
        };
        $.fn.dataTable.ext.buttons.downloadtags = {
            className: 'buttons-alert',
            action: function(e, dt, node, config) {
                $scope.PrintDurable("DUTABLE_TAGS")
            }
        };
        $.fn.dataTable.ext.buttons.downloadabnormal = {
            className: 'buttons-alert',
            action: function(e, dt, node, config) {
                $scope.PrintDurable("AbnormalDuReport")
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
                });
            }, 2000);
        }

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
    }
])
app.controller("DurableNormalCtrl", ["$scope", "$uibModal", "$log", "$http", "$timeout", "$stateParams", "SweetAlert", "$state",
    function($scope, $uibModal, $log, $http, $timeout, $stateParams, SweetAlert, $state) {
        $scope.setTab(1);

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
                tableDurableNormal.draw(false);
            });
        }
        var selectedNormal = [];
        var tableDurableNormal = $('#DurableNormalTbl').DataTable({
            "processing": true,
            "serverSide": true,
            "ajax": {
                "url": "assets/scripts/server_processing_normaldurable.php",
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
                if ($.inArray(rowidres, selectedNormal) !== -1) {
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
                [6, 30, 50],
                ['6 rows', '30 rows', '50 rows']
            ],
            "buttons": [{
                text: '<i id="checkitemres" class="fa fa-square-o"></i>',
                action: function(row) {
                    $(row).removeClass('selected');
                    if (selectedNormal.length > 0) {
                        tableDurableNormal.rows().deselect();
                        $("#checkitemres").addClass('fa-square-o');
                        $("#checkitemres").removeClass('fa-check-square-o');
                        selectedNormal = [];
                    } else {
                        tableDurableNormal.rows().select();
                        $(row).addClass('selected');
                        var data = tableDurableNormal.rows('.selected').select().data();
                        $("#checkitemres").removeClass('fa-square-o');
                        $("#checkitemres").addClass('fa-check-square-o');
                        for (var i = 0; i < data.length; i++) {
                            var rowid = data[i]['DT_RowId'];
                            var rowidres = rowid.substring(4);
                            selectedNormal.push(rowidres);
                        }
                        return selectedNormal;
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
                extend: 'downloadnormal',
                text: '<i class="fa fa-download"></i>',
                enabled: true,
                className: 'btn btn-wide-40 btn-transparent',
            }, {
                extend: 'downloadtags',
                text: '<i class="fa fa-tags"></i>',
                enabled: true,
                className: 'btn btn-wide-40 btn-transparent',
            }, {
                text: '<i class="fa fa-repeat"></i>',
                action: function() {
                    tableDurableNormal.draw()
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
                "width": "150px",
                "orderable": false
            }, {
                "data": "1",
                "width": "180px",
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
                "visible": true
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
            "columnDefs": [{
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
                    return '<a ' + 'class="details-control no-padding margin-right-5 btn btn-transparent btn-xs"' + '>' + '<i class="' + 'fa fa-eye' + '"></i>' + '</a>' + '<a ' + 'class="durableedit margin-right-5 btn-transparent no-padding  btn-xs"' + '>' + '<i class="' + 'fa fa-pencil fa fa-white' + '"></i>' + '</a>' + '<a ' + 'class="durableabdelete btn-transparent no-padding  btn-xs"' + '>' + '<i class="' + 'fa fa-trash fa fa-white' + '"></i>' + '</a>';
                },
                "targets": 14,
                "width": "50px",
                "orderable": false
            }],
            "order": [
                [12, 'asc'],
                [10, 'asc'],
                [13, 'asc']
            ]
        });

        function filterColumnspec(i) {
            var ii = $('#col' + i + '_filter').val();
            $('#DurableNormalTbl').DataTable().column(i).search(ii).draw();
        }
        $('input.column_filterspec').on('keyup', function() {
            filterColumnspec($(this).parents('DIV').attr('data-column'));
            /* filterColumnspec($(this).parents('tr').attr('data-column'));*/
        });
        $('#DurableNormalTbl tbody').on('click', '.select-checkbox', function() {
            var tr = $(this).closest('tr');
            var data = tableDurableNormal.row($(this).closest('tr')).data();
            var id = data.DT_RowId;
            var idres = id.substring(4);
            var index = $.inArray(idres, selectedNormal);
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
                selectedNormal.push(idres);
            } else {
                selectedNormal.splice(index, 1);
            }
            if ($(tr).hasClass('selected')) {
                $(tr).removeClass('selected');
                tableDurableNormal.rows($(this).closest('tr')).deselect();
            } else {
                $(tr).addClass('selected');
            }
        });
        $("#DurableNormalTbl tbody").on("click", "a.durableabdelete", function(event) {
           
            var dataDurable = tableDurableNormal.row($(this).parents('tr')).data();
            console.log(dataDurable)
            var rowid = dataDurable.DT_RowId;
            var durableid = rowid.substring(4);
            var action = 'DELETE'
            var data = $.param({
                tdurableid: durableid,
                taction: action
            });
            SweetAlert.swal({
                title: "ต้องการลบใช่หรือไม่?",
                text: "ข้อจะถูกลบออกจากระบบและไม่สามารถกู้คืนได้อีก!",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "ตกลง!",
                cancelButtonText: "ยกเลิก!",
                closeOnConfirm: false,
                closeOnCancel: false
            }, function(isConfirm) {
                if (isConfirm) {
                    SweetAlert.swal({
                        title: "สำเร็จ!",
                        text: "ข้อถูกลบออกจากระบบแล้ว",
                        type: "success",
                        confirmButtonColor: "#007AFF"
                    }, function(isConfirm) {
                        $http({
                            method: 'POST',
                            data: data,
                            url: "assets/views/action/dbdeleteDurable.php",
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            },
                        }).success(function(response) {
                            if (response[0].success === '1') {
                                console.log("delete")
                            } else {}
                            tableDurableNormal.draw(false);
                        });
                    });
                } else {
                    SweetAlert.swal({
                        title: "ยกเลิก",
                        text: "ยกเลิกการลบข้อมูลแล้ว :)",
                        type: "error",
                        confirmButtonColor: "#007AFF"
                    });
                }
            });
        });
        $("#DurableNormalTbl tbody").on("click", "a.durableedit", function(event) {
            var tableDurableRow = $(this).closest('tr');
            var dataDurable = tableDurableNormal.row($(this).parents('tr')).data();
            var rowid = dataDurable.DT_RowId;
            var durableid = rowid.substring(4);
            $state.go('app.durable.durable_main.durableedit', {
                "durableid": durableid
            })
        });
        $("#DurableNormalTbl tbody").on("click", "a.status-check", function(event) {
            var tableDurableRow = $(this).closest('tr');
            var dataDurable = tableDurableNormal.row($(this).parents('tr')).data();
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
    }
])
app.controller("DurableAbnormalCtrl", ["$scope", "$uibModal", "$log", "$http", "$timeout", "$stateParams", "SweetAlert", "test", "$state",
    function($scope, $uibModal, $log, $http, $timeout, $stateParams, SweetAlert, test, $state) {
        $scope.setTab(2)

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
                tableAbnormalDurable.draw(false);
            });
        }
        var selectedAbnormal = [];
        var tableAbnormalDurable = $('#DurableAbnormalTbl').DataTable({
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
                if (data[1] == 'Unknown') {
                    $(row).addClass('highlight');
                }
            },
            "rowCallback": function(row, data) {
                var rowid = data.DT_RowId;
                var rowidres = rowid.substring(4);
                if ($.inArray(rowidres, selectedAbnormal) !== -1) {
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
                    if (selectedAbnormal.length > 0) {
                        tableAbnormalDurable.rows().deselect();
                        $("#checkitemres").addClass('fa-square-o');
                        $("#checkitemres").removeClass('fa-check-square-o');
                        selectedAbnormal = [];
                    } else {
                        tableAbnormalDurable.rows().select();
                        $(row).addClass('selected');
                        var data = tableAbnormalDurable.rows('.selected').select().data();
                        $("#checkitemres").removeClass('fa-square-o');
                        $("#checkitemres").addClass('fa-check-square-o');
                        for (var i = 0; i < data.length; i++) {
                            var rowid = data[i]['DT_RowId'];
                            var rowidres = rowid.substring(4);
                            selectedAbnormal.push(rowidres);
                        }
                        return selectedAbnormal;
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
                extend: 'downloadabnormal',
                text: '<i class="fa fa-download"></i>',
                enabled: true,
                className: 'btn btn-wide-40 btn-transparent',
            }, {
                text: '<i class="fa fa-repeat"></i>',
                action: function() {
                    tableAbnormalDurable.draw()
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
                "width": "150px",
                "orderable": false
            }, {
                "data": "1",
                "width": "180px",
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
            "columnDefs": [{
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
                    return '<a ' + 'class="details-control no-padding margin-right-5 btn btn-transparent btn-xs"' + '>' + '<i class="' + 'fa fa-eye' + '"></i>' + '</a>' + '<a ' + 'class="durableabedit margin-right-5 btn-transparent no-padding  btn-xs"' + '>' + '<i class="' + 'fa fa-pencil fa fa-white' + '"></i>' + '</a>' + '<a ' + 'class="durableabdelete btn-transparent no-padding  btn-xs"' + '>' + '<i class="' + 'fa fa-trash fa fa-white' + '"></i>' + '</a>';
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

        function filterColumnspec(i) {
            var ii = $('#col' + i + '_filter').val();
            $('#DurableAbnormalTbl').DataTable().column(i).search(ii).draw();
        }
        $('input.column_filterspec').on('keyup', function() {
            filterColumnspec($(this).parents('DIV').attr('data-column'));
            /* filterColumnspec($(this).parents('tr').attr('data-column'));*/
        });
        $('#DurableAbnormalTbl tbody').on('click', '.select-checkbox', function() {
            var tr = $(this).closest('tr');
            var data = tableAbnormalDurable.row($(this).closest('tr')).data();
            var id = data.DT_RowId;
            var idres = id.substring(4);
            var index = $.inArray(idres, selectedAbnormal);
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
                selectedAbnormal.push(idres);
            } else {
                selectedAbnormal.splice(index, 1);
            }
            if ($(tr).hasClass('selected')) {
                $(tr).removeClass('selected');
                tableAbnormalDurable.rows($(this).closest('tr')).deselect();
            } else {
                $(tr).addClass('selected');
            }
        });
        $("#DurableAbnormalTbl tbody").on("click", "a.durableabedit", function(event) {
            var tableDurableRow = $(this).closest('tr');
            var dataAbnormalDurable = tableAbnormalDurable.row($(this).parents('tr')).data();
            var rowid = dataAbnormalDurable.DT_RowId;
            var durableid = rowid.substring(4);
            $state.go('app.durable.durable_main.durableedit', {
                "durableid": durableid
            })
        });
        $("#DurableAbnormalTbl tbody").on("click", "a.durableabdelete", function(event) {
            var tableDurableRow = $(this).closest('tr');
            var dataAbnormalDurable = tableAbnormalDurable.row($(this).parents('tr')).data();
            var rowid = dataAbnormalDurable.DT_RowId;
            var durableid = rowid.substring(4);
            var action = 'DELETE'
            var data = $.param({
                tdurableid: durableid,
                taction: action
            });
            SweetAlert.swal({
                title: "ต้องการลบใช่หรือไม่?",
                text: "ข้อจะถูกลบออกจากระบบและไม่สามารถกู้คืนได้อีก!",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "ตกลง!",
                cancelButtonText: "ยกเลิก!",
                closeOnConfirm: false,
                closeOnCancel: false
            }, function(isConfirm) {
                if (isConfirm) {
                    SweetAlert.swal({
                        title: "สำเร็จ!",
                        text: "ข้อถูกลบออกจากระบบแล้ว",
                        type: "success",
                        confirmButtonColor: "#007AFF"
                    }, function(isConfirm) {
                        $http({
                            method: 'POST',
                            data: data,
                            url: "assets/views/action/dbdeleteDurable.php",
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            },
                        }).success(function(response) {
                            if (response[0].success === '1') {
                                console.log("delete")
                            } else {}
                            tableAbnormalDurable.draw(false);
                        });
                    });
                } else {
                    SweetAlert.swal({
                        title: "ยกเลิก",
                        text: "ยกเลิกการลบข้อมูลแล้ว :)",
                        type: "error",
                        confirmButtonColor: "#007AFF"
                    });
                }
            });
        });
        $("#DurableAbnormalTbl tbody").on("click", "a.status-check", function(event) {
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
    }
])
app.controller("DurableFormCtrl", ["$scope", "$uibModal", "$log", "$http", "$timeout", "$stateParams", "SweetAlert", "$location", "flowFactory", "$state",
    function($scope, $uibModal, $log, $http, $timeout, $stateParams, SweetAlert, $location, flowFactory, $state) {
        $scope.setTab(3)
        $scope.obj = new Flow();

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
        $scope.durableimage = {
            avatar: 'assets/duimage/noimg.png'
        };
        $http({
            method: 'GET',
            url: 'assets/views/action/getOrgsection.php'
        }).success(function(result) {
            $scope.getorgsection = [];
            $scope.getorgsection = result;
        });
        $scope.selectdurableunit = function() {
            console.log("sompong")
            $http({
                method: 'GET',
                url: 'assets/views/action/getDurableOwnerlist.php',
                params: {
                    tsectionid: $scope.durable_unit
                }
            }).success(function(response) {
                $scope.getdurableuser = [];
                $scope.getdurableuser = response;
            });
        }
        $http({
            method: 'GET',
            url: 'assets/views/action/getDurableExplace.php'
        }).success(function(result) {
            $scope.getDurableExplace = [];
            $scope.getDurableExplace = result;
        });
        $scope.selectDurableExplace = function() {
            $http({
                method: 'GET',
                url: 'assets/views/action/getDurableSubPlace.php',
                params: {
                    tdurable_explaceid: $scope.durable_explace
                }
            }).success(function(response) {
                $scope.getDurableSubPlace = [];
                $scope.getDurableSubPlace = response;
            });
        }
        $scope.removeImage = function() {
            $scope.noImage = true;
        };
        $scope.durableaction = function(action) {
            angular.forEach($scope.obj.flow.files, function(value, key) {
                $scope.imgname = value.name;
            });
            if ($scope.obj.flow.files.length !== 0) {
                var durableimgpath = "assets/duimage/" + getIfNotSet($scope.imgname, 'noimg.png', true);
                var durableimgname = getIfNotSet($scope.imgname, 'noimg.png', true);
                var durablepurename = durableimgname.split('.').slice(0, -1).join('.');
            } else {
                var durableimgpath = "assets/duimage/noimg.png";
                var durablepurename = "noimg"
            }
            var durableno = $scope.durableno
            var durablename = getIfNotSet($scope.durable_name, '-', true);
            var durablenote = getIfNotSet($scope.durable_note, '', true);
            var durableunitid = getIfNotSet($scope.durable_unit, 0, true);
            var durableuser = getIfNotSet($scope.durable_user, 0, true);
            var durablesubplace = getIfNotSet($scope.durable_subplace, 0, true);
            var data = $.param({
                taction: action,
                tdurableno: durableno,
                tdurablename: durablename,
                tdurablenote: durablenote,
                tdurableunitid: durableunitid,
                tdurableuser: durableuser,
                tdurablesubplace: durablesubplace,
                tdurableimgpath: durableimgpath,
                tdurablepurename: durablepurename
            });
            var config = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                }
            }
            $http({
                method: 'POST',
                url: 'assets/views/action/dbDurableManagement.php',
                data: data,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
            }).success(function(response) {
                if (response[0].success === '1') {
                    $scope.obj.flow.opts.simultaneousUploads = 1;
                    $scope.obj.flow.opts.target = './assets/views/action/uploadflowdurable.php';
                    $scope.obj.flow.opts.query = {
                        "collector_id": $scope.collector_id
                    };
                    $scope.obj.flow.opts.testChunks = false
                    $scope.obj.flow.upload();
                }
            });
        }
    }
])
app.controller("DurableEditCtrl", ["$scope", "$uibModal", "$log", "$http", "$timeout", "$stateParams", "SweetAlert", "$location", "flowFactory", "$state", "info",
    function($scope, $uibModal, $log, $http, $timeout, $stateParams, SweetAlert, $location, flowFactory, $state, info) {
        /**initiate collection form value **/
        $scope.data = {};
        $scope.durableimage = {
            avatar: 'assets/duimage/noimg.png'
        };
        info.durabledata($stateParams.durableid).success(function(result) {
            $scope.durableimage.avatar = result[0].picture
            $scope.durableid = result[0].durablelist_id
            $scope.durableno = result[0].durable_no_main
            $scope.durable_name = result[0].durable_name_main
            $scope.durable_note = result[0].note
            $scope.durable_user = result[0].owner_id
            $scope.durable_unit = result[0].orgsection_id
            $scope.durable_subplace = result[0].sub_place_id
            $scope.durable_explace = result[0].explace_id
            $scope.selectdurableunit()
            $scope.selectDurableExplace()
        });
        $scope.obj = new Flow();

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
        $http({
            method: 'GET',
            url: 'assets/views/action/getOrgsection.php'
        }).success(function(result) {
            $scope.getorgsection = [];
            $scope.getorgsection = result;
        });
        $scope.selectdurableunit = function() {
            $http({
                method: 'GET',
                url: 'assets/views/action/getDurableOwnerlist.php',
                params: {
                    tsectionid: $scope.durable_unit
                }
            }).success(function(response) {
                $scope.getdurableuser = [];
                $scope.getdurableuser = response;
            });
        }
        $http({
            method: 'GET',
            url: 'assets/views/action/getDurableExplace.php'
        }).success(function(result) {
            $scope.getDurableExplace = [];
            $scope.getDurableExplace = result;
        });
        $scope.selectDurableExplace = function() {
            $http({
                method: 'GET',
                url: 'assets/views/action/getDurableSubPlace.php',
                params: {
                    tdurable_explaceid: $scope.durable_explace
                }
            }).success(function(response) {
                $scope.getDurableSubPlace = [];
                $scope.getDurableSubPlace = response;
            });
        }
        $scope.removeImage = function() {
            $scope.noImage = true;
            
        };
        $scope.durableaction = function(action) {
            angular.forEach($scope.obj.flow.files, function(value, key) {
                $scope.imgname = value.name;
            });
            if ($scope.obj.flow.files.length !== 0) {
                var durableimgpath = "assets/duimage/" + getIfNotSet($scope.imgname, 'noimg.png', true);
                var durableimgname = getIfNotSet($scope.imgname, 'noimg.png', true);
                var durablepurename = durableimgname.split('.').slice(0, -1).join('.');
            } else {
                var durableimgpath = $scope.durableimage.avatar
                var durablepurename = durableimgpath.split("/").slice(-1).join().split(".").shift();
               
            }
           
           
            var durableid = getIfNotSet($scope.durableid, 0, true);
            var durableno = $scope.durableno
            var durablename = getIfNotSet($scope.durable_name, '-', true);
            var durablenote = getIfNotSet($scope.durable_note, '', true);
            var durableunitid = getIfNotSet($scope.durable_unit, 0, true);
            var durableuser = getIfNotSet($scope.durable_user, 0, true);
            var durablesubplace = getIfNotSet($scope.durable_subplace, 0, true);
                                  
            var data = $.param({
                taction: action,
                tdurableid:durableid,
                tdurableno: durableno,
                tdurablename: durablename,
                tdurablenote: durablenote,
                tdurableunitid: durableunitid,
                tdurableuser: durableuser,
                tdurablesubplace: durablesubplace,
                tdurableimgpath: durableimgpath,
                tdurablepurename: durablepurename
            });
            var config = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                }
            }
            $http({
                method: 'POST',
                url: 'assets/views/action/dbDurableManagement.php',
                data: data,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
            }).success(function(response) {
                if (response[0].success === '1') {
                    $scope.obj.flow.opts.simultaneousUploads = 1;
                    $scope.obj.flow.opts.target = './assets/views/action/uploadflowdurable.php';
                    $scope.obj.flow.opts.query = {
                        "collector_id": $scope.collector_id
                    };
                    $scope.obj.flow.opts.testChunks = false
                    $scope.obj.flow.upload();
                }
            });
        }
    }
])