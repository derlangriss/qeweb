<?php
require 'connectdb.php';

$collector_id     = $_GET["collector_id"];
$imgname          = $_GET["imgname"];
$serverUploadpath = './assets/views/action/img/uploads/collector';
$savepathtodb     = $serverUploadpath . $imgname;
$images_type      = 3;

$strSQL = "SELECT * FROM allimages ";
$strSQL .= "WHERE images_type   = '" . $images_type . "' AND another_id= '" . $collector_id . "'";
$objQuery    = pg_query($strSQL);
$intRowsColl = pg_num_rows($objQuery);

if ($intRowsColl === 0) {
    $strSQL = "INSERT INTO allimages ";
    $strSQL .= "(images_path,another_id,images_type)";
    $strSQL .= "VALUES ";
    $strSQL .= "('" . $savepathtodb . "','" . $collector_id . "'," . $images_type;
    $strSQL .= ")";
    $objQuery = pg_query($strSQL);
    $answer   = array('answer' => 'File transfer completed');
} else {
    $strSQL = "UPDATE allimages SET ";
    $strSQL .= "images_path = '" . $savepathtodb . "' ";
    $strSQL .= "WHERE images_type= " . $images_type . " AND another_id= '" . $collector_id . "'";
    $objQuery = pg_query($strSQL);
    $answer   = array('answer' => 'File transfer completed');

}

$json = json_encode($answer);
echo $json;
