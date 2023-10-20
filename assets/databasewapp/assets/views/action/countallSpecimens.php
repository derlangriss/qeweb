<?php

require 'connectdb.php';

$resultArray = array();

$strSQL01 = "SELECT count(specimens_id) AS countspecall FROM specimens ";
$strSQL01 .= "where specimens_trash = 1 ";
$objQuery01 = pg_query($conn,$strSQL01);

$row01 = pg_fetch_array($objQuery01);
extract($row01);

$strSQL02 = "SELECT COUNT(DISTINCT(torder_id)) AS countorder FROM specimens ";
$strSQL02 .= "left join species on specimens.species_species_id  = species.species_id ";
$strSQL02 .= "left join genus on species.genus_genus_id = genus.genus_id ";
$strSQL02 .= "left join family on genus.family_family_id = family.family_id ";
$strSQL02 .= "left join torder on family.torder_torder_id = torder.torder_id ";
$strSQL02 .= "where specimens_trash = 1 and torder_id <> 0 ";
$objQuery02 = pg_query($conn,$strSQL02);

$row02 = pg_fetch_array($objQuery02);
extract($row02);

$strSQL03 = "SELECT COUNT(DISTINCT(torder_id)) AS countorder FROM specimens ";
$strSQL03 .= "left join species on specimens.species_species_id  = species.species_id ";
$strSQL03 .= "left join genus on species.genus_genus_id = genus.genus_id ";
$strSQL03 .= "left join family on genus.family_family_id = family.family_id ";
$strSQL03 .= "left join torder on family.torder_torder_id = torder.torder_id ";
$strSQL03 .= "where specimens_trash = 1 and torder_id <> 0 ";
$objQuery03 = pg_query($conn,$strSQL03);

$row03 = pg_fetch_array($objQuery03);
extract($row03);

$strSQL04 = "SELECT COUNT(DISTINCT(family_id)) AS countfamily FROM specimens ";
$strSQL04 .= "left join species on specimens.species_species_id  = species.species_id ";
$strSQL04 .= "left join genus on species.genus_genus_id = genus.genus_id ";
$strSQL04 .= "left join family on genus.family_family_id = family.family_id ";
$strSQL04 .= "left join torder on family.torder_torder_id = torder.torder_id ";
$strSQL04 .= "where specimens_trash = 1 and family_name <> 'Unknown' ";
$objQuery04 = pg_query($conn,$strSQL04);

$row04 = pg_fetch_array($objQuery04);
extract($row04);

$strSQL05 = "SELECT COUNT(DISTINCT(genus_id)) AS countgenus FROM specimens ";
$strSQL05 .= "left join species on specimens.species_species_id  = species.species_id ";
$strSQL05 .= "left join genus on species.genus_genus_id = genus.genus_id ";
$strSQL05 .= "left join family on genus.family_family_id = family.family_id ";
$strSQL05 .= "left join torder on family.torder_torder_id = torder.torder_id ";
$strSQL05 .= "where specimens_trash = 1 and genus_name <> 'Unknown' ";
$objQuery05 = pg_query($conn,$strSQL05);

$row05 = pg_fetch_array($objQuery05);
extract($row05);

$strSQL06 = "SELECT count(DISTINCT species_id) AS countspecies FROM specimens ";
$strSQL06 .= "left join species on specimens.species_species_id  = species.species_id ";
$strSQL06 .= "left join genus on species.genus_genus_id = genus.genus_id ";
$strSQL06 .= "left join family on genus.family_family_id = family.family_id ";
$strSQL06 .= "left join torder on family.torder_torder_id = torder.torder_id ";
$strSQL06 .= "where specimens_trash = 1 and species_name <> 'Unknown' ";


$objQuery06 = pg_query($conn,$strSQL06);

$row06 = pg_fetch_array($objQuery06);
extract($row06);

$arr = array('success' => '1', 'countspecall' => $countspecall, 'countorder' => $countorder, 'countfamily' => $countfamily, 'countgenus' => $countgenus, 'countspecies' => $countspecies);
array_push($resultArray, $arr);

echo json_encode($resultArray);
