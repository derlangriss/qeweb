<?php
if (!ini_get('date.timezone')) {
    date_default_timezone_set('GMT');
}
require 'connectdb.php';

if (isset($_POST) && count($_POST)) {

    $specimens_trash   = "2";
    $specimens_trash_n = "1";
    $strMode      = $_POST["taction"];

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

} else {

    echo json_encode(array("success" => "0"));
}
