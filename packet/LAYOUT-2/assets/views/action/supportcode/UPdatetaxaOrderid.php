<?php

require 'connectdb.php';

$strSQL = "select * from pretaxaname";


$objQuery = pg_query($strSQL);

while ($row01 = pg_fetch_array($objQuery)) {
    extract($row01);
    echo $torder_id."-".$pretaxaname_id;
    echo "<br>";

    $strSQL03 = "UPDATE pretaxaname SET ";
    $strSQL03 .= "preordername_id = '" . $torder_id . "' ";
    $strSQL03 .= "WHERE pretaxaname_id   = '" . $pretaxaname_id . "'";

    $objQuery03 = pg_query($strSQL03);
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