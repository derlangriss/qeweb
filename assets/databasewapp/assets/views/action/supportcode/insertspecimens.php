<?php

require 'connectdb.php';

$strSQL = "select coll_id,coll_full_id,coll_code,coll_year,coll_number,specimenquality from prepurecollid
left join collection on collection.coll_code = prepurecollid.prepurecollcode 
and collection.coll_year = prepurecollid.prepurecollyear and collection.coll_number = prepurecollid.prepurecollnumber";
$strSQL .= " Order by coll_id";
$objQuery = pg_query($strSQL);

while ($row01 = pg_fetch_array($objQuery)) {
    extract($row01);  

    for ($i = 1; $i <= $specimenquality; $i++) {
        
        $specimens_numberplus  = $i;
        $specimens_full_STR    = sprintf('%04d', $specimens_numberplus);
        $specimens_full_number = $coll_code . "-" . $coll_year . "-" . $coll_number . "-" . $specimens_full_STR;
        $strSQL01                = "INSERT INTO specimens ";
        $strSQL01 .= "(collection_coll_id,specimens_number,specimens_full_number)";
        $strSQL01 .= "VALUES ";
        $strSQL01 .= "('" . $coll_id . "','" . $specimens_numberplus . "','" . $specimens_full_number . "')";
        $objQuery01 = pg_query($strSQL01);
        
    }





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
