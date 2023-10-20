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
                                    <h2>The "alien hunt" starts</h2>
                                </a></div>
                            <div class="subtitle">
                                 <a href="#">NA</a> / <a href="#">NA</a> / <a href="#">NA</a>
                            </div>
                        </div>
                        <div class="post-text">
                            <p>The "alien hunting" team (see <a href="/documents/news/betz2013.php">An "alien hunter is coming to QSBG"</a>) made its first visit in search of "aliens" during December. Seven of us (Oliver [Eberhard Karls University Tübingen], Heike [Eberhard Karls University Tübingen], Watana [Department of National Parks and Wildlife Conservation], Wichai, Tanyalak, Raewat and Sumitr - you can see some of the team in the picture at the right) visited Doi Inthanon National Park in search of Steninae rove beetles during Dec 9-20, 2013.</p>
                            <p>We collected specimens from a range of habitats and altitudes while we tried to stay warm and dry. It has recently been very cold in Thailand, especially on Thailand's highest mountain. There was no snow but some did wonder if Thailand might have white Christmas! No snow was seen, but there was some frost!!!</p>
                            <p>
                                We will spend sometime in the lab sorting the collected material (and defrosting ourselves) then back to Doi Inthanon and hoping for a warmer time.
                            </p>
                            <p>
                                <img src="images/69.jpg" alt="Dianous ningxiaensis">
                                <blockquote>
                                    Some of the team (Tanyalak, Raewat, Heike, and Oliver)
                            </p> heading up the mountain (Credit: Wichai)
                            <!--small>John Doe, CEO</small-->
                            </blockquote>
                            </p>
                            <p>
                                <img src="images/DSC_0118.JPG" alt="Dianous ningxiaensis">
                                <blockquote>
                                    Sifting though soil and leaf-litter by a small stream (Credit: Wichai)
                                    <!--small>John Doe, CEO</small-->
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