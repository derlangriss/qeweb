<?php

require 'connectdb.php';

$month = $_GET['treport_month'];
$year  = $_GET['treport_year'];

$datecom        = $year . "-" . $month . "-25";
$boxlockstate   = 1;
$resetuser      = 0;
$resetlockstate = 2;
$resultArray    = array();

if (isset($_GET) && count($_GET)) {

    if (isset($_GET['tuserid'])) {
        $userid = $_GET['tuserid'];
        $lockboxid = $_GET['tlockbox_id'];

        $strSQLUserExist = "SELECT * from users_auth ";
        $strSQLUserExist .= "WHERE uid ='" . $userid . "'";
        $objQueryUserExist = pg_query($strSQLUserExist);
        $countUserExist    = pg_num_rows($objQueryUserExist);

        if ($countUserExist !== 0) {

            $strSQLcheckBox = "UPDATE userlockbox SET active_state = 'FALSE' ";
            $strSQLcheckBox .= "WHERE EXTRACT(MONTH FROM lockbox_mreport) = " . $month . " AND EXTRACT(YEAR FROM lockbox_mreport) = " . $year . " AND active_state = true ";
            $strSQLcheckBox .= "AND lockbox_id = ".$_GET['tlockbox_id'];
            $objQuerycheckBox = pg_query($strSQLcheckBox);
            
            $arr = array('success' => '1', 'lockbox_id' => $lockboxid, 'month' => $month, 'year' => $year,'user'=>$firstname);
            array_push($resultArray, $arr);

        } else {
            $arr = array('success' => '0', 'lockbox_id' => 'NA', 'month' => $month, 'year' => $year,'user'=>'No user');
            array_push($resultArray, $arr);
        }
    } else {
        $arr = array('success' => '0', 'lockbox_id' => 'NA', 'month' => $month, 'year' => $year,'user'=>'No user');
        array_push($resultArray, $arr);
    }

}

pg_close($conn);

echo json_encode($resultArray);
