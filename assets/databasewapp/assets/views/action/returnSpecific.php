<?php
require "postgresql2jsonPDO.class.php";
ini_set('display_errors', 1);
error_reporting(~0);
require 'connectdb.php';
if (isset($_GET['sPinor'])) {
 
    if ($_GET['sPinor'] !== '') {
        $query = "SELECT * FROM pinor WHERE p_firstname ILIKE '%" . $_GET['sPinor'] . "%' ORDER BY pinor_id ASC ";
    } else {
        exit;
    }

}
if (isset($_GET['sLabelor'])) {
    if ($_GET['sLabelor'] !== '') {
        $query = "SELECT * FROM labelor WHERE l_firstname ILIKE '%" . $_GET['sLabelor'] . "%' ORDER BY labelor_id ASC ";
    } else {
        exit;
    }

}
if (isset($_GET['sIdentification'])) {
    if ($_GET['sIdentification'] !== '') {
        $query = "SELECT * FROM identification WHERE i_firstname ILIKE '%" . $_GET['sIdentification'] . "%' ORDER BY identification_id ASC ";
    } else {
        exit;
    }

}

$stmt = $PDOconn->prepare($query);
$stmt->execute();
$num  = $stmt->rowCount();
$json = new postgresql2jsonPDO;
$data = $json->getJSON($stmt, $num);
echo $data;
