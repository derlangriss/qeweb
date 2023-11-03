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

            $strSQLcheckBox = "SELECT * FROM userlockbox  ";
            $strSQLcheckBox .= "WHERE EXTRACT(MONTH FROM lockbox_mreport) = " . $month . " AND EXTRACT(YEAR FROM lockbox_mreport) = " . $year." ";
            $strSQLcheckBox .= "ORDER BY lockbox_boxid";

            $objQuerycheckBox = pg_query($strSQLcheckBox);
            $CountCheckBox    = pg_num_rows($objQuerycheckBox);

            if ($CountCheckBox === 0) {
                $initboxid          = 1;
                $strSQLinsAndUpdate = "INSERT INTO userlockbox ";
                $strSQLinsAndUpdate .= "(lockbox_boxid,lockbox_mreport) ";
                $strSQLinsAndUpdate .= "VALUES ";
                $strSQLinsAndUpdate .= "('";
                $strSQLinsAndUpdate .= $initboxid;
                $strSQLinsAndUpdate .= "','" . $datecom;
                $strSQLinsAndUpdate .= "')";
                $objQueryinsAndUpdate = pg_query($strSQLinsAndUpdate);
            } else {

                $strSQLcheckBox01 = "SELECT * from userlockbox  ";
                $strSQLcheckBox01 .= "WHERE EXTRACT(MONTH FROM lockbox_mreport) = " . $month . " AND EXTRACT(YEAR FROM lockbox_mreport) = " . $year . " AND active_state = true ";
                $strSQLcheckBox01 .= "ORDER BY lockbox_boxid DESC ";
                $strSQLcheckBox01 .= "LIMIT 1 ";
                $objQuerycheckBox01 = pg_query($strSQLcheckBox01);
                $CountCheckBox01    = pg_num_rows($objQuerycheckBox01);

                if ($CountCheckBox01 === 0) {

                    $initboxid          = 1;
                    $strSQLcheckBox02ex = "UPDATE userlockbox SET active_state = 'true'  ";
                    $strSQLcheckBox02ex .= "where lockbox_boxid = " . $initboxid;
                    $objQuerycheckBox02ex = pg_query($strSQLcheckBox02ex);

                } else {

                    $rowEx02 = pg_fetch_array($objQuerycheckBox01);
                    extract($rowEx02);
                    $boxplus = $lockbox_boxid + 1;

                    $strSQLcheckBox01 = "SELECT * from userlockbox  ";
                    $strSQLcheckBox01 .= "WHERE EXTRACT(MONTH FROM lockbox_mreport) = " . $month . " AND EXTRACT(YEAR FROM lockbox_mreport) = " . $year . " ";
                    $strSQLcheckBox01 .= "AND lockbox_boxid = " . $boxplus;
                    $objQuerycheckBox01 = pg_query($strSQLcheckBox01);
                    $CountCheckBox01    = pg_num_rows($objQuerycheckBox01);

                    if ($CountCheckBox01 === 0) {

                        $strSQLinsAndUpdate = "INSERT INTO userlockbox ";
                        $strSQLinsAndUpdate .= "(lockbox_boxid,lockbox_mreport) ";
                        $strSQLinsAndUpdate .= "VALUES ";
                        $strSQLinsAndUpdate .= "('";
                        $strSQLinsAndUpdate .= $boxplus;
                        $strSQLinsAndUpdate .= "','" . $datecom;
                        $strSQLinsAndUpdate .= "')";
                        $objQueryinsAndUpdate = pg_query($strSQLinsAndUpdate);
                    } else {
                        $rowEx02 = pg_fetch_array($objQuerycheckBox01);
                        extract($rowEx02);
                        $strSQLcheckBox02ex = "UPDATE userlockbox SET active_state = 'true'  ";
                        $strSQLcheckBox02ex .= "where lockbox_boxid = " . $boxplus;
                        $objQuerycheckBox02ex = pg_query($strSQLcheckBox02ex);
                    }

                }

            }

            $arr = array('success' => '1', 'collbox_id' => 'NA', 'user_id' => $userid);
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
