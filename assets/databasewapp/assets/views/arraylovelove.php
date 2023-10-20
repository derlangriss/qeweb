<?php
require_once 'LatexTemplate.php';
require 'connectdb.php';
// connect to the database

$conn = pg_connect("host=$hostname dbname=$dbName user=$dbUser password=$dbPass") or die("Cannot connect to the database");

if (isset($_GET['labeltype'])) {

    if ($_GET['labeltype'] == "collection") {

        $strSQL = " SELECT * FROM label_print_queue
                    LEFT JOIN collection
                    LEFT JOIN method ON method.method_id=collection.method_method_id
                    LEFT JOIN amphur ON amphur.amphur_id=collection.amphur_amphur_id
                    LEFT JOIN province ON province.province_id = collection.province_province_id
                    WHERE labeltype = '" . $_GET["labeltype"] . "'";

    }
    if ($_GET['labeltype'] == "specimens") {

        $strSQL = " SELECT DISTINCT(coll_id) FROM label_print_queue
                    LEFT JOIN specimens ON specimens.specimens_id = label_print_queue.label_id_to_print
                    LEFT JOIN collection ON specimens.collection_coll_id = collection.coll_id
                    LEFT JOIN method ON method.method_id=collection.method_method_id
                    LEFT JOIN amphur ON amphur.amphur_id=collection.amphur_amphur_id
                    LEFT JOIN province ON province.province_id = amphur.province_province_id
                    LEFT JOIN species ON species.species_id = specimens.species_species_id
                    LEFT JOIN genus ON genus.genus_id = species.genus_genus_id
                    LEFT JOIN family ON family.family_id = genus.family_family_id
                    LEFT JOIN torder ON torder.torder_id = family.torder_torder_id
                    WHERE label_type ='" . $_GET["labeltype"] . "'
                    AND print_queue = 'TRUE'";
    }

}

$objQuery    = pg_query($strSQL);
$intNumField = pg_num_fields($objQuery);
$resultArray = array();
while ($obResult = pg_fetch_array($objQuery)) {

    $arrCol = array();
    for ($i = 0; $i < $intNumField; $i++) {
        $arrCol[pg_field_name($objQuery, $i)] = $obResult[$i];
    }

}

$objQuery    = pg_query($strSQL);
$intNumField = pg_num_fields($objQuery);
$resultArray = array();

while ($obResult = pg_fetch_array($objQuery)) {
    $arrCol = array();
    for ($i = 0; $i < $intNumField; $i++) {

        $arrCol[pg_field_name($objQuery, $i)] = $obResult[$i];
    }
    array_push($resultArray, $arrCol);
}

foreach ($resultArray as $row) //Extract the Array Values by using Foreach Loop
{

    $coll_id_arr = $row["coll_id"];

    $strSQL02 = " SELECT coll_id,coll_full_id,collector_firstname_en FROM collection_has_collector
                    LEFT JOIN collection ON collection.coll_id = collection_has_collector.collection_coll_id
                    LEFT JOIN collector ON collector.collector_id = collection_has_collector.collector_collector_id
                    WHERE coll_id = '" . $coll_id_arr . "'";
    $objQuery02      = pg_query($strSQL02);
    $intRowsColl02   = pg_num_rows($objQuery02);
    $intNumField02   = pg_num_fields($objQuery02);
    $resultCollector = array();

    if ($intRowsColl02 >= 3) {

        $obResult02 = pg_fetch_array($objQuery02);
        var_dump($objQuery02);
        extract($obResult02);

        /*
        $arrCol02 = array();
        for ($i = 0; $i < $intNumField02; $i++) {*/
        $arrCol02['coll_full_id']           = $coll_full_id;
        $arrCol02['collector_firstname_en'] = $collector_firstname_en . " et all";
        /*}*/
        array_push($resultCollector, $arrCol02);

    } else {
        /*
    while ($obResult02 = pg_fetch_array($objQuery02)) {
    $arrCol02 = array();
    for ($i = 0; $i < $intNumField02; $i++) {
    $arrCol02[pg_field_name($objQuery02, $i)] = $obResult02[$i];
    }
    array_push($resultCollector, $arrCol02);

    }*/

    }
    echo json_encode($resultCollector);
/*
while ($obResult = pg_fetch_array($objQuery)) {
$arrCol = array();

for ($i = 0; $i < $intNumField; $i++) {
if (pg_field_name($objQuery, $i) == 'specimen_number') {
if ($obResult[$i] == null) {
$obResult[$i] = 1;
} else {
$obResult[$i] = $obResult[$i] + 1;
}

$obResult[$i] = sprintf('%04d', $obResult[$i]);
}

$arrCol[pg_field_name($objQuery, $i)] = $obResult[$i];
}
array_push($resultArray, $arrCol);

 */

    /*

extract($row);
echo $coll_full_id;
echo $collector_firstname_en;
echo $intRowsColl02;

 */

}
/*
echo json_encode($);
 */
pg_close($conn);
