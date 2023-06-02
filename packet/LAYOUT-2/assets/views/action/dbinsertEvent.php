<?php
require 'connectdb.php';
$resultArray      = array();
$e_userid         = $_POST["te_userid"];
$authen_id        = $_POST["tauthen_id"];
$authen_catagory  = $_POST["tauthen_catagory"];
$e_senderid       = $_POST["te_senderid"];
$identify_check_t = 'TRUE';
$identify_check_f = 'FALSE';


$strSQL = "INSERT INTO event ";
$strSQL .= "(e_userid,authen_id,authen_catagory,e_senderid)";
$strSQL .= "VALUES ";
$strSQL .= "('";
$strSQL .= $e_userid;
$strSQL .= "','" . $authen_id;
$strSQL .= "','" . $authen_catagory;
$strSQL .= "','" . $e_senderid;
$strSQL .= "')";
$objQuery = pg_query($strSQL);


$strSQLupdate_identify   = "SELECT identify_check FROM  specimens  WHERE specimens_id ='" . $authen_id . "'";
$objQueryupdate_identify = pg_query($strSQLupdate_identify);
$rowupdate_identify      = pg_fetch_array($objQueryupdate_identify);
extract($rowupdate_identify);

if ($identify_check == 't') {

    $UPDATEspecimens = pg_query("UPDATE specimens SET identify_check = '" . $identify_check_f . "' WHERE specimens_id ='" . $authen_id . "'");

} else {

    $UPDATEspecimens = pg_query("UPDATE specimens SET identify_check = '" . $identify_check_t . "' WHERE specimens_id ='" . $authen_id . "'");

}

pg_close($conn);
