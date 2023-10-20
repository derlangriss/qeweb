<?php
require 'connectdb.php';
/*
$strSQL = "select DISTINCT(prefamily_name) as prefamily,family_id,torder_id,torder_name from prefamilyfdb02 ";
$strSQL .= "left join family on  prefamilyfdb02.prefamily_name = family.family_name ";
$strSQL .= "left join torder on  prefamilyfdb02.pretorder_name = torder.torder_name ";
$strSQL .= "where family_id IS NULL";


$objQuery = pg_query($strSQL); 
 
while ($row01 = pg_fetch_array($objQuery)) {
    extract($row01);


    echo $pretaxaname_id." ".$preordername." ".$prefamilyname." ".$preordername." ".$torder_id;
    echo "<br>";
*/

/*
    $strSQL03 = "INSERT INTO family ";
    $strSQL03 .= "(family_name,torder_torder_id)";
    $strSQL03 .= "VALUES ";
    $strSQL03 .= "('" . $prefamily . "', '".$torder_id."')";

    $objQuery03 = pg_query($strSQL03);*/
    /*
}

*/


/*
$strSQL = "select DISTINCT(pretaxafamily) as prefamily,family_id,pretaxaorder_id from pretaxa  ";
$strSQL .= "left join family on family.family_name = pretaxa.pretaxafamily ";
$strSQL .= "where family_id IS NULL";
$strSQL .= " order by prefamily asc";


$objQuery = pg_query($strSQL);
 
while ($row01 = pg_fetch_array($objQuery)) {
    extract($row01);
    echo $prefamily." ".$pretaxaorder_id;
    echo "<br>";


    $strSQL03 = "INSERT INTO family ";
    $strSQL03 .= "(family_name,torder_torder_id)";
    $strSQL03 .= "VALUES ";
    $strSQL03 .= "('" . $prefamily . "', '".$pretaxaorder_id."')";

    $objQuery03 = pg_query($strSQL03);


}

*/

/**
$strSQL = "select * from pretaxaname ";
$strSQL .= "left join torder on torder.torder_name = pretaxaname.preordername ";
$strSQL .= "Order by pretaxaname_id ";



$objQuery = pg_query($strSQL);
 
while ($row01 = pg_fetch_array($objQuery)) {
    extract($row01);

    echo $pretaxaname_id." ".$preordername." ".$prefamilyname." ".$preordername." ".$torder_id;
    echo "<br>";



    $strSQL03 = "INSERT INTO family ";
    $strSQL03 .= "(family_name,torder_torder_id)";
    $strSQL03 .= "VALUES ";
    $strSQL03 .= "('" . $prefamilyname . "', '".$torder_id."')";

    $objQuery03 = pg_query($strSQL03);
}

**/