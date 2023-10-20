<?php

require 'connectdb.php';
$month   = $_GET['month'];
$year    = $_GET['year'];
$userid  = $_GET['userid'];
$boxid   = $_GET['boxid'];
$datecom = $year . "-" . $month . "-25";
$lockstate = 1;

$strSQL = "SELECT * from userlockbox ";
$strSQL .= "left join collectionresbox on collectionresbox.collbox_id = userlockbox.lockbox_boxid ";
$strSQL .= "left join users_auth on users_auth.uid = userlockbox.lockbox_userid ";
$strSQL .= "WHERE collbox_id ='" . $boxid . "'";
$strSQL .= "AND EXTRACT(MONTH FROM lockbox_mreport) = " . $month . " AND EXTRACT(YEAR FROM lockbox_mreport) = " . $year;

$objQuery    = pg_query($strSQL);
$intNumField = pg_num_fields($objQuery);
$countUser   = pg_num_rows($objQuery);
$resultArray = array();

if ($countUser === 0) {

    $strSQL02 = "INSERT INTO userlockbox ";
    $strSQL02 .= "(lockbox_userid,lockbox_boxid,lockbox_mreport,boxlock_lockboxstate)";
    $strSQL02 .= "VALUES ";
    $strSQL02 .= "('";
    $strSQL02 .= $userid;
    $strSQL02 .= "','" . $boxid;
    $strSQL02 .= "','" . $datecom;
    $strSQL02 .= "','" . $lockstate;
    $strSQL02 .= "')";
    $objQuery02 = pg_query($strSQL02);

} else {
    echo "thongkhaow";
}

pg_close($conn);
