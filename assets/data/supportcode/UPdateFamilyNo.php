<?php

require 'connectdb.php';

$strSQL = "SELECT torder_name,torder_id,family_id,family_name from family ";
$strSQL .= "LEFT JOIN torder on torder.torder_id = family.torder_torder_id ";


$objQuery = pg_query($strSQL);

while ($row01 = pg_fetch_array($objQuery)) {
    extract($row01); 

    $strSQL03 = "UPDATE pretaxa SET ";
    $strSQL03 .= "pretaxafamily_id = '" . $family_id . "' ";
    $strSQL03 .= "WHERE pretaxaorder_id   = '" . $torder_id . "'";
    $strSQL03 .= "AND pretaxafamily ILIKE '" . $family_name . "'";

    $objQuery03 = pg_query($strSQL03);

}
