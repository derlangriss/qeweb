<?php

require 'connectdb.php';
$collboxid   = $_GET['boxid'];
$boxstate    = $_GET['boxstate'];;
$resultArray = array();
if (isset($_GET) && count($_GET)) {

    $strSQL = "with update_collboxstatus as (";
    $strSQL .= "UPDATE collectionresbox SET "; 
    $strSQL .= "box_status = '" . $boxstate . "' ";
    $strSQL .= "where collbox_id = " . $collboxid;
    $strSQL .= "RETURNING * )";
    $strSQL .= " SELECT collbox_id,collboxno from update_collboxstatus";
    $objQuery = pg_query($strSQL);

    $row = pg_fetch_array($objQuery);
    extract($row);
    $arr = array('success' => '1', 'collboxid' => $collbox_id, 'collboxno' => $collboxno);
    array_push($resultArray, $arr);

    echo json_encode($resultArray);

}
