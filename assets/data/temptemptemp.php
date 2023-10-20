<?php

require 'connectdb.php';
$month       = $_GET['month'];
$year        = $_GET['year'];
$userid      = $_GET['userid'];
$boxid       = $_GET['boxid'];
$datecom     = $year . "-" . $month . "-25";
$lockstate   = 1;
$resultArray = array();

if (isset($_GET) && count($_GET)) {

    $strSQLcheckFirst = "SELECT * from checkuserlockbox ";
    $strSQLcheckFirst .= "left join users_auth on users_auth.uid = checkuserlockbox.usercheck_id ";
    $strSQLcheckFirst .= "WHERE usercheck_id ='" . $userid . "'";
    $objQuerycheckFirst  = pg_query($strSQLcheckFirst);
    $countUsercheckFirst = pg_num_rows($objQuerycheckFirst);

    function insertUserUsebox($datecom, $lockstate)
    {

        $strSQLins = "SELECT * from userlockbox ";
        $strSQLins .= "left join collectionresbox on collectionresbox.collbox_id = userlockbox.lockbox_boxid ";
        $strSQLins .= "left join users_auth on users_auth.uid = userlockbox.lockbox_userid ";
        $strSQLins .= "WHERE collbox_id ='" . $_GET['boxid'] . "'";
        $strSQLins .= "AND EXTRACT(MONTH FROM lockbox_mreport) = " . $_GET['month'] . " AND EXTRACT(YEAR FROM lockbox_mreport) = " . $_GET['year'];

        $objQueryins  = pg_query($strSQLins);
        $countUserins = pg_num_rows($objQueryins);

        if ($countUserins === 0) {

            $strSQL02 = "INSERT INTO userlockbox ";
            $strSQL02 .= "(lockbox_userid,lockbox_boxid,lockbox_mreport,boxlock_lockboxstate)";
            $strSQL02 .= "VALUES ";
            $strSQL02 .= "('";
            $strSQL02 .= $_GET['userid'];
            $strSQL02 .= "','" . $_GET['boxid'];
            $strSQL02 .= "','" . $datecom;
            $strSQL02 .= "','" . $lockstate;
            $strSQL02 .= "')";
            $objQuery02 = pg_query($strSQL02);

        }

    }

    if ($countUsercheckFirst == 0) {
        insertUserUsebox($datecom, $lockstate);

        $strSQL = "with insertuser as (";
        $strSQL .= "INSERT INTO checkuserlockbox ";
        $strSQL .= "(usercheck_id,boxcheck_id,checkuser_date)";
        $strSQL .= "VALUES ";
        $strSQL .= "('";
        $strSQL .= $userid;
        $strSQL .= "','" . $boxid;
        $strSQL .= "','" . $datecom;
        $strSQL .= "')RETURNING boxcheck_id )";
        $strSQL .= " SELECT * from collectionresbox";
        $strSQL .= " WHERE collbox_id = (SELECT boxcheck_id FROM insertuser)";
        $objQuery = pg_query($strSQL);

        $row = pg_fetch_array($objQuery);
        extract($row);

        $arr = array('collbox_id' => $collbox_id, 'collboxno' => $collboxno);
        array_push($resultArray, $arr);

    } else {
        insertUserUsebox($datecom, $lockstate);

        $strSQLcheck = "SELECT * from checkuserlockbox ";
        $strSQLcheck .= "left join collectionresbox on collectionresbox.collbox_id = checkuserlockbox.boxcheck_id ";
        $strSQLcheck .= "left join boxlockstate on boxlockstate.boxlockstate_id = checkuserlockbox.checkuser_status ";
        $strSQLcheck .= "left join users_auth on users_auth.uid = checkuserlockbox.usercheck_id ";
        $strSQLcheck .= "WHERE collbox_id ='" . $boxid . "'";
        $strSQLcheck .= "AND EXTRACT(MONTH FROM checkuser_date) = " . $month . " AND EXTRACT(YEAR FROM checkuser_date) = " . $year;

        $objQuerycheck    = pg_query($strSQLcheck);
        $intNumFieldcheck = pg_num_fields($objQuerycheck);
        $countUsercheck   = pg_num_rows($objQuerycheck);
        if ($countUsercheck == 0) {

            $strSQL = "with updateuser as (";
            $strSQL .= "UPDATE checkuserlockbox SET ";
            $strSQL .= "boxcheck_id = '" . $boxid . "' ";
            $strSQL .= ",checkuser_date = '" . $datecom . "' ";
            $strSQL .= "WHERE usercheck_id   = '" . $userid . "' ";
            $strSQL .= "RETURNING * )";
            $strSQL .= " SELECT * from checkuserlockbox ";
            $strSQL .= "left join users_auth on users_auth.uid = checkuserlockbox.usercheck_id ";
            $strSQL .= "left join collectionresbox on collectionresbox.collbox_id = checkuserlockbox.boxcheck_id ";
            $strSQL .= "left join boxlockstate on boxlockstate.boxlockstate_id = checkuserlockbox.checkuser_status ";
            $strSQL .= " WHERE usercheck_id = (SELECT usercheck_id FROM updateuser)";
            $objQuery = pg_query($strSQL);

            $row = pg_fetch_array($objQuery);
            extract($row);
            $uppername = strtoupper(substr($firstname, 0, 3));

            $arr = array('collbox_id' => $boxcheck_id, 'collboxno' => $usercheck_id, 'username' => $uppername);
            array_push($resultArray, $arr);

        } else {
            $rowcheck = pg_fetch_array($objQuerycheck);
            extract($rowcheck);
            if ($usercheck_id == $userid) {
                $strSQL = "UPDATE checkuserlockbox SET ";
                $strSQL .= "boxcheck_id = '" . $boxid . "' ";
                $strSQL .= "WHERE usercheck_id   = '" . $userid . "'";
                $objQuery = pg_query($strSQL);
            } else {
                $strSQL03 = "SELECT * from checkuserlockbox ";
                $strSQL03 .= "left join collectionresbox on collectionresbox.collbox_id = userlockbox.lockbox_boxid ";
                $strSQL03 .= "left join boxlockstate on boxlockstate.boxlockstate_id = userlockbox.boxlock_lockboxstate ";
                $strSQL03 .= "left join users_auth on users_auth.uid = userlockbox.lockbox_userid ";
                $strSQL03 .= "WHERE collbox_id ='" . $boxid . "'";
                $strSQL03 .= "AND EXTRACT(MONTH FROM lockbox_mreport) = " . $month . " AND EXTRACT(YEAR FROM lockbox_mreport) = " . $year;
                $objQuery03 = pg_query($strSQL03);
                $row03      = pg_fetch_array($objQuery03);
                extract($row03);

            }
            $arr = array('collbox_id' => $collbox_id, 'collboxno' => $collboxno, 'checkuser_status' => $boxstatus, 'username' => $firstname);
            array_push($resultArray, $arr);

        }

    }
}
pg_close($conn);

echo json_encode($resultArray);
