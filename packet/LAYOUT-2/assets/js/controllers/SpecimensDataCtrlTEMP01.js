'use strict';
/**  
 * controllers for GoogleMap  
 * AngularJS Directive 
 */
app.controller("SpecimenDataCtrl", ["$scope", "$http", "$timeout", "$stateParams", "SweetAlert", "info", "ngNotify", function($scope, $http, $timeout, $stateParams, SweetAlert, info, ngNotify) {
    $scope.specdata = {};
    $scope.savetype = 1;
    $scope.typespecimen = 0;
    $scope.numberOFrecord = 1;
    $scope.currentStep = 1;
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

    function filterColumnspec(i) {
        $('#SpecimensListTbl').DataTable().column(i).search($('#col' + i + '_filter').val(), $('#col' + i + '_regex').prop('checked'), $('#col' + i + '_smart').prop('checked')).draw();
    }
    info.specno($stateParams.specid).success(function(result) {
        function filterColumn(i) {
            $('#Coll_Specimenlist').DataTable().column(i).search($('#col' + i + '_filter').val()).draw();
        }
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
    });
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
    $scope.onChangedCollyear = function() {
        $http({
            method: 'GET',
            url: 'assets/views/action/returnAutoSpecNo.php',
            params: {
                sYear: $("#col7_filter").val()
            }
        }).success(function(response) {
            if (typeof response[0] != 'undefined') {
                $scope.coll_number = response[0].coll_number;
                $scope.specimens_number = response[0].specimens_number;
                $("#col8_filter").val($scope.coll_number);
                $("#txtspecimens_number").val($scope.specimens_number);
            }
        });
    }
    $scope.onChangedCollnumber = function() {
        $http({
            method: 'GET',
            url: 'assets/views/action/returnAutoSpecNo.php',
            params: {
                sYear: $("#col7_filter").val(),
                sNumber: $("#col8_filter").val()
            }
        }).success(function(response) {
            if (typeof response[0] != 'undefined') {
                $scope.specimens_number = response[0].specimens_number;
                $("#txtspecimens_number").val($scope.specimens_number)
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
    var dataarr = [];
    var table = $('#SpecimensListTbl').DataTable({
        "processing": true,
        "serverSide": true,
        "ajax": {
            "url": "assets/scripts/server_processing_specimennew.php",
            "type": "POST"
        },
        "rowCallback": function(row, data) {
            if ($.inArray(data.DT_RowId, dataarr) !== -1) {
                $(row).addClass('selected');
            }
        },
        "dom": '<"top"li><"clear">rtp',
        "scrollX": true,
        "scrollY": "300px",
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
            "width": "5%"
        }, {
            "data": "1",
            "width": "20%"
        }, {
            "data": "2",
            "width": "14%"
        }, {
            "data": "3",
            "width": "14%"
        }, {
            "data": "4",
            "width": "14%"
        }, {
            "data": "5",
            "width": "14%"
        }, {
            "data": "6",
            "width": "14%"
        }, {
            "data": "7",
            "width": "14%"
        }, {
            "data": "8",
            "width": "14%"
        }, {
            "data": "9",
            "width": "17%"
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
            targets: 10
        }],
        order: [
            [1, 'asc']
        ]
    });
    $('#SpecimensListTbl td').css('white-space', 'initial');
    $('.material-datatables label').addClass('form-group');
    $('#SpecimensListTbl tbody').on('click', '.select-checkbox', function() {
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
        if (index === -1) {
            dataarr.splice(index, 1);
            dataarr.push(id);
        } else {
            dataarr.splice(index, 1);
        }
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
        }
    });
    $scope.specimensIns = function(form) {
        var a = getIfNotSet($scope.specdata.specimensid, 0, true);
        var b = getIfNotSet($scope.specModelSpecies.species_id, 0, true);
        var c = getIfNotSet($scope.specdata.collectionid, 0, true);
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
                        title: "SAVE!",
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
    $scope.resetspecform = function() {
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
}])