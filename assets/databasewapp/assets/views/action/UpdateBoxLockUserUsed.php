<?php

require 'connectdb.php';
$month          = $_GET['month'];
$year           = $_GET['year'];
$userid         = $_GET['userid'];
$boxid          = $_GET['boxid'];
$boxidnull      = 0;
$datecom        = $year . "-" . $month . "-25";
$datecomnull    = null;
$boxlockstate   = 1;
$resetuser      = 0;
$resetlockstate = 2;
$resultArray    = array();

$strSQLcheckFirst = "SELECT lockbox_userid,firstname,lockbox_boxid as userhasboxid,lockbox_mreport AS userhasmreport from userlockbox ";
$strSQLcheckFirst .= "left join users_auth on users_auth.uid = userlockbox.lockbox_userid ";
$strSQLcheckFirst .= "WHERE lockbox_userid ='" . $userid . "'";
$objQuerycheckFirst  = pg_query($strSQLcheckFirst);
$countUsercheckFirst = pg_num_rows($objQuerycheckFirst);

if ($countUsercheckFirst == 0) {

    $strSQLinsAndUpdate01 = "with updateNewuser as (";
    $strSQLinsAndUpdate01 .= "UPDATE userlockbox SET ";
    $strSQLinsAndUpdate01 .= "lockbox_userid = '" . $userid . "' ";
    $strSQLinsAndUpdate01 .= ",lockbox_lockboxstate = '" . $boxlockstate . "' ";
    $strSQLinsAndUpdate01 .= "WHERE lockbox_boxid   = '" . $boxid . "' ";
    $strSQLinsAndUpdate01 .= "AND EXTRACT(MONTH FROM lockbox_mreport) = " . $month . " AND EXTRACT(YEAR FROM lockbox_mreport) = " . $year . " ";
    $strSQLinsAndUpdate01 .= "RETURNING lockbox_boxid)";
    $strSQLinsAndUpdate01 .= " SELECT * from collectionresbox";
    $strSQLinsAndUpdate01 .= " WHERE collbox_id = (SELECT lockbox_boxid FROM updateNewuser)";
    $objQueryinsAndUpdate01 = pg_query($strSQLinsAndUpdate01);

    $rowinsAndUpdate01 = pg_fetch_array($objQueryinsAndUpdate01);
    extract($rowinsAndUpdate01);

    $strSQLUserExist = "SELECT * from users_auth ";
    $strSQLUserExist .= "WHERE uid ='" . $userid . "'";
    $objQueryUserExist = pg_query($strSQLUserExist);
    $countUserExist    = pg_num_rows($objQueryUserExist);
    $rowUserExist      = pg_fetch_array($objQueryUserExist);
    extract($rowUserExist);
    $uppername = strtoupper(substr($firstname, 0, 3));

    $arr = array('collbox_id' => $collbox_id, 'collboxno' => $collboxno, 'username' => $uppername);
    array_push($resultArray, $arr);

} else {

    $rowinscheckFirst = pg_fetch_array($objQuerycheckFirst);
    extract($rowinscheckFirst);
    $QueryLockM = substr(date('m', strtotime($userhasmreport)), -1);
    $QueryLockY = date('Y', strtotime($userhasmreport));
    $uppername  = strtoupper(substr($firstname, 0, 3));

    $strSQLinsAndUpdate01 = "with updateOlduser as (";
    $strSQLinsAndUpdate01 .= "UPDATE userlockbox SET ";
    $strSQLinsAndUpdate01 .= "lockbox_userid = '" . $resetuser . "' ";
    $strSQLinsAndUpdate01 .= ",lockbox_lockboxstate = '" . $resetlockstate . "' ";
    $strSQLinsAndUpdate01 .= "WHERE lockbox_boxid   = '" . $userhasboxid . "' ";
    $strSQLinsAndUpdate01 .= "AND EXTRACT(MONTH FROM lockbox_mreport) = " . $QueryLockM . " AND EXTRACT(YEAR FROM lockbox_mreport) = " . $QueryLockY . " ";
    $strSQLinsAndUpdate01 .= "),";
    $strSQLinsAndUpdate01 .= "updateNewuser as (";
    $strSQLinsAndUpdate01 .= "UPDATE userlockbox SET ";
    $strSQLinsAndUpdate01 .= "lockbox_userid = '" . $userid . "' ";
    $strSQLinsAndUpdate01 .= ",lockbox_lockboxstate = '" . $boxlockstate . "' ";
    $strSQLinsAndUpdate01 .= "WHERE lockbox_boxid   = '" . $boxid . "' ";
    $strSQLinsAndUpdate01 .= "AND EXTRACT(MONTH FROM lockbox_mreport) = " . $month . " AND EXTRACT(YEAR FROM lockbox_mreport) = " . $year . " ";
    $strSQLinsAndUpdate01 .= "RETURNING lockbox_boxid)";
    $strSQLinsAndUpdate01 .= " SELECT * from collectionresbox";
    $strSQLinsAndUpdate01 .= " WHERE collbox_id = (SELECT lockbox_boxid FROM updateNewuser)";
    $objQueryinsAndUpdate01 = pg_query($strSQLinsAndUpdate01);

    $rowinsAndUpdate01 = pg_fetch_array($objQueryinsAndUpdate01);
    extract($rowinsAndUpdate01);

    $arr = array('collbox_id' => $collbox_id, 'collboxno' => $collboxno, 'username' => $uppername);
    array_push($resultArray, $arr);

}

pg_close($conn);

echo json_encode($resultArray);
