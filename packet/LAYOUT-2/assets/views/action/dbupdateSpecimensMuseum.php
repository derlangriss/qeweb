<?php
error_reporting(0);
require 'connectdb.php';
if (isset($_POST) && count($_POST)) {

    $action                  = $_POST['taction'];
    $specimens_ids           = $_POST["tspecimens_ids"];
    $arr_decode_specimensids = json_decode($specimens_ids, true);
    $species_id              = $_POST['tspecies_id'];
    $container_id            = $_POST['container_id'];
    $container_type          = $_POST['container_type'];
    $actionmode              = $_POST['tactionmode'];
    $treport_month           = $_POST['tmonth'];
    $treport_year            = $_POST['tyear'];
    $museumstatus            = $_POST['tmuseumstatus'];

    $resultarr = array();

    if ($action == "UPDATE") {
        if ($actionmode == "0") {

            $i = 0;
            foreach ($arr_decode_specimensids as $specimens_id) //Extract the Array Values by using Foreach Loop
            {

                $strSQL   = "SELECT * FROM  specimens WHERE specimens_id =" . $specimens_id;
                $objQuery = pg_query($strSQL);
                $intRows  = pg_num_rows($objQuery);
                if ($intRows > 0) {

                    $res = pg_query("UPDATE specimens SET species_species_id = '" . $species_id . "' WHERE specimens_id  ='" . $specimens_id . "'");

                    $arr = array('success' => '1', 'specimens_id' => $specimens_id, 'Ins_mode' => $action);

                } else {
                    $arr = array('success' => '0', 'specimens_id' => $specimens_id, 'Ins_mode' => $action);

                }
                array_push($resultarr, $arr);

            }

        }

        if ($actionmode == "1") {

            $i = 0;
            foreach ($arr_decode_specimensids as $specimens_id) //Extract the Array Values by using Foreach Loop
            {

                if (isset($container_id) && isset($container_type)) {

                    $strSQL   = "SELECT * FROM  specimens WHERE specimens_id =" . $specimens_id;
                    $objQuery = pg_query($strSQL);
                    $intRows  = pg_num_rows($objQuery);
                    if ($intRows > 0) {

                        $res = pg_query("UPDATE specimens SET species_species_id = '" . $species_id . "', container_type = '" . $container_type . "',container_id = '" . $container_id . "' WHERE specimens_id  ='" . $specimens_id . "'");

                        $arr = array('success' => '1', 'specimens_id' => $specimens_id, 'Ins_mode' => $action, 'container_type' => $container_type, 'container_id' => $container_id);

                    } else {
                        $arr = array('success' => '0', 'specimens_id' => $specimens_id, 'Ins_mode' => $action, 'container_type' => $container_type, 'container_id' => $container_id);

                    }
                    array_push($resultarr, $arr);
                }

            }

            $res01 = pg_query("SELECT COUNT(*) AS allcount from specimens WHERE container_id = '" . $container_id . "' AND container_type = '" . $container_type . "'  AND EXTRACT(MONTH FROM sreport_date) = '" . $treport_month . "' AND EXTRACT(YEAR FROM sreport_date) ='" . $treport_year . "'");

            $row01 = pg_fetch_array($res01);
            extract($row01);
            if ($allcount !== 0) {
                $res02 = pg_query("UPDATE userlockbox SET lockbox_boxstatus = 3 FROM specimens WHERE EXTRACT(MONTH FROM specimens.sreport_date) = EXTRACT(MONTH FROM userlockbox.lockbox_mreport) AND EXTRACT(YEAR FROM specimens.sreport_date) = EXTRACT(YEAR FROM userlockbox.lockbox_mreport) AND EXTRACT(MONTH FROM sreport_date) = '" . $treport_month . "' AND EXTRACT(YEAR FROM sreport_date) ='" . $treport_year . "'");
            }

        }

        if ($actionmode == "2") {

            $i = 0;
            foreach ($arr_decode_specimensids as $specimens_id) //Extract the Array Values by using Foreach Loop
            {

                $strSQL   = "SELECT * FROM  specimens WHERE specimens_id =" . $specimens_id;
                $objQuery = pg_query($strSQL);
                $intRows  = pg_num_rows($objQuery);
                if ($intRows > 0) {

                    $res = pg_query("UPDATE specimens SET species_species_id = '" . $species_id . "' WHERE specimens_id  ='" . $specimens_id . "'");

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
