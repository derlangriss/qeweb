<?php
require 'connectdb.php';
$unknownname = 'Unknown';

/**
$strSQL   = "SELECT * FROM torder ";
$strSQL   .= "WHERE torder_name ILIKE '".$unknownname."' ";
$objQuery = pg_query($strSQL);

while ($row = pg_fetch_array($objQuery)) {
extract($row);


echo $torder_id;


}
 **/ 

/**
$strSQL01 = "SELECT * FROM torder";
$strSQL01 .= " ORDER BY torder_id asc";
$objQuery01 = pg_query($strSQL01);

while ($row01 = pg_fetch_array($objQuery01)) {
extract($row01);

$strSQL02 = "SELECT * FROM family LEFT JOIN torder on torder.torder_id = family.torder_torder_id";
$strSQL02 .= " WHERE family_name ilike '" . $unknownname . "' AND torder_id =" . $torder_id;

$objQuery02 = pg_query($strSQL02);

$intRows02 = pg_num_rows($objQuery02);

if ($intRows02 == 0) {
echo $torder_id . " " . $torder_name;
echo "<br>";

$strSQL03 = "INSERT INTO family ";
$strSQL03 .= "(family_name ,torder_torder_id)";
$strSQL03 .= "VALUES ";
$strSQL03 .= "('" . $unknownname . "'," . $torder_id . ")";
$objQuery03 = pg_query($strSQL03);

} else {

}

} 
**/

/**
$strSQL01 = "SELECT * FROM family";
$strSQL01 .= " LEFT JOIN torder on torder.torder_id = family.torder_torder_id";
$strSQL01 .= " ORDER BY family_id asc";
$objQuery01 = pg_query($strSQL01);

while ($row01 = pg_fetch_array($objQuery01)) {
    extract($row01);

    $strSQL02 = "SELECT * FROM genus LEFT JOIN family on family.family_id = genus.family_family_id";
    $strSQL02 .= " LEFT JOIN torder on torder.torder_id = family.torder_torder_id";
    $strSQL02 .= " WHERE genus_name ILIKE '" . $unknownname . "' AND family_id =" . $family_id. " AND torder_id =" . $torder_id;

    $objQuery02 = pg_query($strSQL02);
    $intRows02  = pg_num_rows($objQuery02);

    if ($intRows02 == 0) {
        $strSQL03 = "INSERT INTO genus ";
        $strSQL03 .= "(genus_name ,family_family_id)";
        $strSQL03 .= "VALUES ";
        $strSQL03 .= "('" . $unknownname . "'," . $family_id . ")";
        $objQuery03 = pg_query($strSQL03);
        


    } else {

         echo "<br>";
         echo "yes ";
         echo $torder_name." ".$family_id." ".$family_name;
         echo "<br>";


    }

}

**/


$strSQL01 = "SELECT * FROM genus";
$strSQL01 .= " LEFT JOIN family on family.family_id = genus.family_family_id";
$strSQL01 .= " LEFT JOIN torder on torder.torder_id = family.torder_torder_id";
$strSQL01 .= " ORDER BY genus_id asc";
$objQuery01 = pg_query($strSQL01);

while ($row01 = pg_fetch_array($objQuery01)) {
    extract($row01);

    $strSQL02 = "SELECT * FROM species ";
    $strSQL02 .= " LEFT JOIN genus on genus.genus_id = species.genus_genus_id";
    $strSQL02 .= " LEFT JOIN family on family.family_id = genus.family_family_id";
    $strSQL02 .= " LEFT JOIN torder on torder.torder_id = family.torder_torder_id";
    $strSQL02 .= " WHERE species_name ILIKE '" . $unknownname . "' AND family_id =" . $family_id. " AND torder_id =" . $torder_id. " AND genus_id =" . $genus_id;

    $objQuery02 = pg_query($strSQL02);
    $intRows02  = pg_num_rows($objQuery02);

    if ($intRows02 == 0) {
        echo $genus_id;
        echo "<br>";       
        $strSQL03 = "INSERT INTO species ";
        $strSQL03 .= "(species_name ,genus_genus_id)";
        $strSQL03 .= "VALUES ";
        $strSQL03 .= "('" . $unknownname . "'," . $genus_id . ")";
        $objQuery03 = pg_query($strSQL03);
    } else {

    }

}
