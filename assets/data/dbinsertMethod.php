<?php
$strMode = $_POST["tMode"];
require 'connectdb.php';
$tmethod      = htmlentities($_POST["tmethod"], ENT_QUOTES);
$tmethod_note = htmlentities($_POST["tmethod_note"], ENT_QUOTES);
if ($strMode == "ADD") {
    $strSQL = "INSERT INTO method ";
    $strSQL .= "(method,method_note)";
    $strSQL .= "VALUES ";
    $strSQL .= "('";
    $strSQL .= $tmethod;
    $strSQL .= "','" . $tmethod_note;
    $strSQL .= "')";
    $objQuery = pg_query($strSQL);
}
pg_close($conn);
