<?php

require 'connectdb.php';
$month  = $_GET['month'];
$year   = $_GET['year'];
$userid = $_GET['userid'];

$strSQL = "SELECT * FROM userlockbox ";
$strSQL .= "left join users_auth on users_auth.uid = userlockbox.lockbox_userid ";
$strSQL .= "left join collectionresbox on userlockbox.lockbox_boxid = collectionresbox.collbox_id ";
$strSQL .= "WHERE lockbox_userid = " . $userid;

$objQuery    = pg_query($strSQL);
$intNumField = pg_num_fields($objQuery);
$resultArray = array();
$CheckUser   = pg_num_rows($objQuery);

if ($CheckUser === 0) {

    $arr = array('success' => '0', 'countspecinbox' => '0', 'user_name' => 'NA', 'boxlockstate' => 'UNLOCK', 'collbox_id' => '', 'collboxno' => '', 'checkuser_date' => '');
    array_push($resultArray, $arr);

} else {
    $obResult = pg_fetch_array($objQuery);
    extract($obResult);

    $checkmonth = date('m', strtotime($lockbox_mreport));
    $checkyear  = date('Y', strtotime($lockbox_mreport));

    $strSQL02 = "WITH countspecinbox as ( ";
    $strSQL02 .= "SELECT count(specimens_id) AS countspecinbox FROM specimens ";
    $strSQL02 .= "left join collectionresbox on collectionresbox.collbox_id = specimens.container_id ";
    $strSQL02 .= "left join container_type on container_type.container_type_id = specimens.container_type ";
    $strSQL02 .= "WHERE container_type = '1' AND collbox_id = '" . $lockbox_boxid . "' ";
    $strSQL02 .= "AND EXTRACT(MONTH FROM sreport_date) = " . $checkmonth . " AND EXTRACT(YEAR FROM sreport_date) = " . $checkyear;
    $strSQL02 .= "), countundefinedspecinbox as ( ";
    $strSQL02 .= "SELECT count(specimens_id) AS countundefinedspec FROM specimens ";
    $strSQL02 .= "left join collectionresbox on collectionresbox.collbox_id = specimens.container_id ";
    $strSQL02 .= "left join container_type on container_type.container_type_id = specimens.container_type ";

    $strSQL02 .= "left join species on specimens.species_species_id  = species.species_id  ";
    $strSQL02 .= "left join genus on species.genus_genus_id = genus.genus_id  ";
    $strSQL02 .= "left join family on genus.family_family_id = family.family_id  ";
    $strSQL02 .= "left join torder on family.torder_torder_id = torder.torder_id  ";

    $strSQL02 .= "WHERE container_type = '1' AND collbox_id = '" . $lockbox_boxid . "' ";
    $strSQL02 .= "AND EXTRACT(MONTH FROM sreport_date) = " . $checkmonth . " AND EXTRACT(YEAR FROM sreport_date) = " . $checkyear . " ";
    $strSQL02 .= "AND torder_id = 0";
    $strSQL02 .= ") ";
    $strSQL02 .= "SELECT (SELECT countspecinbox from countspecinbox) , (SELECT countundefinedspec from countundefinedspecinbox)";

    $objQuery02    = pg_query($strSQL02);
    $intNumField02 = pg_num_fields($objQuery02);
    $obResult02    = pg_fetch_array($objQuery02);
    extract($obResult02);

    $uppername = strtoupper(substr($firstname, 0, 3));

    $arr = array('success' => '1', 'countspecinbox' => $countspecinbox, 'countundefinedspec' => $countundefinedspec, 'user_name' => $uppername, 'boxlockstate' => 'LOCK', 'collbox_id' => $collbox_id, 'collboxno' => $collboxno, 'checkuser_date' => $lockbox_mreport, 'nuser_name' => $firstname);
    array_push($resultArray, $arr);

}

pg_close($conn);

echo json_encode($resultArray);
