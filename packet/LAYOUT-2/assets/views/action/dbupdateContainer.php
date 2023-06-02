<?php
error_reporting(0);
require 'connectdb.php';
if (isset($_POST) && count($_POST)) {

    $action                  = $_POST['taction'];
    $specimens_ids           = $_POST["tspecimens_ids"];
    $arr_decode_specimensids = json_decode($specimens_ids, true);
    $drcode_id               = $_POST['tdrcode_id'];
    $codetype                = $_POST['tcodetype'];
    $excontainer_type        = 2;
  

    $resultarr = array();

    if ($action == "UPDATE") {
        if ($codetype === "DrcodeMuseum") {
          
            foreach ($arr_decode_specimensids as $specimens_id) //Extract the Array Values by using Foreach Loop
            {

                $strSQL   = "SELECT * FROM  specimens WHERE specimens_id =" . $specimens_id;
                $objQuery = pg_query($strSQL);
                $intRows  = pg_num_rows($objQuery);
                if ($intRows > 0) {

                    $res = pg_query("UPDATE specimens SET container_type = '" . $excontainer_type . "' ,specbox_spec_box_id = '" . $drcode_id . "' WHERE specimens_id  ='" . $specimens_id . "'");
                    $arr = array('success' => '1', 'specimens_id' => $specimens_id, 'Ins_mode' => $action);
                } else {
                    $arr = array('success' => '0', 'specimens_id' => $specimens_id, 'Ins_mode' => $action);

                }
                array_push($resultarr, $arr);

            }

        }
        if ($codetype === "Drcode") {
            $i = 0;
            foreach ($arr_decode_specimensids as $specimens_id) //Extract the Array Values by using Foreach Loop
            {

                $strSQL   = "SELECT * FROM  specimens WHERE specimens_id =" . $specimens_id;
                $objQuery = pg_query($strSQL);
                $intRows  = pg_num_rows($objQuery);
                if ($intRows > 0) {

                    $res = pg_query("UPDATE specimens SET container_type = '" . $excontainer_type . "' ,specbox_spec_box_id = '" . $drcode_id . "' WHERE specimens_id  ='" . $specimens_id . "'");
                    $arr = array('success' => '1', 'specimens_id' => $specimens_id, 'Ins_mode' => $action);
                } else {
                    $arr = array('success' => '0', 'specimens_id' => $specimens_id, 'Ins_mode' => $action);

                }
                array_push($resultarr, $arr);

            }

        }

        if ($codetype == "ChainDrcode") {
            $i = 0;
            foreach ($arr_decode_specimensids as $specimens_id) //Extract the Array Values by using Foreach Loop
            {

                $strSQL   = "SELECT * FROM  specimens WHERE specimens_id =" . $specimens_id;
                $objQuery = pg_query($strSQL);
                $intRows  = pg_num_rows($objQuery);
                if ($intRows > 0) {

                    $res = pg_query("UPDATE specimens SET container_type = '" . $excontainer_type . "' ,specbox_spec_box_id = '" . $drcode_id . "' WHERE specimens_id  ='" . $specimens_id . "'");
                    $arr = array('success' => '1', 'specimens_id' => $specimens_id, 'Ins_mode' => $action);
                } else {
                    $arr = array('success' => '0', 'specimens_id' => $specimens_id, 'Ins_mode' => $action);

                }
                array_push($resultarr, $arr);

            }

        }

    } else if ($action == "delete") {

    }

    echo json_encode($resultarr);

} else {
    echo json_encode(array("success" => "0"));
}
