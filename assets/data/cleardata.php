<?php
error_reporting(0);
require 'connectdb.php';

$deletearr    = array();
$print_status = "FALSE";
$tlabel_type  = $_POST['tlabel_type'];

$res      = pg_query("UPDATE label_print_queue SET print_queue = '" . $print_status . "' WHERE print_queue = 'TRUE' AND label_type ='" . $tlabel_type . "'");
$objQuery = pg_query($res);
$arr      = array('success' => '1');

array_push($deletearr, $arr);
echo json_encode($deletearr);
