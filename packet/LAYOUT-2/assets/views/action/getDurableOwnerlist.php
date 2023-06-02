<?php
require "postgresql2jsonPDO.class.php";
ini_set('display_errors', 1);
error_reporting(~0);
require 'connectdbDu.php';

$query = "SELECT * FROM owner left join orgsection on orgsection.orgsection_id= owner.ownersection_id where 
          orgsection_id = ".$_GET['tsectionid']." 
          ORDER BY owner_id ASC ";

$stmt = $PDOconn->prepare($query);
$stmt->execute();

$num = $stmt->rowCount();

$json = new postgresql2jsonPDO;
$data = $json->getJSON($stmt, $num);
echo $data;
