<?php

require 'connectdb.php';

$strSQL = "select * from specimensbox ";
$strSQL .= "WHERE  spec_box_id <> 0 ";
$strSQL .= "ORDER BY spec_box_id";
$objQuery = pg_query($strSQL);

while ($obResult = pg_fetch_array($objQuery)) {
    extract($obResult);
    $mixcode = "SP" . sprintf('%05d', $spec_box_id);

    $strSQL04 = "UPDATE specimensbox SET ";
    $strSQL04 .= "spec_box_code ='".$mixcode."'";
    $strSQL04 .= "where spec_box_id =".$spec_box_id;
   
    $Result04 = pg_query($strSQL04);

}

pg_close($conn);
