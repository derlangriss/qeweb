<?php
require 'connectdb.php';

$tpreinsid  = $_POST["tpreinsid"];
$tpreinsqty = $_POST["tpreinsqty"];

if (isset($_POST) && count($_POST)) {

    $strSQL = "UPDATE preins_spec SET ";
    $strSQL .= "preins_spec_qty = '" . $tpreinsqty . "' ";
    $strSQL .= "WHERE preinsid   = '" . $tpreinsid . "'";
    $objQuery = pg_query($strSQL);

}
