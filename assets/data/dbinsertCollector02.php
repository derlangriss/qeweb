<?php
require 'connectdb.php';
$images_path      = './assets/views/action/img/uploads/collector/noimg.png';
$collector_id     = $_GET["collector_id"];
$serverUploadpath = './assets/views/action/img/uploads/collector';
$savepathtodb     = $images_path;
$images_type      = 3;

$strSQL = "SELECT * FROM allimages ";
$strSQL .= "WHERE images_type   = '" . $images_type . "' AND another_id= '" . $collector_id . "'";
$objQuery    = pg_query($strSQL);
$intRowsColl = pg_num_rows($objQuery);

if ($intRowsColl === 0) {
	echo "sompong";
	
    $strSQL = "INSERT INTO allimages ";
    $strSQL .= "(images_path,another_id,images_type)";
    $strSQL .= "VALUES ";
    $strSQL .= "('" . $savepathtodb . "','" . $collector_id . "'," . $images_type;
    $strSQL .= ")";
    $objQuery = pg_query($strSQL);
    $answer   = array('answer' => 'File transfer completed');
} else {

    $strSQL = "UPDATE allimages SET";
    $strSQL .= "(images_path)";
    $strSQL .= "VALUES ";
    $strSQL .= "('" . $images_path . "')";
    $strSQL .= "WHERE images_type ";
    $objQuery = pg_query($strSQL);
    $answer   = array('answer' => 'File transfer completed');
}

$json = json_encode($answer);
echo $json;
