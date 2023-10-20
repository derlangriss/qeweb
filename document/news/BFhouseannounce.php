<?php
require_once('../../assets/includeinside/function.php'); 
?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="Jukebox - Responsive Music and Band Website Template">
    <link rel="icon" href="../../assets/images/favicon.png">
    
    <title>Butterflies - the "Flying flowers" of the garden</title>

    <?php headerout_html();?> 
    

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
    <!-- Navbar Begin -->
     <?php include '../../assets/includeinside/insectsmenu_source_php.php';?>
   
    <!-- Navbar End -->
    <!--/.navbar -->
    <!-- Navbar End -->
    <!-- Banner Title Begin -->
    <section class="banner-title blog-banner">
        <div class="overlay"></div>
        <div class="container content">
            <div class="col-md-12 col-sm-12 col-xs-12">
                <div class="main-title">
                    <h1>
                        Blog
                        <span class="light">Single Page</span>
                    </h1>
                    <div class="text-wrap">
                        <div class="text">We Are Awesome Rock Band</div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!--/.banner -->
    <!-- Banner Title End -->
    <!-- Blog Wrap Begin -->
    <section class="blog-wrap">
        <div class="container">
            <div class="col-md-8 post-section">
                <div class="post-single post-content">
                    <div class="post-meta">
                        <div class="date">
                            <span><strong class="bold">NA</strong><br />na</span>
                        </div>
                        <div class="like">
                            <a href="#"><i class="fa fa-list"></i>NEWS</a>
                        </div>
                    </div><!-- /.post-meta -->
                    
                    <div class="post-inner">
                        <!--div class="post-media">
                            <a href="#"><img src="assets/images/gallery1.jpg" alt="Blog images"></a>
                        </div-->
                        <div class="post-head">
                            <div class="title"><a href="#">
                                    <h2>From "caterpillar" to "butterfly"</h2>
                                </a></div>
                            <div class="subtitle">
                                 <a href="#">NA</a> / <a href="#">NA</a> / <a href="#">NA</a>
                            </div>
                        </div>
                        <div class="post-text">
                            <p>QSBG has made the decision to let one of our greenhouses be converted to a butterfly house, perhaps as a caterpillar transforms to a butterfly. The goal of the house is to allow visitors to QSBG to have close encounters with the beauty and wonder of butterflies and to learn about butterflies, their caterpillars, pupae and eggs, as well as some other insects. It will be sometime before the butterfly house opens to the public so don't come searching for it yet. If you are interested to follow the progress of the development of the butterfly house take a look at our <a href="butterflytales.php">"butterfly tales"</a> page.</p>
                            <p>
                                <img src="images/IMG_3431s.JPG" alt="Image" width="70%">
                            </p>
                            <p>
                                <img src="images/Male_Golden_Birdwing_butterfly.JPG" alt="Image" width="70%">
                            </p>
                        </div>
                    
                        
                        
                        
                    </div><!-- /.post-inner -->
                </div><!-- /.post-content -->
            </div><!-- /.post-section -->
            <?php
                include './sidebar/news_sidebar.php';
                footerout_html();
            ?> 
       
        </div><!-- /.container -->
    </section><!-- /.blog-wrap -->
    <!-- Blog Wrap End -->
    <?php
        include '../../assets/includeinside/insectsmenu_source_php_footer.php';
        footerout_html();
    ?> 

</body>

</html>