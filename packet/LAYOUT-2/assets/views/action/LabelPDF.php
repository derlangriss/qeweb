<?php
require_once 'LatexTemplate.php';
// connect to the database
require 'connectdb.php';

function rome($decimalInteger) {
    $n   = intval($decimalInteger);
    $res = '';

    $roman_numerals = array(
        'M'  => 1000,
        'CM' => 900,
        'D'  => 500,
        'CD' => 400,
        'C'  => 100,
        'XC' => 90,
        'L'  => 50,
        'XL' => 40,
        'X'  => 10,
        'IX' => 9,
        'V'  => 5,
        'IV' => 4,
        'I'  => 1);

    foreach ($roman_numerals as $roman => $numeral) {
        $matches = intval($n / $numeral);
        $res .= str_repeat($roman, $matches);
        $n = $n % $numeral;
    }

    return $res;
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

        $strSQL = " SELECT * FROM label_print_queue
                    LEFT JOIN specimens ON specimens.specimens_id = label_print_queue.label_id_to_print
                    LEFT JOIN collection ON specimens.collection_coll_id = collection.coll_id
                    WHERE label_type ='" . $_GET["labeltype"] . "'
                    AND print_queue = 'TRUE'
                    ORDER BY coll_code ASC,coll_year ASC, coll_number ASC,specimens_number ASC";

    }

}

$objQuery      = pg_query($strSQL);
$intRowsColl   = pg_num_rows($objQuery);
$intNumField   = pg_num_fields($objQuery);
$resultArray   = array();
$resultArray01 = array();

while ($obResult = pg_fetch_array($objQuery)) {
    extract($obResult);
    $arrCol = array();

    $strSQL02 = "WITH labelqueue as ( ";
    $strSQL02 .= "SELECT specimens_id,coll_id,coll_full_id,collector_firstname_en,collector_lastname_en,specimens_full_number,province_en, ";
    $strSQL02 .= "amphur_en,coll_locality,coll_lat_d,coll_lat_m,coll_lat_s,coll_long_d,coll_long_m,coll_long_s, ";
    $strSQL02 .= "coll_masl,coll_start_date,coll_end_date,method,collectorseq ";
    $strSQL02 .= "FROM label_print_queue ";
    $strSQL02 .= "LEFT JOIN specimens ON specimens.specimens_id = label_print_queue.label_id_to_print  ";
    $strSQL02 .= "LEFT JOIN collection ON specimens.collection_coll_id = collection.coll_id ";
    $strSQL02 .= "LEFT JOIN method ON method.method_id=collection.method_method_id ";
    $strSQL02 .= "LEFT JOIN amphur ON amphur.amphur_id=collection.amphur_amphur_id ";
    $strSQL02 .= "LEFT JOIN province ON province.province_id = amphur.province_province_id ";
    $strSQL02 .= "LEFT JOIN species ON species.species_id = specimens.species_species_id ";
    $strSQL02 .= "LEFT JOIN genus ON genus.genus_id = species.genus_genus_id ";
    $strSQL02 .= "LEFT JOIN family ON family.family_id = genus.family_family_id ";
    $strSQL02 .= "LEFT JOIN torder ON torder.torder_id = family.torder_torder_id ";
    $strSQL02 .= "LEFT JOIN collection_has_collector on collection_has_collector.collection_coll_id = collection.coll_id ";
    $strSQL02 .= "LEFT JOIN collector on collection_has_collector.collector_collector_id = collector.collector_id ";
    $strSQL02 .= "WHERE label_type ='" . $_GET["labeltype"] . "' ";
    $strSQL02 .= "AND print_queue = 'TRUE' ";
    $strSQL02 .= "AND specimens_id = '" . $specimens_id . "'";
    $strSQL02 .= "GROUP BY coll_id,coll_full_id,collector_firstname_en,collector_lastname_en, specimens_full_number,specimens_id, ";
    $strSQL02 .= "collectorseq,province_en,amphur_en,coll_locality,coll_lat_d,coll_lat_m,coll_lat_s,coll_long_d,coll_long_m,coll_long_s,coll_masl,coll_end_date,method ";
    $strSQL02 .= "ORDER BY specimens_full_number ASC,collectorseq ASC";
    $strSQL02 .= " ), updateprintlist as ( ";
    $strSQL02 .= "UPDATE label_print_queue SET print_queue ='FALSE' ";
    $strSQL02 .= "WHERE label_id_to_print ='" . $specimens_id . "'";
    $strSQL02 .= ") ";
    $strSQL02 .= "SELECT * from labelqueue";

    $objQuery02    = pg_query($strSQL02);
    $intRowsColl02 = pg_num_rows($objQuery02);
    $intNumField02 = pg_num_fields($objQuery02);

    if ($intRowsColl02 > 2) {
        while ($obResult02 = pg_fetch_array($objQuery02)) {

            extract($obResult02);
            $arrCol03 = array();

            for ($i = 0; $i < $intNumField02; $i++) {

                $arrCol03[pg_field_name($objQuery02, $i)] = $obResult02[$i];

            }
            $arrCol03['collectorfullname'] = $arrCol03['collector_firstname_en'] . " " . $arrCol03['collector_lastname_en'];
            $arrCol03['collectorfullall']  = $arrCol03['collector_firstname_en'] . " " . $arrCol03['collector_lastname_en'] . " et al.";

            $coll_start_date_comp = $arrCol03['coll_start_date'];
            $coll_end_date_comp   = $arrCol03['coll_end_date'];

            if ($coll_start_date_comp == $coll_end_date_comp) {

                $year       = (int) substr($coll_start_date_comp, 0, 4);
                $month      = (int) substr($coll_start_date_comp, 5, 2);
                $date       = (int) substr($coll_start_date_comp, 8, 2);
                $romanmonth = rome($month);

                $arrCol03['coll_date_comp'] = $date . "." . $romanmonth . "." . $year;

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

                            $arrCol03['coll_date_comp'] = $date_end . "." . $romanmonth_end . "." . $year_end;

                        } else {

                            $arrCol03['coll_date_comp'] = $date_start . " - " . $date_end . "." . $romanmonth_end . "." . $year_end;
                        }

                    } else {
                        $arrCol03['coll_date_comp'] = $date_start . "." . $romanmonth_start . " - " . $date_end . "." . $romanmonth_end . "." . $year_end;
                    }

                } else {
                    $arrCol03['coll_date_comp'] = $date_start . "." . $romanmonth_start . "." . $year_start . " - " . $date_end . "." . $romanmonth_end . "." . $year_end;
                }

            }
            array_push($resultArray01, $arrCol03);
            break;
        }

    } else if ($intRowsColl02 > 1) {

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
                $arrCol02['collector_first'] = $arrCol02['collector_firstname_en'] . " " . $arrCol02['collector_lastname_en'];

            } else {

                $arrCol02['collectorfullall'] = $arrCol02['collector_first'] . ", " . $arrCol02['collector_firstname_en'] . " " . $arrCol02['collector_lastname_en'];
                array_push($resultArray01, $arrCol02);

            }

            $ii++;

        }

    } else {

        $ii = 0;
        while ($obResult02 = pg_fetch_array($objQuery02)) {
            $arrCol01 = array();
            for ($i = 0; $i < $intNumField02; $i++) {

                $arrCol01[pg_field_name($objQuery02, $i)] = $obResult02[$i];

            }
            $coll_start_date_comp = $arrCol01['coll_start_date'];
            $coll_end_date_comp   = $arrCol01['coll_end_date'];
            if ($coll_start_date_comp == $coll_end_date_comp) {

                $year       = (int) substr($coll_start_date_comp, 0, 4);
                $month      = (int) substr($coll_start_date_comp, 5, 2);
                $date       = (int) substr($coll_start_date_comp, 8, 2);
                $romanmonth = rome($month);

                $arrCol01['coll_date_comp'] = $date . "." . $romanmonth . "." . $year;

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

                            $arrCol01['coll_date_comp'] = $date_end . "." . $romanmonth_end . "." . $year_end;

                        } else {

                            $arrCol01['coll_date_comp'] = $date_start . " - " . $date_end . "." . $romanmonth_end . "." . $year_end;
                        }

                    } else {
                        $arrCol01['coll_date_comp'] = $date_start . "." . $romanmonth_start . " - " . $date_end . "." . $romanmonth_end . "." . $year_end;
                    }

                } else {
                    $arrCol01['coll_date_comp'] = $date_start . "." . $romanmonth_start . "." . $year_start . "-" . $date_end . "." . $romanmonth_end . "." . $year_end;
                }

            }

            if ($ii == 0) {
                $arrCol01['collectorfullall'] = $arrCol01['collector_firstname_en'] . " " . $arrCol01['collector_lastname_en'];

            } else {

                $arrCol01['collectorfullall'] = $arrCol01['collector_firstname_en'] . " " . $arrCol01['collector_lastname_en'] . ", " . $arrCol01['collector_second'];
                array_push($resultArray01, $arrCol01);
            }

            $ii++;

        }

        array_push($resultArray01, $arrCol01);

    }

}

$labeltype = $_GET['labeltype'] . ".tex";

try {
    LatexTemplate::download($resultArray01, $labeltype, 'label.pdf');
} catch (Exception $e) {
    echo $e->getMessage();

}
//echo json_encode($resultArray01);
