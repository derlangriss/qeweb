<?php

require 'connectdb.php';

$strSQL = "SELECT DISTINCT CONCAT(EXTRACT(MONTH FROM lockbox_mreport),'-',EXTRACT(YEAR FROM lockbox_mreport)) AS a , ";
$strSQL .= "EXTRACT(MONTH FROM lockbox_mreport) AS b , EXTRACT(YEAR FROM lockbox_mreport) AS c ";
$strSQL .= "FROM userlockbox ";
$strSQL .= "order by c desc,b asc ";

$objQuery    = pg_query($strSQL);
$intNumField = pg_num_fields($objQuery);
$resultArray = array();
while ($obResult = pg_fetch_array($objQuery)) {
    extract($obResult);

    $arrCol = array();
    for ($i = 0; $i < $intNumField; $i++) {
        $arrCol[pg_field_name($objQuery, $i)] = $obResult[$i];
    }

    $strSQLex = "SELECT * from userlockbox ";
    $strSQLex .= "LEFT JOIN collectionresbox on userlockbox.lockbox_boxid = collectionresbox.collbox_id ";
    $strSQLex .= "LEFT JOIN boxstatus on userlockbox.lockbox_boxstatus = boxstatus.boxstatus_id ";
    $strSQLex .= "LEFT JOIN box_location on userlockbox.lockbox_boxplaceid = box_location.boxlocate_id ";
    $strSQLex .= "WHERE CONCAT(EXTRACT(MONTH FROM lockbox_mreport),'-',EXTRACT(YEAR FROM lockbox_mreport)) = '" . $a . "'";

    $objQueryex    = pg_query($strSQLex);
    $resultArrayex = array();
    $intNumFieldex = pg_num_fields($objQueryex);
    while ($obResultex = pg_fetch_array($objQueryex)) {
        $arrColex = array();
        for ($i = 0; $i < $intNumFieldex; $i++) {
            $arrColex[pg_field_name($objQueryex, $i)] = $obResultex[$i];
        }

        array_push($resultArrayex, $arrColex);
        $arrCol['boxlist'] = $resultArrayex;

    }
    array_push($resultArray, $arrCol);
}

pg_close($conn);

echo json_encode($resultArray);
