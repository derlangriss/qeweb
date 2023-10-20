<?php

require 'connectdb.php';

$strSQL = "select * from prespecnumber ";
$strSQL .= "WHERE  exspecnumber >= 1 ";
$objQuery = pg_query($strSQL);
 
while ($row01 = pg_fetch_array($objQuery)) {
    extract($row01);
    $strSQL01 = "select count(*) AS countspec from prespecnumber ";
    $strSQL01 .= "WHERE  exspecnumber >= 1 and excollyear = " . $excollyear . " and excollnumber =" . $excollnumber;
    $objQuery01 = pg_query($strSQL01);

    $row02 = pg_fetch_array($objQuery01);
    extract($row02);

    $strSQL03 = "UPDATE prepurecollid SET ";
    $strSQL03 .= "specimenquality = '" . $countspec . "' ";
    $strSQL03 .= "WHERE prepurecollyear   = '" . $excollyear . "'";
    $strSQL03 .= " and prepurecollnumber   = '" . $excollnumber . "'";
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
