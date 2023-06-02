<?php
$strMonth = $_POST["tMonth"];
$strYear  = $_POST["tYear"];
$strMode  = $_POST["tMode"];
require 'connectdb.php';

if ($strMode == "SELECT") {

    $month = $strMonth;
    $year  = $strYear;
    
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
            $collfullnum              = $coll_code . "-" . $coll_year . "-" . $coll_number;
            $arrCol['collfullnum']    = $collfullnum;
            $arrCol['countspecmonth'] = $fullcount;
            $arrCol['monthDisplay']   = $monthDisplay;
            $arrCol['yearDisplay']    = $yearDisplay;
            if ($min_spec == $max_spec) {
                $arrCol['specimensmixed'] = $min_spec;
            } else {
                $arrCol['specimensmixed'] = $min_spec . "-" . $max_spec;
            }

            $arrCol['min_spec'] = $min_spec;
            $arrCol['max_spec'] = $max_spec;
            array_push($resultArray, $arrCol);
        }

    } else {
        $collfullnum              = 'collection number';
        $arrCol['collfullnum']    = '';
        $arrCol['countspecmonth'] = '';
        $arrCol['monthDisplay']   = $monthDisplay;
        $arrCol['yearDisplay']    = $yearDisplay;
        $arrCol['min_spec']       = '';
        $arrCol['max_spec']       = '';
        $arrCol['counteachspec']  = 0;
        array_push($resultArray, $arrCol);
    }

}

pg_close($conn);

echo json_encode($resultArray);
