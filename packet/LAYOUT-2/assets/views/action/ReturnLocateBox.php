<?php
require "postgresql2jsonPDO.class.php";
ini_set('display_errors', 1);
error_reporting(~0);
require 'connectdb.php';

if (isset($_GET['sTransRCont'])) {

    if ($_GET['sTransRCont'] !== '') {
        $query = "SELECT * FROM specimensbox WHERE spec_box_code ILIKE '%" . $_GET['sTransRCont'] . "%' ORDER BY spec_box_code ASC LIMIT 5";
    } else {
        exit;
    }

}

if (isset($_GET['sTransCont'])) {

    if ($_GET['sTransCont'] !== '') {
        $query = "SELECT * FROM cabinet WHERE cabinet ILIKE '%" . $_GET['sTransCont'] . "%' ORDER BY cabinet_id ASC ";
    } else {
        exit;
    }

}
if (isset($_GET['sTransLock'])&&isset($_GET['sTransCont'])) {

    if ($_GET['sTransLock'] !== '') {

        $query = "SELECT * FROM subcabinet WHERE sub_cabinet ILIKE '%" . $_GET['sTransLock'] . "%'AND cabinet_cabinet_id =".$_GET['sTransCont']."
                                         ORDER BY subcabinet_id ASC ";
    } else {
        exit;
    }

}
if (isset($_GET['sTransDraw'])) {

    if ($_GET['sTransDraw'] !== '') {
        $query = "SELECT * FROM specimensbox WHERE spec_box ILIKE '%" . $_GET['sTransDraw'] . "%'AND subcabinet_subcabinet_id =".$_GET['sTransLock']."
                                         ORDER BY spec_box_id ASC ";
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
