<?php
require "postgresql2jsonPDO.class.php";
ini_set('display_errors', 1);
error_reporting(~0);
require 'connectdb.php';

$query = "SELECT count(*) FROM specimens WHERE specimens_trash= 1";

$stmt = $PDOconn->prepare($query);
$stmt->execute();
$num  = $stmt->rowCount();
$json = new postgresql2jsonPDO;
$data = $json->getJSON($stmt, $num);
echo $data;
