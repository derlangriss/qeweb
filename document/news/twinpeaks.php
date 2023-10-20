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
                                    <h2>Twin Peaks...or perhaps not?</h2>
                                </a></div>
                            <div class="subtitle">
                                <a href="#">NA</a> / <a href="#">NA</a> / <a href="#">NA</a>
                            </div>
                        </div>
                        <div class="post-text">
                            <p>Doi Inthanon (red marker on the map at right), to the south-west of QSBG (green marker on map), is the highest mountain in Thailand reaching 2340m. Doi Pha Hom Pok (purple marker on map), to the north of QSBG, is the third highest at 2285m. These peaks are only about 150km apart and have a similar hill evergreen forest covering them (see picture below). </p>
                            <p>Despite the small distance between them, and the similar vegetation types, samples collected during the TIGER project have shown that at least two groups of flies (Empididae – Hemerodromiinae and Hybotidae) have quite distinct species distribution patterns on each of these similar and nearby peaks. </p>
                            <p>Adrian Plant (National Museum Wales), who has collaborated previously with QSBG Entomology during the TIGER project, is interested to examine the similarities and differences between these two peaks and will be visiting QSBG Entomology this coming December. </p>
                            <p>In collaboration with QSBG Entomology, Adrian will be selecting sites and setting up malaise traps at various elevations on Doi Inthanon and Doi Pha Hom Pok. QSBG Entomology will then maintain these traps for a further year, collecting and processing the catch.</p>
                            <p>
                                <img src="images/h_ngachang.jpg" alt="H ngachang">
                                <blockquote>
                                    Hybos ngachang, a recently described species of Hybotidae,
                                    an interesting species recently found on Doi Pha Hom Pok
                                    <!--small>John Doe, CEO</small-->
                                </blockquote>
                            </p>
                            <p>
                                <img src="images/DIforest.jpg" alt="forest">
                                <blockquote>
                                    Typical forest habitat of Doi Inthanon and Doi Pha Hom Pok where
                                    malaise traps will be set and monitored
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