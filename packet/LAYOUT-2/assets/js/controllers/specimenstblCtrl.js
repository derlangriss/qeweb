'use strict';
/**   
 * controllers for GoogleMap  
 * AngularJS Directive  
 */
app.controller("SpecimensTblCtrl", ["$scope", "$http", "$timeout", "$stateParams", "$state", "SweetAlert", "info", "ngNotify", "ServicePDF", "$aside",
    function ($scope, $http, $timeout, $stateParams, $state, SweetAlert, info, ngNotify, ServicePDF, $aside) {
        function getIfNotSet(value, newValue, overwriteNull) {
            if (typeof (value) === 'undefined' && overwriteNull === true) {
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
        $.fn.dataTable.ext.buttons.transfertomuseum = {
            className: 'buttons-alert',
            action: function (e, dt, node, config) { }
        };
        var dataarrspecimenstbl = [];
        var tableSpecimens = $('#SpecimensTbl').DataTable({
            "processing": true,
            "serverSide": true,
            "ajax": {
                "url": "assets/scripts/server_processing_specimens.php",
                "type": "POST"
            },
            "createdRow": function (row, data, index) {
                if (data[1] == 'Unknown') {
                    $(row).addClass('highlight');
                }
            },
            "rowCallback": function (row, data) {
                var rowid = data.DT_RowId;
                var rowidres = rowid.substring(4);
                if ($.inArray(rowidres, dataarrspecimenstbl) !== -1) {
                    $(row).addClass('selected');
                }
            },
            stateSaveCallback: function (settings, data) {
                localStorage.setItem('DataTables_' + settings.sInstance, JSON.stringify(data))
            },
            stateLoadCallback: function (settings) {
                return JSON.parse(localStorage.getItem('DataTables_' + settings.sInstance))
            },
            "scrollCollapse": true,
            "lengthMenu": [
                [20, 30, 50],
                ['20 rows', '30 rows', '50 rows']
            ],
            "dom": "<'row'<'col-sm-4'B><'col-sm-4 'l><'col-sm-4'p>>" + "<'row'<'col-sm-12 toolbar'>>" + "<'row'<'col-sm-12 margin-bottom-10'tr>>" + "<'row'<'col-sm-12'i>>",
            "renderer": 'bootstrap',
            "buttons": [{}, {
                text: '<i id="checkitem" class="fa fa-square-o"></i>',
                action: function (row) {
                    $(row).removeClass('selected');
                    if (dataarrspecimenstbl.length > 0) {
                        tableSpecimens.rows().deselect();
                        $("#checkitem").addClass('fa-square-o');
                        $("#checkitem").removeClass('fa-check-square-o');
                        dataarrspecimenstbl = [];
                    } else {
                        tableSpecimens.rows().select();
                        $(row).addClass('selected');
                        var data = tableSpecimens.rows('.selected').select().data();
                        $("#checkitem").removeClass('fa-square-o');
                        $("#checkitem").addClass('fa-check-square-o');
                        for (var i = 0; i < data.length; i++) {
                            var rowid = data[i]['DT_RowId'];
                            var rowidres = rowid.substring(4);
                            dataarrspecimenstbl.push(rowidres);
                        }
                        return dataarrspecimenstbl;
                    }
                },
                className: 'btn btn-wide-40',
                enabled: true
            }, {
                text: '<i class="fa fa-repeat"></i>',
                action: function (row) {
                    tableSpecimens.draw(false)
                },
                className: 'btn btn-wide-40 btn-transparent',
                enabled: true
            }, {
                extend: 'transfertomuseum',
                text: '<i class="fa fa-indent"></i>',
                className: 'btn btn-wide-40 btn-transparent',
                enabled: true
            }],
            "pagingType": "input",
            "columns": [{
                "class": "select-checkbox",
                "orderable": false,
                "data": null,
                "defaultContent": ""
            }, {
                "data": "0",
                "width": "15%",
                "orderable": true
            }, {
                "data": "1",
                "width": "10%",
                "orderable": true
            }, {
                "data": "2",
                "width": "15%",
                "orderable": true
            }, {
                "data": "3",
                "width": "20%",
                "orderable": true
            }, {
                "data": "4",
                "width": "30%",
                "orderable": true
            }, {
                "data": "5",
                "width": "15%",
                "orderable": true,
                "visible": false
            }, {
                // collection code
                "data": "6",
                "width": "15%",
                "orderable": true,
                "visible": false
            }, {
                // collection year
                "data": "7",
                "width": "15%",
                "orderable": true,
                "visible": false
            }, {
                // collection number
                "data": "8",
                "width": "15%",
                "orderable": true,
                "visible": false
            }, {
                // spec number
                "data": "9",
                "width": "15%",
                "orderable": true,
                "visible": false
            }],
            "columnDefs": [{
                render: function (data, type, full, meta) {
                    return '<a ' + 'class="details-control no-padding margin-right-5 btn btn-transparent btn-xs"' + '>' + '<i class="' + 'fa fa-eye' + '"></i>' + '</a>' + '<a ' + 'class="edit-control no-padding margin-right-5 btn btn-transparent btn-xs"' + '>' + '<i class="' + 'fa fa-pencil' + '"></i>' + '</a>' + '<a ' + 'class="delete btn-transparent no-padding  btn-xs"' + '>' + '<i class="' + 'fa fa-trash fa fa-white' + '"></i>' + '</a>';
                },
                targets: 11
            }],
            "order": [
                [6, 'asc'],
                [7, 'asc'],
                [8, 'asc'],
                [9, 'asc']
            ]
        });
        $('#SpecimensTbl tbody').on('click', '.details-control', function () {
            $scope.openAside = function (position, specimensid) {
                $aside.open({
                    templateUrl: 'assets/views/aside_spec_view.html',
                    placement: position,
                    size: 'md',
                    backdrop: true,
                    controller: function ($scope, $uibModalInstance) {
                        $scope.tab = 1;
                        $scope.setTab = function (newTab) {
                            var Boxidmodel = getIfNotSet($scope.BoxShowDetailsBoxid, 0, true);
                            if (newTab == 2) { }
                            if (newTab == 3) { }
                            $scope.tab = newTab;
                        };
                        $scope.isSet = function (tabNum) {
                            return $scope.tab === tabNum;
                        };
                        var data = $.param({
                            tspecimensid: specimensid
                        });
                        $http({
                            method: 'POST',
                            data: data,
                            url: "assets/views/action/selectspecdetails.php",
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            },
                        }).success(function (response) {
                            console.log(response)
                            $scope.specimens_id = response[0].specimens_id;
                            $scope.specimens_full_number = response[0].specimens_full_number;
                            $scope.torder_name = response[0].torder_name;
                            $scope.family_name = response[0].family_name;
                            $scope.genus_name = response[0].genus_name;
                            $scope.species_name = response[0].species_name;
                            $scope.drawer_code = response[0].drawer_code;
                            $scope.spec_box_code = response[0].spec_box_code;
                            $scope.sub_cabinet = response[0].sub_cabinet;
                            $scope.cabinet = response[0].cabinet;
                            $scope.rcabinet = response[0].rcabinet;
                            $scope.sreport_date = response[0].sreport_date;
                            /** $scope.cabinet_code = response[0].cabinet_code;  **/
                            /** $scope.subcabinet_code = response[0].subcabinet_code;  **/
                            $scope.collection_id = response[0].coll_id;
                            $scope.coll_full_id = response[0].coll_full_id;
                            $scope.coll_start_date = response[0].coll_start_date;
                            $scope.coll_end_date = response[0].coll_end_date;
                            $scope.coll_locality = response[0].coll_locality;
                            $scope.coll_specific_locality = response[0].coll_specific_locality;
                            $scope.coll_habitat = response[0].coll_habitat;
                            $scope.province_en = response[0].province_en;
                            $scope.amphur_en = response[0].amphur_en;
                            $scope.coll_masl = response[0].coll_masl;
                            $scope.collmethod = response[0].method;
                            $scope.donation = response[0].donation;
                            $scope.coll_lat_d = response[0].coll_lat_d;
                            $scope.coll_lat_m = response[0].coll_lat_m;
                            $scope.coll_lat_s = response[0].coll_lat_s;
                            $scope.coll_long_d = response[0].coll_long_d;
                            $scope.coll_long_m = response[0].coll_long_m;
                            $scope.coll_long_s = response[0].coll_long_s;
                            $scope.collectorlist = [];
                            $scope.collectorlist = response[0].collectorea;
                        });
                    }
                });
            };
            var tr = $(this).closest('tr');
            var row = tableSpecimens.row(tr);
            var tablespecimensdata = row.data()
            var tablespecimensid = tablespecimensdata[9]
            $scope.openAside('right', tablespecimensid)
        });
        $scope.filterGlobal = function () {
            $scope.IsVisible = $scope.IsVisible = true;
            $('#SpecimensTbl').DataTable().search($scope.filterGlobaltext).draw();
        }
        $scope.searchmodel = function (i) {
            if (i == 2) {
                var ii = $scope.torder;
                $('#SpecimensTbl').DataTable().column(i).search(ii).draw();
            }
            if (i == 3) {
                var ii = $scope.family;
                $('#SpecimensTbl').DataTable().column(i).search(ii).draw();
            }
            if (i == 6) {
                var ii = $scope.collcode;
                $('#SpecimensTbl').DataTable().column(i).search(ii).draw();
            }
            if (i == 7) {
                var ii = $scope.collyear;
                $('#SpecimensTbl').DataTable().column(i).search(ii).draw();
            }
            if (i == 8) {
                var ii = $scope.collnumber;
                $('#SpecimensTbl').DataTable().column(i).search(ii).draw();
            }
            if (i == 9) {
                var ii = $scope.specnumber;
                $('#SpecimensTbl').DataTable().column(i).search(ii).draw();
            }
        }
        $scope.HideShow = function () {
            $scope.filterGlobal();
            $scope.IsVisible = false;
            $scope.filterGlobaltext = '';
            $('#SpecimensTbl').DataTable().search('').draw();
        }

        $('#SpecimensTbl tbody').on('click', '.edit-control', function () {
             console.log('sdff')
        });
    }
]);