<?php
require "postgresql2jsonPDO.class.php";
ini_set('display_errors', 1);
error_reporting(~0);
require 'connectdb.php';

if (isset($_GET['sTorder'])) {

    $query = "SELECT * FROM torder ORDER BY tordername ASC ";

    $stmt = $PDOconn->prepare($query);
    $stmt->execute();

    $num = $stmt->rowCount();
}
if (isset($_GET['sFamily'])) {

    $query = "SELECT * FROM family ORDER BY familyname ASC ";

    $stmt = $PDOconn->prepare($query);
    $stmt->execute();

    $num = $stmt->rowCount();
}
if (isset($_GET['sGenus'])) {

    $query = "SELECT * FROM genus ORDER BY genusname ASC ";

    $stmt = $PDOconn->prepare($query);
    $stmt->execute();

    $num = $stmt->rowCount();
}
if (isset($_GET['sSpecies'])) {

    $query = "SELECT * FROM species ORDER BY speciesname ASC ";

    $stmt = $PDOconn->prepare($query);
    $stmt->execute();

    $num = $stmt->rowCount();
}

$json = new postgresql2jsonPDO;
$data = $json->getJSON($stmt, $num);
echo $data;
