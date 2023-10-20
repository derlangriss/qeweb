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
    <title>QE - Queen Sirikit Botanic Garden Entomology Section</title>
    <?php header_html();?> 
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
    <?php include 'assets/include/insectsmenu_source_php.php';?>
    <!-- Navbar End -->
    <div class="map" id="map-canvas"></div>
    <section class="about">
        <div class="container">
            <div class="content">
                <div class="content-panel">
                        <!-- BEGIN .panel-title -->
                        <div class="panel-title">
                            <h3>Infromation</h3>
                        </div>
                </div>
                <div class="col-md-6 left">
                    
                    <p>QSBG's main focus of attention is research, conservation and education efforts related to the Thai flora. However, for a number of years QSBG has been developing resources and expertise in entomology.</p>
                    <p>QSBG's past interest in entomology has been mainly related to hosting post-graduate students from Chiang Mai university who have worked in the QSBG surrounds and made use of the QSBG laboratory facilities. Another entomological project that QSBG has had a long-term interest in is the project "Conservation of fireflies in Thailand" a Royal Project initiated by HM Queen Sirikit, a project aimed at understanding the ecology and conservation biology of firelies in Thailand.</p>
                    <p>In more recent times QSBG has become more active in entomological research in Thailand collaborating in two important international projects aimed at developing taxonomic and biodiversity inventory skills in Thailand.</p>
                    <p></p>
                </div>
                <!--/.left -->
                <div class="col-md-6 right">
                    <img src="assets/images/contactus.png" width="10" height="9" class="aspect-px" rel="assets/images/contactus.png" alt="" />
                    <!--div class="content-panel">
                        <div class="panel-title">
                            <h3>send us a message</h3>
                        </div>
                    </div>
                    <form action="#">
                        <div class="row">
                            <div class="col-md-4">
                                <label for="author">Name<span class="required">*</span></label>
                                <input id="author" class="form-control" name="author" type="text" required>
                            </div>
                            <div class="col-md-4">
                                <label for="email">Email<span class="required">*</span></label>
                                <input id="email" class="form-control" name="author" type="text" required>
                            </div>
                            <div class="col-md-4">
                                <label for="url">Website<span class="required">*</span></label>
                                <input id="url" class="form-control" name="url" type="text" required>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <label for="comment">Your Message</label>
                                <textarea id="comment" class="form-control" name="comment" required></textarea>
                                <input name="submit" type="submit" id="submit" class="def-button" value="Submit Message">
                            </div>
                        </div>
                    </form-->
                </div>
                <!--/.right -->
            </div>
            <!-- /.content -->
        </div>
        <!-- /.wrapper -->
    </section>
    <!-- About Wrap End-->
    <!-- Footer Begin-->
    <?php
        include 'assets/include/insectsmenu_source_php_footer.php';
        footer_html();
    ?>  
<script src="assets/javascripts/googlemap.api.js"></script>
<script src="assets/javascripts/custom-map.js"></script>
</body>

</html>