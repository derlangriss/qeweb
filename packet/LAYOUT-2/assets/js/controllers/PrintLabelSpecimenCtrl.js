'use strict'; 
/** 
  * controllers for GoogleMap 
  * AngularJS Directive 
*/  
app.controller("PrintLabelSpecimenCtrl", ["$scope", "$http", "$timeout", "$stateParams", "SweetAlert", "test","$uibModal", "$log","printsum",
    function($scope, $http, $timeout, $stateParams, SweetAlert, test,$uibModal, $log, printsum) {

        printsum.totaldata("specimen").success(function(dataspecimen) {
                 $scope.totallabelspecimen = dataspecimen[0].totallabel;                 
                 $scope.papersizespecimen = dataspecimen[0].totalpapersize;
        })

        var selected = [];
        var table = $('#specimenview').DataTable({
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
            "columnDefs": [ 

                {  
                   
                    width: '20px',
                    targets: 0
        },
                {
                    width: '150px',
                    targets: 1
        },
                {   
                    visible: false,
                    width: '180px',
                    targets: 2
        },
                {   
                    visible: false,
                    width: '100px',
                    targets: 3
        },
                {   
                    visible: false,
                    width: '80px',
                    targets: 4
        },
                {   
                    visible: false,
                    width: '80px',
                    targets: 5
        },
                {   
                    visible: false,
                    width: '320px',
                    targets: 6
        },
                {   visible: false,
                    width: '150px',
                    targets: 7
        },
                {
                    width: '150px',
                    targets: 8
        },
                {
                    width: '150px',
                    targets: 9
        },
                {
                    width: '150px',
                    targets: 10
        },
                {   
                  
                    width: '150px',
                    targets: 11
        },
                {   
                    visible: false,
                    width: '80px',
                    targets: 12
        }
               
 

        ]


        });

function format(d) {
    return '<form><table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">'+
        '<tr>'+
            '<td>SPECIMENNUMBER:'+d['1']+'</td>'+
          
        '</tr>'+
        '<tr>'+           
            '<td>ORDER:'+d['8']+'m'+'</td>'+
        '</tr>'+
        '<tr>'+
            '<td>FAMILY:'+d['9']+'</td>'+
           
        '</tr>'+
        '<tr>'+           
            '<td>GENUS:'+d['10']+'</td>'+
        '</tr>'+
        '<tr>'+           
             '<td>SPECIES:'+d['11']+'</td>'+
        '</tr>'+
       
    '</table>';
    }
 
function testformat(d,n) { 
    return d[n];
}

$scope.loadData = function (type) {
            var dataHandler = $(".user_profile_list_a");
            dataHandler.html("");
            var data = "tlabel_type=" + type;
            
            $.ajax({
            type: "POST",
            data: data,
            url: "assets/views/action/printqueue.php",
            success: function(result){
                var resultObj = JSON.parse(result);
               
                $.each(resultObj,function(key,val){
                    var newRow = $("<li>");
                    newRow.html("<a href='javascript:void(0)'><img src='assets/images/team-2.jpg' alt='' height='38' width='38'><p>"+val.specimenfullnumber+"<span><span class='text-muted'><br>Number of Print:</span>"+val.numberofitemstoprint+"</span><br><a id='"+val.idlabelprintqueue+"'class='del'>Delete</a></p></a>"); 
                

                    dataHandler.append(newRow);
                    
                });
               
            }
        });
        }
   function filterColumnspec(i) {
           $('#specimenview').DataTable().column(i).search(
               $('#col' + i + '_filter').val(),
               $('#col' + i + '_regex').prop('checked'),
               $('#col' + i + '_smart').prop('checked')
           ).draw();
       }


       $('input.column_filter_printspec').on('keyup', function() {
           filterColumnspec($(this).parents('DIV').attr('data-column'));
       });
       
function ajax(action,id){
               
        
        if(action == "delete"){
           var data = "action="+action+"&item_id="+id;
        }

        $.ajax({
            type: "POST", 
            url: "assets/views/action/ajaxpostgres.php", 
            data : data,
            dataType: "json",
            success: function(response){
                if(response.success == "1"){
                    if(action == "save"){
                        
                        $(".user_profile_list_a").load("<li><a id='"+response.row_id+"' class='del'>Delete</a></li>");  
                            
                                
                    }else if(action == "delete"){
                        var row_id = response.item_id;
                        $("a[id='"+row_id+"']").closest("li").fadeOut();
                    }
                }else{
                    alert("unexpected error occured, Please check your database connection");
                }
            },
            error: function(res){
                alert("Unexpected error! Try again.");
            }
        });
    }

$('#specimenlist').on("click",'.del',function(){
        if(confirm("Do you really want to delete this record ?")){
            ajax("delete",$(this).attr("id"));
        }
});  

$('#specimenview tbody').on('click', 'tr', function() {

    var tr = $(this).closest('tr');
    var row = table.row(tr);
  
    $scope.open = function(size) {
        var modalInstance = $uibModal.open({
            templateUrl: "assets/views/ModalPrintSpecimen.html",
            controller: function($scope, $uibModalInstance) {
                $scope.modalTitle = "Specimens Print Setting";
                $scope.modalContent = b;
                $scope.eee = function() {
               insertprintqueue("save");
               $uibModalInstance.close()
                }               
                $scope.cancel = function() {
                    $uibModalInstance.dismiss("cancel")
                }
            },
            size: size
        });

        modalInstance.result.then(function(selectedItem) {
            $scope.selected = selectedItem
        }, function() {
            $log.info("Modal dismissed at: " + new Date)
        })
    }
   
    function insertprintqueue(action) {
        var data;
        var c = labelid[0];
        var pmeters = "&tlabel_id=" + c +
            "&tnumber_of_items=" + encodeURI(document.getElementById("txtnumberofitems").value) +
            "&tlabel_type=specimen" +
            "&action=" + action;

        if (action == "save"){
            data = pmeters
        }
        else if (action == "delete") {
            data = "action=" + action + "&item_id=" + id;
        }
        $.ajax({
            type: "POST",
            url: "assets/views/action/ajaxpostgres.php",
            data: data,
            dataType: "json",
            success: function(response) {
                if (response.success == "1") {
                    if (action == "save") {
                         printsum.totaldata("specimen").success(function(dataspecimen) {
                 $scope.totallabelspecimen = dataspecimen[0].totallabel;                 
                 $scope.papersizespecimen = dataspecimen[0].totalpapersize;
        });
                        $scope.loadData('specimen');
                    }
                } else {
                    alert("unexpected error occured, Please check your database connection");
                }
            },
            error: function(res) {
                alert("Unexpected error! Try again.");
            }
        });
    }

    if ($(this).hasClass('selected')) {
        $(this).removeClass('selected');
    } else {
        table.$('tr.selected').removeClass('selected');
        $(this).addClass('selected');
        $scope.open('sm');
        var labelid = table.row('.selected').data();
        var a = row.data();
        var b = format(a);
    }
   
    });





$scope.config = {
            autoHideScrollbar: true,
            setHeight: 600,
            scrollInertia: 500,
            theme: 'light',
            axis: 'yx',
            advanced: {
                updateOnContentResize: false
            },
            scrollButtons: {
                scrollAmount: 'auto', // scroll amount when button pressed
                enable: true // enable scrolling buttons by default
            }
        }







}])




/*.controller("PrintLabelCtrl", ["$scope", "$modal", "growl", "files","test", "$timeout", "$stateParams","printsum","ajaxData",
    function($scope,$modal, growl, files,test, $timeout,$stateParams,printsum,ajaxData ) {
        
    $scope.dyrowtest = ajaxData;
   
        
    $scope.$on("$stateChangeSuccess", function() {
        yukon_user_profile.init()
    })
    printsum.getdata(function(data){
    $scope.contactList = data;
    })
    $scope.specdata = {}; 
    test.specno($stateParams.specid).success(function(result){
        function filterColumn ( i ) {
	$('#Coll_Specimenlist').DataTable().column( i ).search( 
		$('#col'+i+'_filter').val()
		
	).draw();
        }
        $("#col7_filter").val(result[0].coll_code) ;
        $("#col8_filter").val(result[0].coll_year) ;
        $("#col9_filter").val(result[0].coll_number) ;
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
$('#collectionmasl').html("Alt. "+result[0].collectionmasl+" m");
$('#collectionlocality').html(result[0].collectionlocality);
$('#collectionlat').html(result[0].collectionlatd+"&#12444;"+result[0].collectionlatm+"&#39;"+result[0].collectionlats+"&quot"+"N");
$('#collectionlong').html(result[0].collectionlongd+"&#12444;"+result[0].collectionlongm+"&#39;"+result[0].collectionlongs+"&quot"+"E");
        filterColumn (7)
        filterColumn (8)
        filterColumn (9)
      
    });
    var selected = [];
   
   var table = $('#collectionview').DataTable( {
		"processing": true,
		"serverSide": true,
		"ajax": {
			"url":"assets/lib/DataTables-1.10.7/examples/server_side/scripts/server_processing_simpletest.php",
			"type":"POST"
		},
		"dom": '<"top"pl><"clear">rti',
		                "scrollX": true,
                                 "scrollY": "300px",
                "scrollCollapse": true,
                "columnDefs": [
 
              { width: '20px', targets: 0 },
              { width: '120px', targets: 1 },
              { width: '180px', targets: 2 },
              { width: '100px', targets: 3 },
              { width: '80px', targets: 4 },
              { width: '80px', targets: 5 },
              { width: '320px', targets: 6 },
              { width: '320px', targets: 7 },
              { width: '320px', targets: 8 },
              { width: '150px', targets: 9 },
              { width: '150px', targets: 10 },
              { width: '80px', targets: 11 },
              { width: '150px', targets: 12 },
         
                   
        ]
               
             
	} );
   
   
   
   
   
   function format ( d ) {
    // `d` is the original data object for the row
    return '<form><table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">'+
        '<tr>'+
            '<td>THAILAND:'+d['1']+'</td>'+
          
        '</tr>'+
        '<tr>'+           
            '<td>'+d['17']+'Alt.'+d['14']+'m'+'</td>'+
        '</tr>'+
        '<tr>'+
            '<td>'+d['6']+'</td>'+
           
        '</tr>'+
        '<tr>'+           
            '<td>'+d['18']+'&#12444;'+d['19']+'&#39;'+d['20']+"&quot"+"N"+'&nbsp;'+d['21']+'&#12444;'+d['22']+'&#39;'+d['23']+"&quot"+"E"+'</td>'+
        '</tr>'+
        '<tr>'+           
            '<td>'+d['4']+d['2']+'</td>'+
        '</tr>'+
        '<tr>'+           
            '<td>'+d['15']+'</td>'+
        '</tr>'+
    '</table>';
    

}
     $('#collectionview tbody').on('click', 'tr', function (size) {
		if ( $(this).hasClass('selected') ) {
                      $(this).removeClass('selected');
                 }
                else {
                      table.$('tr.selected').removeClass('selected');
                      $(this).addClass('selected');
                 }

        var tr = $(this).closest('tr');
        var row = table.row( tr ); 
        var testedit =    table.row('.selected').data();

        
         
         
         
        var modalInstance = $modal.open({
            templateUrl: "views/partials/bootstrapModal.php",
            size: size,
            controller: function($scope, $modalInstance) {
                $scope.modalTitle = "Collection Print Setting";
                
                $scope.modalContent = format(row.data()) ;
             
                 $scope.Labelinsert = function() {
                 insertprintqueue("save");                   
                 }
                $scope.ok = function() {
                    $modalInstance.close()
                };
                $scope.cancel = function() {
                    $modalInstance.dismiss("cancel")
                }
            }
        })

        function insertprintqueue(action) {

         var pmeters = "&tlabel_id=" + testedit[0] +
             "&tnumber_of_items=" + encodeURI(document.getElementById("txtnumberofitems").value) +
             "&action=" + action;

         if (action == "save")
             data = pmeters
         else if (action == "delete") {
             data = "action=" + action + "&item_id=" + id;
         }

               
                
        $.ajax({
            type: "POST", 
            url: "views/action/ajaxpostgres.php", 
            data : data,
            dataType: "json",
            success: function(response){
                if(response.success == "1"){
                    if(action == "save"){
                        loadData(); 
                    }
                }else{
                    alert("unexpected error occured, Please check your database connection");
                }
            },
            error: function(res){
                alert("Unexpected error! Try again.");
            }
        });
                          
          /*$.ajax({ 
                url: "views/action/addlabelprintqueue.php" ,
                type: "POST",
                data: pmeters
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
                                          
                                              $(".popuptest").html(inval["showtotal"]);
                                            })
                                           
                                        }

            })
           
     */
                /*    
                    
                } 

*/


/*

	} );
       
    function loadData () {
            var dataHandler = $(".user_profile_list_a");
            dataHandler.html("");

            $.ajax({
            type: "GET",
            data:"",
            url: "views/action/printsum.php",
            success: function(result){
                var resultObj = JSON.parse(result);
               
                $.each(resultObj,function(key,val){
                    var newRow = $("<li>");
                    newRow.html("<a href='javascript:void(0)'><img src='assets/img/avatars/avatar09_tn.png' alt='' height='38' width='38'><p>"+val.collectionid+"<span><span class='text-muted'><br>Number of Print:</span>"+val.numberofitemstoprint+"</span><br><a id='"+val.idlabelprintqueue+"'class='del'>Delete</a></p></a>'"); 
                

                    dataHandler.append(newRow);
                    
                });
               
            }
        });
        }


        
   
        
    function insertspec(Mode) {
        var test = $('input[name=test]:checked').val();
        var pmeters = "tidspecimens=" + encodeURI(document.getElementById("txtidspecimens").value) +
        "&tidcollection=" + encodeURI(document.getElementById("txtidcollection").value) +
        "&tspecimen_number=" + encodeURI(document.getElementById("txtspecimen_number").value) +
        "&tOrder_ID=" + encodeURI(document.getElementById("txtOrder").value) +
        "&tFamily_ID=" + encodeURI(document.getElementById("txtFamily").value) +
       
        "&tGenus_ID=" + encodeURI(document.getElementById("txtGenus").value) +
       
        "&tSpecies_ID=" + encodeURI(document.getElementById("txtSpecies").value) +
        "&taxatype=" + test +
        
        
        "&tMode=" + Mode;

        $.ajax({ 
            type: "POST",
            url: "views/action/dbinsertSpec.php",
            data: pmeters,
            success: function(result) {
                                
				var obj = jQuery.parseJSON(result);
                                if(obj == '')
					{
                                            alter
						$('input[type=text]').val('');
					}
					else
					{
                                            $.each(obj, function(key, inval) {
                                                $("#txtspecimen_number").val(inval["sprintf_number"]);
                                            })
                                            table.draw();
                                        }
                    }
        });
    }
        
     
var purchased=new Array();
var totalprice=0;


function ajax(action,id){
               
        
		if(action == "delete"){
			data = "action="+action+"&item_id="+id;
		}

		$.ajax({
			type: "POST", 
			url: "views/action/ajaxpostgres.php", 
			data : data,
			dataType: "json",
			success: function(response){
				if(response.success == "1"){
					if(action == "save"){
						
						$(".user_profile_list_a").load("<li><a id='"+response.row_id+"' class='del'>Delete</a></li>");	
							
								
					}else if(action == "delete"){
						var row_id = response.item_id;
						$("a[id='"+row_id+"']").closest("li").fadeOut();
					}
				}else{
					alert("unexpected error occured, Please check your database connection");
				}
			},
			error: function(res){
				alert("Unexpected error! Try again.");
			}
		});
	}

$(document).ready(function(){
    
    loadData();	
       
	$("#save").click(function(){
		ajax("save ");
	});
        
	$('#content-1').on("click",'.del',function(){
		if(confirm("Do you really want to delete this record ?")){
			ajax("delete",$(this).attr("id"));
		}
	});  
        
        function fngetdataid( table )
            {
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
        
        $('#addprintlist').click( function () {
		var collectionid = fngetdataid(table);
                     $.ajax({
                        type: "POST",
                        url: "views/action/addprintlist.php",
                        data:{"id":collectionid},                    
                        dataType:'json',
                        beforeSend: function(x){$('#ajax-loader').css('visibility','visible');},
                        success: function(result){
                             $('#ajax-loader').css('visibility','hidden');
                                          var testtable = '';
							$.each(result, function(key, val){
							    	testtable += val["txt"];
    						});
							$('#item-list').html(testtable);
                                     }
              });
	} );

	$('.product').simpletip({
		
		offset:[40,0],
		content:'<img src="img/ajax_load.gif" alt="loading" style="margin:10px;" />',
		onShow: function(){
			var param = this.getParent().find('img').attr('src');
			if($.browser.msie  && $.browser.version=='6.0')
			{
				param = this.getParent().find('img').attr('style').match(/src=\"([^\"]+)\"/);
				param = param[1];
			}
			this.load('assets/lib/simpletip/ajax/tips.php',{img:param}); 
		} 
	});
});





        
    
    
       $scope.DiffcollSpec ={};

                $scope.DiffcollSpec.Click = function() {
         
          insertspec('ADD')
     
                    
                    
                }
     
     
     
     
     
     
     
     
     
     
                 
      $scope.SpecNo ={};

                $scope.SpecNo.Click = function() {
           
          $.ajax({ 
				url: "views/action/returnSpecNo.php" ,
				type: "POST",
				data: {sCode: $("#col7_filter").val(),sYear:$("#col8_filter").val(),sNumber:$("#col9_filter").val()}
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
           
     
                    
                    
                }
                
                
     
       
       $("#txtOrder").on("change", function() {
        var spec = this.value;
         $.ajax({ 
				url: "views/action/familychange.php" ,
				type: "GET",
				data: {sCode: spec}
			})
			.success(function(result) {
                                
				var obj = jQuery.parseJSON(result);
                                if(obj == '')
					{
                                              $("#txtFamily").val('0');
                                              $("#txtSub_family").val('');
                                          $("#txtGenus").val('0');
                                                          $("#txtSub_Genus").val('');
                                                          $("#txtSpecies").val('0');
                                                           $("#txtSub_family").val('');
					}
					else
					{
                                $.each(obj, function(key, inval) {
                                                                                                         
                                                         
                                                         
                                                        
                                                        
                                                          
                                                         
                                });
                                        }
                                     

			}) 
        });         
                         
       $("#txtFamily").on("change", function() {
        var spec = this.value;
         $.ajax({ 
				url: "views/action/familychange.php" ,
				type: "GET",
				data: {sCode: spec}
			})
			.success(function(result) {
                                
				var obj = jQuery.parseJSON(result);
                                if(obj == '')
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
                
      $("#txtGenus").on("change", function() {
        var spec = this.value;
         $.ajax({ 
				url: "views/action/genuschange.php" ,
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
				url: "views/action/specieschange.php" ,
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
       
                  
      $scope.SpecDetails ={};

                $scope.SpecDetails.Click = function() {
           
          $.ajax({ 
				url: "views/action/returnSpecDetails.php" ,
				type: "POST",
				data: {sCode: $("#txtcoll_code").val(),sYear:$("#txtcoll_year").val(),sNumber:$("#txtcoll_number").val(),sSpecNumber:$("#txtspecimen_number").val()}
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
                                                          $("#txtcoll_code").val(inval["coll_code"]);
                                                          $("#txtcoll_year").val(inval["coll_year"]);
                                                          $("#txtcoll_number").val(inval["coll_number"]);
                                                          $("#txtspecimen_number").val(inval["specimen_number"]);
                                                          
                                                          $("#txtOrder").val(inval["torder_idtorder"]);
                                                          $("#txtFamily").val(inval["family_idfamily"]);
                                                          $("#txtSub_family").val(inval["subfamily"]);
                                                          $("#txtGenus").val(inval["genus_idgenus"]);
                                                          
                                                          $("#txtSub_Genus").val(inval["subgenus"]);
                                                          $("#txtSpecies").val(inval["species_idspecies"]);
                                                          if (inval["taxatypes_idtaxatypes"]==null) {
                                                            $('#Normal').attr('checked', true)
                                                          }else if (inval["taxatypes_idtaxatypes"]==1) {
                                                            $('#Holotype').attr('checked', true)
                                                          }else if (inval["taxatypes_idtaxatypes"]==2) {
                                                            $('#Paratype').attr('checked', true)
                                                          }else if (inval["taxatypes_idtaxatypes"]==3) {
                                                            $('#Neotype').attr('checked', true)
                                                          }else if (inval["taxatypes_idtaxatypes"]==4) {
                                                            $('#Syntype').attr('checked', true)
                                                          }else if (inval["taxatypes_idtaxatypes"]==5) {
                                                            $('#Lectotype').attr('checked', true)
                                                          }else if (inval["taxatypes_idtaxatypes"]==6) {
                                                            $('#Paralectotype').attr('checked', true)
                                                          }
                                                        
                                                        
                                                          
                                                         
                             });
                                        }
                                     

			})
           
     
                    
                    
                }
                $.ajax({
			  url: "views/action/getOrderlist.php",
			  global: false,
			  type: "GET",
			  dataType: "JSON",
                          data: {sTorder: 'torder'},
			  success: function(torderlist) {
							
                            
							$.each(torderlist, function(key, val){
								opt +="<option value='"+ val["idtorder"] +"'>"+val["tordername"]+"</option>"
    						});
							$("#txtOrder").html( opt );
		   	  }
		});
                 $.ajax({
			  url: "views/action/getOrderlist.php",
			  global: false,
			  type: "GET",
			  dataType: "JSON",
                          data: {sFamily: 'family'},  
			  success: function(familylist) {
							var opt="<option value=\"0\" selected=\"selected\">Family</option>";
							$.each(familylist, function(key, val){
								opt +="<option value='"+ val["idfamily"] +"'>"+val["familyname"]+"</option>"
    						});
							$("#txtFamily").html( opt );
		   	  }
		});
                  $.ajax({
			  url: "views/action/getOrderlist.php",
			  global: false,
			  type: "GET",
			  dataType: "JSON",
                          data: {sGenus: 'genus'},  
			  success: function(genuslist) {
							var opt="<option value=\"0\" selected=\"selected\">Genus</option>";
							$.each(genuslist, function(key, val){
								opt +="<option value='"+ val["idgenus"] +"'>"+val["genusname"]+"</option>"
    						});
							$("#txtGenus").html( opt );
		   	  }
		});
                   $.ajax({
			  url: "views/action/getOrderlist.php",
			  global: false,
			  type: "GET",
			  dataType: "JSON",
                          data: {sSpecies: 'Species'},  
			  success: function(specieslist) {
							var opt="<option value=\"0\" selected=\"selected\">Species</option>";
							$.each(specieslist, function(key, val){
								opt +="<option value='"+ val["idspecies"] +"'>"+val["speciesname"]+"</option>"
    						});
							$("#txtSpecies").html( opt );
		   	  }
		});
        
                
          

    function filterColumn ( i ) {
	$('#Coll_Specimenlist').DataTable().column( i ).search( 
		$('#col'+i+'_filter').val()
		
	).draw();
    }
        
       
	$('input.column_filter').on( 'keyup ', function () {
		filterColumn( $(this).parents('div').attr('data-column') );
	} );
	
        
        $timeout(function() {
                yukon_extended_elements.init()
                
				$("#content-1").mCustomScrollbar({
					theme:"minimal"
				});
                
                
                
            })
       
       
       
       
       
       
       
       
       
    }
])
*/