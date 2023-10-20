<?php

require 'connectdb.php';

$strSQL = "select * ";
$strSQL .= "from pretaxa ";
$strSQL .= "left join torder on  pretaxa.pretaxaorder_id = torder.torder_id ";

$strSQL .= "order by pretaxa_id ";

$objQuery = pg_query($strSQL);
while ($row = pg_fetch_array($objQuery)) {
    extract($row);

    $strSQL01 = "SELECT * FROM pretaxa ";
    $strSQL01 .= "left join torder on pretaxa.pretaxaorder_id = torder.torder_id  ";
    $strSQL01 .= "LEFT JOIN family on family.torder_torder_id = torder.torder_id  ";
    $strSQL01 .= " where pretaxa_id = " . $pretaxa_id . " AND torder_id = " . $torder_id." AND family_name ILIKE '".$pretaxafamily."'";

    $objQuery01 = pg_query($strSQL01);
    $row01      = pg_fetch_array($objQuery01);
    extract($row01);

    echo $pretaxa_id." ".$family_id." ".$family_name." ".$torder_id." ".$torder_name;
    echo "<br>";

    /*$strSQL03 = "UPDATE pretaxa SET ";
    $strSQL03 .= "pretaxafamily_id = '" . $family_id . "' ";
    $strSQL03 .= "WHERE pretaxaorder_id   = '" . $torder_id . "'";
    $strSQL03 .= "AND pretaxa_id =" . $pretaxa_id;
    $objQuery03 = pg_query($strSQL03);*/

}
