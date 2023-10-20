<?php
if (!ini_get('date.timezone')) {
    date_default_timezone_set('GMT');
}
require 'connectdb_du.php';

if (isset($_POST) && count($_POST)) {

    $action                 = $_POST['taction'];
    $durable_ids            = $_POST["tdurable_ids"];
    $arr_decode_durable_ids = json_decode($durable_ids, true);
    $owner_id               = $_POST['townerid'];
    $room_id                = $_POST['troomid'];
    $place_id               = $_POST['tplaceid'];
    $section_id             = $_POST['tsectionid'];
    $status_id              = $_POST['tstatusid'];
    $durableNo              = $_POST['tdurableno'];

    $resultarr = array();

    if ($action == "UPDATE") {

        $i = 0;
        foreach ($arr_decode_durable_ids as $durable_id) //Extract the Array Values by using Foreach Loop
        {

            $strSQL   = "SELECT * FROM  durablelist WHERE durablelist_id =" . $durable_id;
            $objQuery = pg_query($strSQL);
            $intRows  = pg_num_rows($objQuery);
            if ($intRows > 0) {

                $strSQL = "UPDATE durablelist SET ";
                $strSQL .= "du_trash = '" . ($_POST["tdutrash"] != '' ? $_POST["tdutrash"] : 1) . "' ";
                $strSQL .= trim($owner_id != '' ? ',m_owner_id = ' : '') . ($owner_id != '' ? "'" . $owner_id . "'" : '');
                $strSQL .= trim($room_id != '' ? ',m_room_id = ' : '') . ($room_id != '' ? "'" . $room_id . "'" : '');
                $strSQL .= trim($place_id != '' ? ',m_place_id = ' : '') . ($place_id != '' ? "'" . $place_id . "'" : '');
                $strSQL .= trim($section_id != '' ? ',orgsection_section_id = ' : '') . ($section_id != '' ? "'" . $section_id . "'" : '');
                $strSQL .= trim($status_id != '' ? ',m_status_id = ' : '') . ($status_id != '' ? "'" . $status_id . "'" : '');
                $strSQL .= trim($durableNo != '' ? ',durable_no_main = ' : '') . ($durableNo != '' ? "'" . $durableNo . "'" : '');
                $strSQL .= " WHERE durablelist_id   = '" . $durable_id . "'";
                $objQuery = pg_query($strSQL);

                $arr = array('success' => '1', 'durablelist_id' => $durable_id, 'Ins_mode' => $action);

            } else {
                $arr = array('success' => '0', 'durablelist_id' => $durable_id, 'Ins_mode' => $action);

            }
            array_push($resultarr, $arr);

        }

    } else if ($action == "delete") {

    }

    echo json_encode($resultarr);

} else {
    echo json_encode(array("success" => "0"));
}
