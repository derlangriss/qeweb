<?php

require 'connectdb.php';
$month  = $_GET['month'];
$year   = $_GET['year'];
$userid = $_GET['userid'];

$strSQL = "SELECT * FROM collectionresbox ";
$strSQL .= "WHERE collbox_id <> 0 ";
$strSQL .= "ORDER BY collbox_id ASC ";
$objQuery    = pg_query($strSQL);
$intNumField = pg_num_fields($objQuery);
$resultArray = array();

while ($obResult = pg_fetch_array($objQuery)) {
    extract($obResult);
    $arrCol = array();
    for ($i = 0; $i < $intNumField; $i++) {
        $arrCol[pg_field_name($objQuery, $i)] = $obResult[$i];
    }
    array_push($resultArray, $arrCol);

}
pg_close($conn);

echo json_encode($resultArray);
