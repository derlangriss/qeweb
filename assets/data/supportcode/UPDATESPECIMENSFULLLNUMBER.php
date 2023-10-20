<?php

require 'connectdb.php';

$strSQL = "select * from specimens ";
$strSQL .= "left join preins_spec on specimens.collection_coll_id = preins_spec.preins_collid ";
$strSQL .= "where specimens_id >= 38273";

$objQuery = pg_query($strSQL);

while ($row01 = pg_fetch_array($objQuery)) {
    extract($row01);
    $specimens_full_STR = sprintf('%04d', $specimens_number);
    $preinsnumber_full_STR = sprintf('%04d', $preinsnumber);
    $specfullnum        = 'QSBG' . "-" . $preinsyear . "-" . $preinsnumber_full_STR . "-" . $specimens_full_STR;
    echo $specfullnum." ".$preins_collid;
    echo "<br>";

    $strSQL03 = "UPDATE specimens SET ";
    $strSQL03 .= "specimens_full_number = '" . $specfullnum . "' ";
  
    $strSQL03 .= "where specimens_id   = '" . $specimens_id . "'";
    $Result03 = pg_query($strSQL03);


}

/*
$strSQL = "select coll_code,coll_year,coll_number,specimens_number,coll_id,specimens_id from specimens";
$strSQL .= "left join collection on  collection.coll_id = specimens.collection_coll_id ";
$strSQL .= "where specimens_id >= 38293";

$objQuery = pg_query($strSQL);

while ($row01 = pg_fetch_array($objQuery)) {
extract($row01);

$strSQL03 = "UPDATE specimens SET ";
$strSQL03 .= "specimens_full_number = '" . $specfullnumber . "' ";
$strSQL03 .= "collection_coll_id   = '" . $coll_id . "'";
$strSQL03 .= "where specimens_id   = '" . $specimens_id . "'";
$Result03 = pg_query($strSQL03);

$objQuery03 = pg_query($Result03);

}
 */
