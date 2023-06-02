'use strict';
/**  
 * controllers for GoogleMap  
 * AngularJS Directive  
 */
app.controller("FormSpecimensBoxCtrl", ["$scope", "$http", "$timeout", "$stateParams", "$state", "SweetAlert", "info", "ngNotify", "ServicePDF", "$aside",
    function($scope, $http, $timeout, $stateParams, $state, SweetAlert, info, ngNotify, ServicePDF, $aside) {
        $scope.LabelWaringModel = 'label-default'
        $scope.BoxShowDetailsUser = 'NA'
        $scope.FullBoxModel = 'fa-star-o'
        $scope.BoxShowDetailsCount = 0
        $scope.BoxShowDetailsBoxno = 'Non Selected'
        var previousWindowKeyDown = window.onkeydown;
        $scope.GetUserCurrentBox = function() {
            $http({
                method: 'GET',
                url: 'assets/views/action/GetUserCurrentBox.php',
                params: {
                    month: $stateParams.monthid,
                    year: $stateParams.yearid,
                    userid: $scope.uid
                }
            }).success(function(result) {
                if (result[0].success == 1) {
                    $scope.GETAllcollboxno = result[0].collboxno;
                    $scope.GETAllcountspecinbox = result[0].countspecinbox;
                    $scope.GETAllusername = result[0].nuser_name;
                    $scope.GETAllboxdate = result[0].checkuser_date;
                    /*$scope.BoxShowDetailsUser = result[0].user_name;   
                    $scope.BoxShowDetailsCount = result[0].countspecinbox;                 
                    $scope.BoxShowDetailsBoxid = result[0].collbox_id;
                    $scope.BoxShowModel = result[0].collboxno;
                    $scope.BoxShowDetailsLock = 'fa-lock';
                    $scope.LabelWaringModel = 'label-danger';*/
                    tableSpecimensBox.draw();
                }
            });
        }
        $scope.UPDATESPECDETAILS = function() {
            $http({
                method: 'GET',
                url: 'assets/views/action/GetUserCurrentBox.php',
                params: {
                    month: $stateParams.monthid,
                    year: $stateParams.yearid,
                    userid: $scope.uid
                }
            }).success(function(result) {
                if (result[0].success == 1) {
                    $scope.GETAllcollboxno = result[0].collboxno;
                    $scope.GETAllcountspecinbox = result[0].countspecinbox;
                    $scope.GETAllusername = result[0].nuser_name;
                    $scope.GETAllboxdate = result[0].checkuser_date;
                    /*$scope.BoxShowDetailsUser = result[0].user_name;   
                    $scope.BoxShowDetailsCount = result[0].countspecinbox;                 
                    $scope.BoxShowDetailsBoxid = result[0].collbox_id;
                    $scope.BoxShowModel = result[0].collboxno;
                    $scope.BoxShowDetailsLock = 'fa-lock';
                    $scope.LabelWaringModel = 'label-danger';*/
                    tableSpecimensBox.draw();
                }
            });
        }
        $scope.GetUserCurrentBox();
        $scope.BoxShowModel = "SelectBox"
        $scope.specdata = {};
        $scope.savetype = 1;
        $scope.typespecimen = 0;
        $scope.numberOFrecord = 1;
        $scope.currentStep = 1;
        $scope.BoxShowcountspecinboxModel = 0;
        $scope.datareportspec = [{
            head: 'January',
            content: 'has been approved An endorsement for',
            link: 'AngularJs',
            status: 'Approved',
            quantity: '650',
            order: '15',
            family: '10',
            genus: '1',
            species: '0'
        }, {
            head: 'February',
            content: 'has been approved An endorsement for',
            link: 'AngularJs',
            status: 'Approved',
            quantity: '650',
            order: '15',
            family: '10',
            genus: '1',
            species: '0'
        }, {
            head: 'March',
            content: 'has been approved An endorsement for',
            link: 'AngularJs',
            status: 'Approved',
            quantity: '650',
            order: '15',
            family: '10',
            genus: '1',
            species: '0'
        }, {
            head: 'May',
            content: 'has been approved An endorsement for',
            link: 'AngularJs',
            status: 'Approved',
            quantity: '650',
            order: '15',
            family: '10',
            genus: '1',
            species: '0'
        }, {
            head: 'June',
            content: 'has been approved An endorsement for',
            link: 'AngularJs',
            status: 'Approved',
            quantity: '650',
            order: '15',
            family: '10',
            genus: '1',
            species: '0'
        }, {
            head: 'July',
            content: 'has been approved An endorsement for',
            link: 'AngularJs',
            status: 'Approved',
            quantity: '650',
            order: '15',
            family: '10',
            genus: '1',
            species: '0'
        }, {
            head: 'August',
            content: 'has been approved An endorsement for',
            link: 'AngularJs',
            status: 'Approved',
            quantity: '650',
            order: '15',
            family: '10',
            genus: '1',
            species: '0'
        }, {
            head: 'September',
            content: 'has been approved An endorsement for',
            link: 'AngularJs',
            status: 'Approved',
            quantity: '650',
            order: '15',
            family: '10',
            genus: '1',
            species: '0'
        }, {
            head: 'October',
            content: 'has been approved An endorsement for',
            link: 'AngularJs',
            status: 'Approved',
            quantity: '650',
            order: '15',
            family: '10',
            genus: '1',
            species: '0'
        }, {
            head: 'November',
            content: 'I am from Dubai',
            link: 'Apple Watch',
            status: 'In Review',
            quantity: '400',
            order: '20',
            family: '17',
            genus: '3',
            species: '1'
        }, {
            head: 'December',
            content: 'I am from Dubai',
            link: 'Apple Watch',
            status: 'In Review',
            quantity: '400',
            order: '20',
            family: '17',
            genus: '3',
            species: '1'
        }];
        var monthshow = $stateParams.monthid;
        var yearshow = $stateParams.yearid;
        var monthdis = monthshow - 1;
        var datereport = new Date(yearshow, monthdis);
        $scope.formatDateReport = function(datereport) {
            var a = datereport.getMonth();
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
            var mm = month[a];
            var yyyy = datereport.getFullYear();
            if (mm < 10) {
                mm = '0' + mm;
            }
            datereport = mm + ' ' + yyyy;
            return datereport
        }
        var newdateReport = $scope.formatDateReport(datereport);
        $scope.monthshow01 = newdateReport;
        console.log(datereport);
        $scope.countSpecimens = function(m, y) {
            $http({
                method: 'GET',
                url: 'assets/views/action/countSpecimens.php',
                params: {
                    month: m,
                    year: y
                }
            }).success(function(response) {
                $scope.datereport = $scope.resspecimens = response[0].resspecimens
                $scope.allspecimens = response[0].allspecimens
            });
        }
        $scope.countSpecimens(monthshow, yearshow);

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
        $scope.tab = 1;
        $scope.setTab = function(newTab) {
            $scope.tab = newTab;
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
        $scope.GETcollectioncodelist = null;
        $scope.GETcollectioncode = [];
        $http({
            method: 'GET',
            url: 'assets/views/action/getcollectioncodelist.php'
        }).success(function(result) {
            $scope.GETcollectioncode = result;
        });
        $scope.GETBoxlist = null;
        $scope.GETBoxcode = [];
        $http({
            method: 'GET',
            url: 'assets/views/action/getboxcodelist.php'
        }).success(function(result) {
            $scope.GETBoxcode = result;
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
        $scope.onChangedCollnumber = function() {}
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
            if (action == "REMOVESPEC") {
                var speicmensidsfrombox = dataarrSpecbox;
                var abox = JSON.stringify(speicmensidsfrombox);
                data = $.param({
                    taction: action,
                    speicmensids: abox
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
                                    tableSpecimensBox.draw();
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
                if (typeof speicmensidsfromall !== 'undefined' && speicmensidsfromall.length > 0 && container_id !== '') {
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
                                    $scope.BoxShowDetailsCount = response[0].allcount;
                                    $scope.GETAllcountspecinbox = response[0].allcount;
                                    dataarr = [];
                                    table.draw();
                                    tableSpecimensBox.draw();
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
        }
        $.fn.dataTable.ext.buttons.deletespec = {
            className: 'buttons-alert',
            action: function(e, dt, node, config) {
                $scope.EditSpecimens('DELETE', 'specimens_form')
            }
        };
        $.fn.dataTable.ext.buttons.removespec = {
            className: 'buttons-alert',
            action: function(e, dt, node, config) {
                $scope.EditSpecimens('REMOVESPEC', 'specimens_form')
            }
        };
        $.fn.dataTable.ext.buttons.movetobox = {
            className: 'buttons-alert',
            action: function(e, dt, node, config) {
                $scope.EditSpecimens('MOVETOBOX', 'specimens_form')
            }
        };
        var dataarrSpecbox = [];
        var tableSpecimensBox = $('#SpecimensBoxListTbl').DataTable({
            "processing": true,
            "serverSide": true,
            "stateSave": true,
            "ajax": {
                "url": "assets/scripts/server_processing_sblist.php",
                "type": "POST",
                "stateSave": true,
                "data": function(d) {
                    d.treport_month = getIfNotSet($stateParams.monthid, '0', true);
                    d.treport_year = getIfNotSet($stateParams.yearid, '0', true);
                    d.tspecbox_id = getIfNotSet($scope.BoxShowDetailsBoxid, '0', true);
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
                if ($.inArray(rowidres, dataarrSpecbox) !== -1) {
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
            "buttons": [{
                extend: 'removespec',
                text: 'Remove From Box',
                enabled: true
            }, {
                text: 'Select all',
                action: function(row) {
                    tableSpecimensBox.rows().select();
                    $(row).addClass('selected');
                    var data = tableSpecimensBox.rows('.selected').select().data();
                    for (var i = 0; i < data.length; i++) {
                        var rowid = data[i]['DT_RowId'];
                        var rowidres = rowid.substring(4);
                        dataarrSpecbox.push(rowidres);
                    }
                    return dataarrSpecbox;
                },
                enabled: true
            }, {
                text: 'Select none',
                action: function() {
                    tableSpecimensBox.rows().deselect();
                    dataarrSpecbox = [];
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
                "visible": false,
                "targets": 11
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
        $scope.PrintSpecBox = function(sreporttype) {
            /*
            var datenow = new Date();
            var name = "SpecimensBox";
            var getyear = datenow.getFullYear();
            var getdate = datenow.getDate();
            var getmonth = monthstr();
            var gethours = datenow.getHours();
            var getsecond = datenow.getSeconds();
            var getMilliseconds = datenow.getMilliseconds();
            var filename = name.concat('SpecimensBox', getyear, getmonth, getdate, gethours, getsecond, getMilliseconds);
            */
            if (sreporttype == 'SpecList') {
                var monthreport = $stateParams.monthid;
                var yeareport = $stateParams.yearid;
                var specboxid = $scope.BoxShowDetailsBoxid;
                var specboxno = $scope.BoxShowDetailsBoxno;
                var specmonth = $scope.monthshow01;
                var filename = name.concat('SpecimensBox', specmonth, specboxno);
                var value = 0;
                var containertype = 1;
                var fileName = filename + ".pdf";
                var a = document.createElement("a");
                document.body.appendChild(a);
                $timeout(function() {
                    ServicePDF.downloadSpecBox(sreporttype, monthreport, yeareport, containertype, specboxid).then(function(result) {
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
            if (sreporttype == 'SpecInBox') {
                var specboxid = getIfNotSet($scope.BoxShowDetailsBoxid, '', true);
                if (specboxid == '') {
                    alert('Plase Select Box');
                } else {
                    var monthreport = $stateParams.monthid;
                    var yeareport = $stateParams.yearid;
                    var specboxno = $scope.BoxShowDetailsBoxno;
                    var specmonth = $scope.monthshow01;
                    var filename = name.concat('SpecimensBox', specmonth, specboxno);
                    var value = 0;
                    var containertype = 1;
                    var fileName = filename + ".pdf";
                    var a = document.createElement("a");
                    document.body.appendChild(a);
                    $timeout(function() {
                        ServicePDF.downloadSpecBox(sreporttype, monthreport, yeareport, containertype, specboxid).then(function(result) {
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
            }
        }
        $('#SpecimensBoxListTbl tbody').on('click', '.select-checkbox', function() {
            var tr = $(this).closest('tr');
            var data = tableSpecimensBox.row($(this).closest('tr')).data();
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
                tableSpecimensBox.rows($(this).closest('tr')).deselect();
            } else {
                $(tr).addClass('selected');
            }
        });
        var dataarr = [];
        var table = $('#SpecimensReportListTbl').DataTable({
            "processing": true,
            "serverSide": true,
            "ajax": {
                "url": "assets/scripts/server_processing_svlist.php",
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
            "buttons": [{
                extend: 'movetobox',
                text: 'Move to the Box',
                enabled: true
            }, {
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
                "visible": false,
                "targets": 11
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
        $("#SpecimensReportListTbl tbody").on("click", "a.bookmark", function(event) {
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

        function filterColumnspec(i) {
            if (i == 8) {
                var ii = getIfNotSet(Number($('#col' + i + '_filter').val()), '', true);
            } else {
                var ii = $('#col' + i + '_filter').val();
            }
            $('#SpecimensReportListTbl').DataTable().column(i).search(ii).draw();
        }
        $('input.column_filterspec').on('keyup', function() {
            filterColumnspec($(this).parents('DIV').attr('data-column'));
            /* filterColumnspec($(this).parents('tr').attr('data-column'));*/
        });
        $('#SpecimensReportListTbl td').css('white-space', 'initial');
        $('.material-datatables label').addClass('form-group');
        $('#SpecimensReportListTbl tbody').on('click', '.select-checkbox', function() {
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
            var d = getIfNotSet($scope.BoxidShowModel, 0, true);
            var e = 1;
            /* e = 1 container_type is box 
               e = 2 container_type is cabinet 
            */
            var data = $.param({
                tspecimens_ids: c,
                species_id: a,
                container_id: d,
                container_type: e,
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
        $scope.GetBoxViewCurrentUser = '';
        $scope.GetBoxViewCurrentUserList = [];
        $scope.GetCurrentUseBox = function() {
            $http({
                method: 'GET',
                url: 'assets/views/action/GetViewCurrentUserList.php',
                params: {
                    userid: $scope.uid
                }
            }).success(function(result) {
                $scope.GetBoxViewCurrentUserList = result;
            });
        }
        $scope.GetCurrentUseBox();
        $scope.GetBoxView = '';
        $scope.GetBoxViewAvar = '';
        $scope.GetBoxViewAvarList = [];
        $http({
            method: 'GET',
            url: 'assets/views/action/getBoxViewlist.php',
            params: {
                month: monthshow,
                year: yearshow
            }
        }).success(function(result) {
            $scope.GetBoxViewAvarList = result;
        });
        $scope.ViewsAvartarFunction = function() {
            $scope.GetBoxViewAvarList = [];
            $http({
                method: 'GET',
                url: 'assets/views/action/getBoxViewlist.php',
                params: {
                    month: monthshow,
                    year: yearshow
                }
            }).success(function(result) {
                $scope.GetBoxViewAvarList = result;
            });
        }
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
        $scope.reportModel = {};
        $scope.ReportSearch = function() {
            var a = $scope.reportModel.month;
            var b = $scope.reportModel.year;
            if (a && b !== undefined) {
                $state.go('app.form.specimens_box.specview', {
                    "monthid": a,
                    "yearid": b
                })
            } else {
                alert("กรุณาเลือกเดือนและปีของการรายงาน");
            }
        }
        $scope.ReportSearchnew = function() {
            var a = $scope.reportModel.month;
            var b = $scope.reportModel.year;
            if (a && b !== undefined) {
                $state.go('app.form.managespecimens', {
                    "monthid": a,
                    "yearid": b
                })
            } else {
                alert("กรุณาเลือกเดือนและปีของการรายงาน");
            }
        }
        $scope.ReportReset = function() {
            $scope.reportModel.month = "0";
            $scope.reportModel.year = "0";
        }
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
        $scope.BoxstateSelection = function BoxstateSelection(event) {
            // how to check if checkbox is selected or not
            if (event.target.checked) {
                $http({
                    method: 'GET',
                    url: 'assets/views/action/UpdateBoxStatus.php',
                    params: {
                        boxid: $scope.BoxShowidModel,
                        boxstate: 2
                    }
                }).success(function(response) {
                    $scope.BoxShowModel = response[0].collboxno;
                    $scope.BoxidShowModel = response[0].collboxid;
                    $http({
                        method: 'GET',
                        url: 'assets/views/action/getboxcodelist.php'
                    }).success(function(result) {
                        $scope.GETBoxcode = result;
                    });
                    $http({
                        method: 'GET',
                        url: 'assets/views/action/getBoxViewlist.php'
                    }).success(function(result) {
                        $scope.GetBoxViewAvarList = result;
                    });
                });
            } else {
                $http({
                    method: 'GET',
                    url: 'assets/views/action/UpdateBoxStatus.php',
                    params: {
                        boxid: $scope.BoxShowidModel,
                        boxstate: 1
                    }
                }).success(function(response) {
                    $scope.BoxShowModel = response[0].collboxno;
                    $scope.BoxidShowModel = response[0].collboxid;
                    $http({
                        method: 'GET',
                        url: 'assets/views/action/getboxcodelist.php'
                    }).success(function(result) {
                        $scope.GETBoxcode = result;
                    });
                    $http({
                        method: 'GET',
                        url: 'assets/views/action/getBoxViewlist.php'
                    }).success(function(result) {
                        $scope.GetBoxViewAvarList = result;
                    });
                });
            }
        };
        $scope.fullbox = function fullbox(event) {
            if ($scope.BoxShowDetailsLock == 'fa-unlock-alt') {
                alert("Please Lock BOX first");
            } else {
                SweetAlert.swal({
                    title: "Are you sure?",
                    text: "This Box is FULL?",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Yes, It's Full!",
                    cancelButtonText: "No, cancel plx!",
                    closeOnConfirm: false,
                    closeOnCancel: false
                }, function(isConfirm) {
                    if (isConfirm) {
                        $http({
                            method: 'GET',
                            url: 'assets/views/action/UpdateBoxState.php',
                            params: {
                                boxid: $scope.BoxModel,
                                month: $stateParams.monthid,
                                year: $stateParams.yearid,
                                userid: $scope.uid
                            }
                        }).success(function(response) {
                            if (response[0].success == 1) {
                                SweetAlert.swal({
                                    title: "Success",
                                    text: "Your imaginary Box is FULL",
                                    type: "success",
                                    confirmButtonColor: "#007AFF"
                                });
                                $scope.FullBoxModel = 'fa-star'
                                $scope.GetUserCurrentBox();
                                $scope.ViewsAvartarFunction();
                            } else {
                                SweetAlert.swal({
                                    title: "Error",
                                    text: "Access is denied",
                                    type: "error",
                                    confirmButtonColor: "#007AFF"
                                });
                            }
                        });
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
        };
        $scope.takeover = function takeover(event) {
            SweetAlert.swal({
                title: "Are you sure?",
                text: "This is USED by " + $scope.BoxShowDetailsUser,
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes, TakeOverr!",
                cancelButtonText: "No, cancel plx!",
                closeOnConfirm: false,
                closeOnCancel: false
            }, function(isConfirm) {
                if (isConfirm) {
                    $http({
                        method: 'GET',
                        url: 'assets/views/action/UpdateBoxLockUserUsed.php',
                        params: {
                            boxid: $scope.BoxModel,
                            month: $stateParams.monthid,
                            year: $stateParams.yearid,
                            userid: $scope.uid
                        }
                    }).success(function(response) {
                        SweetAlert.swal({
                            title: "Cancelled",
                            text: "Your imaginary file is cancelled :)",
                            type: "success",
                            confirmButtonColor: "#007AFF"
                        });
                        $scope.BoxShowDetailsUser = response[0].username
                        $scope.GetUserCurrentBox();
                        $scope.TakeOverSignModel = ''
                    });
                } else {
                    SweetAlert.swal({
                        title: "Cancelled",
                        text: "Your imaginary file is cancelled :)",
                        type: "error",
                        confirmButtonColor: "#007AFF"
                    });
                }
            });
        };
        $scope.editboxstat = function(d) {
            $http({
                method: 'GET',
                url: 'assets/views/action/getUseBox.php',
                params: {
                    sBoxid: d,
                    sContainer_type: 1
                }
            }).success(function(result) {
                $scope.GETBoxDetails = result;
                $scope.BoxShowidModel = $scope.GETBoxDetails[0].collbox_id;
                $scope.BoxShowModel = $scope.GETBoxDetails[0].collboxno;
                $scope.BoxShowStateidModel = $scope.GETBoxDetails[0].boxstatus_id;
                $scope.BoxShowcountspecinboxModel = $scope.GETBoxDetails[0].countspecinbox;
                if ($scope.GETBoxDetails[0].boxlockstate_id == 1) {
                    $scope.BoxShowModelcheck = $scope.GETBoxDetails[0].boxlockstate_id;
                } else {
                    $scope.BoxShowModelcheck = "";
                }
                if ($scope.GETBoxDetails[0].boxstatus_id == 2) {
                    $scope.BoxStateModelcheck = $scope.GETBoxDetails[0].boxstatus_id;
                } else {
                    $scope.BoxStateModelcheck = "";
                }
                $http({
                    method: 'GET',
                    url: 'assets/views/action/getBoxViewlist.php'
                }).success(function(result) {
                    $scope.GetBoxViewAvarList = result;
                });
            });
        };
        $scope.test = function() {
            console.log($scope.BoxModel);
        };
        $scope.GETAllBoxcode = [];
        $http({
            method: 'GET',
            url: 'assets/views/action/getAllboxcodelist.php',
            params: {
                month: monthshow,
                year: yearshow,
                userid: $scope.uid
            }
        }).success(function(result) {
            $scope.GETAllBoxcode = result;
        });
        $scope.BoxShowDetailsLock = 'fa-unlock-alt'
        $scope.BoxlockSelection = function BoxlockSelection(event) {
            if ($scope.BoxShowDetailsLock == 'fa-unlock-alt') {
                if ($scope.BoxShowModel == 'SelectBox') {
                    alert("Please Select Box");
                } else {
                    $http({
                        method: 'GET',
                        url: 'assets/views/action/UpdateBoxLockUser.php',
                        params: {
                            boxid: $scope.BoxModel,
                            month: $stateParams.monthid,
                            year: $stateParams.yearid,
                            userid: $scope.uid
                        }
                    }).success(function(response) {
                        $scope.BoxShowDetailsLock = 'fa-lock'
                        $scope.LabelWaringModel = 'label-danger'
                        $scope.BoxShowDetailsUser = response[0].username
                        $scope.BoxShowDetailsBoxid = response[0].collbox_id
                        $scope.GetUserCurrentBox();
                        $scope.GetCurrentUseBox();
                        $scope.BoxShowDetailsBoxno = response[0].collboxno
                    });
                }
            } else {
                /*
                $scope.BoxShowDetailsLock = 'fa-unlock-alt'*/
            }
        };
        $scope.selectbox = function(d) {
            $http({
                method: 'GET',
                url: 'assets/views/action/getViewSelectedBox.php',
                params: {
                    sBoxid: d,
                    sMonth: $stateParams.monthid,
                    sYear: $stateParams.yearid,
                    sContainer_type: 1,
                    userid: $scope.uid
                }
            }).success(function(result) {
                if (result[0].boxlockstate == 2) {
                    if (result[0].compareUser == 1) {
                        $scope.TakeOverSignModel = 'fa-flag'
                    }
                    $scope.BoxShowDetailsLock = 'fa-unlock-alt'
                    $scope.LabelWaringModel = 'label-warning'
                    $scope.BoxShowDetailsUser = 'NA'
                    $scope.TakeOverSignModel = ''
                    $scope.BoxShowDetailsBoxid = 0;
                    $scope.BoxShowDetailsBoxno = ''
                } else {
                    if (result[0].compareUser == 1) {
                        if (result[0].username !== '') {
                            $scope.TakeOverSignModel = 'fa-retweet'
                        }
                    } else {
                        $scope.TakeOverSignModel = ''
                    }
                    $scope.BoxShowDetailsBoxid = result[0].collbox_id;
                    $scope.BoxShowDetailsBoxno = result[0].collboxno;
                    $scope.BoxShowDetailsLock = 'fa-lock'
                    $scope.LabelWaringModel = 'label-danger'
                    if (result[0].username == '') {
                        $scope.BoxShowDetailsUser = 'NA'
                    } else {
                        $scope.BoxShowDetailsUser = result[0].username;
                    }
                }
                if (result[0].boxstatus == 3) {
                    $scope.FullBoxModel = 'fa-star-half-o'
                } else if (result[0].boxstatus == 2) {
                    $scope.FullBoxModel = 'fa-star'
                } else {
                    $scope.FullBoxModel = 'fa-star-o'
                }
                $scope.BoxShowModel = result[0].collboxno;
                $scope.BoxShowDetailsCount = result[0].countspec;
                tableSpecimensBox.draw();
                /*
                     if (result[0].boxlockstate == 2) {
                         if (result[0].compareUser == 1) {
                             $scope.TakeOverSignModel = 'fa-flag'
                         }
                         $scope.BoxShowDetailsLock = 'fa-unlock-alt'
                         $scope.LabelWaringModel = 'label-warning'
                         $scope.BoxShowDetailsUser = 'NA'
                         $scope.TakeOverSignModel = ''
                     } else {
                         if (result[0].compareUser == 1) {
                             if (result[0].username !== '') {
                                 $scope.TakeOverSignModel = 'fa-retweet'
                             }
                         } else {
                             $scope.TakeOverSignModel = ''
                         }
                         $scope.BoxShowDetailsLock = 'fa-lock'
                         $scope.LabelWaringModel = 'label-danger'
                           tableSpecimensBox.draw();
                         if (result[0].username == '') {
                             $scope.BoxShowDetailsUser = 'NA'
                         } else {
                             $scope.BoxShowDetailsUser = result[0].username;
                         }
                     }
                  
                     if (result[0].boxstatus == 3) {
                         $scope.FullBoxModel = 'fa-star-half-o'
                     } else if (result[0].boxstatus == 2) {
                         $scope.FullBoxModel = 'fa-star'
                     } else {
                         $scope.FullBoxModel = 'fa-star-o'
                     }
                     $scope.BoxShowModel = result[0].collboxno;
                     $scope.BoxShowDetailsCount = result[0].countspec;
                     $scope.BoxShowDetailsBoxid = result[0].collbox_id;*/
            });
        };
        /*endctrl */
    }
]);
app.controller('ProductsCtrl', ["$scope",
    function($scope) {
        $scope.labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        $scope.series = ['Alpha', 'Omega', 'Kappa'];
        $scope.data = [
            [656, 594, 806, 817, 568, 557, 408, 843, 642, 1202, 1322, 847],
            [282, 484, 402, 194, 864, 275, 905, 1025, 123, 1455, 650, 1651],
            [768, 368, 253, 163, 437, 678, 1239, 1345, 1898, 1766, 1603, 2116]
        ];
        $scope.colors = [{
            fillColor: 'rgba(90,135,112,0.6)',
            strokeColor: 'rgba(90,135,112,1)',
            pointColor: 'rgba(90,135,112,1)'
        }, {
            fillColor: 'rgba(127,140,141,0.6)',
            strokeColor: 'rgba(127,140,141,1)',
            pointColor: 'rgba(127,140,141,1)'
        }, {
            fillColor: 'rgba(148,116,153,0.6)',
            strokeColor: 'rgba(148,116,153,1)',
            pointColor: 'rgba(148,116,153,1)'
        }];
        // Chart.js Options - complete list at http://www.chartjs.org/docs/
        $scope.options = {
            maintainAspectRatio: false,
            responsive: true,
            scaleFontFamily: "'Helvetica', 'Arial', sans-serif",
            scaleFontSize: 11,
            scaleFontColor: "#aaa",
            scaleShowGridLines: true,
            tooltipFontSize: 11,
            tooltipFontFamily: "'Helvetica', 'Arial', sans-serif",
            tooltipTitleFontFamily: "'Helvetica', 'Arial', sans-serif",
            tooltipTitleFontSize: 12,
            scaleGridLineColor: 'rgba(0,0,0,.05)',
            scaleGridLineWidth: 1,
            bezierCurve: true,
            bezierCurveTension: 0.4,
            scaleLineColor: 'transparent',
            scaleShowVerticalLines: false,
            pointDot: false,
            pointDotRadius: 2,
            pointDotStrokeWidth: 1,
            pointHitDetectionRadius: 20,
            datasetStroke: true,
            tooltipXPadding: 20,
            datasetStrokeWidth: 2,
            datasetFill: true,
            animationEasing: "easeInOutExpo"
        };
    }
]);
app.controller('SalesCtrl', ["$scope",
    function($scope) {
        $scope.labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
        $scope.series = ['First', 'Second'];
        $scope.data = [
            [65, 59, 80, 81, 56, 55, 40],
            [28, 48, 40, 19, 86, 27, 90]
        ];
        $scope.colors = [{
            fillColor: 'rgba(148,116,153,0.7)',
            highlightFill: 'rgba(148,116,153,1)'
        }, {
            fillColor: 'rgba(127,140,141,0.7)',
            highlightFill: 'rgba(127,140,141,1)'
        }];
        // Chart.js Options - complete list at http://www.chartjs.org/docs/
        $scope.options = {
            maintainAspectRatio: false,
            tooltipFontSize: 11,
            tooltipFontFamily: "'Helvetica', 'Arial', sans-serif",
            responsive: true,
            scaleFontFamily: "'Helvetica', 'Arial', sans-serif",
            scaleFontSize: 11,
            scaleFontColor: "#aaa",
            scaleBeginAtZero: true,
            tooltipTitleFontFamily: "'Helvetica', 'Arial', sans-serif",
            tooltipTitleFontSize: 12,
            scaleShowGridLines: true,
            scaleLineColor: 'transparent',
            scaleShowVerticalLines: false,
            scaleGridLineColor: "rgba(0,0,0,.05)",
            scaleGridLineWidth: 1,
            barShowStroke: false,
            barStrokeWidth: 2,
            barValueSpacing: 5,
            barDatasetSpacing: 1
        };
    }
]);
app.controller('AcquisitionCtrl', ["$scope",
    function($scope) {
        $scope.labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
        $scope.series = ['dataset'];
        $scope.data = [
            [65, 59, 80, 81, 56, 55, 40]
        ];
        $scope.colors = [{
            fillColor: 'rgba(148,116,153,0.7)',
            strokeColor: 'rgba(148,116,153,0)',
            highlightFill: 'rgba(148,116,153,1)',
            highlightStroke: 'rgba(148,116,153,1)'
        }];
        // Chart.js Options
        $scope.options = {
            maintainAspectRatio: false,
            showScale: false,
            barDatasetSpacing: 0,
            tooltipFontSize: 11,
            tooltipFontFamily: "'Helvetica', 'Arial', sans-serif",
            responsive: true,
            scaleBeginAtZero: true,
            scaleShowGridLines: false,
            scaleLineColor: 'transparent',
            barShowStroke: false,
            barValueSpacing: 5
        };
    }
]);
app.controller('ConversionsCtrl', ["$scope",
    function($scope) {
        $scope.labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        $scope.series = ['Transactions', 'Unique Visitors'];
        $scope.data = [
            [65, 59, 80, 81, 56, 55, 40, 84, 64, 120, 132, 87],
            [172, 175, 193, 194, 161, 175, 153, 190, 175, 231, 234, 250]
        ];
        $scope.colors = [{
            fillColor: 'rgba(91,155,209,0.5)',
            strokeColor: 'rgba(91,155,209,1)'
        }, {
            fillColor: 'rgba(91,155,209,0.5)',
            strokeColor: 'rgba(91,155,209,0.5)'
        }];
        // Chart.js Options - complete list at http://www.chartjs.org/docs/
        $scope.options = {
            maintainAspectRatio: false,
            showScale: false,
            scaleLineWidth: 0,
            responsive: true,
            scaleFontFamily: "'Helvetica', 'Arial', sans-serif",
            scaleFontSize: 11,
            scaleFontColor: "#aaa",
            scaleShowGridLines: true,
            tooltipFontSize: 11,
            tooltipFontFamily: "'Helvetica', 'Arial', sans-serif",
            tooltipTitleFontFamily: "'Helvetica', 'Arial', sans-serif",
            tooltipTitleFontSize: 12,
            scaleGridLineColor: 'rgba(0,0,0,.05)',
            scaleGridLineWidth: 1,
            bezierCurve: true,
            bezierCurveTension: 0.5,
            scaleLineColor: 'transparent',
            scaleShowVerticalLines: false,
            pointDot: false,
            pointDotRadius: 4,
            pointDotStrokeWidth: 1,
            pointHitDetectionRadius: 20,
            datasetStroke: true,
            datasetStrokeWidth: 2,
            datasetFill: true,
            animationEasing: "easeInOutExpo"
        };
    }
]);
app.controller('BarCtrl', ["$scope",
    function($scope) {
        $scope.labels = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'a', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'i', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
        $scope.series = ['dataset'];
        $scope.data = [
            [65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56, 80, 81]
        ];
        $scope.colors = [{
            fillColor: 'rgba(154,137,181,0.6)',
            highlightFill: 'rgba(154,137,181,0.9)'
        }];
        // Chart.js Options - complete list at http://www.chartjs.org/docs/
        $scope.options = {
            maintainAspectRatio: false,
            showScale: false,
            barDatasetSpacing: 0,
            tooltipFontSize: 11,
            tooltipFontFamily: "'Helvetica', 'Arial', sans-serif",
            responsive: true,
            scaleBeginAtZero: true,
            scaleShowGridLines: false,
            scaleLineColor: 'transparent',
            barShowStroke: false,
            barValueSpacing: 5
        };
    }
]);
app.controller('BarCtrl2', ["$scope",
    function($scope) {
        $scope.labels = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'a', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'i', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
        $scope.series = ['dataset'];
        $scope.data = [
            [65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56, 80, 81]
        ];
        $scope.colors = [{
            fillColor: 'rgba(255,255,244,0.3)',
            strokeColor: 'rgba(255,255,244,0.5)'
        }];
        // Chart.js Options - complete list at http://www.chartjs.org/docs/
        $scope.options = {
            maintainAspectRatio: false,
            showScale: false,
            barDatasetSpacing: 0,
            tooltipFontSize: 11,
            tooltipFontFamily: "'Helvetica', 'Arial', sans-serif",
            responsive: true,
            scaleBeginAtZero: true,
            scaleShowGridLines: false,
            scaleLineColor: 'transparent',
            barShowStroke: false,
            barValueSpacing: 5
        };
    }
]);
app.controller('LineCtrl', ["$scope",
    function($scope) {
        $scope.labels = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
        $scope.series = ['dataset'];
        $scope.data = [
            [65, 59, 80, 81, 56, 95, 100]
        ];
        $scope.colors = [{
            fillColor: 'rgba(0,0,0,0)',
            strokeColor: 'rgba(0,0,0,0.2)'
        }];
        // Chart.js Options - complete list at http://www.chartjs.org/docs/
        $scope.options = {
            maintainAspectRatio: false,
            showScale: false,
            scaleLineWidth: 0,
            responsive: true,
            scaleFontFamily: "'Helvetica', 'Arial', sans-serif",
            scaleFontSize: 11,
            scaleFontColor: "#aaa",
            scaleShowGridLines: true,
            tooltipFontSize: 11,
            tooltipFontFamily: "'Helvetica', 'Arial', sans-serif",
            tooltipTitleFontFamily: "'Helvetica', 'Arial', sans-serif",
            tooltipTitleFontSize: 12,
            scaleGridLineColor: 'rgba(0,0,0,.05)',
            scaleGridLineWidth: 1,
            bezierCurve: false,
            bezierCurveTension: 0.2,
            scaleLineColor: 'transparent',
            scaleShowVerticalLines: false,
            pointDot: true,
            pointDotRadius: 4,
            pointDotStrokeWidth: 1,
            pointHitDetectionRadius: 20,
            datasetStroke: true,
            datasetStrokeWidth: 2,
            datasetFill: true,
            animationEasing: "easeInOutExpo"
        };
    }
]);
app.controller('RandomCtrl', function($scope, $interval) {
    $scope.randomUsers = 0;
    var interval = 1500;
    $scope.realtime = function() {
        var random = $interval(function() {
            $scope.randomUsers = Math.floor((Math.random() * 6) + 100);
            interval = Math.floor((Math.random() * 5000) + 1000);
            $interval.cancel(random);
            $scope.realtime();
        }, interval);
    };
    $scope.realtime();
});
app.controller('KnobCtrl1', function($scope) {
    $scope.value = 65;
    $scope.options = {
        unit: "%",
        readOnly: true,
        size: 70,
        fontSize: '11px',
        textColor: 'rgb(154,137,181)',
        trackWidth: 5,
        barWidth: 10,
        trackColor: 'rgba(154,137,181,0.6)',
        barColor: 'rgba(154,137,181,0.9)'
    };
});
app.controller('KnobCtrl2', function($scope) {
    $scope.value = 330;
    $scope.options = {
        unit: "MB",
        readOnly: true,
        size: 70,
        fontSize: '11px',
        textColor: 'rgb(154,137,181)',
        trackWidth: 5,
        barWidth: 10,
        trackColor: 'rgba(154,137,181,0.6)',
        barColor: 'rgba(154,137,181,0.9)',
        max: 1024
    };
});
app.controller('KnobCtrl3', function($scope) {
    $scope.value = 65;
    $scope.options = {
        unit: "%",
        readOnly: true,
        size: 70,
        fontSize: '11px',
        textColor: '#fff',
        trackWidth: 5,
        barWidth: 10,
        trackColor: 'rgba(255,255,255,0.4)',
        barColor: '#8773A8'
    };
});
app.controller('KnobCtrl4', function($scope) {
    $scope.value = 330;
    $scope.options = {
        unit: "MB",
        readOnly: true,
        size: 70,
        fontSize: '11px',
        textColor: '#fff',
        trackWidth: 5,
        barWidth: 10,
        trackColor: 'rgba(255,255,255,0.4)',
        barColor: '#8773A8',
        max: 1024
    };
});
app.controller('SocialCtrl1', ["$scope",
    function($scope) {
        $scope.labels = ['Facebook', 'Twitter', 'YouTube', 'Spotify'];
        $scope.data = [300, 150, 100, 80];
        $scope.colors = ['#6F83B6', '#79BEF1', '#ED5952', '#8BC33E'];
        // Chart.js Options - complete list at http://www.chartjs.org/docs/
        $scope.options = {
            responsive: false,
            scaleShowLabelBackdrop: true,
            scaleBackdropColor: 'rgba(255,255,255,0.75)',
            scaleBeginAtZero: true,
            scaleBackdropPaddingY: 2,
            scaleBackdropPaddingX: 2,
            scaleShowLine: true,
            segmentShowStroke: true,
            segmentStrokeColor: '#fff',
            segmentStrokeWidth: 2,
            animationSteps: 100,
            animationEasing: 'easeOutBounce',
            animateRotate: true,
            animateScale: false
        };
    }
]);
app.controller('SocialCtrl2', ["$scope",
    function($scope) {
        $scope.labels = ['Facebook', 'Twitter', 'YouTube', 'Spotify'];
        $scope.data = [180, 210, 97, 60];
        $scope.colors = ['#6F83B6', '#79BEF1', '#ED5952', '#8BC33E'];
        // Chart.js Options - complete list at http://www.chartjs.org/docs/
        $scope.options = {
            responsive: false,
            scaleShowLabelBackdrop: true,
            scaleBackdropColor: 'rgba(255,255,255,0.75)',
            scaleBeginAtZero: true,
            scaleBackdropPaddingY: 2,
            scaleBackdropPaddingX: 2,
            scaleShowLine: true,
            segmentShowStroke: true,
            segmentStrokeColor: '#fff',
            segmentStrokeWidth: 2,
            animationSteps: 100,
            animationEasing: 'easeOutBounce',
            animateRotate: true,
            animateScale: false
        };
    }
]);
app.controller('SocialCtrl3', ["$scope",
    function($scope) {
        $scope.labels = ['Fb', 'YT', 'Tw'];
        $scope.data = [300, 50, 100];
        $scope.colors = ['#6F83B6', '#79BEF1', '#ED5952'];
        // Chart.js Options - complete list at http://www.chartjs.org/docs/
        $scope.options = {
            responsive: false,
            tooltipFontSize: 11,
            tooltipFontFamily: "'Helvetica', 'Arial', sans-serif",
            tooltipCornerRadius: 0,
            tooltipCaretSize: 2,
            segmentShowStroke: true,
            segmentStrokeColor: '#fff',
            segmentStrokeWidth: 2,
            percentageInnerCutout: 50,
            animationSteps: 100,
            animationEasing: 'easeOutBounce',
            animateRotate: true,
            animateScale: false
        };
    }
]);
app.controller('SocialCtrl4', ["$scope",
    function($scope) {
        $scope.labels = ['Sc', 'Ad'];
        $scope.data = [200, 150];
        $scope.colors = ['#8BC33E', '#7F8C8D'];
        // Chart.js Options - complete list at http://www.chartjs.org/docs/
        $scope.options = {
            responsive: false,
            tooltipFontSize: 11,
            tooltipFontFamily: "'Helvetica', 'Arial', sans-serif",
            tooltipCornerRadius: 0,
            tooltipCaretSize: 2,
            segmentShowStroke: true,
            segmentStrokeColor: '#fff',
            segmentStrokeWidth: 2,
            percentageInnerCutout: 50,
            animationSteps: 100,
            animationEasing: 'easeOutBounce',
            animateRotate: true,
            animateScale: false
        };
    }
]);
app.controller('PerformanceCtrl1', ["$scope",
    function($scope) {
        $scope.value = 85;
        $scope.options = {
            size: 125,
            unit: "%",
            trackWidth: 10,
            barWidth: 10,
            step: 5,
            trackColor: 'rgba(52,152,219,.1)',
            barColor: 'rgba(69,204,206,.5)'
        };
    }
]);
app.controller('BudgetCtrl', ["$scope",
    function($scope) {
        $scope.dailyValue = "25";
        $scope.totalValue = "750";
        $scope.dailyOptions = {
            from: 1,
            to: 100,
            step: 1,
            dimension: " $",
            className: "clip-slider",
            css: {
                background: {
                    "background-color": "silver"
                },
                before: {
                    "background-color": "rgb(154,137,181)"
                }, // zone before default value
                after: {
                    "background-color": "rgb(154,137,181)"
                }, // zone after default value
            }
        };
        $scope.totalOptions = {
            from: 100,
            to: 1000,
            step: 1,
            dimension: " $",
            className: "clip-slider",
            css: {
                background: {
                    "background-color": "silver"
                },
                before: {
                    "background-color": "rgb(127,140,141)"
                }, // zone before default value
                after: {
                    "background-color": "rgb(127,140,141)"
                }, // zone after default value
            }
        };
    }
]);