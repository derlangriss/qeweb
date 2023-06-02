<?php
$strMode = $_POST["tMode"];
require 'connectdb.php';
$ttambon_direct_en_enter = htmlentities($_POST["ttambon_direct_en_enter"], ENT_QUOTES);
$ttambon_direct_th_enter = htmlentities($_POST["ttambon_direct_th_enter"], ENT_QUOTES);
if ($strMode == "ADD") {
    $strSQL = "INSERT INTO tambon_direct ";
    $strSQL .= "(tambon_direct_en,tambon_direct_th,amphur_direct_amphur_direct_id)";
    $strSQL .= "VALUES ";
    $strSQL .= "('";
    $strSQL .= $ttambon_direct_en_enter;
    $strSQL .= "','" . $ttambon_direct_th_enter;
    $strSQL .= "','" . $_POST["tamphur_direct_amphur_direct_id"];
    $strSQL .= "')";
    $objQuery = pg_query($strSQL);
}
pg_close($conn);
