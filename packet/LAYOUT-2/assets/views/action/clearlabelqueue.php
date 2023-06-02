<?php
error_reporting(0);
require 'connectdb.php';

$deletearr      = array();
$print_status   = "FALSE";
$n_print_status = "TRUE";
$action    = $_POST['taction'];

if($action == 'CLEARALL'){
$res      = pg_query("UPDATE specimens SET print_status = '" . $n_print_status . "' WHERE print_status =' " . $print_status . "'");
$objQuery = pg_query($res);

$res01      = pg_query("UPDATE label_print_queue SET print_queue = '" . $print_status . "' WHERE print_queue =' " . $n_print_status . "'");
$objQuery01 = pg_query($res01);

$arr = array('success' => '1');	
}else if($action == 'CLEAR'){

$specimens_id = $_POST['tspecimens_id']; 

$res      = pg_query("UPDATE specimens SET print_status = '" . $n_print_status . "' WHERE specimens_id =' " . $specimens_id . "'");
$objQuery = pg_query($res);

$res01      = pg_query("UPDATE label_print_queue SET print_queue = '" . $print_status . "' WHERE label_id_to_print =' " . $specimens_id . "'");
$objQuery01 = pg_query($res01);

}



array_push($deletearr, $arr);
echo json_encode($deletearr);
