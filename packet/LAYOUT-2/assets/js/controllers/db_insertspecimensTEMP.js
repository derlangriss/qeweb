'use strict'; 
/** 
  * controllers for GoogleMap  
  * AngularJS Directive 
*/ 
app.controller("SpecimenDataCtrl", ["$scope","$http", "$timeout", "$stateParams", "SweetAlert", "info", 
    function ($scope, $http, $timeout, $stateParams, SweetAlert, info) {
    function getIfNotSet(value, newValue, overwriteNull) {
        if (typeof(value) === 'undefined'&& overwriteNull === true) {
            return newValue;
        } else if (value === null && overwriteNull === true) {
            return newValue;
        } else if (value === 0 && overwriteZero === true) {
            return newValue;
        } else if (value === '' && overwriteNull === true) {
            return newValue;
        } else {
            return value;
        } 
    }  
    $scope.savetype = 1; 
    $scope.typespecimen = 0; 
    $scope.specdata = {};
    $scope.getOrderlist = null; 
    $scope.getOrders = [];
    $http({
        method: 'GET', 
        url: 'assets/views/action/getTaxalist.php',
        dataType: "JSON",
        params: {sTorder: 'torder'}
    }).success(function(result) {
        $scope.getOrders = result;
    });
    info.specno($stateParams.specid).success(function(result) {
        
         function filterColumn(i) { 
             $('#Coll_Specimenlist').DataTable().column(i).search(
                 $('#col' + i + '_filter').val()

             ).draw();
         }  


        
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
        $scope.selectedCountry =  result[0].torder_idtorder;  
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
      
  
    });

    $scope.generateAUTO = function() {
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
                /* $('#txtidcollection').val(inval["coll_id"]);*/
                $('#col6_filter').val(inval["coll_code"]);
                $('#col7_filter').val(inval["coll_year"]);
                $('#col8_filter').val(inval["coll_number"]);
            });
        }
    })
};


     $scope.specSEARCH = function() {
           
          $.ajax({ 
        url: "assets/views/action/SearchSpecimensNo.php" ,
        type: "GET",
        data: {sCode: $("#col6_filter").val() ,sYear: $("#col7_filter").val()  ,sNumber: $("#col8_filter").val() ,sSpecnum: $("#txtspecimens_number").val() }
      })
      .success(function(result) {
                                
        var obj = jQuery.parseJSON(result);
                                if(obj == '')
          {
                                          alert("FILE NOT FOUND!!")
          }
          else
          {
                             $.each(obj, function(key, inval) {
                                                        
                                                          $("#txtspecimen_number").val(inval["specimen_number"])
                                                          $('#txtidcollection').val(inval["idcollection"]); 
                                                           
                                                           
                                                          $('#txtcoll_code').val(inval["coll_code"]);
                                                          $('#txtcoll_year').val(inval["coll_year"]);
                                                          $('#txtcoll_number').val(inval["coll_number"]);
                                                          
                                                          $('#txtSub_family').val(inval["subfamily"]);
                                                          $('#labelhead').html("THAILAND:");
                                                          $('#collectioncode').html(inval["coll_code"]);
                                                          $('#collectionyear').html(inval["coll_year"]);
                                                          $('#collectionnumber').html(inval["coll_number"]);
                                                          $('#collectionprovince').html(inval["provinceen"]);
                                                          $('#collectionenddate').html(inval["collectionenddate"]);
                                                          $('#collectionmethod').html(inval["collectionmethodsdetails"]);
                                                          $('#collectioncollector').html(inval["collectorsen"]);
                                                          $('#collectionmasl').html(inval["collectionmasl"]);
                                                          $('#collectionlocality').html(inval["collectionlocality"]);
                                                          $('#collectionnumber').html(inval["coll_number"]);
                                                          $('#collectionmasl').html("Alt. "+inval["collectionmasl"]+" m");
                                                          $('#collectionlat').html(inval["collectionlatd"]+"&#12444;"+inval["collectionlatm"]+"&#39;"+inval["collectionlats"]+"&quot"+"N");
                                                          $('#collectionlong').html(inval["collectionlongd"]+"&#12444;"+inval["collectionlongm"]+"&#39;"+inval["collectionlongs"]+"&quot"+"E");
                                                          
                             });
                                        }
                                     

      })
         
    };

    var selected = [];
    var table = $('#SpecimensListTbl').DataTable({
    "processing": true,
    "serverSide": true,
    "ajax": {
        "url": "assets/scripts/server_processing_specimennew.php",
        "type": "POST"
    },
    "rowCallback": function(row, data) {
        if ($.inArray(data.DT_RowId, selected) !== -1) {
            $(row).addClass('selected');
        }
    },
    "dom": '<"top"li><"clear">rtp',
    "scrollX": true,
    "scrollY": "300px",
    "scrollCollapse": true,
    "order": [
        [0, "asc"]
    ],
    "columns": [{
        "class": "select-checkbox",
        "orderable": false,
        "data": null,
        "defaultContent": ""
    }, {
        "data": "0",
        "width": "5%"
    }, {
        "data": "1",
        "width": "20%"
    }, {
        "data": "2",
        "width": "14%"
    }, {
        "data": "3",
        "width": "14%"
    }, {
        "data": "4",
        "width": "14%"
    }, {
        "data": "5",
        "width": "14%"
    }, {
        "data": "6",
        "width": "14%"
    }, {
        "data": "7",
        "width": "14%"
    }, {
        "data": "8",
        "width": "14%"
    }, {
        "data": "9",
        "width": "17%"
    }],
    "columnDefs": [{
        "visible": false,
        targets: 6
    }, {
        "visible": false,
        targets: 7
    }, {
        "visible": false,
        targets: 8
    }, {
        "visible": false,
        targets: 9
    }, {
        render: function(data, type, full, meta) {
            return '<a href="' + "#/app/form/collection_data/" + full[0] + '"' + 'class="btn btn-transparent btn-xs"' + '>' + '<i class="' + 'fa fa-pencil' + '"></i>' + '</a>' + '<a ' + 'class="delete btn-transparent btn-xs"' + '>' + '<i class="' + 'fa fa-times fa fa-white' + '"></i>' + '</a>';
        },
        targets: 10
    }],
    order: [
        [1, 'asc']
    ]
});


     $('#SpecimensListTbl td').css('white-space','initial');


     $('.material-datatables label').addClass('form-group');

$('#SpecimensListTbl tbody').on('click', '.select-checkbox', function() {
    var tr = $(this).closest('tr');
    var data = table.row($(this).closest('tr')).data();
    var id = data.DT_RowId;
    var index = $.inArray(id, selected);
    if (index === -1) {
        selected.push(id);
    } else {
        selected.splice(index, 1);
    }
    $(tr).toggleClass('selected');
    /*
    if ($(this).hasClass('selected')) {
        $(this).removeClass('selected');
    } else {
        table.$('tr.selected').removeClass('selected');
        $(this).addClass('selected');
    }*/
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
    $http({
        method: 'POST',
        url: "assets/views/action/returnTableSpecDetails.php",
        data: data,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
    }).success(function(response) {
$scope.ModelPinor={};
$scope.ModelLabelor={};
$scope.ModelIdentification={};
        
        $scope.Specdetails = response;
        $scope.specdata.coll_code = $scope.Specdetails[0].coll_code;
        $scope.specdata.coll_year = $scope.Specdetails[0].coll_year;
        $scope.specdata.coll_number = $scope.Specdetails[0].coll_number;
        $scope.specdata.specimens_number = $scope.Specdetails[0].specimens_number;
        $scope.specModelOrder = $scope.Specdetails[0].torder_name;
        $scope.specModelFamily = $scope.Specdetails[0].family_name;
        $scope.specModelGenus = $scope.Specdetails[0].genus_name;
        $scope.specModelSpecies = $scope.Specdetails[0].species_name;     
       
        $scope.ModelPinor=   {pinor_id:$scope.Specdetails[0].pinor_id};

        $scope.ModelLabelor={labelor_id:$scope.Specdetails[0].labelor_id};

        $scope.ModelIdentification={identification_id:$scope.Specdetails[0].identification_id};
        console.log($scope.ModelPinor);
console.log($scope.ModelLabelor);
console.log($scope.ModelIdentification);
        $scope.ModelLabelor = $scope.Specdetails[0].l_firstname;
        $scope.ModelIdentification = $scope.Specdetails[0].i_firstname;  
        $scope.typespecimen = $scope.Specdetails[0].taxatype_taxatype_id;  


      

    });
    /*
    $.ajax({
        url: "assets/views/action/returnTableSpecDetails.php",
        type: "POST",
        data: {
            sCode: data[5],
            sYear: data[6],
            sNumber: data[7],
            sSpecNumber: data[8]
        }
    }).success(function(result) {
        var obj = jQuery.parseJSON(result);
        if (obj == '') {
            alter
            $('input[type=text]').val('');
        } else {
            $.each(obj, function(key, inval) {
                $("#txtspecimen_number").val(inval["specimen_number"]);
                $('#txtcoll_code').val(inval["coll_code"]);
                $('#txtcoll_year').val(inval["coll_year"]);
                $('#txtcoll_number').val(inval["coll_number"]);
                $('#txtSub_family').val(inval["subfamily"]);
                $('#labelhead').html("THAILAND:");
                $('#collectioncode').html(inval["coll_code"]);
                $('#collectionyear').html(inval["coll_year"]);
                $('#collectionnumber').html(inval["coll_number"]);
                $('#collectionprovince').html(inval["provinceen"]);
                $('#collectionenddate').html(inval["collectionenddate"]);
                $('#collectionmethod').html(inval["collectionmethodsdetails"]);
                $('#collectioncollector').html(inval["collectorsen"]);
                $('#collectionmasl').html(inval["collectionmasl"]);
                $('#collectionlocality').html(inval["collectionlocality"]);
                $('#collectionnumber').html(inval["coll_number"]);
                $('#collectionmasl').html("Alt. " + inval["collectionmasl"] + " m");
                $('#collectionlat').html(inval["collectionlatd"] + "&#12444;" + inval["collectionlatm"] + "&#39;" + inval["collectionlats"] + "&quot" + "N");
                $('#collectionlong').html(inval["collectionlongd"] + "&#12444;" + inval["collectionlongm"] + "&#39;" + inval["collectionlongs"] + "&quot" + "E");
                $("#txtOrder").val(inval["torder_idtorder"]);
                $("#txtFamily").val(inval["family_idfamily"]);
                $("#txtSub_family").val(inval["subfamily"]);
                $("#txtGenus").val(inval["genus_idgenus"]);
                $("#txtSub_Genus").val(inval["subgenus"]);
                $("#txtSpecies").val(inval["species_idspecies"]);
                $("#txttest").val(inval["taxatypes_idtaxatypes"]);
                if (inval["taxatypes_idtaxatypes"] == 1) {
                    inval["taxatypes_idtaxatypes"] = 3
                }
                $('input:radio[name=typespecimen]')[inval["taxatypes_idtaxatypes"]].checked = true;
            });
        }
    })*/
});


$scope.specimensIns = function(Mode) {

  var a = $("#txtOrder").val();
  var b = $("#txtFamily").val();
  var c = $("#txtGenus").val();
  var d = getIfNotSet($scope.specModelSpecies.species_id, 0, true); 

  var e = getIfNotSet($scope.specdata.specimensid, null, true);
  var f = getIfNotSet($scope.specdata.collectionid, 0, true);
  var g = $("#txtspecimens_number").val();
  
 /* alert(g);*/
/*
  var g = getIfNotSet($scope.specdata.specimens_number, '0', true);
  */
  var h = $scope.typespecimen;
  var i = $("#col6_filter").val();
  var j = $("#col7_filter").val();
  var k = $("#col8_filter").val();
  var l = i+"-"+j+"-"+k+"-"+g;
  console.log($scope.ModelLabelor);
   console.log($scope.ModelPinor);
      console.log($scope.ModelIdentification.identification_id);
  /*
  var m = getIfNotSet($scope.numberOFrecord, '1', true); 
  var n = getIfNotSet($scope.ModelPinor.pinor_id, "0", true); 
  var o = getIfNotSet($scope.ModelLabelor.labelor_id, '0', true); 
  var p = getIfNotSet($scope.ModelIdentification.identification_id, '0', true); */

  if(a==''){
     a = 0;
  }
  if(b==''){
     b = 0;
  }
  if(c==''){
     c = 0;
  }
  if(d==''){
     d = 0;
  }

 var pmeters = "tspecimensid=" + encodeURI(e) +          
               "&tcollectionid=" + encodeURI(f) + 
               "&tspecimen_number=" + encodeURI(g) + 
               "&tSpecies_ID=" + encodeURI(d) + 
               "&tspecimenfullnumber=" + encodeURI(l) + 
               "&tnumberofrecord=" + encodeURI(m) + 
               "&tcoll_code=" + encodeURI(i) + 
               "&tcoll_year=" + encodeURI(j) + 
               "&tcoll_number=" + encodeURI(k) + 
               "&tpinor_id=" + encodeURI(n) + 
               "&tlabelor_id=" + encodeURI(o) + 
               "&tidentification_id=" + encodeURI(p) + 
               "&taxatype=" + h;
       
  $.ajax({
           type: "POST",
           url: "assets/views/action/dbinsertSpecimens.php",
           data: pmeters,
           success: function(result) {
            var obj = jQuery.parseJSON(result);
              $.each(obj, function(key, inval) {
                   $scope.coll_code = inval["coll_code"];
                   $scope.coll_year = inval["coll_year"];
                   $scope.coll_number = inval["coll_number"];
                   $scope.collectionid = inval["coll_id"];
                   $scope.speciforjson = inval["specimens_number"];
                   $scope.Insmode = inval["Ins_mode"];
              });
            if ($scope.savetype == 1) {
                                        
                                        $(':input', '#specimens_form').not(':button, :submit, :reset, :hidden').val(null)
                                          table.draw(); 
                                        $scope.formspecimen.$setPristine();
                                        $scope.formspecimen.$setUntouched();
                                       
                                        document.querySelector('input[name="txtcoll_code"]').value = $scope.coll_code;
                                        document.querySelector('input[name="txtcoll_year"]').value = $scope.coll_year;
                                        document.querySelector('input[name="txtcoll_number"]').value = $scope.coll_number;
                                        document.querySelector('input[name="txtspecimen_number"]').value = $scope.speciforjson;
                                        $scope.typespecimen = 0;
                                    }
                                    if ($scope.savetype == 0) {
                                        alert("sompong00");  
                                    }  
            }  
             
                                
        });
           






























/*
     $.ajax({
         type: "POST",
         url: "views/action/dbinsertSpec.php",
         data: pmeters,
         success: function(result) {

             var obj = jQuery.parseJSON(result);
             if (obj == '') {
                 alter
                 $('input[type=text]').val('');
             } else {
                 $.each(obj, function(key, inval) {
                     $("#txtspecimen_number").val(inval["sprintf_number"]);
                 })
                 table.draw();
             }
         }
     });
     */
     /*
 var pmeters = { tspecimensid: encodeURI(e),
                 tcollectionid: encodeURI(f),
                 tspecimen_number: encodeURI(g),
                
                 tSpecies_ID: encodeURI(d),
                 tspecimenfullnumber: encodeURI(l),
                 taxatype: h,
                 tMode: Mode
                }

         $http({
           method: 'GET',
           url: 'assets/views/action/dbinsertSpecimens.php',
           params: pmeters           
          }).success(function(response) {
            table.draw();
           if (typeof response[0] != 'undefined') {
               $scope.specimen_number = response[0].sprintf_number;
               $("#txtspecimen_number").val($scope.specimen_number)
           }
          });                
*/
 }

    $( "#SpecimensListTbl tbody" ).on( "click", "a.delete", function(event) {
       var data = table.row( $(this).parents('tr') ).data();
       var specimensid = data[0];


       $.ajax({
                    type: "POST",
                    url: "assets/views/action/trashSpecimensTable.php",
                    data:{"specId":specimensid},
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
       
    });




    function fngetdataid(table){
                var aReturn = new Array();                    
                var aTrs = table.rows('.selected').nodes();
                var test =    table.rows('.selected').data();
                for ( var i=0 ; i<aTrs.length ; i++ )
                    {
                        if ( $(aTrs[i]).hasClass('selected') )
                        {
                            aReturn.push( test[i][0] );
                            }
                    }
                    return aReturn;
    };

$('#delete').click( function () {
        var specimensid = fngetdataid(table);        
        $.ajax({
                    type: "POST",
                    url: "assets/views/action/trashSpecimensTable.php",
                    data:{"specIds":specimensid},
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
    });


  function filterColumnspec(i) {
        $('#SpecimensListTbl').DataTable().column(i).search(
            $('#col' + i + '_filter').val(),
            $('#col' + i + '_regex').prop('checked'),
            $('#col' + i + '_smart').prop('checked')
        ).draw();
    }

    $('input.column_filterspec').on('keyup', function() {
        filterColumnspec($(this).parents('DIV').attr('data-column'));
    });
   

    $('#Coll_Specimenlist tbody').on('click', 'tr', function () {
     if ( $(this).hasClass('selected') ) {
                      $(this).removeClass('selected');
                 }
                else {
                      table.$('tr.selected').removeClass('selected');
                      $(this).addClass('selected');
                 }
                 var testedit =    table.row('.selected').data();
               
                 
                 $.ajax({ 
        url: "assets/views/action/returnTableSpecDetails.php" ,
        type: "POST",
        data: {sCode: testedit[0]}
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
                                                        
                                                          $("#txtspecimen_number").val(inval["specimen_number"]);
                                                          
                                                          $('#txtcoll_code').val(inval["coll_code"]);
                                                          $('#txtcoll_year').val(inval["coll_year"]);
                                                          $('#txtcoll_number').val(inval["coll_number"]);                                                          
                                                          $('#txtSub_family').val(inval["subfamily"]);
                                                          $('#labelhead').html("THAILAND:");
                                                          $('#collectioncode').html(inval["coll_code"]);
                                                          $('#collectionyear').html(inval["coll_year"]);
                                                          $('#collectionnumber').html(inval["coll_number"]);
                                                          $('#collectionprovince').html(inval["provinceen"]);
                                                          $('#collectionenddate').html(inval["collectionenddate"]);
                                                          $('#collectionmethod').html(inval["collectionmethodsdetails"]);
                                                          $('#collectioncollector').html(inval["collectorsen"]);
                                                          $('#collectionmasl').html(inval["collectionmasl"]);
                                                          $('#collectionlocality').html(inval["collectionlocality"]);
                                                          $('#collectionnumber').html(inval["coll_number"]);
                                                          $('#collectionmasl').html("Alt. "+inval["collectionmasl"]+" m");
                                                          $('#collectionlat').html(inval["collectionlatd"]+"&#12444;"+inval["collectionlatm"]+"&#39;"+inval["collectionlats"]+"&quot"+"N");
                                                          $('#collectionlong').html(inval["collectionlongd"]+"&#12444;"+inval["collectionlongm"]+"&#39;"+inval["collectionlongs"]+"&quot"+"E");
                                                          $("#txtOrder").val(inval["torder_idtorder"]);
                                                          $("#txtFamily").val(inval["family_idfamily"]);
                                                          $("#txtSub_family").val(inval["subfamily"]);
                                                          $("#txtGenus").val(inval["genus_idgenus"]);
                                                          
                                                          $("#txtSub_Genus").val(inval["subgenus"]);
                                                          $("#txtSpecies").val(inval["species_idspecies"]);
                                                          $("#txttest").val(inval["taxatypes_idtaxatypes"]);
                                                          
                                                          
                                                          if (inval["taxatypes_idtaxatypes"]==1) {
                                                            inval["taxatypes_idtaxatypes"]= 3
                                                          }
                                                          $('input:radio[name=typespecimen]')[inval["taxatypes_idtaxatypes"]].checked = true;
                             });
                                        }
                                     

      }) 
                 
  } );
    
    

    $scope.getFamilylist = null;
    $scope.getFamily = [];
    $http({
        method: 'GET',
        url: 'assets/views/action/getTaxalist.php',
        dataType: "JSON",
        params: {sFamily: 'family'}
    }).success(function(result) {
        $scope.getFamily = result;
    });

    $scope.getGenuslist = null;
    $scope.getGenus = [];
    $http({
        method: 'GET',
        url: 'assets/views/action/getTaxalist.php',
        dataType: "JSON",
        params: {sGenus: 'genus'}
    }).success(function(result) {
        $scope.getGenus = result;
    });

    $scope.getSpecieslist = null;
    $scope.getSpecies = [];
    $http({
        method: 'GET',
        url: 'assets/views/action/getTaxalist.php',
        dataType: "JSON",
        params: {sSpecies: 'Species'}
    }).success(function(result) {
        $scope.getSpecies = result;
    });
/*
       $("#txtOrder").on("change", function() {
         var spec = this.value;
         $.ajax({
                 url: "assets/views/action/Torderchange.php",
                 type: "GET",
                 data: {
                     sCode: spec
                 }
             })
             .success(function(result) {
                 var obj = jQuery.parseJSON(result);
                 if (obj == "") {
                                                                                                           
                                                          $("#txtFamily").val('');
                                                          $("#subfamily").val('0');
                                                         
                 } else {
                  var opt="<option value=\"0\" selected=\"selected\"></option>";
                     $.each(obj, function(key, val) {

                     opt +="<option value='"+ val["idfamily"] +"'>"+val["familyname"]+"</option>"
                                                                        
                                                         

                                                       
                     });

                      $("#txtFamily").html(opt );
                 }
             })
        });

        $("#txtFamily").on("change", function() {
        var spec = this.value;
         $.ajax({ 
        url: "assets/views/action/familychange.php" ,
        type: "GET",
        data: {sCode: spec}
      })
      .success(function(result) {
                                
        var obj = jQuery.parseJSON(result);
                                if(obj === '')
          {
                                          $("#txtGenus").val('0');
                                                          $("#txtSub_Genus").val('');
                                                          $("#txtSpecies").val('0');
                                                           $("#txtSub_family").val('');
          }
          else
          {
                                $.each(obj, function(key, inval) {
                                                                                                         
                                                          $("#txtOrder").val(inval["torder_idtorder"]);                                                         
                                                          $("#txtSub_family").val(inval["subfamily"]);
                                                          $("#txtGenus").val('0');
                                                          $("#txtSub_Genus").val('');
                                                          $("#txtSpecies").val('0');
                                                         
                                                        
                                                        
                                                          
                                                         
                                });
                                        }
                                     

      }) 
        });
*/

/*
        $("#txtGenus").on("change", function() {
        var spec = this.value;
         $.ajax({ 
        url: "assets/views/action/genuschange.php" ,
        type: "GET",
        data: {sCode: spec}
      })
      .success(function(result) {
                                
        var obj = jQuery.parseJSON(result);
                                if(obj == '')
          {
                                           
                                                          $("#txtSub_Genus").val('');
                                                            $("#txtSpecies").val('0');
          }
          else
          {
                                $.each(obj, function(key, inval) {
                                                                                                         
                                                          $("#txtOrder").val(inval["torder_idtorder"]);
                                                          $("#txtFamily").val(inval["family_idfamily"]);
                                                          $("#txtSub_family").val(inval["subfamily"]);
                                                           $("#txtSpecies").val('0');
                                                          
                                                         
                                                        
                                                        
                                                          
                                                         
                                });
                                        }
                                     

      }) 
        });       

         $("#txtSpecies").on("change", function() {
        var spec = this.value;
         $.ajax({ 
        url: "assets/views/action/specieschange.php" ,
        type: "GET",
        data: {sCode: spec}
      })
      .success(function(result) {
                                
        var obj = jQuery.parseJSON(result);
                                if(obj == '')
          {
                                          
          }
          else
          {
                                $.each(obj, function(key, inval) {
                                                                                                         
                                                          $("#txtOrder").val(inval["torder_idtorder"]);
                                                          $("#txtFamily").val(inval["family_idfamily"]);
                                                          $("#txtSub_family").val(inval["subfamily"]);
                                                          $("#txtGenus").val(inval["genus_idgenus"]);
                                                          $("#txtSub_Genus").val(inval["subgenus"]);
                                                         
                                                        
                                                        
                                                          
                                                         
                                });
                                        }
                                     

      }) 
        }); 

*/
 $scope.getOrder = [];     
 $scope.getFamily = []; 
 $scope.getGenus = [];
 $scope.getSpecies = [];

 $scope.onChangedOrder = function(id) {

    $http({
        method: 'GET',
        url: 'assets/views/action/getTaxalistspec.php',
          params: {sOrderid: id,emptytaxa: "emptyorder"}
    }).success(function(result) {
       
       if(typeof result[0].idtorder !== "undefined"){
        $scope.getFamily = result;
       }
       else
       {

         $scope.getOrderlist = null;
    $scope.getOrder = [];
    $http({
        method: 'GET',
        url: 'assets/views/action/getTaxalist.php',
        dataType: "JSON",
        params: {sTorder: 'torder'}
    }).success(function(result) {
        $scope.getOrder = result;
    });

    $scope.getFamilylist = null;
    $scope.getFamily = [];
    $http({
        method: 'GET',
        url: 'assets/views/action/getTaxalist.php',
        dataType: "JSON",
        params: {sFamily: 'family'}
    }).success(function(result) {
        $scope.getFamily = result;
    });

    $scope.getGenuslist = null;
    $scope.getGenus = [];
    $http({
        method: 'GET',
        url: 'assets/views/action/getTaxalist.php',
        dataType: "JSON",
        params: {sGenus: 'genus'}
    }).success(function(result) {
        $scope.getGenus = result;
    });

    $scope.getSpecieslist = null;
    $scope.getSpecies = [];
    $http({
        method: 'GET',
        url: 'assets/views/action/getTaxalist.php',
        dataType: "JSON",
        params: {sSpecies: 'Species'}
    }).success(function(result) {
        $scope.getSpecies = result;
    });
       }
    });
  }

  $scope.onChangedFamily = function(id) {



    $http({
        method: 'GET',
        url: 'assets/views/action/getTaxalistspec.php',
        params: {sFamilyid: id,emptytaxa : "emptyfamily"}
    }).success(function(result) {
      


       if(typeof result[0].idfamily !== "undefined"){
         $scope.getGenus = result;
         $scope.idtorder = result[0];
       }
       else
       {
       
         $scope.idgenus = {
          idgenus : undefined
        }
         $scope.idspecies = {
          idspecies : undefined
        }
       }
      
    });

  }

   $scope.onChangedGenus = function(id) {



 
    $http({
        method: 'GET',
        url: 'assets/views/action/getTaxalistspec.php',
        params: {sGenusid: id,emptytaxa : "emptygenus"}
    }).success(function(result) {

        if(typeof result[0].idgenus !== "undefined"){
          $scope.getSpecies = result;
          $scope.idtorder = result[0];
          $scope.idfamily = result[0];

       $scope.getFamily = result;
       $scope.getOrder = result;
       }
       else
       {
       
        
         $scope.idspecies = {
          idspecies : undefined
        }
       }

     
       
    });

  }

   $scope.onChangedSpecies = function(id) {


    $http({
        method: 'GET',
        url: 'assets/views/action/getTaxalistspec.php',
        params: {sSpeciesid: id,emptytaxa : "emptyspecies"}
    }).success(function(result) {

       if(typeof result[0].idgenus !== "undefined"){
       $scope.idtorder = result[0];
       $scope.idfamily = result[0];
       $scope.idgenus = result[0];
       $scope.idspecies = result[0];

       $scope.getOrder = result;
       $scope.getGenus = result;
       $scope.getFamily = result;
       $scope.getSpecies = result;
       }
      

    
      
       
    });

  }

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
   
   $scope.onChangedCollnumber = function() {
       $http({
           method: 'GET',
           url: 'assets/views/action/returnAutoSpecNo.php',
           params: {
               sYear: $("#col7_filter").val() ,
               sNumber: $("#col8_filter").val()
           }
       }).success(function(response) {
           if (typeof response[0] != 'undefined') {
               $scope.specdata.collectionid = response[0].coll_id;
               $scope.specimens_number = response[0].specimens_number;
               $("#txtspecimens_number").val($scope.specimens_number)
           }
       });
   }


 






/*

 $scope.getFamily = [];
  $scope.getGenus = [];
    $http({
        method: 'GET',
        url: 'assets/views/action/getTaxalistspec.php',
          params: {sTaxaid: id}
    }).success(function(result) {
        
    });

  }

  $scope.onChangedFamily = function(id) {



  $scope.getGenus = [];
    $http({
        method: 'GET',
        url: 'assets/views/action/getTaxalistspec.php',
        params: {sTaxaid: id}
    }).success(function(result) {
        if(taxa = 'order'){
        $scope.getGenus = result;
        }
       
    });

  }
  */


   $scope.OrderIns = function(Mode) {
            var a = $("#province_direct_en_enter").val();
            var b = $("#province_direct_th_enter").val();
            var c = $scope.myModel.country_direct_id
            var data = $.param({
                tMode: Mode,
                tprovince_direct_en_enter: a,
                tprovince_direct_th_enter: b,
                tcountry_direct_country_direct_id: c
            });
            /*
            var config = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                }
            }       
            $http.post('assets/views/action/dbinsertMethod.php', data, config).success(function(data, status, headers, config) {
                $scope.PostDataResponse = data;
            })
            */
            $http({
                method: 'POST',
                url: 'assets/views/action/dbinsertProvinceDirect.php',
                data: data,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
            }).success(function(response) {
                $scope.clearProvince();
            });
        }
    $scope.FamilyIns = function(Mode) {
            var a = $("#province_direct_en_enter").val();
            var b = $("#province_direct_th_enter").val();
            var c = $scope.myModel.country_direct_id
            var data = $.param({
                tMode: Mode,
                tprovince_direct_en_enter: a,
                tprovince_direct_th_enter: b,
                tcountry_direct_country_direct_id: c
            });
            /*
            var config = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                }
            }       
            $http.post('assets/views/action/dbinsertMethod.php', data, config).success(function(data, status, headers, config) {
                $scope.PostDataResponse = data;
            })
            */
            $http({
                method: 'POST',
                url: 'assets/views/action/dbinsertProvinceDirect.php',
                data: data,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
            }).success(function(response) {
                $scope.clearProvince();
            });
        }
       $scope.GenusIns = function(Mode) {
            var a = $("#province_direct_en_enter").val();
            var b = $("#province_direct_th_enter").val();
            var c = $scope.myModel.country_direct_id
            var data = $.param({
                tMode: Mode,
                tprovince_direct_en_enter: a,
                tprovince_direct_th_enter: b,
                tcountry_direct_country_direct_id: c
            });
            /*
            var config = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                }
            }       
            $http.post('assets/views/action/dbinsertMethod.php', data, config).success(function(data, status, headers, config) {
                $scope.PostDataResponse = data;
            })
            */
            $http({
                method: 'POST',
                url: 'assets/views/action/dbinsertProvinceDirect.php',
                data: data,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
            }).success(function(response) {
                $scope.clearProvince();
            });
        }
        $scope.SpeciesIns = function(Mode) {
            var a = $("#province_direct_en_enter").val();
            var b = $("#province_direct_th_enter").val();
            var c = $scope.myModel.country_direct_id
            var data = $.param({
                tMode: Mode,
                tprovince_direct_en_enter: a,
                tprovince_direct_th_enter: b,
                tcountry_direct_country_direct_id: c
            });
            /*
            var config = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                }
            }       
            $http.post('assets/views/action/dbinsertMethod.php', data, config).success(function(data, status, headers, config) {
                $scope.PostDataResponse = data;
            })
            */
            $http({
                method: 'POST',
                url: 'assets/views/action/dbinsertProvinceDirect.php',
                data: data,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
            }).success(function(response) {
                $scope.clearProvince();
            });
        }   




$scope.specModelOrder='';
$scope.specModelFamily='';
$scope.specModelGenus='';
$scope.specModelSpecies='';
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
$scope.ModelPinor={};
$scope.ModelLabelor={};
$scope.ModelIdentification={};      
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
    

  
    
}])
