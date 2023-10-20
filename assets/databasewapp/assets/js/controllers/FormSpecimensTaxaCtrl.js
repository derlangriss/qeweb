'use strict';
/**  
 * controllers for GoogleMap  
 * AngularJS Directive  
 */
app.controller("FormSpecimensTaxaCtrl", ["$scope", "$http", "$timeout", "$stateParams", "SweetAlert", "info", "ngNotify", "$aside",
    function($scope, $http, $timeout, $stateParams, SweetAlert, info, ngNotify, $aside) {
        var previousWindowKeyDown = window.onkeydown;
        $scope.specdata = {};
        $scope.savetype = 1;
        $scope.typespecimen = 0;
        $scope.numberOFrecord = 1;
        $scope.currentStep = 1;

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
        $scope.openAside = function(position) {
            $aside.open({
                templateUrl: 'asideContent.html',
                placement: position,
                size: 'sm',
                backdrop: true,
                controller: function($scope, $uibModalInstance) {
                    $scope.ok = function(e) {
                        $uibModalInstance.close();
                        e.stopPropagation();
                    };
                    $scope.cancel = function(e) {
                        $uibModalInstance.dismiss();
                        e.stopPropagation();
                    };
                }
            });
        };
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
        $scope.GETcollectioncodelist = null;
        $scope.GETcollectioncode = [];
        $http({
            method: 'GET',
            url: 'assets/views/action/getcollectioncodelist.php'
        }).success(function(result) {
            $scope.GETcollectioncode = result;
        });
        info.specno($stateParams.specid).success(function(result) {
            if (result[0].view_mode === 2) {
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
                $scope.SpecimensTaxa_Form.$setPristine();
                $scope.SpecimensTaxa_Form.$setUntouched();
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
        $scope.EditSpecimens = function(action, form) {
            var data;
            var speicmensids = dataarr;
            var a = JSON.stringify(speicmensids);
            if (action == "DELETE") {
                data = $.param({
                    taction: action,
                    speicmensids: a
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
        $.fn.dataTable.ext.buttons.deletespec = {
            className: 'buttons-alert',
            action: function(e, dt, node, config) {
                $scope.EditSpecimens('DELETE', 'specimens_form')
            }
        };
        var dataarr = [];
        var table = $('#SpecimensListTbl').DataTable({
            "processing": true,
            "serverSide": true,
            "ajax": {
                "url": "assets/scripts/server_processing_specimennew.php",
                "type": "POST",
                "data": function(d) {
                    d.datatest = getIfNotSet($scope.specdata.coll_number, '0', true);
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
                [10, 30, 50, -1],
                ['10 rows', '30 rows', '50 rows', 'All']
            ],
            "buttons": [{
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
            }],
            "columnDefs": [{
                "visible": false,
                "targets": 6
            }, {
                "visible": false,
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
                render: function(data, type, full, meta) {
                    if (full[9] == true) {
                        return '<a href="' + "#/app/form/collection_data/" + full[9] + '"' + 'class="btn btn-transparent btn-xs"' + '>' + '<i class="' + 'fa fa-pencil' + '"></i>' + '</a>' + '<a ' + 'class="bookmark btn-transparent btn-xs"' + '>' + '<i class="' + 'fa fa-bookmark' + '"></i>' + '</a>';
                    } else {
                        return '<a href="' + "#/app/form/collection_data/" + full[9] + '"' + 'class="btn btn-transparent btn-xs"' + '>' + '<i class="' + 'fa fa-pencil' + '"></i>' + '</a>' + '<a ' + 'class="bookmark btn-transparent btn-xs"' + '>' + '<i class="' + 'fa fa-bookmark-o' + '"></i>' + '</a>';
                    }
                },
                "targets": 12,
                "width": "6%",
                "orderable": false
            }],
            "order": [
                [1, 'asc']
            ]
        });
        $("#SpecimensListTbl tbody").on("click", "a.bookmark", function(event) {
            var data = table.row($(this).parents('tr')).data();
            var specimensid = data.DT_RowId;
            var authenid = specimensid.substring(4);
            /**
            e_userid = uid 3 name wichai 
            authen_catagory = catagory_id 1 SPECIMENS 
            **/
            var a = 3;
            var b = authenid;
            var c = 1;
            var d = $scope.uid;
            var data = $.param({
                te_userid: a,
                tauthen_id: b,
                tauthen_catagory: c,
                te_senderid: d
            });
            $http({
                method: 'POST',
                data: data,
                url: "assets/views/action/dbinsertEvent.php",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
            }).success(function(response) {
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
            $('#SpecimensListTbl').DataTable().column(i).search(ii).draw();
        }
        $('input.column_filterspec').on('keyup', function() {
            filterColumnspec($(this).parents('DIV').attr('data-column'));
            /* filterColumnspec($(this).parents('tr').attr('data-column'));*/
        });
        $('#SpecimensListTbl td').css('white-space', 'initial');
        $('.material-datatables label').addClass('form-group');
        $('#SpecimensListTbl tbody').on('click', '.select-checkbox', function() {
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
        $scope.specimensUpdate = function(action, form) {
            var a = getIfNotSet($scope.specModelSpecies.species_id, 0, true);
            var b = dataarr;
            var c = JSON.stringify(b);
            var data = $.param({
                tspecimens_ids: c,
                species_id: a,
                action: action
            });
            $scope.toTheTop();
            if (form.$valid) {
                if (dataarr.length !== 0) {
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
                        window.onkeydown = previousWindowKeyDown;
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
                                    url: "assets/views/action/dbupdateSpecimens.php",
                                    headers: {
                                        'Content-Type': 'application/x-www-form-urlencoded'
                                    },
                                }).success(function(response) {
                                    $scope.SpecimensTaxa = response;
                                    $scope.Ins_mode = $scope.SpecimensTaxa[0].Ins_mode;
                                    $scope.success = $scope.SpecimensTaxa[0].success;
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
                                            $scope.UPDATEresetspecimensTaxa();
                                        }
                                        if ($scope.savetype == 0) {
                                            UPDATEresetspecimensTaxaSimilar();
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
                    SweetAlert.swal({
                        title: "ERROR",
                        text: "Please Select Collection number (กรุณาเลือกหมายเลขคอลเลคชัน)",
                        type: "error",
                        confirmButtonColor: "#007AFF"
                    });
                }
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
            $scope.SpecimensTaxa_Form.$setPristine();
            $scope.SpecimensTaxa_Form.$setUntouched();
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
        $scope.UPDATEresetspecimensTaxa = function() {
            dataarr = [];
            table.rows('.selected').deselect();
            table.draw();
            $scope.specModelOrder = '';
            $scope.specModelFamily = '';
            $scope.specModelGenus = '';
            $scope.specModelSpecies = '';
        }
        $scope.UPDATEresetspecimensDate = function() {
            dataarr = [];
            table.rows('.selected').deselect();
            table.draw();
        }
        $scope.UPDATEresetspecimensTaxaSimilar = function() {
            dataarr = [];
            table.rows('.selected').deselect();
            table.draw();
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
                            $scope.SpecimensTaxa_Form.$setPristine();
                            $scope.SpecimensTaxa_Form.$setUntouched();
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
                            $scope.SpecimensTaxa_Form.$setPristine();
                            $scope.SpecimensTaxa_Form.$setUntouched();
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
        /** DATE PICKER **/
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
        var newdate = $scope.formatDate(today);
        $scope.specDate = {};
        $scope.specDate.specdate = newdate;
        $('#txtspecdate').datepicker({
            format: "yyyy/mm/dd",
            todayHighlight: true,
            autoclose: true
        });
        $("#txtspecdate").datepicker("setDate", new Date());
        $scope.specimensdate = function(action, form) {
            var a = $scope.specDate.specdate;
            var b = dataarr;
            var c = JSON.stringify(b);
            var data = $.param({
                tspecimens_ids: c,
                spec_date: a,
                action: action
            });
            $scope.toTheTop();
            if (dataarr.length !== 0) {
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
                    window.onkeydown = previousWindowKeyDown;
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
                                url: "assets/views/action/dbupdateSpecDate.php",
                                headers: {
                                    'Content-Type': 'application/x-www-form-urlencoded'
                                },
                            }).success(function(response) {
                                $scope.SpecimensDate = response;
                                $scope.Ins_mode = $scope.SpecimensDate[0].Ins_mode;
                                $scope.success = $scope.SpecimensDate[0].success;
                                if ($scope.Ins_mode === 'ADD') {
                                    if ($scope.savetype == 1) {
                                        $scope.resetspecform();
                                    }
                                    if ($scope.savetype == 0) {
                                        $scope.resetspecSimilar();
                                    };
                                }
                                if ($scope.Ins_mode === 'UPDATE') {
                                    $scope.UPDATEresetspecimensDate();
                                }
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
        /*endctrl */
    }
]);