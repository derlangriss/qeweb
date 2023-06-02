<?php
if (!ini_get('date.timezone')) {
    date_default_timezone_set('GMT');
}
require 'connectdbDu.php';

if (isset($_POST) && count($_POST)) {

    $strMode     = $_POST["taction"];
    $strDurableid   = $_POST["tdurableid"];   
    $strDurabletrash   = 2;   

    $resultArray = array();
    if ($strMode == "DELETE") {

        $SQLcheckstatus = "SELECT durablelist_id FROM durablelist ";
        $SQLcheckstatus .= "WHERE durablelist_id ='" . $strDurableid . "' ";
        $objQuerycheckstatus = pg_query($SQLcheckstatus);
        $intRowscheckstatus  = pg_num_rows($objQuerycheckstatus);

        if ($intRowscheckstatus == 0) {
            $arr = array('success' => '0', 'specimens_id' => '0');
            array_push($resultArray, $arr);
        } else {
            $rowcheckstatus = pg_fetch_array($objQuerycheckstatus);
            extract($rowcheckstatus);

            $strSQLUpdateStatus = "UPDATE durablelist SET du_trash = '" . $strDurabletrash . "'";
            $strSQLUpdateStatus .= "WHERE durablelist_id ='" . $strDurableid . "'";
            $objQueryUpdateStatus   = pg_query($strSQLUpdateStatus);
            $arr = array('success' => '1', 'durablelist_id' => $strDurableid);
            array_push($resultArray, $arr);
        }

    }

    echo json_encode($resultArray);
} else {

    echo json_encode(array("success" => "0"));
}
