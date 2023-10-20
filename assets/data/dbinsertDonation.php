<?php
$strMode = $_POST["tMode"];
require 'connectdb.php';
$tdonation      = htmlentities($_POST["tdonation"], ENT_QUOTES);
$tdonation_note = htmlentities($_POST["tdonation_note"], ENT_QUOTES);
if ($strMode == "ADD") {
    $strSQL = "INSERT INTO donation ";
    $strSQL .= "(donation,donation_note)";
    $strSQL .= "VALUES ";
    $strSQL .= "('";
    $strSQL .= $tdonation;
    $strSQL .= "','" . $tdonation_note;
    $strSQL .= "')";
    $objQuery = pg_query($strSQL);
}
pg_close($conn);
