<?php
require 'connectdb.php';

/**

$strSQL = "select DISTINCT(pretaxagenus) as pregenus,genus_id,pretaxafamily_id from pretaxa  ";
$strSQL .= "left join genus on genus.genus_name = pretaxa.pretaxagenus ";
$strSQL .= "where genus_id IS NULL";
$strSQL .= " order by pregenus asc";


$objQuery = pg_query($strSQL);
 
while ($row01 = pg_fetch_array($objQuery)) {
    extract($row01);
    echo $pregenus." ".$pretaxafamily_id;
    echo "<br>";

    $strSQL03 = "INSERT INTO genus ";
    $strSQL03 .= "(genus_name,family_family_id)";
    $strSQL03 .= "VALUES ";
    $strSQL03 .= "('" . $pregenus . "', '".$pretaxafamily_id."')";

    $objQuery03 = pg_query($strSQL03);


}
**/


/** update pregenus
$strSQL = "select DISTINCT(prefamily_name) as prefamily,family_id,pregenus_id from pregenus
left join family on pregenus.prefamily_name = family.family_name
where pregenus_id > 0
order by pregenus_id";

$objQuery = pg_query($strSQL);

while ($row01 = pg_fetch_array($objQuery)) {
extract($row01);
echo $family_id." ".$pregenus_id;
echo "<br>";

$strSQL03 = "UPDATE pregenus SET ";
$strSQL03 .= "prefamily_family_id = '" . $family_id . "' ";
$strSQL03 .= "WHERE pregenus_id   = '" . $pregenus_id . "'";

$objQuery03 = pg_query($strSQL03);

}
 **/

/** insert genus 

$strSQL = "SELECT * FROM pregenus ORDER BY pregenus_id ASC";

$objQuery = pg_query($strSQL);

while ($row01 = pg_fetch_array($objQuery)) {
    extract($row01);

    echo $pregenus_id." ".$pregenus_name . " " . $presub_family. " " . $prefamily_family_id;
    echo "<br>";



$strSQL03 = "INSERT INTO genus ";
$strSQL03 .= "(genus_name,sub_family,family_family_id)";
$strSQL03 .= "VALUES ";
$strSQL03 .= "('".$pregenus_name."','".$presub_family."','".$prefamily_family_id."')";

$objQuery03 = pg_query($strSQL03);

}
**/