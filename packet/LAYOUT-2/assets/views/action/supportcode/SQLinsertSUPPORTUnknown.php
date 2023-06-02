<?php
require 'connectdb.php';
$unknownname = 'Unknown';

$strSQL01   = "SELECT * FROM torder";
$objQuery01 = pg_query($strSQL01);

while ($row01 = pg_fetch_array($objQuery01)) {
    extract($row01);

    $strSQL02 = "SELECT * FROM family LEFT JOIN torder on torder.torder_id = family.torder_torder_id";
    $strSQL02 .= " WHERE family_name ilike '" . $unknownname . "' AND torder_id =" . $torder_id;
    $objQuery02 = pg_query($strSQL02);

    while ($row02 = pg_fetch_array($objQuery02)) {
        extract($row02);

        $strSQL04 = "SELECT * FROM genus ";
        $strSQL04 .= "LEFT JOIN family on family.family_id = genus.family_family_id ";
        $strSQL04 .= "LEFT JOIN torder on torder.torder_id = family.torder_torder_id ";
        $strSQL04 .= "WHERE genus_name ilike '" . $unknownname . "' AND family_id =" . $family_id;
        $objQuery04 = pg_query($strSQL04);
        $intRows04  = pg_num_rows($objQuery04);

        while ($row04 = pg_fetch_array($objQuery04)) {
            extract($row04);

            echo $torder_id." ".$family_id;
            echo "<br>";

        }

    }

}
