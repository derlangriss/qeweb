<?php
if (!ini_get('date.timezone')) {
    date_default_timezone_set('GMT');
}
require 'connectdb.php';
$labeltype = $_POST["tlabel_type"];
if (isset($labeltype) && count($labeltype)) {

    $strSQL = "SELECT * FROM label_print_queue
               LEFT JOIN specimens ON label_print_queue.label_id_to_print = specimens.specimens_id
               WHERE label_type = '" . $labeltype . "'
               AND print_queue = 'TRUE'";

}

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
