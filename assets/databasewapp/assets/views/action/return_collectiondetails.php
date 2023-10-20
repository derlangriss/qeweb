<?php

require 'connectdb.php';

$strSQL = "SELECT * FROM collection as spec left join methods on spec.method_method_id=methods.method_id
	           left join collection_has_collector on spec.coll_id = collection_has_collector.collector_collector_id
               WHERE TRUE AND coll_code  = '" . $_POST["sCode"] . "' AND coll_year  = '" . $_POST["sYear"] . "' AND coll_number  = '" . $_POST["sNumber"] . "' ";

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

pg_close($conn);

echo json_encode($resultArray);
