<?php
error_reporting(0);
require 'connectdb.php';
if (isset($_POST) && count($_POST)) {

    $action                  = $_POST['action'];
    $specimens_ids           = $_POST["tspecimens_ids"];
    $arr_decode_specimensids = json_decode($specimens_ids, true);
    $spec_date               = $_POST['spec_date'];

    $resultarr = array();

    if ($action == "UPDATE") {

        $i = 0;
        foreach ($arr_decode_specimensids as $specimens_id) //Extract the Array Values by using Foreach Loop
        {

            $strSQL   = "SELECT * FROM  specimens WHERE specimens_id =" . $specimens_id;
            $objQuery = pg_query($strSQL);
            $intRows  = pg_num_rows($objQuery);
            if ($intRows > 0) {
                $res = pg_query("UPDATE specimens SET sreport_date = '" . $spec_date . "' WHERE specimens_id  ='" . $specimens_id . "'");
                $arr = array('success' => '1', 'specimens_id' => $specimens_id, 'Ins_mode' => $action);

            } else {
                $arr = array('success' => '0', 'specimens_id' => $specimens_id, 'Ins_mode' => $action);

            }
            array_push($resultarr, $arr);

        }

    } else if ($action == "delete") {

    }

    echo json_encode($resultarr);

} else {
    echo json_encode(array("success" => "0"));
}
