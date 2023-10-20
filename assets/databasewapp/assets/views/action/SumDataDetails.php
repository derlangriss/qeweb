<?php
if (!ini_get('date.timezone')) {
    date_default_timezone_set('GMT');
}
require 'connectdb.php';

if (isset($_GET['sumtype'])) {
 
    if ($_GET['sumtype'] == "PreinsMonth") {

        $strSQL = "SELECT SUM(preins_spec_qty) AS totalmonth FROM preins_spec
                   WHERE preins_state = 1";

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

    }
    if ($_GET['sumtype'] == "MonthSum") {
        $strmonth = $_GET['strmonth'];
        $date     = str_replace('/', '-', $strmonth);
        $month    = date('m', strtotime($date));
        $year     = date('Y', strtotime($date));

        $monthDisplay = date('F', strtotime($date));
        $yearDisplay  = date('Y', strtotime($date));

        $strSQL = "SELECT count(specimens_id) as counteachspec,coll_code,coll_year,coll_number
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
                array_push($resultArray, $arrCol);
            }

        } else {
            $collfullnum              = 'collection number';
            $arrCol['collfullnum']    = $collfullnum;
            $arrCol['countspecmonth'] = $fullcount;
            $arrCol['monthDisplay']   = $monthDisplay;
            $arrCol['yearDisplay']    = $yearDisplay;
            $arrCol['counteachspec']  = 0;
            array_push($resultArray, $arrCol);
        }

    }

}

pg_close($conn);

echo json_encode($resultArray);
