<?php

require 'connectdb.php';

$strSQL = "SELECT DISTINCT(pretaxagenus),pretaxa_id,family_id,torder_id,torder_name,pretaxaorder_id,genus_name,genus_id,pretaxayear,pretaxanumber,pretaxasnumber from pretaxa ";
$strSQL .= "left join torder on  pretaxa.pretaxaorder_id = torder.torder_id ";
$strSQL .= "left join family on family.family_name = pretaxa.pretaxafamily ";
$strSQL .= "left join genus on genus.genus_name = pretaxa.pretaxagenus ";
$strSQL .= "where genus_id IS NULL ";
$strSQL .= "group by family_id,torder_id,pretaxafamily,pretaxaorder_id,pretaxayear,pretaxanumber,pretaxasnumber,genus_name,genus_id,pretaxagenus,pretaxa_id ";

$objQuery = pg_query($strSQL);

while ($row01 = pg_fetch_array($objQuery)) {
    extract($row01);



    $strSQL03 = "UPDATE pretaxa SET ";
    $strSQL03 .= "pretaxagenus = 'Unknown' ";
    $strSQL03 .= "WHERE pretaxa_id   = '" . $pretaxa_id . "'";
   

    $objQuery03 = pg_query($strSQL03);

}
