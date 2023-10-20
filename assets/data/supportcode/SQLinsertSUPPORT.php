<?php
require 'connectdb.php';
$unknownname = 'Unknown';

for ($x = 1; $x <= 35; $x++) {

    $strSQL = "SELECT * FROM family LEFT JOIN torder on torder.torder_id = torder_torder_id";
    $strSQL .= " WHERE family_name ilike '".$unknownname."' AND torder_id =" . $x;
    $objQuery = pg_query($strSQL);
    $intRows  = pg_num_rows($objQuery);

    if ($intRows == 0) {
 
        $strSQL = "INSERT INTO family ";
        $strSQL .= "(family_name ,torder_torder_id)";
        $strSQL .= "VALUES ";
        $strSQL .= "('" . $unknownname . "'," . $x . ")";
        $objQuery = pg_query($strSQL);
    }
    

}
