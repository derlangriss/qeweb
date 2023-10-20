<?php
require 'connectdb.php';

if (isset($_GET['sCode'])) {
    if ($_GET['sCode'] !== '') {
        $strSQL = "SELECT coll_code, coll_year, coll_number, specimens_number FROM collection
	LEFT JOIN specimens ON (collection.coll_id= specimens.collection_coll_id)
	WHERE coll_code  ILIKE '" . $_GET["sCode"] . "'
	order by coll_year desc,coll_number desc,specimens_number desc limit 1";
    } else {
        $resultArray = array();
        $arr         = array('coll_code' => '', 'coll_year' => '', 'coll_number' => '', 'specimens_number' => '');
        array_push($resultArray, $arr);
        echo json_encode($resultArray);
        exit;
    }

}

if (isset($_GET['sYear'])) {

    if ($_GET['sYear'] !== '') {
        $strSQL = "SELECT coll_code, coll_year, coll_number, specimens_number FROM specimens
	LEFT JOIN collection ON (collection.coll_id= specimens.collection_coll_id)
	WHERE coll_year  = '" . $_GET["sYear"] . "'
	order by specimens_number desc limit 1";
    } else {
        exit;
    }

}

if (isset($_GET['sNumber'])) {
    $strSQL = "SELECT coll_code, coll_year, coll_number, specimens_number FROM collection
	LEFT JOIN specimens ON (collection.coll_id= specimens.collection_coll_id)
	WHERE coll_number  = '" . $_GET["sNumber"] . "'
	order by specimens_number desc  limit 1";

}

if (isset($_GET['sYear']) && isset($_GET['sNumber'])) {
    $strSQL = "SELECT coll_code, coll_year, coll_number, specimens_number,coll_id FROM collection
	LEFT JOIN specimens ON (collection.coll_id= specimens.collection_coll_id)
	WHERE coll_year = '" . $_GET["sYear"] . "' AND coll_number = '" . $_GET["sNumber"] . "'
	ORDER BY specimens_number desc limit 1";

    /*

WHERE coll_year = '".$_GET["sNumber"]."' AND coll_number  = '".$_GET["sNumber"]."'
order by specimen_number desc  limit 1";

 */

}

if (isset($_GET['sCode']) && isset($_GET['sYear']) && isset($_GET['sNumber']) && isset($_GET['sSpecnum'])) {
    $strSQL = "SELECT coll_code, coll_year, coll_number, specimens_number FROM collection
	LEFT JOIN specimens ON (collection.coll_id= specimens.collection_coll_id)
	WHERE coll_code = '" . $_GET["sCode"] . "' AND coll_year = '" . $_GET["sYear"] . "' AND coll_number = '" . $_GET["sNumber"] . "' AND specimens_number = '" . $_GET["sNumber"] . "'
	ORDER BY specimens_number desc limit 1";

    /*

WHERE coll_year = '".$_GET["sNumber"]."' AND coll_number  = '".$_GET["sNumber"]."'
order by specimen_number desc  limit 1";

 */

}

$objQuery    = pg_query($strSQL);
$intNumField = pg_num_fields($objQuery);
$intNumRows  = pg_num_rows($objQuery);
$resultArray = array();
if ($intNumRows === 0) {

    $resultArray = array();
    $arr         = array('coll_code' => '', 'coll_year' => '', 'coll_number' => '', 'specimens_number' => '', 'coll_id' => '');
    array_push($resultArray, $arr);

}
while ($obResult = pg_fetch_array($objQuery)) {
    $arrCol = array();
    for ($i = 0; $i < $intNumField; $i++) {
        if (pg_field_name($objQuery, $i) == 'specimens_number') {
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
}

pg_close($conn);

echo json_encode($resultArray);
