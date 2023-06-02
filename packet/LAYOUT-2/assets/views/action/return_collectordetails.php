<?php
require 'connectdb.php';
$resultArray = array();
if (isset($_POST["collector_id"])) {
    $strSQL = "SELECT * FROM collector 
    LEFT JOIN allimages on allimages.another_id = collector.collector_id
    WHERE images_type = 3 AND collector_id  = '" . $_POST["collector_id"] . "'";
    $objQuery    = pg_query($strSQL);
    $intNumField = pg_num_fields($objQuery);

    while ($obResult = pg_fetch_array($objQuery)) {
        $arrCol = array();
        for ($i = 0; $i < $intNumField; $i++) {
            $arrCol[pg_field_name($objQuery, $i)] = $obResult[$i];
        }
        array_push($resultArray, $arrCol);
    }
}
pg_close($conn); 
echo json_encode($resultArray);
