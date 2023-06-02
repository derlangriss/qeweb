<?php
if (!ini_get('date.timezone')) {
    date_default_timezone_set('GMT');
}
require 'connectdb.php';

if (isset($_POST) && count($_POST)) {

    $specimens_trash   = "2";
    $specimens_trash_n = "1";
    $strMode           = $_POST["taction"];

    $resultarray = array();

    if ($strMode == "DELETE") {

        $arr_decode_speicmensids = json_decode($_POST["speicmensids"], true);
        foreach ($arr_decode_speicmensids as $speicmensids) //Extract the Array Values by using Foreach Loop
        {

            $res = pg_query("UPDATE specimens SET specimens_trash = '" . $specimens_trash . "' WHERE specimens_id ='" . $speicmensids . "'");

            $arr = array('success' => '1', 'specimens_id' => $speicmensids);
            array_push($resultarray, $arr);
        }

        echo json_encode($resultarray);

    }

    if ($strMode == "REMOVESPEC") {
        $tcontainer_id   = $_POST["tcontainer_id"];
        $tcontainer_type = $_POST["tcontainer_type"];
        $treport_month   = $_POST["treport_month"];
        $treport_year    = $_POST["treport_year"];

        $arr_decode_speicmensids = json_decode($_POST["speicmensids"], true);
        foreach ($arr_decode_speicmensids as $speicmensids) //Extract the Array Values by using Foreach Loop
        {
            $res = pg_query("UPDATE specimens SET container_id  = 0,container_type = 0 WHERE specimens_id ='" . $speicmensids . "'");
        }

        $res01 = pg_query("SELECT COUNT(*) AS allcount from specimens WHERE container_id = '" . $tcontainer_id . "' AND container_type = '" . $tcontainer_type . "'  AND EXTRACT(MONTH FROM sreport_date) = '" . $treport_month . "' AND EXTRACT(YEAR FROM sreport_date) ='" . $treport_year . "'");

        $row01 = pg_fetch_array($res01);
        extract($row01);

        if ($allcount == 0) {
            $res02 = pg_query("UPDATE userlockbox SET lockbox_boxstatus = 1 WHERE lockbox_boxid  = ".$tcontainer_id." AND EXTRACT(MONTH FROM lockbox_mreport) = '" . $treport_month . "' AND EXTRACT(YEAR FROM lockbox_mreport) ='" . $treport_year . "'");
        
        } else {

             $res02 = pg_query("UPDATE userlockbox SET lockbox_boxstatus = 3 WHERE lockbox_boxid  = ".$tcontainer_id." AND EXTRACT(MONTH FROM lockbox_mreport) = '" . $treport_month . "' AND EXTRACT(YEAR FROM lockbox_mreport) ='" . $treport_year . "'");
        

        }
      /*  $row02 = pg_fetch_array($res02);
        extract($row02);*/

        $arr = array('success' => '1'/*, 'boxstatus' => $lockbox_status*/);
        array_push($resultarray, $arr);

        echo json_encode($resultarray);

    }

    if ($strMode == "MOVETOBOX") {

        $tcontainer_id   = $_POST["tcontainer_id"];
        $tcontainer_type = $_POST["tcontainer_type"];
        $treport_month   = $_POST["treport_month"];
        $treport_year    = $_POST["treport_year"];

        $rescheckstatus = pg_query("SELECT lockbox_boxstatus FROM userlockbox WHERE lockbox_boxid ='" . $tcontainer_id . "' AND AND EXTRACT(MONTH FROM lockbox_mreport) = '" . $treport_month . "' AND EXTRACT(YEAR FROM lockbox_mreport) ='" . $treport_year . "'");
        $rowcheckstatus = pg_fetch_array($rescheckstatus);
        extract($rowcheckstatus);
        if ($lockbox_boxstatus == 2) {

            $speicmensids = 0;
            $allcount     = 0;
            $arr          = array('success' => '0', 'specimens_id' => $speicmensids, 'allcount' => $allcount);
            array_push($resultarray, $arr);
        } else {

            $arr_decode_speicmensids = json_decode($_POST["speicmensids"], true);
            foreach ($arr_decode_speicmensids as $speicmensids) //Extract the Array Values by using Foreach Loop
            {

                $res = pg_query("with sample_ids as ( " . "UPDATE specimens SET container_id  = '" . $tcontainer_id . "',container_type = '" . $tcontainer_type . "' WHERE specimens_id ='" . $speicmensids . "'" . ")" . "SELECT COUNT(*) AS allcount from specimens WHERE container_id = '" . $tcontainer_id . "' AND container_type = '" . $tcontainer_type . "'  AND EXTRACT(MONTH FROM sreport_date) = '" . $treport_month . "' AND EXTRACT(YEAR FROM sreport_date) ='" . $treport_year . "'");
                $row = pg_fetch_array($res);
                extract($row);

                $arr = array('success' => '1', 'specimens_id' => $speicmensids, 'allcount' => $allcount);
                array_push($resultarray, $arr);
            }

            if ($allcount !== 0) {
                $res02 = pg_query("UPDATE userlockbox SET lockbox_boxstatus = 3 FROM specimens WHERE EXTRACT(MONTH FROM specimens.sreport_date) = EXTRACT(MONTH FROM userlockbox.lockbox_mreport) AND EXTRACT(YEAR FROM specimens.sreport_date) = EXTRACT(YEAR FROM userlockbox.lockbox_mreport) AND EXTRACT(MONTH FROM sreport_date) = '" . $treport_month . "' AND EXTRACT(YEAR FROM sreport_date) ='" . $treport_year . "'");
            }

        }
        echo json_encode($resultarray);
    }

} else {

    echo json_encode(array("success" => "0"));
}
