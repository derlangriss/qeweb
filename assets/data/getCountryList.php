<?php
require "postgresql2jsonPDO.class.php";
ini_set('display_errors', 1);
error_reporting(~0);
require 'connectdb.php';

$query = "SELECT * FROM country_direct WHERE country_direct_en ILIKE '%" . $_GET['query'] . "%'
        				 ORDER BY country_direct_id ASC ";

$stmt = $PDOconn->prepare($query);
$stmt->execute();

$num = $stmt->rowCount();

$json = new postgresql2jsonPDO;
$data = $json->getJSON($stmt, $num);
echo $data;
