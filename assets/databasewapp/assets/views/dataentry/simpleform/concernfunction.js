
  
  function doCallAjaxinterfacesimilar(Mode) {
    var pmeters = "tcollection_ID=" + encodeURI(document.getElementById("txtcollection_ID_inter").value) +
        "&tcollection_start_date=" + encodeURI(document.getElementById("txtcollection_start_date").value) +
        "&tcollection_end_date=" + encodeURI(document.getElementById("txtcollection_end_date").value) +
        "&tcollection_method_ID=" + encodeURI(document.getElementById("txtcollection_method_ID").value) +
        "&tamphur_ID=" + encodeURI(document.getElementById("txtamphur_ID").value) +
        "&tspecific_locality=" + encodeURI(document.getElementById("txtspecific_locality").value) +
        "&tlocality=" + encodeURI(document.getElementById("txtlocality").value) +
        "&thabitat=" + encodeURI(document.getElementById("txthabitat").value) +
        "&tlat_d=" + encodeURI(document.getElementById("txtlat_d").value) +
        "&tlat_m=" + encodeURI(document.getElementById("txtlat_m").value) +
        "&tlat_s=" + encodeURI(document.getElementById("txtlat_s").value) +
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
        url: "views/dataentry/simpleform/dbinsert.php",
        data: pmeters,      
        success: function(response) {
            $("#mySpan").html(response);
            autocollectoinid();
          }
    });
  }

  function autofill() {
    var object1 = document.getElementsByName('txtcollection_start_date');
    var object = document.getElementsByName('txtcollection_end_date');
    object.item(0).value = object1.item(0).value;
  }

  function autocollectoinid() {
    var object2 = document.getElementsByName('txtcoll_code_inter');
    var object3 = document.getElementsByName('txtcoll_code');
    object2.item(0).value = object3.item(0).value;
    var object4 = document.getElementsByName('txtcoll_year_inter');
    var object5 = document.getElementsByName('txtcoll_year');
    object4.item(0).value = object5.item(0).value;
    var object6 = document.getElementsByName('txtcoll_number_inter');
    var object7 = document.getElementsByName('txtcoll_number');
    object6.item(0).value = object7.item(0).value;
    var object8 = document.getElementsByName('txtcollection_ID_inter');
    var object9 = document.getElementsByName('txtcollection_ID');
    object8.item(0).value = object9.item(0).value;
  }

  function autocollnumber() {
    var object10 = document.getElementsByName('txtcoll_number_inter');
    var object11 = document.getElementsByName('txtcoll_autonumber_inter');
    object10.item(0).value = object11.item(0).value;
  }

  function validatecollectionid() {
    if (document.getElementById('txtcollection_ID').value != '') {
        document.getElementById('txtcollection_ID5').value = document.getElementById('txtcollection_ID').value;
    }
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
  }

  jQuery(document).ready(function() {
    // binds form submission and fields to the validation engine
    jQuery("#formID").validationEngine();


    $("#similar").click(function() {
        var valid = $("#formID").validationEngine('validate');
        var vars = $("#formID").serialize();

        if (valid == true) {

        } else {
            $("#formID").validationEngine();
        }
    });

    $("#different").click(function() {
        var valid = $("#formID").validationEngine('validate');
        var vars = $("#formID").serialize();

        if (valid == true) {

        } else {
            $("#formID").validationEngine();
        }
    });
  });

  //googlemap
  var map;
  var markers = [];
  var defLat = 15.907198;
  var defLon = 101.036569;
  var lat;
  var lon;

  function initialize() {
    var mapOptions = {
        zoom: 6,
        center: new google.maps.LatLng(defLat, defLon),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById('googleMap'), mapOptions);


    markers = new google.maps.Marker({
        map: map,
        animation: google.maps.Animation.DROP
    });
   
  }

  function clearmap() {
    var newll = new google.maps.LatLng(15.907198, 101.036569);
    map.setCenter(newll);
    markers.setPosition();

  }

  function moveMap(lat, lon) {

    var newll = new google.maps.LatLng(lat, lon);
    map.setCenter(newll);
    markers.setPosition(newll);

  }

  google.maps.event.addDomListener(window, 'load', initialize);

  function getmarkerDMS(flat, flong, fprovince, fidamphur, famphur, ftambon) {

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
        url: "views/dataentry/simpleform/LocationGetFill.php",
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
                moveMap(newLat, newLon);
            }
        }
    });
  } 

  function doCallAjaxautofill(flat, flong, fprovince, fidamphur, famphur, ftambon) {
    
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
        clearmap();
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
        clearmap();
    }
    var pmeters = "flat=" + encodeURI(document.getElementById(flat).value) +
        "&flong=" + encodeURI(document.getElementById(flong).value);

    $.ajax({
        type: "POST",
        url: "views/dataentry/simpleform/LocationGetFill.php",
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
                moveMap(newLat, newLon);
            }
        }

    });
  }

  function insertcollection_method() {
    var collection_method = $("#collection-method").val();
    var datastring = 'collection_method=' + collection_method;

    $.ajax({
        type: 'POST',
        url: 'views/dataentry/simpleform/insert_collection_method.php',
        data: datastring,
        success: function(result) {
            $("#txtcollection_method_ID").html(result);

        }
    });
  }

  function insertcollector() {
    var dataset = {
        collector: $("input#collector").val()
    };

    $.ajax({
        type: 'POST',
        url: 'views/dataentry/simpleform/insert_collector.php',
        data: dataset,
        success: function(data) {
            $("#txtcollector_ID").html(data);

        }
    });
  }

  function search_number() {
    var dataset = {
        coll_year: $("input#txtcoll_year_inter").val()
    };

    $.ajax({
        type: 'POST',
        url: 'views/dataentry/simpleform/coll_number.php',
        data: dataset,
        success: function(result) {
            $("#txtcoll_autonumber_inter").html(result);
            autocollnumber();
        }
    });
  }

  $(document).ready(function() {
    $('a.login-window').click(function() {

        // Getting the variable's value from a link 
        var loginBox = $(this).attr('href');

        //Fade in the Popup and add close button
        $(loginBox).fadeIn(300);

        //Set the center alignment padding + border
        var popMargTop = ($(loginBox).height() + 24) / 2;
        var popMargLeft = ($(loginBox).width() + 24) / 2;

        $(loginBox).css({
            'margin-top': -popMargTop,
            'margin-left': -popMargLeft
        });

        // Add the mask to body
        $('body').append('<div id="mask"><\/div>');
        $('#mask').fadeIn(300);

        return false;
    });

    // When clicking on the button close or the mask layer the popup closed
    $('#mask').on('click','a.close', function() {
        $('#mask , .login-popup').fadeOut(300, function() {
            $('#mask').remove();
        });
        return false;
    });
  });


