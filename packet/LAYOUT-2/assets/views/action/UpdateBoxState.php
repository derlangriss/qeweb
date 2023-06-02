<?php

require 'connectdb.php';
$month          = $_GET['month'];
$year           = $_GET['year'];
$userid         = $_GET['userid'];
$boxid          = $_GET['boxid'];
$boxidnull      = 0;
$datecom        = $year . "-" . $month . "-25";
$datecomnull    = null;
$lockstate      = 1;
$resultArray    = array();
$boxstate       = $_GET['boxstatusid'];
$container_type = 1;

$strSQLcheckBox = "SELECT * from userlockbox ";
$strSQLcheckBox .= "left join collectionresbox on collectionresbox.collbox_id = userlockbox.lockbox_boxid ";
$strSQLcheckBox .= "left join boxlockstate on boxlockstate.boxlockstate_id = userlockbox.lockbox_lockboxstate ";
$strSQLcheckBox .= "left join users_auth on users_auth.uid = userlockbox.lockbox_userid ";
$strSQLcheckBox .= "WHERE collbox_id ='" . $boxid . "'";
$strSQLcheckBox .= "AND EXTRACT(MONTH FROM lockbox_mreport) = " . $month . " AND EXTRACT(YEAR FROM lockbox_mreport) = " . $year;
$objQuerycheckBox = pg_query($strSQLcheckBox);
$CountCheckBox    = pg_num_rows($objQuerycheckBox);
$rowcheckFirst    = pg_fetch_array($objQuerycheckBox);

if ($CountCheckBox !== 0) {

    extract($rowcheckFirst);
    if ($userid == $lockbox_userid) {
        if ($boxstate == 1) {

            $res01 = pg_query("SELECT COUNT(*) AS allcount from specimens WHERE container_id = '" . $boxid . "' AND container_type = '" . $container_type . "'  AND EXTRACT(MONTH FROM sreport_date) = '" . $month . "' AND EXTRACT(YEAR FROM sreport_date) ='" . $year . "'");

            $row01 = pg_fetch_array($res01);
            extract($row01);

            if ($allcount == 0) {
                $updateboxstate = 1;
            } else {
                $updateboxstate = 2;
            }

        }
        if ($boxstate == 2) {
            $updateboxstate = 1;
        }
        if ($boxstate == 3) {
            $updateboxstate = 2;
        }

        $strSQL = "with updateuser as (";
        $strSQL .= "UPDATE userlockbox SET ";
        $strSQL .= "lockbox_boxstatus = '" . $updateboxstate . "' ";
        $strSQL .= "WHERE lockbox_boxid   = '" . $boxid . "' ";
        $strSQL .= "AND EXTRACT(MONTH FROM lockbox_mreport) = " . $_GET['month'] . " AND EXTRACT(YEAR FROM lockbox_mreport) = " . $_GET['year'];
        $strSQL .= "RETURNING lockbox_boxid,lockbox_mreport )";
        $strSQL .= "SELECT * from updateuser ";
        $objQuery = pg_query($strSQL);
        $row      = pg_fetch_array($objQuery);
        extract($row);

        $arr = array('collbox_id' => $lockbox_boxid, 'mreport' => $lockbox_mreport, 'success' => '1', 'lockbox_boxstatus' => $updateboxstate);
        array_push($resultArray, $arr);

    } else {
        $arr = array('collbox_id' => $lockbox_boxid, 'mreport' => $lockbox_mreport, 'success' => '0', 'lockbox_boxstatus' => $updateboxstate);
        array_push($resultArray, $arr);

    }

}
/*
$strSQLcheckFirst = "SELECT lockbox_userid,firstname,lockbox_boxid as userhasboxid,lockbox_mreport AS userhasmreport from userlockbox ";
$strSQLcheckFirst .= "left join users_auth on users_auth.uid = userlockbox.lockbox_userid ";
$strSQLcheckFirst .= "WHERE lockbox_userid ='" . $userid . "'";
$objQuerycheckFirst  = pg_query($strSQLcheckFirst);
$countUsercheckFirst = pg_num_rows($objQuerycheckFirst);

if ($countUsercheckFirst == 0) {

} else {

}
 */
/*

if ($countUsercheckFirst == 0) {

$strSQLex01 = "with insertuser as (";
$strSQLex01 .= "INSERT INTO checkuserlockbox ";
$strSQLex01 .= "(usercheck_id,boxcheck_id,checkuser_date)";
$strSQLex01 .= "VALUES ";
$strSQLex01 .= "('";
$strSQLex01 .= $userid;
$strSQLex01 .= "','" . $boxid;
$strSQLex01 .= "','" . $datecom;
$strSQLex01 .= "')RETURNING boxcheck_id )";
$strSQLex01 .= " SELECT * from collectionresbox";
$strSQLex01 .= " WHERE collbox_id = (SELECT boxcheck_id FROM insertuser)";
$objQueryex01 = pg_query($strSQLex01);

$rowex01 = pg_fetch_array($objQueryex01);
extract($rowex01);

$arr = array('collbox_id' => '0', 'collboxno' => '0');
array_push($resultArray, $arr);

} else {

$strSQL = "with updateuser as (";
$strSQL .= "UPDATE userlockbox SET ";
$strSQL .= "lockbox_boxstate = '" . $fullboxstate . "' ";
$strSQL .= "WHERE lockbox_boxid   = '" . $boxid . "' ";
$strSQL .= "AND EXTRACT(MONTH FROM lockbox_mreport) = " . $_GET['month'] . " AND EXTRACT(YEAR FROM lockbox_mreport) = " . $_GET['year'];
$strSQL .= "RETURNING lockbox_boxid,lockbox_mreport )";
$strSQL .= "SELECT * from updateuser ";
$objQuery = pg_query($strSQL);
$row      = pg_fetch_array($objQuery);
extract($row);

$arr = array('collbox_id' => $lockbox_boxid, 'mreport' => $lockbox_mreport);
array_push($resultArray, $arr);

}
 */
pg_close($conn);

echo json_encode($resultArray);
