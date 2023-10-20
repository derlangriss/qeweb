f'use strict';
/**    
  * controller for ngImgCrop
  * Simple Image Crop directive for AngularJS.
*/
app.controller('datatablesCtrl', ["$http","$scope","$location","$state", function ($http,$scope,$location,$state) {

     $http.get("assets/views/action/session.php")
    .success(function (response) {$scope.session = response.data;
    
        $scope.access_token = response.data[0].access_token;
        if($scope.access_token == ""){
                $state.go("login.signin");
        }
    
    });
   
  
    var selected = [];
    var table = $('#example01').DataTable( {
        "processing": true,       
        "serverSide": true,
        "ajax": {
            "url":"assets/scripts/server_processing_simpletest.php",
            "type":"POST" 
        },
        "scrollX": true,
        
        "columns": [
        { "data": "0","width": "5px" },
        { "data": "1","width": "10%" },
        { "data": "2","width": "15%" },
        { "data": "3","width": "15%" },
        { "data": "4","width": "8%" },
        { "data": "5","width": "8%" },
        { "data": "6","width": "18%" },
        { "data": "7","width": "18%" }],
        "columnDefs": [
        {
            render: function (data, type, full, meta) {
                        return '<a href="'+"#/app/form/gridform_collection/"+full[0]+'"'+'class="btn btn-transparent btn-xs"'+'>'+'<i class="'+'fa fa-pencil'+'"></i>'+'</a>'+
                        '<a '+'class="btn02 btn-transparent btn-xs"'+'>'+'<i class="'+'fa fa-times fa fa-white'+'"></i>'+'</a>';
                    },
                    targets: 0

        },
         {
            render: function (data, type, full, meta) {
                        return "<div class='text-wrap'>" + data + "</div>";
                    },
                    targets: 3

        },
        {
            render: function (data, type, full, meta) {
                        return "<div class='text-wrap'>" + data + "</div>";
                    },
                    targets: 6

        },
         {
            render: function (data, type, full, meta) {
                        return "<div class='text-wrap'>" + data + "</div>";
                    },
                    targets: 7

        }

        
        ]


    } );

    $('#example01 td').css('white-space','initial');


     $('.material-datatables label').addClass('form-group');

    $('#example01 tbody').on( 'click', 'tr', function () {
        var id = this.id;
        var index = $.inArray(id, selected);

        if ( index === -1 ) {
            selected.push( id );
        } else {
            selected.splice( index, 1 );
        }
        $(this).toggleClass('selected');
    } );

    $( "#example01 tbody" ).on( "click", "a.btn02", function(event) {
       var data = table.row( $(this).parents('tr') ).data();
       var collectionid = data[0];

       $.ajax({
                    type: "POST",
                    url: "assets/views/action/DeleteDataFromTable.php",
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
                    url: "assets/views/action/DeleteDataFromButton.php",
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
            $location.path('/app/form/gridform_collection/'+$scope.testestest)
           } else{
            $location.path('/app/form/gridform_collection/')
           }
    });



}]);