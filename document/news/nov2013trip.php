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
                                    <h2>Nam Nao collection November 2013</h2>
                                </a></div>
                            <div class="subtitle">
                                 <a href="#">NA</a> / <a href="#">NA</a> / <a href="#">NA</a>
                            </div>
                        </div>
                        <div class="post-text">
                            <p>During November 4-8 QSBG Entomology was again out in the field for its monthly collection as part of the project “Insect biodiversty of northern Thailand”. Nam Nao in Petchabun was November's collecting location. During the day our activities were concentrated along a creek and near a waterfall. Wichai concentrated on searching through shallow water for simulids (blackflies) and culicids (mosquitoes) (pictured below), Sunantha used a sweep net to collect from creek-side vegetation, Raewat sifted through leaflitter and decaying logs (pictured at upper right), while Sumitr helped with general collecting as well as being a good cook for the team. At night we operated a light trap collecting mostly moths and beetles (pictured at lower right). During the 4 day collecting period we collected nearly a thousand specimens, from 11 sites, consisting mainly of Lepidoptera (butterflies and moths), Coleoptera (beetles) and Diptera (flies). </p>
                            <div id="img_container">
                                <img src="images/DSC_0143.JPG" alt="Image" width="70%">
                            </div>
                            <blockquote>
                                <small><b>Dissecting a rotting log in search of specimens</b></small>
                            </blockquote>
                            <div id="img_container">
                                <img src="images/Simulidlarvae.JPG" alt="Image" width="70%">
                            </div>
                            <blockquote>
                                <small><b>Searching for blackfly larvae and pupae</b></small>
                            </blockquote>
                            <div id="img_container">
                                <img src="images/Lighttrap.JPG" alt="Image" width="70%">
                            </div>
                            <blockquote>
                                <small><b>Collecting from a light trap</b></small>
                            </blockquote>
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