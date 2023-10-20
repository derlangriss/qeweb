<?php
require_once './assets/include/function.php';
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
        <!-- Banner Begin -->
        <section class="banner">
            <div class="carousel slide" data-ride="carousel" id="banner-carousel">
                <div class="carousel-inner">
                    <div class="item active" style="background-image: url(assets/images/DQE_9343.jpg); background-size:cover;">
                        <div class="overlay">
                        </div>
                        <div class="container">
                            <div class="content-wrap">
                                <div class="content">
                                    <div class="textwrap">
                                        <div class="subtitle top animated fadeIn wow" data-wow-delay="0.5s">
                                            <h2>
                                                Welcome to
                                            </h2>
                                        </div>
                                        <div class="title animated fadeIn wow" data-wow-delay="1s">
                                            <h1>
                                                QSBG
                                                <span class="light">
                                                    entomology
                                                </span>
                                            </h1>
                                        </div>
                                        <div class="subtitle animated fadeIn wow" data-wow-delay="1.5s">
                                            <h2>
                                                QSBG's main focus of attention is research, conservation and education efforts related to the Thai flora. However, for a number of years QSBG has been developing resources and expertise in entomology.
                                            </h2>
                                        </div>
                                    </div>
                                    <!--/.textwrap -->
                                </div>
                                <!--/.content -->
                            </div>
                            <!--/.content-wrap -->
                        </div>
                        <!--/.container -->
                    </div>
                    <!--/.item -->
                    <div class="item" style="background-image: url(assets/images/DQE_9046.jpg); background-size:cover;">
                        <div class="overlay">
                        </div>
                        <div class="container">
                            <div class="content-wrap">
                                <div class="content">
                                    <div class="textwrap">
                                        <div class="subtitle top animated fadeIn wow" data-wow-delay="0.5s">
                                            <h2>
                                                Queen Sirikit Botanic Garden
                                            </h2>
                                        </div>
                                        <div class="title animated fadeIn wow" data-wow-delay="1s">
                                            <h1>
                                                Entomology
                                                <span class="light">
                                                    Section
                                                </span>
                                            </h1>
                                        </div>
                                        <div class="subtitle animated fadeIn wow" data-wow-delay="1.5s">
                                            <h2>
                                                QSBG has now grown to more than 40 000 specimens. To learn more about us and our activities please explore the links on this page.
                                            </h2>
                                        </div>
                                    </div>
                                    <!--/.textwrap -->
                                </div>
                                <!--/.content -->
                            </div>
                            <!--/.content-wrap -->
                        </div>
                        <!--/.container -->
                    </div>
                    <!--/.item -->
                </div>
                <!--/.carousel-inner -->
                <!-- Controls -->
                <a class="left carousel-control" data-slide="prev" href="#banner-carousel" role="button">
                    <div class="control left">
                        <div class="shape">
                            <i class="fa fa-angle-left">
                            </i>
                        </div>
                    </div>
                </a>
                <a class="right carousel-control" data-slide="next" href="#banner-carousel" role="button">
                    <div class="control right">
                        <div class="shape">
                            <i class="fa fa-angle-right">
                            </i>
                        </div>
                    </div>
                </a>
                <div class="scroll-info">
                    <a href="#home-nav">
                        <div class="shape">
                            <i class="fa fa-angle-down">
                            </i>
                        </div>
                    </a>
                </div>
                <!--/.scroll-info -->
            </div>
            <!--/.bacnner-carousel -->
        </section>
        <?php include 'assets/include/insectsmenu_source_php_home.php';?>
        <!--// Page Content //-->
        <section class="kode-pagesection top_player_section">
            <div class="container">
                <div class="row">
                    <div class="col-md-12 col-sm-12">
                        <div class="generic-heading">
                            <h2>
                                Database Statistic
                            </h2>
                            <strong class="title-line">
                                Highlights of notable insects in 2022
                            </strong>
                        </div>
                        <div class="owl-carousel-team owl-theme kode-team-list next-prev-style">
                            <div class="item">
                                <figure>
                                    <a class="kode-team-thumb" href="#">
                                        <img alt="" src="assets/images/dbpreview/isn01.png"/>
                                    </a>
                                    <figcaption>
                                        <table class="kode-table kode-table-v2">
                                            <thead>
                                                <tr>
                                                    <th>
                                                        DETAILS
                                                    </th>
                                                    <th>
                                                        Records
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>Specimens</td>
                                                    <td><i class="countallspecimens"></i></td>
                                                </tr>
                                                <tr>
                                                    <td>Order</td>
                                                    <td><i class="result countorder"></i></td>
                                                </tr>
                                                <tr>
                                                    <td>family</td>
                                                    <td><i class="result countfamily"></i></td>
                                                </tr>
                                                <tr>
                                                    <td>genus</td>
                                                    <td><i class="result countgenus"></i></td>
                                                </tr>
                                                <tr>
                                                    <td>species</td>
                                                    <td><i class="result countspecies"></i></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <div class="clearfix">
                                        </div>
                                        <h2>
                                            <a href="assets/databasewapp/index.html#/app/table/specimensTbl">
                                                Specimens Database
                                            </a>
                                        </h2>
                                        <a class="kode-modren-btn thbg-colortwo" href="assets/databasewapp/index.html#/app/table/specimensTbl">
                                            Vew Detail
                                        </a>
                                    </figcaption>
                                </figure>
                            </div>
                            <div class="item">
                                <figure>
                                    <a class="kode-team-thumb" href="#">
                                        <img alt="" src="assets/images/dbpreview/butterflydb.png"/>
                                    </a>
                                    <figcaption>
                                        <table class="kode-table kode-table-v2">
                                            <thead>
                                                <tr>
                                                    <th>
                                                        DETAILS
                                                    </th>
                                                    <th>
                                                        Records
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>family</td>
                                                    <td><i class="result countbutterfamily"></i></td>
                                                </tr>
                                                <tr>
                                                    <td>genus</td>
                                                    <td><i class="result countbuttergenus"></i></td>
                                                </tr>
                                                <tr>
                                                    <td>species</td>
                                                    <td><i class="result countbutterspecies"></i></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <div class="clearfix">
                                        </div>
                                        <h2>
                                            <a href="butterflylist.html">
                                                Butterfly In QSBG
                                            </a>
                                        </h2>
                                        <a class="kode-modren-btn thbg-colortwo" href="butterflylist.html">
                                            Vew Detail
                                        </a>
                                    </figcaption>
                                </figure>
                            </div>
                            <div class="item">
                                <figure>
                                    <a class="kode-team-thumb" href="#">
                                        <img alt="" src="assets/images/dbpreview/specimensdb.png"/>
                                    </a>
                                    <figcaption>
                                        <table class="kode-table kode-table-v2">
                                            <thead>
                                                <tr>
                                                    <th>
                                                        DETAILS
                                                    </th>
                                                    <th>
                                                        Records
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>Collections</td>
                                                    <td><i class="result countcollection"></i></td>
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
                                        <div class="clearfix">
                                        </div>
                                        <h2>
                                            <a href="assets/databasewapp/index.html#/app/table/collectionTbl">
                                                Collection Database
                                            </a>
                                        </h2>
                                        <a class="kode-modren-btn thbg-colortwo" href="assets/databasewapp/index.html#/app/table/collectionTbl">
                                            Vew Detail
                                        </a>
                                    </figcaption>
                                </figure>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section class="about">
            <div class="container">
                <div class="col-md-7 col-sm-7">
                    <div class="personnel wow animated fadeIn" data-wow-delay="0.2s">
                        <div class="title">
                            <h3>
                                All About
                                <br/>
                                <span class="bold orange">
                                    QSBG Entology Project
                                </span>
                            </h3>
                        </div>
                        <div class="personnel-list">
                            <div class="shape photo item" style="background: url(assets/images/isn01.png);">
                                <a class="overlay" href="p_northerninsect.php">
                                    <div class="name">
                                        Northern Insect
                                    </div>
                                </a>
                            </div>
                            <!-- /.photo -->
                            <div class="shape photo item" style="background: url(assets/images/beetle.jpg);">
                                <a class="overlay" href="undercons.php">
                                    <div class="name">
                                        Beetle
                                    </div>
                                </a>
                            </div>
                            <!-- /.photo -->
                            <div class="shape photo item" style="background: url(assets/images/tiger_group.jpg);">
                                <a class="overlay" href="undercons.php">
                                    <div class="name">
                                        tiger
                                    </div>
                                </a>
                            </div>
                            <!-- /.photo -->
                            <div class="shape photo item" style="background: url(assets/images/firefly.jpg);">
                                <a class="overlay" href="undercons.php">
                                    <div class="name">
                                        Fireflies
                                    </div>
                                </a>
                            </div>
                            <!-- /.photo -->
                            <div class="shape photo item" style="background: url(assets/images/dragonfly02.png);">
                                <a class="overlay" href="undercons.php">
                                    <div class="name">
                                        Dragonfly
                                    </div>
                                </a>
                            </div>
                            <!-- /.photo -->
                            <div class="shape photo item" style="background: url(assets/images/AAN01.png);">
                                <a class="overlay" href="undercons.php">
                                    <div class="name">
                                       Ant
                                    </div>
                                </a>
                            </div>
                            <!-- /.photo -->
                            <div class="shape photo item" style="background: url(assets/images/DSA_7199.jpg);">
                                <a class="overlay" href="undercons.php">
                                    <div class="name">
                                       Butterfly
                                    </div>
                                </a>
                            </div>
                            <!-- /.photo -->
                        </div>
                        <!-- /.personnel-list -->
                        <div class="text">
                            <p>
                                QSBG's main focus of attention is research, conservation and education efforts related to the Thai flora. However, for a number of years QSBG has been developing resources and expertise in entomology.
                            </p>
                            <p>
                                QSBG's past interest in entomology has been mainly related to hosting post-graduate students from Chiang Mai university who have worked in the QSBG surrounds and made use of the QSBG laboratory facilities. Another entomological project that QSBG has had a long-term interest in is the project "Conservation of fireflies in Thailand" a Royal Project initiated by HM Queen Sirikit, a project aimed at understanding the ecology and conservation biology of firelies in Thailand.
                            </p>
                            <p>
                                In more recent times QSBG has become more active in entomological research in Thailand collaborating in two important international projects aimed at developing taxonomic and biodiversity inventory skills in Thailand.
                            </p>
                            <p>
                                QSBG now has a team of around 10 staff working out of 3 small labs on assorted entomological research and other activities. The insect collection housed at QSBG has now grown to more than 18 000 specimens.
                            </p>
                        </div>
                    </div>
                    <!-- /.personnel -->
                </div>
                <!-- /.col-md-6 -->
                <div class="col-md-5 col-sm-5">

                       <div class="discography  wow animated fadeIn" data-wow-delay="0.2s">
                            <div class="title">
                                <h3>
                                    THROUGH
                                    <br/>
                                    <span class="bold orange">
                                        YOUR EYES
                                    </span>
                                </h3>
                            </div>
                            <div class="content">
                                <div class="blog-v2 webkit slide-view">
                                    <article class="featured">
                                        <figure>
                                            <div class="flexslider">
                                                <ul class="slides">
                                                    <li>

                                                            <img alt="" src="assets/images/throughyoureyes/canopytrap.jpg"/>

                                                        <div class="clear">
                                                        </div>
                                                        <div class="text">
                                                            <h3>
                                                                <a class="colorhover" href="undercons.php">
                                                                    “Preparing Unit tray”
                                                                </a>
                                                            </h3>
                                                            <p>
                                                                We have just procured a trap for catching insects on the treetops, which is called canopy trap

                                                            </p>
                                                            <!--a class="bgcolor nr-readmore" href="undercons.php">Read More</a-->
                                                        </div>
                                                         <figcaption class="bgcolor">19 <span>Feb</span><br>2020</figcaption>
                                                    </li>
                                                    <li>

                                                            <img alt="" src="assets/images/throughyoureyes/unittray.jpg"/>

                                                        <div class="clear">
                                                        </div>
                                                        <div class="text">
                                                            <h3>
                                                                <a class="colorhover" href="undercons.php">
                                                                    “Preparing Unit tray”
                                                                </a>
                                                            </h3>
                                                            <p>
                                                                We are preparing a large unit tray for the sample. With increasing as well 

                                                            </p>
                                                            <!--a class="bgcolor nr-readmore" href="undercons.php">Read More</a-->
                                                        </div>
                                                         <figcaption class="bgcolor">19 <span>Feb</span><br>2020</figcaption>
                                                    </li>
                                                     <li>

                                                            <img alt="" src="assets/images/throughyoureyes/20190731_112303.jpg"/>

                                                        <div class="clear">
                                                        </div>
                                                        <div class="text">
                                                            <h3>
                                                                <a class="colorhover" href="undercons.php">
                                                                    “Tidy up Specimens”
                                                                </a>
                                                            </h3>
                                                            <p>
                                                                Rearrange the bulk speciments from Tiger project and build up the database mangement for all bulk specimens from any donators

                                                            </p>
                                                            <!--a class="bgcolor nr-readmore" href="undercons.php">Read More</a-->
                                                        </div>
                                                         <figcaption class="bgcolor">1 <span>July</span><br>2019</figcaption>
                                                    </li>

                                                     <li>

                                                            <img alt="" src="assets/images/throughyoureyes/th_01.jpg"/>

                                                        <div class="clear">
                                                        </div>
                                                        <div class="text">
                                                            <h3>
                                                                <a class="colorhover" href="undercons.php">
                                                                    “New Trainee”
                                                                </a>
                                                            </h3>
                                                            <p>
                                                                There 2 trainees from Chiangmai University begin at 21 May 2019 to 26 June 2019

                                                            </p>
                                                            <!--a class="bgcolor nr-readmore" href="undercons.php">Read More</a-->
                                                        </div>
                                                         <figcaption class="bgcolor">27 <span>May</span><br>2019</figcaption>
                                                    </li>

                                                    <li>

                                                            <img alt="" src="assets/images/throughyoureyes/cicada1.jpg"/>

                                                        <div class="clear">
                                                        </div>
                                                        <div class="text">
                                                            <h3>
                                                                <a class="colorhover" href="undercons.php">
                                                                    “Amazing Cicada”
                                                                </a>
                                                            </h3>
                                                            <p>
                                                                You may see the magic of th nature through cicada life.
Cicada larvae Living in a moist underground or under a large tree root And relying on water from the roots of food As he grew up, he moulted, shouting "Chan Chan Chan" like this for a long time. In this period, they are not too old to find mating and die.
                                                            </p>
                                                            <!--a class="bgcolor nr-readmore" href="undercons.php">Read More</a-->
                                                        </div>
                                                         <figcaption class="bgcolor">14 <span>May</span><br>2019</figcaption>
                                                    </li>

                                                    <li>

                                                            <img alt="" src="assets/images/throughyoureyes/beetle.jpg"/>

                                                        <div class="clear">
                                                        </div>
                                                        <div class="text">
                                                            <h3>
                                                                <a class="colorhover" href="undercons.php">
                                                                    “<i>Enoplotrupes sharpi</i>”
                                                                </a>
                                                            </h3>
                                                            <p>
                                                                The research project of 2019 added Study on biology, population and distribution of purple scarab beetle (<i>Enoplotrupes sharpi</i> Jordan & Fothschild,1893) in natural habitat for conservation
                                                            </p>
                                                            <!--a class="bgcolor nr-readmore" href="undercons.php">Read More</a-->
                                                        </div>
                                                         <figcaption class="bgcolor">19 <span>Mar</span><br>2019</figcaption>
                                                    </li>
                                                    <li>

                                                            <img alt="" src="assets/images/sample01.png"/>

                                                        <div class="clear">
                                                        </div>
                                                        <div class="text">
                                                            <h3>
                                                                <a class="colorhover" href="undercons.php">
                                                                    “Our logo!”
                                                                </a>
                                                            </h3>
                                                            <p>
                                                                Next year we turn ten! We dediced it was time our little section had our own logo. As we started with fireflies we've adopted a firefly (Vesta sp.) as the key element of our logo. [photo by Somkhuan Suk-ieam, design by Sompong with 'advice' from the team!
                                                            </p>
                                                            <!--a class="bgcolor nr-readmore" href="undercons.php">Read More</a-->
                                                        </div>
                                                    </li>


                                                </ul>
                                            </div>
                                            <!--figcaption class="bgcolor">20 <span>May</span></figcaption>
                                                </figure-->


                                        </figure>
                                    </article>
                                </div>

                            </div><!-- /.content -->
                       </div>
                </div>
            </div>
        </section>
        <!-- About Begin -->

         <!-- Schedule Begin -->
    <section class="schedule">
      <div class="overlay"></div>
      <div class="container content">
        <div class="col-md-12 title wow animated fadeIn" data-wow-delay="0.3s"><h2>NEWS & Events</h2></div>
        <div class="col-md-12">

        <div class="schedrow wow animated fadeIn">
            <div class="event">
                            <span class="bold"><i class="fa fa-list"></i>News</span>
                        </div>
                        <div class="location">
                            <span class="bold"><i class="fa fa-map-marker"></i>INFLUENT OF BIOPHYSICAL VARIABLE IN MICROHABITAT
                            </span>
                        </div>
                        <div class="ticket">
                            <i class="fa fa-calendar"></i>25 OCT. 2019
                        </div>
                        <div class="button-wrap"><a href="document/news/influentofbiophysical.php" class="def-button">More Info</a></div>
          </div><!-- /.schedrow -->

          <div class="schedrow wow animated fadeIn">
            <div class="event">
                            <span class="bold"><i class="fa fa-list"></i>News</span>
                        </div>
                        <div class="location">
                            <span class="bold"><i class="fa fa-map-marker"></i>TWIN PEAKS...OR PERHAPS NOT?
                            </span>
                        </div>
                        <div class="ticket">
                            <i class="fa fa-calendar"></i>NA
                        </div>
                        <div class="button-wrap"><a href="document/news/twinpeaks.php" class="def-button">More Info</a></div>
          </div><!-- /.schedrow -->

          <div class="schedrow wow animated fadeIn">
            <div class="event">
                            <span class="bold"><i class="fa fa-list"></i>News</span>
                        </div>
                        <div class="location">
                            <span class="bold"><i class="fa fa-map-marker"></i>AN "ALIEN HUNTER IS COMING"
                        </div>
                        <div class="ticket">
                            <i class="fa fa-calendar"></i>NA
                        </div>
                        <div class="button-wrap"><a href="betz213.php" class="def-button">More Info</a></div>
          </div><!-- /.schedrow -->

          <div class="schedrow wow animated fadeIn">
            <div class="event">
                            <span class="bold"><i class="fa fa-list"></i>News</span>
                        </div>
                        <div class="location">
                            <span class="bold"><i class="fa fa-map-marker"></i>FROM "CATERPILLAR" TO "BUTTERFLY"
                        </div>
                        <div class="ticket">
                            <i class="fa fa-calendar"></i>NA
                        </div>
                        <div class="button-wrap"><a href="BFhouseannounce.php" class="def-button">More Info</a></div>
          </div><!-- /.schedrow -->

          <div class="schedrow wow animated fadeIn">
            <div class="event">
                            <span class="bold"><i class="fa fa-list"></i>News</span>
                        </div>
                        <div class="location">
                            <span class="bold"><i class="fa fa-map-marker"></i>LOCAL ENTOMOLOGIST DEPOSITS 5000 SPECIMENS WITH QSBG
                        </div>
                        <div class="ticket">
                            <i class="fa fa-calendar"></i>NA
                        </div>
                        <div class="button-wrap"><a href="beaverdonation2013.php" class="def-button">More Info</a></div>
          </div><!-- /.schedrow -->

          <div class="schedrow wow animated fadeIn">
           <div class="event">
                            <span class="bold"><i class="fa fa-list"></i>News</span>
                        </div>
                        <div class="location">
                            <span class="bold"><i class="fa fa-map-marker"></i>MALAYSIAN PUTRA UNIVERSITY VISITORS TOUR QSBG ENTOMOLOGY
                        </div>
                        <div class="ticket">
                            <i class="fa fa-calendar"></i>NA
                        </div>
                        <div class="button-wrap"><a href="upmvisit2013.php" class="def-button">More Info</a></div>
          </div><!-- /.schedrow -->

        </div><!-- /.col-md-12 -->
      </div><!-- /.container -->
    </section><!-- /.schedule -->
    <!-- Schedule End -->
 <!-- Latest Album Begin -->
        <section class="latest-album">
            <div class="container">
                <div class="col-md-3 col-sm-3 intro-wrap">
                    <div class="intro wow animated fadeIn" data-wow-delay="0.3s">
                        <h3>ARTWORK</h3>
                        <p>
                            We are provide the poster and handbook that can be use for Utility.
                        </p>
                        <a href="artwork.php">
                            <div class="def-button">
                                View All
                            </div>
                        </a>
                    </div>
                </div>
                <div class="col-md-3 col-sm-3 album-card-wrap wow animated fadeIn" data-wow-delay="0.2s">
                    <div class="album-card">
                        <div class="image hoverdir-target">
                            <img alt="image" src="assets/images/dementor_s.jpg" width="300px">
                                <div class="overlay">
                                    <div class="buy-wrapper">
                                        <div class="buy">
                                            <a class="link" href="undercons.php">
                                                <span>
                                                    <strong class="bold">
                                                        More
                                                    </strong>
                                                    <br/>
                                                    info
                                                </span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </img>
                        </div>
                        <div class="text">
                            <a href="p_northerninsect.php">
                                <div class="title">
                                    <h4>
                                        cockroach
                                    </h4>
                                </div>
                            </a>
                            <div class="genre">
                                <span>
                                    Poster
                                </span>
                            </div>
                            <!--div class="tracks"><span><i class="fa fa-music"></i> 12</span></div-->
                        </div>
                    </div>
                    <!-- /.album-card -->
                </div>
                <!-- /.col-md-3 -->
                <div class="col-md-3 col-sm-3 album-card-wrap wow animated fadeIn" data-wow-delay="0.4s">
                    <div class="album-card">
                        <div class="image hoverdir-target">
                            <img alt="image" src="assets/images/yung_s.jpg">
                                <div class="overlay">
                                    <div class="buy-wrapper">
                                        <div class="buy">
                                            <a class="link" href="undercons.php">
                                                <span>
                                                    <strong class="bold">
                                                        More
                                                    </strong>
                                                    <br/>
                                                    info
                                                </span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </img>
                        </div>
                        <div class="text">
                            <a href="p_northerninsect.php">
                                <div class="title">
                                    <h4>
                                        Morquito
                                    </h4>
                                </div>
                            </a>
                            <div class="genre">
                                <span>
                                    Poster
                                </span>
                            </div>
                            <!--div class="tracks"><span><i class="fa fa-music"></i> 12</span></div-->
                        </div>
                    </div>
                    <!-- /.album-card -->
                </div>
                <div class="col-md-3 col-sm-3 album-card-wrap wow animated fadeIn" data-wow-delay="0.4s">
                    <div class="album-card">
                        <div class="image hoverdir-target">
                            <img alt="image" src="assets/images/dragonflya1_s.jpg">
                                <div class="overlay">
                                    <div class="buy-wrapper">
                                        <div class="buy">
                                            <a class="link" href="undercons.php">
                                                <span>
                                                    <strong class="bold">
                                                        More
                                                    </strong>
                                                    <br/>
                                                    info
                                                </span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </img>
                        </div>
                        <div class="text">
                            <a href="p_northerninsect.php">
                                <div class="title">
                                    <h4>
                                        Dragonfly
                                    </h4>
                                </div>
                            </a>
                            <div class="genre">
                                <span>
                                    Poster
                                </span>
                            </div>
                            <!--div class="tracks"><span><i class="fa fa-music"></i> 12</span></div-->
                        </div>
                    </div>
                    <!-- /.album-card -->
                </div>

            </div>
            <!-- /.container -->
        </section>
        <section class="latest-album">
            <div class="container">
                <div class="col-md-3 col-sm-3 intro-wrap">
                    <div class="intro wow animated fadeIn" data-wow-delay="0.3s">
                        <h3>Knowledge Management</h3>
                        <p>
                            The process of creating, sharing, using and managing the knowledge and information of an organization
                        </p>
                        <a href="artwork.php">
                            <div class="def-button">
                                View All
                            </div>
                        </a>
                    </div>
                </div>
                <div class="col-md-3 col-sm-3 album-card-wrap wow animated fadeIn" data-wow-delay="0.2s">
                    <div class="album-card">
                        <div class="image hoverdir-target">
                            <img alt="image" src="assets/images/km_s.jpg" width="300px">
                                <div class="overlay">
                                    <div class="buy-wrapper">
                                        <div class="buy">
                                            <a class="link" href="km/km_spec.pdf">
                                                <span>
                                                    <strong class="bold">
                                                        More
                                                    </strong>
                                                    <br/>
                                                    info
                                                </span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </img>
                        </div>
                        <div class="text">
                            <a href="">
                                <div class="title">
                                    <h4>
                                        specimens management
                                    </h4>
                                </div>
                            </a>
                            <div class="genre">
                                <span>
                                    KM
                                </span>
                            </div>
                            <!--div class="tracks"><span><i class="fa fa-music"></i> 12</span></div-->
                        </div>
                    </div>
                    <!-- /.album-card -->
                </div>
                <!-- /.col-md-3 -->

                <div class="col-md-3 col-sm-3 album-card-wrap wow animated fadeIn" data-wow-delay="0.2s">
                    <div class="album-card">
                        <div class="image hoverdir-target">
                            <img alt="image" src="assets/images/km_trap.jpg" width="300px">
                                <div class="overlay">
                                    <div class="buy-wrapper">
                                        <div class="buy">
                                            <a class="link" href="km/km_trap.pdf">
                                                <span>
                                                    <strong class="bold">
                                                        More
                                                    </strong>
                                                    <br/>
                                                    info
                                                </span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </img>
                        </div>
                        <div class="text">
                            <a href="">
                                <div class="title">
                                    <h4>
                                      Insect trap
                                    </h4>
                                </div>
                            </a>
                            <div class="genre">
                                <span>
                                    KM
                                </span>
                            </div>
                            <!--div class="tracks"><span><i class="fa fa-music"></i> 12</span></div-->
                        </div>
                    </div>
                    <!-- /.album-card -->
                </div>

                <div class="col-md-3 col-sm-3 album-card-wrap wow animated fadeIn" data-wow-delay="0.2s">
                    <div class="album-card">
                        <div class="image hoverdir-target">
                            <img alt="image" src="assets/images/km_label.jpg" width="300px">
                                <div class="overlay">
                                    <div class="buy-wrapper">
                                        <div class="buy">
                                            <a class="link" href="km/km_label.pdf">
                                                <span>
                                                    <strong class="bold">
                                                        More
                                                    </strong>
                                                    <br/>
                                                    info
                                                </span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </img>
                        </div>
                        <div class="text">
                            <a href="p_northerninsect.php">
                                <div class="title">
                                    <h4>
                                      Label Information
                                    </h4>
                                </div>
                            </a>
                            <div class="genre">
                                <span>
                                    KM
                                </span>
                            </div>
                            <!--div class="tracks"><span><i class="fa fa-music"></i> 12</span></div-->
                        </div>
                    </div>
                    <!-- /.album-card -->
                </div>
                

            </div>
            <!-- /.container -->
        </section>



        <!--section class="about">
      <div class="container">
        <div class="col-md-7 col-sm-7">
          <div class="personnel wow animated fadeIn" data-wow-delay="0.2s">
            <div class="title">
              <h3>
              All About <br/>
              <span class="bold orange">Queen Sirikit Entomology Project</span>
              </h3>
              <div class="personnel-list">
                <div class="shape photo item" style="background: url(assets/images/AAN01.png);">
                  <a href="about.html" class="overlay">
                    <div class="name">
                      Northen of Insects
                    </div>
                  </a>
                </div>

                <div class="shape photo item" style="background: url(assets/images/dragonfly02.png);">
                  <a href="about.html" class="overlay">
                    <div class="name">
                      Indigo beetle
                    </div>
                  </a>
                </div>

              </div>

              <div class="text">
                <p>QSBG's main focus of attention is research, conservation and education efforts related to the Thai flora. However, for a number of years QSBG has been developing resources and expertise in entomology.
                  QSBG's past interest in entomology has been mainly related to hosting post-graduate students from Chiang Mai university who have worked in the QSBG surrounds and made use of the QSBG laboratory facilities. Another entomological project that QSBG has had a long-term interest in is the project "Conservation of fireflies in Thailand" a Royal Project initiated by HM Queen Sirikit, a project aimed at understanding the ecology and conservation biology of firelies in Thailand.
                  In more recent times QSBG has become more active in entomological research in Thailand collaborating in two important international projects aimed at developing taxonomic and biodiversity inventory skills in Thailand.
                  QSBG now has a team of around 10 staff working out of 3 small labs on assorted entomological research and other activities. The insect collection housed at QSBG has now grown to more than 18 000 specimens.
                To learn more about us and our activities please explore the links on this page.</p>
              </div>
            </div>

          </div>
        </div>
        <div class="col-md-5 col-sm-5">
          <div class="discography wow animated fadeIn" data-wow-delay="0.4s">
            <div class="title">
              <h3>
              Through <br/>
              <span class="bold orange">your eyes</span>
              </h3>
            </div>
          </div>
        </div>

      </div>
    </section-->
        <section class="our-mission our-mission-add" data-speed="10" data-type="background">
            <div class="container">
                <div class="generic-heading">
                    <h2>
                        Butterfly in QSBG
                    </h2>
                    <strong class="title-line">
                        Highlights of insects in 2019
                    </strong>
                </div>
                <div class="filter01" id="bx-pager-2">
                    <a class="current" data-slide-index="0" href="javascript:void(0)">
                        <div class="filterbutton">
                            Jan
                        </div>
                    </a>
                    <a class="" data-slide-index="1" href="javascript:void(0)">
                        <div class="filterbutton">
                            Feb
                        </div>
                    </a>
                    <a class="" data-slide-index="2" href="javascript:void(0)">
                        <div class="filterbutton">
                            Mar
                        </div>
                    </a>
                    <a class="" data-slide-index="3" href="javascript:void(0)">
                        <div class="filterbutton">
                            Apr
                        </div>
                    </a>
                    <a class="" data-slide-index="4" href="javascript:void(0)">
                        <div class="filterbutton">
                            May
                        </div>
                    </a>
                    <a class="" data-slide-index="5" href="javascript:void(0)">
                        <div class="filterbutton">
                            jun
                        </div>
                    </a>
                    <a class="" data-slide-index="6" href="javascript:void(0)">
                        <div class="filterbutton">
                            jul
                        </div>
                    </a>
                    <a class="" data-slide-index="7" href="javascript:void(0)">
                        <div class="filterbutton">
                            aug
                        </div>
                    </a>
                    <a class="" data-slide-index="8" href="javascript:void(0)">
                        <div class="filterbutton">
                            sep
                        </div>
                    </a>
                    <a class="" data-slide-index="9" href="javascript:void(0)">
                        <div class="filterbutton">
                            oct
                        </div>
                    </a>
                    <a class="" data-slide-index="10" href="javascript:void(0)">
                        <div class="filterbutton">
                            nov
                        </div>
                    </a>
                    <a class="" data-slide-index="11" href="javascript:void(0)">
                        <div class="filterbutton">
                            dec
                        </div>
                    </a>
                </div>
                <div class="text-outer">
                    <ul class="timeline-slider">

                        <li>
                            <div class="outer-text">
                                <div class="frame">
                                    <a href="#">
                                        <img alt="img" src="assets/images/insectofthemonth/2019/spotted_flat.jpg"/>
                                    </a>
                                </div>
                                <div class="timeline-text">
                                    <h3>
                                        Common Spotted Flat
                                    </h3>
                                    <strong class="title">
                                        <i>Celaenorrhinus leucocera</i>

                                    </strong>
                                    <p>
                                       Hesperiidae

                                    </p>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="outer-text">
                                <div class="frame">
                                    <a href="#">
                                        <img alt="img" src="assets/images/insectofthemonth/2019/common_imperial.jpg"/>
                                    </a>
                                </div>
                                <div class="timeline-text">
                                    <h3>
                                        Common Imperial

                                    </h3>
                                    <strong class="title">
                                       <i>Cheritra freja</i>

                                    </strong>
                                    <p>
                                       Lycaenidae

                                    </p>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="outer-text">
                                <div class="frame">
                                    <a href="#">
                                        <img alt="img" src="assets/images/insectofthemonth/2019/zigzag_baned.png"/>
                                    </a>
                                </div>
                                <div class="timeline-text">
                                    <h3>
                                        Zigzag Banded Dart

                                    </h3>
                                    <strong class="title">
                                        <i>Dart Potanthus mingo</i>
                                    </strong>
                                    <p>
                                        Hesperiidae
                                    </p>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="outer-text">
                                <div class="frame">
                                    <a href="#">
                                        <img alt="img" src="assets/images/insectofthemonth/2019/gray_tinsel.jpg"/>
                                    </a>
                                </div>
                                <div class="timeline-text">
                                    <h3>
                                        Gray Tinsel
                                    </h3>
                                    <strong class="title">
                                        <i>Catapaecilma major</i>
                                    </strong>
                                    <p>
                                        Lycaenidae
                                    </p>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="outer-text">
                                <div class="frame">
                                    <a href="#">
                                        <img alt="img" src="assets/images/insectofthemonth/2019/longbanded_silverline.jpg"/>
                                    </a>
                                </div>
                                <div class="timeline-text">
                                    <h3>
                                        Large LongBanded Silverline
                                    </h3>
                                    <strong class="title">
                                        <i>Spindasis seliga</i>

                                    </strong>
                                    <p>
                                       Lycaenidae

                                    </p>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="outer-text">
                                <div class="frame">
                                    <a href="#">
                                        <img alt="img" src="assets/images/insectofthemonth/2019/grass_blue.jpg"/>
                                    </a>
                                </div>
                                <div class="timeline-text">
                                    <h3>
                                        Lesser Grass Blue
                                    </h3>
                                    <strong class="title">
                                        <i>Zizina otis</i>
                                    </strong>
                                    <p>
                                        Lycaenidae
                                    </p>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="outer-text">
                                <div class="frame">
                                    <a href="#">
                                        <img alt="img" src="assets/images/insectofthemonth/2019/common_palmfly.jpg"/>
                                    </a>
                                </div>
                                <div class="timeline-text">
                                    <h3>
                                        Common Palmfly
                                    </h3>
                                    <strong class="title">
                                        <i>Elymnias hypermnestra</i>
                                    </strong>
                                    <p>
                                        Nymphalidae
                                    </p>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="outer-text">
                                <div class="frame">
                                    <a href="#">
                                        <img alt="img" src="assets/images/insectofthemonth/2019/chocolate_pansy.jpg"/>
                                    </a>
                                </div>
                                <div class="timeline-text">
                                    <h3>
                                        Chocolate Pansy
                                    </h3>
                                    <strong class="title">
                                        <i>Junonia iphita</i>
                                    </strong>
                                    <p>
                                        Nymphalidae
                                    </p>
                                </div>
                            </div>
                        </li>

                        <li>
                            <div class="outer-text">
                                <div class="frame">
                                    <a href="#">
                                        <img alt="img" src="assets/images/insectofthemonth/2019/lemon_pansy.jpg"/>
                                    </a>
                                </div>
                                <div class="timeline-text">
                                    <h3>
                                        Lemon Pansy
                                    </h3>
                                    <strong class="title">
                                        <i>Junonia lemonias</i>
                                    </strong>
                                    <p>
                                        Nymphalidae
                                    </p>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="outer-text">
                                <div class="frame">
                                    <a href="#">
                                        <img alt="img" src="assets/images/insectofthemonth/2019/brown_awl.jpg"/>
                                    </a>
                                </div>
                                <div class="timeline-text">
                                    <h3>
                                        Brown Awl
                                    </h3>
                                    <strong class="title">
                                        <i>Badamia exclamationis</i>
                                    </strong>
                                    <p>
                                        Hesperiidae
                                    <br>
                                        
                                    </p>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="outer-text">
                                <div class="frame">
                                    <a href="#">
                                        <img alt="img" src="assets/images/insectofthemonth/2019/common_cerulean.jpg"/>
                                    </a>
                                </div>
                                <div class="timeline-text">
                                    <h3>
                                        Common Cerulean
                                    </h3>
                                    <strong class="title">
                                        Jamides celeno

                                    </strong>
                                    <p>
                                        Lycaenidae

                                    </p>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="outer-text">
                                <div class="frame">
                                    <a href="#">
                                        <img alt="img" src="assets/images/insectofthemonth/2019/purple_sapphire.jpg"/>
                                    </a>
                                </div>
                                <div class="timeline-text">
                                    <h3>
                                        Common Purple Sapphire
                                    </h3>
                                    <strong class="title">
                                        Heliophorus epicles

                                    </strong>
                                    <p>
                                        Lycaenidae
                                    </p>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
        <!--// Page Content //-->
        <section class="padding-30-topbottom bg-grey ">
            <div class="container">
                <div class="row">
                    <div class="kode-result-list shape-view col-md-12">
                        <div class="generic-heading margin-bottom150">
                            <h3>
                                Recommend
                            </h3>
                            <strong class="title-line">
                                Promote Stories Sites
                            </strong>
                        </div>
                        <div class="clear clearfix">
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <article class="recommend">
                                    <div class="kode-result-thumb">
                                        <a href="butterflyEN.php">
                                            <img alt="" src="assets/images/DSA_7199.jpg"/>
                                        </a>
                                    </div>
                                    <div class="kode-result-info">
                                        <h2>

                                                Butterfly the "flying flowers" of the garden

                                        </h2>
                                        <ul>
                                            <li>
                                                ผีเสื้อ ดอกไม้บินได้ ในสวนพฤกษศาสตร์
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="readmore">
                                        <a href="butterflyEN.php">
                                            EN Version
                                        </a>
                                    </div>
                                    <div class="readmore">
                                        <a href="butterflyTH.php">
                                            TH Version
                                        </a>
                                    </div>
                                </article>
                            </div>
                            <div class="col-md-6">
                                <article class="kode-even">
                                    <div class="kode-result-thumb">
                                        <a href="dragonflyTH.php">
                                            <img alt="" src="assets/images/dragonfly_s.jpg"/>
                                        </a>
                                    </div>
                                    <div class="kode-result-info">
                                        <h2>

                                                JEWELS OF THE GARDEN

                                        </h2>
                                        <ul>
                                            <li>
                                                แมลงปอในสวนพฤกษศาสตร์ สมเด็จพระนางเจ้าสิริกิติ์
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="readmore">
                                        <a href="dragonflyTH.php">
                                            TH Version
                                        </a>
                                    </div>
                                </article>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- /.gallery -->
        
        <?php
include 'assets/include/insectsmenu_source_php_footer.php';
footer_html();
?>

    </body>
</html>
