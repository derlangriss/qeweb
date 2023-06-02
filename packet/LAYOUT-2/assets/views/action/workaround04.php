<?php
require_once 'LatexTemplate.php';
require 'connectdb.php';
// connect to the database

$conn = pg_connect("host=$hostname dbname=$dbName user=$dbUser password=$dbPass") or die("Cannot connect to the database");

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

    $specimens_id_arr = $row["specimens_id"];

     $strSQL02 = "  SELECT specimens_id,coll_id,coll_full_id,collector_firstname_en,collector_lastname_en,specimens_full_number FROM label_print_queue
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
                    GROUP BY coll_id,coll_full_id,collector_firstname_en,collector_lastname_en, specimens_full_number,specimens_id,collectorseq
                    ORDER BY collectorseq"; 


    $objQuery02        = pg_query($strSQL02);
    $intRowsColl02     = pg_num_rows($objQuery02);
    $intNumField02     = pg_num_fields($objQuery02);
    $resultCollector   = array();
    $resultCollector01 = array();
    $resultCollectorsp = array();
    $collectorfullarr  = array();

    if ($intRowsColl02 >= 3) {
/*
$obResult02 = pg_fetch_array($objQuery02);

echo $obResult02;*/

        $arrCol02 = array();
        $ii       = 0;
        while ($obResult02 = pg_fetch_array($objQuery02)) {
            for ($i = 0; $i < $intNumField02; $i++) {

                if (pg_field_name($objQuery02, $i) == 'collector_firstname_en') {

                    $obResult02[$i] = $obResult02[$i];
                }

                $arrCol02[pg_field_name($objQuery02, $i)] = $obResult02[$i];

            }

            $arrCol02['collectorfullname'] = $arrCol02['collector_firstname_en'] . " " . $arrCol02['collector_lastname_en'] . " et al.";
            array_push($resultCollector01, $arrCol02);

            $ii++;
        }
       
        // echo json_encode($resultCollector01[0]);
        // result {coll_id: "109", coll_full_id: "QSBG-2018-0006", collector_firstname_en: "sompong",…}

        /* $onecollection = $resultCollector01;
        $collectorAll = array_pop($resultCollector01);

         */
        /*
        $result = array_merge_recursive($resultCollector01[0], $resultCollector01[1]);
        /* $test = implode(', ',array_column($resultCollector01,'collectorfullname'));*/
        /* var_dump($test);*/
        /*
        $merged = call_user_func_array('array_merge', $resultCollector01);

        $testetse = array_merge($resultCollector01);

        $b = array_map_keys("concatname", $resultCollector01[0], $resultCollector01[1]);*/

        /* echo json_encode($result); */

        /*   echo json_encode($testetse);*/

        /*$b            = array_map_keys("concatname", $resultCollector01, $array2);*/
        /*
        $resultArray1 = array();
        $resultArray2 = array();
        $array1       = ['name' => 'Wichai', 'surname' => 'Srisuka'];
        $array2       = ['name' => 'Sompong', 'surname' => 'Thongkahow'];

        $newarr1 = implode(" ", $array1);
        $arr     = array('namesurname' => $newarr1);
        $newarr2 = implode(" ", $array2);
        $arr2    = array('namesurname' => $newarr2);
        $c       = array_map_keys("concatname", $array1, $array2);
        var_dump($c);*/
/*
echo json_encode($resultCollector01);*/

        /*    echo implode(', ', array_column($resultCollector01, 'collector_firstname_en'));*/
        /*
        echo json_encode($resultCollector01);
         */

/* Create the new array */

/* Add each user to the new array */
/*
foreach ($resultCollector01 as $key => $value) {
$collectorfullarr[] = $value['collector_firstname_en'] . " " . $value['collector_lastname_en'];
}
$collectorall = implode(' ', $collectorfullarr);
array_push($resultCollector01, $collectorall);
 */
        
    } else {
        $arrCol03 = array();
        $test = 0;
        while ($obResult02 = pg_fetch_array($objQuery02)) {
            $resultCollectortest = array();
            $arrCol03            = array();
            for ($i = 0; $i < $intNumField02; $i++) {

                $arrCol03[pg_field_name($objQuery02, $i)] = $obResult02[$i];
            }
            $arrCol03['collectorfullname'] = $arrCol03['collector_firstname_en'] . " " . $arrCol03['collector_lastname_en'];
            array_push($resultCollector, $arrCol03);
            if ($test == 1) {
                $arrCol03['collectorfullall'] = $resultCollector[0]['collector_firstname_en'] . " " . $resultCollector[0]['collector_lastname_en'] . ", " . $arrCol03['collector_firstname_en'] . " " . $arrCol03['collector_lastname_en'];
                array_push($resultCollectortest, $arrCol03);
            }

            $test++;

        }
       /*echo json_encode($resultCollectortest);*/

        
        /*
    $testarr = $resultCollector;

    $c = array_map_keys("concatname", $resultCollector[0], $resultCollector[1]);
    $poparr = array_pop($c);

    echo json_encode($poparr);*/

    }

    /*
    $compound = array();
    $compound = array_merge($resultCollectortest,$resultCollector01);
    echo json_encode($compound);
    */

    /*
    $resultArray1 = array();
    $resultArray2 = array();
    $array1       = ['name' => 'Wichai', 'surname' => 'Srisuka'];
    $array2       = ['name' => 'Sompong', 'surname' => 'Thongkahow'];

    $newarr1 = implode(" ", $array1);
    $arr     = array('namesurname' => $newarr1);
    $newarr2 = implode(" ", $array2);
    $arr2    = array('namesurname' => $newarr2);

    $c = array_map_keys("show_Spanish", $arr, $arr2);
    var_dump($c);*/

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

 echo json_encode($resultCollector01);


/*
 echo json_encode($resultCollectortest);
*/


/*
echo json_encode($);
 */
/*
echo json_encode($resultCollector01);
 */
pg_close($conn);

