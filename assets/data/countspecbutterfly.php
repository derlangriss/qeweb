<?php

require 'connectdb02.php';

$resultArray = array();

$strSQL01 = "SELECT count(idspecies) AS countspecies FROM species ";
$objQuery01 = pg_query($conn,$strSQL01);

$row01 = pg_fetch_array($objQuery01);
extract($row01);

$strSQL02 = "SELECT COUNT(DISTINCT(genus.idgenus)) AS countgenus FROM species ";
$strSQL02 .= "left join genus on species.idgenus = genus.idgenus ";
$strSQL02 .= "left join family on genus.idfamily = family.idfamily ";
$objQuery02 = pg_query($conn,$strSQL02);

$row02 = pg_fetch_array($objQuery02);
extract($row02);

$strSQL03 = "SELECT COUNT(DISTINCT(family.idfamily)) AS countfamily FROM species ";
$strSQL03 .= "left join genus on species.idgenus = genus.idgenus ";
$strSQL03 .= "left join family on genus.idfamily = family.idfamily ";
$objQuery03 = pg_query($conn,$strSQL03);

$row03 = pg_fetch_array($objQuery03);
extract($row03);


$arr = array('success' => '1', 'countspecies' => $countspecies, 'countgenus' => $countgenus, 'countfamily' => $countfamily);
array_push($resultArray, $arr);

echo json_encode($resultArray);
