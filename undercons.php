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
        QE - Underconstruction
    </title>
    <?php header_html();?> 
    <link href="assets/stylesheets/csscons/style.css" rel="stylesheet">

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





    <!-- Banner Title Begin -->
    <section class="banner-title cons-banner">
      <div class="overlay"></div>
      <div class="container content">
        <div class="col-md-12 col-sm-12 col-xs-12">
          <div class="main-title">
            <h1>
              UNDER
              <span class="light">construction</span>
            </h1>
            <div class="text-wrap">
              <div class="text">we will available soon!</div>
            </div>
          </div>
        </div>
      </div>
    </section><!--/.banner -->



    <section class="about">
        <div class="container">
            <div class="col-md-12 col-sm-12">
                <div class="content-panel">
                    <header>
                        <h1>COUNT DOWN TO AVAILABLE</h1>
                    </header>                       
                    <div id="counter"></div>                 
                </div>                
            </div>
        </div>
    </section>



    
    
    <?php
        include 'assets/include/insectsmenu_source_php_footer.php';
        footer_html();
    ?>  
  
  </body>
</html>