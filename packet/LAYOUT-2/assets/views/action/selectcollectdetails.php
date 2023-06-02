<?php

require 'connectdb.php';
$tcollid = $_POST['tcollectionid'];

$strSQL = "SELECT * FROM collection ";
$strSQL .= "left join amphur on amphur.amphur_id = collection.amphur_amphur_id ";
$strSQL .= "left join province on province.province_id = amphur.province_province_id ";
$strSQL .= "left join method on method.method_id = collection.method_method_id ";
$strSQL .= "left join donation on donation.donation_id = collection.donation_donation_id ";
$strSQL .= "WHERE coll_id =" . $tcollid;

$objQuery    = pg_query($strSQL);
$intNumField = pg_num_fields($objQuery);
$resultArray = array();
while ($obResult = pg_fetch_array($objQuery)) {
    $arrCol = array();
    for ($i = 0; $i < $intNumField; $i++) {
        $arrCol[pg_field_name($objQuery, $i)] = $obResult[$i];
    }

    $strSQL02 = "SELECT collector_firstname_en,collector_lastname_en from collection_has_collector ";
    $strSQL02 .= "left join collector on collector.collector_id = collection_has_collector.collector_collector_id ";
    $strSQL02 .= "left join collection on collection.coll_id = collection_has_collector.collection_coll_id ";
    $strSQL02 .= "WHERE coll_id ='" . $tcollid . "'";
    $objQuery02    = pg_query($strSQL02);
    $resultArray01 = array();
    $intNumField01 = pg_num_fields($objQuery02);
    $q = 1;
    while ($obResult01 = pg_fetch_array($objQuery02)) {
        $arrCol01 = array();
        for ($i = 0; $i < $intNumField01; $i++) {
            $arrCol01[pg_field_name($objQuery02, $i)] = $obResult01[$i];
        }
        $arrCol01['queue'] = $q;
        array_push($resultArray01, $arrCol01);

        $arrCol['collectorea']  = $resultArray01;

        $q++;

    }

    array_push($resultArray, $arrCol);
}
pg_close($conn);

echo json_encode($resultArray);
