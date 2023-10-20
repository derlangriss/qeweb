<?php
require 'connectdb.php';

/*
for ($x = 1; $x <= 35; $x++) {

    $strSQL = "SELECT * FROM family LEFT JOIN torder on torder.torder_id = torder_torder_id";
    $strSQL .= " WHERE family_name ilike 'Unknown' torder_id =" . $x;
    $objQuery = pg_query($strSQL);

    $row01    = pg_fetch_array($objQuery);
    extract($row01);

    for ($xy = 1; $xy <= $numberofcollector; $xy++) {


 
$strSQL = "INSERT INTO collection_has_collector ";
$strSQL .= "(collection_coll_id ,collectorseq,  collector_collector_id)";
$strSQL .= "VALUES ";
$strSQL .= "('" . $collectorhascollection . "'," . $xy . "," . $collector_id . ")";
$objQuery = pg_query($strSQL);

            } else if  
    }

}
*/
/*
$resultArray = array();
 */
/*
for ($x = 960; $x <= 980; $x++) {
$strSQL = "UPDATE preinsertcollector  SET ";
$strSQL .= "collectorsame01 = 'Somchai Chatchumnan'";
$strSQL .= ",collectorsame02 = 'Saink Singtong'";
$strSQL .= " WHERE prelim_id = ".$x;
$objQuery = pg_query($strSQL);
}

 */
 
/*
for ($x = 101; $x <= 6514; $x++) {

$strSQL = "SELECT CONCAT(collector_firstname_en,' ',collector_lastname_en) as collname,collector_id,collectorsame02,numberofcollector,collectorhascollection
FROM preinsertcollector LEFT JOIN
collector ON CONCAT(collector_firstname_en,' ',collector_lastname_en) = preinsertcollector.collectorsame01 ";
$strSQL .= " WHERE numberofcollector = 2 AND collectorhascollection = " . $x;
$objQuery = pg_query($strSQL);
$row01    = pg_fetch_array($objQuery);
extract($row01);

for ($xy = 2; $xy <= $numberofcollector; $xy++) {

$strSQL = "INSERT INTO collection_has_collector ";
$strSQL .= "(collection_coll_id ,collectorseq,  collector_collector_id)";
$strSQL .= "VALUES ";
$strSQL .= "('" . $collectorhascollection . "',".$xy.",".$collector_id.")";
$objQuery = pg_query($strSQL);

}

}

 */ 
 

for ($x = 60; $x <= 68; $x++) {

    $strSQL = "SELECT CONCAT(collector_firstname_en,' ',collector_lastname_en) as collname,collector_id,collectorsame01,numberofcollector,collectorhascollection
FROM preinsertcollector LEFT JOIN
collector ON CONCAT(collector_firstname_en,' ',collector_lastname_en) = preinsertcollector.collectorsame01 ";
    $strSQL .= " WHERE collectorhascollection = " . $x;
    $objQuery = pg_query($strSQL);
    $row01    = pg_fetch_array($objQuery);
    extract($row01);

    for ($xy = 1; $xy <= $numberofcollector; $xy++) {

        if ($numberofcollector == 3) {
            if ($xy == 3) {
                $strSQL = "SELECT CONCAT(collector_firstname_en,' ',collector_lastname_en) as collname,collector_id,collectorsame03,numberofcollector
FROM preinsertcollector LEFT JOIN
collector ON CONCAT(collector_firstname_en,' ',collector_lastname_en) = preinsertcollector.collectorsame03 ";
                $strSQL .= " WHERE numberofcollector = 3 AND collectorhascollection = " . $x;
                $objQuery = pg_query($strSQL);
                $row01    = pg_fetch_array($objQuery);
                extract($row01);



$strSQL = "INSERT INTO collection_has_collector ";
$strSQL .= "(collection_coll_id ,collectorseq,  collector_collector_id)";
$strSQL .= "VALUES ";
$strSQL .= "('" . $collectorhascollection . "'," . $xy . "," . $collector_id . ")";
$objQuery = pg_query($strSQL);

            } else if ($xy == 2) {

                $strSQL02 = "SELECT CONCAT(collector_firstname_en,' ',collector_lastname_en) as collname,collector_id ,collectorsame02,numberofcollector,collectorhascollection
FROM preinsertcollector LEFT JOIN
collector ON CONCAT(collector_firstname_en,' ',collector_lastname_en) = preinsertcollector.collectorsame02 ";
                $strSQL02 .= " WHERE numberofcollector = 3 AND collectorhascollection = " . $x;
                $objQuery = pg_query($strSQL02);
                $row01    = pg_fetch_array($objQuery);
                extract($row01);
          

                $strSQL = "INSERT INTO collection_has_collector ";
                $strSQL .= "(collection_coll_id ,collectorseq,  collector_collector_id)";
                $strSQL .= "VALUES ";
                $strSQL .= "('" . $collectorhascollection . "'," . $xy . "," . $collector_id . ")";
                $objQuery = pg_query($strSQL);

            } else {


                $strSQL = "INSERT INTO collection_has_collector ";
                $strSQL .= "(collection_coll_id ,collectorseq,  collector_collector_id)";
                $strSQL .= "VALUES ";
                $strSQL .= "('" . $collectorhascollection . "'," . $xy . "," . $collector_id . ")";
                $objQuery = pg_query($strSQL);

            }

        } else if ($numberofcollector == 2) {

            if ($xy == 2) {

                $strSQL02 = "SELECT CONCAT(collector_firstname_en,' ',collector_lastname_en) as collname,collector_id ,collectorsame02,numberofcollector,collectorhascollection
FROM preinsertcollector LEFT JOIN
collector ON CONCAT(collector_firstname_en,' ',collector_lastname_en) = preinsertcollector.collectorsame02 ";
                $strSQL02 .= " WHERE numberofcollector = 2 AND collectorhascollection = " . $x;
                $objQuery = pg_query($strSQL02);
                $row01    = pg_fetch_array($objQuery);
                extract($row01);
         

                $strSQL = "INSERT INTO collection_has_collector ";
                $strSQL .= "(collection_coll_id ,collectorseq,  collector_collector_id)";
                $strSQL .= "VALUES ";
                $strSQL .= "('" . $collectorhascollection . "'," . $xy . "," . $collector_id . ")";
                $objQuery = pg_query($strSQL);

            } else {


                $strSQL = "INSERT INTO collection_has_collector ";
                $strSQL .= "(collection_coll_id ,collectorseq,  collector_collector_id)";
                $strSQL .= "VALUES ";
                $strSQL .= "('" . $collectorhascollection . "'," . $xy . "," . $collector_id . ")";
                $objQuery = pg_query($strSQL);

            }

        } else {

        
            $strSQL = "INSERT INTO collection_has_collector ";
            $strSQL .= "(collection_coll_id ,collectorseq,  collector_collector_id)";
            $strSQL .= "VALUES ";
            $strSQL .= "('" . $collectorhascollection . "'," . $xy . "," . $collector_id . ")";
            $objQuery = pg_query($strSQL);

        }

    }

}















/*

for ($x = 29; $x <= 57; $x++) {
$strSQL = "INSERT INTO collection_has_collector ";
$strSQL .= "(collection_coll_id    ,collectorseq,    collector_collector_id)";
$strSQL .= "VALUES ";
$strSQL .= "('" . $x . "',1,161)";
$objQuery = pg_query($strSQL);
}
 */

/*
for ($x = 4; $x <= 22; $x++) {
$strSQL = "UPDATE collection_has_collector SET ";
$strSQL .= "collector_collector_id = 160";
$strSQL .= " WHERE collection_coll_id = ".$x;
$objQuery = pg_query($strSQL);
}
 */

/*
for ($x = 1; $x <= 162; $x++) {
$strSQL = "INSERT INTO allimages ";
$strSQL .= "(images_path,another_id,images_type)";
$strSQL .= "VALUES ";
$strSQL .= "('./assets/views/action/img/uploads/collector/noimg.png','" . $x . "','3')";
$objQuery = pg_query($strSQL);
}*/
exit;
