<?php
require "postgresql2jsonPDO.class.php";
ini_set('display_errors', 1);
error_reporting(~0);
require 'connectdb_du.php';
if (isset($_GET['sOwner'])) {

    if ($_GET['sOwner'] !== '') {
        $query = "SELECT * FROM owner WHERE owner ILIKE '%" . $_GET['sOwner'] . "%' ORDER BY owner_id ASC ";
    } else {
        exit;
    }

}
if (isset($_GET['sRoom'])) {
    if ($_GET['sRoom'] !== '') {
        $query = "SELECT * FROM room WHERE room ILIKE '%" . $_GET['sRoom'] . "%' ORDER BY room_id ASC ";
    } else {
        exit;
    }

}
if (isset($_GET['sPlace'])) {
    if ($_GET['sPlace'] !== '') {
        $query = "SELECT * FROM place WHERE place ILIKE '%" . $_GET['sPlace'] . "%' ORDER BY place_id ASC ";
    } else {
        exit;
    }

}
if (isset($_GET['sSection'])) {
    if ($_GET['sSection'] !== '') {
        $query = "SELECT * FROM orgsection WHERE section ILIKE '%" . $_GET['sSection'] . "%' ORDER BY section_id ASC ";
    } else {
        exit;
    }

}
if (isset($_GET['sStatus'])) {
    if ($_GET['sStatus'] !== '') {
        $query = "SELECT * FROM status WHERE status ILIKE '%" . $_GET['sStatus'] . "%' ORDER BY status_id ASC ";
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
