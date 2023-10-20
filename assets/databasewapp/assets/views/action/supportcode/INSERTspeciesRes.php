<?php
require 'connectdb.php';

/** update prespecies **/

/*
$strSQL = "select DISTINCT(pretaxaspecies) as prespecies,species_id,pretaxagenus_id,pretaxagenus,pretaxafamily,pretaxaorder from pretaxa  ";
$strSQL .= "left join species on species.species_name = pretaxa.pretaxaspecies ";
$strSQL .= "where species_id IS NULL";
$strSQL .= " order by prespecies asc";


$objQuery = pg_query($strSQL);
 
while ($row01 = pg_fetch_array($objQuery)) {
    extract($row01);
    echo $prespecies." ".$pretaxagenus." ".$pretaxafamily." ".$pretaxaorder;
    echo "<br>";

    $strSQL03 = "INSERT INTO species ";
    $strSQL03 .= "(species_name,genus_genus_id)";
    $strSQL03 .= "VALUES ";
    $strSQL03 .= "('" . $prespecies . "', '".$pretaxagenus_id."')";

    $objQuery03 = pg_query($strSQL03);


}
*/




/** update prespecies 
$strSQL = "select DISTINCT(prespeciesgenus_name) as pregenus,genus_id,prespecies_id from prespecies
left join genus on prespecies.prespeciesgenus_name = genus.genus_name
where prespecies_id > 0
order by prespecies_id";

$objQuery = pg_query($strSQL);

while ($row01 = pg_fetch_array($objQuery)) {
    extract($row01);


$strSQL03 = "UPDATE prespecies SET ";
$strSQL03 .= "prespeciesgenus_id = '" . $genus_id . "' ";
$strSQL03 .= "WHERE prespecies_id   = '" . $prespecies_id . "'";

$objQuery03 = pg_query($strSQL03);

}
**/

/** insert species **/
/**
$strSQL = "SELECT * FROM prespecies ORDER BY prespecies_id ASC";

$objQuery = pg_query($strSQL);

while ($row01 = pg_fetch_array($objQuery)) {
    extract($row01);

    echo $prespecies_id." ".$prespecies_name . " " . $prebinomal. " " . $preauthority." ".$preauthority_year . " " . $presub_genus. " " . $pregenus_genus_id." ". $preauthority." ".$preearliername . " " . $preprotected_species_protected_species_id. " " . $preprotected_species_cites_lookup_cites_lookup_id;
    echo "<br>";



$strSQL03 = "INSERT INTO species ";
$strSQL03 .= "(species_name,binomal,authority,authority_year,sub_genus,genus_genus_id,earliername,protected_species_protected_species_id,protected_species_cites_lookup_cites_lookup_id)";
$strSQL03 .= "VALUES ";
$strSQL03 .= "('".$prespecies_name."','".$prebinomal."','".$preauthority."','".$preauthority_year."','".$presub_genus."','".$pregenus_genus_id."','".$preearliername."','".$preprotected_species_protected_species_id."','".$preprotected_species_cites_lookup_cites_lookup_id."')";

$objQuery03 = pg_query($strSQL03);

}
**/