<?php

require 'connectdb.php';
$month          = $_GET['sMonth'];
$year           = $_GET['sYear'];
$userid         = $_GET['userid'];
$boxid          = $_GET["sBoxid"];
$container_type = $_GET["sContainer_type"];
$lockboxstate   = 1;
$resultArray    = array();
if (isset($_GET['sBoxid'])) {

    if ($_GET['sBoxid'] !== '') { 

        $strSQL = "SELECT * from checkuserlockbox ";
        $strSQL .= "left join collectionresbox on collectionresbox.collbox_id = checkuserlockbox.boxcheck_id ";
        $strSQL .= "left join boxlockstate on boxlockstate.boxlockstate_id = checkuserlockbox.checkuser_status ";
        $strSQL .= "left join users_auth on users_auth.uid = checkuserlockbox.usercheck_id ";
        $strSQL .= "WHERE collbox_id ='" . $boxid . "'";
        $strSQL .= "AND EXTRACT(MONTH FROM checkuser_date) = " . $month . " AND EXTRACT(YEAR FROM checkuser_date) = " . $year;

        $objQuery    = pg_query($strSQL);
        $intNumField = pg_num_fields($objQuery);
        $countUser   = pg_num_rows($objQuery);

        if ($countUser === 0) {
            $compareUser = 0;
            $strSQL02    = "SELECT * from collectionresbox ";
            $strSQL02 .= "WHERE collbox_id ='" . $boxid . "'";
            $objQuery02 = pg_query($strSQL02);
            $row02      = pg_fetch_array($objQuery02);
            extract($row02);

            $strSQL03 = "SELECT * from users_auth ";
            $strSQL03 .= "WHERE uid = " . $userid;
            $objQuery03 = pg_query($strSQL03);
            $row03      = pg_fetch_array($objQuery03);
            extract($row03);
            $uppername = strtoupper(substr($firstname, 0, 3));
            $arr       = array('collbox_id' => $collbox_id, 'collboxno' => $collboxno, 'boxlockstate' => 'UNLOCK', 'username' => $uppername, 'compareUser' => $compareUser);
            array_push($resultArray, $arr);

        } else {

            $row = pg_fetch_array($objQuery);
            extract($row);

            if ($userid === $usercheck_id) {
                $compareUser = 0;
            } else {
                $compareUser = 1;
            }
            $uppername = strtoupper(substr($firstname, 0, 3));
            $arr       = array('collbox_id' => $collbox_id, 'collboxno' => $collboxno, 'boxlockstate' => 'LOCK', 'username' => $uppername, 'compareUser' => $compareUser);
            array_push($resultArray, $arr);

        }
        pg_close($conn);

        echo json_encode($resultArray);

    }
}
