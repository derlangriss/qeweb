'use strict';
/**   
 * controllers for GoogleMap  
 * AngularJS Directive  
 */
app.controller("FormlabelmanagementCtrl", ["$scope", "$http", "$timeout", "$stateParams", "$state", "SweetAlert", "info", "printsum", "ngNotify", "ServicePDF", "$aside", "$element",
    function($scope, $http, $timeout, $stateParams, $state, SweetAlert, info, printsum, ngNotify, ServicePDF, $aside, $element) {
        printsum.totaldata("specimens").success(function(labelcalculate) {
            $scope.totallabelcollection = labelcalculate[0].totallabel;
            $scope.papersizecollection = labelcalculate[0].totalpapersize;
        })
        $scope.spinner = {
            active: false,
            on: function() {
                this.active = true;
            },
            off: function() {
                this.active = false;
            }
        };
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
        /* INSERT PRINT QUEUE */
        $scope.insertNewLabelqueue = function(action, form) {
          
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
            } else if (action == "delete") {
                var data = "action=" + action + "&item_id=" + id;
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
                                    $scope.loadData('specimens');
                                }
                                dataarrlabellist = [];
                                tableLabelList.rows('.selected').deselect();
                                tableLabelList.draw(false);
                            } else {
                                alert("unexpected error occured, Please check your database connection");
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
            } else if (action == "delete") {
                var data = "action=" + action + "&item_id=" + id;
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
                                    $scope.loadData('specimens');
                                }
                                dataarrlabellist = [];
                                tableLabelList.rows('.selected').deselect();
                                tableLabelList.draw(false);
                            } else {
                                alert("unexpected error occured, Please check your database connection");
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
        }
        /* LOAD DATA TO LIST */
        $scope.loadData = function(type) {
            var dataHandler = $(".user_profile_list_a");
            dataHandler.html("");
            var data = $.param({
                tlabel_type: type
            });
            $http({
                method: 'POST',
                url: "assets/views/action/PrintQueueSpec.php",
                data: data,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
            }).success(function(response) {
                $scope.data = response;
                angular.forEach($scope.data, function(value, key) {
                    if (value.printed_list == 't') {
                        var newRow = $("<li class='list-group-item-printed'>");
                    } else {
                        console.log("sompong");
                        var newRow = $("<li>");
                    }
                    newRow.html("<a href='javascript:void(0)'><img src='" + $scope.avartar + "' alt='' height='38' width='38'><p>" + value.specimens_full_number + "<br><a id='" + value.label_id_to_print + "'class='del'>Delete</a></p></a>");
                    dataHandler.append(newRow);
                });
                tableLabelList.draw();
            });
            /*

                        var data = "tlabel_type=" + type;
                        $.ajax({
                            type: "POST",
                            data: data,
                            url: "assets/views/action/PrintQueueSpec.php",
                            success: function(result) {
                                var resultObj = JSON.parse(result);
                                $.each(resultObj, function(key, val) {
                                    var newRow = $("<li>");
                                    newRow.html("<a href='javascript:void(0)'><img src='" + $scope.avartar + "' alt='' height='38' width='38'><p>" + val.specimens_full_number + "<br><a id='" + val.label_id_to_print + "'class='del'>Delete</a></p></a>");
                                    dataHandler.append(newRow);
                                });
                                tableLabelList.draw();
                            }
                        });*/
        }
        $scope.LabelWaringModel = 'label-default'
        $scope.BoxShowDetailsUser = 'NA'
        $scope.FullBoxModel = 'fa-star-o'
        $scope.BoxShowDetailsCount = 0
        $scope.BoxShowDetailsBoxno = 'Non Selected'
        $scope.jqueryScrollbarOptions = {
            "onScroll": function(y, x) {
                if (y.scroll == y.maxScroll) {}
            }
        };
        $scope.BoxidShowModel = 0;
        $scope.updatetype = 0
        $scope.InBoxAllShowDetails = 0
        $scope.InBoxUndefinedShowDetails = 0
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
                    $scope.GETAllundefinedbox = result[0].countundefinedspec;
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
        $scope.BoxShowModel = "SelectBox"
        $scope.specdata = {};
        $scope.savetype = 1;
        $scope.typespecimen = 0;
        $scope.numberOFrecord = 1;
        $scope.currentStep = 1;
        $scope.BoxShowcountspecinboxModel = 0;
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
        $scope.countSpecimens = function(m, y, container_type, container_id) {
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
                $scope.allspecimens = response[0].allspecimens
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
        $scope.countSpecimens(monthshow, yearshow, null, null);

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
        $scope.obj = {
            value1: 1,
            value2: false
        }
        $scope.checkValue1 = function() {
            return $scope.obj.value1 === 'someothervalue';
        }
        $scope.tab = 1;
        $scope.changestyle = function(tabno) {
            return $scope.obj.value1 === tabno;
        };
        $scope.setTabdrawerid = function(newTab, drawercode, drawerid) {
            var Boxidmodel = getIfNotSet($scope.BoxShowDetailsBoxid, 0, true);
            if (newTab == 1) {
                tableLabelList.draw(false);
            }
            if (newTab == 2) {
                $scope.transRcontainerMuseum = {
                    spec_box_id: drawerid,
                    spec_box_code: drawercode
                };
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
        $scope.setTab = function(newTab) {
            var Boxidmodel = getIfNotSet($scope.BoxShowDetailsBoxid, 0, true);
            if (newTab == 1) {
                tableLabelList.draw(false);
            }
            if (newTab == 2) {
                tableLabelPrintQueue.draw()
            }
            if (newTab == 3) {
                tableSpecMuseumList.draw()
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
        /** set tab container **/
        $scope.objcontainer = {
            value1: 1,
            value2: false
        }
        $scope.checkValue1container = function() {
            return $scope.obj.value1 === 'someothervalue';
        }
        $scope.tabcontainer = 1;
        $scope.changestylecontainer = function(tabno) {
            return $scope.objcontainer.value1 === tabno;
        };
        $scope.setTabcontainer = function(newTab) {
            $scope.tabcontainer = newTab;
            $scope.obj.value1container = newTab;
        };
        $scope.isSetcontainer = function(tabNum) {
            return $scope.tabcontainer === tabNum;
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
        $scope.reportModel = ''
        $scope.changeDateMonth = function() {
            var month = getIfNotSet($scope.reportmonth, '0', true);
            var year = getIfNotSet($scope.reportyear, '0', true);
            if (month && year !== '0') {
                $state.go('app.museum.transfer_specimens', {
                    "monthid": month,
                    "yearid": year
                })
            }
        };
        $scope.changetable = function(tabletype) {
            if (tabletype == 'monthreport') {
                $stateParams.monthid = $scope.tmonth
                $stateParams.yearid = $scope.tyear
                tableLabelList.draw();
            }
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
                                        tableLabelList.draw();
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
                            $scope.countSpecimens(monthshow, yearshow, null, null);
                            dataarr = [];
                            tableLabelList.draw();
                            tableSpecimensBox.draw();
                            LabelPrintQueueTbl.draw();
                            $("#checkitem").removeClass('fa-check-square-o');
                            $("#checkitem").addClass('fa-square-o');
                            console.log("sompong");
                        }
                    });
                    /**
                    if (typeof speicmensidsfrombox !== 'undefined' && speicmensidsfrombox.length > 0 && report_month !== '0' && report_year !== '0') {
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
                                url: "assets/views/action/dbUpdate_resspec.php",
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
                                        LabelPrintQueueTbl.draw();
                                        $("#checkitem").removeClass('fa-check-square-o');
                                        $("#checkitem").addClass('fa-square-o');
                                        
                                        $scope.countSpecimens(monthshow, yearshow, container_type, container_id);
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
                    });*/
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
                    text: "Do you want to remove all items!",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Yes, Remove it!",
                    cancelButtonText: "No, Cancel plx!",
                    closeOnConfirm: false,
                    closeOnCancel: false
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
                                    $scope.countSpecimens($stateParams.monthid, $stateParams.yearid, null, null);
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
                                    $scope.countSpecimens(monthshow, yearshow, null, null);
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
        /** download pdf **/
        $scope.cleardata = function(labeltype) {
            var data = $.param({
                tlabel_type: labeltype
            });
            $http({
                method: 'POST',
                url: "assets/views/action/cleardata.php",
                data: data,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
            }).success(function(response) {
                if (response[0].success == 1) {
                    tableLabelPrintQueue.draw();
                }
            });
        }
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
                    $scope.cleardata('specimens');
                    $scope.totallabelcollection = 0;
                    $scope.papersizecollection = 0;
                    $scope.getcollection = [];
                    panel.removeSpinner = removeSpinner, $this.trigger(refreshEvent, [panel])
                });
            }, 2000);
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
        $.fn.dataTable.ext.buttons.fromrestomuseum = {
            className: 'buttons-alert',
            action: function(e, dt, node, config) {
                $scope.setTab(4)
            }
        };
        $.fn.dataTable.ext.buttons.removeall = {
            className: 'buttons-alert',
            action: function(e, dt, node, config) {
                $scope.EditSpecimens('REMOVEALL', 'specimens_form')
            }
        };
        $.fn.dataTable.ext.buttons.removeselected = {
            className: 'buttons-alert',
            action: function(e, dt, node, config) {
                $scope.EditSpecimens('REMOVESELECTED', 'specimens_form')
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
                extend: 'removespec',
                text: 'Remove From Box',
                className: 'btn btn-primary btn-wide btn-scroll btn-scroll-top fa fa-tag',
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
        var dataarrlabellist = [];
        $scope.ctype_resroom = 1 /* container_type */
        $scope.museumstatus = 0 /* specimens in res shopping cart that's not in museum yet */
        $.fn.dataTable.ext.buttons.addtoprintqueue = {
            className: 'buttons-alert',
            action: function(e, dt, node, config) {
                $scope.insertprintqueue('save', 'specimens_printqueue')
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
                /*
                $scope.EditSpecimens('DELETE', 'specimens_form')*/
            }
        };
        var tableLabelList = $('#LabelListTbl').DataTable({
            "processing": true,
            "serverSide": true,
            "ajax": {
                "url": "assets/scripts/server_processing_printedlabel.php",
                "type": "POST"
            },
            "createdRow": function(row, data, index) {
                if (data[1] == 'Unknown') {
                    $(row).addClass('highlight');
                }
            },
            "rowCallback": function(row, data) {
                var rowid = data.DT_RowId;
                if ($.inArray(rowid, dataarrlabellist) !== -1) {
                    $(row).addClass('selected');
                }
            },

            /*,
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
                           
                            if (group == 'Unknown') {
                                group = rowData[1] + group
                                var rowDatatest = rowData[1]
                                if (last !== group) {
                                    $(rows).eq(i).before('<tr class="group label-info  bigfonttr"><td></td><td class="groupheader" colspan="1" ><span class="badge badge-danger margin-right-5" >' + rowData[1] + '</span>' + " " + '<span class="badge badge-danger">' + rowData[2] + '</span></td><td colspan="3" class="text-right"><a class="btn btn-transparent btn-xs tooltips marginnavileft checkall" tooltip-placement="top" uib-tooltip="Share"><i class="fa fa-check-square"></i></a><a class="btn btn-transparent btn-xs marginnavileft cancelall" tooltip-placement="top" uib-tooltip="Edit"><i class="fa fa-circle-o"></i></a></td></tr>');
                                }
                                last = group
                            } else {
                                if (last !== group) {
                                    var rowData = api.row(i).data();
                                    $(rows).eq(i).before('<tr class="group label-info  bigfonttr"><td></td><td class="groupheader" colspan="1"><span class="badge badge-danger margin-right-5" >' + rowData[1] + '</span>' + " " + '<span class="badge badge-danger">' + rowData[2] + '</span></td><td colspan="3" class="text-right"><a class="btn btn-transparent btn-xs tooltips marginnavileft checkall" tooltip-placement="top" uib-tooltip="Share"><i class="fa fa-check-square"></i></a><a class="btn btn-transparent btn-xs marginnavileft cancelall" tooltip-placement="top" uib-tooltip="Edit"><i class="fa fa-circle-o"></i></a></td></tr>');
                                }
                                last = group;
                            }
                        }
                    });
                }
            },*/
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
                text: '<i class="fa fa-exclamation-circle"></i>',
                action: function(row) {
                    tableLabelList.draw();
                    tableLabelList.column(10).search('true').draw();
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
                className: 'btn btn-wide-40 btn-transparent',
                enabled: true
            }, {
                extend: 'addtoprintqueue',
                text: '<i class="fa fa-share-square-o"></i>',
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
                render: function(data, type, full, meta) {
                    return '<a ' + 'class="labeldel btn-transparent no-padding  btn-xs"' + '>' + '<i class="' + 'fa fa-trash fa fa-white' + '"></i>' + '</a>';
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
            /*
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

            $scope.EditSpecimens('DELETE', 'specimens_form')*/
            /*
            var valuefromtable = $(this).closest('tr').find('td:eq(1)').text();
            var splitString = valuefromtable.split(" ");
            var par = $(this).parent().parent(); // dom table row
            var order = splitString[0];
            var family = splitString[1];
            var columns = [2];
            var orderarr = [];
            for (var x = 0; x < columns.length; x++) {
                LabelListTbl.column(columns[x], {
                    page: 'current'
                }).data().each(function(group, i) {
                    var data = LabelListTbl.row(i).data();
                    if (order === data[1] && family === data[2]) {
                        var id = data.DT_RowId;
                        var idres = "#" + id;
                        var idpure = id.substring(4);
                        var index = $.inArray(idpure, dataarrlabellist);
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
                        dataarrlabellist.splice(index, 1);
                        if ($(tr).hasClass('selected')) {
                            $(tr).removeClass('selected');
                            LabelListTbl.rows(dataarrlabellist).deselect();
                        }
                    }
                    /*
                           if (x == 0) {
                               if (last !== group) {
                                   var rowData = LabelListTbl.row(i).data();
                               }
                               last = group;
                           } else {
                               if (last !== group) {
                                   var rowData = LabelListTbl.row(i).data();
                                   $(rows).eq(i).before('<tr class="group label-default uppercase bigfonttr"><td class="groupheader" colspan="7">' + rowData[1] + " - " + rowData[2] + '</td><td><button>sompong</button></td></tr>');
                               }
                               last = group;
                           }*/
            /*

                            if ($(tr).hasClass('selected')) {
                $(tr).removeClass('selected');
                LabelListTbl.rows($(this).closest('tr')).deselect();
            } else {
                $(tr).addClass('selected');
            }*/
            /*   });
               /* 
                               LabelListTbl.rows(rowdataarrlabellist).select();
                               console.log(rowdataarrlabellist)*/
            /* }
              /*
              var data = LabelListTbl.column(2).data();
              console.log(data)*/
            /*
            var last = null;
            var columns = [2, 3];
            for (var x = 0; x < columns.length; x++) {
                api.column(columns[x], {
                    page: 'current'
                }).data().each(function(group, i) {
                    if (x == 0) {
                        if (last !== group) {
                            var rowData = api.row(i).data();
                        }
                        last = group;
                    } else {
                        if (last !== group) {
                            var rowData = api.row(i).data();
                            $(rows).eq(i).before('<tr class="group label-default uppercase bigfonttr"><td colspan="7">' + rowData[1] + " - " + rowData[2] + '</td></tr>');
                        }
                        last = group;
                    }
                });
            }

*/
            /*
            $(row).addClass('selected');
            var data = LabelListTbl.rows('.selected').select().data();
            for (var i = 0; i < data.length; i++) {
                var rowid = data[i]['DT_RowId'];
                var rowidres = rowid.substring(4);
                dataarrlabellist.push(rowidres);
            }
            return dataarrlabellist;*/
        });
        $('#LabelListTbl tbody').on('click', '.checkall', function() {
            /* var data1 = LabelListTbl.row($(this).parents('tr')).data();*/
            /*
            var currentOrder = LabelListTbl.order()[0];
            if (currentOrder[0] === groupColumn && currentOrder[1] === 'asc') {
                LabelListTbl.order([groupColumn, 'desc'],[groupColumn1, 'desc']).draw();
            } else {
                LabelListTbl.order([groupColumn, 'asc'],[groupColumn1, 'desc']).draw();
            }*/
            var valuefromtable = $(this).closest('tr').find('td:eq(1)').text();
            var splitString = valuefromtable.split(" ");
            var par = $(this).parent().parent(); // dom table row
            var order = splitString[0];
            var family = splitString[1];
            var columns = [2];
            var orderarr = [];
            for (var x = 0; x < columns.length; x++) {
                tableLabelList.column(columns[x], {
                    page: 'current'
                }).data().each(function(group, i) {
                    var data = tableLabelList.row(i).data();
                    if (order === data[1] && family === data[2]) {
                        var id = data.DT_RowId;
                        var idres = "#" + id;
                        var idpure = id.substring(4);
                        var index = $.inArray(idpure, dataarrlabellist);
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
                        dataarrlabellist.push(idpure);
                        var tr = $(idres).closest('tr');
                        $(tr).addClass('selected');
                    }
                    /*
                           if (x == 0) {
                               if (last !== group) {
                                   var rowData = LabelListTbl.row(i).data();
                               }
                               last = group;
                           } else {
                               if (last !== group) {
                                   var rowData = LabelListTbl.row(i).data();
                                   $(rows).eq(i).before('<tr class="group label-default uppercase bigfonttr"><td class="groupheader" colspan="7">' + rowData[1] + " - " + rowData[2] + '</td><td><button>sompong</button></td></tr>');
                               }
                               last = group;
                           }*/
                    /*

                            if ($(tr).hasClass('selected')) {
                $(tr).removeClass('selected');
                LabelListTbl.rows($(this).closest('tr')).deselect();
            } else {
                $(tr).addClass('selected');
            }*/
                });
                /* 
                                LabelListTbl.rows(rowdataarrlabellist).select();
                                console.log(rowdataarrlabellist)*/
            }
            /*
            var data = LabelListTbl.column(2).data();
            console.log(data)*/
            /*
            var last = null;
            var columns = [2, 3];
            for (var x = 0; x < columns.length; x++) {
                api.column(columns[x], {
                    page: 'current'
                }).data().each(function(group, i) {
                    if (x == 0) {
                        if (last !== group) {
                            var rowData = api.row(i).data();
                        }
                        last = group;
                    } else {
                        if (last !== group) {
                            var rowData = api.row(i).data();
                            $(rows).eq(i).before('<tr class="group label-default uppercase bigfonttr"><td colspan="7">' + rowData[1] + " - " + rowData[2] + '</td></tr>');
                        }
                        last = group;
                    }
                });
            }

*/
            /*
            $(row).addClass('selected');
            var data = LabelListTbl.rows('.selected').select().data();
            for (var i = 0; i < data.length; i++) {
                var rowid = data[i]['DT_RowId'];
                var rowidres = rowid.substring(4);
                dataarrlabellist.push(rowidres);
            }
            return dataarrlabellist;*/
        });
        $("#LabelListTbl tbody").on("click", "a.bookmark", function(event) {
            var data = tableLabelList.row($(this).parents('tr')).data();
            var specimensid = data.DT_RowId;
            console.log(specimensid)
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
                tableLabelList.draw();
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
                                          
                                          tableLabelList.draw();
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
                                      tableLabelList.draw();
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
        $scope.collorder = ''
        $scope.collfamily = ''
        $scope.searchmodel = function(i) {
            if (i == 2) {
                var ii = $scope.collorder;
                $('#LabelListTbl').DataTable().column(i).search(ii).draw();
            }
            if (i == 3) {
                var ii = $scope.collfamily;
                $('#LabelListTbl').DataTable().column(i).search(ii).draw();
            }
            if (i == 4) {}
            if (i == 5) {}
            if (i == 6) {
                var ii = $scope.collcode;
                $('#LabelListTbl').DataTable().column(i).search(ii).draw();
            }
            if (i == 7) {
                var ii = $scope.collyear;
                $('#LabelListTbl').DataTable().column(i).search(ii).draw();
            }
            if (i == 8) {
                var ii = $scope.collnumber;
                $('#LabelListTbl').DataTable().column(i).search(ii).draw();
            }
            if (i == 9) {}
            if (i == 10) {}
        }
        /*
              function filterColumnspec(i) {
                  if (i == 8) {
                      var ii = getIfNotSet(Number($('#col' + i + '_filter').val()), '', true);
                  } else {
                      var ii = $('#col' + i + '_filter').val();
                  }
                  $('#LabelListTbl').DataTable().column(i).search(ii).draw();
              }
              $('input.column_filterspec').on('keyup', function() {
                  filterColumnspec($(this).parents('DIV').attr('data-column'));
                 
              });*/
        $('#LabelListTbl td').css('white-space', 'initial');
        $('.material-datatables label').addClass('form-group');
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
        $scope.specimensUpdate = function(action, form) {
            var f = $scope.updatetype;
            if (f == 0 | f == 1) {
                var tablearr = dataarr;
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
                                        $scope.countSpecimens(monthshow, yearshow, null, null);
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
                                        tableLabelList.draw();
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
                                            tableLabelList.draw();
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
                                        tableLabelList.draw();
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
        $scope.IdentifyUpdate = function(action, form) {
            var f = '0';
            if (f == 0 | f == 1) {
                var tablearr = dataarrmuseumrest;
            }
            if (f == 2) {
                var tablearr = dataarrSpecbox;
            }
            var tablearr = dataarrmuseumrest;
            var g = $scope.boxstatus_id
            var a = getIfNotSet($scope.specModelSpecies.species_id, 0, true);
            var b = tablearr;
            var c = JSON.stringify(b);
            var d = 1
            var data = $.param({
                tspecimens_ids: c,
                tspecies_id: a,
                taction: action,
                tactionmode: f,
                tmuseumstatus: d,
                tmonth: $stateParams.monthid,
                tyear: $stateParams.yearid,
            });
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
                                        url: "assets/views/action/dbupdateSpecimensMuseum.php",
                                        headers: {
                                            'Content-Type': 'application/x-www-form-urlencoded'
                                        },
                                    }).success(function(response) {
                                        $scope.SpecimensTaxa = response;
                                        console.log(response)
                                        $scope.Ins_mode = $scope.SpecimensTaxa[0].Ins_mode;
                                        $scope.success = $scope.SpecimensTaxa[0].success;
                                        $scope.countSpecimens(monthshow, yearshow, null, null);
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
                                        dataarrmuseumrest = [];
                                        LabelPrintQueueTbl.draw(false);
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
                                            tableLabelList.draw();
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
                                        tableLabelList.draw();
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
        $scope.transRcontainer = '';
        $scope.transcontainer = '';
        $scope.translocker = '';
        $scope.transdrawer = '';
        $scope.onSelect = function($item, $model, $label) {}
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
        $scope.GetBoxgetBoxQTYtransList = [];
        $scope.GetBoxViewAvarList = [];
        $scope.sompong = 25;
        $http({
            method: 'GET',
            url: 'assets/views/action/getBoxQTYtrans.php',
            params: {
                month: $stateParams.monthid,
                year: $stateParams.yearid
            }
        }).success(function(result) {
            $scope.GetBoxgetBoxQTYtransList = result;
        });
        $scope.ViewBoxQTYtransList = function() {
            $http({
                method: 'GET',
                url: 'assets/views/action/getBoxQTYtrans.php',
                params: {
                    month: monthshow,
                    year: yearshow
                }
            }).success(function(result) {
                $scope.GetBoxgetBoxQTYtransList = result;
            });
        }
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
        $scope.UPDATEresetspecimensTaxa = function() {
            dataarr = [];
            LabelListTbl.rows('.selected').deselect();
            tableLabelList.draw();
            $scope.specModelOrder = '';
            $scope.specModelFamily = '';
            $scope.specModelGenus = '';
            $scope.specModelSpecies = '';
        }
        $scope.UPDATEresetspecimensDate = function() {
            dataarr = [];
            LabelListTbl.rows('.selected').deselect();
            tableLabelList.draw();
        }
        $scope.UPDATEresetspecimensTaxaSimilar = function() {
            dataarr = [];
            LabelListTbl.rows('.selected').deselect();
            tableLabelList.draw();
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
                        window.onkeydown = previousWindowKeyDown;
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
            var data = LabelListTbl.rows('.selected').data();
            var id = data[0].DT_RowId;
            LabelListTbl.rows('.selected').deselect();
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
                window.onkeydown = previousWindowKeyDown;
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
                $state.go('app.form.transfer_specimens', {
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
            console.log($scope.boxstatus_id);
            if ($scope.BoxShowDetailsLock == 'fa-unlock-alt') {
                alert("Please Lock BOX first");
            } else {
                if ($scope.boxstatus_id == 1 | $scope.boxstatus_id == 3) {
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
                            window.onkeydown = previousWindowKeyDown;
                            $http({
                                method: 'GET',
                                url: 'assets/views/action/UpdateBoxState.php',
                                params: {
                                    boxid: $scope.BoxModel,
                                    month: $stateParams.monthid,
                                    year: $stateParams.yearid,
                                    userid: $scope.uid,
                                    boxstatusid: $scope.boxstatus_id
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
                                    $scope.boxstatus_id = response[0].lockbox_boxstatus
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
                if ($scope.boxstatus_id == 2) {
                    SweetAlert.swal({
                        title: "UPDATE BOX STATUS?",
                        text: "Do you want to empty this box?",
                        type: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "Yes, It's Full!",
                        cancelButtonText: "No, cancel plx!",
                        closeOnConfirm: false,
                        closeOnCancel: false
                    }, function(isConfirm) {
                        if (isConfirm) {
                            window.onkeydown = previousWindowKeyDown;
                            $http({
                                method: 'GET',
                                url: 'assets/views/action/UpdateBoxState.php',
                                params: {
                                    boxid: $scope.BoxModel,
                                    month: $stateParams.monthid,
                                    year: $stateParams.yearid,
                                    userid: $scope.uid,
                                    boxstatusid: $scope.boxstatus_id
                                }
                            }).success(function(response) {
                                if (response[0].success == 1) {
                                    SweetAlert.swal({
                                        title: "Success",
                                        text: "Your imaginary Box is EMPTY",
                                        type: "success",
                                        confirmButtonColor: "#007AFF"
                                    });
                                    $scope.FullBoxModel = 'fa-star-o'
                                    $scope.boxstatus_id = response[0].lockbox_boxstatus
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
                window.onkeydown = previousWindowKeyDown;
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
                        $scope.BoxShowDetailsBoxno = response[0].collboxno;
                        $scope.InBoxUndefinedShowDetails = $scope.InBoxUndefinedShowDetailshide
                        $scope.InBoxAllShowDetails = $scope.InBoxAllShowDetailshide
                        $scope.updatetype = 1
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
                var BoxShowDetailstype = 1
                var BoxShowDetailsid = result[0].collbox_id;
                if (result[0].boxlockstate == 2) {
                    if (result[0].compareUser == 1) {
                        $scope.TakeOverSignModel = 'fa-flag'
                    }
                    $scope.BoxShowDetailsLock = 'fa-unlock-alt'
                    $scope.LabelWaringModel = 'label-warning'
                    $scope.BoxShowDetailsUser = 'NA'
                    $scope.TakeOverSignModel = ''
                    $scope.BoxShowDetailsBoxid = 0;
                    $scope.BoxShowDetailsBoxno = 'Non-Selected'
                    $scope.InBoxUndefinedShowDetails = 0
                    $scope.InBoxAllShowDetails = 0
                    $scope.updatetype = 0
                } else {
                    if (result[0].compareUser == 1) {
                        if (result[0].username !== '') {
                            $scope.TakeOverSignModel = 'fa-retweet'
                        }
                    } else {
                        $scope.TakeOverSignModel = ''
                    }
                    $scope.updatetype = 1
                    $scope.BoxShowDetailsBoxid = result[0].collbox_id;
                    $scope.BoxShowDetailsBoxno = result[0].collboxno;
                    $scope.BoxShowDetailsLock = 'fa-lock'
                    $scope.InBoxUndefinedShowDetails = result[0].countundefinedspec;
                    $scope.InBoxAllShowDetails = result[0].countspec;
                    $scope.InBoxUndefinedShowDetailshide = result[0].countundefinedspec;
                    $scope.InBoxAllShowDetailshide = result[0].countspec;
                    $scope.LabelWaringModel = 'label-danger'
                    if (result[0].username == '') {
                        $scope.BoxShowDetailsUser = 'NA'
                    } else {
                        $scope.BoxShowDetailsUser = result[0].username;
                    }
                }
                $scope.boxstatus_id = result[0].boxstatus;
                if (result[0].boxstatus == 3) {
                    $scope.FullBoxModel = 'fa-star-half-o'
                } else if (result[0].boxstatus == 2) {
                    $scope.FullBoxModel = 'fa-star'
                } else {
                    $scope.FullBoxModel = 'fa-star-o'
                }
                $scope.countSpecimens(monthshow, yearshow, BoxShowDetailstype, BoxShowDetailsid);
                $scope.BoxShowModel = result[0].collboxno;
                $scope.BoxShowDetailsCount = result[0].countspec;
                $scope.InBoxUndefinedShowDetailshide = result[0].countundefinedspec;
                $scope.InBoxAllShowDetailshide = result[0].countspec;
                tableSpecimensBox.draw();
            });
        };
        $scope.GetUserCurrentBox();
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
                "url": "assets/scripts/server_processing_museum_each.php",
                "type": "POST",
                "data": function(d) {
                    d.treport_month = getIfNotSet($stateParams.monthid, '0', true);
                    d.treport_year = getIfNotSet($stateParams.yearid, '0', true);
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
                if ($.inArray(rowidres, dataarrmuseum) !== -1) {
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
                                    $(rows).eq(i).before('<tr class="group label-info  bigfonttr"><td></td><td class="groupheader" colspan="3"><span class="badge badge-success margin-right-5" >' + rowData[1] + '</span>' + " " + '<span class="badge badge-success">' + rowData[2] + '</span></td><td colspan="2" class="text-right"><a class="btn btn-transparent btn-xs tooltips marginnavileft checkallmuseum" tooltip-placement="top" uib-tooltip="Share"><i class="fa fa-check-square"></i></a><a class="btn btn-transparent btn-xs marginnavileft cancelallmuseum" tooltip-placement="top" uib-tooltip="Edit"><i class="fa fa-circle-o"></i></a></td></tr>');
                                }
                                last = group
                            } else {
                                if (last !== group) {
                                    var rowData = api.row(i).data();
                                    $(rows).eq(i).before('<tr class="group label-info  bigfonttr"><td></td><td class="groupheader" colspan="3"><span class="badge badge-success margin-right-5" >' + rowData[1] + '</span>' + " " + '<span class="badge badge-success">' + rowData[2] + '</span></td><td colspan="2" class="text-right"><a class="btn btn-transparent btn-xs tooltips marginnavileft checkallmuseum" tooltip-placement="top" uib-tooltip="Share"><i class="fa fa-check-square"></i></a><a class="btn btn-transparent btn-xs marginnavileft cancelallmuseum" tooltip-placement="top" uib-tooltip="Edit"><i class="fa fa-circle-o"></i></a></td></tr>');
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
                text: '<i id="checkitemmuseumeach" class="fa fa-square-o"></i>',
                action: function(row) {
                    $(row).removeClass('selected');
                    if (dataarrmuseum.length > 0) {
                        tableSpecMuseumList.rows().deselect();
                        $("#checkitemmuseumeach").addClass('fa-square-o');
                        $("#checkitemmuseumeach").removeClass('fa-check-square-o');
                        dataarrmuseum = [];
                    } else {
                        tableSpecMuseumList.rows().select();
                        $(row).addClass('selected');
                        var data = tableSpecMuseumList.rows('.selected').select().data();
                        $("#checkitemmuseumeach").removeClass('fa-square-o');
                        $("#checkitemmuseumeach").addClass('fa-check-square-o');
                        for (var i = 0; i < data.length; i++) {
                            var rowid = data[i]['DT_RowId'];
                            var rowidres = rowid.substring(4);
                            dataarrmuseum.push(rowidres);
                        }
                        return dataarrmuseum;
                    }
                },
                className: 'btn btn-wide-40',
                enabled: true
            }, {
                text: '<i class="fa fa-repeat"></i>',
                action: function(row) {
                    tableSpecMuseumList.draw(false)
                },
                className: 'btn btn-wide-40 btn-transparent',
                enabled: true
            }, {
                text: '<i class="fa fa-dedent"></i>',
                className: 'btn btn-wide-40 btn-transparent',
                enabled: true,
                extend: 'removefrommuseum'
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
                "visible": true,
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
        /** specimens in the museum **/
        $scope.container_typemuseumrest = 1
        var dataarrmuseumrest = [];
        var groupColumnmuseumrest = 2;
        var groupColumnmuseumtest1 = 3;
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
                if ($.inArray(rowid, dataarrmuseumrest) !== -1) {
                    $(row).addClass('selected');
                }
            },
            /*
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
                           
                            if (group == 'Unknown') {
                                group = rowData[1] + group
                                var rowDatatest = rowData[1]
                                if (last !== group) {
                                    $(rows).eq(i).before('<tr class="group label-info  bigfonttr"><td></td><td class="groupheader" colspan="2"><span class="badge badge-warning margin-right-5" >' + rowData[1] + '</span>' + " " + '<span class="badge badge-warning">' + rowData[2] + '</span></td><td colspan="1" class="text-right"><a class="btn btn-transparent btn-xs tooltips marginnavileft checkallres" tooltip-placement="top" uib-tooltip="Share"><i class="fa fa-check-square"></i></a><a class="btn btn-transparent btn-xs marginnavileft cancelallres" tooltip-placement="top" uib-tooltip="Edit"><i class="fa fa-circle-o"></i></a></td></tr>');
                                }
                                last = group
                            } else {
                                if (last !== group) {
                                    var rowData = api.row(i).data();
                                    $(rows).eq(i).before('<tr class="group label-info  bigfonttr"><td></td><td class="groupheader" colspan="2"><span class="badge badge-warning margin-right-5" >' + rowData[1] + '</span>' + " " + '<span class="badge badge-warning">' + rowData[2] + '</span></td><td colspan="1" class="text-right"><a class="btn btn-transparent btn-xs tooltips marginnavileft checkallres" tooltip-placement="top" uib-tooltip="Share"><i class="fa fa-check-square"></i></a><a class="btn btn-transparent btn-xs marginnavileft cancelallres" tooltip-placement="top" uib-tooltip="Edit"><i class="fa fa-circle-o"></i></a></td></tr>');
                                }
                                last = group;
                            }
                        }
                    });
                }
            },*/
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
                "width": "50%",
                "orderable": false
            }, {
                "class": "",
                "data": "1",
                "width": "20%",
                "orderable": false
            }, {
                "data": "2",
                "width": "20%",
                "orderable": false,
                "visible": true
            }, {
                "data": "3",
                "width": "5%",
                "orderable": false,
                "visible": true
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
                    return '<a ' + 'class="delete btn-transparent no-padding  btn-xs"' + '>' + '<i class="' + 'fa fa-times fa fa-white' + '"></i>' + '</a>';
                },
                targets: 0
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
        $scope.searchmuseummodel = function(i) {
            if (i == 2) {
                var ii = $scope.specboxno;
                $('#SpecimensMuseumTbl').DataTable().column(i).search(ii).draw();
            }
            if (i == 3) {
                var ii = $scope.drawerno;
                $('#SpecimensMuseumTbl').DataTable().column(i).search(ii).draw();
            }
            if (i == 8) {
                var ii = $scope.collcodemuseum;
                $('#SpecimensMuseumTbl').DataTable().column(i).search(ii).draw();
            }
            if (i == 9) {
                var ii = $scope.collyearmuseum;
                $('#SpecimensMuseumTbl').DataTable().column(i).search(ii).draw();
            }
            if (i == 4) {
                var ii = $scope.drawerno;
                $('#SpecimensMuseumTbl').DataTable().column(i).search(ii).draw();
            }
            if (i == 10) {
                var ii = $scope.specboxno;
                $('#SpecimensMuseumTbl').DataTable().column(i).search(ii).draw();
            }
            if (i == 11) {
                var ii = $scope.specboxno;
                $('#SpecimensMuseumTbl').DataTable().column(i).search(ii).draw();
            }
        }
        $('#SpecimensMuseumTbl tbody').on('click', '.checkallmuseum', function() {
            var valuefromtable = $(this).closest('tr').find('td:eq(1)').text();
            var splitString = valuefromtable.split(" ");
            var par = $(this).parent().parent(); // dom table row
            var order = splitString[0];
            var family = splitString[1];
            var columns = [2];
            var orderarr = [];
            for (var x = 0; x < columns.length; x++) {
                tableSpecMuseumList.column(columns[x], {
                    page: 'current'
                }).data().each(function(group, i) {
                    var data = tableSpecMuseumList.row(i).data();
                    if (order === data[1] && family === data[2]) {
                        var id = data.DT_RowId;
                        var idres = "#" + id;
                        var idpure = id.substring(4);
                        var index = $.inArray(idpure, dataarrmuseum);
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
                        dataarrmuseum.push(idpure);
                        var tr = $(idres).closest('tr');
                        $(tr).addClass('selected');
                    }
                });
            }
        });
        $('#SpecimensMuseumTbl tbody').on('click', '.cancelallmuseum', function() {
            var valuefromtable = $(this).closest('tr').find('td:eq(1)').text();
            var splitString = valuefromtable.split(" ");
            var par = $(this).parent().parent(); // dom table row
            var order = splitString[0];
            var family = splitString[1];
            var columns = [2];
            var orderarr = [];
            for (var x = 0; x < columns.length; x++) {
                tableSpecMuseumList.column(columns[x], {
                    page: 'current'
                }).data().each(function(group, i) {
                    var data = tableSpecMuseumList.row(i).data();
                    if (order === data[1] && family === data[2]) {
                        var id = data.DT_RowId;
                        var idres = "#" + id;
                        var idpure = id.substring(4);
                        var index = $.inArray(idpure, dataarrmuseum);
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
                        dataarrmuseum.splice(index, 1);
                        if ($(tr).hasClass('selected')) {
                            $(tr).removeClass('selected');
                            LabelListTbl.rows(dataarrmuseum).deselect();
                        }
                    }
                });
            }
        });
        $('#SpecimensMuseumRestTbl tbody').on('click', '.checkallres', function() {
            var valuefromtable = $(this).closest('tr').find('td:eq(1)').text();
            var splitString = valuefromtable.split(" ");
            var par = $(this).parent().parent(); //table row
            var order = splitString[0];
            var family = splitString[1];
            var columns = [2];
            var orderarr = [];
            for (var x = 0; x < columns.length; x++) {
                LabelPrintQueueTbl.column(columns[x], {
                    page: 'current'
                }).data().each(function(group, i) {
                    var data = LabelPrintQueueTbl.row(i).data();
                    if (order === data[1] && family === data[2]) {
                        var id = data.DT_RowId;
                        var idres = "#" + id;
                        var idpure = id.substring(4);
                        var index = $.inArray(idpure, dataarrmuseumrest);
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
                        dataarrmuseumrest.push(idpure);
                        var tr = $(idres).closest('tr');
                        $(tr).addClass('selected');
                    }
                });
            }
        });
        $('#SpecimensMuseumRestTbl tbody').on('click', '.cancelallres', function() {
            var valuefromtable = $(this).closest('tr').find('td:eq(1)').text();
            var splitString = valuefromtable.split(" ");
            var par = $(this).parent().parent(); // dom table row
            var order = splitString[0];
            var family = splitString[1];
            var columns = [2];
            var orderarr = [];
            for (var x = 0; x < columns.length; x++) {
                LabelPrintQueueTbl.column(columns[x], {
                    page: 'current'
                }).data().each(function(group, i) {
                    var data = LabelPrintQueueTbl.row(i).data();
                    if (order === data[1] && family === data[2]) {
                        var id = data.DT_RowId;
                        var idres = "#" + id;
                        var idpure = id.substring(4);
                        var index = $.inArray(idpure, dataarrmuseumrest);
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
                        dataarrmuseumrest.splice(index, 1);
                        if ($(tr).hasClass('selected')) {
                            $(tr).removeClass('selected');
                            LabelListTbl.rows(dataarrmuseumrest).deselect();
                        }
                    }
                });
            }
        });
        /** datatable SpecimensMuseumRestTbl checkbox **/
        $('#SpecimensMuseumRestTbl tbody').on('click', '.select-checkbox', function() {
            var tr = $(this).closest('tr');
            var data = LabelPrintQueueTbl.row($(this).closest('tr')).data();
            var id = data.DT_RowId;
            var idres = id.substring(4);
            var index = $.inArray(idres, dataarrmuseumrest);
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
                dataarrmuseumrest.push(idres);
            } else {
                dataarrmuseumrest.splice(index, 1);
            }
            if ($(tr).hasClass('selected')) {
                $(tr).removeClass('selected');
                LabelPrintQueueTbl.rows($(this).closest('tr')).deselect();
            } else {
                $(tr).addClass('selected');
            }
        });
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
        /** Database action function **/
        $scope.ContainerUpdate = function(Ins_mode, codetype) {
            if (Ins_mode === 'UPDATE') {
                var specdata_array = dataarr;
                if (codetype === 'DrcodeMuseum') {
                    var specdatamuseum_array = dataarrmuseumrest;
                    $scope.transRcontainerdrawerid = getIfNotSet($scope.transRcontainerMuseum.spec_box_id, 0, true);
                    var a = $scope.transRcontainerdrawerid;
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
                        dataarrmuseumrest = [];
                        LabelPrintQueueTbl.draw(false);
                        $scope.transRcontainerMuseum = ''
                        $("#checkitemres").addClass('fa-square-o');
                        $("#checkitemres").removeClass('fa-check-square-o');
                        $scope.countSpecimens($stateParams.monthid, $stateParams.yearid, null, null);
                        $scope.ViewBoxQTYtransList();
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
                        tableLabelList.draw(false);
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
                        tableLabelList.draw(false);
                    });
                }
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
        $scope.onSelectTypeGenus = function($item, $model, $label) {
            $scope.subfamily = $model.sub_family
        }
        $scope.onSelectTypeSpecies = function($item, $model, $label) {
            $scope.subgenus = $model.sub_genus
        }
        $scope.onSelectTypedef = function($item, $model, $label) {}
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
        $scope.currentStep = 1;
        // Initial Value
        $scope.form = {
            next: function(form, row) {
                $scope.toTheTop();
                if (form.$valid) {
                    form.$setPristine();
                    nextStep(row);
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
            },
            prev: function(form) {
                $scope.toTheTop();
                prevStep();
            },
            goTo: function(form, i) {
                if (parseInt($scope.currentStep) > parseInt(i)) {
                    $scope.toTheTop();
                    goToStep(i);
                } else {
                    if (form.$valid) {
                        $scope.toTheTop();
                        goToStep(i);
                    } else errorMessage();
                }
            },
            submit: function() {},
            reset: function() {}
        };
        var nextStep = function(row) {
            $scope.currentStep++;
            $scope.RowIns(row)
        };
        var prevStep = function() {
            $scope.currentStep--;
        };
        var goToStep = function(i) {
            $scope.currentStep = i;
        };
        var errorMessage = function(i) {
            ngNotify.set('please complete the form in this step before proceeding', {
                theme: 'pure',
                position: 'top',
                type: 'error',
                button: 'true',
                sticky: 'false',
            });
        };
        $scope.RowIns = function(rowid) {
            var a = rowid;
            var mode = 'SELECT'
            var conmode = 'ROW'
            var data = $.param({
                tRowid: a,
                tMode: mode,
                tConmode: conmode
            });
            $http({
                method: 'POST',
                url: 'assets/views/action/dbSelectContainerDetails.php',
                data: data,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
            }).success(function(response) {
                $scope.GetRowContainerList = response;
                var cabinetid = $scope.GetRowContainerList[0].cabinet_id
                $scope.rowname = $scope.GetRowContainerList[0].rcabinet
                $scope.CabinetIns(cabinetid)
            });
        }
        $scope.CabinetIns = function(cabinetid) {
            var a = cabinetid;
            var mode = 'SELECT'
            var conmode = 'CABINET'
            var data = $.param({
                tRowid: a,
                tMode: mode,
                tConmode: conmode
            });
            $http({
                method: 'POST',
                url: 'assets/views/action/dbSelectContainerDetails.php',
                data: data,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
            }).success(function(response) {
                $scope.GetCabinetContainerList = response;
                var subcabinetid = $scope.GetCabinetContainerList[0].subcabinet_id
                $scope.SubCabinetIns(subcabinetid)
            });
        }
        $scope.SubCabinetIns = function(subcabinetid) {
            var a = subcabinetid;
            var mode = 'SELECT'
            var conmode = 'SUBCABINET'
            var data = $.param({
                tRowid: a,
                tMode: mode,
                tConmode: conmode
            });
            $http({
                method: 'POST',
                url: 'assets/views/action/dbSelectContainerDetails.php',
                data: data,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
            }).success(function(response) {
                $scope.GetSubCabinetContainerList = response;
                $scope.subcabinetname = $scope.GetSubCabinetContainerList[0].sub_cabinet
            });
        }
        /**  Button Animation  **/
        $scope.ldloading = {};
        $scope.clickBtn = function(style) {
            $scope.ldloading[style.replace('-', '_')] = true;
            $timeout(function() {
                $scope.ldloading[style.replace('-', '_')] = false;
            }, 2000);
        };
        $scope.clickProgressBtn = function(style) {
            $scope.ldloading[style.replace('-', '_') + "_progress"] = true;
            $timeout(function() {
                $scope.ldloading[style.replace('-', '_') + "_progress"] = 0.1;
            }, 500);
            $timeout(function() {
                $scope.ldloading[style.replace('-', '_') + "_progress"] += 0.1;
            }, 1000);
            $timeout(function() {
                $scope.ldloading[style.replace('-', '_') + "_progress"] += 0.1;
            }, 1500);
            $timeout(function() {
                $scope.ldloading[style.replace('-', '_') + "_progress"] = false;
            }, 2000);
        };
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
        };
        /*endctrl */
    }
]);