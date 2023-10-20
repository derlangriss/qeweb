<?php
require 'connectdb.php';
$strSQL = "SELECT * FROM collector
WHERE collector_id  = '" . $_POST["collector_id"] . "'";
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
 