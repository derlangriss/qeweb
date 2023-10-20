<?php
require_once('./assets/include/function.php');
?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="description" content="QE - Queen Sirikit Botanic Garden Entomology Section">
    <link rel="icon" href="assets/images/favicon.png">
    
    <title>Butterfly - Butterflies list in QSBG</title>

    <?php header_html();?> 
    
    <!-- Jquery Datatable -->    
    <link rel="stylesheet" type="text/css" href="assets/DataTables-1.10.19/media/css/jquery.dataTables.css">
    <!--link rel="stylesheet" type="text/css" href="DataTables-1.10.7/extensions/FixedHeader/css/dataTables.fixedHeader.css"-->
    <link rel="stylesheet" type="text/css" href="assets/DataTables-1.10.19/examples/resources/syntax/shCore.css">
    <link rel="stylesheet" type="text/css" href="assets/DataTables-1.10.19/examples/resources/demo.css">
    <style type="text/css" class="init">

td.details-control {
  background: url('assets/DataTables-1.10.19/examples/resources/details_open.png') no-repeat center center;
  cursor: pointer;
}
td.details  {
  background: url('assets/DataTables-1.10.19/examples/resources/details_close.png') no-repeat center center;
}


  td.highlight {
    font-weight: bold;
    color: blue;
  }

  </style>

    <script type="text/javascript" language="javascript" src="assets/DataTables-1.10.19/media/js/jquery.dataTables.js"></script>
    <!--script type="text/javascript" language="javascript" src="DataTables-1.10.7/extensions/FixedHeader/js/dataTables.fixedHeader.js"></script-->

    <script type="text/javascript" language="javascript" class="init">
      function format ( d ) {
  return 'assets/static/'+d[0]+'/images.html';
      }

$(document).ready(function() {

  var dt = $('#example').DataTable( {
    "processing": true,
    "serverSide": true,
    "ajax": "assets/DataTables-1.10.19/examples/server_side/scripts/server_processing_butterfly.php",
                "sDom":'lfrtip',
    "lengthMenu": [[25, 50, -1], [25, 50, 100]],
     scrollY:        '50vh',
        scrollCollapse: true,
        paging:         true,
    
    "columns": [ 
      {
        
        "class": 'details-control',
        "orderable":      false,
        "data": null,
        "defaultContent": ""
      },
      { "class":"fontitalic" },
      { "class":"fontitalic" },
      {  },
      {  }
    ],
    "createdRow": function ( row, data, index ) {
      if ( data[0]==null ) {
      $('td', row).eq(0).addClass('details'); 
      }
      
    },
    
    
    "order": [[1, 'asc']]
  } );
  
  var detailRows = [];

  $('#example tbody').on( 'click', 'tr td.details-control', function () {
    var tr = $(this).closest('tr');
    var row = dt.row( tr );
    var test = dt.row( tr ).data();
    
    var idx = $.inArray( tr.attr('id'), detailRows );
               
    if ( test[0]==null) {
      
    }
    else {
        window.location.href = 'assets/static/'+test[0]+'/images.html';
    }
  } );
  
  

  
} );

  </script>
  </head>
  <body>
    <!-- Splash Screen Begin -->
    <div id="jSplash" class="preloader">
      <div id="loader">
        <div class="shape-wrap">
          <div class="shape">
            <h2>Loading</h2>
          </div>
        </div>
        <div id="fadingBarsG">
          <div id="fadingBarsG_1" class="fadingBarsG">
          </div>
          <div id="fadingBarsG_2" class="fadingBarsG">
          </div>
          <div id="fadingBarsG_3" class="fadingBarsG">
          </div>
          <div id="fadingBarsG_4" class="fadingBarsG">
          </div>
          <div id="fadingBarsG_5" class="fadingBarsG">
          </div>
          <div id="fadingBarsG_6" class="fadingBarsG">
          </div>
          <div id="fadingBarsG_7" class="fadingBarsG">
          </div>
          <div id="fadingBarsG_8" class="fadingBarsG">
          </div>
        </div>
      </div>
    </div>
    <!-- Splash Screen End -->

    
    <!-- Navbar Begin -->
    <?php include 'assets/include/insectsmenu_source_php.php';?>
    <!-- Navbar End -->


    <!-- Banner Title Begin -->
    <section class="banner-title blog-banner">
      <div class="overlay"></div>
      <div class="container content">
        <div class="col-md-12 col-sm-12 col-xs-12">
          <div class="main-title">
            <h1>             
              Butterflies           
            </h1>
            <div class="text-wrap">
              <div class="text">Butterflies - Butterflies List in QSBG</div>
            </div>
          </div>
        </div>
      </div>
    </section><!--/.banner -->
    <!-- Banner Title End -->
    
    <!-- Blog Wrap Begin -->
     <section class="blog-wrap">
      <div class="container">
        <div class="col-md-11 post-section">
           <div class="post-single post-content">
      
      <table id="example" class="display" cellspacing="0" width="100%">
        <thead>
          <tr >
            <th>Images</th>
            <th class="fontnormal">Genus</th>
            <th class="fontnormal">Species</th>
            <th>Thai name</th>                                                
            <th>Family</th>                                             
          
          </tr>
        </thead>

        <tfoot>
          <tr>
            <th>Images</th>
            
            <th class="fontnormal">Genus</th>
            <th class="fontnormal">Species</th>
            <th>Thai name</th>                                                
            <th>Family</th>         
            
            
          </tr>
        </tfoot>
      </table>
           </div>
        </div>
      </div>
      
      
    </section>
  

  
    <!-- Blog Wrap End -->

    
    <!-- Footer End-->

    <?php
        include 'assets/include/insectsmenu_source_php_footer.php';
        footer_html();
    ?>  
    
   
  </body>
</html>