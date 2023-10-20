<?php
$strMode = $_POST["tMode"];
require 'connectdb.php';
$tamphur_direct_en_enter = htmlentities($_POST["tamphur_direct_en_enter"], ENT_QUOTES);
$tamphur_direct_th_enter = htmlentities($_POST["tamphur_direct_th_enter"], ENT_QUOTES);
if ($strMode == "ADD") {
    $strSQL = "INSERT INTO amphur_direct ";
    $strSQL .= "(amphur_direct_en,amphur_direct_th,province_direct_province_direct_id)";
    $strSQL .= "VALUES ";
    $strSQL .= "('";
    $strSQL .= $tamphur_direct_en_enter;
    $strSQL .= "','" . $tamphur_direct_th_enter;
    $strSQL .= "','" . $_POST["tprovince_direct_province_direct_id"];
    $strSQL .= "')";
    $objQuery = pg_query($strSQL);
}
pg_close($conn);
