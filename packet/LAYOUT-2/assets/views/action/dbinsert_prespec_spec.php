<?php
if (!ini_get('date.timezone')) {
    date_default_timezone_set('GMT');
}
require 'connectdb.php';

if (isset($_POST) && count($_POST)) {

    $preinstate        = "2";
    $preinstate_n      = "1";
    $specimens_trash_n = "1";

    $strMode = $_POST["taction"];

    $cidarr = array();

    if ($strMode == "ADD") {

        $strSQL = "SELECT preinsid,preins_collid,preins_spec_qty,preins_staff_id,preins_date,preinscode,preinsyear,preinsnumber,preins_state";
        $strSQL .= ",EXTRACT(YEAR from preins_date) AS preyear,EXTRACT(MONTH from preins_date) AS premonth,collection_code ";  
        $strSQL .= "FROM preins_spec "; 
        $strSQL .= "LEFT JOIN collection_code ON collection_code.collection_code_id = preins_spec.preinscode ";
        $strSQL .= "WHERE preins_state = " . $preinstate_n;
        $objQuery    = pg_query($strSQL);
        $intRowsColl = pg_num_rows($objQuery);

        if ($intRowsColl === 0) {

        } else {

            while ($row = pg_fetch_array($objQuery)) {
                extract($row);

                $strSQL01 = "SELECT collection_coll_id FROM specimens ";
                $strSQL01 .= "WHERE collection_coll_id ='" . $preins_collid . "'";
                $objQuery01    = pg_query($strSQL01);
                $intRowsColl01 = pg_num_rows($objQuery01);

                if ($intRowsColl01 > 0) {

                    $strSQLex = "SELECT MAX(specimens_number) AS specmaxnumber FROM specimens ";
                    $strSQLex .= "WHERE collection_coll_id ='" . $preins_collid . "' AND specimens_trash = ".$specimens_trash_n;
                    $objQueryex = pg_query($strSQLex);

                    $rowex = pg_fetch_array($objQueryex);
                    extract($rowex);

                    for ($i = 1; $i <= $preins_spec_qty; $i++) {

                        $specimens_numberplus  = $specmaxnumber + $i;
                        $specimens_full_STR    = sprintf('%04d', $specimens_numberplus);
                        $preinsnumber_full_STR = sprintf('%04d', $preinsnumber);
                        $specimens_full_number = $collection_code . "-" . $preinsyear . "-" . $preinsnumber_full_STR . "-" . $specimens_full_STR;

                        /** check trash specimens **/
                        $strSQLCheck = "SELECT specimens_id,collection_coll_id,specimens_number FROM specimens ";
                        $strSQLCheck .= "WHERE collection_coll_id ='" . $preins_collid . "' AND specimens_number = '" . $specimens_numberplus . "'";
                        $objQueryCheck    = pg_query($strSQLCheck);
                        $intRowsCollCheck = pg_num_rows($objQueryCheck);

                        if ($intRowsCollCheck > 0) {
                            
                            $rowcheck = pg_fetch_array($objQueryCheck);
                            extract($rowcheck);

                                                  
                            $strSQLUpdateCheck = "UPDATE specimens SET ";
                            $strSQLUpdateCheck .= "specimens_trash = " . $specimens_trash_n;
                            $strSQLUpdateCheck .= ",sreport_date = '" . $preins_date."'";
                            $strSQLUpdateCheck .= ",sreport_month = " . $premonth;
                            $strSQLUpdateCheck .= ",sreport_year = " . $preyear;
                            $strSQLUpdateCheck .= ",record_timestamp = NOW()";
                            $strSQLUpdateCheck .= ",print_status = 'TRUE'";
                            $strSQLUpdateCheck .= " WHERE specimens_id   = '" . $specimens_id . "'";
                            $objQueryUpdateCheck = pg_query($strSQLUpdateCheck);

                            $strSQLUpdateCheck01 = "UPDATE preins_spec SET ";
                            $strSQLUpdateCheck01 .= "preins_state = '" . $preinstate . "' ";
                            $strSQLUpdateCheck01 .= "WHERE preins_collid   = '" . $preins_collid . "'";
                            $UpdateCheck01 = pg_query($strSQLUpdateCheck01);


                        } else {

                            $strSQL02 = "INSERT INTO specimens ";
                            $strSQL02 .= "(collection_coll_id, specimens_number, specimens_full_number,labelor_labelor_id,sreport_date,sreport_year,sreport_month)";
                            $strSQL02 .= "VALUES ";
                            $strSQL02 .= "('" . $preins_collid . "','" . $specimens_numberplus . "','" . $specimens_full_number."'";
                            $strSQL02 .= ",'" . $preins_staff_id . "','" . $preins_date . "','". $preyear ."','" . $premonth ."')";
                            $objQuery02 = pg_query($strSQL02);

                            $strSQL03 = "UPDATE preins_spec SET ";
                            $strSQL03 .= "preins_state = '" . $preinstate . "' ";
                            $strSQL03 .= "WHERE preins_collid   = '" . $preins_collid . "'";
                            $objQuery03 = pg_query($strSQL03);

                        }

                    }

                } else {

                    for ($i = 1; $i <= $preins_spec_qty; $i++) {

                        $specimens_numberplus  = $i;
                        $specimens_full_STR    = sprintf('%04d', $specimens_numberplus);
                        $preinsnumber_full_STR = sprintf('%04d', $preinsnumber);
                        $specimens_full_number = $collection_code . "-" . $preinsyear . "-" . $preinsnumber_full_STR . "-" . $specimens_full_STR;

                        /** check trash specimens **/
                        $strSQLCheck = "SELECT specimens_id,collection_coll_id,specimens_number FROM specimens ";
                        $strSQLCheck .= "WHERE collection_coll_id ='" . $preins_collid . "' AND specimens_number = '" . $specimens_numberplus . "'";
                        $objQueryCheck    = pg_query($strSQLCheck);
                        $intRowsCollCheck = pg_num_rows($objQueryCheck);

                        if ($intRowsCollCheck > 0) {
                            $rowcheck = pg_fetch_array($objQueryex);
                            extract($rowcheck);
                            $strSQLUpdateCheck = "UPDATE specimens SET ";
                            $strSQLUpdateCheck .= "specimens_trash = " . $specimens_trash_n;
                            $strSQLUpdateCheck .= ",sreport_date = " . $preins_date;
                            $strSQLUpdateCheck .= ",sreport_month = " . $premonth;
                            $strSQLUpdateCheck .= ",sreport_year = " . $preyear;
                            $strSQLUpdateCheck .= ",record_timestamp = NOW()";
                            $strSQLUpdateCheck .= ",print_status = 'TRUE'";
                            $strSQLUpdateCheck .= "WHERE specimens_id   = '" . $specimens_id . "'";
                            $objQueryUpdateCheck = pg_query($strSQLUpdateCheck);

                        } else {

                            $strSQL05 = "INSERT INTO specimens ";
                            $strSQL05 .= "(collection_coll_id, specimens_number, specimens_full_number,labelor_labelor_id,sreport_date,sreport_year,sreport_month)";
                            $strSQL05 .= "VALUES ";
                            $strSQL05 .= "('" . $preins_collid . "','" . $specimens_numberplus . "','" . $specimens_full_number."'";
                            $strSQL05 .= ",'" . $preins_staff_id . "','" . $preins_date . "','". $preyear ."','" . $premonth ."')";

                            $objQuery05 = pg_query($strSQL05);

                        }

                    }

                    $strSQL04 = "UPDATE preins_spec SET ";
                    $strSQL04 .= "preins_state = '" . $preinstate . "' ";
                    $strSQL04 .= "WHERE preins_collid   = '" . $preins_collid . "'";
                    $objQuery04 = pg_query($strSQL04);

                }
            }
        }

    }

    if ($strMode == "DELETE") {

        $arr_decode_preinsid = json_decode($_POST["tpreins_ids"], true);
        foreach ($arr_decode_preinsid as $preinsid) //Extract the Array Values by using Foreach Loop
        {

            $res = pg_query("UPDATE preins_spec SET preins_state = '" . $preinstate . "' WHERE preinsid ='" . $preinsid . "'");

            $arr = array('success' => '1', 'preinsid' => $preinsid);
            array_push($cidarr, $arr);
        }

        echo json_encode($cidarr);

    }
} else {

    echo json_encode(array("success" => "0"));
}
