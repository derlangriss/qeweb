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
                                    <h2>Malaysian Putra University visitors tour QSBG Entomology</h2>
                                </a></div>
                            <div class="subtitle">
                                 <a href="#">NA</a> / <a href="#">NA</a> / <a href="#">NA</a>
                            </div>
                        </div>
                        <div class="post-text">
                            <p>QSBG is currently hosting three long-term work experience students from the Putra University, Malaysia (UPM). These students, the first of which we hope will be many, unfortunately have no involvement with QSBG Entomology.</p>
                            <p>Recently Japar Sidik Bin Bujang and Muta Harahm, the internship programme managers from UPM, visited QSBG to check on the student's activities and progress. During their tour of QSBG Japar and Muta visited us at QSBG Entomology. During their visit we toured the insect museum, explained our collection and sampling programmes, discussed our plans for a butterfly house for QSBG, as well as assorted other QSBG Entomology activities.</p>
                            <p>Japar and Muta were quite interested in QSBG Entomology's activities and we look forward to UPM work experience students being keen to be involved with QSBG Entomology activities in the future.</p>
                            <p>
                                <img src="images/upmvisit2013-3.png" alt="Image" width="70%">
                                <blockquote>
                                    <small><b>Dissecting a rotting log in search of specimens</b></small>
                                </blockquote>
                            </p>
                            <p>
                                <img src="images/upmvisit2013-4.png" alt="Image" width="70%">
                                <blockquote>
                                    <small><b>Searching for blackfly larvae and pupae</b></small>
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