'use strict';
/**    
  * controller for ngImgCrop
  * Simple Image Crop directive for AngularJS.
*/
app.controller('specimensTblCtrl', ["$http","$scope","$location", function ($http,$scope,$location,$state) {


/*
     $http.get("assets/views/action/session.php")
    .success(function (response) {$scope.session = response.data;
    
        $scope.access_token = response.data[0].access_token;
        if($scope.access_token == ""){
                $state.go("login.signin");
        }
    
    });
 */ 
  
      var dataarr = [];
    var table = $('#specimensTbl').DataTable( {
         "processing": true,
        "serverSide": true,
        "ajax": {
            "url": "assets/scripts/server_processing_specimensTbl.php",
            "type": "POST"
        },
        "rowCallback": function(row, data) {
            if ($.inArray(data.DT_RowId, dataarr) !== -1) {
                $(row).addClass('selected');
            }
        },
        "createdRow": function(row, data, index) {
            if (data[4] == 'Unknown') {
                $(row).addClass('highlight');
            }
        },
        "dom": '<"top"li><"clear">rtp',
        "scrollX": true,
        "scrollY": "500px",
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
        },{
            "data": "10",
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
        },
        {
            "visible": false,
            targets: 10
        },  {

            render: function(data, type, full, meta) {
             

              
                if (full[9] == true){
                    return '<a href="' + "#/app/form/collection_data/" + full[9] + '"' + 'class="btn btn-transparent btn-xs"' + '>' + '<i class="' + 'fa fa-pencil' + '"></i>' + '</a>' + '<a ' + 'class="bookmark btn-transparent btn-xs"' + '>' + '<i class="' + 'fa fa-bookmark' + '"></i>' + '</a>';
                }else{
                    return '<a href="' + "#/app/form/collection_data/" + full[9] + '"' + 'class="btn btn-transparent btn-xs"' + '>' + '<i class="' + 'fa fa-pencil' + '"></i>' + '</a>' + '<a ' + 'class="bookmark btn-transparent btn-xs"' + '>' + '<i class="' + 'fa fa-bookmark-o' + '"></i>' + '</a>';
                }

                

            },
            targets: 11,
            "width": "6%",
            "orderable": false
        }],
        order: [
            [1, 'asc']
        ]


    } );

    $('#collectionTbl td').css('white-space','initial');


     $('.material-datatables label').addClass('form-group');

    $('#collectionTbl tbody').on( 'click', 'tr', function () {
        var id = this.id;
        var index = $.inArray(id, selected);

        if ( index === -1 ) {
            selected.push( id );
        } else {
            selected.splice( index, 1 );
        }
        $(this).toggleClass('selected');
    } );

    $( "#collectionTbl tbody" ).on( "click", "a.delete", function(event) {
       var data = table.row( $(this).parents('tr') ).data();
       var collectionid = data[0];

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
        var collectionid = fngetdataid(table);        
        $.ajax({
                    type: "POST",
                    url: "assets/views/action/trashCollTable.php",
                    data:{"id":collectionid},
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

    $('#edit').click( function () {
        $scope.testestest ={};
        var testedit =    table.row('.selected').data();
        var testedit2 =    table.row('.selected').nodes();

        if (testedit2.length!=0) {
            $scope.testestest =testedit[0];
            $location.path('/app/form/collection_data/'+$scope.testestest)
           } else{
            $location.path('/app/form/collection_data/')
           }
    });



}]);