<?php
if (!ini_get('date.timezone')) {
    date_default_timezone_set('GMT');
}
require 'connectdb.php';
if (isset($_GET['labeltype'])) {
    $strSQL = "SELECT collection_code_id,collection_code,collection_code_note,count(collection_code_id) as countcode FROM label_print_queue
left join specimens on specimens.specimens_id = label_print_queue.label_id_to_print
left join collection on specimens.collection_coll_id = collection.coll_id
left join collection_code on collection.collection_code_collection_code_id = collection_code.collection_code_id
WHERE print_queue = 'TRUE'
group by collection_code_id,collection_code";

} else {
     $strSQL = "SELECT collection_code_id,collection_code,collection_code_note,count(collection_code_id) as countcode FROM label_print_queue
left join specimens on specimens.specimens_id = label_print_queue.label_id_to_print
left join collection on specimens.collection_coll_id = collection.coll_id
left join collection_code on collection.collection_code_collection_code_id = collection_code.collection_code_id
WHERE print_queue = 'TRUE'
group by collection_code_id,collection_code";
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
