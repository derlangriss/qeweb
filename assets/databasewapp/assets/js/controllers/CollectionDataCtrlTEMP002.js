'use strict';
/*addition*/
app.controller("CollectionDataCtrl", ["$scope", "ngNotify", "$http", "$timeout", "$stateParams", "SweetAlert", "info", "$state", 'FileUploader', 'ngNotify', function($scope, ngNotify, $http, $timeout, $stateParams, SweetAlert, info, $state, FileUploader, $window) {
    $scope.currentStep = 1;
    var errorMessage = function(i) {
        ngNotify.set('please complete the form in this step before proceeding', {
            theme: 'pure',
            position: 'top',
            type: 'error',
            button: 'true',
            sticky: 'false',
        });
    }

    $scope.savetype = "1";
    $scope.selectDonate = "1";
    $scope.acceptable = "1";
    $scope.data = {};  
    var date = new Date();
            var today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
            var end = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    info.collectiondata($stateParams.collid).success(function(result) {
        if (result.length === 0) {
            console.log(result);
            $scope.acceptable = "1";
        } else if (result[0].coll_id === undefined) {
            $scope.data.coll_code = result[0].coll_code;
            $scope.data.coll_year = result[0].coll_year;
            $scope.data.coll_number = result[0].coll_number;
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
            $scope.data.collectionutm = result[0].coll_utm;
            $scope.selectMethod = result[0].method_method_id;
            $scope.selectDonate = result[0].donation_donation_id;
            $scope.data.collectionmethodsdetails = result[0].collectionmethodsdetails;
            $scope.data.idcollectors = result[0].collectors_idcollectors;
            $scope.data.collectorsen = result[0].collectorsen;
            /* $scope.data.collectorsen = result[0].collectorsen; */
            $("#txtamphur_ID").val(result[0].amphur_amphur_id);
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
            $("input[name=savetype][value='1']").prop("checked", true);
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
                $("input[name=acceptable][value='0']").prop("checked", true);
                $scope.status = {
                    open: "true",
                    isFirstDisabled: !1
                }
            }
            if ($scope.data.acceptable === '1') {
                $("input[name=acceptable][value='1']").prop("checked", true);
            }
            if (result[0].collector_firstname_en !== null) {
                if (result[0].collector_firstname_en.length !== null) {
                    $scope.collectors = result;
                }
            }
        }
    });
    info.imagesdata($stateParams.collid).success(function(result) {
        if (result.length === 0) {
            console.log(result);
        } else if (result[0].coll_id === undefined) {} else {
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
    var markers = [];
    $scope.$on('mapInitialized', function(evt, map) {
        var lat;
        var lng;
        var latlng;
        if ($scope.data.collectionlatdec > 0) {
            lat = "18";
            lng = "98";
            latlng = new google.maps.LatLng(lat, lng);
            $scope.map.setCenter(latlng)
            /* marker.setPosition();
             markers.setMap($scope.map);*/
            markers = new google.maps.Marker({
                position: latlng,
                map: map,
                draggable: false,
                animation: google.maps.Animation.DROP
            });
        } else {
            lat = 15.907198;
            lng = 101.036569;
            latlng = new google.maps.LatLng(lat, lng);
            $scope.map.setCenter(latlng)
            /* marker.setPosition();
             markers.setMap($scope.map);*/
            markers = new google.maps.Marker({
                map: map,
                draggable: false,
                animation: google.maps.Animation.DROP
            });
        }
    });
    $scope.clearmap = function() {
        var lat = 15.907198;
        var lng = 101.036569;
        var latlng = new google.maps.LatLng(lat, lng);
        $scope.map.setCenter(latlng)
        markers.setPosition()
    }
    $scope.moveMap = function(newLatLon) {
        $scope.map.setCenter(newLatLon)
        markers.setPosition(newLatLon)
    } 
    /*docallAjaxfix*/
    $scope.doCallAjaxautofill = function(flat, flong, fprovince, fidamphur, famphur, fidtambon, ftambon) {
        var txtlatdec = document.getElementById('txtlatdec').value;
        var txtlondec = document.getElementById('txtlongdec').value;
        if (txtlatdec != '') {
            var signlat = 1;
            var latAbs = 0;
            latAbs = Math.abs(Math.round(document.getElementById('txtlatdec').value * 1000000.));
            document.getElementById('txtlat_d').value = (Math.floor(latAbs / 1000000) * signlat);
            document.getElementById('txtlat_m').value = Math.floor(((latAbs / 1000000) - Math.floor(latAbs / 1000000)) * 60);
            document.getElementById('txtlat_s').value = (Math.floor(((((latAbs / 1000000) - Math.floor(latAbs / 1000000)) * 60) - Math.floor(((latAbs / 1000000) - Math.floor(latAbs / 1000000)) * 60)) * 100000) * 60 / 100000);
            var newLat = document.getElementById('txtlatdec').value
        } else {
            document.getElementById('txtlat_d').value = null;
            document.getElementById('txtlat_m').value = null;
            document.getElementById('txtlat_s').value = null;
        }
        if (txtlondec != '') {
            var signlon = 1;
            var lonAbs = 0;
            lonAbs = Math.abs(Math.round(document.getElementById('txtlongdec').value * 1000000.));
            document.getElementById('txtlong_d').value = (Math.floor(lonAbs / 1000000) * signlon);
            document.getElementById('txtlong_m').value = Math.floor(((lonAbs / 1000000) - Math.floor(lonAbs / 1000000)) * 60);
            document.getElementById('txtlong_s').value = (Math.floor(((((lonAbs / 1000000) - Math.floor(lonAbs / 1000000)) * 60) - Math.floor(((lonAbs / 1000000) - Math.floor(lonAbs / 1000000)) * 60)) * 100000) * 60 / 100000);
            var newLon = document.getElementById('txtlongdec').value
        } else {
            document.getElementById('txtlong_d').value = null;
            document.getElementById('txtlong_m').value = null;
            document.getElementById('txtlong_s').value = null;
        }
        var pmeters = "flat=" + encodeURI(document.getElementById(flat).value) + "&flong=" + encodeURI(document.getElementById(flong).value);
        if (newLat && newLon != null) {
            $.ajax({
                type: "POST",
                url: "assets/views/action/LocationGetFill.php",
                data: pmeters,
                success: function(response) {
                    var flocation = response;
                    if (flocation != "") {
                        var myArr = flocation.split("|");
                        document.getElementById(fprovince).value = myArr[0];
                        $scope.data.amphurid = myArr[1];
                        document.getElementById(famphur).value = myArr[2];
                        $scope.data.tambonid = myArr[3];
                        document.getElementById(ftambon).value = myArr[4];
                    } else {
                        document.getElementById(fprovince).value = '';
                        $scope.data.amphurid = '';
                        document.getElementById(famphur).value = '';
                        $scope.data.tambonid = '';
                        document.getElementById(ftambon).value = '';
                    }
                    var newLatLon = new google.maps.LatLng(newLat, newLon);
                    $scope.moveMap(newLatLon);
                }
            });
        } else {
            var lat = 15.907198;
            var lng = 101.036569;
            var latlng = new google.maps.LatLng(lat, lng);
            $scope.map.setCenter(latlng)
            markers.setPosition()
        }
    }
    /*docallAjaxfix*/
    $scope.doCallAjaxddddddautofill = function(flat, flong, fprovince, fidamphur, famphur, fidtambon, ftambon) {
        if (document.getElementById('txtlatdec').value != '') {
            var signlat = 1;
            var latAbs = 0;
            latAbs = Math.abs(Math.round(document.getElementById('txtlatdec').value * 1000000.));
            document.getElementById('txtlat_d').value = (Math.floor(latAbs / 1000000) * signlat);
            document.getElementById('txtlat_m').value = Math.floor(((latAbs / 1000000) - Math.floor(latAbs / 1000000)) * 60);
            document.getElementById('txtlat_s').value = (Math.floor(((((latAbs / 1000000) - Math.floor(latAbs / 1000000)) * 60) - Math.floor(((latAbs / 1000000) - Math.floor(latAbs / 1000000)) * 60)) * 100000) * 60 / 100000);
            var newLat = document.getElementById('txtlatdec').value
        } else {
            document.getElementById('txtlat_d').value = null;
            document.getElementById('txtlat_m').value = null;
            document.getElementById('txtlat_s').value = null;
            $scope.clearmap();
        }
        if (document.getElementById('txtlongdec').value != '') {
            var signlon = 1;
            var lonAbs = 0;
            lonAbs = Math.abs(Math.round(document.getElementById('txtlongdec').value * 1000000.));
            document.getElementById('txtlong_d').value = (Math.floor(lonAbs / 1000000) * signlon);
            document.getElementById('txtlong_m').value = Math.floor(((lonAbs / 1000000) - Math.floor(lonAbs / 1000000)) * 60);
            document.getElementById('txtlong_s').value = (Math.floor(((((lonAbs / 1000000) - Math.floor(lonAbs / 1000000)) * 60) - Math.floor(((lonAbs / 1000000) - Math.floor(lonAbs / 1000000)) * 60)) * 100000) * 60 / 100000);
            var newLon = document.getElementById('txtlongdec').value
        } else {
            document.getElementById('txtlong_d').value = null;
            document.getElementById('txtlong_m').value = null;
            document.getElementById('txtlong_s').value = null;
            $scope.clearmap();
        }
        var pmeters = "flat=" + encodeURI(document.getElementById(flat).value) + "&flong=" + encodeURI(document.getElementById(flong).value);
        $.ajax({
            type: "POST",
            url: "assets/views/action/LocationGetFill.php",
            data: pmeters,
            success: function(response) {
                var flocation = response;
                if (flocation != "") {
                    var myArr = flocation.split("|");
                    document.getElementById(fprovince).value = myArr[0];
                    document.getElementById(fidamphur).value = myArr[1];
                    document.getElementById(famphur).value = myArr[2];
                    document.getElementById(fidtambon).value = myArr[3];
                    document.getElementById(ftambon).value = myArr[4];
                } else {
                    document.getElementById(fprovince).value = '';
                    document.getElementById(fidamphur).value = '';
                    document.getElementById(famphur).value = '';
                    document.getElementById(fidtambon).value = '';
                    document.getElementById(ftambon).value = '';
                }
                if (newLat && newLon != null) {
                    var newLatLon = new google.maps.LatLng(newLat, newLon);
                    $scope.moveMap(newLatLon);
                } else {
                    var lat = 15.907198;
                    var lng = 101.036569;
                    var latlng = new google.maps.LatLng(lat, lng);
                    $scope.map.setCenter(latlng)
                    markers.setPosition()
                }
            }
        });
    }
    $scope.getmarkerDMS = function(flat, flong, fprovince, fidamphur, famphur, fidtambon, ftambon) {
        if (document.getElementById('txtlat_d').value != '') {
            var latdegrees = parseInt(document.getElementById("txtlat_d").value) || 0;
            var latminutes = parseInt(document.getElementById("txtlat_m").value) || 0;
            var latseconds = parseInt(document.getElementById("txtlat_s").value) || 0;
            document.getElementById("txtlatdec").value = latdegrees + (latminutes / 60) + (latseconds / 3600);
            var newLat = document.getElementById('txtlatdec').value
        }
        if (document.getElementById('txtlong_d').value != '') {
            var longdegrees = parseInt(document.getElementById("txtlong_d").value) || 0;
            var longminutes = parseInt(document.getElementById("txtlong_m").value) || 0;
            var longseconds = parseInt(document.getElementById("txtlong_s").value) || 0;
            document.getElementById("txtlongdec").value = longdegrees + (longminutes / 60) + (longseconds / 3600);
            var newLon = document.getElementById('txtlongdec').value
        }
        var pmeters = "flat=" + encodeURI(document.getElementById(flat).value) + "&flong=" + encodeURI(document.getElementById(flong).value);
        $.ajax({
            type: "POST",
            url: "assets/views/action/LocationGetFill.php",
            data: pmeters,
            success: function(response) {
                var flocation = response;
                if (flocation != "") {
                    var myArr = flocation.split("|");
                    document.getElementById(fprovince).value = myArr[0];
                    document.getElementById(fidamphur).value = myArr[1];
                    document.getElementById(famphur).value = myArr[2];
                    document.getElementById(fidtambon).value = myArr[3];
                    document.getElementById(ftambon).value = myArr[4];
                } else {
                    document.getElementById(fprovince).value = '';
                    document.getElementById(fidamphur).value = '';
                    document.getElementById(famphur).value = '';
                    document.getElementById(fidtambon).value = '';
                    document.getElementById(ftambon).value = '';
                }
                if (newLat && newLon != null) {
                    var newLatLon = new google.maps.LatLng(newLat, newLon);
                    $scope.moveMap(newLatLon);
                } else {
                    var lat = 15.907198;
                    var lng = 101.036569;
                    var latlng = new google.maps.LatLng(lat, lng);
                    $scope.map.setCenter(latlng)
                    markers.setPosition()
                }
            }
        });
    }
    var savetype = $('input[name="savetype"]:checked').val()
    $scope.doCallAjaxinterfacesimilar = function(Mode) {
        var savetype = $('input[name="savetype"]:checked').val()
        alert(savetype);
        var pmeters = "tcollection_ID=" + encodeURI(document.getElementById("txtcollection_ID_inter").value) + "&tidcollection=" + encodeURI(document.getElementById("txtidcollection").value) + "&tcollection_start_date=" + encodeURI(document.getElementById("txtcollection_start_date").value) + "&tcollection_end_date=" + encodeURI(document.getElementById("txtcollection_end_date").value) + "&tcollection_method_ID=" + encodeURI(document.getElementById("txtcollection_method_ID").value) + "&tamphur_ID=" + encodeURI(document.getElementById("txtamphur_ID").value) + "&tspecific_locality=" + encodeURI(document.getElementById("txtspecific_locality").value) + "&tlocality=" + encodeURI(document.getElementById("txtlocality").value) + "&thabitat=" + encodeURI(document.getElementById("txthabitat").value) + "&tlatdec=" + encodeURI(document.getElementById("txtlatdec").value) + "&tlat_d=" + encodeURI(document.getElementById("txtlat_d").value) + "&tlat_m=" + encodeURI(document.getElementById("txtlat_m").value) + "&tlat_s=" + encodeURI(document.getElementById("txtlat_s").value) + "&tlongdec=" + encodeURI(document.getElementById("txtlongdec").value) + "&tlong_d=" + encodeURI(document.getElementById("txtlong_d").value) + "&tlong_m=" + encodeURI(document.getElementById("txtlong_m").value) + "&tlong_s=" + encodeURI(document.getElementById("txtlong_s").value) + "&tMASL=" + encodeURI(document.getElementById("txtMASL").value) + "&tUTM=" + encodeURI(document.getElementById("txtUTM").value) + "&tNorthing=" + encodeURI(document.getElementById("txtNorthing").value) + "&tEasting=" + encodeURI(document.getElementById("txtEasting").value) + "&tcollector_ID=" + encodeURI(document.getElementById("txtcollector_ID").value) + "&tcoll_code=" + encodeURI(document.getElementById("txtcoll_code_inter").value) + "&tcoll_year=" + encodeURI(document.getElementById("txtcoll_year_inter").value) + "&tcoll_number=" + encodeURI(document.getElementById("txtcoll_number_inter").value) + "&tMode=" + Mode;
        $.ajax({
            type: "POST",
            url: "assets/views/dataentry/simpleform/dbinsert.php",
            data: pmeters,
            success: function(result) {
                var obj = jQuery.parseJSON(result);
                SweetAlert.swal({
                    title: "Success",
                    confirmButtonColor: "#007AFF"
                }, function(isConfirm) {
                    if (isConfirm) {
                        $.each(obj, function(key, inval) {
                            document.querySelector('input[name="txtcoll_code_inter"]').value = inval["coll_code"];
                            document.querySelector('input[name="txtcoll_year_inter"]').value = inval["coll_year"];
                            document.querySelector('input[name="txtcoll_number_inter"]').value = inval["coll_number"];
                        });
                        if (savetype == 1) {
                            clearform();
                        }
                    }
                });
            }
        });
    }
    $scope.COLLECTIONSEARCH = function() {
        $.ajax({
            url: "assets/views/action/return_collectiondetails.php",
            type: "POST",
            data: {
                sCode: $("#txtcoll_code_inter").val(),
                sYear: $("#txtcoll_year_inter").val(),
                sNumber: $("#txtcoll_number_inter").val()
            }
        }).success(function(result) {
            var obj = jQuery.parseJSON(result);
            if (obj == '') {
                alert('No Record Found');
                clearform();
            } else {
                $.each(obj, function(key, inval) {
                    var startdate = inval["coll_start_date"];
                    var enddate = inval["coll_end_date"];
                    $("#txtidcollection").val(inval["idcollection"]);
                    $("#txtcollection_ID").val(inval["collectionid"]);
                    $("#txtcollection_end_date").datepicker('setDate', enddate);
                    $("#txtlatdec").val(inval["collectionlatdec"]);
                    $("#txtlat_d").val(inval["collectionlatd"]);
                    $("#txtlat_m").val(inval["collectionlatm"]);
                    $("#txtlat_s").val(inval["collectionlats"]);
                    $("#txtlongdec").val(inval["collectionlongdec"]);
                    $("#txtlong_d").val(inval["collectionlongd"]);
                    $("#txtlong_m").val(inval["collectionlongm"]);
                    $("#txtlong_s").val(inval["collectionlongs"]);
                    $("#txtNorthing").val(inval["collectionnorthing"]);
                    $("#txtEasting").val(inval["collectioneasting"]);
                    $("#txtUTM").val(inval["collectionutm"]);
                    $("#txtMASL").val(inval["collectionmasl"]);
                    $("#txtamphur_ID").val(inval["amphurs_idamphurs"]);
                    $("#txtamphuren").val(inval["amphuren"]);
                    $("#txtprovinceen").val(inval["provinceen"]);
                    $("#txttambon").val(inval["tambonen"]);
                    $("#txtlocality").val(inval["collectionlocality"]);
                    $("#txtspecific_locality").val(inval["collectionspecificlocality"]);
                    $("#txthabitat").val(inval["collectionhabitat"]);
                    $("#txtcollection_method_ID").val(inval["collectionmethods_idcollectionmethods"]);
                    $("#txtcollector_ID").val(inval["collectors_idcollectors"]);
                    $('#txtcollection_start_date').datepicker('setDate', startdate);
                });
            }
        });
    };
    $scope.GETNERATEAUTOCOLLNO = function() {
        $.ajax({
            url: "assets/views/action/return_collnumber.php",
            type: "POST"
        }).success(function(result) {
            var obj = jQuery.parseJSON(result);
            if (obj == '') {
                alter
                $('input[type=text]').val('');
            } else {
                $.each(obj, function(key, inval) {
                    $('#txtcoll_code_inter').val(inval["coll_code"]);
                    $('#txtcoll_year_inter').val(inval["coll_year"]);
                    $('#txtcoll_number_inter').val(inval["coll_number"]);
                });
            }
        })
    };

    function getIfNotSet(value, newValue, overwriteNull) {
        if (typeof(value) === 'undefined') {
            return newValue;
        } else if (value === null && overwriteNull === true) {
            return newValue;
        } else if (value === 0 && overwriteZero === true) {
            return newValue;
        } else {
            return value;
        }
    }
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
    console.info('uploader', uploaderImages);
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
        var pmeters = "tcoll_id=" + collectionid +
            /* "&tcoll_full_id=" + encodeURI(document.getElementById("txtcoll_full_id").value) + */
            "&tcoll_start_date=" + encodeURI(document.getElementById("txtcollection_start_date").value) + "&tcoll_end_date=" + encodeURI(document.getElementById("txtcollection_end_date").value) + "&tmethod_method_id=" + method + "&tamphur_amphur_id=" + amphurid + "&ttambon_tambon_id=" + tambonid + "&tacceptable=" + acceptable + "&tamphur_direct_amphur_direct_id=" + amphurDirect + "&ttambon_direct_tambon_direct_id=" + tambonDirect + "&tcoll_specific_locality=" + document.getElementById("txtspecific_locality").value + "&tcoll_locality=" + encodeURI(document.getElementById("txtlocality").value) + "&tcoll_thabitat=" + encodeURI(document.getElementById("txthabitat").value) + "&tcoll_lat_dec=" + encodeURI(document.getElementById("txtlatdec").value) + "&tcoll_lat_d=" + encodeURI(document.getElementById("txtlat_d").value) + "&tcoll_lat_m=" + encodeURI(document.getElementById("txtlat_m").value) + "&tcoll_lat_s=" + encodeURI(document.getElementById("txtlat_s").value) + "&tcoll_long_dec=" + encodeURI(document.getElementById("txtlongdec").value) + "&tcoll_long_d=" + encodeURI(document.getElementById("txtlong_d").value) + "&tcoll_long_m=" + encodeURI(document.getElementById("txtlong_m").value) + "&tcoll_long_s=" + encodeURI(document.getElementById("txtlong_s").value) + "&tcoll_masl=" + encodeURI(document.getElementById("txtMASL").value) + "&tcoll_utm=" + encodeURI(document.getElementById("txtUTM").value) + "&tcoll_northing=" + encodeURI(document.getElementById("txtNorthing").value) + "&tcoll_easting=" + encodeURI(document.getElementById("txtEasting").value) + "&tdonations_id=" + donation + "&tcoll_code=" + encodeURI(document.getElementById("txtcoll_code_inter").value) + "&tcoll_year=" + encodeURI(document.getElementById("txtcoll_year_inter").value) + "&tcoll_number=" + encodeURI(document.getElementById("txtcoll_number_inter").value) + "&tcollectorid=" + c;
        var previousWindowKeyDown = window.onkeydown;
        $scope.toTheTop();
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

                                        $scope.Form.$setPristine();
                                        $scope.Form.$setUntouched();
                                        $scope.txtcollection_start_date = ''
                                        $scope.txtcollection_end_date = '';
                                        $scope.txtlatdec = ''
                                        $scope.txtlongdec = '';
                                        $scope.collectors = [];
                                        document.querySelector('input[name="txtcoll_code"]').value = $scope.coll_code;
                                        document.querySelector('input[name="txtcoll_year"]').value = $scope.coll_year;
                                        document.querySelector('input[name="txtcoll_number"]').value = $scope.coll_number;
                                    }
                                    if ($scope.savetype == 0) {
                                        document.querySelector('input[name="txtcoll_code"]').value = $scope.coll_code;
                                        document.querySelector('input[name="txtcoll_year"]').value = $scope.coll_year;
                                        document.querySelector('input[name="txtcoll_number"]').value = $scope.coll_number;
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
        }
    };

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
/*
$scope.date_range = {
    today: moment().format("D MMMM, YYYY"),
    last_month: moment().subtract("M", 1).format("D MMMM, YYYY")
};
$.isFunction($.fn.datepicker) && ($.fn.datepicker.DPGlobal.template = $.fn.datepicker.DPGlobal.template.replace(/\&laquo;/g, '<i class="arrow_carrot-left"></i>').replace(/\&raquo;/g, '<i class="arrow_carrot-right"></i>'));
$("#dp_basic").length && $("#dp_basic").datepicker({
    keyboardNavigation: false,
    forceParse: false,
    autoclose: !0
});
$("#dp_component").length && $("#dp_component").datepicker({
    autoclose: !0
});
$("#dp_range").length && $("#dp_range").datepicker({
    autoclose: !0,
    format: 'dd/mm/yyyy',
    forceParse: false
});
$("#dp_inline").length && $("#dp_inline").datepicker()
*/
$scope.addMore = function() {
    $("<DIV>").load("assets/views/action/input.php", function() {
        $("#product").append($(this).html());
    });
}
$scope.collectors = [];
$scope.myModelCollector = '';
$scope.addRow = function() {
    //find id in array collectors 
    var result = $.grep($scope.collectors, function(e) {
        return e.collector_id == $scope.myModelCollector.collector_id
    });
    //check value in model and array
    if ($scope.myModelCollector === '') {
        alert("Please fill collector name");
    } else if (result.length === 0) {
        var countcollectors = $scope.collectors;
        var test = countcollectors.length;
        $scope.collectorseq = test + 1;
        $scope.collectors.push({
            'collector_firstname_en': $scope.myModelCollector.collector_firstname_en,
            'collector_lastname_en': $scope.myModelCollector.collector_lastname_en,
            'collector_label_alias': $scope.myModelCollector.collector_label_alias,
            'collector_id': $scope.myModelCollector.collector_id,
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
        'collector_firstname_en': $scope.myModelCollector.collector_firstname_en,
        'collector_lastname_en': $scope.myModelCollector.collector_lastname_en,
        'collector_label_alias': $scope.myModelCollector.collector_label_alias,
        'collector_id': $scope.myModelCollector.collector_id
    });
    // Writing it to the server
    //      
    var data = 'collectorfirsten=' + $scope.myModelCollector.collector_name_en + '&collectorlasten=' + $scope.myModelCollector.collector_name_en + '&collectoralias=' + $scope.myModelCollector.collector_label_alias;
    '&collectorid=' + $scope.myModelCollector.collector_id;
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
        $scope.collectors.splice(index, 1);
    }
    console.log($scope.myModelCollector);
};
$scope.search_number = function() {
    var dataset = {
        coll_year_on_inter: $("input#txtcoll_year_inter").val()
    };
    $.ajax({
        type: 'POST',
        url: 'assets/views/action/coll_number.php',
        data: dataset,
        success: function(result) {
            var obj = jQuery.parseJSON(result);
            $.each(obj, function(key, inval) {
                document.querySelector('input[name="txtcoll_number_inter"]').value = inval["newnumber"];
            });
        }
    });
};
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
$scope.getcollectornew = function(viewValue) {
    return $http.get('./assets/views/action/getCollectorList.php?query=' + viewValue).then(function(res) {
        return res.data;
    });
}
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
    $('.degree').mask('09.0');
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
}])