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
                                    <h2>QSBG Entomology visits a local butterfly farm</h2>
                                </a></div>
                            <div class="subtitle">
                                 <a href="#">NA</a> / <a href="#">NA</a> / <a href="#">NA</a>
                            </div>
                        </div>
                        <div class="post-text">
                            <p>As part of our project to establish a butterfly house at QSBG we recently visited a local butterfly farm that mass produces pupae for export to butterfly houses internationally.</p>
                            <p>During the visit we were able to examine the complete production process, including management of host plants, mating, egg-laying, larval feeding and pupation. The end result being the pupae that in most cases are exported via air freight to international butterfly houses, though some complete their life cycle here in Thailand as the breeding stock for the next generation. </p>
                            <p>The farm raises only local species and does so very effectively making our visit to the farm very interesting and educational. </p>
                            <p>Thanks to Khun Jakrapop, the farm manager, who was kind enough to allow us to tour his farm. </p>
                            <p>
                                <img src="images/IMG_9777.JPG" alt="Image" width="70%">
                                <blockquote>
                                    <small><b>Papilio memnon female
                                            laying eggs on a host plant</b></small>
                                </blockquote>
                            </p>
                            <p>
                                <img src="images/IMG_9995.JPG" alt="Image" width="70%">
                                <blockquote>
                                    <small><b>QSBG Entomology team with Jakrapop (far right)</b></small>
                                </blockquote>
                            </p>
                            <p>
                                <img src="images/IMG_9910.JPG" alt="Image" width="70%">
                                <blockquote>
                                    <small><b>Collected pupae sorted ready for packing and export (Papilio demoleus)</b></small>
                                </blockquote>
                            </p>
                            <p>
                                <img src="images/IMG_9909.JPG" alt="Image" width="70%">
                                <blockquote>
                                    <small><b>Danaus chrysippus</b></small>
                                </blockquote>
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