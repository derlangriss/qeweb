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
    
    <title>Entomological Collections</title>

    <?php header_html();?> 
    <!-- User tooltips Style -->  
    <script src="assets/javascripts/demo.js"></script>
    <link rel="stylesheet" type="text/css" href="assets/stylesheets/css/demo.css">
    <link rel="stylesheet" type="text/css" href="assets/stylesheets/css/product.css">
    <link rel="stylesheet" href="assets/prettyPhoto/css/prettyPhoto.css" type="text/css" media="screen" title="prettyPhoto main stylesheet" charset="utf-8" />
    <script src="assets/prettyPhoto/js/jquery.prettyPhoto.js" type="text/javascript" charset="utf-8"></script>  

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
              Entomological Collections           
            </h1>
            <div class="text-wrap">
              <div class="text">Entomological Collections  - Their Historic Importance and Relevance in the 21st Century</div>
            </div>
          </div>
        </div>
      </div>
    </section><!--/.banner -->
    <!-- Banner Title End -->
    
    <!-- Blog Wrap Begin -->
    <section class="blog-wrap decrease">
      <div class="container">
        <div class="col-md-11 post-section">

          <div class="post-single post-content">
            <div class="post-inner">
              
              <div class="post-text">
                <h1>Entomological Collections - Their Historic Importance and Relevance in the 21st Century</h1>
                <h1>Mark Colvin</h1>
                <p>Abstract: This article provides information on the relevance of entomological collections and collecting. It also reviews recent literature and provides the reader with a perspective on the reasoning behind the responsible collecting of specimens and the formation of a collection, and provides examples of the use of such specimens.</p><br>
                <img src="assets/images/articles/markcolvin/mark_colvin.png" alt="images" width="" class="pull-left img-align-left">
                <div class="clear"></div>
                <br>
                <blockquote>
                Sir David Attenborough with Wallace's Giant Bee Megachile pluto
                <br>
                Photo © OUMNH
                </blockquote>
               

                
                         
              </div>
              
                
              
              <div class="post-text">
            

<p>The aim of this article is to provide what I hope is a balanced and thought-provoking personal view on both the historic importance, and
contemporary relevance, of entomological collections and collecting. It is not, by any means, intended to present a position endorsed by
any individual or organization, or to encourage collecting without appropriate research based justification or consideration of the
Invertebrate Link (Joint Committee for the Conservation of British Invertebrates) code (see sidebar). Rather, its fundamental objective is to
enlighten readers in a subject that is frequently controversial, due to a lack of understanding of the reasons for collecting and killing
specimens, which consequently generates diverse and conflicting opinions.</p>

 <div class="clear"></div>


              <blockquote>
              <small>Credit:</small>
              <a href="https://www.dispar.org/pdf/92.pdf">https://www.dispar.org/pdf/92.pdf</a>
              </blockquote>
                
                

                
              </div>
            </div><!-- /.post-inner -->
          </div><!-- /.post-content -->

        </div><!-- /.post-section -->
        
      </div><!-- /.container -->
    </section><!-- /.blog-wrap -->
    <!-- Blog Wrap End -->

    
    <!-- Footer End-->

    <?php
        include 'assets/include/insectsmenu_source_php_footer.php';
        footer_html();
    ?> 
    <style type="text/css" media="screen">
        .bsap a { float: left; }
      </style>
<script type="text/javascript">
      (function(){
        var bsa = document.createElement('script');
           bsa.type = 'text/javascript';
           bsa.async = true;
           bsa.src = '//s3.buysellads.com/ac/bsa.js';
        (document.getElementsByTagName('head')[0]||document.getElementsByTagName('body')[0]).appendChild(bsa);
      })();
      </script>
   
               <script type="text/javascript" charset="utf-8">
      $(document).ready(function(){
        $("area[rel^='prettyPhoto']").prettyPhoto();
        
        $(".gallery:first a[rel^='prettyPhoto']").prettyPhoto({animation_speed:'normal',theme:'light_square',slideshow:3000, autoplay_slideshow: true});
        $(".gallery:gt(0) a[rel^='prettyPhoto']").prettyPhoto({animation_speed:'fast',slideshow:10000, hideflash: true});
    
        $("#custom_content a[rel^='prettyPhoto']:first").prettyPhoto({
          custom_markup: '<div id="map_canvas" style="width:260px; height:265px"></div>',
          changepicturecallback: function(){ initialize(); }
        });

        $("#custom_content a[rel^='prettyPhoto']:last").prettyPhoto({
          custom_markup: '<div id="bsap_1259344" class="bsarocks bsap_d49a0984d0f377271ccbf01a33f2b6d6"></div><div id="bsap_1237859" class="bsarocks bsap_d49a0984d0f377271ccbf01a33f2b6d6" style="height:260px"></div><div id="bsap_1251710" class="bsarocks bsap_d49a0984d0f377271ccbf01a33f2b6d6"></div>',
          changepicturecallback: function(){ _bsap.exec(); }
        });
      });
      
               </script>  

    
      
      <script type="text/javascript" charset="utf-8">
        api_gallery=['./assets/prettyPhoto/images/fullscreen/1.jpg','./assets/prettyPhoto/images/fullscreen/2.jpg','./assets/prettyPhoto/images/fullscreen/3.jpg'];
        api_titles=['API Call Image 1','API Call Image 2','API Call Image 3'];
        api_descriptions=['Description 1','Description 2','Description 3'];
      </script>
    
   
  </body>
</html>
