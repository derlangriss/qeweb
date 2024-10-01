'use strict';
/**   
 * controllers for GoogleMap  
 * AngularJS Directive  
 */
app.controller("FormlabelmanagementCtrl", ["$scope", "$http", "$timeout", "$stateParams", "$state", "SweetAlert", "info", "printsum", "ngNotify", "ServicePDF", "$aside", "$element", 'toaster',
    function($scope, $http, $timeout, $stateParams, $state, SweetAlert, info, printsum, ngNotify, ServicePDF, $aside, $element, toaster, ) {

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
        $scope.ldloading = {};
        $scope.clickBtn = function(style) {
            $scope.ldloading[style.replace('-', '_')] = true;
            /*
            $timeout(function() {
                $scope.ldloading[style.replace('-', '_')] = false;
            }, 2000);*/
        };
        printsum.totaldata("specimens").success(function(labelcalculate) {
            $scope.totallabelcollection = labelcalculate[0].totallabel;
            $scope.papersizecollection = labelcalculate[0].totalpapersize;
        })
        $scope.countSpecimenslabel = function(m, y, container_type, container_id) {
            $http({
                method: 'GET',
                url: 'assets/views/action/countSpecimens.php',
                params: {
                    month: m,
                    year: y,
                    tcontainer_type: container_type,
                    tcontainer_id: container_id
                }
            }).success(function(response) {
                $scope.resspecimens = response[0].resspecimens
                $scope.labelallspecimens = response[0].allspecimens
                $scope.resspeconresroom = response[0].resspeconresroom
                $scope.allspecimensresroom = response[0].allspecimensresroom
                $scope.undefinedspecimens = response[0].undefinedspecimens
                $scope.countregist = response[0].countregist
                $scope.countmanaged = response[0].countmanaged
                $scope.countfamily = response[0].countfamily
                $scope.InBoxAllShowDetails = response[0].specinbox
                $scope.InBoxUndefinedShowDetails = response[0].undefinedspecinbox
                $scope.BoxShowDetailsCount = response[0].specinbox
                $scope.BoxShowDetailsStatus = response[0].boxstatus
                $scope.boxstatus_id = response[0].boxstatus
                if ($scope.BoxShowDetailsStatus == 1) {
                    $scope.FullBoxModel = 'fa-star-o'
                }
                if ($scope.BoxShowDetailsStatus == 2) {
                    $scope.FullBoxModel = 'fa-star'
                }
                if ($scope.BoxShowDetailsStatus == 3) {
                    $scope.FullBoxModel = 'fa-star-half-o'
                }
                var all = response[0].allspecimens
                var undefined = response[0].undefinedspecimens
                var calculate = (undefined / all) * 100
                $scope.undefinedcal = calculate.toFixed(2);
                $scope.value2 = $scope.resspeconresroom;
                var realtint = $scope.allspecimens
                $scope.options2.min = 0;
                $scope.options2.max = parseInt(realtint)
            });
        }
        $scope.LabelformatDateReport = function(datereport) {
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
        var monthshow = $stateParams.monthid;
        var yearshow = $stateParams.yearid;
        var monthdis = monthshow - 1;
        var datereport = new Date(yearshow, monthdis);
        $scope.monthshow01 = $scope.LabelformatDateReport(datereport);
        /* DOWNLOAD PDF */
        var datenow = new Date();
        var name = "Label";
        var getyear = datenow.getFullYear();
        var getdate = datenow.getDate();
        var getmonth = monthstr();
        var gethours = datenow.getHours();
        var getsecond = datenow.getSeconds();
        var getMilliseconds = datenow.getMilliseconds();
        var filename = name.concat(getyear, getmonth, getdate, gethours, getsecond, getMilliseconds);
        console.log(filename)
        $scope.options2 = {
            readOnly: true,
            subText: {
                enabled: true,
                text: 'SPEC uploaded',
                color: 'gray',
                font: 'auto'
            },
            trackWidth: 10,
            size: 100,
            barWidth: 15,
            trackColor: '#656D7F',
            max: 1000,
            barColor: '#2CC185'
        };
        $scope.PrintReport = function(reporttype, style) {
            var datenow = new Date();
            var name = "Report";
            var getyear = datenow.getFullYear();
            var getdate = datenow.getDate();
            var getmonth = monthstr();
            var gethours = datenow.getHours();
            var getsecond = datenow.getSeconds();
            var getMilliseconds = datenow.getMilliseconds();
            var filename = name.concat('Report', getyear, getmonth, getdate, gethours, getsecond, getMilliseconds);
            var value = 0
            var fileName = filename + ".pdf";
            var a = document.createElement("a");
            document.body.appendChild(a);
            var tmreport_date = getIfNotSet($scope.mreport_date, '', true);
            $scope.ldloading[style.replace('-', '_')] = true;
            $timeout(function() {
                ServicePDF.downloadReport(reporttype, monthshow, yearshow).then(function(result) {
                    console.log(result);
                    var file = new Blob([result.data], {
                        type: 'application/pdf'
                    });
                    var fileURL = window.URL.createObjectURL(file);
                    a.href = fileURL;
                    a.download = fileName;
                    a.click();
                    $scope.ldloading[style.replace('-', '_')] = false;
                });
            }, 2000);
        }
        $scope.countSpecimenslabel(monthshow, yearshow, null, null);
        $scope.SelectSpecimensList = function(m, y) {
            var mode = 'SELECT'
            var data = $.param({
                tMonth: m,
                tYear: y,
                tMode: mode
            });
            $http({
                method: 'POST',
                url: 'assets/views/action/dbSelectSpecimensList.php',
                data: data,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
            }).success(function(response) {
                $scope.SpecimensReportList = response;
                /*
                $scope.subcabinetname = $scope.GetSubCabinetContainerList[0].sub_cabinet*/
            });
        }
        $scope.SelectSpecimensList(monthshow, yearshow)

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
                $state.go('app.specimens.managespec.labelmanagement', {
                    "monthid": month,
                    "yearid": year
                })
            }
        };
        /*endctrl */
        function removeSpinner() {
            this.removeClass(csspinnerClass)
        }
        var refreshEvent = "panel-refresh",
            csspinnerClass = "csspinner",
            defaultSpinner = "load1";
        var previousWindowKeyDown = window.onkeydown;
        $scope.DownloadPDF = function(labeltype) {
            var $this = $('#LabelPrintQueueTbl'),
                panel = $this.parents(".panel").eq(0),
                spinner = $this.data("spinner") || defaultSpinner;
            panel.addClass(csspinnerClass + " " + spinner)
            var value = 0
            var fileName = filename + ".pdf";
            var a = document.createElement("a");
            document.body.appendChild(a);
            $timeout(function() {
                ServicePDF.downloadPdf(labeltype).then(function(result) {
                    console.log(result);
                    var file = new Blob([result.data], {
                        type: 'application/pdf'
                    });
                    var fileURL = window.URL.createObjectURL(file);
                    a.href = fileURL;
                    a.download = fileName;
                    a.click();
                    // $scope.cleardata('specimens');
                    $scope.totallabelcollection = 0;
                    $scope.papersizecollection = 0;
                    $scope.getcollection = [];
                    panel.removeSpinner = removeSpinner, $this.trigger(refreshEvent, [panel])
                });
            }, 2000);
        }
        $scope.cleardata = function(labeltype) {
            var data = $.param({
                tlabel_type: labeltype,
                taction: 'CLEARALL'
            });
            $http({
                method: 'POST',
                url: "assets/views/action/clearlabelqueue.php",
                data: data,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
            }).success(function(response) {
                if (response[0].success == 1) {
                    tableLabelPrintQueue.draw();
                    tableLabelList.draw();
                    printsum.totaldata("specimens").success(function(labelcalculate) {
                        $scope.totallabelcollection = labelcalculate[0].totallabel;
                        $scope.papersizecollection = labelcalculate[0].totalpapersize;
                    });
                }
            });
        }
        $scope.EditSpecimens = function(action, form) {
            var data;
            var speicmensids = dataarrlabellist;
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
                                dataarrlabellist = [];
                                tableLabelList.draw(false);
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
                                    tableSpecimensBox.draw();
                                    tableLabelList.draw();
                                    $scope.countSpecimenslabel(monthshow, yearshow, container_type, container_id);
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
                                        tableLabelList.draw();
                                        tableSpecimensBox.draw();
                                        $scope.countSpecimenslabel(monthshow, yearshow, container_type, container_id);
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
                var speicmensidsfrombox = dataarr;
                var cbox = JSON.stringify(speicmensidsfrombox);
                var container_id = getIfNotSet($scope.BoxShowDetailsBoxid, '', true);
                var container_type = 2;
                var report_month = getIfNotSet($stateParams.monthid, '0', true);
                var report_year = getIfNotSet($stateParams.yearid, '0', true);
                var data = $.param({
                    taction: action,
                    tspecimens_ids: cbox,
                    tcontainer_id: container_id,
                    tcontainer_type: container_type,
                    treport_month: report_month,
                    treport_year: report_year
                });
                if (typeof speicmensidsfrombox !== 'undefined' && speicmensidsfrombox.length > 0 && report_month !== '0' && report_year !== '0') {
                    $http({
                        method: 'POST',
                        url: "assets/views/action/dbUpdate_resspec.php",
                        data: data,
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        },
                    }).success(function(response) {
                        window.onkeydown = previousWindowKeyDown;
                        if (response[0].success == 0) {} else {
                            $scope.countSpecimenslabel(monthshow, yearshow, null, null);
                            dataarr = [];
                            tableLabelList.draw();
                            tableSpecimensBox.draw();
                            LabelPrintQueueTbl.draw();
                            $("#checkitem").removeClass('fa-check-square-o');
                            $("#checkitem").addClass('fa-square-o');
                            console.log("sompong");
                        }
                    });
                } else {
                    alert('Please Select Item');
                }
            }
            if (action == "REMOVEALL") {
                var container_type = 1;
                var museum_status = 0;
                var report_month = getIfNotSet($stateParams.monthid, '0', true);
                var report_year = getIfNotSet($stateParams.yearid, '0', true);
                var data = $.param({
                    taction: action,
                    tcontainer_id: container_id,
                    tmuseum_status: museum_status,
                    tcontainer_type: container_type,
                    treport_month: report_month,
                    treport_year: report_year
                });
                SweetAlert.swal({
                    title: "Are you sure?",
                    text: "All items in list will be remove!",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Yes, Remove it!",
                    cancelButtonText: "No, Cancel plx!",
                    closeOnConfirm: true,
                    closeOnCancel: true
                }, function(isConfirm) {
                    if (isConfirm) {
                        SweetAlert.swal({
                            title: "Remove!",
                            text: "Your imaginary file has been Remove.",
                            type: "success",
                            confirmButtonColor: "#007AFF"
                        }, function(isConfirm) {
                            $scope.cleardata('specimens');
                        });
                    } else {
                        SweetAlert.swal({
                            title: "Cancelled",
                            text: "Your Desire is cancelled :)",
                            type: "error",
                            confirmButtonColor: "#007AFF"
                        });
                    }
                });
            }
            if (action == "REMOVEFROMMUSEUM") {
                var speicmensidsfrombox = dataarrmuseum;
                var abox = JSON.stringify(speicmensidsfrombox);
                var container_id = getIfNotSet($scope.BoxShowDetailsBoxid, '', true);
                var container_type = 1;
                var museumstatus = 1;
                var report_month = getIfNotSet($stateParams.monthid, '0', true);
                var report_year = getIfNotSet($stateParams.yearid, '0', true);
                data = $.param({
                    taction: action,
                    tspecimens_ids: abox,
                    tcontainer_id: container_id,
                    tcontainer_type: container_type,
                    tmuseumstatus: museumstatus,
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
                                url: "assets/views/action/dbUpdate_museum_status.php",
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
                                    tableSpecMuseumList.draw(false);
                                    $scope.countSpecimenslabel($stateParams.monthid, $stateParams.yearid, null, null);
                                    $scope.ViewBoxQTYtransList();
                                    $("#checkitemmuseumeach").addClass('fa-square-o');
                                    $("#checkitemmuseumeach").removeClass('fa-check-square-o');
                                    dataarrmuseum = [];
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
            if (action == "REMOVESELECTED") {
                var speicmensidsfrombox = dataarrmuseumrest;
                var abox = JSON.stringify(speicmensidsfrombox);
                var container_id = getIfNotSet($scope.BoxShowDetailsBoxid, '', true);
                var container_type = 1;
                var report_month = getIfNotSet($stateParams.monthid, '0', true);
                var report_year = getIfNotSet($stateParams.yearid, '0', true);
                data = $.param({
                    taction: action,
                    tspecimens_ids: abox,
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
                                url: "assets/views/action/dbUpdate_museum_status.php",
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
                                    dataarrmuseumrest = [];
                                    LabelPrintQueueTbl.draw(false);
                                    tableLabelList.draw(false);
                                    $scope.countSpecimenslabel(monthshow, yearshow, null, null);
                                    $("#checkitemres").removeClass('fa-check-square-o');
                                    $("#checkitemres").addClass('fa-square-o');
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
        $scope.insertprintqueue = function(action, form) {
            var data;
            var specinfo = dataarrlabellist;
            var a = JSON.stringify(specinfo);
            var b = "specimens";
            var c = $scope.uid;
            var previousWindowKeyDown = window.onkeydown;
            if (action == "save") {
                var action = "save";
                var data = $.param({
                    tspecimens_ids: a,
                    tlabel_type: b,
                    user_request: c,
                    action: action
                });
                if (specinfo.length !== 0) {
                    SweetAlert.swal({
                        title: "Are you sure?",
                        text: "Your Selected Item wil be add to print queue!!",
                        type: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "Yes, save it!",
                        cancelButtonText: "No, cancel plx!",
                        closeOnConfirm: true,
                        closeOnCancel: true
                    }, function(isConfirm) {
                        if (isConfirm) {
                            $http({
                                method: 'POST',
                                url: "assets/views/action/LabelPrintQueue.php",
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
                                    if (response[0].success == "1") {
                                        if (action == "save") {
                                            printsum.totaldata("specimens").success(function(labelcalculate) {
                                                $scope.totallabelcollection = labelcalculate[0].totallabel;
                                                $scope.papersizecollection = labelcalculate[0].totalpapersize;
                                            });
                                        }
                                        dataarrlabellist = [];
                                        tableLabelList.rows('.selected').deselect();
                                        $("#checkitem").addClass('fa-square-o');
                                        $("#checkitem").removeClass('fa-check-square-o');
                                        tableLabelList.draw(false);
                                    } else if (response[0].success == "0") {}
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
                    SweetAlert.swal({
                        title: "Cancelled",
                        text: "No Label Selected",
                        type: "error",
                        confirmButtonColor: "#007AFF"
                    });
                }
            } else if (action == "delete") {
                alert("No script")
            } else if (action == "saveall") {
                var b = "specimens";
                var c = $scope.uid;
                var data = $.param({
                    tmonth: monthshow,
                    tyear: yearshow,
                    tlabel_type: b,
                    user_request: c,
                    action: action
                });
                SweetAlert.swal({
                    title: "Are you sure?",
                    text: "Add All Item in tabel to print queue!!",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Yes, add all item!",
                    cancelButtonText: "No, cancel plx!",
                    closeOnConfirm: true,
                    closeOnCancel: true
                }, function(isConfirm) {
                    if (isConfirm) {
                        $http({
                            method: 'POST',
                            url: "assets/views/action/LabelPrintQueue.php",
                            data: data,
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            },
                        }).success(function(response) {
                            SweetAlert.swal({
                                title: "Success!",
                                text: "Your imaginary label has been Added.",
                                type: "success",
                                confirmButtonColor: "#007AFF"
                            }, function(isConfirm) {
                                if (response[0].success == "1") {
                                    if (action == "saveall") {
                                        printsum.totaldata("specimens").success(function(labelcalculate) {
                                            $scope.totallabelcollection = labelcalculate[0].totallabel;
                                            $scope.papersizecollection = labelcalculate[0].totalpapersize;
                                        });
                                    }
                                    dataarrlabellist = [];
                                    tableLabelList.rows('.selected').deselect();
                                    $("#checkitem").addClass('fa-square-o');
                                    $("#checkitem").removeClass('fa-check-square-o');
                                    tableLabelList.draw(false);
                                    tableLabelPrintQueue.draw();
                                } else if (response[0].success == "0") {}
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
        }
        $scope.tab = 1;
        $scope.setTab = function(newTab) {
            var Boxidmodel = getIfNotSet($scope.BoxShowDetailsBoxid, 0, true);
            if (newTab == 2) {
                tableLabelList.draw(false);
            }
            if (newTab == 3) {
                tableLabelPrintQueue.draw()
            }
            $scope.tab = newTab;
        };
        $scope.isSet = function(tabNum) {
            return $scope.tab === tabNum;
        };
        var dataarrlabellist = [];
        $.fn.dataTable.ext.buttons.addtoprintqueue = {
            className: 'buttons-alert',
            action: function(e, dt, node, config) {
                $scope.insertprintqueue('save', 'specimens_printqueue')
            }
        };
        $.fn.dataTable.ext.buttons.addalltoprintqueue = {
            className: 'buttons-alert',
            action: function(e, dt, node, config) {
                $scope.insertprintqueue('saveall', 'specimens_printqueue')
            }
        };
        $.fn.dataTable.ext.buttons.deletelabel = {
            className: 'buttons-alert',
            action: function(e, dt, node, config) {
                $scope.EditSpecimens('DELETE', 'specimens_form')
            }
        };
        $.fn.dataTable.ext.buttons.btnprintqueue = {
            className: 'buttons-alert',
            action: function(e, dt, node, config) {
                $scope.DownloadPDF('specimens');
            }
        };
        var tableLabelList = $('#LabelListTbl').DataTable({
            "processing": true,
            "serverSide": true,
            "ajax": {
                "url": "assets/scripts/server_processing_labelmanage.php",
                "type": "POST",
                "data": function(d) {
                    d.treport_month = getIfNotSet($stateParams.monthid, '', true);
                    d.treport_year = getIfNotSet($stateParams.yearid, '', true);
                }
            },
            "createdRow": function(row, data, index) {
                var datereport = new Date(data[4]);
                var convertdate = $scope.LabelformatDateReport(datereport);
                if (data[4] !== '') {
                    $('td:eq(3)', row).html('<span class="badge badge-info">' + convertdate + '</span>');
                }
                if (data[5] === true) {
                    $('td:eq(4)', row).html('<span class="badge badge-info">' + 'N' + '</span>');
                } else {
                    console.log(data[5])
                    $('td:eq(4)', row).html('<span class="badge badge-danger">' + 'P' + '</span>');
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
                text: '<i id="checkitem" class="fa fa-square-o"></i>',
                action: function(row) {
                    $(row).removeClass('selected');
                    if (dataarrlabellist.length > 0) {
                        tableLabelList.rows().deselect();
                        $("#checkitem").addClass('fa-square-o');
                        $("#checkitem").removeClass('fa-check-square-o');
                        dataarrlabellist = [];
                    } else {
                        tableLabelList.rows().select();
                        $(row).addClass('selected');
                        var data = tableLabelList.rows('.selected').select().data();
                        $("#checkitem").removeClass('fa-square-o');
                        $("#checkitem").addClass('fa-check-square-o');
                        for (var i = 0; i < data.length; i++) {
                            var rowid = data[i]['DT_RowId'];
                            /*console.log(rowid)
                            var rowidres = rowid.substring(4);*/
                            dataarrlabellist.push(rowid);
                        }
                        return dataarrlabellist;
                    }
                },
                className: 'btn btn-wide-40',
                enabled: true
            }, {
                text: '<i class="fa fa-repeat"></i>',
                action: function(row) {
                    tableLabelList.draw(false)
                },
                className: 'btn btn-wide-40 btn-transparent',
                enabled: true
            }, {
                extend: 'addtoprintqueue',
                text: '<i class="fa fa-share-square-o"></i>',
                className: 'btn btn-wide-40 btn-transparent',
                enabled: true
            }, {
                extend: 'addalltoprintqueue',
                text: '<i class="fa fa-share-square"></i>',
                className: 'btn btn-wide-40 btn-transparent',
                enabled: true
            }, {
                extend: 'deletelabel',
                text: '<i class="fa fa-trash"></i>',
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
                "width": "20%",
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
                "width": "15%",
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
                render: function(data, type, full, meta) {
                    return '<a ' + 'class="single-print no-padding margin-right-5 btn btn-transparent btn-xs"' + '>' + '<i class="' + 'fa fa-arrow-circle-right' + '"></i>' + '</a>' + '<a ' + 'class="labeldel btn-transparent no-padding  btn-xs"' + '>' + '<i class="' + 'fa fa-trash fa fa-white' + '"></i>' + '</a>';
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
        $('#LabelListTbl tbody').on('click', '.select-checkbox', function() {
            var tr = $(this).closest('tr');
            var data = tableLabelList.row($(this).closest('tr')).data();
            var idres = data.DT_RowId;
            var index = $.inArray(idres, dataarrlabellist);
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
                dataarrlabellist.push(idres);
            } else {
                dataarrlabellist.splice(index, 1);
            }
            if ($(tr).hasClass('selected')) {
                $(tr).removeClass('selected');
                tableLabelList.rows($(this).closest('tr')).deselect();
            } else {
                $(tr).addClass('selected');
            }
        });
        $('#LabelListTbl tbody').on('click', '.labeldel', function() {
            var action = "DELETE"
            var dataarrlabel = [];
            var tr = $(this).closest('tr');
            var data = tableLabelList.row($(this).closest('tr')).data();
            var idres = data.DT_RowId;
            dataarrlabel.push(idres);
            var dataparam;
            var speicmensid = dataarrlabel;
            var a = JSON.stringify(speicmensid);
            if (action == "DELETE") {
                data = $.param({
                    taction: 'DELETE',
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
                    closeOnConfirm: true,
                    closeOnCancel: true
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
                                dataarrlabellist = [];
                                tableLabelList.draw(false);
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
        });
        $('#LabelListTbl tbody').on('click', '.single-print', function() {
            var action = "singlelabel"
            var tr = $(this).closest('tr');
            var rowdata = tableLabelList.row($(this).closest('tr')).data();
            var a = rowdata.DT_RowId;
            var b = "specimens";
            var c = $scope.uid;
            var data = $.param({
                tsinglespecimens_ids: a,
                tlabel_type: b,
                user_request: c,
                action: action
            });
            $http({
                method: 'POST',
                url: "assets/views/action/LabelPrintQueue.php",
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
                    if (response[0].success == "1") {
                        if (action == "save") {
                            printsum.totaldata("specimens").success(function(labelcalculate) {
                                $scope.totallabelcollection = labelcalculate[0].totallabel;
                                $scope.papersizecollection = labelcalculate[0].totalpapersize;
                            });
                        }
                        dataarrlabellist = [];
                        tableLabelList.rows('.selected').deselect();
                        $("#checkitem").addClass('fa-square-o');
                        $("#checkitem").removeClass('fa-check-square-o');
                        tableLabelList.draw(false);
                    } else {
                        alert("unexpected error occured, Please check your database connection");
                    }
                });
            })
            /*

            dataarrlabellist*/
        });
        $.fn.dataTable.ext.buttons.removeall = {
            className: 'buttons-alert',
            action: function(e, dt, node, config) {
                $scope.EditSpecimens('REMOVEALL', 'specimens_form')
            }
        };
        var dataarrlabelQueue = [];
        var tableLabelPrintQueue = $('#LabelPrintQueueTbl').DataTable({
            "processing": true,
            "serverSide": true,
            "ajax": {
                "url": "assets/scripts/server_processing_printqueue.php",
                "type": "POST",
                "data": function(d) {
                    d.treport_month = getIfNotSet($stateParams.monthid, '0', true);
                    d.treport_year = getIfNotSet($stateParams.yearid, '0', true);
                    d.tcontainer_type = $scope.container_typemuseumrest
                }
            },
            "createdRow": function(row, data, index) {
                if (data[1] == 'Unknown') {
                    $(row).addClass('highlight');
                }
            },
            "rowCallback": function(row, data) {
                var rowid = data.DT_RowId;
                if ($.inArray(rowid, dataarrlabelQueue) !== -1) {
                    $(row).addClass('selected');
                }
            },
            stateSaveCallback: function(settings, data) {
                localStorage.setItem('DataTables_' + settings.sInstance, JSON.stringify(data))
            },
            stateLoadCallback: function(settings) {
                return JSON.parse(localStorage.getItem('DataTables_' + settings.sInstance))
            },
            "dom": "<'row'<'col-sm-6'B><'col-sm-6'p>>" + "<'row'<'col-sm-12 margin-bottom-10'tr>>" + "<'row'<'col-sm-12'>>",
            renderer: 'bootstrap',
            "scrollCollapse": true,
            "lengthMenu": [
                [7, 10, 15],
                ['7 rows', '10 rows', '15 rows']
            ],
            "buttons": [{
                text: '<i class="fa fa-repeat"></i>',
                action: function(row) {
                    tableLabelPrintQueue.draw(false)
                },
                className: 'btn btn-wide-40 btn-transparent',
                enabled: true
            }, {
                text: '<i class="fa fa-reply-all"></i>',
                className: 'btn btn-wide-40 btn-transparent',
                extend: 'removeall',
                enabled: true
            }, {
                text: '<i class="fa fa-print"></i>',
                className: 'btn btn-wide-40 btn-transparent',
                extend: 'btnprintqueue',
                enabled: true
            }],
            "pagingType": "input",
            "columns": [{
                "class": "text-center",
                "orderable": false,
                "data": null,
                "defaultContent": ""
            }, {
                "data": "0",
                "width": "80%",
                "orderable": false
            }, {
                "class": "",
                "data": "1",
                "width": "10%",
                "orderable": false,
                "visible": false
            }, {
                "data": "2",
                "width": "20%",
                "orderable": false,
                "visible": false
            }, {
                "data": "3",
                "orderable": false,
                "visible": false
            }, {
                "data": "4",
                "visible": false
            }, {
                "data": "5",
                "visible": false
            }, {
                "data": "6",
                "visible": false
            }, {
                "data": "7",
                "visible": false
            }, {
                "data": "8",
                "visible": false
            }, {
                "data": "9",
                "visible": false
            }],
            "columnDefs": [{
                render: function(data, type, full, meta) {
                    return '<a ' + 'class="removequeue btn-transparent no-padding  btn-xs"' + '>' + '<i class="' + 'fa fa-times fa fa-white' + '"></i>' + '</a>';
                },
                targets: 0
            }],
            "order": [
                [6, 'asc'],
                [7, 'asc'],
                [5, 'asc']
            ]
        });
        $('#LabelPrintQueueTbl tbody').on('click', '.removequeue', function() {
            var action = "removequeue"
            var tr = $(this).closest('tr');
            var rowdata = tableLabelPrintQueue.row($(this).closest('tr')).data();
            var a = rowdata.DT_RowId;
            var data = $.param({
                tspecimens_id: a,
                taction: 'CLEAR'
            });
            $http({
                method: 'POST',
                url: "assets/views/action/clearlabelqueue.php",
                data: data,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
            }).success(function(response) {
                $scope.pop();
                tableLabelPrintQueue.draw();
                printsum.totaldata("specimens").success(function(labelcalculate) {
                    $scope.totallabelcollection = labelcalculate[0].totallabel;
                    $scope.papersizecollection = labelcalculate[0].totalpapersize;
                });
                /*
                if (response[0].success == 1) {
                    tableLabelPrintQueue.draw();
                    tableLabelList.draw();
                    printsum.totaldata("specimens").success(function(labelcalculate) {
                        $scope.totallabelcollection = labelcalculate[0].totallabel;
                        $scope.papersizecollection = labelcalculate[0].totalpapersize;
                    });
                }*/
            });
        });
        $scope.toaster = {
            type: 'warning',
            title: 'Remove Label',
            text: 'Success'
        };
        $scope.pop = function() {
            toaster.pop($scope.toaster.type, $scope.toaster.title, $scope.toaster.text);
        };
    }
]);