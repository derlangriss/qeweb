<?php
require "postgresql2jsonPDO.class.php";
ini_set('display_errors', 1);
error_reporting(~0);
require 'connectdbDu.php';

$query = "SELECT * FROM orgsection 
          WHERE orgsection_id <> 0
          ORDER BY orgsection ASC ";

$stmt = $PDOconn->prepare($query);
$stmt->execute();

$num = $stmt->rowCount();

$json = new postgresql2jsonPDO;
$data = $json->getJSON($stmt, $num);
echo $data;