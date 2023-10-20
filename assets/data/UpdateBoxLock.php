<?php

require 'connectdb.php';
$collboxid   = $_GET['boxid'];
$boxlock    = 1;
$resultArray = array();
if (isset($_GET) && count($_GET)) {
 
    $strSQL = "with update_collbox as (";
    $strSQL .= "UPDATE collectionresbox SET ";
    $strSQL .= "box_lock = '" . $boxlock . "' ";
    $strSQL .= "where collbox_id = " . $collboxid;
    $strSQL .= "RETURNING * )";
    $strSQL .= " SELECT collbox_id,collboxno from update_collbox";
    $objQuery = pg_query($strSQL);

    $row = pg_fetch_array($objQuery);
    extract($row);
    $arr = array('success' => '1', 'collboxid' => $collbox_id, 'collboxno' => $collboxno);
    array_push($resultArray, $arr);

    echo json_encode($resultArray);

}
 