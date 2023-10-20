<?php

require 'connectdb.php';

$strSQL = "select * from collection ";

$objQuery = pg_query($strSQL);

while ($row01 = pg_fetch_array($objQuery)) {
    extract($row01);

    
    $collectionnumber_full_STR  = sprintf('%04d', $coll_number);

    $newcollectionid = $coll_code . "-" . $coll_year . "-" . $collectionnumber_full_STR;
    /*
    echo $newspecimensid;
    echo "<br>";
     */

    $strSQL03 = "UPDATE collection SET ";
    $strSQL03 .= "coll_full_id = '" . $newcollectionid . "' ";
    $strSQL03 .= "WHERE coll_id   = '" . $coll_id . "'";

    $objQuery03 = pg_query($strSQL03);

}

/*
$queryplace = lookuplga(lookupthaigeo($coll_long_dec, $coll_lat_dec));

while ($row02 = pg_fetch_array($queryplace)) {
extract($row02);
}

$strSQL = "UPDATE collection SET ";
$strSQL .= "amphur_amphur_id = '" . $amphur_id . "' ";
$strSQL .= ",tambon_tambon_id = '" . $tambon_id . "' ";
$strSQL .= ",tambon_direct_tambon_direct_id = '" . $amphur_id . "' ";
$strSQL .= ",amphur_direct_amphur_direct_id = '" . $tambon_id . "' ";
$strSQL .= "WHERE coll_id   = '" . $x . "'";
$objQuery = pg_query($strSQL);

 */
