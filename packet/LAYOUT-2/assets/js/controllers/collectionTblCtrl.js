'use strict';
/**   
 * controllers for GoogleMap  
 * AngularJS Directive  
 */
app.controller("collectionTblCtrl", ["$scope", "$http", "$timeout", "$stateParams", "$state", "SweetAlert", "info", "ngNotify", "ServicePDF", "$aside",
    function($scope, $http, $timeout, $stateParams, $state, SweetAlert, info, ngNotify, ServicePDF, $aside) {
        $scope.IsVisible = false;

        function modalCollDetails(a) {
            var data = $.param({
                tcollectionid: a
            });
            return $http({
                method: 'POST',
                data: data,
                url: "assets/views/action/selectcollectdetails.php",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
            }).success(function(response) {
                console.log(response)
                $scope.collection_id = response[0].coll_id;
                /*
                                $scope.coll_full_id = response[0].coll_full_id;
                                $scope.coll_start_date = response[0].coll_start_date;
                                $scope.coll_end_date = response[0].coll_end_date;
                                $scope.coll_locality = response[0].coll_locality;
                                $scope.coll_specific_locality = response[0].coll_specific_locality;
                                $scope.coll_habitat = response[0].coll_habitat;
                                $scope.province_en = response[0].province_en;
                                $scope.amphur_en = response[0].amphur_en;*/
            });
        }

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

        function format(d) {
            return d
        }
        $.fn.dataTable.ext.buttons.addcollection = {
            className: 'buttons-alert',
            action: function(e, dt, node, config) {
                $state.go('app.form.collection_data', {
                    "collid": ''
                })
            }
        };
        var dataarrcollection = [];
        var groupColumn = 2;
        var groupColumn1 = 3;
        var tableCollectionList = $('#CollectionListTbl').DataTable({
            "processing": true,
            "serverSide": true,
            "ajax": {
                "url": "assets/scripts/server_processing_collectiondata.php",
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
                if ($.inArray(rowidres, dataarrcollection) !== -1) {
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
                [20, 30, 50],
                ['20 rows', '30 rows', '50 rows']
            ],
            "dom": "<'row'<'col-sm-4'B><'col-sm-4 'l><'col-sm-4'p>>" + "<'row'<'col-sm-12 toolbar'>>" + "<'row'<'col-sm-12 margin-bottom-10'tr>>" + "<'row'<'col-sm-12'i>>",
            "renderer": 'bootstrap',
            "buttons": [{}, {
                text: '<i id="checkitem" class="fa fa-square-o"></i>',
                action: function(row) {
                    $(row).removeClass('selected');
                    if (dataarrcollection.length > 0) {
                        tableCollectionList.rows().deselect();
                        $("#checkitem").addClass('fa-square-o');
                        $("#checkitem").removeClass('fa-check-square-o');
                        dataarrcollection = [];
                    } else {
                        tableCollectionList.rows().select();
                        $(row).addClass('selected');
                        var data = tableCollectionList.rows('.selected').select().data();
                        $("#checkitem").removeClass('fa-square-o');
                        $("#checkitem").addClass('fa-check-square-o');
                        for (var i = 0; i < data.length; i++) {
                            var rowid = data[i]['DT_RowId'];
                            var rowidres = rowid.substring(4);
                            dataarrcollection.push(rowidres);
                        }
                        return dataarrcollection;
                    }
                },
                className: 'btn btn-wide-40',
                enabled: true
            }, {
                text: '<i class="fa fa-repeat"></i>',
                action: function(row) {
                    tableCollectionList.draw(false)
                },
                className: 'btn btn-wide-40 btn-transparent',
                enabled: true
            }, {
                extend: 'addcollection',
                text: '<i class="fa fa-plus"></i>',
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
                "orderable": false,
                "visible": false
            }, {
                "data": "2",
                "width": "15%",
                "orderable": false
            }, {
                "data": "3",
                "width": "15%",
                "orderable": false
            }, {
                "data": "4",
                "visible": false
            }, {
                "data": "5",
                "visible": false
            }, {
                "data": "6",
                "width": "25%",
                "visible": true,
                "orderable": false
            }, {
                "data": "7",
                "width": "23%",
                "visible": true,
                "orderable": false
            }, {
                "data": "8",
                "visible": false,
                "width": "12%",
            }, {
                "data": "9",
                "visible": false,
                "width": "12%",
            }, {
                "data": "10",
                "visible": false,
                "width": "12%",
            }, {
                "data": "11",
                "visible": false,
                "width": "12%",
            }, {
                "data": "12",
                "visible": false,
                "width": "12%",
            }],
            "columnDefs": [{
                render: function(data, type, full, meta) {
                    return '<a ' + 'class="details-control no-padding margin-right-5 btn btn-transparent btn-xs"' + '>' + '<i class="' + 'fa fa-eye' + '"></i>' + '</a>' + '<a href="' + "#/app/form/collection_data/" + full[9] + '"' + 'class="no-padding margin-right-5 btn btn-transparent btn-xs"' + '>' + '<i class="' + 'fa fa-pencil' + '"></i>' + '</a>' + '<a ' + 'class="delete btn-transparent no-padding  btn-xs"' + '>' + '<i class="' + 'fa fa-trash fa fa-white' + '"></i>' + '</a>';
                },
                targets: 14
            }],
            "order": [
                [1, 'asc']
            ]
        });
        $("div.toolbar").html('<table><tr class="group label-info  bigfonttr"><td></td><td class="groupheader" colspan="1" ><span class="badge badge-danger margin-right-5" >' + '</span>' + " " + '<span class="badge badge-danger">' + '</span></td><td colspan="5" class="text-right"><a class="btn btn-transparent btn-xs tooltips marginnavileft checkall" tooltip-placement="top" uib-tooltip="Share"><i class="fa fa-check-square"></i></a><a class="btn btn-transparent btn-xs marginnavileft cancelall" tooltip-placement="top" uib-tooltip="Edit"><i class="fa fa-circle-o"></i></a></td></tr></table>');
        $(".toolbar").hide();
        $('#CollectionListTbl tbody').on('click', '.select-checkbox', function() {
            var tr = $(this).closest('tr');
            var data = tableCollectionList.rows().data();
            console.log(data)
            var id = data.DT_RowId;
            var idres = id.substring(4);
            var index = $.inArray(idres, dataarrcollection);
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
                dataarrcollection.push(idres);
            } else {
                dataarrcollection.splice(index, 1);
            }
            if ($(tr).hasClass('selected')) {
                $(tr).removeClass('selected');
                tableCollectionList.rows($(this).closest('tr')).deselect();
            } else {
                $(tr).addClass('selected');
            }
        });
        $scope.clicktestdata = function() {
            var data = tableCollectionList.rows().data();
            console.log(data)
            var api = $('#CollectionListTbl').dataTable().api();
            var rows = api.rows({}).nodes();
            $(rows).eq(0).before('<tr class="group label-info  bigfonttr"><td></td><td class="groupheader" colspan="1" ><span class="badge badge-danger margin-right-5" >' + '</span>' + " " + '<span class="badge badge-danger">' + '</span></td><td colspan="5" class="text-right"><a class="btn btn-transparent btn-xs tooltips marginnavileft checkall" tooltip-placement="top" uib-tooltip="Share"><i class="fa fa-check-square"></i></a><a class="btn btn-transparent btn-xs marginnavileft cancelall" tooltip-placement="top" uib-tooltip="Edit"><i class="fa fa-circle-o"></i></a></td></tr>');
            console.log(rows)
            $(".toolbar").show("fast", function() {
                alert("Animation complete.");
            })
        };
        var form_data = tableCollectionList.rows().data();
        console.log(form_data.length)
        $.each(form_data, function(key, value) {
            console.log("sompong")
        });
        tableCollectionList.rows().every(function(rowIdx, tableLoop, rowLoop) {
            var data = this.data();
            // ... do something with data(), or this.node(), etc
        });
        /*
        $('#' + 'CollectionListTbl' + ' thead tr:eq(0) th:eq(0)').before.html("myText");
        */
        $('#CollectionListTbl tbody').on('click', '.details-control', function() {
            $scope.openAside = function(position, collectionid) {
                $aside.open({
                    templateUrl: 'assets/views/pages_blank_page.html',
                    placement: position,
                    size: 'md',
                    backdrop: true,
                    controller: function($scope, $uibModalInstance) {
                        var data = $.param({
                            tcollectionid: collectionid
                        });
                        $http({
                            method: 'POST',
                            data: data,
                            url: "assets/views/action/selectcollectdetails.php",
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            },
                        }).success(function(response) {
                            console.log(response)
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
            var row = tableCollectionList.row(tr);
            var tablecolldata = row.data()
            var tablecollid = tablecolldata[9]
            $scope.openAside('right', tablecollid)
        });
        $scope.filterGlobal = function() {
            $scope.IsVisible = $scope.IsVisible = true;
            $('#CollectionListTbl').DataTable().search($scope.filterGlobaltext).draw();
        }
        $scope.HideShow = function() {
            $scope.filterGlobal();
            $scope.IsVisible = false;
            $scope.filterGlobaltext = '';
            $('#CollectionListTbl').DataTable().search('').draw();
        }

        function filterColumnspecbox(i) {
            if (i == 8) {
                var ii = getIfNotSet(Number($('#col' + i + '_filterbox').val()), '', true);
            } else {
                var ii = $('#col' + i + '_filterbox').val();
            }
            $('#SpecimensBoxListTbl').DataTable().column(i).search(ii).draw();
        }
        $('input.column_filterspecbox').on('keyup', function() {
            filterColumnspecbox($(this).parents('DIV').attr('data-column'));
            /* filterColumnspec($(this).parents('tr').attr('data-column'));*/
        });
        $scope.collorder = ''
        $scope.collfamily = ''
        $scope.searchmodel = function(i) {
            if (i == 2) {
                var ii = $scope.colltrap;
                $('#CollectionListTbl').DataTable().column(i).search(ii).draw();
            }
            if (i == 3) {
                var ii = $scope.collamphur;
                $('#CollectionListTbl').DataTable().column(i).search(ii).draw();
            }
            if (i == 4) {
                var ii = $scope.collprovince;
                $('#CollectionListTbl').DataTable().column(i).search(ii).draw();
            }
            if (i == 5) {
                var ii = $scope.collstart;
                $('#CollectionListTbl').DataTable().column(i).search(ii).draw();
            }
            if (i == 6) {
                var ii = $scope.collend;
                $('#CollectionListTbl').DataTable().column(i).search(ii).draw();
            }
            if (i == 7) {
                var ii = $scope.collcode;
                $('#CollectionListTbl').DataTable().column(i).search(ii).draw();
            }
            if (i == 8) {
                var ii = $scope.collcode;
                $('#CollectionListTbl').DataTable().column(i).search(ii).draw();
            }
            if (i == 9) {
                var ii = $scope.collyear;
                $('#CollectionListTbl').DataTable().column(i).search(ii).draw();
            }
            if (i == 11) {
                var ii = $scope.collcode;
                $('#CollectionListTbl').DataTable().column(i).search(ii).draw();
            }
            if (i == 12) {
                var ii = $scope.collyear;
                $('#CollectionListTbl').DataTable().column(i).search(ii).draw();
            }
            if (i == 13) {
                var ii = $scope.collnumber;
                $('#CollectionListTbl').DataTable().column(i).search(ii).draw();
            }
        }
        /*
        $('#showdate').datepicker({
            format: "yyyy/mm",
            todayHighlight: true,
            autoclose: true,
            viewMode: "months",
            minViewMode: "months"
        }).on('changeDate', function(e) {
            var currMonth = new Date(e.date).getMonth() + 1;
            var curryear = String(e.date).split(" ")[3];
            $scope.changeDateMonthEX(currMonth, curryear)
        });
        $scope.showDatePicker = function() {
            $("#showdate").datepicker('show');
        }
        $scope.changeDateMonthEX = function(month, year) {
            if (month && year !== '0') {
                $state.go('app.museum.transfer_specimens', {
                    "monthid": month,
                    "yearid": year
                })
            }
        };*/
        /*
        $scope.collstart = ''
        $('#txtstartdate').datepicker({
            format: "yyyy/mm",
            todayHighlight: true,
            autoclose: true,
        }).on('changeDate', function(e) {
            $scope.collstart = new Date(e.date).getMonth() + 1;
            var curryear = String(e.date).split(" ")[3];
            $scope.collstart = currMonth + '' + curryear
        });
        $('#txtenddate').datepicker({
            format: "yyyy/mm",
            todayHighlight: true,
            autoclose: true,
        }).on('changeDate', function(e) {});
        /* $('#txtstartdate').datepicker({
             format: "yyyy/mm/dd",
             todayHighlight: true,
             autoclose: true,
             beforeShowDay: function() {*/
        /*
         $('.hasDatepicker').css({'z-index': 1500},{'position': 'relative'})**/
        /*   }
     });
        $('#txtenddate').datepicker({
            format: "yyyy/mm/dd",
            todayHighlight: true,
            autoclose: true,
            beforeShowDay: function() {*/
        /*
         $('.hasDatepicker').css({'z-index': 1500},{'position': 'relative'})**/
        /*  }
        })*/
        ;
        $('.dropdown').on({
            "shown.bs.dropdown": function() {
                this.closable = true;
            },
            "click": function() {
                this.closable = false;
            },
            "hide.bs.dropdown": function() {
                return false;
            }
        });
        $scope.closefilter = function() {
            $('.dropdown').on({
                "click": function() {
                   $('.dropdown-menu').removeClass('open');
                }
            });
        }
        $('#sandbox-enddate .input-group.date').datepicker({
            autoclose: true,
            todayHighlight: true
        });
        $('#sandbox-startdate .input-group.date').datepicker({
            autoclose: true,
            todayHighlight: true
        });
        /*endctrl */
    }
]);