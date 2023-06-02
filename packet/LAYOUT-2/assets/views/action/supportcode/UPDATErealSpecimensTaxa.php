<?php

require 'connectdb.php';
/*
$strSQL = "select * from pretaxa as a";
$strSQL .= " left join collection as b on a.pretaxacode = b.coll_code and a.pretaxayear = b.coll_year and  a.pretaxanumber = b.coll_number";

$strSQL .= " order by b.coll_id";
$objQuery = pg_query($strSQL);

while ($row01 = pg_fetch_array($objQuery)) {
    extract($row01);
    echo $pretaxa_id." ".$pretaxacode."-".$pretaxayear."-".$pretaxanumber;
    echo "<br>";

    $strSQL03 = "UPDATE pretaxa SET ";
    $strSQL03 .= "pretaxa_collid = '" . $coll_id . "' ";
    $strSQL03 .= "WHERE pretaxa_id   = '" . $pretaxa_id . "'";

    $objQuery03 = pg_query($strSQL03);
}*/

$strSQL = "select * from pretaxa as a";
$strSQL .= " left join specimens as b on a.pretaxa_collid = b.collection_coll_id and a.pretaxasnumber = b.specimens_number";
$strSQL .= " where specimens_id IS NOT NULL";
$strSQL .= " order by a.pretaxa_id";

$objQuery = pg_query($strSQL);

while ($row01 = pg_fetch_array($objQuery)) {
    extract($row01);
    echo $pretaxa_id." ".$pretaxaspecies_id." ".$specimens_id."-".$specimens_full_number;
    echo "<br>";

    $strSQL03 = "UPDATE specimens SET ";
    $strSQL03 .= "species_species_id = '" . $pretaxaspecies_id . "' ";
    $strSQL03 .= "WHERE specimens_id   = '" . $specimens_id . "'";
    $objQuery03 = pg_query($strSQL03);
}