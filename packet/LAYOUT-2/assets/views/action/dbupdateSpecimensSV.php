<?php
error_reporting(0);
require 'connectdb.php';
if (isset($_POST) && count($_POST)) {

    $action                  = $_POST['action'];
    $specimens_ids           = $_POST["tspecimens_ids"];
    $arr_decode_specimensids = json_decode($specimens_ids, true);
    $species_id              = $_POST['species_id'];
    $container_id            = $_POST['container_id'];
    $container_type          = $_POST['container_type'];

    $resultarr = array(); 

    if ($action == "UPDATE") {

        $i = 0;
        foreach ($arr_decode_specimensids as $specimens_id) //Extract the Array Values by using Foreach Loop
        {

            $strSQL   = "SELECT * FROM  specimens WHERE specimens_id =" . $specimens_id;
            $objQuery = pg_query($strSQL);
            $intRows  = pg_num_rows($objQuery);
            if ($intRows > 0) {


                $strSQL = "UPDATE specimens SET ";
                $strSQL .= "container_id = '" . $container_id . "' ";
                $strSQL .= ",container_type = '" . $container_type . "' ";
                $strSQL .= trim($species_id != '' ? ',species_species_id = ' : '') . ($species_id != '' ? "'" . $species_id . "'" : '');
                $strSQL .= "WHERE specimens_id   = '" . $specimens_id . "'";
                $objQuery = pg_query($strSQL);

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
