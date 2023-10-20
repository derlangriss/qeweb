<?php
$strMode = $_POST["tMode"];
require 'connectdb.php';
$tcountry_direct_en_enter = htmlentities($_POST["tcountry_direct_en_enter"], ENT_QUOTES);
$tcountry_direct_th_enter = htmlentities($_POST["tcountry_direct_th_enter"], ENT_QUOTES);
if ($strMode == "ADD") {
    $strSQL = "INSERT INTO country_direct ";
    $strSQL .= "(country_direct_en,country_direct_th)";
    $strSQL .= "VALUES ";
    $strSQL .= "('";
    $strSQL .= $tcountry_direct_en_enter;
    $strSQL .= "','" . $tcountry_direct_th_enter;
    $strSQL .= "')";
    $objQuery = pg_query($strSQL);
}
pg_close($conn);
