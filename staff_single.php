<?php
require_once('./assets/include/function.php');
?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="Jukebox - Responsive Music and Band Website Template">
    <link rel="icon" href="assets/images/favicon.png">
    <title>
    QE - Queen Sirikit Botanic Garden Entomology Section
    </title>
    <?php
    header_html();
    ?>
    <script type="text/javascript">
    function getUrlParameter(sParam) {
      var sPageURL = decodeURIComponent(window.location.search.substring(1))
      var sURLVariables = sPageURL.split('&')
      var sParameterName
      var i

      for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');
          if (sParameterName[0] === sParam) {
          return sParameterName[1] === undefined ? true : sParameterName[1];
          }
      }

    };
    var id = getUrlParameter('id');

    $.getJSON('assets/data/qestaff.js',function(result){    
    $("#QEname").append( result[id].name +'<br />');
    $("#QEposition").append( result[id].position +'<br />');
    $("#QEProfile").append( result[id].section +'<br />');
    $("#QEProfile").append( result[id].organization +'<br />');
    $("#QEProfile").append( result[id].address +'<br />');
    $("#QEProfile").append( result[id].email +'<br />');
    $("#QEProfile").append( result[id].phone +'<br />');
    $("#QEimg").append("<img id='testimg' src=" + result[id].personalimg + '>');
    $.each(result[id].education, function(key,val) {
    $("#QEEducation").append(val.desc+'<br />');
    });
    $.each(result[id].Researchint, function(key,val) {
    $("#Researchint").append(val.resdesc+'<br />');
    });
    $.each(result[id].publication, function(key,val) {
    $("#publication").append(val.pubdesc+'<br />');
    });
    $.each(result[id].currentactivities, function(key,val) {
    $("#currentactivities").append(val.curdesc+'<br />');
    });
    $.each(result[id].principalduties, function(key,val) {
    $("#principalduties").append(val.principaldesc+'<br />');
    });
    });
    
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
    <!--/.navbar -->
    <!-- Navbar End -->
    <!-- Banner Title Begin -->
    <section class="banner-title staff-banner">
      <div class="overlay"></div>
      <div class="container content">
        <div class="col-md-12 col-sm-12 col-xs-12">
          <div class="main-title">
            <h1>
            Staff
            <span class="light">Profile</span>
            </h1>
            <div class="text-wrap">
              <div class="text">More information about QE staff</div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!--/.banner -->
    <!-- Banner Title End -->
    <!-- About Wrap Start -->
    <!-- About Begin -->
    <section class="about">
      <div class="container">
        <div class="col-md-8 col-sm-8">
          <div class="content-panel">
            <!-- BEGIN .panel-title -->
            <div class="panel-title">
              <h2>QE STAFF PROFILE</h2>
            </div>
            <div class="col-md-8 col-sm-8">
              <div class="postslider clearfix flexslider">
                <div id="QEimg"></div>
              </div>
            </div>
            <div class="col-md-4 col-sm-4">
              <h4><span id="QEname"></span></h4>
              <h3><span id="QEposition"></span></h3>
              <p><span id="QEProfile"></span></p>
              <p></p>
            </div>
            <div class="col-md-12">
              <ul class="tabs-remix">
                <!--Begin tabs-remix -->
                <li><a href="#t-1" class="active">Education</a></li>
                <li><a href="#t-2">Activities</a></li>
                <li><a href="#t-3">duties</a></li>
              </ul>
              <!--End tabs-remix -->
              
              <ul class="tabs-remix-content">
                <!-- Begin tabs-remix -->
                <li id="t-1" class="active">
                  <p><span id="QEEducation"></span></p>
                  <p>
                    Research interests:&nbsp;<span id="Researchint"></span>
                  </p>
                  <p>
                    Publications:&nbsp;<span id="publication"></span>
                  </p>
                </li>
                <!-- tab content -->
                <li id="t-2">
                  <p><span id="currentactivities"></span></p>
                </li>
                <!-- tab content -->
                <li id="t-3">
                  <p><span id="principalduties"></span></p>
                </li>
                <!--END tab content -->
              </ul>
              <!-- END tabs-remix -->
            </div>
            <!--END clearfix -->
            
          </div>
        </div>
        
        <div class="col-md-4 col-sm-4">
          <!-- BEGIN #sidebar -->
          <aside id="sidebar" class="right-v">
            <!-- BEGIN .widget -->
            <div class="widget">
              <div class="banner-widget no-border">
                <a href="#" target="_blank"><img src="assets/images/insect-of-the-month-300x250.jpg" width="300" height="250" alt="" /></a>
                <a href="contact-us.html" class="banner-meta"><i class="fa fa-angle-double-up"></i> Special Insects Of The Month <i class="fa fa-angle-double-up"></i></a>
              </div>
            </div>
            <!-- END .widget -->
            <!-- BEGIN .widget -->
            <div class="widget">
              <h3>Featured Videos</h3>
              <div class="widget-videos">
                <!-- BEGIN .item -->
                <div class="item">
                  <div class="item-header">
                    <a href="post.html" class="video-thumb loadingvideo"><img src="assets/images/aspect-px.png" width="16" height="9" class="aspect-px" rel="assets/images/Ampulex_compressa.jpg" alt="" /></a>
                  </div>
                  <div class="item-content">
                    <h3><a href="post.html">Ampulex compressa Vs Blatta orientalis (TH)</a><a href="#"><span class="marker">HD Videos</span></a></h3>
                    <span class="video-meta">
                      <span class="bold">
                        <span class="shape"><i class="fa fa-calendar"></i></span>Release Date:
                      </span>
                      <span> 07 / October / 2015</span>
                    </span>
                  </div>
                </div>
                <!-- END .item -->
              </div>
              <!-- END .widget videos -->
            </div>
            <!-- END .widget -->
            
            <!-- Begin .widget -->
            <div class="widget">
              <h3>Database Statistics</h3>
              <!-- Begin .video-stats -->
              <div class="video-stats">
                <h5>Specimen Database</h5>
                <!-- BEGIN .video-stat-blobs -->
                <div class="video-stat-blobs">
                  <span>
                    <strong>25k</strong>
                    <i>Records</i>
                  </span>
                  <a href="post.html" class="video-thumb loadingvideo"><img src="assets/images/aspect-px.png" width="16" height="9" class="aspect-px" rel="assets/images/dbpreview/specimendb2.jpg" alt="" /></a>
                </div>
                <!-- End .video-stat-blobs -->
                <!-- BEGIN .widget -->
                <div class="widget01">
                  <ul class="fa-ul">
                    <li><i class="fa-li fa fa-star"></i>Specimens:<span>25997 </span></li>
                    <li><i class="fa-li fa fa-star"></i>Species:<span>390 </span></li>
                    <li><i class="fa-li fa fa-star"></i>Genera:<span>226 </span></li>
                    <li><i class="fa-li fa fa-star"></i>Families:<span>178 </span></li>
                    <li><i class="fa-li fa fa-star"></i>Orders:<span>25 </span></li>
                  </ul>
                  
                </div>
                <!-- End .widget -->
                <div class="hr-spacer"></div>
              </div>
              <!-- End .video-stats -->
              <!-- BEGIN .video-stats -->
              <div class="video-stats">
                <h5>Butterfly In QSBG Database</h5>
                <!-- BEGIN .video-stat-blobs -->
                <div class="video-stat-blobs">
                  <span>
                    <strong>93</strong>
                    <i>Records</i>
                  </span>
                  <a href="post.html" class="video-thumb loadingvideo"><img src="assets/images/aspect-px.png" width="16" height="9" class="aspect-px" rel="assets/images/dbpreview/butterflydb.jpg" alt="" /></a>
                </div>
                <!-- End .video-stat-blobs -->
                <!-- BEGIN .widget -->
                <div class="widget01">
                  <ul class="fa-ul">
                    <li><i class="fa-li fa fa-star"></i>Species:<span>93 </span></li>
                    <li><i class="fa-li fa fa-star"></i>Genera:<span>61</span></li>
                    <li><i class="fa-li fa fa-star"></i>Families:<span>6</span></li>
                  </ul>
                </div>
                <!-- End .widget -->
                <div class="hr-spacer"></div>
              </div>
              <!-- End .video-stats -->
              <!-- BEGIN .video-stats -->
              <div class="video-stats">
                <h5>Collection Database</h5>
                <!-- BEGIN .video-stat-blobs -->
                <div class="video-stat-blobs">
                  <span>
                    <strong>2.2k</strong>
                    <i>Collections</i>
                  </span>
                  <a href="post.html" class="video-thumb loadingvideo"><img src="assets/images/aspect-px.png" width="16" height="9" class="aspect-px" rel="assets/images/dbpreview/collectiondb.jpg" alt="" /></a>
                </div>
                <!-- End .video-stat-blobs -->
                <!-- BEGIN .widget -->
                <div class="widget01">
                  <ul class="fa-ul">
                    <li><i class="fa-li fa fa-star"></i>Tumbon:<span>-</span></li>
                    <li><i class="fa-li fa fa-star"></i>Amphur:<span>-</span></li>
                    <li><i class="fa-li fa fa-star"></i>Province:<span>-</span></li>
                  </ul>
                </div>
                <!-- END .widget -->
                <div class="hr-spacer"></div>
              </div>
              <!-- END .video-stats -->
              <!-- BEGIN .video-stats -->
              <div class="video-stats">
                <h5>Species Database</h5>
                <!-- BEGIN .video-stat-blobs -->
                <div class="video-stat-blobs">
                  <span>
                    <strong>-</strong>
                    <i>views</i>
                  </span>
                  <a href="post.html" class="video-thumb loadingvideo"><img src="assets/images/aspect-px.png" width="16" height="9" class="aspect-px" rel="assets/images/dbpreview/speciesdb.jpg" alt="" /></a>
                  
                </div>
                <!-- End .video-stat-blobs -->
                <!-- BEGIN .widget -->
                <div class="widget01">
                  <p>We are now provide you the speciese database of insects that should be give you more information about insects.</p>
                </div>
                <!-- END .widget -->
              </div>
              <!-- END .video-stats -->
            </div>
            <!-- End .widget -->
          </aside>
          <!-- END #sidebar -->
          
          
        </div>
        <!-- END .wrapper -->
        
      </div>
    </div>
  </section>
  
  
  <?php
  include 'assets/include/insectsmenu_source_php_footer.php';
  footer_html();
  ?>
  
</body>
</html>