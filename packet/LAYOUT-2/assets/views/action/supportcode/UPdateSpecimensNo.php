<?php

require 'connectdb.php';

$strSQL = "select * from specimens ";
$strSQL .= "LEFT JOIN collection ON specimens.collection_coll_id = collection.coll_id ";
$strSQL .= "LEFT JOIN collection_code ON collection_code.collection_code_id = collection.collection_code_collection_code_id ";
$strSQL .= "WHERE specimens_id >= 36727";

$objQuery = pg_query($strSQL);
 
while ($row01 = pg_fetch_array($objQuery)) {
    extract($row01);


    $collectionnumber_full_STR    = sprintf('%04d', $coll_number);
    $specimensnumber_full_STR    = sprintf('%04d', $specimens_number);

    $newspecimensid = $collection_code."-".$coll_year."-".$collectionnumber_full_STR."-".$specimensnumber_full_STR;
    /*
    echo $newspecimensid;
    echo "<br>";
    */


    $strSQL03 = "UPDATE specimens SET ";
    $strSQL03 .= "specimens_full_number = '" . $newspecimensid . "' ";
    $strSQL03 .= "WHERE specimens_id   = '" . $specimens_id . "'";

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
