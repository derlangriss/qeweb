<?php
error_reporting(0);
require 'connectdb.php';
if (isset($_POST) && count($_POST)) {

    $action            = $_POST['action'];
    $label_ids         = $_POST["tspecimens_ids"];
    $arr_decode_specid = json_decode($label_ids, true);
    $labeltype         = $_POST["tlabel_type"];
    $lidarr            = array();
    $labeltype         = "specimens";

    if ($action == "delete") {
        $item_id             = $_POST['item_id'];
        $print_status        = "FALSE";
        $spec_print_prelist  = "TRUE";
        $printed_list_status = "TRUE";
        $print_prelist       = "TRUE";

        $res03 = pg_query("UPDATE label_print_queue SET print_queue = '" . $print_status . "' WHERE label_id_to_print ='" . $item_id . "' AND label_type= '" . $labeltype . "'");

        $strSQL   = "SELECT * FROM  label_print_queue WHERE TRUE AND label_type ='" . $labeltype . "' AND label_id_to_print ='" . $item_id . "' AND printed_list ='" . $printed_list_status . "'";
        $objQuery = pg_query($strSQL);
        $intRows  = pg_num_rows($objQuery);
        if ($intRows > 0) {

            $res01 = pg_query("UPDATE label_print_queue SET print_prelist = '" . $print_prelist . "', print_queue = '" . $print_status . "' WHERE label_id_to_print ='" . $item_id . "' AND label_type= '" . $labeltype . "'");
            echo json_encode(array("success" => "1", "item_id" => $item_id));

        } else {

            $res02 = pg_query("UPDATE specimens SET spec_print_prelist = '" . $spec_print_prelist . "' WHERE specimens_id ='" . $item_id . "'");
            echo json_encode(array("success" => "1", "item_id" => $item_id));

        }

/*
if ($res02) {
echo json_encode(array("success" => "1", "item_id" => $item_id));
} else {
echo json_encode(array("success" => "0"));
}*/

    }

} else {
    echo json_encode(array("success" => "0"));
}
