<?php

require 'connectdb.php';
$unknownname = 'Unknown';

/** UPDATE pretaxaorder id **/


$strSQL = "select * from pretaxa ";
$strSQL .= "where pretaxayear = 2014 ";
$strSQL .= "ORDER BY pretaxa_id ASC ";


$objQuery = pg_query($strSQL);
while ($row = pg_fetch_array($objQuery)) {
    extract($row);
    echo $pretaxa_id." ".$pretaxayear." ".$pretaxanumber." ".$pretaxasnumber." ".$pretaxafamily." ".$pretaxaorder_id." ".$pretaxaorder;

    $strSQL02 = "select * from family ";
    $strSQL02 .= "left join torder on torder.torder_id = family.torder_torder_id ";
    $strSQL02 .= "where torder_id = " . $pretaxaorder_id;
    $strSQL02 .= " and family_name ILIKE '" . $pretaxafamily . "'";

    $objQuery02 = pg_query($strSQL02);
    $intRows         = pg_num_rows($objQuery02);
    

    $row02 = pg_fetch_array($objQuery02);
    extract($row02);
    echo $pretaxa_id . " " . $torder_id . " " . $torder_name . " " . $family_id . " " . $family_name;
    echo "<br>";

    $strSQL03 = "UPDATE pretaxa SET ";
    $strSQL03 .= "pretaxafamily_id = '" . $family_id . "' ";
    $strSQL03 .= "WHERE pretaxa_id   = '" . $pretaxa_id . "'";
    $objQuery03 = pg_query($strSQL03);

}
