<?php
require_once 'LatexTemplate.php';
// connect to the database
require 'connectdb.php';

if (isset($_GET['reporttype'])) {

    if ($_GET['reporttype'] == "MReport") {
        $month = $_GET['strmonth'];
        $year  = $_GET['stryear'];
        $mixdate = $year."-".$month;

        $monthDisplay = date('F', strtotime($mixdate));
        $yearDisplay  = date('Y', strtotime($year));

        $strSQL = "SELECT count(specimens_id) as counteachspec,coll_code,coll_year,coll_number,MIN(specimens_number) AS min_spec,MAX(specimens_number) AS max_spec
                   FROM specimens
                   LEFT JOIN collection ON specimens.collection_coll_id = collection.coll_id
                   WHERE specimens_trash = 1 AND EXTRACT(MONTH FROM sreport_date) = " . $month . "
                         AND EXTRACT(YEAR FROM sreport_date) = " . $year . "
                         GROUP BY coll_id
                         ORDER BY coll_year asc,coll_number asc";

        $strSQL02 = "SELECT count(specimens_id) as fullcount
                   FROM specimens
                   LEFT JOIN collection ON specimens.collection_coll_id = collection.coll_id
                   WHERE specimens_trash = 1 AND EXTRACT(MONTH FROM sreport_date) = " . $month . "
                         AND EXTRACT(YEAR FROM sreport_date) = " . $year;

        $objQuery02 = pg_query($strSQL02);
        $obResult02 = pg_fetch_array($objQuery02);
        extract($obResult02);

        $resultArray = array();
        $arrCol      = array();

        if ($fullcount > 0) {

            $arrCol['countspecmonth'] = '0';
            $objQuery                 = pg_query($strSQL);
            $intNumField              = pg_num_fields($objQuery);
            $resultArray              = array();
            while ($obResult = pg_fetch_array($objQuery)) {
                extract($obResult);
                for ($i = 0; $i < $intNumField; $i++) {
                    $arrCol[pg_field_name($objQuery, $i)] = $obResult[$i];
                }
                if ($min_spec == $max_spec) {
                    $arrCol['specimens_number_mixed'] = $min_spec;
                } else {
                    $arrCol['specimens_number_mixed'] = $min_spec . "-" . $max_spec;

                }
                $collfullnum              = $coll_code . "-" . $coll_year . "-" . $coll_number;
                $arrCol['collfullnum']    = $collfullnum;
                $arrCol['countspecmonth'] = $fullcount;
                $arrCol['monthDisplay']   = $monthDisplay;
                $arrCol['yearDisplay']    = $yearDisplay;
                $arrCol['fulldatereport'] = $monthDisplay . " " . $yearDisplay;
                array_push($resultArray, $arrCol);
            }

        } else {
            $collfullnum              = 'collection number';
            $arrCol['collfullnum']    = $collfullnum;
            $arrCol['countspecmonth'] = $fullcount;
            $arrCol['monthDisplay']   = $monthDisplay;
            $arrCol['yearDisplay']    = $yearDisplay;
            $arrCol['fulldatereport'] = $monthDisplay . " " . $yearDisplay;
            $arrCol['counteachspec']  = 0;
            array_push($resultArray, $arrCol);
        }

    }
    if ($_GET['reporttype'] == "YReport") {

        $strSQL = " SELECT * FROM label_print_queue
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
                    AND print_queue = 'TRUE'
                    ORDER BY coll_code ASC,coll_year ASC, coll_number ASC,specimens_number ASC";
    }

}

$reporttype = $_GET['reporttype'] . ".tex";

try {
    LatexTemplate::download($resultArray, $reporttype, 'label.pdf');
} catch (Exception $e) {
    echo $e->getMessage();
}

// echo json_encode($resultArray);
