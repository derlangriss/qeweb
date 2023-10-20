<?php
require_once 'libs/lgalookuplib.php';
require 'connectdb.php';

for ($x = 9396; $x <= 9451; $x++) {
    $strSQL = "SELECT coll_lat_dec,coll_long_dec FROM collection ";
    $strSQL .= "WHERE coll_id   = " . $x;
    $objQuery = pg_query($strSQL);
    $row01    = pg_fetch_array($objQuery);
    extract($row01);

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


}


