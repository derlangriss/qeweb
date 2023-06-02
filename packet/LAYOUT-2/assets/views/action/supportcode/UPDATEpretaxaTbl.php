<?php

require 'connectdb.php';
$unknownname = 'Unknown';
/** UpdateOrderid 

$strSQL = "select * ";
$strSQL .= "from pretaxa ";
$strSQL .= "left join torder on  pretaxa.pretaxaorder_id = torder.torder_id ";


$objQuery = pg_query($strSQL);
while ($row = pg_fetch_array($objQuery)) {
extract($row);

$strSQL01 = "SELECT * FROM pretaxa ";
$strSQL01 .= "left join torder on pretaxa.pretaxaorder_id = torder.torder_id  ";
$strSQL01 .= "LEFT JOIN family on family.torder_torder_id = torder.torder_id  ";
$strSQL01 .= " where pretaxa_id = " . $pretaxa_id . " AND torder_id = " . $torder_id;

$objQuery01 = pg_query($strSQL01);
$row01      = pg_fetch_array($objQuery01);
extract($row01);
echo $pretaxa_id . " " . $torder_id . " " . $torder_name . " " . $family_id . " " . $family_name;
echo "<br>";

$strSQL03 = "UPDATE pretaxa SET ";
$strSQL03 .= "pretaxafamily_id = '" . $family_id . "' ";
$strSQL03 .= "WHERE pretaxaorder_id   = '" . $torder_id . "'";
$strSQL03 .= "AND pretaxa_id =" . $pretaxa_id;
$objQuery03 = pg_query($strSQL03);

}

**/
/** UPDATE pretaxaorder id 


$strSQL = "select pretaxaorder,torder_id,pretaxa_id from pretaxa ";
$strSQL .= "left join torder on pretaxa.pretaxaorder = torder.torder_name ";
$strSQL .= "order by pretaxa_id ";

$objQuery = pg_query($strSQL);
while ($row = pg_fetch_array($objQuery)) {
extract($row);

echo $pretaxaorder . " " . $torder_id . " " . $pretaxa_id;
echo "<br>";

$strSQL03 = "UPDATE pretaxa SET ";
$strSQL03 .= "pretaxaorder_id = '" . $torder_id . "' ";
$strSQL03 .= "WHERE pretaxa_id   = '" . $pretaxa_id . "'";
$objQuery03 = pg_query($strSQL03);

} 
**/
/* UPDATE pretaxafamily id  
$strSQL = "select * from pretaxa ";
$strSQL .= "where pretaxayear = 2006 ";
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
 */
/** UPDATE pretaxagenus id **/


$strSQL = "select * from pretaxa ";
$strSQL .= "where pretaxayear = 2016 ";
$strSQL .= "ORDER BY pretaxa_id ASC ";

$objQuery = pg_query($strSQL);
while ($row = pg_fetch_array($objQuery)) {
extract($row);

$strSQL02 = "select * from genus ";
$strSQL02 .= "left join family on family.family_id = genus.family_family_id ";
$strSQL02 .= "left join torder on torder.torder_id = family.torder_torder_id ";
$strSQL02 .= "where family_id = " . $pretaxafamily_id;
$strSQL02 .= " and torder_id =" . $pretaxaorder_id;
$strSQL02 .= " and genus_name ILIKE '" . $pretaxagenus . "'";

$objQuery02 = pg_query($strSQL02);
$row02      = pg_fetch_array($objQuery02);
$intRows02 = pg_num_rows($objQuery02);
extract($row02); 



    echo $pretaxa_id." ".$pretaxayear." ".$pretaxanumber." ".$pretaxasnumber." ".$pretaxagenus." family ".$pretaxafamily_id." ".$pretaxafamily." ".$pretaxaorder_id." ".$pretaxaorder;
    echo "<br>";
$strSQL03 = "UPDATE pretaxa SET ";
$strSQL03 .= "pretaxagenus_id = '" . $genus_id . "' ";
$strSQL03 .= "WHERE pretaxa_id   = '" . $pretaxa_id . "'";
$objQuery03 = pg_query($strSQL03);


 
}
/*
echo $pretaxa_id . " " . $pretaxafamily_id . " " . $pretaxaorder_id . " " . $pretaxagenus;
echo "<br>";
 */
/*

$strSQL03 = "UPDATE pretaxa SET ";
$strSQL03 .= "pretaxagenus_id = '" . $genus_id . "' ";
$strSQL03 .= "WHERE pretaxa_id   = '" . $pretaxa_id . "'";
$objQuery03 = pg_query($strSQL03);

}
 */



/** UPDATE pretaxaspecies id 


$strSQL = "select * from pretaxa ";
$strSQL .= "ORDER BY pretaxa_id ASC ";

$objQuery = pg_query($strSQL);
while ($row = pg_fetch_array($objQuery)) {
extract($row);

$strSQL02 = "select * from species ";
$strSQL02 .= "left join genus on genus.genus_id = species.genus_genus_id ";
$strSQL02 .= "left join family on family.family_id = genus.family_family_id ";
$strSQL02 .= "left join torder on torder.torder_id = family.torder_torder_id ";
$strSQL02 .= "where family_id = " . $pretaxafamily_id;
$strSQL02 .= " and torder_id =" . $pretaxaorder_id;
$strSQL02 .= " and genus_id =" . $pretaxagenus_id;
$strSQL02 .= " and species_name ILIKE '" . $pretaxaspecies . "'";

$objQuery02 = pg_query($strSQL02);
$row02      = pg_fetch_array($objQuery02);
$intRows02 = pg_num_rows($objQuery02);
extract($row02);


$strSQL03 = "UPDATE pretaxa SET ";
$strSQL03 .= "pretaxaspecies_id = '" . $species_id . "' ";
$strSQL03 .= "WHERE pretaxa_id   = '" . $pretaxa_id . "'";
$objQuery03 = pg_query($strSQL03);

 
}**/