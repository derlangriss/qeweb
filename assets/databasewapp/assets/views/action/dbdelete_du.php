<?php
if (!ini_get('date.timezone')) {
    date_default_timezone_set('GMT');
}
require 'connectdb_du.php';

if (isset($_POST) && count($_POST)) {

    $durable_trash   = "2";  
    $durable_trash_n = "1";
    $strMode      = $_POST["taction"];

    $resultarray = array();

    if ($strMode == "DELETE") {

        $arr_decode_durableids = json_decode($_POST["durableid"], true);
        foreach ($arr_decode_durableids as $durableids) //Extract the Array Values by using Foreach Loop
        {

            $res = pg_query("UPDATE durablelist SET du_trash = '" . $durable_trash . "' WHERE durablelist_id ='" . $durableids . "'");

            $arr = array('success' => '1', 'durablelist_id' => $durableids);
            array_push($resultarray, $arr);
        }

        echo json_encode($resultarray);

    }

} else {

    echo json_encode(array("success" => "0"));
}
