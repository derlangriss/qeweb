<?php
require 'connectdb.php';
$resultArray       = array();
$tcollectorid      = htmlentities(trim($_POST["tcollectorid"]), ENT_QUOTES);
$tcollectorfirstEN = htmlentities(trim($_POST["tcollectorfirstEN"]), ENT_QUOTES);
$tcollectorlastEN  = htmlentities(trim($_POST["tcollectorlastEN"]), ENT_QUOTES);
$tcollectorfirstTH = htmlentities(trim($_POST["tcollectorfirstTH"]), ENT_QUOTES);
$tcollectorlastTH  = htmlentities(trim($_POST["tcollectorlastTH"]), ENT_QUOTES);

if ($tcollectorid == null) {
    $strSQL = "with collector_ids as (";
    $strSQL .= "INSERT INTO collector ";
    $strSQL .= "(collector_firstname_en,collector_lastname_en,collector_firstname_th,collector_lastname_th)";
    $strSQL .= "VALUES ";
    $strSQL .= "('";
    $strSQL .= $tcollectorfirstEN;
    $strSQL .= "','" . $tcollectorlastEN;
    $strSQL .= "','" . $tcollectorfirstTH;
    $strSQL .= "','" . $tcollectorlastTH;

    $strSQL .= "')RETURNING collector_id )";
    $strSQL .= " SELECT collector_id from collector_ids";
    $objQuery = pg_query($strSQL);

    $row = pg_fetch_array($objQuery);
    extract($row);

    $arr = array('collector_id' => $collector_id, 'Ins_mode' => 'ADD');
    array_push($resultArray, $arr);
} else {

    $strSQL = "UPDATE collector SET ";
    $strSQL .= "collector_firstname_en = '" . $tcollectorfirstEN . "' ";
    $strSQL .= ",collector_lastname_en = '" . $tcollectorlastEN . "' ";
    $strSQL .= ",collector_firstname_th = '" . $tcollectorfirstTH . "' ";
    $strSQL .= ",collector_lastname_th = '" . $tcollectorlastTH . "' ";
    $strSQL .= "WHERE collector_id   = '" . $tcollectorid . "'";
    $objQuery = pg_query($strSQL);
    $arr = array('collector_id' => $tcollectorid, 'Ins_mode' => 'UPDATE');
    array_push($resultArray, $arr);

}
echo json_encode($resultArray);
pg_close($conn);
