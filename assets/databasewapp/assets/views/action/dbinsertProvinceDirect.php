<?php
$strMode = $_POST["tMode"];
require 'connectdb.php';
$tprovince_direct_en_enter = htmlentities($_POST["tprovince_direct_en_enter"], ENT_QUOTES);
$tprovince_direct_th_enter = htmlentities($_POST["tprovince_direct_th_enter"], ENT_QUOTES);
if ($strMode == "ADD") {
    $strSQL = "INSERT INTO province_direct ";
    $strSQL .= "(province_direct_en,province_direct_th,country_direct_country_direct_id)";
    $strSQL .= "VALUES ";
    $strSQL .= "('";
    $strSQL .= $tprovince_direct_en_enter;
    $strSQL .= "','" . $tprovince_direct_th_enter;
    $strSQL .= "','" . $_POST["tcountry_direct_country_direct_id"];
    $strSQL .= "')";
    $objQuery = pg_query($strSQL);
}
pg_close($conn);
