<?php

require 'connectdb.php';
$tspecimensid = $_POST['tspecimensid'];

$strSQL = "SELECT * FROM specimens ";
$strSQL .= "LEFT JOIN collection on collection.coll_id = specimens.collection_coll_id ";
$strSQL .= "LEFT JOIN amphur on amphur.amphur_id = collection.amphur_amphur_id ";
$strSQL .= "LEFT JOIN province on province.province_id = amphur.province_province_id ";
$strSQL .= "LEFT JOIN method on method.method_id = collection.method_method_id ";
$strSQL .= "LEFT JOIN donation on donation.donation_id = collection.donation_donation_id ";
$strSQL .= "LEFT JOIN species ON species.species_id = specimens.species_species_id ";
$strSQL .= "LEFT JOIN genus ON genus.genus_id = species.genus_genus_id ";
$strSQL .= "LEFT JOIN family ON family.family_id = genus.family_family_id ";
$strSQL .= "LEFT JOIN torder ON torder.torder_id = family.torder_torder_id ";
$strSQL .= "LEFT JOIN specimensbox on specimensbox.spec_box_id = specimens.specbox_spec_box_id ";
$strSQL .= "LEFT JOIN drawer on drawer.drawer_id = specimensbox.drawer_drawer_id ";
$strSQL .= "LEFT JOIN subcabinet on subcabinet.subcabinet_id = drawer.subcabinet_subcabinet_id ";
$strSQL .= "LEFT JOIN cabinet on cabinet.cabinet_id = subcabinet.cabinet_cabinet_id ";
$strSQL .= "LEFT JOIN rcabinet on rcabinet.rcabinet_id = cabinet.rcabinet_rcabinet_id ";
$strSQL .= "WHERE specimens_id =" . $tspecimensid;

$objQuery    = pg_query($strSQL);
$intNumField = pg_num_fields($objQuery);
$resultArray = array();
while ($obResult = pg_fetch_array($objQuery)) {
    $arrCol = array();
    extract($obResult);
    for ($i = 0; $i < $intNumField; $i++) {
        $arrCol[pg_field_name($objQuery, $i)] = $obResult[$i];
    }

    $strSQL02 = "SELECT collector_firstname_en,collector_lastname_en from collection_has_collector ";
    $strSQL02 .= "LEFT JOIN collector on collector.collector_id = collection_has_collector.collector_collector_id ";
    $strSQL02 .= "LEFT JOIN collection on collection.coll_id = collection_has_collector.collection_coll_id ";
    $strSQL02 .= "WHERE coll_id ='" . $coll_id . "'";
    $objQuery02    = pg_query($strSQL02);
    $resultArray01 = array();
    $intNumField01 = pg_num_fields($objQuery02);
    $q             = 1;
    while ($obResult01 = pg_fetch_array($objQuery02)) {
        $arrCol01 = array();
        for ($i = 0; $i < $intNumField01; $i++) {
            $arrCol01[pg_field_name($objQuery02, $i)] = $obResult01[$i];
        }
        $arrCol01['queue'] = $q;
        array_push($resultArray01, $arrCol01);

        $arrCol['collectorea'] = $resultArray01;

        $q++;

    }

    array_push($resultArray, $arrCol);
}
pg_close($conn);

echo json_encode($resultArray);
