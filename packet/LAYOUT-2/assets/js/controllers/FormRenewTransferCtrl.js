'use strict';
/**   
 * controllers for GoogleMap  
 * AngularJS Directive  
 */
app.controller("FormRenewTransferCtrl", ["$scope", "$http", "$timeout", "$stateParams", "$state", "SweetAlert", "info", "ngNotify", "ServicePDF", "$aside",
    function($scope, $http, $timeout, $stateParams, $state, SweetAlert, info, ngNotify, ServicePDF, $aside) {
        /** Date month function **/
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
        /** window prevent tab key **/
        var previousWindowKeyDown = window.onkeydown;
        /** value not set function **/
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
        /** tab function **/
        $scope.obj = {
            value1: 1,
            value2: false
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
        /** change function **/
        /** so cool but a bit confuse on ui 
        $scope.changetable = function(tabletype) {
            if (tabletype = 'monthreport') {
                $scope.monthid = 0;
                $scope.yearid = 0;
                $scope.container_type = 2;
                tableSpecReportList.draw();
            }
        }**/
        /** Database action function **/
        $scope.ContainerUpdate = function(Ins_mode, codetype) {
            if (Ins_mode === 'UPDATE') {
                var specdata_array = dataarr;
                if (codetype === 'DrcodeMuseum') {
                    var specdatamuseum_array = dataarrmuseum;
                    var a = getIfNotSet($scope.transRcontainerMuseum.spec_box_id, 0, true);
                    var b = JSON.stringify(specdatamuseum_array)
                    var data = $.param({
                        tspecimens_ids: b,
                        tdrcode_id: a,
                        taction: Ins_mode,
                        tcodetype: codetype,
                        tcontainer_id: 2
                    });
                    $http({
                        method: 'POST',
                        data: data,
                        url: "assets/views/action/dbupdateContainer.php",
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        },
                    }).success(function(response) {
                        dataarrmuseum = [];
                        tableSpecMuseumList.draw(false);
                    });
                }
                if (codetype === 'Drcode') {
                    var a = getIfNotSet($scope.transRcontainer.spec_box_id, 0, true);
                    var b = JSON.stringify(specdata_array)
                    var data = $.param({
                        tspecimens_ids: b,
                        tdrcode_id: a,
                        taction: Ins_mode,
                        tcodetype: codetype,
                        tcontainer_id: 2
                    });
                    $http({
                        method: 'POST',
                        data: data,
                        url: "assets/views/action/dbupdateContainer.php",
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        },
                    }).success(function(response) {
                        dataarr = [];
                        tableSpecReportList.draw(false);
                    });
                }
                if (codetype === 'ChainDrcode') {
                    var valuenotset = getIfNotSet($scope.GETcspecbox, 0, true);
                    if (valuenotset !== 0) {
                        var a = getIfNotSet($scope.GETcspecbox[0].spec_box_id, 0, true);
                    } else {
                        var a = valuenotset;
                    }
                    var b = JSON.stringify(specdata_array);
                    var data = $.param({
                        tspecimens_ids: b,
                        tdrcode_id: a,
                        taction: Ins_mode,
                        tcodetype: codetype,
                        tcontainer_id: 2
                    });
                    $http({
                        method: 'POST',
                        data: data,
                        url: "assets/views/action/dbupdateContainer.php",
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        },
                    }).success(function(response) {
                        dataarr = [];
                        tableSpecReportList.draw(false);
                    });
                }
            }
        }
        /** Database Specimens Details Action  **/
        $scope.EditSpecimens = function(action, form) {
            var data;
            var speicmensids = dataarrmuseum;
            var a = JSON.stringify(speicmensids);
            if (action == "REMOVEFROMMUSEUM") {
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
                            url: "assets/views/action/dbRemove_specfrommuseum.php",
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
                                dataarrmuseum = [];
                                tableSpecMuseumList.draw();
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
                                    tableSpecimensBox.draw();
                                    tableSpecReportList.draw();
                                    /*     if (response[0].lockbox_status == 1) {
                                             $scope.FullBoxModel = 'fa-star-o'
                                         }
                                         if (response[0].lockbox_status == 2) {
                                             $scope.FullBoxModel = 'fa-star'
                                         }
                                         if (response[0].lockbox_status == 3) {
                                             $scope.FullBoxModel = 'fa-star-half-o'
                                         }*/
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
                                        tableSpecimensBox.draw();
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
        }
        $scope.specimensUpdate = function(action, form) {
            var f = $scope.updatetype;
            if (f == 0 | f == 1) {
                var tablearr = dataarrmuseum;
            }
            if (f == 2) {
                var tablearr = dataarrSpecbox;
            }
            var g = $scope.boxstatus_id
            var a = getIfNotSet($scope.specModelSpecies.species_id, 0, true);
            var b = tablearr;
            var d = getIfNotSet($scope.BoxShowDetailsBoxid, 0, true);
            var e = 1;
            var c = JSON.stringify(b);
            /* e = 1 container_type is box 
               e = 2 container_type is cabinet 
            */
            var data = $.param({
                tspecimens_ids: c,
                species_id: a,
                container_id: d,
                container_type: e,
                action: action,
                actionmode: f,
                month: $stateParams.monthid,
                year: $stateParams.yearid,
            });
            $scope.toTheTop();
            if (form.$valid) {
                if (f == 0) {
                    if (tablearr.length !== 0 && $scope.specModelSpecies.species_id !== undefined) {
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
                                        dataarrmuseum = [];
                                        tableSpecMuseumList.draw(false);
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
                        if (tablearr.length == 0 && $scope.specModelSpecies.species_id == undefined) {
                            SweetAlert.swal({
                                title: "ERROR",
                                text: "Please Fill in the data (กรุณากรอกข้อมูลให้ครบถ้วน)",
                                type: "error",
                                confirmButtonColor: "#007AFF"
                            });
                        }
                        if (tablearr.length !== 0 && $scope.specModelSpecies.species_id == undefined) {
                            SweetAlert.swal({
                                title: "ERROR",
                                text: "Please Fill in texbox (กรุณากรอกข้อมูลตัวอย่างแมลง)",
                                type: "error",
                                confirmButtonColor: "#007AFF"
                            });
                        }
                        if (tablearr.length == 0 && $scope.specModelSpecies.species_id !== undefined) {
                            SweetAlert.swal({
                                title: "ERROR",
                                text: "Please Select Collection number (กรุณาเลือกหมายเลขคอลเลคชัน)",
                                type: "error",
                                confirmButtonColor: "#007AFF"
                            });
                        }
                    }
                }
                if (f == 1) {
                    if (g == 2) {
                        SweetAlert.swal({
                            title: "ERROR",
                            text: "THIS BOX IS FULL (กล่องเต็มแล้ว)",
                            type: "error",
                            confirmButtonColor: "#007AFF"
                        });
                    } else {
                        if (tablearr.length !== 0 && $scope.specModelSpecies.species_id !== undefined && d !== 0 && e > 0) {
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
                                            $scope.countSpecimens(monthshow, yearshow, e, d);
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
                                            dataarr = [];
                                            dataarrSpecbox = [];
                                            tableSpecReportList.draw();
                                            tableSpecimensBox.draw();
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
                            if (tablearr.length == 0 && $scope.specModelSpecies.species_id == undefined && d == 0) {
                                SweetAlert.swal({
                                    title: "ERROR",
                                    text: "Please Fill in the data (กรุณากรอกข้อมูลให้ครบถ้วน)",
                                    type: "error",
                                    confirmButtonColor: "#007AFF"
                                });
                            }
                            if (tablearr.length !== 0 && $scope.specModelSpecies.species_id == undefined && d == 0) {
                                SweetAlert.swal({
                                    title: "ERROR",
                                    text: "Please Select box (กรุณาเกรอกข้อมูลให้ครบ)",
                                    type: "error",
                                    confirmButtonColor: "#007AFF"
                                });
                            }
                            if (tablearr.length == 0 && $scope.specModelSpecies.species_id !== undefined && d == 0) {
                                SweetAlert.swal({
                                    title: "ERROR",
                                    text: "Please Select Specimens number  (กรุณาเลือกหมายเลขตัวอย่างแมลง)",
                                    type: "error",
                                    confirmButtonColor: "#007AFF"
                                });
                            }
                            if (tablearr.length == 0 && $scope.specModelSpecies.species_id == undefined && d !== 0) {
                                SweetAlert.swal({
                                    title: "ERROR",
                                    text: "Please Select box (กรุณาเกรอกข้อมูลให้ครบ)",
                                    type: "error",
                                    confirmButtonColor: "#007AFF"
                                });
                            }
                            if (tablearr.length !== 0 && $scope.specModelSpecies.species_id !== undefined && d == 0) {
                                SweetAlert.swal({
                                    title: "ERROR",
                                    text: "Please Fill in texbox (กรุณาเลือกกล่องใส่แมลง)",
                                    type: "error",
                                    confirmButtonColor: "#007AFF"
                                });
                            }
                            if (tablearr.length == 0 && $scope.specModelSpecies.species_id !== undefined && d !== 0) {
                                SweetAlert.swal({
                                    title: "ERROR",
                                    text: "Please Select Specimens number (กรุณาเลือกหมายเลขตัวอย่างแมลง)",
                                    type: "error",
                                    confirmButtonColor: "#007AFF"
                                });
                            }
                            if (tablearr.length !== 0 && $scope.specModelSpecies.species_id == undefined && d !== 0) {
                                SweetAlert.swal({
                                    title: "ERROR",
                                    text: "Please Select Specimens number (กรุณากรอกข้อมูลตัวอย่างแมลง)",
                                    type: "error",
                                    confirmButtonColor: "#007AFF"
                                });
                            }
                            /*
                            if (tablearr.length == 0) {
                                SweetAlert.swal({
                                    title: "ERROR",
                                    text: "Please Select Collection number (กรุณาเลือกหมายเลขคอลเลคชัน)",
                                    type: "error",
                                    confirmButtonColor: "#007AFF"
                                });
                            }
                            if ($scope.specModelSpecies.species_id == undefined) {
                                SweetAlert.swal({
                                    title: "ERROR",
                                    text: "Please Fill in texbox (กรุณากรอกข้อมูล)",
                                    type: "error",
                                    confirmButtonColor: "#007AFF"
                                });
                            }*/
                        }
                    }
                }
                if (f == 2) {
                    if (tablearr.length !== 0 && $scope.specModelSpecies.species_id !== undefined && d !== 0 && e > 0) {
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
                                        $scope.countSpecimens(monthshow, yearshow, e, d);
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
                                        dataarr = [];
                                        dataarrSpecbox = [];
                                        tableSpecReportList.draw();
                                        tableSpecimensBox.draw();
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
                        if (tablearr.length == 0 && $scope.specModelSpecies.species_id == undefined && d == 0) {
                            SweetAlert.swal({
                                title: "ERROR",
                                text: "Please Fill in the data (กรุณากรอกข้อมูลให้ครบถ้วน)",
                                type: "error",
                                confirmButtonColor: "#007AFF"
                            });
                        }
                        if (tablearr.length !== 0 && $scope.specModelSpecies.species_id == undefined && d == 0) {
                            SweetAlert.swal({
                                title: "ERROR",
                                text: "Please Select box (กรุณาเกรอกข้อมูลให้ครบ)",
                                type: "error",
                                confirmButtonColor: "#007AFF"
                            });
                        }
                        if (tablearr.length == 0 && $scope.specModelSpecies.species_id !== undefined && d == 0) {
                            SweetAlert.swal({
                                title: "ERROR",
                                text: "Please Select Specimens number  (กรุณาเลือกหมายเลขตัวอย่างแมลง)",
                                type: "error",
                                confirmButtonColor: "#007AFF"
                            });
                        }
                        if (tablearr.length == 0 && $scope.specModelSpecies.species_id == undefined && d !== 0) {
                            SweetAlert.swal({
                                title: "ERROR",
                                text: "Please Select box (กรุณาเกรอกข้อมูลให้ครบ)",
                                type: "error",
                                confirmButtonColor: "#007AFF"
                            });
                        }
                        if (tablearr.length !== 0 && $scope.specModelSpecies.species_id !== undefined && d == 0) {
                            SweetAlert.swal({
                                title: "ERROR",
                                text: "Please Fill in texbox (กรุณาเลือกกล่องใส่แมลง)",
                                type: "error",
                                confirmButtonColor: "#007AFF"
                            });
                        }
                        if (tablearr.length == 0 && $scope.specModelSpecies.species_id !== undefined && d !== 0) {
                            SweetAlert.swal({
                                title: "ERROR",
                                text: "Please Select Specimens number (กรุณาเลือกหมายเลขตัวอย่างแมลง)",
                                type: "error",
                                confirmButtonColor: "#007AFF"
                            });
                        }
                        if (tablearr.length !== 0 && $scope.specModelSpecies.species_id == undefined && d !== 0) {
                            SweetAlert.swal({
                                title: "ERROR",
                                text: "Please Select Specimens number (กรุณากรอกข้อมูลตัวอย่างแมลง)",
                                type: "error",
                                confirmButtonColor: "#007AFF"
                            });
                        }
                    }
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
        /** button of datatable function **/
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
        $.fn.dataTable.ext.buttons.transfertomuseum = {
            className: 'buttons-alert',
            action: function(e, dt, node, config) {
                $scope.EditSpecimens('TRANSFERTOMUSEUM', 'specimens_form')
            }
        };
        $.fn.dataTable.ext.buttons.removefrommuseum = {
            className: 'buttons-alert',
            action: function(e, dt, node, config) {
                $scope.EditSpecimens('REMOVEFROMMUSEUM', 'specimens_form')
            }
        };
        /** specimens in the museum **/
        $scope.monthidmuseum = 0
        $scope.yearidmuseum = 0
        $scope.container_typemuseum = 2
        var dataarrmuseum = [];
        var groupColumnmuseum = 2;
        var groupColumnmuseum1 = 3;
        var tableSpecMuseumList = $('#SpecimensMuseumTbl').DataTable({
            "processing": true,
            "serverSide": true,
            "ajax": {
                "url": "assets/scripts/server_processing_museum.php",
                "type": "POST",
                "data": function(d) {
                    d.treport_month = getIfNotSet($scope.monthidmuseum, '0', true);
                    d.treport_year = getIfNotSet($scope.yearidmuseum, '0', true);
                    d.tcontainer_type = $scope.container_typemuseum
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
                                    $(rows).eq(i).before('<tr class="group label-info  bigfonttr"><td class="groupheader" colspan="3">' + rowData[1] + '</td><td class="groupheader">' + rowData[2] + '</td><td colspan="2"><a class="btn btn-transparent btn-xs tooltips marginnavileft checkall" tooltip-placement="top" uib-tooltip="Share"><i class="fa fa-check-square"></i></a><a class="btn btn-transparent btn-xs marginnavileft cancelall" tooltip-placement="top" uib-tooltip="Edit"><i class="fa fa-circle-o"></i></a></td></tr>');
                                }
                                last = group
                            } else {
                                if (last !== group) {
                                    var rowData = api.row(i).data();
                                    $(rows).eq(i).before('<tr class="group label-info  bigfonttr"><td class="groupheader" colspan="3">' + rowData[1] + '</td><td class="groupheader">' + rowData[2] + '</td><td colspan="2"><a class="btn btn-transparent btn-xs tooltips marginnavileft checkall" tooltip-placement="top" uib-tooltip="Share"><i class="fa fa-check-square"></i></a><a class="btn btn-transparent btn-xs marginnavileft cancelall" tooltip-placement="top" uib-tooltip="Edit"><i class="fa fa-circle-o"></i></a></td></tr>');
                                }
                                last = group;
                            }
                        }
                    });
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
            "buttons": [{
                extend: 'removefrommuseum',
                text: 'Remove',
                className: 'btn btn-primary btn-wide btn-scroll btn-scroll-top fa fa-tag'
            }, {
                text: '<i class="fa fa-check-square"></i> Select all',
                action: function(row) {
                    tableSpecMuseumList.rows().select();
                    $(row).addClass('selected');
                    var data = tableSpecMuseumList.rows('.selected').select().data();
                    for (var i = 0; i < data.length; i++) {
                        var rowid = data[i]['DT_RowId'];
                        var rowidres = rowid.substring(4);
                        dataarrmuseum.push(rowidres);
                    }
                    return dataarrmuseum;
                },
                className: 'btn btn-o btn-wide btn-success btn-scroll btn-scroll-top fa fa-check-square',
                enabled: true
            }, {
                text: '<i class="fa fa-check-square-o"></i> Select none',
                action: function() {
                    tableSpecMuseumList.rows().deselect();
                    dataarrmuseum = [];
                },
                enabled: true,
                className: 'btn btn-o btn-wide btn-warning btn-scroll btn-scroll-top fa fa-check-square-o',
            }],
            "pagingType": "input",
            "columns": [{
                "class": "select-checkbox",
                "orderable": false,
                "data": null,
                "defaultContent": ""
            }, {
                "data": "0",
                "width": "25%",
                "orderable": false
            }, {
                "data": "1",
                "width": "25%",
                "orderable": false
            }, {
                "data": "2",
                "width": "25%",
                "orderable": false
            }, {
                "data": "3",
                "width": "25%",
                "orderable": false
            }, {
                "data": "4",
                "width": "25%",
                "visible": false
            }, {
                "data": "5",
                "width": "25%",
                "visible": false
            }, {
                "data": "6",
                "width": "25%",
                "visible": false
            }, {
                "data": "7",
                "width": "25%",
                "visible": false
            }, {
                "data": "8",
                "width": "25%",
                "visible": false
            }, {
                "data": "9",
                "width": "25%",
                "visible": false
            }, {
                "data": "10",
                "width": "25%",
                "visible": true
            }],
            "columnDefs": [{
                "visible": true,
                "targets": groupColumnmuseum
            }, {
                "visible": true,
                "targets": groupColumnmuseum1
            }],
            "order": [
                [6, 'asc'],
                [7, 'asc'],
                [5, 'asc']
            ]
        });
        /** datatable filter spec in museum **/
        function filterColumnspecboxmuseum(i) {
            if (i == 8) {
                var ii = getIfNotSet(Number($('#col' + i + '_filterboxmuseum').val()), '', true);
            } else {
                var ii = $('#col' + i + '_filterboxmuseum').val();
            }
            $('#SpecimensMuseumTbl').DataTable().column(i).search(ii).draw();
        }
        $scope.searchmodel = function(i) {
            if (i == 2) {
                var ii = $scope.collorder;
                $('#SpecimensReportListTbl').DataTable().column(i).search(ii).draw();
            }
            if (i == 3) {
                var ii = $scope.collfamily;
                $('#SpecimensReportListTbl').DataTable().column(i).search(ii).draw();
            }
            if (i == 8) {
                var ii = $scope.collcode;
                $('#SpecimensReportListTbl').DataTable().column(i).search(ii).draw();
            }
            if (i == 9) {
                var ii = $scope.collyear;
                $('#SpecimensReportListTbl').DataTable().column(i).search(ii).draw();
            }
            if (i == 10) {
                var ii = $scope.collnumber;
                $('#SpecimensReportListTbl').DataTable().column(i).search(ii).draw();
            }
        }
        $scope.searchmuseummodel = function(i) {
            if (i == 8) {
                var ii = $scope.collcodemuseum;
                $('#SpecimensMuseumTbl').DataTable().column(i).search(ii).draw();
            }
            if (i == 9) {
                var ii = $scope.collyearmuseum;
                $('#SpecimensMuseumTbl').DataTable().column(i).search(ii).draw();
            }
            if (i == 10) {
                var ii = $scope.collnumbermuseum;
                $('#SpecimensMuseumTbl').DataTable().column(i).search(ii).draw();
            }
            if (i == 4) {
                var ii = $scope.drawerno;
                $('#SpecimensMuseumTbl').DataTable().column(i).search(ii).draw();
            }
            if (i == 11) {
                var ii = $scope.specboxno;
                $('#SpecimensMuseumTbl').DataTable().column(i).search(ii).draw();
            }
        }
        /** datatable specimens details checkbox **/
        $('#SpecimensMuseumTbl tbody').on('click', '.select-checkbox', function() {
            var tr = $(this).closest('tr');
            var data = tableSpecMuseumList.row($(this).closest('tr')).data();
            var id = data.DT_RowId;
            var idres = id.substring(4);
            var index = $.inArray(idres, dataarrmuseum);
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
                dataarrmuseum.push(idres);
            } else {
                dataarrmuseum.splice(index, 1);
            }
            if ($(tr).hasClass('selected')) {
                $(tr).removeClass('selected');
                tableSpecMuseumList.rows($(this).closest('tr')).deselect();
            } else {
                $(tr).addClass('selected');
            }
        });
        /** Specimens Unknown box **/
        $scope.monthid = 0
        $scope.yearid = 0
        $scope.container_type = 3
        var dataarr = [];
        var groupColumn = 2;
        var groupColumn1 = 3;
        var tableSpecReportList = $('#SpecimensReportListTbl').DataTable({
            "processing": true,
            "serverSide": true,
            "ajax": {
                "url": "assets/scripts/server_processing_remainspec.php",
                "type": "POST",
                "data": function(d) {
                    d.treport_month = getIfNotSet($scope.monthid, '0', true);
                    d.treport_year = getIfNotSet($scope.yearid, '0', true);
                    d.tcontainer_type = $scope.container_type
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
                                    $(rows).eq(i).before('<tr class="group label-info  bigfonttr"><td class="groupheader" colspan="2">' + rowData[1] + '</td><td class="groupheader">' + rowData[2] + '</td><td colspan="2"><a class="btn btn-transparent btn-xs tooltips marginnavileft checkall" tooltip-placement="top" uib-tooltip="Share"><i class="fa fa-check-square"></i></a><a class="btn btn-transparent btn-xs marginnavileft cancelall" tooltip-placement="top" uib-tooltip="Edit"><i class="fa fa-circle-o"></i></a></td></tr>');
                                }
                                last = group
                            } else {
                                if (last !== group) {
                                    var rowData = api.row(i).data();
                                    $(rows).eq(i).before('<tr class="group label-info  bigfonttr"><td class="groupheader" colspan="2">' + rowData[1] + '</td><td class="groupheader">' + rowData[2] + '</td><td colspan="2"><a class="btn btn-transparent btn-xs tooltips marginnavileft checkall" tooltip-placement="top" uib-tooltip="Share"><i class="fa fa-check-square"></i></a><a class="btn btn-transparent btn-xs marginnavileft cancelall" tooltip-placement="top" uib-tooltip="Edit"><i class="fa fa-circle-o"></i></a></td></tr>');
                                }
                                last = group;
                            }
                        }
                    });
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
            "buttons": [{
                extend: 'transfertomuseum',
                text: 'Transfer',
                className: 'btn btn-primary btn-wide btn-scroll btn-scroll-top fa fa-tag'
            }, {
                text: '<i class="fa fa-check-square"></i> Select all',
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
                className: 'btn btn-o btn-wide btn-success btn-scroll btn-scroll-top fa fa-check-square',
                enabled: true
            }, {
                text: '<i class="fa fa-check-square-o"></i> Select none',
                action: function() {
                    tableSpecReportList.rows().deselect();
                    dataarr = [];
                },
                enabled: true,
                className: 'btn btn-o btn-wide btn-warning btn-scroll btn-scroll-top fa fa-check-square-o',
            }],
            "pagingType": "input",
            "columns": [{
                "class": "select-checkbox",
                "orderable": false,
                "data": null,
                "defaultContent": ""
            }, {
                "data": "0",
                "width": "25%",
                "orderable": false
            }, {
                "data": "1",
                "width": "25%",
                "orderable": false
            }, {
                "data": "2",
                "width": "25%",
                "orderable": false
            }, {
                "data": "3",
                "width": "25%",
                "orderable": false
            }, {
                "data": "4",
                "width": "25%",
                "visible": false
            }, {
                "data": "5",
                "width": "25%",
                "visible": false
            }, {
                "data": "6",
                "width": "25%",
                "visible": false
            }, {
                "data": "7",
                "width": "25%",
                "visible": false
            }, {
                "data": "8",
                "width": "25%",
                "visible": false
            }, {
                "data": "9",
                "width": "25%",
                "visible": false
            }],
            "columnDefs": [{
                "visible": true,
                "targets": groupColumn
            }, {
                "visible": true,
                "targets": groupColumn1
            }],
            "order": [
                [6, 'asc'],
                [7, 'asc'],
                [5, 'asc']
            ]
        });
        /** datatable checkbox **/
        $('#SpecimensReportListTbl tbody').on('click', '.select-checkbox', function() {
            var tr = $(this).closest('tr');
            var data = tableSpecReportList.row($(this).closest('tr')).data();
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
                tableSpecReportList.rows($(this).closest('tr')).deselect();
            } else {
                $(tr).addClass('selected');
            }
        });
        /** button in table function **/
        $('#SpecimensReportListTbl tbody').on('click', '.checkall', function() {
            var par = $(this).parent().parent(); //table row
            var tdUuid = par.children("td:nth-child(1)");
            var order = tdUuid[0].innerHTML;
            var tdUuidx = par.children("td:nth-child(2)");
            var family = tdUuidx[0].innerHTML;
            var columns = [2];
            var orderarr = [];
            for (var x = 0; x < columns.length; x++) {
                tableSpecReportList.column(columns[x], {
                    page: 'current'
                }).data().each(function(group, i) {
                    var data = tableSpecReportList.row(i).data();
                    if (order === data[1] && family === data[2]) {
                        var id = data.DT_RowId;
                        var idres = "#" + id;
                        var idpure = id.substring(4);
                        var index = $.inArray(idpure, dataarr);
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
                        dataarr.push(idpure);
                        var tr = $(idres).closest('tr');
                        $(tr).addClass('selected');
                    }
                });
            }
        });
        $('#SpecimensReportListTbl tbody').on('click', '.cancelall', function() {
            var par = $(this).parent().parent();
            var tdUuid = par.children("td:nth-child(1)");
            var order = tdUuid[0].innerHTML;
            var tdUuidx = par.children("td:nth-child(2)");
            var family = tdUuidx[0].innerHTML;
            var columns = [2];
            var orderarr = [];
            for (var x = 0; x < columns.length; x++) {
                tableSpecReportList.column(columns[x], {
                    page: 'current'
                }).data().each(function(group, i) {
                    var data = tableSpecReportList.row(i).data();
                    if (order === data[1] && family === data[2]) {
                        var id = data.DT_RowId;
                        var idres = "#" + id;
                        var idpure = id.substring(4);
                        var index = $.inArray(idpure, dataarr);
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
                        var tr = $(idres).closest('tr');
                        dataarr.splice(index, 1);
                        if ($(tr).hasClass('selected')) {
                            $(tr).removeClass('selected');
                            tableSpecReportList.rows(dataarr).deselect();
                        }
                    }
                });
            }
        });
        /** datatable filter spec not box **/
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
        $scope.searchmodel = function(i) {
            if (i == 2) {
                var ii = $scope.collorder;
                $('#SpecimensReportListTbl').DataTable().column(i).search(ii).draw();
            }
            if (i == 3) {
                var ii = $scope.collfamily;
                $('#SpecimensReportListTbl').DataTable().column(i).search(ii).draw();
            }
            if (i == 8) {
                var ii = $scope.collcode;
                $('#SpecimensReportListTbl').DataTable().column(i).search(ii).draw();
            }
            if (i == 9) {
                var ii = $scope.collyear;
                $('#SpecimensReportListTbl').DataTable().column(i).search(ii).draw();
            }
            if (i == 10) {
                var ii = $scope.collnumber;
                $('#SpecimensReportListTbl').DataTable().column(i).search(ii).draw();
            }
        }
        /** select option in form **/
        $http({
            method: 'GET',
            url: 'assets/views/action/getCabinetList.php',
            params: {
                sCabinet: 'ROWCABINET'
            }
        }).success(function(result) {
            $scope.GETrowcabinet = [];
            $scope.GETrowcabinet = result;
        });
        $scope.onChangedRowContainer = function() {
            $http({
                method: 'GET',
                url: 'assets/views/action/getContainerInfo.php',
                params: {
                    cType: 'ROWCABINET',
                    sRowCabinetId: $scope.rcabinet
                }
            }).success(function(response) {
                $scope.GETcabinet = [];
                $scope.GETcabinet = response;
            });
        }
        $scope.onChangedContainer = function() {
            $http({
                method: 'GET',
                url: 'assets/views/action/getContainerInfo.php',
                params: {
                    cType: 'CABINET',
                    sCabinetId: $scope.cabinet
                }
            }).success(function(response) {
                $scope.GETclocker = [];
                $scope.GETclocker = response;
            });
        }
        $scope.onChangedLocker = function() {
            $http({
                method: 'GET',
                url: 'assets/views/action/getContainerInfo.php',
                params: {
                    cType: 'LOCKER',
                    sSubCabinetId: $scope.clocker
                }
            }).success(function(response) {
                $scope.GETcdrawer = [];
                $scope.GETcdrawer = response;
            });
        }
        $scope.onChangedDrawer = function() {
            $http({
                method: 'GET',
                url: 'assets/views/action/getContainerInfo.php',
                params: {
                    cType: 'DRAWER',
                    sDrawertId: $scope.cdrawer
                }
            }).success(function(response) {
                $scope.GETcspecbox = [];
                $scope.GETcspecbox = response;
            });
        }
        /** Auto complete **/
        $scope.transRcontainerMuseum = '';
        $scope.transRcontainer = '';
        $scope.transcontainer = '';
        $scope.translocker = '';
        $scope.transdrawer = '';
        $scope.onSelect = function($item, $model, $label) {}
        $scope.TransRContainerMuseumKeyup = function(viewValue) {
            return $http.get('./assets/views/action/ReturnLocateBox.php?sTransRCont=' + viewValue).then(function(res) {
                return res.data;
            });
        }
        $scope.TransRContainerKeyup = function(viewValue) {
            return $http.get('./assets/views/action/ReturnLocateBox.php?sTransRCont=' + viewValue).then(function(res) {
                return res.data;
            });
        }
        $scope.TransContainerKeyup = function(viewValue) {
            return $http.get('./assets/views/action/ReturnLocateBox.php?sTransCont=' + viewValue).then(function(res) {
                return res.data;
            });
        }
        $scope.TransLockerKeyup = function(viewValue) {
            var a = $scope.transcontainer.cabinet_id;
            console.log(a)
            return $http.get('./assets/views/action/ReturnLocateBox.php?sTransLock=' + viewValue + '&&sTransCont=' + a).then(function(res) {
                return res.data;
            });
        }
        $scope.TransDrawerKeyup = function(viewValue) {
            var a = $scope.translocker.subcabinet_id;
            console.log(a)
            return $http.get('./assets/views/action/ReturnLocateBox.php?sTransDraw=' + viewValue + '&&sTransLock=' + a).then(function(res) {
                return res.data;
            });
        }
        $scope.TransDrawerKeyup = function(viewValue) {
            var a = $scope.translocker.subcabinet_id;
            console.log(a)
            return $http.get('./assets/views/action/ReturnLocateBox.php?sTransDraw=' + viewValue + '&&sTransLock=' + a).then(function(res) {
                return res.data;
            });
        }
        $scope.ctrans_rcontainer = function() {
            $scope.translocker = {
                subcabinet_id: '',
                sub_cabinet: '',
                cabinet_cabinet_id: ''
            };
            $scope.transdrawer = {
                spec_box_id: '',
                spec_box: '',
                subcabinet_subcabinet_id: ''
            };
        };
        $scope.ctrans_container = function() {
            $scope.translocker = {
                subcabinet_id: '',
                sub_cabinet: '',
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
        /** auto complete specimens details **/
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
    }
]);