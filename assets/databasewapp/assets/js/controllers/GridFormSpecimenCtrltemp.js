'use strict';
/** 
  * controllers for GoogleMap 
  * AngularJS Directive 
*/
app.controller("GridFormSpecimenCtrl", ["$scope","$http", "$timeout", "$stateParams", "SweetAlert", "test", 
    function ($scope, $http, $timeout, $stateParams, SweetAlert, test) {


    $scope.specdata = {};
    test.specno($stateParams.specid).success(function(result) {
       
        
         function filterColumn(i) {
             $('#Coll_Specimenlist').DataTable().column(i).search(
                 $('#col' + i + '_filter').val()

             ).draw();
         }

       
 
        $("#col4_filter").val(result[0].coll_code);
        $("#col5_filter").val(result[0].coll_year);
        $("#col6_filter").val(result[0].coll_number);
        var startdate = result[0].collectionstartdate;
        var enddate = result[0].collectionenddate;
        $scope.specdata.idcollection = result[0].idcollection;
        $scope.specdata.collectionid = result[0].collectionid;
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
        $scope.specdata.specimen_number = result[0].specimen_number;
        $scope.specdata.coll_code = result[0].coll_code;
        $scope.specdata.coll_year = result[0].coll_year;
        $scope.specdata.coll_number = result[0].coll_number;
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
       filterColumnspec(4)
        filterColumnspec(5)
        filterColumnspec(6)
    });

    var selected = [];
    var table = $('#Coll_Specimenlist').DataTable({
        "processing": true,
        "serverSide": true, 
        "ajax": {
            "url": "assets/scripts/server_processing_specimendata.php",
            "type": "POST"
        },
        "dom": '<"top"pl><"clear">rti',
        "scrollX": true,
        "scrollY": "300px",
        "scrollCollapse": true,
        "order": [[ 0, "asc" ]],
        "columns": [
        { "data": "0","width": "8%" },
        { "data": "1","width": "10%" },
        { "data": "2","width": "15%" },
        { "data": "3","width": "15%" },
        { "data": "4","width": "8%" },
        { "data": "5","width": "8%" },
        { "data": "6","width": "18%" },
        { "data": "7","width": "18%" },
        { "data": "8","width": "8%" },
        { "data": "9","width": "8%" },
        { "data": "10","width": "18%" },
        { "data": "11","width": "18%" }],
        "columnDefs": [
        
         {
            "visible": false,
                    targets: 2

        },
        {
            "visible": false,
                    targets: 3

        },
        {
            "visible": false,
                    targets: 4

        },
        {
            "visible": false,
                    targets: 5

        },
        {
            "visible": false,
                    targets: 6

        },
        {
            "visible": false,
                    targets: 11

        }

        
        ] 
    });

  function filterColumnspec(i) {
        $('#Coll_Specimenlist').DataTable().column(i).search(
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
                                                          
                                                          
                                                          if (inval["taxatypes_idtaxatypes"]==null) {
                                                            inval["taxatypes_idtaxatypes"]= 0
                                                          }
                                                          $('input:radio[name=test]')[inval["taxatypes_idtaxatypes"]].checked = true;
                             });
                                        }
                                     

      }) 
                 
  } );
    
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
    

  
    
}])
