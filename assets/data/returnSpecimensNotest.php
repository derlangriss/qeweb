<?php
require 'connectdb.php';
$strSQL = "SELECT coll_code, coll_year, coll_number, specimens_number FROM collection
LEFT JOIN specimens ON (collection.coll_id= specimens.collection_coll_id)
        ORDER BY coll_year DESC, coll_number DESC ,specimens_number DESC LIMIT 1";
$objQuery    = pg_query($strSQL);
$intNumField = pg_num_fields($objQuery);
$resultArray = array();
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
