<?php
require_once 'LatexTemplate.php';
// connect to the database
require 'connectdb.php';
function rome($N)
{
    $c = 'IVXLCDM';
    for ($a = 5, $b = $s = ''; $N; $b++, $a ^= 7) {
        for ($o = $N % $a, $N = $N / $a ^ 0; $o--; $s = $c[$o > 2 ? $b + $N - ($N &= -2) + $o = 1 : $b > 0 ? $b : 0] . $s);
    }
    return $s;
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
    $strSQL02         = "  SELECT specimens_id,coll_id,coll_full_id,collector_firstname_en,collector_lastname_en,specimens_full_number,province_en,amphur_en,coll_locality,coll_lat_d,coll_lat_m,coll_lat_s,coll_long_d,coll_long_m,coll_long_s,coll_masl,coll_start_date,coll_end_date,method,collectorseq FROM label_print_queue
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

                $arrCol02[pg_field_name($objQuery02, $i)] = $obResult02[$i];

            }

            $arrCol02['collectorfullname'] = $arrCol02['collector_firstname_en'] . " " . $arrCol02['collector_lastname_en'];
            $arrCol02['collectorfullall']  = $arrCol02['collector_firstname_en'] . " " . $arrCol02['collector_lastname_en'] . " et al.";

            $coll_start_date_comp = $arrCol02['coll_start_date'];
            $coll_end_date_comp   = $arrCol02['coll_end_date'];
            if ($coll_start_date_comp == $coll_end_date_comp) {

                $year       = (int) substr($coll_start_date_comp, 0, 4);
                $month      = (int) substr($coll_start_date_comp, 5, 2);
                $date       = (int) substr($coll_start_date_comp, 8, 2);
                $romanmonth = rome($month);

                $arrCol02['coll_date_comp'] = $date . "." . $romanmonth . "." . $year;

            } else {

                $year_start       = (int) substr($coll_start_date_comp, 0, 4);
                $month_start      = (int) substr($coll_start_date_comp, 5, 2);
                $date_start       = (int) substr($coll_start_date_comp, 8, 2);
                $romanmonth_start = rome($month_start);

                $year_end       = (int) substr($coll_end_date_comp, 0, 4);
                $month_end      = (int) substr($coll_end_date_comp, 5, 2);
                $date_end       = (int) substr($coll_end_date_comp, 8, 2);
                $romanmonth_end = rome($month_end);

                if ($year_start == $year_end) {
                    if ($month_start == $month_end) {
                        if ($date_start == $date_end) {

                            $arrCol02['coll_date_comp'] = $date_end . "." . $romanmonth_end . "." . $year_end;

                        } else {

                            $arrCol02['coll_date_comp'] = $date_start . " - " . $date_end . "." . $romanmonth_end . "." . $year_end;
                        }

                    } else {
                        $arrCol02['coll_date_comp'] = $date_start . "." . $romanmonth_start . " - " . $date_end . "." . $romanmonth_end . "." . $year_end;
                    }

                } else {
                    $arrCol02['coll_date_comp'] = $date_start . "." . $romanmonth_start . "." . $year_start . " - " . $date_end . "." . $romanmonth_end . "." . $year_end;
                }

            }

        }

        array_push($resultCollector01, $arrCol02);
    } else {
        $ii = 0;
        while ($obResult02 = pg_fetch_array($objQuery02)) {
            for ($i = 0; $i < $intNumField02; $i++) {

                $arrCol02[pg_field_name($objQuery02, $i)] = $obResult02[$i];

            }
            $coll_start_date_comp = $arrCol02['coll_start_date'];
            $coll_end_date_comp   = $arrCol02['coll_end_date'];
            if ($coll_start_date_comp == $coll_end_date_comp) {

                $year       = (int) substr($coll_start_date_comp, 0, 4);
                $month      = (int) substr($coll_start_date_comp, 5, 2);
                $date       = (int) substr($coll_start_date_comp, 8, 2);
                $romanmonth = rome($month);

                $arrCol02['coll_date_comp'] = $date . "." . $romanmonth . "." . $year;

            } else {

                $year_start       = (int) substr($coll_start_date_comp, 0, 4);
                $month_start      = (int) substr($coll_start_date_comp, 5, 2);
                $date_start       = (int) substr($coll_start_date_comp, 8, 2);
                $romanmonth_start = rome($month_start);

                $year_end       = (int) substr($coll_end_date_comp, 0, 4);
                $month_end      = (int) substr($coll_end_date_comp, 5, 2);
                $date_end       = (int) substr($coll_end_date_comp, 8, 2);
                $romanmonth_end = rome($month_end);

                if ($year_start == $year_end) {
                    if ($month_start == $month_end) {
                        if ($date_start == $date_end) {

                            $arrCol02['coll_date_comp'] = $date_end . "." . $romanmonth_end . "." . $year_end;

                        } else {

                            $arrCol02['coll_date_comp'] = $date_start . " - " . $date_end . "." . $romanmonth_end . "." . $year_end;
                        }

                    } else {
                        $arrCol02['coll_date_comp'] = $date_start . "." . $romanmonth_start . " - " . $date_end . "." . $romanmonth_end . "." . $year_end;
                    }

                } else {
                    $arrCol02['coll_date_comp'] = $date_start . "." . $romanmonth_start . "." . $year_start . "-" . $date_end . "." . $romanmonth_end . "." . $year_end;
                }

            }

            if ($ii == 0) {
                $arrCol02['collector_second'] = $arrCol02['collector_firstname_en'] . " " . $arrCol02['collector_lastname_en'];

            } else {

                $arrCol02['collectorfullall'] = $arrCol02['collector_firstname_en'] . " " . $arrCol02['collector_lastname_en'] . ", " . $arrCol02['collector_second'];
                array_push($resultCollector01, $arrCol02);
            }

            $ii++;

        }

        /*  array_push($resultCollector01, $arrCol02);*/

    }

}

$labeltype = $_GET['labeltype'] . ".tex";

try {
    LatexTemplate::download($resultCollector01, $labeltype, 'label.pdf');
} catch (Exception $e) {
    echo $e->getMessage();
}

//workfine
//echo json_encode($resultCollector01);
