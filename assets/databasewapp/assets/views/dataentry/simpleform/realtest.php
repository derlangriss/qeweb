<html><head>
<meta http-equiv="content-type" content="text/html; charset=windows-1252">
    <style>
          div.c1
  {
        width: 700px;
        height: 700px
  }
    </style>
    <script type="text/javascript">
/*function to load a list*/
function loadlist(selobj,url,nameattr)
{
    $(selobj).empty();
    $.getJSON(url,{},function(data)
    {
        $(selobj).append($('<option value="0">--CHOOSE ONE--</option>'));
        $(selobj).append($('<option value="1">--CHOOSE eeeeE--</option>'));
        $.each(data, function(i,obj)
        {
            $(selobj).append($('<option></option>').val(obj[nameattr]).html(obj[nameattr]));
        });
    });
}

$(function()
{ 
   loadlist($('select#countryCode').get(0), 'views/dataentry/simpleform/getcollectionmethodlist.php','collectionmethodsdetails');
   loadlist($('select#countryCode1').get(0), 'views/dataentry/simpleform/getcollectorlist.php','collectorsen');
});
</script>
  <script>    
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
  
   function doCallAjaxinterface(Mode) {
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
  
  jQuery(function($){
    fields = ['credit_card_number',
              'credit_card_expiry',
              'credit_card_cvc',
              'dd_mm_yyyy',
              'yyyy_mm_dd',
              'email',
              'number',
              'numberdecimal',
              'phone_number',
              'postal_code',
              'time_yy_mm',
              'uk_sort_code',
              'collection_number',
              'ontario_photo_health_card_number',
              'ontario_outdoors_card_number']

     $.each( fields, function (index, value) {
        $('input.'+value).formance('format_'+value)
                         .addClass('')
                         .wrap('<div class=\'\' />')
                         .parent()
                            .append('<label class=\'control-label\'></label>');

        $('input.'+value).on('keyup change blur', function (value) {
            return function (event) {
                $this = $(this);
                if ($this.formance('validate_'+value)) {
                    $this.parent()
                            .removeClass('has-success has-error')
                            .addClass('has-success')
                            .children(':last')
                                .text('');
                } else {
                    $this.parent()
                            .removeClass('has-success has-error')
                            .addClass('has-error')
                            .children(':last')
                                .text('');
                }
            }
        }(value));
     });
});

  $(document).ready(function(){
    
  
     
    doCallAjaxinterface('LIST');
    $("#btnAdd").click(function(){doCallAjaxinterface('ADD');});
    colectionmethodlist();
    collectorlist();
 
    $("#txtcoll_number_inter").click(function(){
  
  			$.ajax({ 
				url: "views/dataentry/simpleform/returnCollection.php" ,
				type: "POST",
				data: {sCode: $("#txtcoll_code_inter").val(),sYear:$("#txtcoll_year_inter").val(),sNumber:$("#txtcoll_number_inter").val()}
			})
			.success(function(result) { 

				var obj = jQuery.parseJSON(result);
				
					if(obj == '')
					{
                                            alter
						$('input[type=text]').val('');
					}
					else
					{
                                           
						  $.each(obj, function(key, inval) {
                                                        var startdate = inval["collectionstartdate"];
                                                        var enddate = inval["collectionenddate"];
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

		});
	

  });  
  </script>
    </head>
    <body>
     <form name="frmMain" id="formID" class="gf">
    <fieldset>
       <legend>Collection Data Entry</legend>
        <div class="gf-row-6 ">
            <div class="gf-col-2 gf-col-bg">
                  
      
                 <fieldset>
                    <legend>Collection Number</legend>
                          <div class="gf-row-2 gf-large">
                           <div class="gf-col-2">
                               <label>COLLECTION-ID</label>
                               <label class="text-inline input_tiny"><INPUT name="txtcoll_code_inter" id=
                            "txtcoll_code_inter" type="text" value="QSBG" autofocus></label>
                <label class="text-inline input_tiny"><INPUT class='number ' onkeyup="search_number();" name=
                            "txtcoll_year_inter" id="txtcoll_year_inter" type="text" value="" autofocus></label>
                <label class="text-inline input_tiny"><INPUT class='number ' name="txtcoll_number_inter" id=
                            "txtcoll_number_inter" type="text" autofocus>
                                                         
                           </div>
                           
                        </div>
                           <INPUT name="txtidcollection" id="txtidcollection" type="hidden" autofocus>
                </fieldset>
            </div>
            <div class="gf-col-4 gf-col-bg">
                <fieldset>
                    <legend>Date Collection</legend>
                          <div class="gf-row-5 gf-large input-daterange input-group" id="dp_range">
                           <div class="gf-col-1">
                               <label>Date Start</label>
                               <INPUT class=' validate[required,custom[date],past[#txtcollection_end_date]] yyyy_mm_dd' placeholder="YYYY - MM - DD" name=
                               "txtcollection_start_date" id="txtcollection_start_date" type="text" value="" autofocus>
                           </div>
                           <div class="gf-col-1">
                               <label>Date End</label>
                                <INPUT class='validate[required,custom[date],future[#txtcollection_start_date]] yyyy_mm_dd' placeholder="YYYY - MM - DD" onfocus=
                               "autofill();" name="txtcollection_end_date" id="txtcollection_end_date" type="text" value="" autofocus>
                           </div>
                        </div>
                </fieldset>
                                               
               
            </div>                            
            </div>
        </div>
        <div class="gf-row-7 ">
            <div class="gf-col-4 gf-col-bg">
                <fieldset>
                    <legend>Location Coordinate</legend>
                       
                                <div class="gf-row-6 gf-large">
                                    <div class="gf-col-2">
                                        <label>Lat dec</label>
                                        <INPUT class='numberdecimal' placeholder="Only Digits" onkeyup=
                                              "JavaScript:doCallAjaxautofill('txtlatdec','txtlongdec','txtprovinceen','txtamphur_ID','txtamphuren','txttambon');" type="text"
                                              id="txtlatdec" name="txtlatdec" value="" autofocus>
                                    </div>
                                    <div class="gf-col-1">
                                        <label>LatH</label>
                                        <INPUT type="text" id="txtlath" class="input_tiny" name="txtlath" value="N" autofocus>
                                    </div>
                                    <div class="gf-col-2">
                                        <label>Long dec</label>
                                        <INPUT class='numberdecimal' placeholder="Only Digits" onkeyup=
                                              "JavaScript:doCallAjaxautofill('txtlatdec','txtlongdec','txtprovinceen','txtamphur_ID','txtamphuren','txttambon');" type="text"
                                              id="txtlongdec" name="txtlongdec" value="" autofocus>
                                    </div>
                                    <div class="gf-col-1">
                                        <label>LongH</label>
                                        <INPUT type="text" id="txtlongh" name="txtlongh" class="input_tiny" value="E" autofocus>
                                    </div>
                                </div>
                                <div class="gf-row-6 gf-large">
                                    <div class="gf-col-1">
                                        <label>Lat D</label>
                                        <INPUT onkeyup="getmarkerDMS('txtlatdec','txtlongdec','txtprovinceen','txtamphur_ID','txtamphuren','txttambon');"
                                              class="input_tiny" name="txtlat_d" id="txtlat_d" type="text" value="" autofocus>
                                    </div>
                                    <div class="gf-col-1">
                                        <label>Lat M</label>
                                        <INPUT class='number input_tiny' onkeyup=
                                              "getmarkerDMS('txtlatdec','txtlongdec','txtprovinceen','txtamphur_ID','txtamphuren','txttambon');" name="txtlat_m" id=
                                              "txtlat_m" type="text" value="" autofocus>
                                    </div>
                                    <div class="gf-col-1">
                                        <label>Lat S</label>
                                        <INPUT class='numberdecimal input_tiny' onkeyup=
                                              "getmarkerDMS('txtlatdec','txtlongdec','txtprovinceen','txtamphur_ID','txtamphuren','txttambon');" name="txtlat_s" id=
                                              "txtlat_s" type="text" value="" autofocus>
                                    </div>
                                    <div class="gf-col-1">
                                        <label>Long D</label>
                                        <INPUT class='number input_tiny validate[custom[integer],max[180]]' onkeyup=
                                          "getmarkerDMS('txtlatdec','txtlongdec','txtprovinceen','txtamphur_ID','txtamphuren','txttambon');" name="txtlong_d" id=
                                          "txtlong_d" type="text" value="" autofocus>
                                    </div>
                                    <div class="gf-col-1">
                                        <label>Long M</label>
                                        <INPUT class='number input_tiny' onkeyup=
                                              "getmarkerDMS('txtlatdec','txtlongdec','txtprovinceen','txtamphur_ID','txtamphuren','txttambon');" name="txtlong_m" id=
                                              "txtlong_m" type="text" value="" autofocus>
                                    </div>
                                    <div class="gf-col-1">
                                        <label>Long S</label>
                                        <INPUT class='numberdecimal input_tiny' onkeyup=
                                              "getmarkerDMS('txtlatdec','txtlongdec','txtprovinceen','txtamphur_ID','txtamphuren','txttambon');" name="txtlong_s" id=
                                              "txtlong_s" type="text" value="" autofocus>
                                    </div>
                                </div>
                                <div class="gf-row-2 gf-large">
                                    <div class="gf-col-1">
                                        <label>northing</label>
                                        <INPUT type="text" id="txtNorthing" name="txtNorthing" class="input_small" autofocus>
                                    </div>
                                    <div class="gf-col-1">
                                        <label>easting</label>
                                        <INPUT type="text" id="txtEasting" name="txtEasting" class="input_small" autofocus>
                                    </div>
                                </div>    
                                <div class="gf-row-2 gf-large">    
                                    <div class="gf-col-1">
                                        <label>UTM</label>
                                        <INPUT name="txtUTM" id="txtUTM" type="text" value="" autofocus>
                                    </div>
                                    <div class="gf-col-1">
                                        <label>MASL</label>
                                        <INPUT class='numberdecimal validate[custom[integer],max[2800]] text-input' name="txtMASL" id="txtMASL" type="text"
                                        value="" autofocus>
                                    </div>
                                </div>
                                
                            
                </fieldset>
                <fieldset>
                    <legend>Location Administrative</legend>
                        <div class="gf-row-3 gf-large">
                       <div class="gf-col-1">
                           <label>province English (thai)</label>
                           <INPUT class="disabletextbox" readonly type="text" id="txtprovinceen" name="txtprovinceen" autofocus>
                       </div>
                       <div class="gf-col-1">
                           <label>Amphur English (thai)</label>
                           <INPUT readonly class="disabletextbox" type="text" id="txtamphuren" name="txtamphuren" autofocus>
                       </div>
                       <div class="gf-col-1">
                           <label>tambon English (thai)</label>
                           <INPUT readonly type="text" id="txttambon" name="txttambon" class="disabletextbox" autofocus>
                       </div>
                   </div>
                   <div class="gf-row-2 gf-large">
                       <div class="gf-col-1">
                           <label>Locality</label>
                           <INPUT type="text" name="txtlocality" id="txtlocality" value="" autofocus>
                       </div>
                       <div class="gf-col-1">
                           <label>Specific Locality</label>
                           <INPUT type="text" name="txtspecific_locality" id="txtspecific_locality" value="" autofocus>
                       </div>
                      
                   </div>
                </fieldset>
     <fieldset>
        <legend>Collection Details</legend>
        <div class="gf-row-3 gf-large">
            <div class="gf-col-3">
                <label>Habitat</label>
                <INPUT type="text" name="txthabitat" id="txthabitat" value="" autofocus>
            </div>
        </div>    
        <div class="gf-row-2 gf-large">
            
               


            <div class="gf-col-1">
                <label>Collection Method</label>
                <SELECT class="validate[required] form-control" name="txtcollection_method_ID" id="txtcollection_method_ID" autofocus>
                </SELECT>

            </div>
            <div class="gf-col-1">
                <label>Collector</label>
                <SELECT class="validate[required] form-control" name="txtcollector_ID" id="txtcollector_ID" autofocus>
                </SELECT>
            </div>
        </div>
    </fieldset>
            <fieldset>
        <INPUT id="different" name="different" type="button" onclick="JavaScript:doCallAjaxinterface('ADD');" value="Different collection" autofocus> &nbsp; <INPUT id="similar" name="similar" type="button" onclick="JavaScript:doCallAjaxinterfacesimilar('ADD');" value=
      "Similar collection" autofocus> &nbsp; <INPUT type="reset" value="Done-leave interface" autofocus>&nbsp;<INPUT id="different" name="different" type="button" onclick="JavaScript:doCallAjaxinterface('UPDATE');" value="UPDATE" autofocus>
    </fieldset>    
            </div>
                         
            <DIV id="googleMap" class="c1 gf-col-3"></DIV>
              
        </div>
           
        
    </fieldset>
      

        <DIV id="mySpan"></DIV>  
    <INPUT type="hidden" id="txtamphur_ID" name="txtamphur_ID">
    <INPUT type="hidden" id="txtcoll_autonumber_inter" name="autonumber_inter">

    <INPUT type="hidden" name="txtcollection_ID_inter" id="txtcollection_ID_inter" size="20">  
    
   
    
   
    
</form>
  
    </body>
</html>
