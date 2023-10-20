<?php
require_once('./assets/include/function.php');
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta content="IE=edge" http-equiv="X-UA-Compatible">
    <meta content="width=device-width, initial-scale=1" name="viewport">
    <meta content="QE - Queen Sirikit Botanic Garden Entomology Section" name="description">
    <link href="assets/images/favicon.png" rel="icon">
    <title>
        QE - Queen Sirikit Botanic Garden Entomology Section
    </title>
    <?php header_html();?> 
</head>

<body>
    <!-- Splash Screen Begin -->
    <div class="preloader" id="jSplash">
        <div id="loader">
            <div class="shape-wrap">
                <div class="shape">
                    <h2>
                        Loading
                    </h2>
                </div>
            </div>
            <div id="fadingBarsG">
                <div class="fadingBarsG" id="fadingBarsG_1">
                </div>
                <div class="fadingBarsG" id="fadingBarsG_2">
                </div>
                <div class="fadingBarsG" id="fadingBarsG_3">
                </div>
                <div class="fadingBarsG" id="fadingBarsG_4">
                </div>
                <div class="fadingBarsG" id="fadingBarsG_5">
                </div>
                <div class="fadingBarsG" id="fadingBarsG_6">
                </div>
                <div class="fadingBarsG" id="fadingBarsG_7">
                </div>
                <div class="fadingBarsG" id="fadingBarsG_8">
                </div>
            </div>
        </div>
    </div>
    <!-- Splash Screen End -->
    <!-- BEGIN .boxed -->
    <!-- Navbar Begin -->
    <?php include 'assets/include/insectsmenu_source_php.php';?>
    <!-- Navbar End -->
    <!-- Banner Title Begin -->
    <section class="banner-title db-banner">
        <div class="overlay">
        </div>
        <div class="container content">
            <div class="col-md-12 col-sm-12 col-xs-12">
                <div class="main-title">
                    <h1>
                        Database
                        <span class="light">
                            information 
                        </span>
                    </h1>
                    <div class="text-wrap">
                        <div class="text">
                            QSBG database management system
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!--/.banner -->
    <!-- Banner Title End -->
    <!-- About Wrap Start -->
    <section class="about-wrap">
        <div class="container">
            <div class="main-title">
                <h2>All about database</h2>
            </div>
            <div class="text">
                <p>We are provide the database information from QSBG project since 2006</p>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <div class="kode-blog-list kode-large-blog margin-top-30">
                        <ul class="row">
                            <li class="col-md-4">
                                <div class="kode-time-zoon">
                                    <time datetime="2008-02-14 20:00">01 <span><i class="fa fa-book"></i></span></time>
                                    <h5><a href="assets/databasewapp/index.html#/app/table/collectionTbl">Collection Database</a></h5>
                                </div>
                                <figure><a href="assets/databasewapp/index.html#/app/table/collectionTbl"><img src="assets/images/dbisn02.png" alt=""></a></figure>
                                <div class="kode-blog-info">
                                    <p>collection data is the details of the specimens collection from serveral Northern of insect project and TIGER Project </p>
                                    <a href="assets/databasewapp/index.html#/app/table/collectionTbl" class="kode-blog-btn">Read More</a>
                                    <div class="clearfix"></div>
                                </div>
                            </li>
                            <li class="col-md-8">
                                <div class="kode-detail-element">
                                    <h2>Details of collection</h2>
                                </div>
                                <p>Butterfly in QSBG database is produced from the output of Butterfly in QSBG Project </p>
                                <table class="kode-table" width="100%">
                                    <thead>
                                        <tr>
                                            <th>Details</th>
                                            <th>Records</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Collections</td>
                                            <td><span class="result countcollection"></span></td>
                                        </tr>
                                        <tr>
                                            <td>Province</td>
                                            <td>-</td>
                                        </tr>
                                        <tr>
                                            <td>Amphur</td>
                                            <td>-</td>
                                        </tr>
                                        <tr>
                                            <td>Tambon</td>
                                            <td>-</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="col-md-12">
                    <div class="kode-blog-list kode-large-blog margin-top-30">
                        <ul class="row">
                            <li class="col-md-4">
                                <div class="kode-time-zoon">
                                    <time datetime="2008-02-14 20:00">02 <span><i class="fa fa-book"></i></span></time>
                                    <h5><a href="assets/databasewapp/index.html#/app/table/specimensTbl">Specimens Database</a></h5>
                                </div>
                                <figure><a href="assets/databasewapp/index.html#/app/table/specimensTbl"><img src="assets/images/dbisn03.png" alt=""></a></figure>
                                <div class="kode-blog-info">
                                    <p>Specimens data is the details of the specimens data from collection of specimens that qsbg collected from many project </p>
                                    <a href="./databasewapp/index.html#/app/table/specimensTbl" class="kode-blog-btn">Read More</a>
                                    <div class="clearfix"></div>
                                </div>
                            </li>
                            <li class="col-md-8">
                                <div class="kode-detail-element">
                                    <h2>Details of Specimens</h2>
                                </div>
                                <p>Mauris vel varius felis. Duis feugiat interdum nibh, nec consequat erat dapibus sit amet. Ut at nibh varius, dignissim magna non, interdum urna. Maecenas enean..</p>
                                <table class="kode-table" width="100%">
                                    <thead>
                                        <tr>
                                            <th>Details</th>
                                            <th>Records</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Specimens</td>
                                            <td><span class="result countallspecimens"></span></td>
                                        </tr>
                                        <tr>
                                            <td>Order</td>
                                            <td><span class="result countorder"></span></td>
                                        </tr>
                                        <tr>
                                            <td>family</td>
                                            <td><span class="result countfamily"></span></td>
                                        </tr>
                                        <tr>
                                            <td>genus</td>
                                            <td><span class="result countgenus"></span></td>
                                        </tr>
                                        <tr>
                                            <td>species</td>
                                            <td><span class="result countspecies"></span></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="col-md-12">
                    <div class="kode-blog-list kode-large-blog margin-top-30">
                        <ul class="row">
                            <li class="col-md-4">
                                <div class="kode-time-zoon">
                                    <time datetime="2008-02-14 20:00">03 <span><i class="fa fa-book"></i></span></time>
                                    <h5><a href="butterflylist.php">Butterfly in QSBG Database</a></h5>
                                </div>
                                <figure><a href="butterflylist.php"><img src="assets/images/dbisn01.png" alt=""></a></figure>
                                <div class="kode-blog-info">
                                    <p>Butterfly in QSBG database is produced from the output of Butterfly in QSBG Project </p>
                                    <a href="butterflylist.php" class="kode-blog-btn">Read More</a>
                                    <div class="clearfix"></div>
                                </div>
                            </li>
                            <li class="col-md-8">
                                <div class="kode-detail-element">
                                    <h2>Details of Butterfly in QSBG</h2>
                                </div>
                                <p>Mauris vel varius felis. Duis feugiat interdum nibh, nec consequat erat dapibus sit amet. Ut at nibh varius, dignissim magna non, interdum urna. Maecenas enean..</p>
                                <table class="kode-table" width="100%">
                                    <thead>
                                        <tr>
                                            <th>Details</th>
                                            <th>Records</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>family</td>
                                            <td><span class="result countbutterfamily"></span></td>
                                        </tr>
                                        <tr> 
                                            <td>genus</td>
                                            <td><span class="result countbuttergenus"></span></td>
                                        </tr>
                                        <tr>
                                            <td>species</td>
                                            <td><span class="result countbutterspecies"></span></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- About Wrap End-->
    <!-- Footer Begin-->
    <?php
        include 'assets/include/insectsmenu_source_php_footer.php';
        footer_html();
    ?>  



</body>

</html>