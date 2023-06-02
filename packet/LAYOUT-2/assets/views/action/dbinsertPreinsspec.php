<?php
require 'connectdb.php';

if (isset($_POST) && count($_POST)) {
    $resultArray    = array();
    $tpreinsdate    = htmlentities(trim($_POST["tpreinsdate"]), ENT_QUOTES);
    $tpreinscode    = htmlentities(trim($_POST["tpreinscode"]), ENT_QUOTES);
    $tpreinsyear    = htmlentities(trim($_POST["tpreinsyear"]), ENT_QUOTES);
    $tpreinsnumber  = htmlentities(trim($_POST["tpreinsnumber"]), ENT_QUOTES);
    $tpreinsqty     = htmlentities(trim($_POST["tpreinsqty"]), ENT_QUOTES);
    $tpreinsstaffid = htmlentities(trim($_POST["tpreinsstaffid"]), ENT_QUOTES);
    $preins_state_n = 1;
    $preins_state_f = 2;
    $teditmode      = htmlentities(trim($_POST["teditmode"]), ENT_QUOTES);

    if ($teditmode == 'Nedit') {

        $strSQL01 = "SELECT coll_id FROM collection
             WHERE donation_donation_id ='" . $tpreinscode . "' and coll_year ='" . $tpreinsyear . "' and coll_number = '" . $tpreinsnumber . "'";
        $objQuery01  = pg_query($strSQL01);
        $intRowsColl = pg_num_rows($objQuery01);

        if ($intRowsColl > 0) {

            $row01 = pg_fetch_array($objQuery01);
            extract($row01);

            $strSQL01 = "SELECT preins_collid FROM preins_spec
                     WHERE preins_collid ='" . $coll_id . "'";
            $objQuery01    = pg_query($strSQL01);
            $intRowsColl01 = pg_num_rows($objQuery01);

            if ($intRowsColl01 > 0) {
                $strSQL02 = "SELECT preins_collid,preins_spec_qty FROM preins_spec
                     WHERE preins_collid ='" . $coll_id . "' AND preins_state =" . $preins_state_n;
                $objQuery02    = pg_query($strSQL02);
                $intRowsColl02 = pg_num_rows($objQuery02);

                if ($intRowsColl02 > 0) {

                    $row02 = pg_fetch_array($objQuery02);
                    extract($row02);
                    $new_spec_qty = $preins_spec_qty + $tpreinsqty;
                    $strSQL04     = "UPDATE preins_spec SET ";

                    $strSQL04 .= "preins_spec_qty = '" . $new_spec_qty . "' ";
                    $strSQL04 .= ", preinscode = '" . $tpreinscode . "' "; 
                    $strSQL04 .= ", preinsyear = '" . $tpreinsyear . "' ";
                    $strSQL04 .= ", preinsnumber = '" . $tpreinsnumber . "' ";       
                    $strSQL04 .= ", preins_staff_id = '" . $tpreinsstaffid . "' ";
                    $strSQL04 .= ", preins_date = '" . $tpreinsdate . "' ";
                    $strSQL04 .= "WHERE preins_collid   = '" . $preins_collid . "'";
                    $objQuery04 = pg_query($strSQL04);

                    $arr = array('success' => '1', 'Ins_mode' => $teditmode);

                } else {

                    $strSQLex = "SELECT preins_collid FROM preins_spec
                     WHERE preins_collid ='" . $coll_id . "' AND preins_state =" . $preins_state_f;
                    $objQueryex = pg_query($strSQLex);
                    $rowex      = pg_fetch_array($objQueryex);
                    extract($rowex);

                    $strSQL05 = "UPDATE preins_spec SET ";
                    $strSQL05 .= "preins_state = '" . $preins_state_n . "' ";
                    $strSQL05 .= ", preins_spec_qty = '" . $tpreinsqty . "' ";
                    $strSQL05 .= ", preins_date = '" . $tpreinsdate . "' ";
                    $strSQL05 .= "WHERE preins_collid   = '" . $preins_collid . "'";
                    $objQuery05 = pg_query($strSQL05);

                    $arr = array('success' => '1', 'Ins_mode' => $teditmode);

                }
                array_push($resultArray, $arr);

            } else {

                $strSQLex = "INSERT INTO preins_spec ";
                $strSQLex .= "(preins_collid,preinscode,preinsyear,preinsnumber,preins_spec_qty,preins_staff_id,preins_date)";
                $strSQLex .= "VALUES ";
                $strSQLex .= "('";
                $strSQLex .= $coll_id;
                $strSQLex .= "','" . $tpreinscode;
                $strSQLex .= "','" . $tpreinsyear;
                $strSQLex .= "','" . $tpreinsnumber;
                $strSQLex .= "','" . $tpreinsqty;
                $strSQLex .= "','" . $tpreinsstaffid;
                $strSQLex .= "','" . $tpreinsdate;
                $strSQLex .= "')";
                $objQueryex = pg_query($strSQLex);

                $arr = array('success' => '1', 'Ins_mode' => $teditmode);
                array_push($resultArray, $arr);

            }

        } else {

            $arr = array('success' => '0', 'Ins_mode' => $teditmode);
            array_push($resultArray, $arr);

        }
    }
    if ($teditmode == 'Exedit') {

        $strSQL01 = "SELECT preinsid FROM preins_spec
             WHERE preinscode ='" . $tpreinscode . "' and preinsyear ='" . $tpreinsyear . "' and preinsnumber = '" . $tpreinsnumber . "'";
        $objQuery01    = pg_query($strSQL01);
        $intRowsColl01 = pg_num_rows($objQuery01);

        if ($intRowsColl01 > 0) {

            $row01 = pg_fetch_array($objQuery01);
            extract($row01);

            $tpreinsid = htmlentities(trim($_POST["tpreinsid"]), ENT_QUOTES);
            $strSQL07  = "SELECT coll_id FROM collection
             WHERE donation_donation_id ='" . $tpreinscode . "' and coll_year ='" . $tpreinsyear . "' and coll_number = '" . $tpreinsnumber . "'";
            $objQuery07    = pg_query($strSQL07);
            $intRowsColl07 = pg_num_rows($objQuery07);

            if ($intRowsColl07 > 0) {

                $row07 = pg_fetch_array($objQuery07);
                extract($row07);

                $strSQL06 = "UPDATE preins_spec SET ";
                $strSQL06 .= "preins_date = '" . $tpreinsdate . "' ";
                $strSQL06 .= ", preinscode = '" . $tpreinscode . "' ";
                $strSQL06 .= ", preinsyear = '" . $tpreinsyear . "' ";
                $strSQL06 .= ", preinsnumber = '" . $tpreinsnumber . "' ";
                $strSQL06 .= ", preins_spec_qty = '" . $tpreinsqty . "' ";
                $strSQL06 .= ", preins_staff_id = '" . $tpreinsstaffid . "' ";
                $strSQL06 .= ", preins_collid = '" . $coll_id . "' ";
                $strSQL06 .= "WHERE preinsid   = '" . $preinsid . "'";
                $objQuery06 = pg_query($strSQL06);

                $arr = array('success' => '1', 'Ins_mode' => $teditmode);
                array_push($resultArray, $arr);

            } else {
                $arr = array('success' => '0', 'Ins_mode' => $teditmode);
                array_push($resultArray, $arr);
            }
        } else {
            $arr = array('success' => '0', 'Ins_mode' => $teditmode);
            array_push($resultArray, $arr);
        }

    }
    echo json_encode($resultArray);
    pg_close($conn);
}
