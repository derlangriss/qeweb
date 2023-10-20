<?php
require_once 'LatexTemplate.php';
require 'connectdb.php';
// connect to the database

function array_map_keys($param1, $param2, $param3 = null)
{
    $res = array();

    if ($param3 !== null) {
        foreach (array(2, 3) as $p_name) {
            if (!is_array(${'param' . $p_name})) {
                trigger_error(__FUNCTION__ . '(): Argument #' . $p_name . ' should be an array', E_USER_WARNING);
                return;
            }
        }
        foreach ($param2 as $key => $val) {
            $res[$key] = call_user_func($param1, $param2[$key], $param3[$key]);
        }
    } else {
        if (!is_array($param2)) {
            trigger_error(__FUNCTION__ . '(): Argument #2 should be an array', E_USER_WARNING);
            return;
        }
        foreach ($param2 as $key => $val) {
            $res[$key] = call_user_func($param1, $param2[$key]);
        }
    }
    return $res;
}
function concatname($n, $m)
{

    return $n . "," . $m;
}

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

        $strSQL = " SELECT specimens_id FROM label_print_queue
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

$objQuery            = pg_query($strSQL);
$intNumField         = pg_num_fields($objQuery);
$resultArray         = array();
$resultCollector01   = array();
$resultCollector     = array();
$resultCollectortest = array();

while ($obResult = pg_fetch_array($objQuery)) {
    $arrCol = array();
    for ($i = 0; $i < $intNumField; $i++) {

        $arrCol[pg_field_name($objQuery, $i)] = $obResult[$i];
    }
    array_push($resultArray, $arrCol);
}
foreach ($resultArray as $row) {
    $specimens_id_arr = $row["specimens_id"];
    $strSQL02         = "  SELECT specimens_id,coll_id,coll_full_id,collector_firstname_en,collector_lastname_en,specimens_full_number,province_en,amphur_en,coll_locality,coll_lat_d,coll_lat_m,coll_lat_s,coll_long_d,coll_long_m,coll_long_s,coll_masl,coll_end_date,method,collectorseq FROM label_print_queue
                    LEFT JOIN specimens ON specimens.specimens_id = label_print_queue.label_id_to_print
                    LEFT JOIN collection ON specimens.collection_coll_id = collection.coll_id
                    LEFT JOIN method ON method.method_id=collection.method_method_id
                    LEFT JOIN amphur ON amphur.amphur_id=collection.amphur_amphur_id
                    LEFT JOIN province ON province.province_id = amphur.province_province_id
                    LEFT JOIN species ON species.species_id = specimens.species_species_id
                    LEFT JOIN genus ON genus.genus_id = species.genus_genus_id
                    LEFT JOIN family ON family.family_id = genus.family_family_id
                    LEFT JOIN torder ON torder.torder_id = family.torder_torder_id
                    LEFT JOIN collection_has_collector on collection_has_collector.collection_coll_id = collection.coll_id
                    LEFT JOIN collector on collection_has_collector.collector_collector_id = collector.collector_id
                    WHERE label_type ='" . $_GET["labeltype"] . "'
                    AND print_queue = 'TRUE'
                    AND specimens_id = '" . $specimens_id_arr . "'
                    GROUP BY coll_id,coll_full_id,collector_firstname_en,collector_lastname_en, specimens_full_number,specimens_id,collectorseq,province_en,amphur_en,coll_locality,coll_lat_d,coll_lat_m,coll_lat_s,coll_long_d,coll_long_m,coll_long_s,coll_masl,coll_end_date,method
                    ORDER BY collectorseq";
    $objQuery02    = pg_query($strSQL02);
    $intRowsColl02 = pg_num_rows($objQuery02);
    $intNumField02 = pg_num_fields($objQuery02);

    $arrCol02 = array();
    $arrCol03 = array();
    if ($intRowsColl02 >= 3) {

        while ($obResult02 = pg_fetch_array($objQuery02)) {
            for ($i = 0; $i < $intNumField02; $i++) {

                if (pg_field_name($objQuery02, $i) == 'collector_firstname_en') {

                    $obResult02[$i] = $obResult02[$i];
                }

                $arrCol02[pg_field_name($objQuery02, $i)] = $obResult02[$i];

            }

            $arrCol02['collectorfullname'] = $arrCol02['collector_firstname_en'] . " " . $arrCol02['collector_lastname_en'];
            $arrCol02['collectorfullall']  = $arrCol02['collector_firstname_en'] . " " . $arrCol02['collector_lastname_en'] . " et al.";

        }
        array_push($resultCollector01, $arrCol02);
    } else {
        $ii = 0;
        while ($obResult02 = pg_fetch_array($objQuery02)) {
            for ($i = 0; $i < $intNumField02; $i++) {

                if (pg_field_name($objQuery02, $i) == 'collector_firstname_en') {

                    $obResult02[$i] = $obResult02[$i];
                }

                $arrCol02[pg_field_name($objQuery02, $i)] = $obResult02[$i];
                $arrCol03[pg_field_name($objQuery02, $i)] = $obResult02[$i];

            }

            if ($ii == 1) {
                $arrCol03['collector_first'] = $arrCol03['collector_firstname_en'] . " " . $arrCol03['collector_lastname_en']. ", " . $arrCol02['collector_second'];
                array_push($resultCollector, $arrCol03);

            } else {

                $arrCol02['collector_second'] = $arrCol02['collector_firstname_en'] . " " . $arrCol02['collector_lastname_en'];
                array_push($resultCollectortest, $arrCol02);
            }

            $ii++;

        }

      /*  array_push($resultCollector01, $arrCol02);*/

    }

}
echo json_encode($resultCollector);
//echo json_encode($resultCollector01);

/*
$labeltype = $_GET['labeltype'] . ".tex";

try {
LatexTemplate::download($resultCollector01, $labeltype, 'label.pdf');
} catch (Exception $e) {
echo $e->getMessage();
}
 */
//workfine
//echo json_encode($resultCollector01);
