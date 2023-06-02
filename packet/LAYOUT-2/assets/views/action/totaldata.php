<?php
if (!ini_get('date.timezone')) {
    date_default_timezone_set('GMT');
}
require 'connectdb.php';
if (isset($_GET['labeltype'])) {
    $sql = "SELECT SUM(numberofitem) AS totallabel,SUM((numberofitem)/174::float) AS totalpapersize FROM label_print_queue
            WHERE label_type ='" . $_GET['labeltype'] . "' AND print_queue ='TRUE'";
} else {
    $sql = "SELECT SUM(numberofitem) AS totallabel,SUM((numberofitem)/174::float) AS totalpapersize FROM label_print_queue";
}

$resultArray = array();
$res         = pg_query($sql);
$row         = pg_fetch_array($res); 
extract($row);
$roundtotalpapersize = round($totalpapersize,2);
$roundtotallabel = round($totallabel);

$arr = array('totallabel' => $roundtotallabel, 'totalpapersize' => $roundtotalpapersize);
array_push($resultArray, $arr);
echo json_encode($resultArray);
