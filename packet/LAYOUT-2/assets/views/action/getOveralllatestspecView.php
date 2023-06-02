<?php

$today       = date("Y-m-d");
$beginbudget = date("Y-m-d", mktime(0, 0, 0, 9, 30, date("Y") - 1));

require 'connectdb.php';

$strSQL = "SELECT count(specimens_id) AS countspecea,concat(EXTRACT(MONTH FROM sreport_date) ,'-',EXTRACT(YEAR FROM sreport_date)) as sconcat,EXTRACT(MONTH FROM sreport_date) AS smonth,EXTRACT(YEAR FROM sreport_date) as syear FROM specimens ";
$strSQL .= "WHERE sreport_date > '" . $beginbudget . "'";
$strSQL .= "AND sreport_date < now() ";

$strSQL .= "GROUP BY EXTRACT(MONTH FROM sreport_date),EXTRACT(YEAR FROM sreport_date),sconcat ";
$strSQL .= "ORDER BY syear desc,smonth asc ";


$objQuery    = pg_query($strSQL);
$intNumField = pg_num_fields($objQuery);
$resultArray = array();
while ($obResult = pg_fetch_array($objQuery)) {
    extract($obResult);
    $fullmonth = date("F", mktime(0, 0, 0, $smonth, 1, $syear));

    $arrCol = array();
    for ($i = 0; $i < $intNumField; $i++) {
        $arrCol[pg_field_name($objQuery, $i)] = $obResult[$i];
    }
    $arrCol['fullmonth']  = $fullmonth;
/*
$strSQLex = "SELECT * from userlockbox ";
$strSQLex .= "LEFT JOIN collectionresbox on userlockbox.lockbox_boxid = collectionresbox.collbox_id ";
$strSQLex .= "LEFT JOIN boxstatus on userlockbox.lockbox_boxstatus = boxstatus.boxstatus_id ";
$strSQLex .= "LEFT JOIN box_location on userlockbox.lockbox_boxplaceid = box_location.boxlocate_id ";
$strSQLex .= "WHERE CONCAT(EXTRACT(MONTH FROM lockbox_mreport),'-',EXTRACT(YEAR FROM lockbox_mreport)) = '" . $a . "'";

$objQueryex    = pg_query($strSQLex);
$resultArrayex = array();
$intNumFieldex = pg_num_fields($objQueryex);
while ($obResultex = pg_fetch_array($objQueryex)) {
$arrColex = array();
for ($i = 0; $i < $intNumFieldex; $i++) {
$arrColex[pg_field_name($objQueryex, $i)] = $obResultex[$i];
}

array_push($resultArrayex, $arrColex);
$arrCol['boxlist'] = $resultArrayex;




















tactic



select count(DISTINCT torder_name) from specimens 
left join species on species.species_id = specimens.species_species_id
LEFT JOIN collection on collection.coll_id = specimens.collection_coll_id
LEFT JOIN genus ON genus.genus_id = species.genus_genus_id
LEFT JOIN family ON family.family_id = genus.family_family_id
LEFT JOIN torder ON torder.torder_id = family.torder_torder_id
where specimens_trash = 1 
and concat(EXTRACT(MONTH FROM sreport_date) ,'-',EXTRACT(YEAR FROM sreport_date)) = '10-2018'
and torder_id > 0

}*/
    array_push($resultArray, $arrCol);
}

pg_close($conn);

echo json_encode($resultArray);
