'use strict';
/**  
 * controllers for GoogleMap  
 * AngularJS Directive  
 */
app.controller("PreinsSpecimensCtrl", ["$scope", "$uibModal", "$log", "$http", "$timeout", "$stateParams", "SweetAlert", "info", "ngNotify", "calculatedbData", function($scope, $uibModal, $log, $http, $timeout, $stateParams, SweetAlert, info, ngNotify, calculatedbData) {
    $scope.specdata = {};
    $scope.editmode = 'Nedit';
    $scope.resetform = 'YES';
    $scope.typespecimen = 0;
    $scope.numberOFrecord = 1; 
    $scope.currentStep = 1;
    var previousWindowKeyDown = window.onkeydown;
    calculatedbData.getSUMspec("PreinsMonth").success(function(datamonthsummary) {
        $scope.ngmodelMothsum = getIfNotSet(datamonthsummary[0].totalmonth, 0, true);
    });
    $(function() { // can replace the onload function with any other even like showing of a dialog
        $('.autofocus').focus();
    })
    $('#focusguard-2').on('focus', function() {
        $('#txtpreinsyear').focus();
    });
    $('#focusguard-1').on('focus', function() {
        $('#txtpreinsqty').focus();
    });
    var errorMessage = function(i) {
        ngNotify.set('please complete the form in this step before proceeding', {
            theme: 'pure',
            position: 'top',
            duration: 1000,
            type: 'error',
            button: true,
            sticky: false,
        });
    }

    function getIfNotSet(value, newValue, overwriteNull) {
        if (typeof(value) === 'undefined' && overwriteNull === true) {
            return newValue;
        }
        if (value === 'undefined' && overwriteNull === true) {
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
    $scope.GETcollectioncodelist = null;
    $scope.GETcollectioncode = [];
    $http({
        method: 'GET',
        url: 'assets/views/action/getcollectioncodelist.php'
    }).success(function(result) {
        $scope.GETcollectioncode = result;
    });
    $scope.GETstafflist = null;
    $scope.GETstaffid = [];
    $http({
        method: 'GET',
        url: 'assets/views/action/getStaffList.php'
    }).success(function(result) {
        $scope.GETstaffid = result;
    });
    $scope.AUTOSPECNO = function() {
        var a = getIfNotSet($scope.gencoll_code, '', true);
        var b = getIfNotSet($scope.gencoll_year, '', true);
        var c = getIfNotSet($scope.gencoll_number, '', true);
        var data = $.param({
            gencoll_code: a,
            gencoll_year: b,
            gencoll_number: c
        });
        $http({
            method: 'POST',
            url: "assets/views/action/return_specnumber.php",
            data: data,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
        }).success(function(result) {
            if (dataarr.length !== 0) {
                var data = table.rows('.selected').data();
                var id = data[0].DT_RowId;
                table.rows('.selected').deselect();
                var index = $.inArray(id, dataarr);
                if (index !== -1) {
                    dataarr.splice(index, 1);
                }
            }
            if (result !== '') {
                SweetAlert.swal({
                    title: "Your Request Success",
                    text: "Generate Collection Number Complete!",
                    type: "success",
                    showCancelButton: false,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "OK"
                }, function() {
                    if (result[0].gen_mode === 1) {
                        /*
                        $('#txtcollection_start_date').datepicker('setDate', null);
                        $('#txtcollection_end_date').datepicker('setDate', null);
                        $scope.txtcollection_start_date = '';
                        $scope.txtcollection_end_date = '';
                        $scope.collectors = [];
                        */
                        $scope.specdata.collectionid = result[0].coll_id;
                        $scope.specdata.coll_code = result[0].coll_code;
                        $scope.specdata.coll_year = result[0].coll_year;
                        $scope.specdata.coll_number = result[0].coll_number;
                    } else if (result[0].gen_mode === 2) {
                        /*
                        $('#txtcollection_start_date').datepicker('setDate', null);
                        $('#txtcollection_end_date').datepicker('setDate', null);
                        $scope.txtcollection_start_date = '';
                        $scope.txtcollection_end_date = '';
                        $scope.collectors = [];
                        */
                        $scope.specdata.collectionid = result[0].coll_id;
                        $scope.specdata.coll_code = result[0].coll_code;
                        $scope.specdata.coll_year = result[0].coll_year;
                        $scope.specdata.coll_number = result[0].coll_number;
                        $scope.specdata.specimens_number = result[0].spec_number;
                        $("#col6_filter").val(result[0].coll_code);
                        $("#col7_filter").val(result[0].coll_year);
                        $("#col8_filter").val(result[0].coll_number);
                        filterColumnspec(6)
                        filterColumnspec(7)
                        filterColumnspec(8)
                    } else if (result[0].gen_mode === 3) {
                        $scope.specdata.collectionid = result[0].coll_id;
                        $scope.specdata.coll_code = result[0].coll_code;
                        $scope.specdata.coll_year = result[0].coll_year;
                        $scope.specdata.coll_number = result[0].coll_number;
                        $scope.specdata.specimens_number = result[0].spec_number;
                        $("#col6_filter").val(result[0].coll_code);
                        $("#col7_filter").val(result[0].coll_year);
                        $("#col8_filter").val(result[0].coll_number);
                        filterColumnspec(6)
                        filterColumnspec(7)
                        filterColumnspec(8)
                    } else if (result[0].gen_mode === 4) {
                        $('#txtcollection_start_date').datepicker('setDate', null);
                        $('#txtcollection_end_date').datepicker('setDate', null);
                        $scope.txtcollection_start_date = '';
                        $scope.txtcollection_end_date = '';
                        $scope.collectors = [];
                        $scope.data.coll_code = result[0].coll_code;
                        $scope.data.coll_year = result[0].coll_year;
                        $scope.data.coll_number = result[0].coll_number;
                        $scope.resetcollectionform();
                        $scope.clearMarkers();
                    }
                });
            } else {
                SweetAlert.swal({
                    title: "Can't Generate Collection Number",
                    type: "error",
                    confirmButtonColor: "#007AFF"
                });
            }
        });
    }
    info.specno($stateParams.specid).success(function(result) {
        if (result[0].view_mode === 2) {
            console.log(result[0].view_mode);
            $scope.specdata.collectionid = result[0].coll_id;
            $scope.specdata.coll_code = result[0].coll_code;
            $scope.specdata.coll_year = result[0].coll_year;
            $scope.specdata.coll_number = result[0].coll_number;
            $scope.specdata.specimens_number = result[0].spec_number;
            $("#col6_filter").val(result[0].coll_code);
            $("#col7_filter").val(result[0].coll_year);
            $("#col8_filter").val(result[0].coll_number);
            filterColumnspec(6)
            filterColumnspec(7)
            filterColumnspec(8)
        } else if (result[0].coll_id === undefined) {} else {
            $("#coll_codetest").val(result[0].coll_code);
            var startdate = result[0].collectionstartdate;
            var enddate = result[0].collectionenddate;
            $scope.specdata.collectionid = result[0].coll_id;
            $scope.specdata.collectionlatdec = result[0].collectionlatdec;
            $scope.specdata.collectionlatd = result[0].collectionlatd;
            $scope.specdata.collectionlatm = result[0].collectionlatm;
            $scope.specdata.collectionlats = result[0].collectionlats;
            $scope.specdata.collectionlongdec = result[0].collectionlongdec;
            $scope.specdata.collectionlongd = result[0].collectionlongd;
            $scope.specdata.collectionlongm = result[0].collectionlongm;
            $scope.specdata.collectionlongs = result[0].collectionlongs;
            $scope.specdata.collectionnorthing = result[0].collectionnorthing;
            $scope.specdata.collectioneasting = result[0].collectioneasting;
            $scope.specdata.collectionutm = result[0].collectionutm;
            $scope.specdata.specimens_number = result[0].specimens_number;
            $scope.specdata.coll_code = result[0].coll_code;
            $scope.specdata.coll_year = result[0].coll_year;
            $scope.specdata.coll_number = result[0].coll_number;
            $scope.specdata.specimensid = result[0].specimens_id;
            $scope.selectedCountry = result[0].torder_idtorder;
            $scope.typespecimen = getIfNotSet(result[0].taxatype_taxatype_id, 0, true);
            $('#labelhead').html("THAILAND:");
            $('#collectioncode').html(result[0].coll_code);
            $('#collectionyear').html(result[0].coll_year);
            $('#collectionnumber').html(result[0].coll_number);
            $('#collectionprovince').html(result[0].provinceen);
            $('#collectionenddate').html(result[0].collectionenddate);
            $('#collectionmethod').html(result[0].collectionmethodsdetails);
            $('#collectioncollector').html(result[0].collectorsen);
            $('#collectionmasl').html("Alt. " + result[0].collectionmasl + " m");
            $('#collectionlocality').html(result[0].collectionlocality);
            $('#collectionlat').html(result[0].collectionlatd + "&#12444;" + result[0].collectionlatm + "&#39;" + result[0].collectionlats + "&quot" + "N");
            $('#collectionlong').html(result[0].collectionlongd + "&#12444;" + result[0].collectionlongm + "&#39;" + result[0].collectionlongs + "&quot" + "E");
            $("#col6_filter").val(result[0].coll_code);
            $("#col7_filter").val(result[0].coll_year);
            $("#col8_filter").val(result[0].coll_number);
            filterColumnspec(6)
            filterColumnspec(7)
            filterColumnspec(8)
        }
    });
    $scope.preinsspecIns = function() {
        var ex = getIfNotSet($scope.editmode, 'Nedit', true);
        var a = $scope.preinsspec.preinsdate;
        var b = getIfNotSet($scope.preinsspec.preinscode, '0', true);
        var c = getIfNotSet($scope.preinsspec.preinsyear, '0', true);
        var d = getIfNotSet($scope.preinsspec.preinsnumber, '0', true);
        var e = $scope.preinsspec.preinsqty;
        var f = $scope.preinsspec.preinsstaffid;
        var g = getIfNotSet($scope.preinsspec.preinsid, '0', true);
        var data = $.param({
            tpreinsdate: a,
            tpreinscode: b,
            tpreinsyear: c,
            tpreinsnumber: d,
            tpreinsqty: e,
            tpreinsstaffid: f,
            tpreinsid: g,
            teditmode: ex
        });
        var config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
            }
        }
        /*
        $http.post('assets/views/action/dbinsertMethod.php', data, config).success(function(data, status, headers, config) {
            $scope.PostDataResponse = data;
        })
        */
        $http({
            method: 'POST',
            url: 'assets/views/action/dbinsertPreinsspec.php',
            data: data,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
        }).success(function(response) {
            if (response[0].success == "1") {
                if (response[0].Ins_mode == "Nedit") {
                    SweetAlert.swal({
                        title: "SAVED(บันทึกสำเร็จ)",
                        text: "Your imaginary file is saved (บันทึกข้อมูลเสร็จสิ้น)",
                        type: "success",
                        confirmButtonColor: "#007AFF",
                        timer: 2000
                    });
                }
                if (response[0].Ins_mode == "Exedit") {
                    SweetAlert.swal({
                        title: "SAVED(บันทึกสำเร็จ)",
                        text: "Your imaginary file is saved (บันทึกข้อมูลเสร็จสิ้น)",
                        type: "success",
                        confirmButtonColor: "#007AFF",
                        timer: 2000
                    });
                }
                calculatedbData.getSUMspec("PreinsMonth").success(function(datamonthsummary) {
                    $scope.ngmodelMothsum = datamonthsummary[0].totalmonth;
                });
                if ($scope.resetform === 'YES') {
                    $scope.resetPreinsSpecimensCtrl();
                } else {
                    console.log("No");
                }
            } else {
                SweetAlert.swal({
                    title: "Cancelled(ยกเลิกรายการ)",
                    text: "Your imaginary file is cancelled (กรอกข้อมูลไม่ครบหรือข้อมูลไม่ถูกต้อง)",
                    type: "error",
                    confirmButtonColor: "#007AFF"
                });
            }
            table.draw();
        });
    }
    $scope.autonumber = function() {
        if (dataarr.length !== 0) {
            var data = table.rows('.selected').data();
            var id = data[0].DT_RowId;
            table.rows('.selected').deselect();
            var index = $.inArray(id, dataarr);
            if (index !== -1) {
                dataarr.splice(index, 1);
            }
        }
        $scope.specdata.specimensid = 0;
        if (dataarr.length !== 0) {
            var data = table.rows('.selected').data();
            var id = data[0].DT_RowId;
            table.rows('.selected').deselect();
            var index = $.inArray(id, dataarr);
            if (index !== -1) {
                dataarr.splice(index, 1);
            }
        }
        $http({
            method: 'POST',
            url: "assets/views/action/returnSpecimensNo.php",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
        }).success(function(response) {
            $scope.Specno = response;
            $scope.Specimens_Form.$setPristine();
            $scope.Specimens_Form.$setUntouched();
            $scope.typespecimen = 0;
            $scope.specdata.coll_code = $scope.Specno[0].coll_code;
            $scope.specdata.coll_year = $scope.Specno[0].coll_year;
            $scope.specdata.coll_number = $scope.Specno[0].coll_number;
            $scope.specdata.specimens_number = $scope.Specno[0].specimens_number;
            $scope.specdata.specimensid = 0;
            $scope.numberOFrecord = 1;
        });
        /*
        $.ajax({
            url: "assets/views/action/returnSpecimensNo.php",
            type: "POST"
        }).success(function(result) {
            var obj = jQuery.parseJSON(result);
            if (obj == '') {
                alter
                $('input[type=text]').val('');
            } else {
                $.each(obj, function(key, inval) {
                    $("#txtspecimens_number").val(inval["specimens_number"])
                    $('#txtidcollection').val(inval["coll_id"]);
                    $('#col6_filter').val(inval["coll_code"]);
                    $('#col7_filter').val(inval["coll_year"]);
                    $('#col8_filter').val(inval["coll_number"]);
                });
            }
        });*/
    };
    $scope.autonumber = function() {
        if (dataarr.length !== 0) {
            var data = table.rows('.selected').data();
            var id = data[0].DT_RowId;
            table.rows('.selected').deselect();
            var index = $.inArray(id, dataarr);
            if (index !== -1) {
                dataarr.splice(index, 1);
            }
        }
        $scope.specdata.specimensid = 0;
        if (dataarr.length !== 0) {
            var data = table.rows('.selected').data();
            var id = data[0].DT_RowId;
            table.rows('.selected').deselect();
            var index = $.inArray(id, dataarr);
            if (index !== -1) {
                dataarr.splice(index, 1);
            }
        }
        $http({
            method: 'POST',
            url: "assets/views/action/returnSpecimensNo.php",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
        }).success(function(response) {
            $scope.Specno = response;
            $scope.Specimens_Form.$setPristine();
            $scope.Specimens_Form.$setUntouched();
            $scope.typespecimen = 0;
            $scope.specdata.coll_code = $scope.Specno[0].coll_code;
            $scope.specdata.coll_year = $scope.Specno[0].coll_year;
            $scope.specdata.coll_number = $scope.Specno[0].coll_number;
            $scope.specdata.specimens_number = $scope.Specno[0].specimens_number;
            $scope.specdata.specimensid = 0;
            $scope.numberOFrecord = 1;
        });
        /*
        $.ajax({
            url: "assets/views/action/returnSpecimensNo.php",
            type: "POST"
        }).success(function(result) {
            var obj = jQuery.parseJSON(result);
            if (obj == '') {
                alter
                $('input[type=text]').val('');
            } else {
                $.each(obj, function(key, inval) {
                    $("#txtspecimens_number").val(inval["specimens_number"])
                    $('#txtidcollection').val(inval["coll_id"]);
                    $('#col6_filter').val(inval["coll_code"]);
                    $('#col7_filter').val(inval["coll_year"]);
                    $('#col8_filter').val(inval["coll_number"]);
                });
            }
        });*/
    };
    $scope.onChangedCollcode = function() {
        $http({
            method: 'GET',
            url: 'assets/views/action/returnAutoSpecNo.php',
            params: {
                sCode: $("#col6_filter").val()
            }
        }).success(function(response) {
            if (typeof response[0] != 'undefined') {
                $scope.coll_year = response[0].coll_year;
                $scope.coll_number = response[0].coll_number;
                $scope.specimens_number = response[0].specimens_number;
                $("#col7_filter").val($scope.coll_year);
                $("#col8_filter").val($scope.coll_number);
                $("#txtspecimens_number").val($scope.specimens_number);
            }
        });
    }
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
    $scope.changeGenus = function() {
        $scope.specModelSpecies = {
            genus_genus_id: '',
            species_id: '',
            species_name: '',
            sub_genus: ''
        };
    };
    /* INSERT PRINT QUEUE */
    $scope.InsPreSpec = function(action, form) {
        var data;
        var preinsids = dataarr;
        var a = JSON.stringify(preinsids);
        if (action == "ADD") {
            data = $.param({
                taction: action
            });
        } else if (action == "DELETE") {
            data = $.param({
                taction: action,
                tpreins_ids: a
            });
        }
        SweetAlert.swal({
            title: "Are you sure?",
            text: "Your Print data request will be recorded in database!",
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
                    url: "assets/views/action/dbinsert_prespec_spec.php",
                    data: data,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                }).success(function(response) {
                    SweetAlert.swal({
                        title: "Saved!",
                        text: "Your imaginary file has been Saved.",
                        type: "success",
                        confirmButtonColor: "#007AFF"
                    }, function(isConfirm) {
                        window.onkeydown = previousWindowKeyDown;
                        table.draw();
                        calculatedbData.getSUMspec("PreinsMonth").success(function(datamonthsummary) {
                            $scope.ngmodelMothsum = datamonthsummary[0].totalmonth;
                        });
                        /**
                        if (response[0].success == "1") {
                            if (action == "save") {
                                printsum.totaldata("specimens").success(function(labelcalculate) {
                                    $scope.totallabelcollection = labelcalculate[0].totallabel;
                                    $scope.papersizecollection = labelcalculate[0].totalpapersize;
                                });
                                $scope.loadData('specimens');
                            }
                            dataarr = [];
                            table.rows('.selected').deselect();
                            table.draw();
                        } else {
                            alert("unexpected error occured, Please check your database connection");
                        }*/
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
    var dataarr = [];
    $.fn.dataTable.ext.buttons.inseprespec = {
        className: 'buttons-alert',
        action: function(e, dt, node, config) {
            $scope.InsPreSpec('ADD', 'inspre_specimens')
        }
    };
    $.fn.dataTable.ext.buttons.deleprespec = {
        className: 'buttons-alert',
        action: function(e, dt, node, config) {
            $scope.InsPreSpec('DELETE', 'inspre_specimens')
        }
    };
    var table = $('#preInsSpecTbl').DataTable({
        "processing": true,
        "serverSide": true,
        "ajax": {
            "url": "assets/scripts/server_processing_preins.php",
            "type": "POST"
        },
        "rowCallback": function(row, data) {
            if ($.inArray(data.DT_RowId, dataarr) !== -1) {
                $(row).addClass('selected');
            }
        },
        "createdRow": function(row, data, index) {
            if (data[4] == 'Unknown') {
                $(row).addClass('highlight');
            }
        },
        "dom": '<"top"B<"text-right"l>>rt<"bottom"ip><"clear">',
        "scrollX": true,
        "scrollY": "500px",
        "scrollCollapse": true,
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
            "width": "25%"
        }, {
            "data": "1",
            "width": "15%"
        }, {
            "data": "2",
            "width": "25%"
        }, {
            "data": "3",
            "width": "20%"
        }],
        buttons: [{
            extend: 'inseprespec',
            text: 'Add to Specimens List',
            enabled: true
        }, {
            extend: 'deleprespec',
            text: 'Delete',
            enabled: true
        }],
        "columnDefs": [{
            render: function(data, type, full, meta) {
                return '<a class="faedit btn btn-transparent btn-xs"' + '>' + '<i class="' + 'fa fa-edit' + '"></i>' + '</a>' + '<a ' + 'class="faqty btn-transparent btn-xs"' + '>' + '<i class="' + 'fa fa-truck' + '"></i>' + '</a>';
            },
            targets: 5,
            "width": "10%",
            "orderable": false
        }],
        order: [
            [1, 'asc']
        ]
    });

    function format(d) {
        return '<form><table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">' + '<tr>' + '<td>' + d['3'] + '</td>' + '</tr>' + '<tr>' + '<td>' + d['0'] + '</td>' + '</tr>' + '<tr>' + '<td>' + d['2'] + '</td>' + '</tr>' + '</table></form>';
    }

    function modalpreins(a, b) {
        var data = $.param({
            tpreinsqty: a,
            tpreinsid: b
        });
        var config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
            }
        }
        $http({
            method: 'POST',
            url: 'assets/views/action/dbinsertPreinsspecQTY.php',
            data: data,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
        }).success(function(response) {
            table.draw();
            calculatedbData.getSUMspec("PreinsMonth").success(function(datamonthsummary) {
                $scope.ngmodelMothsum = datamonthsummary[0].totalmonth;
            });
        });
    }
    $("#preInsSpecTbl tbody").on("click", "a.faqty", function(event) {
        $scope.open = function(size) {
            var modalInstance = $uibModal.open({
                templateUrl: "assets/views/ModalSpecimensQTY.html",
                controller: function($scope, $uibModalInstance) {
                    $scope.modalTitle = "Specimens QTY";
                    $scope.modalContent = b;
                    $scope.numberofitem = forpreinsqty;
                    $scope.forpreinsid = forpreinsid;
                    $scope.Labelinsert = function() {
                        $scope.editmode = 'Exedit';
                        var a = $scope.numberofitem;
                        var b = $scope.forpreinsid;
                        console.log(a);
                        console.log(b);
                        modalpreins(a, b);
                        $uibModalInstance.close();
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
            }, function() {
                $log.info("Modal dismissed at: " + new Date)
            })
        }
        $scope.open('sm');
        var data = table.row($(this).parents('tr')).data();
        var b = format(data);
        var forpreinsqty = data[1];
        var forpreinsid = data.DT_RowId;
    });
    var today = new Date();
    $scope.formatDate = function(today) {
        var dd = today.getDate();
        var mm = today.getMonth() + 1;
        var yyyy = today.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }
        today = yyyy + '/' + mm + '/' + dd;
        return today
    }
    $("#preInsSpecTbl tbody").on("click", "a.faedit", function(event) {
        var data = table.row($(this).parents('tr')).data();
        var preinsid = data.DT_RowId;
        var a = preinsid;
        var data = $.param({
            tpreinsid: a
        });
        $http({
            method: 'POST',
            data: data,
            url: "assets/views/action/returnPreinsSpecDetails.php",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
        }).success(function(response) {
            $scope.ReturnPreinsspec = response;
            $scope.editmode = 'Exedit';
            var preinsdate = new Date($scope.ReturnPreinsspec[0].preins_date);
            var x = $scope.formatDate(preinsdate);
            $scope.preinsspec.preinsdate = x;
            $scope.preinsspec.preinscode = $scope.ReturnPreinsspec[0].preinscode;
            $scope.preinsspec.preinsyear = $scope.ReturnPreinsspec[0].preinsyear;
            $scope.preinsspec.preinsnumber = $scope.ReturnPreinsspec[0].preinsnumber;
            $scope.preinsspec.preinsqty = $scope.ReturnPreinsspec[0].preins_spec_qty;
            $scope.preinsspec.preinsstaffid = $scope.ReturnPreinsspec[0].preins_staff_id;
            $scope.preinsspec.preinsid = $scope.ReturnPreinsspec[0].preinsid;
            /*
            $scope.Specdetails = response;
            $scope.Ins_mode = $scope.Specdetails[0].Ins_mode;
            if ($scope.Ins_mode === 'ADD') {
                if ($scope.savetype == 1) {
                    $scope.resetspecform();
                }
                if ($scope.savetype == 0) {
                    $scope.resetspecSimilar();
                };
            }
            if ($scope.Ins_mode === 'UPDATE') {
                if ($scope.savetype == 1) {
                    $scope.UPDATEresetspecform();
                }
                if ($scope.savetype == 0) {
                    $scope.UPDATEresetspecSimilar();
                }
            }*/
            table.draw();
        });
        /*
             $.ajax({
                          type: "POST",
                          url: "assets/views/action/trashCollTable.php",
                          data:{"idtable":collectionid},
                          dataType: "text",
                          success: function(data){
                              var asd = document.getElementById("msg");
                              if (data.indexOf("ERROR::")==-1)
                                  {
                                     $('div#msg').removeClass().addClass('success');
                                      
                                      table.draw();
                                  }
                                  else
                                  {
                                      $('div#msg').removeClass().addClass('failure');
                                      asd.innerHTML="The User Id(s) you have entered<br/> cannot be Deleted!!</br> "+data;
                                      //alert("The User Id(s) you have entered cannot be Deleted!! <br/> "+data);
                                      table.draw(false);
                                  }
                              },
                          error: function (xhr, ajaxOptions, thrownError){
                                  alert(xhr.status);
                                  alert(thrownError);
                                  table.draw();
                              }
              });
            */
    });

    function filterColumnspec(i) {
        if (i == 8) {
            var ii = getIfNotSet(Number($('#col' + i + '_filter').val()), '', true);
        } else {
            var ii = $('#col' + i + '_filter').val();
        }
        console.log(ii);
        $('#preInsSpecTbl').DataTable().column(i).search(ii).draw();
    }
    $('input.column_filterspec').on('keyup', function() {
        filterColumnspec($(this).parents('DIV').attr('data-column'));
        /* filterColumnspec($(this).parents('tr').attr('data-column'));*/
    });
    $('#preInsSpecTbl td').css('white-space', 'initial');
    $('.material-datatables label').addClass('form-group');
    $('#preInsSpecTbl tbody').on('click', '.select-checkbox', function() {
        var tr = $(this).closest('tr');
        var data = table.row($(this).closest('tr')).data();
        var id = data.DT_RowId;
        var index = $.inArray(id, dataarr);
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
        /** SELECT MULTI RECORD **/
        if (index === -1) {
            dataarr.push(id);
        } else {
            dataarr.splice(index, 1);
        }
        if ($(tr).hasClass('selected')) {
            $(tr).removeClass('selected');
            table.rows($(this).closest('tr')).deselect();
        } else {
            /* Only One Record 
            table.$('tr.selected').removeClass('selected');
            */
            $(tr).addClass('selected');
        }
        /** SELECT ONE RECORD 
        if (index === -1) {
            dataarr.splice(index, 1);
            dataarr.push(id);
        } else {
            dataarr.splice(index, 1);
        }
        **/
        /*
        if ($(tr).hasClass('selected')) {
            $(tr).removeClass('selected');
            $http({
                method: 'POST',
                url: "assets/views/action/returnSpecimensNo.php",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
            }).success(function(response) {
                $scope.Specdetails = response;
                $scope.resetspecform();
            });
        } else {
            table.$('tr.selected').removeClass('selected');
            $(tr).addClass('selected');
            $http({
                method: 'POST',
                url: "assets/views/action/returnTableSpecDetails.php",
                data: data,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
            }).success(function(response) {
                $scope.ModelPinor = {};
                $scope.ModelLabelor = {};
                $scope.ModelIdentification = {};
                $scope.Specdetails = response;
                $scope.specdata.coll_code = $scope.Specdetails[0].coll_code;
                $scope.specdata.coll_year = $scope.Specdetails[0].coll_year;
                $scope.specdata.coll_number = $scope.Specdetails[0].coll_number;
                $scope.specdata.specimens_number = $scope.Specdetails[0].specimens_number;
                $scope.specModelOrder = $scope.Specdetails[0].torder_name;
                $scope.specModelFamily = $scope.Specdetails[0].family_name;
                $scope.specModelGenus = $scope.Specdetails[0].genus_name;
                $scope.specModelSpecies = {
                    species_id: $scope.Specdetails[0].species_id,
                    species_name: $scope.Specdetails[0].species_name
                };
                $scope.ModelPinor = {
                    pinor_id: $scope.Specdetails[0].pinor_id,
                    p_firstname: $scope.Specdetails[0].p_firstname
                };
                $scope.ModelLabelor = {
                    labelor_id: $scope.Specdetails[0].labelor_id,
                    l_firstname: $scope.Specdetails[0].l_firstname
                };
                $scope.ModelIdentification = {
                    identification_id: $scope.Specdetails[0].identification_id,
                    i_firstname: $scope.Specdetails[0].i_firstname
                };
                $scope.specdata.specimensid = $scope.Specdetails[0].specimens_id;
                $scope.typespecimen = $scope.Specdetails[0].taxatype_taxatype_id;
            });
        }*/
    });
    $scope.saveasunknown = function(form) {
        var a = getIfNotSet($scope.specdata.specimensid, 0, true);
        var b = getIfNotSet($scope.specModelSpecies.species_id, 0, true);
        var c = getIfNotSet($scope.specdata.collectionid, 0, true);
        $scope.specdata.collectionid
        var d = getIfNotSet($scope.specdata.specimens_number, '0', true);
        var e = $scope.typespecimen;
        var f = $("#col6_filter").val();
        var g = $("#col7_filter").val();
        var h = $("#col8_filter").val();
        var j = getIfNotSet($scope.numberOFrecord, '1', true);
        var k = getIfNotSet($scope.ModelPinor.pinor_id, 0, true);;
        var l = getIfNotSet($scope.ModelLabelor.labelor_id, 0, true);
        var m = getIfNotSet($scope.ModelIdentification.identification_id, 0, true);
        var data = $.param({
            tspecimens_id: a,
            tspecies_id: b,
            tcoll_id: c,
            tspecimens_number: d,
            ttaxatype: e,
            tcoll_code: f,
            tcoll_year: g,
            tcoll_number: h,
            tnumber_of_record: j,
            tpinor_id: k,
            tlabelor_id: l,
            tidentification_id: m
        });
        var previousWindowKeyDown = window.onkeydown;
        $scope.toTheTop();
        SweetAlert.swal({
            title: "Are you sure?",
            text: "Your collection data will be recorded in database!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, save it!",
            cancelButtonText: "No, cancel plx!",
            closeOnConfirm: false,
            closeOnCancel: false
        }, function(isConfirm) {
            if (isConfirm) {
                SweetAlert.swal({
                    title: "SAVED!",
                    text: "Your imaginary data has been saved.",
                    type: "success",
                    confirmButtonColor: "#007AFF"
                }, function(isConfirm) {
                    $http({
                        method: 'POST',
                        data: data,
                        url: "assets/views/action/dbinsertSpecimens.php",
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        },
                    }).success(function(response) {
                        $scope.Specdetails = response;
                        $scope.Ins_mode = $scope.Specdetails[0].Ins_mode;
                        if ($scope.Ins_mode === 'ADD') {
                            if ($scope.savetype == 1) {
                                $scope.resetspecform();
                            }
                            if ($scope.savetype == 0) {
                                $scope.resetspecSimilar();
                            };
                        }
                        if ($scope.Ins_mode === 'UPDATE') {
                            if ($scope.savetype == 1) {
                                $scope.UPDATEresetspecform();
                            }
                            if ($scope.savetype == 0) {
                                $scope.UPDATEresetspecSimilar();
                            }
                        }
                        table.draw();
                    });
                });
            } else {
                SweetAlert.swal({
                    title: "Cancelled",
                    text: "Your data is cancelled :)",
                    type: "error",
                    confirmButtonColor: "#007AFF"
                });
            }
        });
    }
    $scope.specimensIns = function(form) {
        var a = getIfNotSet($scope.specdata.specimensid, 0, true);
        var b = getIfNotSet($scope.specModelSpecies.species_id, 0, true);
        var c = getIfNotSet($scope.specdata.collectionid, 0, true);
        $scope.specdata.collectionid
        var d = getIfNotSet($scope.specdata.specimens_number, '0', true);
        var e = $scope.typespecimen;
        var f = $("#col6_filter").val();
        var g = $("#col7_filter").val();
        var h = $("#col8_filter").val();
        var j = getIfNotSet($scope.numberOFrecord, '1', true);
        var k = getIfNotSet($scope.ModelPinor.pinor_id, 0, true);;
        var l = getIfNotSet($scope.ModelLabelor.labelor_id, 0, true);
        var m = getIfNotSet($scope.ModelIdentification.identification_id, 0, true);
        var data = $.param({
            tspecimens_id: a,
            tspecies_id: b,
            tcoll_id: c,
            tspecimens_number: d,
            ttaxatype: e,
            tcoll_code: f,
            tcoll_year: g,
            tcoll_number: h,
            tnumber_of_record: j,
            tpinor_id: k,
            tlabelor_id: l,
            tidentification_id: m
        });
        var previousWindowKeyDown = window.onkeydown;
        $scope.toTheTop();
        if (form.$valid) {
            SweetAlert.swal({
                title: "Are you sure?",
                text: "Your collection data will be recorded in database!",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes, save it!",
                cancelButtonText: "No, cancel plx!",
                closeOnConfirm: false,
                closeOnCancel: false
            }, function(isConfirm) {
                if (isConfirm) {
                    SweetAlert.swal({
                        title: "SAVED!",
                        text: "Your imaginary data has been saved.",
                        type: "success",
                        confirmButtonColor: "#007AFF"
                    }, function(isConfirm) {
                        $http({
                            method: 'POST',
                            data: data,
                            url: "assets/views/action/dbinsertSpecimens.php",
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            },
                        }).success(function(response) {
                            $scope.Specdetails = response;
                            $scope.Ins_mode = $scope.Specdetails[0].Ins_mode;
                            if ($scope.Ins_mode === 'ADD') {
                                if ($scope.savetype == 1) {
                                    $scope.resetspecform();
                                }
                                if ($scope.savetype == 0) {
                                    $scope.resetspecSimilar();
                                };
                            }
                            if ($scope.Ins_mode === 'UPDATE') {
                                if ($scope.savetype == 1) {
                                    $scope.UPDATEresetspecform();
                                }
                                if ($scope.savetype == 0) {
                                    $scope.UPDATEresetspecSimilar();
                                }
                            }
                            table.draw();
                        });
                    });
                } else {
                    SweetAlert.swal({
                        title: "Cancelled",
                        text: "Your data is cancelled :)",
                        type: "error",
                        confirmButtonColor: "#007AFF"
                    });
                }
            });
        } else {
            var field = null,
                firstError = null;
            for (field in form) {
                if (field[0] != '$') {
                    if (firstError === null && !form[field].$valid) {
                        firstError = form[field].$name;
                    }
                    if (form[field].$pristine) {
                        form[field].$dirty = true;
                    }
                }
            }
            angular.element('.ng-invalid[name=' + firstError + ']').focus();
            errorMessage();
        }
    }
    $scope.specSEARCH = function() {
        $http({
            method: 'POST',
            url: "assets/views/action/returnSpecimensNotest.php",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
        }).success(function(response) {
            $scope.test = {};
            $scope.Specdetails = response;
            $scope.test = {
                specimens_number: $scope.Specdetails[0].specimens_number
            };
        });
        /*
        $.ajax({
            url: "assets/views/action/returnSpecimensNotest.php",
            type: "POST"
        }).success(function(result) {
            var obj = jQuery.parseJSON(result);
            if (obj == '') {
                alter
                $('input[type=text]').val('');
            } else {
                $.each(obj, function(key, inval) {
                    $scope.test = {};
                    $scope.test = inval["specimens_number"];
                   
                    $('#col6_filter').val(inval["coll_code"]);
                    $('#col7_filter').val(inval["coll_year"]);
                    $('#col8_filter').val(inval["coll_number"]);
                });
            }
        })*/
    };
    $scope.specModelOrder = '';
    $scope.specModelFamily = '';
    $scope.specModelGenus = '';
    $scope.specModelSpecies = '';
    $scope.onSelect = function($item, $model, $label) {}
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
    $scope.ModelPinor = '';
    $scope.ModelLabelor = '';
    $scope.ModelIdentification = '';
    $scope.PinorKeyup = function(viewValue) {
        return $http.get('./assets/views/action/ReturnSpecific.php?sPinor=' + viewValue).then(function(res) {
            return res.data;
        });
    }
    $scope.LabelorKeyup = function(viewValue) {
        return $http.get('./assets/views/action/ReturnSpecific.php?sLabelor=' + viewValue).then(function(res) {
            return res.data;
        });
    }
    $scope.IdentificationKeyup = function(viewValue) {
        return $http.get('./assets/views/action/ReturnSpecific.php?sIdentification=' + viewValue).then(function(res) {
            return res.data;
        });
    }
    $scope.resetPreinsSpecimensCtrl = function() {
        $scope.preinsspec.preinsyear = '';
        $scope.preinsspec.preinsnumber = '';
        $scope.preinsspec.preinsqty = '';
    }
    $scope.resetspecSimilar = function() {
        $scope.specdata.coll_code = $scope.Specdetails[0].coll_code;
        $scope.specdata.coll_year = $scope.Specdetails[0].coll_year;
        $scope.specdata.coll_number = $scope.Specdetails[0].coll_number;
        $scope.specdata.specimens_number = $scope.Specdetails[0].specimens_number;
        $scope.specdata.specimensid = 0;
        $scope.numberOFrecord = 1;
    }
    $scope.UPDATEresetspecform = function() {
        if (dataarr.length !== 0) {
            var data = table.rows('.selected').data();
            var id = data[0].DT_RowId;
            table.rows('.selected').deselect();
            var index = $.inArray(id, dataarr);
            if (index !== -1) {
                dataarr.splice(index, 1);
            }
        }
        $scope.Specimens_Form.$setPristine();
        $scope.Specimens_Form.$setUntouched();
        $scope.ModelPinor = '';
        $scope.ModelLabelor = '';
        $scope.ModelIdentification = '';
        $scope.specModelOrder = '';
        $scope.specModelFamily = '';
        $scope.specModelGenus = '';
        $scope.specModelSpecies = '';
        $scope.typespecimen = 0;
        $scope.specdata.coll_code = $scope.Specdetails[0].coll_code;
        $scope.specdata.coll_year = $scope.Specdetails[0].coll_year;
        $scope.specdata.coll_number = $scope.Specdetails[0].coll_number;
        $scope.specdata.specimens_number = $scope.Specdetails[0].specimens_number;
        $scope.specdata.specimensid = 0;
        $scope.numberOFrecord = 1;
    }
    $scope.UPDATEresetspecSimilar = function() {
        if (dataarr.length !== 0) {
            var data = table.rows('.selected').data();
            var id = data[0].DT_RowId;
            table.rows('.selected').deselect();
            var index = $.inArray(id, dataarr);
            if (index !== -1) {
                dataarr.splice(index, 1);
            }
        }
        $scope.specdata.coll_code = $scope.Specdetails[0].coll_code;
        $scope.specdata.coll_year = $scope.Specdetails[0].coll_year;
        $scope.specdata.coll_number = $scope.Specdetails[0].coll_number;
        $scope.specdata.specimens_number = $scope.Specdetails[0].specimens_number;
        $scope.specdata.specimensid = 0;
        $scope.numberOFrecord = 1;
    }
    $scope.resetAllfieldBtn = function() {
        SweetAlert.swal({
            title: "Are you sure to RESET all field?",
            text: "Your data will be reset!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, reset it!",
            cancelButtonText: "No, cancel plx!",
            closeOnConfirm: false,
            closeOnCancel: false
        }, function(isConfirm) {
            if (isConfirm) {
                SweetAlert.swal({
                    title: "Reset all filed!",
                    text: "Your data has been reset.",
                    type: "success",
                    confirmButtonColor: "#007AFF"
                }, function(isConfirm) {
                    if (dataarr.length !== 0) {
                        var data = table.rows('.selected').data();
                        var id = data[0].DT_RowId;
                        table.rows('.selected').deselect();
                        var index = $.inArray(id, dataarr);
                        if (index !== -1) {
                            dataarr.splice(index, 1);
                        }
                    }
                    $http({
                        method: 'POST',
                        url: "assets/views/action/returnSpecimensNo.php",
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        },
                    }).success(function(response) {
                        $scope.Specno = response;
                        $scope.Specimens_Form.$setPristine();
                        $scope.Specimens_Form.$setUntouched();
                        $scope.ModelPinor = '';
                        $scope.ModelLabelor = '';
                        $scope.ModelIdentification = '';
                        $scope.specModelOrder = '';
                        $scope.specModelFamily = '';
                        $scope.specModelGenus = '';
                        $scope.specModelSpecies = '';
                        $scope.typespecimen = 0;
                        $scope.specdata.coll_code = $scope.Specno[0].coll_code;
                        $scope.specdata.coll_year = $scope.Specno[0].coll_year;
                        $scope.specdata.coll_number = $scope.Specno[0].coll_number;
                        $scope.specdata.specimens_number = $scope.Specno[0].specimens_number;
                        $scope.specdata.specimensid = 0;
                        $scope.numberOFrecord = 1;
                    });
                });
            } else {
                SweetAlert.swal({
                    title: "Cancelled",
                    text: "Your data is not reset :)",
                    type: "error",
                    confirmButtonColor: "#007AFF"
                });
            }
        });
    }
    $scope.resetspecformBtn = function() {
        SweetAlert.swal({
            title: "Are you sure to RESET all field?",
            text: "Your data will be reset!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, reset it!",
            cancelButtonText: "No, cancel plx!",
            closeOnConfirm: false,
            closeOnCancel: false
        }, function(isConfirm) {
            if (isConfirm) {
                SweetAlert.swal({
                    title: "Reset all filed!",
                    text: "Your data has been reset.",
                    type: "success",
                    confirmButtonColor: "#007AFF"
                }, function(isConfirm) {
                    $http({
                        method: 'POST',
                        url: "assets/views/action/returnSpecimensNo.php",
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        },
                    }).success(function(response) {
                        $scope.Specimens_Form.$setPristine();
                        $scope.Specimens_Form.$setUntouched();
                        $scope.ModelPinor = '';
                        $scope.ModelLabelor = '';
                        $scope.ModelIdentification = '';
                        $scope.specModelOrder = '';
                        $scope.specModelFamily = '';
                        $scope.specModelGenus = '';
                        $scope.specModelSpecies = '';
                        $scope.typespecimen = 0;
                        $scope.specdata.specimensid = 0;
                        $scope.numberOFrecord = 1;
                    });
                });
            } else {
                SweetAlert.swal({
                    title: "Cancelled",
                    text: "Your data is not reset :)",
                    type: "error",
                    confirmButtonColor: "#007AFF"
                });
            }
        });
    }
    $scope.check = function() {
        var a = getIfNotSet(0, 0, true);
        console.log(a);
    }
    $scope.reset = function() {
        var data = table.rows('.selected').data();
        var id = data[0].DT_RowId;
        table.rows('.selected').deselect();
        var index = $.inArray(id, dataarr);
        if (index !== -1) {
            dataarr.splice(index, 1);
        }
    }
    $scope.checkalert = function() {
        SweetAlert.swal({
            title: "Are you sure?",
            text: "Your will not be able to recover this imaginary file!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel plx!",
            closeOnConfirm: false,
            closeOnCancel: false
        }, function(isConfirm) {
            if (isConfirm) {
                SweetAlert.swal({
                    title: "Deleted!",
                    text: "Your imaginary file has been deleted.",
                    type: "success",
                    confirmButtonColor: "#007AFF"
                });
            } else {
                SweetAlert.swal({
                    title: "Cancelled",
                    text: "Your imaginary file is safe :)",
                    type: "error",
                    confirmButtonColor: "#007AFF"
                });
            }
        });
    };
    var newdate = $scope.formatDate(today);
    $scope.preinsspec = {};
    $scope.preinsspec.preinsstaffid = getIfNotSet(String($scope.uid), '0', true);
    $scope.preinsspec.preinscode = '1';
    $scope.preinsspec.preinsdate = newdate;
    $scope.resetcollectordetails = function() {
        $scope.preinsspec = {};
        $scope.preinsspec.collectorfirstEN = "";
        $scope.preinsspec.collectorlastEN = "";
        $scope.preinsspec.collectorfirstTH = "";
        $scope.preinsspec.collectorlastTH = "";
    }
    /** DATE PICKER **/
    $('#txtpreinsdate').datepicker({
        format: "yyyy/mm/dd",
        todayHighlight: true,
        autoclose: true
    });
    $("#txtpreinsdate").datepicker("setDate", new Date());
}])