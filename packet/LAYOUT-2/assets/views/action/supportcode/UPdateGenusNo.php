<?php

require 'connectdb.php';

$strSQL = "SELECT pregenus_id,prefamily_name from pregenus ";
$strSQL .= "ORDER BY pregenus_id asc ";
$objQuery = pg_query($strSQL);

while ($row01 = pg_fetch_array($objQuery)) {
    extract($row01);


    $strSQL03 = "SELECT * from pregenus ";
    $strSQL03 .= "LEFT JOIN family on family.family_name = pregenus.prefamily_name ";
    $strSQL03 .= "LEFT JOIN torder on torder.torder_id = family.torder_torder_id ";
    $strSQL03 .= "WHERE pregenus_id = ".$pregenus_id." AND family_name ILIKE '".$prefamily_name."'";
    $objQuery03 = pg_query($strSQL03);

    $row02 = pg_fetch_array($objQuery03);
    extract($row02);
    echo $pregenus_id." ".$prefamily_name." ".$family_id;
    echo "<br>";


    $strSQL04 = "UPDATE pregenus SET ";
    $strSQL04 .= "prefamily_family_id = '" . $family_id . "' ";
    $strSQL04 .= "where pregenus_id = ".$pregenus_id;
    $objQuery04 = pg_query($strSQL04);


}



/*

$strSQL = "SELECT torder_name,torder_id,family_id,family_name,genus_id,genus_name from genus ";
$strSQL .= "LEFT JOIN family on family.family_id = genus.family_family_id ";
$strSQL .= "LEFT JOIN torder on torder.torder_id = family.torder_torder_id ";

$objQuery = pg_query($strSQL);

while ($row01 = pg_fetch_array($objQuery)) {
    extract($row01);

    $strSQL03 = "UPDATE pretaxa SET ";
    $strSQL03 .= "pretaxagenus_id = '" . $genus_id . "' ";
    $strSQL03 .= "WHERE pretaxaorder_id   = '" . $torder_id . "'";
    $strSQL03 .= "AND pretaxafamily_id = '" . $family_id . "'";
    $strSQL03 .= "AND pretaxagenus ILIKE '" . $genus_name . "'";

    $objQuery03 = pg_query($strSQL03);

}
*/