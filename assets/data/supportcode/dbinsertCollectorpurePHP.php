<?php
require 'connectdb.php';

$strSQL = "SELECT prelim_id,numberofcollector,precollector_collid FROM preinsertcollector ";
$strSQL .= "WHERE prelim_id < 3000";

$objQuery = pg_query($strSQL);
/*  find coll_id insert into preinsertcollector (   precollector_collid) */
while ($row = pg_fetch_array($objQuery)) {
    extract($row);

    if ($numberofcollector <= 6) {
        for ($xy = 1; $xy <= $numberofcollector; $xy++) {
            if ($xy == 6) {
                $strSQL06 = "SELECT CONCAT(collector_firstname_en,' ',collector_lastname_en) as collname,collector_id,collectorsame06,numberofcollector
FROM preinsertcollector LEFT JOIN
collector ON CONCAT(collector_firstname_en,' ',collector_lastname_en) = preinsertcollector.collectorsame06 ";
                $strSQL06 .= " WHERE numberofcollector = " . $numberofcollector . " AND    precollector_collid = " . $precollector_collid;
                $objQuery06 = pg_query($strSQL06);
                $row06      = pg_fetch_array($objQuery06);
                extract($row06);
/*
echo $prelim_id . " " . $collector_id . " " . $collname;
echo "<br>";
 */
                $strSQLex06 = "INSERT INTO collection_has_collector ";
                $strSQLex06 .= "(collection_coll_id ,collectorseq,  collector_collector_id)";
                $strSQLex06 .= "VALUES ";
                $strSQLex06 .= "('" . $precollector_collid . "'," . $xy . "," . $collector_id . ")";
                $objQuerexy06 = pg_query($strSQLex06);

            }
            if ($xy == 5) {
                $strSQL05 = "SELECT CONCAT(collector_firstname_en,' ',collector_lastname_en) as collname,collector_id,collectorsame05,numberofcollector
FROM preinsertcollector LEFT JOIN
collector ON CONCAT(collector_firstname_en,' ',collector_lastname_en) = preinsertcollector.collectorsame05 ";
                $strSQL05 .= " WHERE numberofcollector = " . $numberofcollector . " AND    precollector_collid = " . $precollector_collid;
                $objQuery05 = pg_query($strSQL05);
                $row05      = pg_fetch_array($objQuery05);
                extract($row05);

                $strSQLex05 = "INSERT INTO collection_has_collector ";
                $strSQLex05 .= "(collection_coll_id ,collectorseq,  collector_collector_id)";
                $strSQLex05 .= "VALUES ";
                $strSQLex05 .= "('" . $precollector_collid . "'," . $xy . "," . $collector_id . ")";
                $objQuerexy05 = pg_query($strSQLex05);

            }
            if ($xy == 4) {
                $strSQL04 = "SELECT CONCAT(collector_firstname_en,' ',collector_lastname_en) as collname,collector_id,collectorsame04,numberofcollector
FROM preinsertcollector LEFT JOIN
collector ON CONCAT(collector_firstname_en,' ',collector_lastname_en) = preinsertcollector.collectorsame04 ";
                $strSQL04 .= " WHERE numberofcollector = " . $numberofcollector . " AND    precollector_collid = " . $precollector_collid;
                $objQuery04 = pg_query($strSQL04);
                $row04      = pg_fetch_array($objQuery04);
                extract($row04);

                $strSQLex04 = "INSERT INTO collection_has_collector ";
                $strSQLex04 .= "(collection_coll_id ,collectorseq,  collector_collector_id)";
                $strSQLex04 .= "VALUES ";
                $strSQLex04 .= "('" . $precollector_collid . "'," . $xy . "," . $collector_id . ")";
                $objQueryex04 = pg_query($strSQLex04);
            }
            if ($xy == 3) {
                $strSQL03 = "SELECT CONCAT(collector_firstname_en,' ',collector_lastname_en) as collname,collector_id,collectorsame03,numberofcollector
FROM preinsertcollector LEFT JOIN
collector ON CONCAT(collector_firstname_en,' ',collector_lastname_en) = preinsertcollector.collectorsame03 ";
                $strSQL03 .= " WHERE numberofcollector = " . $numberofcollector . " AND    precollector_collid = " . $precollector_collid;
                $objQuery03 = pg_query($strSQL03);
                $row03      = pg_fetch_array($objQuery03);
                extract($row03);

                $strSQLex03 = "INSERT INTO collection_has_collector ";
                $strSQLex03 .= "(collection_coll_id ,collectorseq,  collector_collector_id)";
                $strSQLex03 .= "VALUES ";
                $strSQLex03 .= "('" . $precollector_collid . "'," . $xy . "," . $collector_id . ")";
                $objQueryex03 = pg_query($strSQLex03);

            } else if ($xy == 2) {

                $strSQL02 = "SELECT CONCAT(collector_firstname_en,' ',collector_lastname_en) as collname,collector_id ,collectorsame02,numberofcollector,   precollector_collid
FROM preinsertcollector LEFT JOIN
collector ON CONCAT(collector_firstname_en,' ',collector_lastname_en) = preinsertcollector.collectorsame02 ";
                $strSQL02 .= " WHERE numberofcollector = " . $numberofcollector . " AND  precollector_collid = " . $precollector_collid;
                $objQuery02 = pg_query($strSQL02);
                $row02      = pg_fetch_array($objQuery02);
                extract($row02);
                $strSQLex2 = "INSERT INTO collection_has_collector ";
                $strSQLex2 .= "(collection_coll_id ,collectorseq,  collector_collector_id)";
                $strSQLex2 .= "VALUES ";
                $strSQLex2 .= "('" . $precollector_collid . "'," . $xy . "," . $collector_id . ")";
                $objQueryex2 = pg_query($strSQLex2);

            } else if ($xy == 1) {
                $strSQL01 = "SELECT CONCAT(collector_firstname_en,' ',collector_lastname_en) as collname,collector_id ,collectorsame01,numberofcollector,   precollector_collid
FROM preinsertcollector LEFT JOIN
collector ON CONCAT(collector_firstname_en,' ',collector_lastname_en) = preinsertcollector.collectorsame01 ";
                $strSQL01 .= " WHERE numberofcollector = " . $numberofcollector . " AND  precollector_collid = " . $precollector_collid;
                $objQuery01 = pg_query($strSQL01);
                $row01      = pg_fetch_array($objQuery01);
                extract($row01);

                $strSQLex01 = "INSERT INTO collection_has_collector ";
                $strSQLex01 .= "(collection_coll_id ,collectorseq,  collector_collector_id)";
                $strSQLex01 .= "VALUES ";
                $strSQLex01 .= "('" . $precollector_collid . "'," . $xy . "," . $collector_id . ")";
                $objQueryex01 = pg_query($strSQLex01);
            }
        }

    } else {

        echo $numberofcollector;
    }

}
