<?php
require "postgresql2jsonPDO.class.php";
ini_set('display_errors', 1);
error_reporting(~0);
require 'connectdb.php';

$query = "SELECT * FROM province_direct WHERE province_direct_en ILIKE '%" . $_GET['query'] . "%' AND country_direct_country_direct_id =" . $_GET['cdid'] .
    "ORDER BY province_direct_id ASC";

$stmt = $PDOconn->prepare($query);
$stmt->execute();

$num = $stmt->rowCount();

$json = new postgresql2jsonPDO;
$data = $json->getJSON($stmt, $num);
echo $data;
