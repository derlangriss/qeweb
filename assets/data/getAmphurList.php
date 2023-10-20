<?php
require "postgresql2jsonPDO.class.php";
ini_set('display_errors', 1);
error_reporting(~0);
require 'connectdb.php';

$query = "SELECT * FROM amphur_direct WHERE amphur_direct_en ILIKE '%" . $_GET['query'] . "%' AND province_direct_province_direct_id =" . $_GET['pdid'] .
    "ORDER BY amphur_direct_id ASC";

$stmt = $PDOconn->prepare($query);
$stmt->execute();

$num = $stmt->rowCount();

$json = new postgresql2jsonPDO;
$data = $json->getJSON($stmt, $num);
echo $data;
