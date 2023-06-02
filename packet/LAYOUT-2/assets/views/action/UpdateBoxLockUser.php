<?php

require 'connectdb.php';
$month          = $_GET['month'];
$year           = $_GET['year'];
$userid         = $_GET['userid'];
$boxid          = $_GET['boxid'];
$datecom        = $year . "-" . $month . "-25";
$boxlockstate   = 1;
$resetuser      = 0;
$resetlockstate = 2;
$resultArray    = array();

if (isset($_GET) && count($_GET)) {

    $strSQLUserExist = "SELECT * from users_auth ";
    $strSQLUserExist .= "WHERE uid ='" . $userid . "'";
    $objQueryUserExist = pg_query($strSQLUserExist);
    $countUserExist    = pg_num_rows($objQueryUserExist);

    if ($countUserExist !== 0) {
        $rowUserExist = pg_fetch_array($objQueryUserExist);
        extract($rowUserExist);
        $uppername = strtoupper(substr($firstname, 0, 3));

        $strSQLcheckFirst = "SELECT lockbox_userid,lockbox_boxid as userhasboxid,lockbox_mreport AS userhasmreport from userlockbox ";
        $strSQLcheckFirst .= "left join users_auth on users_auth.uid = userlockbox.lockbox_userid ";
        $strSQLcheckFirst .= "WHERE lockbox_userid ='" . $userid . "'";

        $objQuerycheckFirst  = pg_query($strSQLcheckFirst);
        $countUsercheckFirst = pg_num_rows($objQuerycheckFirst);
        $rowcheckFirst       = pg_fetch_array($objQuerycheckFirst);

        if ($countUsercheckFirst == 0) {

            $strSQLcheckBox = "SELECT * from userlockbox ";
            $strSQLcheckBox .= "left join collectionresbox on collectionresbox.collbox_id = userlockbox.lockbox_boxid ";
            $strSQLcheckBox .= "left join boxlockstate on boxlockstate.boxlockstate_id = userlockbox.lockbox_lockboxstate ";
            $strSQLcheckBox .= "left join users_auth on users_auth.uid = userlockbox.lockbox_userid ";
            $strSQLcheckBox .= "WHERE collbox_id ='" . $boxid . "'";
            $strSQLcheckBox .= "AND EXTRACT(MONTH FROM lockbox_mreport) = " . $month . " AND EXTRACT(YEAR FROM lockbox_mreport) = " . $year;
            $objQuerycheckBox = pg_query($strSQLcheckBox);
            $CountCheckBox    = pg_num_rows($objQuerycheckBox);
            $rowcheckFirst    = pg_fetch_array($objQuerycheckBox);

            if ($CountCheckBox == 0) {

                /* pass */

                $strSQLinsUser = "with insertuser as (";
                $strSQLinsUser .= "INSERT INTO userlockbox ";
                $strSQLinsUser .= "(lockbox_userid,lockbox_boxid,lockbox_mreport,lockbox_lockboxstate)";
                $strSQLinsUser .= "VALUES ";
                $strSQLinsUser .= "('";
                $strSQLinsUser .= $userid;
                $strSQLinsUser .= "','" . $boxid;
                $strSQLinsUser .= "','" . $datecom;
                $strSQLinsUser .= "','" . $boxlockstate;
                $strSQLinsUser .= "')RETURNING lockbox_boxid )";
                $strSQLinsUser .= " SELECT * from collectionresbox";
                $strSQLinsUser .= " WHERE collbox_id = (SELECT lockbox_boxid FROM insertuser)";
                $objQueryinsUser = pg_query($strSQLinsUser);

                $rowinsUser = pg_fetch_array($objQueryinsUser);
                extract($rowinsUser);

                $arr = array('success'=>'1','collbox_id' => $collbox_id, 'collboxno' => $collboxno, 'username' => $uppername);
                array_push($resultArray, $arr);

            } else {

                /* pass */

                extract($rowcheckFirst);
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

                $arr = array('success'=>'1','collbox_id' => $collbox_id, 'collboxno' => $collboxno, 'username' => $uppername);
                array_push($resultArray, $arr);
            }

        } else {
         

            extract($rowcheckFirst);
            
            $QueryLockM01 = (int)date('m', strtotime($userhasmreport));
            $QueryLockY01 = date('Y', strtotime($userhasmreport));

            $strSQLcheckBox = "SELECT * from userlockbox ";
            $strSQLcheckBox .= "left join collectionresbox on collectionresbox.collbox_id = userlockbox.lockbox_boxid ";
            $strSQLcheckBox .= "left join boxlockstate on boxlockstate.boxlockstate_id = userlockbox.lockbox_lockboxstate ";
            $strSQLcheckBox .= "left join users_auth on users_auth.uid = userlockbox.lockbox_userid ";
            $strSQLcheckBox .= "WHERE collbox_id ='" . $boxid . "'";
            $strSQLcheckBox .= "AND EXTRACT(MONTH FROM lockbox_mreport) = " . $month . " AND EXTRACT(YEAR FROM lockbox_mreport) = " . $year;
            $objQuerycheckBox = pg_query($strSQLcheckBox);
            $CountCheckBox    = pg_num_rows($objQuerycheckBox);
            $rowcheckFirst    = pg_fetch_array($objQuerycheckBox);

            if ($CountCheckBox == 0) {

                $strSQLinsAndUpdate = "with updateuser01 as (";
                $strSQLinsAndUpdate .= "UPDATE userlockbox SET ";
                $strSQLinsAndUpdate .= "lockbox_userid = '" . $resetuser . "' ";
                $strSQLinsAndUpdate .= ",lockbox_lockboxstate = '" . $resetlockstate . "' ";
                $strSQLinsAndUpdate .= "WHERE lockbox_boxid   = '" . $userhasboxid . "' ";
                $strSQLinsAndUpdate .= "AND EXTRACT(MONTH FROM lockbox_mreport) = " . $QueryLockM01 . " AND EXTRACT(YEAR FROM lockbox_mreport) = " . $QueryLockY01 . " ";
                $strSQLinsAndUpdate .= "), insertboxwithuser as ( ";
                $strSQLinsAndUpdate .= "INSERT INTO userlockbox ";
                $strSQLinsAndUpdate .= "(lockbox_userid,lockbox_boxid,lockbox_mreport,lockbox_lockboxstate)";
                $strSQLinsAndUpdate .= "VALUES ";
                $strSQLinsAndUpdate .= "('";
                $strSQLinsAndUpdate .= $userid;
                $strSQLinsAndUpdate .= "','" . $boxid;
                $strSQLinsAndUpdate .= "','" . $datecom;
                $strSQLinsAndUpdate .= "','" . $boxlockstate;
                $strSQLinsAndUpdate .= "')RETURNING lockbox_boxid )";
                $strSQLinsAndUpdate .= " SELECT * from collectionresbox";
                $strSQLinsAndUpdate .= " WHERE collbox_id = (SELECT lockbox_boxid FROM insertboxwithuser)";
                $objQueryinsAndUpdate = pg_query($strSQLinsAndUpdate);

                $rowinsAndUpdate = pg_fetch_array($objQueryinsAndUpdate);
                extract($rowinsAndUpdate);

                $arr = array('success'=>'1','collbox_id' => $collbox_id, 'collboxno' => $collboxno, 'username' => $uppername);
                array_push($resultArray, $arr);

            } else {
         
                extract($rowcheckFirst);
                $QueryLockM = substr(date('m', strtotime($lockbox_mreport)), -1);
                $QueryLockY = date('Y', strtotime($lockbox_mreport));

                $strSQLinsAndUpdate01 = "with updateOlduser as (";
                $strSQLinsAndUpdate01 .= "UPDATE userlockbox SET ";
                $strSQLinsAndUpdate01 .= "lockbox_userid = '" . $resetuser . "' ";
                $strSQLinsAndUpdate01 .= ",lockbox_lockboxstate = '" . $resetlockstate . "' ";
                $strSQLinsAndUpdate01 .= "WHERE lockbox_boxid   = '" . $userhasboxid . "' ";
                $strSQLinsAndUpdate01 .= "AND EXTRACT(MONTH FROM lockbox_mreport) = " . $QueryLockM01 . " AND EXTRACT(YEAR FROM lockbox_mreport) = " . $QueryLockY01 . " ";
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

                $arr = array('success'=>'1','collbox_id' => $collbox_id, 'collboxno' => $collboxno, 'username' => $uppername);
                array_push($resultArray, $arr);
            }

        }
    }

}

pg_close($conn);

echo json_encode($resultArray);
