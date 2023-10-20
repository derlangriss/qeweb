<?php

require 'connectdb.php';

$userid       = $_GET['userid'];
$lockboxstate = 1;
$resultArray  = array();
if (isset($userid)) {

    if ($userid !== '') {

        $strSQL = "SELECT * from checkuserlockbox ";
        $strSQL .= "left join collectionresbox on collectionresbox.collbox_id = checkuserlockbox.boxcheck_id ";
        $strSQL .= "left join boxlockstate on boxlockstate.boxlockstate_id = checkuserlockbox.checkuser_status ";
        $strSQL .= "left join users_auth on users_auth.uid = checkuserlockbox.usercheck_id ";

        $objQuery    = pg_query($strSQL);
        $intNumField = pg_num_fields($objQuery);
        $countUser   = pg_num_rows($objQuery);

        while ($obResult = pg_fetch_array($objQuery)) {
            $arrCol = array();
            for ($i = 0; $i < $intNumField; $i++) {
                $arrCol[pg_field_name($objQuery, $i)] = $obResult[$i];
            }

            array_push($resultArray, $arrCol);

        }
        pg_close($conn);

        echo json_encode($resultArray);

        /*

    if ($countUser === 0) {

    $strSQL02 = "SELECT * from collectionresbox ";
    $strSQL02 .= "WHERE collbox_id ='" . $boxid . "'";
    $objQuery02 = pg_query($strSQL02);
    $row02      = pg_fetch_array($objQuery02);
    extract($row02);

    $strSQL03 = "SELECT * from users_auth ";
    $strSQL03 .= "WHERE uid = " . $userid;
    $objQuery03 = pg_query($strSQL03);
    $row03      = pg_fetch_array($objQuery03);
    extract($row03);

    $arr = array('collbox_id' => $collbox_id, 'collboxno' => $collboxno, 'boxlockstate' => 'UNLOCK', 'username' => $firstname);
    array_push($resultArray, $arr);

    } else {

    $strSQL02 = "SELECT * from collectionresbox ";
    $strSQL02 .= "WHERE collbox_id ='" . $boxid . "'";
    $objQuery02 = pg_query($strSQL02);
    $row02      = pg_fetch_array($objQuery02);
    extract($row02);

    $arr = array('collbox_id' => $collbox_id, 'collboxno' => $collboxno, 'boxlockstate' => 'LOCK');
    array_push($resultArray, $arr);

    }*/

    }
}
