<?php
require "postgresql2jsonPDO.class.php";
ini_set('display_errors', 1);
error_reporting(~0);
require 'connectdb.php';

if (isset($_GET['sCollector'])) {

    if ($_GET['sCollector'] !== '') {
        $query = "SELECT collector_id,collector_firstname_en,collector_lastname_en FROM collector";
        $query .=" WHERE collector_firstname_en ILIKE '%" . $_GET['sCollector'] . "%' ORDER BY collector_id ASC ";
    } else {
        exit;
    }

}

$stmt = $PDOconn->prepare($query);
$stmt->execute();

$num = $stmt->rowCount();

$json = new postgresql2jsonPDO;
$data = $json->getJSON($stmt, $num);
echo $data;
