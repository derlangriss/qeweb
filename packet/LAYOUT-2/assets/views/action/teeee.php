<?php

require 'connectdb.php';

$month = $_GET['month'];
$year  = $_GET['year'];

$datecom        = $year . "-" . $month . "-25";
$boxlockstate   = 1;
$resetuser      = 0;
$resetlockstate = 2;
$resultArray    = array();

if (isset($_GET) && count($_GET)) {

    if (isset($_GET['userid'])) {
        $userid = $_GET['userid'];

        $strSQLUserExist = "SELECT * from users_auth ";
        $strSQLUserExist .= "WHERE uid ='" . $userid . "'";
        $objQueryUserExist = pg_query($strSQLUserExist);
        $countUserExist    = pg_num_rows($objQueryUserExist);

        if ($countUserExist !== 0) {

            $strSQLcheckBox = "SELECT max(lockbox_boxid)+1 as maxboxid from userlockbox  ";
            $strSQLcheckBox .= "WHERE EXTRACT(MONTH FROM lockbox_mreport) = " . $month . " AND EXTRACT(YEAR FROM lockbox_mreport) = " . $year . " AND active_state = true";
            $objQuerycheckBox = pg_query($strSQLcheckBox);
            $countcheckbox    = pg_fetch_array($objQuerycheckBox);
            extract($countcheckbox);

            if ($maxboxid === null) {
                $initboxid          = 1;
                $strSQLinsAndUpdate = "INSERT INTO userlockbox ";
                $strSQLinsAndUpdate .= "(lockbox_boxid,lockbox_mreport)";
                $strSQLinsAndUpdate .= "VALUES ";
                $strSQLinsAndUpdate .= "('";
                $strSQLinsAndUpdate .= $initboxid;
                $strSQLinsAndUpdate .= "','" . $datecom;
                $strSQLinsAndUpdate .= "')";
                $objQueryinsAndUpdate = pg_query($strSQLinsAndUpdate);

            } else {

                $strSQLcheckBox02 = "select * from userlockbox  ";
                $strSQLcheckBox02 .= "where lockbox_boxid = " . $maxboxid;
                $strSQLcheckBox02 .= "AND EXTRACT(MONTH FROM lockbox_mreport) = " . $month . " AND EXTRACT(YEAR FROM lockbox_mreport) = " . $year;
                $objQuerycheckBox02 = pg_query($strSQLcheckBox02);
                $CountCheckBox02    = pg_num_rows($objQuerycheckBox02);

                if ($CountCheckBox02 == 0) {

                    $strSQLinsAndUpdate = "INSERT INTO userlockbox ";
                    $strSQLinsAndUpdate .= "(lockbox_boxid,lockbox_mreport)";
                    $strSQLinsAndUpdate .= "VALUES ";
                    $strSQLinsAndUpdate .= "('";
                    $strSQLinsAndUpdate .= $maxboxid;
                    $strSQLinsAndUpdate .= "','" . $datecom;
                    $strSQLinsAndUpdate .= "')";
                    $objQueryinsAndUpdate = pg_query($strSQLinsAndUpdate);

                } else {

                    $strSQLcheckBox02ex = "UPDATE userlockbox SET active_state = 'true'  ";
                    $strSQLcheckBox02ex .= "where lockbox_boxid = " . $maxboxid;
                    $objQuerycheckBox02ex = pg_query($strSQLcheckBox02ex);

                }

            }
            $arr = array('success' => '1', 'collbox_id' => $maxboxid, 'user_id' => $userid);
            array_push($resultArray, $arr);

        } else {
            $arr = array('success' => '0', 'collbox_id' => 'NA', 'user_id' => 'NA');
            array_push($resultArray, $arr);
        }
    } else {
        echo "no login user";
    }

}

pg_close($conn);

echo json_encode($resultArray);
