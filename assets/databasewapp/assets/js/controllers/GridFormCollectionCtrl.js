'use strict';
/*addition*/ 
app.controller("GridFormCollectionCtrl", ["$scope", "$http", "$timeout", "$stateParams", "SweetAlert", "test","$state", function($scope, $http, $timeout, $stateParams, SweetAlert,test,$state,$window) {
    
    $http.get("assets/views/action/session.php")
    .success(function (response) {
    
     $scope.access_token = response.data[0].access_token;
        if($scope.access_token == ""){
             $state.go('login.signin')
        }
     
    });
    $scope.data = {};
    test.collno($stateParams.idcollection).success(function(result) {
        var startdate = result[0].collectionstartdate;
        var enddate = result[0].collectionenddate;
        $scope.data.idcollection = result[0].idcollection;
        $scope.data.collectionid = result[0].collectionid;
        $scope.data.collectionlatdec = result[0].collectionlatdec;
        $scope.data.collectionlatd = result[0].collectionlatd;
        $scope.data.collectionlatm = result[0].collectionlatm;
        $scope.data.collectionlats = result[0].collectionlats; 
        $scope.data.collectionlongdec = result[0].collectionlongdec;
        $scope.data.collectionlongd = result[0].collectionlongd;
        $scope.data.collectionlongm = result[0].collectionlongm;
        $scope.data.collectionlongs = result[0].collectionlongs;
        $scope.data.collectionnorthing = result[0].collectionnorthing;
        $scope.data.collectioneasting = result[0].collectioneasting;
        $scope.data.collectionutm = result[0].collectionutm;
        $scope.data.idcollectionmethods = result[0].collectionmethods_idcollectionmethods;
        $scope.data.collectionmethodsdetails = result[0].collectionmethodsdetails;
        $scope.data.idcollectors = result[0].collectors_idcollectors;
        $scope.data.collectorsen = result[0].collectorsen;
        /* $scope.data.collectorsen = result[0].collectorsen; */
        $("#txtamphur_ID").val(result[0].amphurs_idamphurs);
        $scope.data.collectionmasl = result[0].collectionmasl;
        $scope.data.amphuren = result[0].amphuren;
        $scope.data.provinceen = result[0].provinceen;
        $scope.data.tambonen = result[0].tambonen;
        $scope.data.collectionlocality = result[0].collectionlocality;
        $scope.data.collectionspecificlocality = result[0].collectionspecificlocality;
        $scope.data.coll_code = result[0].coll_code;
        $scope.data.coll_year = result[0].coll_year;
        $scope.data.coll_number = result[0].coll_number;
        $("#txtcollection_start_date,#txtcollection_end_date").datepicker({

            format: 'yyyy-mm-d',
            autoclose: true
        });
        $("#txtcollection_start_date").datepicker('setDate', startdate).on('changeDate', function(e) {
            var minDate = new Date(e.date.valueOf());
            $('#txtcollection_end_date').datepicker('setStartDate', minDate);
        });
        $('#txtcollection_end_date').datepicker('setDate', enddate).datepicker('setStartDate', startdate).on('changeDate', function(selected) {
            var maxDate = new Date(selected.date.valueOf());
            $('#txtcollection_start_date').datepicker('setEndDate', maxDate);
        });
    });

    var markers = [];
    $scope.$on('mapInitialized', function(evt, map) {
        var lat;
        var lng;
        var latlng;
        if ($scope.data.collectionlatdec > 0) {
            lat = $scope.data.collectionlatdec;
            lng = $scope.data.collectionlongdec;

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

    $scope.doCallAjaxautofill = function(flat, flong, fprovince, fidamphur, famphur, ftambon) {
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
        var pmeters = "flat=" + encodeURI(document.getElementById(flat).value) +
            "&flong=" + encodeURI(document.getElementById(flong).value);

        $.ajax({
            type: "POST",
            url: "assets/views/dataentry/simpleform/LocationGetFill.php",
            data: pmeters,
            success: function(response) {
                var flocation = response;
                if (flocation != "") {
                    var myArr = flocation.split("|");
                    document.getElementById(fprovince).value = myArr[0];
                    document.getElementById(fidamphur).value = myArr[1];
                    document.getElementById(famphur).value = myArr[2];
                    document.getElementById(ftambon).value = myArr[3];
                }
                if (newLat && newLon != null) {

                    var newLatLon = new google.maps.LatLng(newLat, newLon);
                    $scope.moveMap(newLatLon);
                }
            }
        });
    }

    $scope.getmarkerDMS = function(flat, flong, fprovince, fidamphur, famphur, ftambon) {
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
        var pmeters = "flat=" + encodeURI(document.getElementById(flat).value) +
            "&flong=" + encodeURI(document.getElementById(flong).value);
        $.ajax({
            type: "POST",
            url: "assets/views/dataentry/simpleform/LocationGetFill.php",
            data: pmeters,
            success: function(response) {
                var flocation = response;
                if (flocation != "") {
                    var myArr = flocation.split("|");
                    document.getElementById(fprovince).value = myArr[0];
                    document.getElementById(fidamphur).value = myArr[1];
                    document.getElementById(famphur).value = myArr[2];
                    document.getElementById(ftambon).value = myArr[3];
                }
                if (newLat && newLon != null) {

                    var newLatLon = new google.maps.LatLng(newLat, newLon);
                    $scope.moveMap(newLatLon);
                }
            }
        });
    }

    var savetype = $('input[name="savetype"]:checked').val()

    $scope.doCallAjaxinterfacesimilar = function(Mode) {
        var savetype = $('input[name="savetype"]:checked').val()
        alert(savetype);
        var pmeters = "tcollection_ID=" + encodeURI(document.getElementById("txtcollection_ID_inter").value) +
            "&tidcollection=" + encodeURI(document.getElementById("txtidcollection").value) +
            "&tcollection_start_date=" + encodeURI(document.getElementById("txtcollection_start_date").value) +
            "&tcollection_end_date=" + encodeURI(document.getElementById("txtcollection_end_date").value) +
            "&tcollection_method_ID=" + encodeURI(document.getElementById("txtcollection_method_ID").value) +
            "&tamphur_ID=" + encodeURI(document.getElementById("txtamphur_ID").value) +
            "&tspecific_locality=" + encodeURI(document.getElementById("txtspecific_locality").value) +
            "&tlocality=" + encodeURI(document.getElementById("txtlocality").value) +
            "&thabitat=" + encodeURI(document.getElementById("txthabitat").value) +
            "&tlatdec=" + encodeURI(document.getElementById("txtlatdec").value) +
            "&tlat_d=" + encodeURI(document.getElementById("txtlat_d").value) +
            "&tlat_m=" + encodeURI(document.getElementById("txtlat_m").value) +
            "&tlat_s=" + encodeURI(document.getElementById("txtlat_s").value) +
            "&tlongdec=" + encodeURI(document.getElementById("txtlongdec").value) +
            "&tlong_d=" + encodeURI(document.getElementById("txtlong_d").value) +
            "&tlong_m=" + encodeURI(document.getElementById("txtlong_m").value) +
            "&tlong_s=" + encodeURI(document.getElementById("txtlong_s").value) +
            "&tMASL=" + encodeURI(document.getElementById("txtMASL").value) +
            "&tUTM=" + encodeURI(document.getElementById("txtUTM").value) +
            "&tNorthing=" + encodeURI(document.getElementById("txtNorthing").value) +
            "&tEasting=" + encodeURI(document.getElementById("txtEasting").value) +
            "&tcollector_ID=" + encodeURI(document.getElementById("txtcollector_ID").value) +
            "&tcoll_code=" + encodeURI(document.getElementById("txtcoll_code_inter").value) +
            "&tcoll_year=" + encodeURI(document.getElementById("txtcoll_year_inter").value) +
            "&tcoll_number=" + encodeURI(document.getElementById("txtcoll_number_inter").value) +
            "&tMode=" + Mode;

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
                        if(savetype==1){
                         clearform();
                        }
                    }
                });
            }
        });

    }

    $scope.doCallAjaxinterface = function(Mode) {
         var savetype = $('input[name="savetype"]:checked').val()
        var pmeters = "tcollection_ID=" + encodeURI(document.getElementById("txtcollection_ID_inter").value) +
            "&tidcollection=" + encodeURI(document.getElementById("txtidcollection").value) +
            "&tcollection_start_date=" + encodeURI(document.getElementById("txtcollection_start_date").value) +
            "&tcollection_end_date=" + encodeURI(document.getElementById("txtcollection_end_date").value) +
            "&tcollection_method_ID=" + encodeURI(document.getElementById("txtcollection_method_ID").value) +
            "&tamphur_ID=" + encodeURI(document.getElementById("txtamphur_ID").value) +
            "&tspecific_locality=" + encodeURI(document.getElementById("txtspecific_locality").value) +
            "&tlocality=" + encodeURI(document.getElementById("txtlocality").value) +
            "&thabitat=" + encodeURI(document.getElementById("txthabitat").value) +
            "&tlatdec=" + encodeURI(document.getElementById("txtlatdec").value) +
            "&tlat_d=" + encodeURI(document.getElementById("txtlat_d").value) +
            "&tlat_m=" + encodeURI(document.getElementById("txtlat_m").value) +
            "&tlat_s=" + encodeURI(document.getElementById("txtlat_s").value) +
            "&tlongdec=" + encodeURI(document.getElementById("txtlongdec").value) +
            "&tlong_d=" + encodeURI(document.getElementById("txtlong_d").value) +
            "&tlong_m=" + encodeURI(document.getElementById("txtlong_m").value) +
            "&tlong_s=" + encodeURI(document.getElementById("txtlong_s").value) +
            "&tMASL=" + encodeURI(document.getElementById("txtMASL").value) +
            "&tUTM=" + encodeURI(document.getElementById("txtUTM").value) +
            "&tNorthing=" + encodeURI(document.getElementById("txtNorthing").value) +
            "&tEasting=" + encodeURI(document.getElementById("txtEasting").value) +
            "&tcollector_ID=" + encodeURI(document.getElementById("txtcollector_ID").value) +
            "&tcoll_code=" + encodeURI(document.getElementById("txtcoll_code_inter").value) +
            "&tcoll_year=" + encodeURI(document.getElementById("txtcoll_year_inter").value) +
            "&tcoll_number=" + encodeURI(document.getElementById("txtcoll_number_inter").value) +
            "&tMode=" + Mode;

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
                        if(savetype==1){
                         clearform();
                        }
                    }
                });
            }
        });

        /*
  document.querySelector('input[name="txtcoll_code_inter"]').value = $scope.data.coll_year;
             document.querySelector('input[name="txtcoll_year_inter"]').value = $scope.data.coll_year;
           document.querySelector('input[name="txtcoll_number_inter"]').value = $scope.data.coll_number = 


    $scope.data.collno = response[0].collno;  
        $scope.data.coll_code = response[0].coll_code;  
        $scope.data.coll_year = response[0].coll_year;  
        $scope.data.coll_number = response[0].coll_number;  
    */
    }

    function clearform() {
        document.getElementById("txtcollection_start_date").value = '';
        document.getElementById("txtcollection_end_date").value = '';
        document.getElementById("txtcollection_method_ID").value = '';
        document.getElementById("txtamphur_ID").value = '';
        document.getElementById("txtspecific_locality").value = '';
        document.getElementById("txtlocality").value = '';
        document.getElementById("txthabitat").value = '';
        document.getElementById("txtlatdec").value = '';
        document.getElementById("txtlongdec").value = '';
        document.getElementById("txtlat_d").value = '';
        document.getElementById("txtlat_m").value = '';
        document.getElementById("txtlat_s").value = '';
        document.getElementById("txtlong_d").value = '';
        document.getElementById("txtlong_m").value = '';
        document.getElementById("txtlong_s").value = '';
        document.getElementById("txtMASL").value = '';
        document.getElementById("txtNorthing").value = '';
        document.getElementById("txtEasting").value = '';
        document.getElementById("txtUTM").value = '';
        document.getElementById("txtcollector_ID").value = '';
        document.getElementById("txttambon").value = '';
        document.getElementById("txtprovinceen").value = '';
        document.getElementById("txtamphuren").value = '';
        document.getElementById("txtcollection_ID").value = '';

    }

    function autocollectionid() {
        var object2 = document.getElementsByName('txtcoll_code');
        alert(object2.item(0).value);
    }

    $scope.getmethodlist = null;
    $scope.getmethod = [];
    $http({
        method: 'GET',
        url: 'assets/views/dataentry/simpleform/getmethodlist.php'
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
      var mapOptions = {
          zoom: 6,
          center: new google.maps.LatLng(defLat, defLon),
          mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      map = new google.maps.Map(document.getElementById('googleMap'), mapOptions);


      markers = new google.maps.Marker({
          map: map,
          animation: google.maps.Animation.DROP
      });*/
}])
