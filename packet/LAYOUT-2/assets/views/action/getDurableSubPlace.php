<?php
require "postgresql2jsonPDO.class.php";
ini_set('display_errors', 1);
error_reporting(~0);
require 'connectdbDu.php';

$query = "SELECT * FROM sub_place left join explace on sub_place.explace_explace_id= explace.explace_id where 
          explace_id = ".$_GET['tdurable_explaceid']." 
          ORDER BY explace_id ASC ";

$stmt = $PDOconn->prepare($query);
$stmt->execute();

$num = $stmt->rowCount();

$json = new postgresql2jsonPDO;
$data = $json->getJSON($stmt, $num);
echo $data;
