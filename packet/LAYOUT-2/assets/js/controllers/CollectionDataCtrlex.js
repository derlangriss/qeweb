'use strict';
/*addition*/
app.controller("CollectionDataCtrl", ["$scope", "ngNotify", "$http", "$timeout", "$stateParams", "SweetAlert", "info", "$state", 'FileUploader', 'ngNotify', function($scope, ngNotify, $http, $timeout, $stateParams, SweetAlert, info, $state, FileUploader, $window) {
    /**initiate form value **/
    var previousWindowKeyDown = window.onkeydown;
        $scope.jqueryScrollbarOptions = {
            "onScroll": function(y, x) {
                if (y.scroll == y.maxScroll) {}
            }
        };
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
    $scope.currentStep = 1;
    $scope.savetype = 1;
    var date = new Date();
    var today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    var end = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    var errorMessage = function(i) {
        ngNotify.set('please complete the form in this step before proceeding', {
            theme: 'pure',
            position: 'top',
            type: 'error',
            button: true,
            sticky: false,
        });
    }

    function getIfNotSet(value, newValue, overwriteNull) {
        if (typeof(value) === 'undefined' && overwriteNull === true) {
            return newValue;
        } else if (typeof(value) === 'undefined') {
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
    /**initiate collection form value **/
    $scope.data = {};
    info.collectiondata($stateParams.collid).success(function(result) {
        if (result.length === 0) {
            /*
            $scope.data.coll_code = result[0].coll_code;
            $scope.data.coll_year = result[0].coll_year;
            $scope.data.coll_number = result[0].coll_number;
            */
            $scope.data.collectionlatmap = 15.907198;
            $scope.data.collectionlongmap = 101.036569;
            $scope.positions = [];
            $scope.acceptable = "1";
        } else if (result[0].coll_id === undefined) {
            $scope.data.collectionlatmap = 15.907198;
            $scope.data.collectionlongmap = 101.036569;
            $scope.positions = [];
            /*
            $scope.data.coll_code = result[0].coll_code;
            $scope.data.coll_year = result[0].coll_year;
            $scope.data.coll_number = result[0].coll_number;
            */
            $scope.acceptable = "1";
        } else {
            var startdate = result[0].coll_start_date;
            var enddate = result[0].coll_end_date;
            $scope.data.collid = result[0].coll_id;
            $scope.data.collectionlatdec = result[0].coll_lat_dec;
            $scope.data.collectionlatd = result[0].coll_lat_d;
            $scope.data.collectionlatm = result[0].coll_lat_m;
            $scope.data.collectionlats = result[0].coll_lat_s;
            $scope.data.collectionlongdec = result[0].coll_long_dec;
            $scope.data.collectionlongd = result[0].coll_long_d;
            $scope.data.collectionlongm = result[0].coll_long_m;
            $scope.data.collectionlongs = result[0].coll_long_s;
            $scope.data.collectionnorthing = result[0].coll_northing;
            $scope.data.collectioneasting = result[0].coll_easting;
            $scope.gencoll_code = result[0].collection_code_collection_code_id;
            $scope.data.collectionutm = result[0].coll_utm;
            $scope.selectMethod = result[0].method_method_id;
            $scope.selectDonate = result[0].donation_donation_id;
            $scope.data.collectionmethodsdetails = result[0].collectionmethodsdetails;
            $scope.data.idcollectors = result[0].collectors_idcollectors;
            $scope.data.collectorsen = result[0].collectorsen;
            $scope.data.amphurid = result[0].amphur_direct_id;
            $scope.data.collectionmasl = result[0].coll_masl;
            $scope.data.amphuren = result[0].amphur_en;
            $scope.data.provinceen = result[0].province_en;
            $scope.data.tambonen = result[0].tambon_en;
            $scope.data.collLocality = result[0].coll_locality;
            $scope.data.collSlocality = result[0].coll_specific_locality;
            $scope.data.habitat = result[0].coll_habitat;
            $scope.data.coll_code = result[0].coll_code;
            $scope.data.coll_year = result[0].coll_year;
            $scope.data.coll_number = result[0].coll_number;
            var date = new Date();
            var today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
            var end = new Date(date.getFullYear(), date.getMonth(), date.getDate());
            $('#txtcollection_start_date').datepicker({
                format: "yyyy/mm/dd",
                todayHighlight: true,
                endDate: end,
                autoclose: true
            });
            $('#txtcollection_end_date').datepicker({
                format: "yyyy/mm/dd",
                todayHighlight: true,
                endDate: end,
                autoclose: true
            });
            $('#txtcollection_start_date').datepicker('setDate', startdate);
            $('#txtcollection_end_date').datepicker('setDate', enddate);
            $scope.data.tambonid = result[0].tambon_tambon_id;
            $scope.data.amphurid = result[0].amphur_amphur_id;
            $scope.savetype = "1";
            $scope.item1.myModelPro = {
                "province_direct_id": result[0].province_direct_id,
                "province_direct_en": result[0].province_direct_en,
                "province_direct_th": result[0].province_direct_th,
                "country_direct_country_direct_id": result[0].country_direct_country_direct_id
            }
            $scope.item1.myModelAmp = {
                "amphur_direct_id": result[0].amphur_direct_id,
                "amphur_direct_en": result[0].amphur_direct_en,
                "amphur_direct_th": result[0].amphur_direct_th,
                "province_direct_province_direct_id": result[0].province_direct_province_direct_id
            }
            $scope.item1.myModelTam = {
                "tambon_direct_id": result[0].tambon_direct_id,
                "tambon_direct_en": result[0].tambon_direct_en,
                "tambon_direct_th": result[0].tambon_direct_th,
                "amphur_direct_amphur_direct_id": result[0].amphur_direct_amphur_direct_id
            }
            $scope.data.acceptable = result[0].acceptable;
            if ($scope.data.acceptable === '0') {
                $scope.acceptable = 0;
                /*$("input[name=acceptable][value='0']").prop("checked", true);*/
                $scope.status = {
                    open: "true",
                    isFirstDisabled: !1
                }
            }
            if ($scope.data.acceptable === '1') {
                $scope.acceptable = 1;
                /*$("input[name=acceptable][value='1']").prop("checked", true);*/
            }
            if (result[0].collector_firstname_en !== null) {
                if (result[0].collector_firstname_en.length !== null) {
                    $scope.collectors = result;
                }
            }
            if ($scope.data.collectionlatdec !== 0) {
                $scope.data.collectionlatmap = $scope.data.collectionlatdec;
                $scope.data.collectionlongmap = $scope.data.collectionlongdec;
                $scope.positions = [{
                    lat: $scope.data.collectionlatdec,
                    lng: $scope.data.collectionlongdec
                }];
            } else {
                $scope.data.collectionlatmap = 25.907198;
                $scope.data.collectionlongmap = 120.036569;
                $scope.positions = [];
            }
            /*
                         $scope.data.collectionlatmap = result[0].coll_lat_dec;
                            $scope.data.collectionlongmap = result[0].coll_long_dec;
                            $scope.positions = [{
                                lat: result[0].coll_lat_dec;,
                                lng: result[0].coll_long_dec
                            }];
                            */
        }
    });
    /**initiate images upload form **/
    info.imagesdata($stateParams.collid).success(function(result) {
        if (result.length === 0) {} else if (result[0].coll_id === undefined) {} else {
            $scope.imagearr = result;
            var getIsLiked = function(i) {
                var url = $scope.imagearr[i].images_path;
                var collid = $scope.imagearr[i].another_id;
                var imageid = $scope.imagearr[i].images_id;
                $http.get(url, {
                    responseType: "blob"
                }).success(function(data, status, headers, config) {
                    var imageurl = url;
                    var beconfuse = 'test';
                    var iname = imageurl.substr(imageurl.lastIndexOf('/') + 1);
                    var mimetype = data.type;
                    var file = new File([data], iname, {
                        type: mimetype,
                        beconfuse: beconfuse
                    });
                    var dummy = new FileUploader.FileItem(uploaderImages, {});
                    dummy.imageid = imageid;
                    dummy.collid = collid;
                    dummy.file.name = iname;
                    dummy.file.size = data.size;
                    dummy._file = file;
                    dummy.progress = 100;
                    dummy.isUploaded = true;
                    dummy.isSuccess = true;
                    uploaderImages.queue.push(dummy);
                    console.log(uploaderImages.queue);
                });
            }
            for (var i = 0; i < $scope.imagearr.length; i++) {
                getIsLiked(i);
            }
        }
    });
    var uploaderImages = $scope.uploaderImages = new FileUploader({
        url: 'assets/views/action/upload.php',
        removeAfterUpload: true
    });
    $scope.removeFile = function(item) {
        var index = item.imageid;
        if (index === undefined) {
            item.remove();
        } else {
            $http({
                method: 'GET',
                url: 'assets/views/action/deleteimages.php',
                params: {
                    query: index
                }
            }).success(function(result) {
                item.remove();
            });
        }
    }
    // FILTERS
    uploaderImages.filters.push({
        name: 'imageFilter',
        fn: function(item /*{File|FileLikeObject}*/ , options) {
            var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
            return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
        }
    });
    // CALLBACKS
    uploaderImages.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/ , filter, options) {
        console.info('onWhenAddingFileFailed', item, filter, options);
    };
    uploaderImages.onAfterAddingFile = function(fileItem) {
        console.info('onAfterAddingFile', fileItem);
    };
    uploaderImages.onAfterAddingAll = function(addedFileItems) {
        console.info('onAfterAddingAll', addedFileItems);
    };
    uploaderImages.onBeforeUploadItem = function(item) {
        console.info('onBeforeUploadItem', item);
    };
    uploaderImages.onProgressItem = function(fileItem, progress) {
        console.info('onProgressItem', fileItem, progress);
    };
    uploaderImages.onProgressAll = function(progress) {
        console.info('onProgressAll', progress);
    };
    uploaderImages.onErrorItem = function(fileItem, response, status, headers) {
        console.info('onErrorItem', fileItem, response, status, headers);
    };
    uploaderImages.onCancelItem = function(fileItem, response, status, headers) {
        console.info('onCancelItem', fileItem, response, status, headers);
    };
    uploaderImages.onCompleteItem = function(fileItem, response, status, headers) {
        console.info('onCompleteItem', fileItem, response, status, headers);
    };
    uploaderImages.onCompleteAll = function() {
        console.info('onCompleteAll');
    };
    /**googlemap **/
    $scope.moveMap = function(lat, lng) {
        $scope.data.collectionlatmap = lat;
        $scope.data.collectionlongmap = lng;
        $scope.positions = [{
            lat: lat,
            lng: lng
        }];
    }
    $scope.defaultMap = function(lat, lng) {
        $scope.data.center = [lat, lng];
        $scope.positions = [{
            lat: lat,
            lng: lng
        }];
    }
    $scope.deleteMarkers = function() {
        $scope.positions = [];
    };
    $scope.clearMarkers = function() {
        $scope.data.collectionlatmap = 15.907198;
        $scope.data.collectionlongmap = 101.036569;
        $scope.positions = [];
    };
    /**GPS auto latlon **/
    $scope.GPSautoDec = function() {
        if ($scope.data.collectionlatdec !== undefined) {
            var signlat = 1;
            var latAbs = 0;
            latAbs = Math.abs(Math.round($scope.data.collectionlatdec * 1000000.));
            $scope.data.collectionlatd = (Math.floor(latAbs / 1000000) * signlat);
            $scope.data.collectionlatm = Math.floor(((latAbs / 1000000) - Math.floor(latAbs / 1000000)) * 60);
            $scope.data.collectionlats = (Math.floor(((((latAbs / 1000000) - Math.floor(latAbs / 1000000)) * 60) - Math.floor(((latAbs / 1000000) - Math.floor(latAbs / 1000000)) * 60)) * 100000) * 60 / 100000);
            var newLat = $scope.data.collectionlatdec
        } else {
            $scope.data.collectionlatd = null;
            $scope.data.collectionlatm = null;
            $scope.data.collectionlats = null;
        }
        if ($scope.data.collectionlongdec !== undefined) {
            console.log($scope.data.collectionlongdec);
            var signlon = 1;
            var lonAbs = 0;
            lonAbs = Math.abs(Math.round(document.getElementById('txtlongdec').value * 1000000.));
            $scope.data.collectionlongd = (Math.floor(lonAbs / 1000000) * signlon);
            $scope.data.collectionlongm = Math.floor(((lonAbs / 1000000) - Math.floor(lonAbs / 1000000)) * 60);
            $scope.data.collectionlongs = (Math.floor(((((lonAbs / 1000000) - Math.floor(lonAbs / 1000000)) * 60) - Math.floor(((lonAbs / 1000000) - Math.floor(lonAbs / 1000000)) * 60)) * 100000) * 60 / 100000);
            var newLon = $scope.data.collectionlongdec
        } else {
            $scope.data.collectionlongd = null;
            $scope.data.collectionlongm = null;
            $scope.data.collectionlongs = null;
        }
        var a = encodeURI($scope.data.collectionlatdec)
        var b = encodeURI($scope.data.collectionlongdec);
        var data = $.param({
            flat: a,
            flong: b
        });
        if (newLat && newLon != null) {
            $http({
                method: 'POST',
                url: "assets/views/action/LocationGetFill.php",
                data: data,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
            }).success(function(response) {
                var flocation = response;
                if (flocation != "") {
                    var myArr = flocation.split("|");
                    $scope.data.provinceen = myArr[0];
                    $scope.data.amphurid = myArr[1];
                    $scope.data.amphuren = myArr[2];
                    $scope.data.tambonid = myArr[3];
                    $scope.data.tambonen = myArr[4];
                } else {
                    $scope.data.provinceen = '';
                    $scope.data.amphurid = '';
                    $scope.data.amphuren = '';
                    $scope.data.tambonid = '';
                    $scope.data.tambonen = '';
                }
                $scope.moveMap(newLat, newLon);
            });
        } else {
            var lat = 15.907198;
            var lng = 101.036569;
            $scope.moveMap(lat, lng);
        }
    }
    $scope.GPSautoLatLong = function() {
        if ($scope.data.collectionlatd !== undefined) {
            var latdegrees = parseInt($scope.data.collectionlatd) || 0;
            var latminutes = parseInt($scope.data.collectionlatm) || 0;
            var latseconds = Number($scope.data.collectionlats) || 0;
            $scope.data.collectionlatdec = latdegrees + (latminutes / 60) + (latseconds / 3600);
            var newLat = $scope.data.collectionlatdec
            console.log($scope.data.collectionlatdec);
        } else {
            $scope.data.collectionlatdec = '';
        }
        if ($scope.data.collectionlongd !== undefined) {
            var longdegrees = parseInt($scope.data.collectionlongd) || 0;
            var longminutes = parseInt($scope.data.collectionlongm) || 0;
            var longseconds = Number($scope.data.collectionlongs) || 0;
            $scope.data.collectionlongdec = longdegrees + (longminutes / 60) + (longseconds / 3600);
            var newLon = $scope.data.collectionlongdec
        } else {
            $scope.data.collectionlongdec = '';
        }
        var a = encodeURI($scope.data.collectionlatdec)
        var b = encodeURI($scope.data.collectionlongdec);
        var data = $.param({
            flat: a,
            flong: b
        });
        if (newLat && newLon !== undefined) {
            $http({
                method: 'POST',
                url: "assets/views/action/LocationGetFill.php",
                data: data,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
            }).success(function(response) {
                var flocation = response;
                if (flocation != "") {
                    var myArr = flocation.split("|");
                    $scope.data.provinceen = myArr[0];
                    $scope.data.amphurid = myArr[1];
                    $scope.data.amphuren = myArr[2];
                    $scope.data.tambonid = myArr[3];
                    $scope.data.tambonen = myArr[4];
                } else {
                    $scope.data.provinceen = '';
                    $scope.data.amphurid = '';
                    $scope.data.amphuren = '';
                    $scope.data.tambonid = '';
                    $scope.data.tambonen = '';
                }
                var newLatLon = new google.maps.LatLng(newLat, newLon);
                $scope.moveMap(newLat, newLon);
            });
        } else {
            var lat = 15.907198;
            var lng = 101.036569;
            $scope.moveMap(lat, lng);
        }
    }
    $scope.GETNERATEAUTOCOLLNO = function() {
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
            url: "assets/views/action/return_collnumber.php",
            data: data,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
        }).success(function(result) {
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
                    } else if (result[0].gen_mode === 2) {
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
                    } else if (result[0].gen_mode === 3) {
                        var startdate = result[0].coll_start_date;
                        var enddate = result[0].coll_end_date;
                        $scope.data.collid = result[0].coll_id;
                        $scope.data.collectionlatdec = result[0].coll_lat_dec;
                        $scope.data.collectionlatd = result[0].coll_lat_d;
                        $scope.data.collectionlatm = result[0].coll_lat_m;
                        $scope.data.collectionlats = result[0].coll_lat_s;
                        $scope.data.collectionlongdec = result[0].coll_long_dec;
                        $scope.data.collectionlongd = result[0].coll_long_d;
                        $scope.data.collectionlongm = result[0].coll_long_m;
                        $scope.data.collectionlongs = result[0].coll_long_s;
                        $scope.data.collectionnorthing = result[0].coll_northing;
                        $scope.data.collectioneasting = result[0].coll_easting;
                        $scope.gencoll_code = result[0].collection_code_collection_code_id;
                        $scope.data.collectionutm = result[0].coll_utm;
                        $scope.selectMethod = result[0].method_method_id;
                        $scope.selectDonate = result[0].donation_donation_id;
                        $scope.data.collectionmethodsdetails = result[0].collectionmethodsdetails;
                        $scope.data.idcollectors = result[0].collectors_idcollectors;
                        $scope.data.collectorsen = result[0].collectorsen;
                        $scope.data.amphurid = result[0].amphur_direct_id;
                        $scope.data.collectionmasl = result[0].coll_masl;
                        $scope.data.amphuren = result[0].amphur_en;
                        $scope.data.provinceen = result[0].province_en;
                        $scope.data.tambonen = result[0].tambon_en;
                        $scope.data.collLocality = result[0].coll_locality;
                        $scope.data.collSlocality = result[0].coll_specific_locality;
                        $scope.data.habitat = result[0].coll_habitat;
                        $scope.data.coll_code = result[0].coll_code;
                        $scope.data.coll_year = result[0].coll_year;
                        $scope.data.coll_number = result[0].coll_number;
                        var date = new Date();
                        var today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
                        var end = new Date(date.getFullYear(), date.getMonth(), date.getDate());
                        $('#txtcollection_start_date').datepicker({
                            format: "yyyy/mm/dd",
                            todayHighlight: true,
                            endDate: end,
                            autoclose: true
                        });
                        $('#txtcollection_end_date').datepicker({
                            format: "yyyy/mm/dd",
                            todayHighlight: true,
                            endDate: end,
                            autoclose: true
                        });
                        $('#txtcollection_start_date').datepicker('setDate', startdate);
                        $('#txtcollection_end_date').datepicker('setDate', enddate);
                        $scope.data.tambonid = result[0].tambon_tambon_id;
                        $scope.data.amphurid = result[0].amphur_amphur_id;
                        $scope.savetype = "1";
                        $scope.item1.myModelPro = {
                            "province_direct_id": result[0].province_direct_id,
                            "province_direct_en": result[0].province_direct_en,
                            "province_direct_th": result[0].province_direct_th,
                            "country_direct_country_direct_id": result[0].country_direct_country_direct_id
                        }
                        $scope.item1.myModelAmp = {
                            "amphur_direct_id": result[0].amphur_direct_id,
                            "amphur_direct_en": result[0].amphur_direct_en,
                            "amphur_direct_th": result[0].amphur_direct_th,
                            "province_direct_province_direct_id": result[0].province_direct_province_direct_id
                        }
                        $scope.item1.myModelTam = {
                            "tambon_direct_id": result[0].tambon_direct_id,
                            "tambon_direct_en": result[0].tambon_direct_en,
                            "tambon_direct_th": result[0].tambon_direct_th,
                            "amphur_direct_amphur_direct_id": result[0].amphur_direct_amphur_direct_id
                        }
                        $scope.data.acceptable = result[0].acceptable;
                        if ($scope.data.acceptable === '0') {
                            $scope.acceptable = 0;
                            /*$("input[name=acceptable][value='0']").prop("checked", true);*/
                            $scope.status = {
                                open: "true",
                                isFirstDisabled: !1
                            }
                        }
                        if ($scope.data.acceptable === '1') {
                            $scope.acceptable = 1;
                            /*$("input[name=acceptable][value='1']").prop("checked", true);*/
                        }
                        if (result[0].collector_firstname_en !== null) {
                            if (result[0].collector_firstname_en.length !== null) {
                                $scope.collectors = result;
                            }
                        }
                        if ($scope.data.collectionlatdec !== 0) {
                            $scope.data.collectionlatmap = $scope.data.collectionlatdec;
                            $scope.data.collectionlongmap = $scope.data.collectionlongdec;
                            $scope.positions = [{
                                lat: $scope.data.collectionlatdec,
                                lng: $scope.data.collectionlongdec
                            }];
                        } else {
                            $scope.data.collectionlatmap = 25.907198;
                            $scope.data.collectionlongmap = 120.036569;
                            $scope.positions = [];
                        }
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
    /** DROP DOWN **/
    $scope.getdonationlist = null;
    $scope.getdonation = [];
    $http({
        method: 'GET',
        url: 'assets/views/action/getdonationlist.php'
    }).success(function(result) {
        $scope.getdonation = result;
    });
    $scope.getmethodlist = null;
    $scope.getmethod = [];
    $http({
        method: 'GET',
        url: 'assets/views/action/getmethodlist.php'
    }).success(function(result) {
        $scope.getmethod = result;
    });
    $scope.getcollectorlist = null;
    $scope.getcollector = [];
    $http({
        method: 'GET',
        url: 'assets/views/dataentry/simpleform/getcollectorlist.php'
    }).success(function(result) {
        $scope.getcollector = result;
    });
    $scope.GETcollectioncodelist = null;
    $scope.GETcollectioncode = [];
    $http({
        method: 'GET',
        url: 'assets/views/action/getcollectioncodelist.php'
    }).success(function(result) {
        $scope.GETcollectioncode = result;
    });
    /** LOCATION AUTO COMPLETE **/
    $scope.myModel;
    $scope.myModelPro;
    $scope.myModelAmp;
    $scope.myModelTam;
    $scope.onSelect = function($item, $model, $label) {}
    $scope.getcountry = function(viewValue) {
        return $http.get('./assets/views/action/getCountryList.php?query=' + viewValue).then(function(res) {
            return res.data;
        });
    }
    $scope.getprovince = function(viewValue) {
        var cou = 1;
        return $http.get('./assets/views/action/getProvinceList.php?query=' + viewValue + '&&cdid=' + cou).then(function(res) {
            return res.data;
        });
    }
    $scope.getamphur = function(viewValue) {
        var pro = $scope.item1.myModelPro.province_direct_id;
        return $http.get('./assets/views/action/getAmphurList.php?query=' + viewValue + '&&pdid=' + pro).then(function(res) {
            return res.data;
        });
    }
    $scope.gettambon = function(viewValue) {
        var aum = $scope.item1.myModelAmp.amphur_direct_id;
        return $http.get('./assets/views/action/getTambonList.php?query=' + viewValue + '&&adid=' + aum).then(function(res) {
            return res.data;
        });
    }
    $scope.ngModelOptionsSelected = function(value) {
        if (arguments.length) {
            _selected = value;
        } else {
            return _selected;
        }
    };
    $scope.modelOptions = {
        debounce: {
            default: 500,
            blur: 250
        },
        getterSetter: true
    };
    $scope.item1 = {
        myModelPro: '',
        myModelAmp: '',
        myModelTam: ''
    };
    /** COLLECTOR LIST **/
    $scope.myModelCollectorList = '';
    $scope.onSelect = function($item, $model, $label) {}
    $scope.CollectorKeyup = function(viewValue) {
        return $http.get('./assets/views/action/getCollectorList.php?sCollector=' + viewValue).then(function(res) {
            return res.data;
        });
    }
    $scope.addMore = function() {
        $("<DIV>").load("assets/views/action/input.php", function() {
            $("#product").append($(this).html());
        });
    }
    $scope.collectors = [];
    $scope.addRow = function() {
        //find id in array collectors 
        var result = $.grep($scope.collectors, function(e) {
            return e.collector_id == $scope.myModelCollectorList.collector_id
        });
        //check value in model and array
        if ($scope.myModelCollectorList === '') {
            alert("Please fill collector name");
        } else if (result.length === 0) {
            var countcollectors = $scope.collectors;
            var test = countcollectors.length;
            $scope.collectorseq = test + 1;
            $scope.collectors.push({
                'collector_firstname_en': $scope.myModelCollectorList.collector_firstname_en,
                'collector_lastname_en': $scope.myModelCollectorList.collector_lastname_en,
                'collector_label_alias': $scope.myModelCollectorList.collector_label_alias,
                'collector_id': $scope.myModelCollectorList.collector_id,
                'collectorseq': $scope.collectorseq
            });
        } else {
            alert("Collector already added");
        }
        //initial collector list
        $scope.collector_firstname_en = 'df';
        $scope.collector_lastname_en = 'sfs';
        $scope.collector_label_alias = 'sfs';
        $scope.collector_id = 'fsf';
        //clear collector form
        $(':input', '#collectorlist').not(':button, :submit, :reset, :hidden').val('').removeAttr('checked').removeAttr('selected');
    };
    $scope.addRowAsyncAsNV = function() {
        $scope.collectors.push({
            'collector_firstname_en': $scope.myModelCollectorList.collector_firstname_en,
            'collector_lastname_en': $scope.myModelCollectorList.collector_lastname_en,
            'collector_label_alias': $scope.myModelCollectorList.collector_label_alias,
            'collector_id': $scope.myModelCollectorList.collector_id
        });
        // Writing it to the server
        //      
        var data = 'collectorfirsten=' + $scope.myModelCollectorList.collector_name_en + '&collectorlasten=' + $scope.myModelCollectorList.collector_name_en + '&collectoralias=' + $scope.myModelCollectorList.collector_label_alias;
        '&collectorid=' + $scope.myModelCollectorList.collector_id;
        $http.post('/savecompany', data).success(function(data, status, headers, config) {
            $scope.message = data;
        }).error(function(data, status, headers, config) {
            alert("failure message: " + JSON.stringify({
                data: data
            }));
        });
        // Making the fields empty
        //
        $scope.collectorfirsten = '';
        $scope.collectorlasten = '';
        $scope.collectoralias = '';
        $scope.collectorid = '';
    };
    $scope.removeRow = function(collector_id) {
        var index = -1;
        var comArr = eval($scope.collectors);
        for (var i = 0; i < comArr.length; i++) {
            if (comArr[i].collector_id === collector_id) {
                index = i;
                break;
            }
        }
        if (index === -1) {
            alert("Something gone wrong");
        }

        function keyValue(key, value) {
            this.Key = collectorseq;
            this.Value = 1;
        };
        $scope.collectors.splice(index, 1);
        for (var i = 0; i < $scope.collectors.length; i++) {
            var b = i + 1;
            var a = $scope.collectors[i].collectorseq;
            $scope.collectors[i].collectorseq = b;
        }
    };
    /** INPUT MASK **/
    $(function() {
        $('.number').mask('0000');
        $('.date').mask('0000/00/00');
        $('.time').mask('00:00:00');
        $('.date_time').mask('00/00/0000 00:00:00');
        $('.cep').mask('00000-000');
        $('.phone').mask('0000-0000');
        $('.phone_with_ddd').mask('(00) 0000-0000');
        $('.phone_us').mask('(000) 000-0000');
        $('.mixed').mask('AAA 000-S0S');
        $('.ip_address').mask('099.099.099.099');
        $('.percent').mask('##0,00%', {
            reverse: true
        });
        $('.clear-if-not-match').mask("00/00/0000", {
            clearIfNotMatch: true
        });
        $('.placeholder').mask("00/00/0000", {
            placeholder: "__/__/____"
        });
        $('.fallback').mask("00r00r0000", {
            translation: {
                'r': {
                    pattern: /[\/]/,
                    fallback: '/'
                },
                placeholder: "__/__/____"
            }
        });
        $('.selectonfocus').mask("00/00/0000", {
            selectOnFocus: true
        });
        $('.cep_with_callback').mask('00000-000', {
            onComplete: function(cep) {
                console.log('Mask is done!:', cep);
            },
            onKeyPress: function(cep, event, currentField, options) {
                console.log('An key was pressed!:', cep, ' event: ', event, 'currentField: ', currentField.attr('class'), ' options: ', options);
            },
            onInvalid: function(val, e, field, invalid, options) {
                var error = invalid[0];
                console.log("Digit: ", error.v, " is invalid for the position: ", error.p, ". We expect something like: ", error.e);
            }
        });
        $('.crazy_cep').mask('00000-000', {
            onKeyPress: function(cep, e, field, options) {
                var masks = ['00000-000', '0-00-00-00'];
                mask = (cep.length > 7) ? masks[1] : masks[0];
                $('.crazy_cep').mask(mask, options);
            }
        });
        $('.cnpj').mask('00.000.000/0000-00', {
            reverse: true
        });
        $('.cpf').mask('000.000.000-00', {
            reverse: true
        });
        $('.money').mask('#.##0,00', {
            reverse: true
        });
        $('.latdecimal').mask('09.999999999999999');
        $('.londecimal').mask('009.999999999999999');
        $('.londecimal').mask('009.999999999999999');
        $('.number2p').mask('00');
        $('.number3p').mask('000');
        $('.degree').mask('09.00');
        $(".easting").mask("Z0999999.00000", {
            translation: {
                '0': {
                    pattern: /\d/
                },
                '9': {
                    pattern: /\d/,
                    optional: true
                },
                'Z': {
                    pattern: /[\-\+]/,
                    optional: true
                }
            }
        });
        var SPMaskBehavior = function(val) {
                return val.replace(/\D/g, '').length === 11 ? '(00) 00000-0000' : '(00) 0000-00009';
            },
            spOptions = {
                onKeyPress: function(val, e, field, options) {
                    field.mask(SPMaskBehavior.apply({}, arguments), options);
                }
            };
        $('.sp_celphones').mask(SPMaskBehavior, spOptions);
        $(".bt-mask-it").click(function() {
            $(".mask-on-div").mask("000.000.000-00");
            $(".mask-on-div").fadeOut(500).fadeIn(500)
        })
    });
    /** DATE PICKER **/
    $('#txtcollection_start_date').datepicker({
        format: "yyyy/mm/dd",
        todayHighlight: true,
        endDate: end,
        autoclose: true
    });
    $('#txtcollection_end_date').datepicker({
        format: "yyyy/mm/dd",
        todayHighlight: true,
        endDate: end,
        autoclose: true
    });
    /** INSERT SPECIMENS DATA **/
    $scope.CollectionData = function(form) {
        var a = $scope.item1.myModelAmp.amphur_direct_id;
        var b = $scope.item1.myModelTam.tambon_direct_id;
        var info = $scope.collectors;
        var collectionid = $scope.data.collid;
        var tambonid = getIfNotSet($scope.data.tambonid, '', true);
        var amphurid = getIfNotSet($scope.data.amphurid, '', true);
        var c = JSON.stringify(info);
        var amphurDirect = getIfNotSet(a, '', true);
        var tambonDirect = getIfNotSet($scope.item1.myModelTam.tambon_direct_id, '', true);
        var savetype = $('input[name="savetype"]:checked').val();
        var acceptable = $('input[name="acceptable"]:checked').val();
        var donation = getIfNotSet($scope.selectDonate, '', true);
        var method = getIfNotSet($scope.selectMethod, '', true);
        var collection_code_id = $scope.gencoll_code;
        var pmeters = "tcoll_id=" + collectionid + "&tcoll_start_date=" + encodeURI(document.getElementById("txtcollection_start_date").value) + "&tcoll_end_date=" + encodeURI(document.getElementById("txtcollection_end_date").value) + "&tmethod_method_id=" + method + "&tamphur_amphur_id=" + amphurid + "&ttambon_tambon_id=" + tambonid + "&tacceptable=" + acceptable + "&tamphur_direct_amphur_direct_id=" + amphurDirect + "&ttambon_direct_tambon_direct_id=" + tambonDirect + "&tcoll_specific_locality=" + document.getElementById("txtspecific_locality").value + "&tcoll_locality=" + encodeURI(document.getElementById("txtlocality").value) + "&tcoll_thabitat=" + encodeURI(document.getElementById("txthabitat").value) + "&tcoll_lat_dec=" + encodeURI(document.getElementById("txtlatdec").value) + "&tcoll_lat_d=" + encodeURI(document.getElementById("txtlat_d").value) + "&tcoll_lat_m=" + encodeURI(document.getElementById("txtlat_m").value) + "&tcoll_lat_s=" + encodeURI(document.getElementById("txtlat_s").value) + "&tcoll_long_dec=" + encodeURI(document.getElementById("txtlongdec").value) + "&tcoll_long_d=" + encodeURI(document.getElementById("txtlong_d").value) + "&tcoll_long_m=" + encodeURI(document.getElementById("txtlong_m").value) + "&tcoll_long_s=" + encodeURI(document.getElementById("txtlong_s").value) + "&tcoll_masl=" + encodeURI(document.getElementById("txtMASL").value) + "&tcoll_utm=" + encodeURI(document.getElementById("txtUTM").value) + "&tcoll_northing=" + encodeURI(document.getElementById("txtNorthing").value) + "&tcoll_easting=" + encodeURI(document.getElementById("txtEasting").value) + "&tdonations_id=" + donation + "&tcoll_code=" + $scope.data.coll_code + "&tcoll_year=" + $scope.data.coll_year + "&tcoll_number=" + $scope.data.coll_number + "&tcollection_code_id=" + collection_code_id + "&tcollectorid=" + c;
        var previousWindowKeyDown = window.onkeydown;
        $scope.toTheTop();
        var data = $.param({
            tcoll_id: collectionid,
            tcoll_start_date: encodeURI(document.getElementById("txtcollection_start_date").value),
            tcoll_end_date: encodeURI(document.getElementById("txtcollection_end_date").value),
            tmethod_method_id: method,
            tamphur_amphur_id: amphurid,
            ttambon_tambon_id: tambonid,
            tacceptable: acceptable,
            tamphur_direct_amphur_direct_id: amphurDirect,
            ttambon_direct_tambon_direct_id: tambonDirect,
            tcoll_specific_locality: $scope.data.collSlocality,
            tcoll_locality: $scope.data.collLocality,
            tcoll_thabitat: $scope.data.habitat,
            tcoll_lat_dec: encodeURI(document.getElementById("txtlatdec").value),
            tcoll_lat_d: encodeURI(document.getElementById("txtlat_d").value),
            tcoll_lat_m: encodeURI(document.getElementById("txtlat_m").value),
            tcoll_lat_s: encodeURI(document.getElementById("txtlat_s").value),
            tcoll_long_dec: encodeURI(document.getElementById("txtlongdec").value),
            tcoll_long_d: encodeURI(document.getElementById("txtlong_d").value),
            tcoll_long_m: encodeURI(document.getElementById("txtlong_m").value),
            tcoll_long_s: encodeURI(document.getElementById("txtlong_s").value),
            tcoll_masl: encodeURI(document.getElementById("txtMASL").value),
            tcoll_utm: encodeURI(document.getElementById("txtUTM").value),
            tcoll_northing: encodeURI(document.getElementById("txtNorthing").value),
            tcoll_easting: encodeURI(document.getElementById("txtEasting").value),
            tdonations_id: donation,
            tcoll_code: $scope.data.coll_code,
            tcoll_year: $scope.data.coll_year,
            tcoll_number: $scope.data.coll_number,
            tcollection_code_id: collection_code_id,
            tcollectorid: c
        });
          console.log(amphurid)
        /*
        if (form.$valid) {
            form.$setPristine();
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
                    $http({
                        method: 'POST',
                        url: "assets/views/action/collection_dbinsert.php",
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
                            $scope.Insmode = response[0].Ins_mode;
                            uploaderImages.onBeforeUploadItem = function(item) {
                                item.formData = [{
                                    coll_id: $scope.collectionid,
                                    secondParam: 'value'
                                }];
                            };
                            $scope.uploaderImages.uploadAll();
                            if ($scope.Insmode === 'ADD') {
                                if ($scope.savetype == 1) {
                                    $('#txtcollection_start_date').datepicker('setDate', null);
                                    $('#txtcollection_end_date').datepicker('setDate', null);
                                    $scope.txtcollection_start_date = '';
                                    $scope.txtcollection_end_date = '';
                                    $scope.collectors = [];
                                    $scope.data.coll_code = response[0].coll_code;
                                    $scope.data.coll_year = response[0].coll_year;
                                    $scope.data.coll_number = response[0].coll_number;
                                    $scope.resetcollectionform();
                                    $scope.clearMarkers();
                                }
                                if ($scope.savetype == 0) {
                                    $scope.data.coll_code = response[0].coll_code;
                                    $scope.data.coll_year = response[0].coll_year;
                                    $scope.data.coll_number = response[0].coll_number;
                                    uploaderImages.onSuccessItem = function(item, response, status, headers) {
                                        item.removeAfterUpload = false;
                                    };
                                }
                            }
                            if ($scope.Insmode === 'UPDATE') {
                                uploaderImages.onSuccessItem = function(item, response, status, headers) {
                                    item.removeAfterUpload = false;
                                }
                                $state.go("app.table.collectionTbl");
                            }
                        });
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
        /**
        if (form.$valid) {
            form.$setPristine();
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
                    $.ajax({
                        type: "POST",
                        url: "assets/views/action/collection_dbinsert.php",
                        data: pmeters,
                        success: function(result) {
                            SweetAlert.swal({
                                title: "Saved!",
                                text: "Your imaginary file has been Saved.",
                                type: "success",
                                confirmButtonColor: "#007AFF"
                            }, function(isConfirm) {
                                var obj = jQuery.parseJSON(result);
                                $.each(obj, function(key, inval) {
                                    $scope.coll_code = inval["coll_code"];
                                    $scope.coll_year = inval["coll_year"];
                                    $scope.coll_number = inval["coll_number"];
                                    $scope.collectionid = inval["coll_id"];
                                    $scope.Insmode = inval["Ins_mode"];
                                });
                                uploaderImages.onBeforeUploadItem = function(item) {
                                    item.formData = [{
                                        coll_id: $scope.collectionid,
                                        secondParam: 'value'
                                    }];
                                };
                                $scope.uploaderImages.uploadAll();
                                if ($scope.Insmode === 'ADD') {
                                    if ($scope.savetype == 1) {
                                        $(':input', '#collection_form').not(':button, :submit, :reset, :hidden').val(null)
                                        $scope.collection_form.$setPristine();
                                        $scope.collection_form.$setUntouched();
                                        $scope.txtcollection_start_date = ''
                                        $scope.txtcollection_end_date = '';
                                        $scope.txtlatdec = ''
                                        $scope.txtlongdec = '';
                                        $scope.collectors = [];
                                        $scope.data.coll_code = $scope.coll_code;
                                        $scope.data.coll_year = $scope.coll_year;
                                        $scope.data.coll_number = $scope.coll_number;
                                    }
                                    if ($scope.savetype == 0) {
                                        $scope.data.coll_code = $scope.coll_code;
                                        $scope.data.coll_year = $scope.coll_year;
                                        $scope.data.coll_number = $scope.coll_number;
                                        uploaderImages.onSuccessItem = function(item, response, status, headers) {
                                            item.removeAfterUpload = false;
                                        };
                                    }
                                }
                                if ($scope.Insmode === 'UPDATE') {
                                    uploaderImages.onSuccessItem = function(item, response, status, headers) {
                                        item.removeAfterUpload = false;
                                    }
                                }
                                if (isConfirm) {}
                            })
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
        }*/
    };
    $scope.resetcollectionform = function() {
        $scope.data.collectionlatdec = '';
        $scope.data.collectionlongdec = '';
        $scope.data.collectionlatd = '';
        $scope.data.collectionlatm = '';
        $scope.data.collectionlats = '';
        $scope.data.collectionlongd = '';
        $scope.data.collectionlongm = '';
        $scope.data.collectionlongs = '';
        $scope.data.provinceen = '';
        $scope.data.amphurid = '';
        $scope.data.amphuren = '';
        $scope.data.tambonid = '';
        $scope.data.tambonen = '';
        $scope.data.collectionmasl = '';
        $scope.item1.myModelPro = '';
        $scope.item1.myModelAmp = '';
        $scope.item1.myModelTam = '';
        $scope.data.collLocality = '';
        $scope.data.collSlocality = '';
        $scope.data.habitat = '';
        $scope.selectMethod = '';
        $scope.selectDonate = '';
        $scope.myModelCollectorList = '';
        $scope.collection_form.$setPristine();
        $scope.collection_form.$setUntouched();
    }
    $scope.checkbtn = function() {
        $scope.data.gencoll_code = 2;
        $scope.gencoll_code = "2";
        console.log($scope.gencoll_code);
    }
    /** end tag**/
}]);