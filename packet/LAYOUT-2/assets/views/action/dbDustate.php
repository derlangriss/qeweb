<?php
if (!ini_get('date.timezone')) {
    date_default_timezone_set('GMT');
}
require 'connectdbDu.php';

if (isset($_POST) && count($_POST)) {

    $strMode     = $_POST["taction"];
    $resultArray = array();
    if ($strMode == "DUSTATE") {

        $tdurableid = $_POST["tdurableid"];
        $tdustate   = $_POST["tdustate"];

        $SQLcheckstatus = "SELECT durablelist_id FROM durablelist ";
        $SQLcheckstatus .= "WHERE durablelist_id ='" . $tdurableid . "' ";
        $objQuerycheckstatus = pg_query($SQLcheckstatus);
        $intRowscheckstatus  = pg_num_rows($objQuerycheckstatus);

        if ($intRowscheckstatus == 0) {
            $arr = array('success' => '0', 'specimens_id' => '0');
            array_push($resultArray, $arr);
        } else {
            $rowcheckstatus = pg_fetch_array($objQuerycheckstatus);
            extract($rowcheckstatus);

            $strSQLUpdateStatus = "UPDATE durablelist SET m_status_id = '" . $tdustate . "'";
            $strSQLUpdateStatus .= "WHERE durablelist_id ='" . $tdurableid . "'";
            $objQueryUpdateStatus   = pg_query($strSQLUpdateStatus);
            $arr = array('success' => '1', 'durablelist_id' => $tdurableid);
            array_push($resultArray, $arr);
        }

    }

    echo json_encode($resultArray);
} else {

    echo json_encode(array("success" => "0"));
}
