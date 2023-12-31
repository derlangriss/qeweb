<?php
error_reporting(0);
require 'connectdb.php';
if (isset($_POST) && count($_POST)) {

    $action            = $_POST['action'];
    $label_ids         = $_POST["tspecimens_ids"];
    $arr_decode_specid = json_decode($label_ids, true);
    $labeltype         = $_POST["tlabel_type"];
    $lidarr            = array();

    if ($action == "save") {
        $print_status = "TRUE";
        $spec_print_status = "FALSE";
        $i            = 0;
        foreach ($arr_decode_specid as $label_id) //Extract the Array Values by using Foreach Loop
        {

            $strSQL   = "SELECT * FROM  label_print_queue WHERE TRUE AND label_type ='" . $labeltype . "' AND label_id_to_print =" . $label_id;
            $objQuery = pg_query($strSQL);
            $intRows  = pg_num_rows($objQuery);
            if ($intRows > 0) {
                $res = pg_query("UPDATE label_print_queue SET print_queue = '" . $print_status . "' WHERE label_id_to_print  ='" . $label_id . "'
                AND label_type ='" . $labeltype . "'");
                $arr = array('success' => '1', 'lid' => $label_id);
                
 
            } else {
                $res          = pg_query("INSERT INTO label_print_queue VALUES(DEFAULT,'" . $labeltype . "','" . $label_id . "','1',NULL)");
                $insert_query = pg_query("SELECT lastval();");
                $insert_row   = pg_fetch_row($insert_query);
                $lid          = $insert_row[0]; 
                $arr          = array('success' => '1', 'lid' => $lid);

            }


            $strSQLlistSpec   = "UPDATE specimens SET spec_print_prelist ='" . $spec_print_status . "' WHERE specimens_id =" . $label_id;
            $objQueryLlistSpec = pg_query($strSQLlistSpec);        
         



            array_push($lidarr, $arr);

        }

    } else if ($action == "delete") {
        $print_status = "FALSE";
        foreach ($arr_decode_specid as $label_id) //Extract the Array Values by using Foreach Loop
        {

            $res      = pg_query("UPDATE label_print_queue SET print_queue = '" . $print_status . "' WHERE label_id_to_print ='" . $label_id . "'AND label_type ='" . $labeltype . "'");
            $objQuery = pg_query($res);
            $arr      = array('success' => '1', 'label_id_to_print' => $label_id);

        }
        array_push($lidarr, $arr);

    }

    echo json_encode($lidarr);

} else {
    echo json_encode(array("success" => "0"));
}
