<?php

require 'connectdb.php';

$strSQL = "select * from pretaxaname";

$objQuery = pg_query($strSQL);

while ($row01 = pg_fetch_array($objQuery)) {
    extract($row01);
    echo 

    $strSQL01 = "INSERT INTO family ";
    $strSQL01 .= "(family_name ,torder_torder_id)";
    $strSQL01 .= "VALUES ";
    $strSQL01 .= "('" . $prefamilyname . "'," . $preordername_id . ")";
    $objQuery01 = pg_query($strSQL01);
}

/*
select pretaxaorder,torder_id from pretaxa
left join torder on  pretaxa.pretaxaorder = torder.torder_name
where torder_id IS NULL

select DISTINCT(pretaxafamily),family_id,torder_id from pretaxa
left join torder on  pretaxa.pretaxaorder_id = torder.torder_id
left join family on family.family_name = pretaxa.pretaxafamily
where family_id IS NULL
group by family_id,torder_id,pretaxafamily

select DISTINCT(pretaxafamily),family_id,torder_id,torder_name,pretaxaorder_id,pretaxayear,pretaxanumber,pretaxasnumber from pretaxa
left join torder on  pretaxa.pretaxaorder_id = torder.torder_id
left join family on family.family_name = pretaxa.pretaxafamily
where family_id IS NULL
group by family_id,torder_id,pretaxafamily,pretaxaorder_id,pretaxayear,pretaxanumber,pretaxasnumber
 */
