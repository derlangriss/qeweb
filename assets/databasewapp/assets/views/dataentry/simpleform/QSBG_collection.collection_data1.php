<?php
require_once('_header.php');
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">

<HTML>
<HEAD>
  <META name="generator" content="HTML Tidy for Windows (vers 18 June 2008), see www.w3.org">

  <TITLE>Sompong test Ajax Tutorial</TITLE>
  <LINK rel="stylesheet" href="views/dataentry/simpleform/collection_assets/css/simplemain.css" type="text/css">
  <LINK rel="stylesheet" href="views/dataentry/simpleform/css/validationEngine.jquery.css" type="text/css" media="screen" title="no title" charset="utf-8">
  <LINK rel="stylesheet" href="views/dataentry/simpleform/css/template.css" type="text/css" media="screen" title="no title" charset="utf-8">
  <LINK rel="stylesheet" href="views/dataentry/simpleform/css/Aristo/Aristo.css" type="text/css">
  
  <SCRIPT src="views/dataentry/simpleform/collection_assets/js/jquery.formalize.js" type="text/javascript">
</SCRIPT>
  <SCRIPT src="views/dataentry/simpleform/collection_assets/js/jquery.maskedinput.js" type="text/javascript">
</SCRIPT>
  <SCRIPT src="views/dataentry/simpleform/js/jquery.formance.js" type="text/javascript">
</SCRIPT>
  <SCRIPT src="views/dataentry/simpleform/js/awesome_form.js" type="text/javascript">
</SCRIPT>
 
  <SCRIPT src="views/dataentry/simpleform/js/jquery.validationEngine.js" type="text/javascript">
</SCRIPT>
  <SCRIPT src="views/dataentry/simpleform/js/languages/jquery.validationEngine-en.js" type="text/javascript" charset="utf-8">
</SCRIPT>
  <SCRIPT language="JavaScript" type="text/javascript">

  function doCallAjaxinterface(Mode) {
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
            clearform();
        }
    });
  }
  
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

  $(document).ready(function(){
  $("body").ready(function(){doCallAjaxinterface('LIST');});
  $("#btnAdd").click(function(){doCallAjaxinterface('ADD');});
  });        

  </SCRIPT>
  <STYLE type="text/css">
ul#icons
  {
        margin: 0;
        padding: 0;
        margin-top: 15px
  }

  ul#icons li
  {
        margin: 2px;
        position: relative;
        padding: 3px 0;
        cursor: pointer;
        float: left;
        list-style: none
  }

  ul#icons span.ui-icon
  {
        float: left;
        margin: 0 4px
  }

  .columnbox
  {
        width: 500px
  }

  #eq span
  {
        height: 120px;
        float: left;
        margin: 15px
  }

  #countries
  {
        width: 300px
  }

  /*google map */
  div.c1
  {
        width: 500px;
        height: 400px
  }

  /*pop up*/
  a { 
        text-decoration:none; 
        color:#00c6ff;
  }

  h1 {
        font: 4em normal Arial, Helvetica, sans-serif;
        padding: 20px;  margin: 0;
        text-align:center;
  }

  h1 small{
        font: 0.2em normal  Arial, Helvetica, sans-serif;
        text-transform:uppercase; letter-spacing: 0.2em; line-height: 5em;
        display: block;
  }

  h2 {
    color:#bbb;
    font-size:3em;
        text-align:center;
        text-shadow:0 1px 3px #161616;
  }

  .container {width: 960px; margin: 0 auto; overflow: hidden;}

  #content {      float: left; width: 100%;}

  .post { margin: 0 auto; padding-bottom: 50px; float: left; width: 960px; }

  .btn-sign {
        width:460px;
        margin-bottom:20px;
        margin:0 auto;
        padding:20px;
        border-radius:5px;
        background: -moz-linear-gradient(center top, #00c6ff, #018eb6);
    background: -webkit-gradient(linear, left top, left bottom, from(#00c6ff), to(#018eb6));
        background:  -o-linear-gradient(top, #00c6ff, #018eb6);
    filter: progid:DXImageTransform.Microsoft.gradient(startColorStr='#00c6ff', EndColorStr='#018eb6');
        text-align:center;
        font-size:36px;
        color:#fff;
        text-transform:uppercase;
  }

  .btn-sign a { color:#fff; text-shadow:0 1px 2px #161616; }

  #mask {
        display: none;
        background: #000; 
        position: fixed; left: 0; top: 0; 
        z-index: 10;
        width: 100%; height: 100%;
        opacity: 0.2;
        z-index: 999;
  }

  .login-popup{
        display:none;
        background: #333;
        padding: 10px;  
        border: 2px solid #ddd;
        float: left;
        font-size: 1.2em;
        position: fixed;
        top: 50%; left: 50%;
        z-index: 99999;
        box-shadow: 0px 0px 20px #999;
        -moz-box-shadow: 0px 0px 20px #999; /* Firefox */
    -webkit-box-shadow: 0px 0px 20px #999; /* Safari, Chrome */
        border-radius:3px 3px 3px 3px;
    -moz-border-radius: 3px; /* Firefox */
    -webkit-border-radius: 3px; /* Safari, Chrome */
  }

  img.btn_close {
        float: right; 
        margin: -28px -28px 0 0;
  }

  fieldset.textbox { 
  border:0;margin:0;padding:10px 10px 5px;font-size:100%
  }

  form.signin .textbox label { 
        display:block; 
        padding-bottom:7px; 
  }

  form.signin .textbox span { 
        display:block;
  }

  form.signin p, form.signin span { 
        color:#999; 
        font-size:11px; 
        line-height:18px;
  } 

  form.signin .textbox input { 
        background:#666666; 
        border-bottom:1px solid #333;
        border-left:1px solid #000;
        border-right:1px solid #333;
        border-top:1px solid #000;
        color:#fff; 
        border-radius: 3px 3px 3px 3px;
        -moz-border-radius: 3px;
    -webkit-border-radius: 3px;
        font:13px Arial, Helvetica, sans-serif;
        padding:6px 6px 4px;
        width:200px;
  }

  form.signin input:-moz-placeholder { color:#bbb; text-shadow:0 0 2px #000; }
  form.signin input::-webkit-input-placeholder { color:#bbb; text-shadow:0 0 2px #000;  }

  .button { 
        background: -moz-linear-gradient(center top, #f3f3f3, #dddddd);
        background: -webkit-gradient(linear, left top, left bottom, from(#f3f3f3), to(#dddddd));
        background:  -o-linear-gradient(top, #f3f3f3, #dddddd);
    filter: progid:DXImageTransform.Microsoft.gradient(startColorStr='#f3f3f3', EndColorStr='#dddddd');
        border-color:#000; 
        border-width:1px;
        border-radius:4px 4px 4px 4px;
        -moz-border-radius: 4px;
    -webkit-border-radius: 4px;
        color:#333;
        cursor:pointer;
        display:inline-block;
        padding:6px 6px 4px;
        margin-top:10px;
        font:12px; 
        width:214px;
  }

  .button:hover { background:#ddd; }

  </STYLE>
</HEAD>

<BODY>
  <H2>Collection Entry Form</H2>

  <DIV id="collection-method-box" class="login-popup">
    <A href="#" class="close"><IMG src="views/dataentry/simpleform/css/images/close_pop.png" class="btn_close" title="Close Window" alt="Close"></A>

    <FORM method="post" accept="class=&quot;signin&quot;" action="#">
      <FIELDSET class="textbox">
        <LABEL class="username"><SPAN>Collection Method Details</SPAN> <INPUT id="collection-method" name="collection-method" value="" type="text"
        autocomplete="on" placeholder="collection-method"></LABEL> <INPUT value="submit" onclick="insertcollection_method();" type="button">
      </FIELDSET>
    </FORM>
  </DIV>

  <DIV id="collector-box" class="login-popup">
    <A href="#" class="close"><IMG src="views/dataentry/simpleform/css/images/close_pop.png" class="btn_close" title="Close Window" alt="Close"></A>

    <FORM method="post" class="signin" action="#">
      <FIELDSET class="textbox">
        <LABEL class="username"><SPAN>Collector</SPAN> <INPUT id="collector" name="collector" value="" type="text" autocomplete="on" placeholder=
        "collector name"></LABEL> <INPUT value="submit" onclick="insertcollector();" type="button">
      </FIELDSET>
    </FORM>
  </DIV>

  <DIV id="wrapper">
    <FORM name="frmMain" id="formID" method="post">
      <TABLE class="horiz">
        <TR>
          <TD>
            <DIV id="mySpan"></DIV><INPUT type="hidden" class="collection_number" name="txtcollection_ID_inter" id="txtcollection_ID_inter" size="20"
            tabindex="0">

            <TABLE>
              <TR>
                <TD>
                  <INPUT type="hidden" id="txtcoll_autonumber_inter" value="">

                  <TABLE class="horiz">
                    <TR>
                      <TD>
                        <LABEL for="latd">COLLECTION-ID</LABEL>

                        <TABLE class="horiz">
                          <TR>
                            <TD></TD>
                          </TR>

                          <TR>
                            <TD><LABEL for="latd">&nbsp;</LABEL> <INPUT tabindex="7" class='number input_tiny' name="txtcoll_code_inter" id=
                            "txtcoll_code_inter" type="text" value="QSBG"></TD>

                            <TD><LABEL for="latm">&nbsp;</LABEL> <INPUT tabindex="8" class='number input_tiny' onkeyup="search_number();" name=
                            "txtcoll_year_inter" id="txtcoll_year_inter" type="text" value=""></TD>

                            <TD><LABEL for="lats">&nbsp;</LABEL> <INPUT tabindex="9" class='number input_tiny' name="txtcoll_number_inter" id=
                            "txtcoll_number_inter" type="text"></TD>
                          </TR>
                        </TABLE>
                      </TD>
                    </TR>
                  </TABLE>
                </TD>

                <TD></TD>
              </TR>

              <TR>
                <TD><LABEL for="date-start">Date Start</LABEL><BR>
                <INPUT class='validate[required,custom[date],past[#txtcollection_end_date]] yyyy_mm_dd' placeholder="YYYY - MM - DD" name=
                "txtcollection_start_date" id="txtcollection_start_date" type="text" value="" tabindex="1"></TD>

                <TD><LABEL for="date-end">Date End</LABEL><BR>
                <INPUT class='validate[required,custom[date],future[#txtcollection_start_date]] yyyy_mm_dd' placeholder="YYYY - MM - DD" onfocus=
                "autofill();" name="txtcollection_end_date" id="txtcollection_end_date" type="text" value="" tabindex="2"></TD>
              </TR>

              <TR>
                <TD>
                  <TABLE class="horiz">
                    <TR>
                      <TD><LABEL for="latdec">Lat dec</LABEL><BR>
                      <INPUT class='numberdecimal' placeholder="Only Digits" onkeyup=
                      "JavaScript:doCallAjaxautofill('txtlatdec','txtlongdec','txtprovinceen','txtamphur_ID','txtamphuren','txttambon');" type="text"
                      id="txtlatdec" name="txtlatdec" value="" tabindex="3"></TD>

                      <TD><LABEL for="lath">Lath</LABEL><BR>
                      <INPUT type="text" id="txtlath" class="input_tiny" name="txtlath" value="N" tabindex="4"></TD>
                    </TR>
                  </TABLE>
                </TD>

                <TD>
                  <TABLE class="horiz">
                    <TR>
                      <TD><LABEL for="longdec">Long dec</LABEL><BR>
                      <INPUT class='numberdecimal' placeholder="Only Digits" onkeyup=
                      "JavaScript:doCallAjaxautofill('txtlatdec','txtlongdec','txtprovinceen','txtamphur_ID','txtamphuren','txttambon');" type="text"
                      id="txtlongdec" name="txtlongdec" value="" tabindex="5"></TD>

                      <TD><LABEL for="longh">Longh</LABEL><BR>
                      <INPUT type="text" id="txtlongh" name="txtlongh" class="input_tiny" value="E" tabindex="6"></TD>
                    </TR>
                  </TABLE>
                </TD>
              </TR>

              <TR>
                <TD>
                  <TABLE class="horiz">
                    <TR>
                      <TD><LABEL for="latd">Lat d</LABEL><BR>
                      <INPUT tabindex="7" onkeyup="getmarkerDMS('txtlatdec','txtlongdec','txtprovinceen','txtamphur_ID','txtamphuren','txttambon');"
                      class="input_tiny" name="txtlat_d" id="txtlat_d" type="text" value=""></TD>

                      <TD><LABEL for="latm">Lat m</LABEL><BR>
                      <INPUT tabindex="8" class='number input_tiny' onkeyup=
                      "getmarkerDMS('txtlatdec','txtlongdec','txtprovinceen','txtamphur_ID','txtamphuren','txttambon');" name="txtlat_m" id=
                      "txtlat_m" type="text" value=""></TD>

                      <TD><LABEL for="lats">Lat s</LABEL><BR>
                      <INPUT tabindex="9" class='numberdecimal input_tiny' onkeyup=
                      "getmarkerDMS('txtlatdec','txtlongdec','txtprovinceen','txtamphur_ID','txtamphuren','txttambon');" name="txtlat_s" id=
                      "txtlat_s" type="text" value=""></TD>
                    </TR>
                  </TABLE>
                </TD>

                <TD>
                  <TABLE class="horiz">
                    <TR>
                      <TD><LABEL for="longd">Long d</LABEL><BR>
                      <INPUT tabindex="10" class='number input_tiny validate[custom[integer],max[180]]' onkeyup=
                      "getmarkerDMS('txtlatdec','txtlongdec','txtprovinceen','txtamphur_ID','txtamphuren','txttambon');" name="txtlong_d" id=
                      "txtlong_d" type="text" value=""></TD>

                      <TD><LABEL for="longm">Long m</LABEL><BR>
                      <INPUT tabindex="11" class='number input_tiny' onkeyup=
                      "getmarkerDMS('txtlatdec','txtlongdec','txtprovinceen','txtamphur_ID','txtamphuren','txttambon');" name="txtlong_m" id=
                      "txtlong_m" type="text" value=""></TD>

                      <TD><LABEL for="longs">Long s</LABEL><BR>
                      <INPUT tabindex="12" class='numberdecimal input_tiny' onkeyup=
                      "getmarkerDMS('txtlatdec','txtlongdec','txtprovinceen','txtamphur_ID','txtamphuren','txttambon');" name="txtlong_s" id=
                      "txtlong_s" type="text" value=""></TD>
                    </TR>
                  </TABLE>
                </TD>
              </TR>

              <TR>
                <TD><LABEL for="northing">northing</LABEL><BR>
                <INPUT tabindex="13" type="text" id="txtNorthing" name="txtNorthing" class="input_small"></TD>

                <TD><LABEL for="easting">easting</LABEL><BR>
                <INPUT tabindex="14" type="text" id="txtEasting" name="txtEasting" class="input_small"></TD>
              </TR>

              <TR>
                <TD><LABEL for="UTM">UTM</LABEL><BR>
                <INPUT tabindex="15" name="txtUTM" id="txtUTM" type="text" value=""></TD>

                <TD><LABEL for="MASL">MASL</LABEL><BR>
                <INPUT tabindex="16" class='numberdecimal validate[custom[integer],max[2800]] text-input' name="txtMASL" id="txtMASL" type="text"
                value=""></TD>
              </TR>
            </TABLE>
          </TD>

          <TD>
            <DIV id="googleMap" class="c1"></DIV>
          </TD>
        </TR>
      </TABLE><INPUT class="validate[required]" type="hidden" id="txtamphur_ID" name="txtamphur_ID">

      <TABLE class="horiz">
        <TR>
          <TD><LABEL for="provinceen">province English (thai)</LABEL><BR>
          <INPUT class="disabletextbox" readonly type="text" id="txtprovinceen" name="txtprovinceen"></TD>

          <TD><LABEL for="month">Amphur English (thai)</LABEL><BR>
          <INPUT readonly class="disabletextbox" type="text" id="txtamphuren" name="txtamphuren"></TD>

          <TD><LABEL for="month">tambon English (thai)</LABEL><BR>
          <INPUT readonly type="text" id="txttambon" name="txttambon" class="disabletextbox"></TD>

          <TD><BR>
          <INPUT type="button" onclick="window.open('../../../interim/index.php')" value="Link to Gazette"></TD>
        </TR>

        <TR>
          <TD><LABEL for="Locality">Locality</LABEL><BR>
          <INPUT tabindex="17" type="text" name="txtlocality" id="txtlocality" value=""></TD>

          <TD><LABEL for="Slocality">Specific Locality</LABEL><BR>
          <INPUT tabindex="18" type="text" name="txtspecific_locality" id="txtspecific_locality" value=""></TD>

          <TD><LABEL for="habitat">Habitat</LABEL><BR>
          <INPUT tabindex="19" type="text" name="txthabitat" id="txthabitat" value=""></TD>

          <TD><LABEL for="collection_method">Collection Method</LABEL><BR>
          <SELECT class="validate[required]" tabindex="20" id="txtcollection_method_ID" name="txtcollection_method_ID">
            <OPTION value="">
              Collection Method
            </OPTION><?
                        $strSQL = "SELECT * FROM collectionmethods ORDER BY idcollectionmethods ASC ";
                        $result = pg_query($conn,$strSQL);
                        @pg_query("SET NAMES UTF8");
                        while($objResult = pg_fetch_array($result))
                        {
                           extract($objResult);
                        ?>

            <OPTION value="<?=$idcollectionmethods?>">
              <?=$collectionmethodsdetails?>
              </OPTION><?
                                                                                                                                                                                            }
                                                                                                                                                                                            ?>
            </SELECT></TD>

          <TD>
            <UL id="icons" class="ui-widget ui-helper-clearfix">
              <LI class="ui-state-default ui-corner-all" title=".ui-icon-circle-plus"><A href="#collection-method-box" class="login-window"></A></LI>
            </UL>
          </TD>
        </TR>

        <TR>
          <TD><LABEL for="Collector">Collector</LABEL><BR>
          <SELECT class="validate[required]" tabindex="21" name="txtcollector_ID" id="txtcollector_ID" style="width:160px">
            <OPTION value="">
              Choose Collector
            </OPTION><?
                                                                      $strSQL = "SELECT * FROM  collectors ORDER BY idcollectors ASC ";
                                                                      $objQuery = pg_query($strSQL) or die ("Error Query [".$strSQL."]");
                                                                      while($objResult = pg_fetch_array($objQuery))
                                                                      {
                                                                        extract($objResult);
                                                                      ?>

            <OPTION value="<?=$idcollectors?>">
              <?=$collectorsen?>
              </OPTION><?
                                                                        }
                                                                       ?>
            </SELECT></TD>

          <TD>
            <UL id="icons" class="ui-widget ui-helper-clearfix">
              <LI class="ui-state-default ui-corner-all" title=".ui-icon-circle-plus"><A href="#collector-box" class="login-window"></A></LI>
            </UL>
          </TD>
        </TR>
      </TABLE>

      <P><INPUT id="different" name="different" type="button" onclick="JavaScript:doCallAjaxinterface('ADD');" value="Different collection" tabindex=
      "22"> &nbsp; <INPUT id="similar" name="similar" type="button" onclick="JavaScript:doCallAjaxinterfacesimilar('ADD');" value=
      "Similar collection"> &nbsp; <INPUT type="reset" value="Done-leave interface"> &nbsp;</P>
    </FORM>
  </DIV>
</BODY>
</HTML>
