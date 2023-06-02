<?php
error_reporting(0);
require 'connectdb.php';
if (isset($_POST) && count($_POST)) {

    $action               = $_POST['action'];
    $drawer_ids           = $_POST["tdrawer_ids"];
    $arr_decode_drawerids = json_decode($drawer_ids, true);
    $family_id            = $_POST['tfamily_id'];

    $resultarr = array();

    if ($action == "UPDATE") {
        $i = 0;
        foreach ($arr_decode_drawerids as $drawer_id) //Extract the Array Values by using Foreach Loop
        {

            $strSQL   = "SELECT * FROM  specimensbox WHERE spec_box_id =" . $drawer_id;
            $objQuery = pg_query($strSQL);
            $intRows  = pg_num_rows($objQuery);
            if ($intRows > 0) {
                $res = pg_query("UPDATE specimensbox SET family_family_id = '" . $family_id . "' WHERE spec_box_id  ='" . $drawer_id . "'");
                $arr = array('success' => '1', 'drawer_id' => $drawer_id, 'Ins_mode' => $action);
            } else {
                $arr = array('success' => '0', 'drawer_id' => $drawer_id, 'Ins_mode' => $action);

            }
            array_push($resultarr, $arr);

        }

    }

    echo json_encode($resultarr);

} else {
    echo json_encode(array("success" => "0"));
}
