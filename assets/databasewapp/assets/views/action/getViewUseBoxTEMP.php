<?php

require 'connectdb.php';
$month        = $_GET['sMonth'];
$year         = $_GET['sYear'];
$userid       = $_GET['userid'];
$lockboxstate = 1;
$resultArray  = array();
if (isset($_GET['sBoxid'])) {
    $boxid = $_GET["sBoxid"];

    if ($_GET['sBoxid'] !== '') {
        /*
        $strSQL = "SELECT count(specimens_id) AS countspecinbox FROM specimens ";

        $strSQL .= "left join collectionresbox on collectionresbox.collbox_id = specimens.container_id ";
        $strSQL .= "left join container_type on container_type.container_type_id = specimens.container_type ";
        $strSQL .= "WHERE container_type = '" . $_GET["sContainer_type"] . "' AND collbox_id = '" . $boxid . "' ";
        $strSQL .= "AND EXTRACT(MONTH FROM sreport_date) = " . $month . " AND EXTRACT(YEAR FROM sreport_date) = " . $year;

        $objQuery    = pg_query($strSQL);
        $intNumField = pg_num_fields($objQuery);
        $resultArray = array();
        $obResult    = pg_fetch_array($objQuery);
        extract($obResult);
        $arrCol01['countspecinbox'] = $countspecinbox;
         */
        $strSQL02 = "SELECT * from userlockbox ";
        $strSQL02 .= "left join collectionresbox on collectionresbox.collbox_id = userlockbox.lockbox_boxid ";
        $strSQL02 .= "left join boxlockstate on boxlockstate.boxlockstate_id = userlockbox.boxlock_lockboxstate ";
        $strSQL02 .= "left join users_auth on users_auth.uid = userlockbox.lockbox_userid ";
        $strSQL02 .= "WHERE collbox_id ='" . $boxid . "'";
        $strSQL02 .= "AND boxlock_lockboxstate = " . $lockboxstate . " ";
        $strSQL02 .= "AND EXTRACT(MONTH FROM lockbox_mreport) = " . $month . " AND EXTRACT(YEAR FROM lockbox_mreport) = " . $year;

        $objQuery02    = pg_query($strSQL02);
        $intNumField02 = pg_num_fields($objQuery02);
        $countUser02   = pg_num_rows($objQuery02);

        if ($countUser02 === 0) {

            $strSQL03 = "SELECT * from users_auth ";
            $strSQL03 .= "WHERE uid = " . $userid;
            $objQuery03 = pg_query($strSQL03);
            $row03      = pg_fetch_array($objQuery03);
            extract($row03);
            $arrCol01['user_id']      = $firstname;
            $arrCol01['boxlockstate'] = 'UNLOCK';
            $arrCol01['collbox_id']   = $collbox_id;
            $arrCol01['collboxno']    = $collboxno;

            array_push($resultArray, $arrCol01);

        } else {

            $row02 = pg_fetch_array($objQuery02);
            extract($row02);

            $strSQL = "SELECT count(specimens_id) AS countspecinbox FROM specimens ";

            $strSQL .= "left join collectionresbox on collectionresbox.collbox_id = specimens.container_id ";
            $strSQL .= "left join container_type on container_type.container_type_id = specimens.container_type ";
            $strSQL .= "WHERE container_type = '" . $_GET["sContainer_type"] . "' AND collbox_id = '" . $boxid . "' ";
            $strSQL .= "AND EXTRACT(MONTH FROM sreport_date) = " . $month . " AND EXTRACT(YEAR FROM sreport_date) = " . $year;

            $objQuery    = pg_query($strSQL);
            $intNumField = pg_num_fields($objQuery);
            $resultArray = array();
            $obResult    = pg_fetch_array($objQuery);
            extract($obResult);
            $arrCol01['countspecinbox'] = $countspecinbox;
            $arrCol01['user_name']      = $firstname;
            $arrCol01['boxlockstate']   = 'LOCK';
            $arrCol01['collbox_id']     = $collbox_id;
            $arrCol01['collboxno']      = $collboxno;
            array_push($resultArray, $arrCol01);
        }

    } else {
        exit;
    }

    pg_close($conn);

    echo json_encode($resultArray);
}
