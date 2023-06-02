<?php

require 'connectdb.php';
$strSQL = "select * from prefamilyfdb02 ";
$strSQL .= "left join torder on  prefamilyfdb02.pretorder_name = torder.torder_name ";
$strSQL .= "where torder_id IS NOT NULL ";



$objQuery = pg_query($strSQL);

while ($row01 = pg_fetch_array($objQuery)) {
    extract($row01);

    $strSQL03 = "select * from family ";
    $strSQL03 .= "left join torder on  family.torder_torder_id = torder.torder_id ";
    $strSQL03 .= "where family_name ILIKE '".$prefamily_name."'";
    $objQuery03 = pg_query($strSQL03);

    $intRows  = pg_num_rows($objQuery03);

    if($intRows > 0){

        echo "yes".$prefamily_name." ".$torder_id;

    }else{
    	
    $strSQL04 = "INSERT INTO family ";
    $strSQL04 .= "(family_name,torder_torder_id)";
    $strSQL04 .= "VALUES ";
    $strSQL04 .= "('" . $prefamily_name . "','" . $torder_id . "')";
    $Result04 = pg_query($strSQL04);


    }



    


}












/*
$strSQL = "select DISTINCT(pretaxafamily),family_id,torder_id,torder_name,pretaxaorder_id from pretaxa ";
$strSQL .= "left join torder on  pretaxa.pretaxaorder_id = torder.torder_id ";
$strSQL .= "left join family on family.family_name = pretaxa.pretaxafamily ";
$strSQL .= "where family_id IS NULL ";
$strSQL .= "group by family_id,torder_id,pretaxafamily,pretaxaorder_id ";

$objQuery = pg_query($strSQL);

while ($row01 = pg_fetch_array($objQuery)) {
    extract($row01);
    echo "sompong";
    */
/*
    $strSQL03 = "INSERT INTO family ";
    $strSQL03 .= "(family_name,torder_torder_id)";
    $strSQL03 .= "VALUES ";
    $strSQL03 .= "('" . $pretaxafamily . "','" . $pretaxaorder_id . "')";
    $Result03 = pg_query($strSQL03);

    $objQuery03 = pg_query($Result03);
*/
    /*
}*/

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
