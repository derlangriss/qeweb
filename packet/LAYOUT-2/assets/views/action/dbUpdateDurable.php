<?php
if (!ini_get('date.timezone')) {
    date_default_timezone_set('GMT');
}

$strMode = $_GET["tMode"];
require 'durable_connect.php';

if ($strMode == "ADD") {

    $strSQL = "INSERT INTO durablelist ";
    $strSQL .= "(NOTE)";
    $strSQL .= "VALUES ";
    $strSQL .= "('" . $_GET["tnote"] . "')";

    $objQuery = mysqli_query($objConnect, $strSQL);

}

if ($strMode == "UPDATE") {

    echo $_GET["tNote"];

    $strSQL = "UPDATE durablelist SET ";
/*
$strSQL .="DURABLE_NO_ID = '".$_GET["tdurable_number"]."' ";
 */
    $strSQL .= "DURABLE_NAME_ID = '" . $_GET["tDurableName"] . "' ";
    $strSQL .= ",PRICE = '" . $_GET["tDurablePrice"] . "' ";
    $strSQL .= ",PICTURE = '" . $_GET["tPicture"] . "' ";
    $strSQL .= ",PLACE_ALWAYS_ID = '" . $_GET["tPlaceAlways"] . "' ";
    $strSQL .= ",ROOM_ID = '" . $_GET["tRoom"] . "' ";
    $strSQL .= ",PLACE_ID = '" . $_GET["tPlace"] . "' ";
    $strSQL .= ",OWNER_ID = '" . $_GET["tOwner"] . "' ";
    $strSQL .= ",STATUS_ID = '" . $_GET["tstatus"] . "' ";
    $strSQL .= ",NOTE = '" . $_GET["tNote"] . "' ";
    $strSQL .= ",DURABLE_NO_MAIN = '" . $_GET["tDurableNoMain"] . "' ";
    $strSQL .= ",DURABLE_NO_ID = '" . $_GET["tdurableNo"] . "' ";

    $strSQL .= "WHERE DURABLELIST_ID	 = '" . $_GET["tdurablelistid"] . "' ";

    $objQuery = mysqli_query($objConnect, $strSQL);

}
