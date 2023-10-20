<?php

require 'connectdb.php';
$month = $_GET['month'];
$year  = $_GET['year'];

$strSQL = "SELECT collbox_id,collboxno,firstname,boxstatus,lockbox_mreport,state_color,boxlocate FROM userlockbox ";
$strSQL .= "left join box_location on box_location.boxlocate_id = userlockbox.lockbox_boxplaceid ";
$strSQL .= "left join users_auth on userlockbox.lockbox_userid = users_auth.uid ";
$strSQL .= "left join collectionresbox on userlockbox.lockbox_boxid = collectionresbox.collbox_id ";
$strSQL .= "left join boxstatus on userlockbox.lockbox_boxstatus = boxstatus.boxstatus_id ";
$strSQL .= "WHERE EXTRACT(MONTH FROM lockbox_mreport) = " . $month . " AND EXTRACT(YEAR FROM lockbox_mreport) = " . $year;
$strSQL .= "AND boxstatus_id > 1";
$strSQL .= "ORDER BY collbox_id ASC ";

$objQuery    = pg_query($strSQL);
$intNumField = pg_num_fields($objQuery);
$resultArray = array();

while ($obResult = pg_fetch_array($objQuery)) {
    extract($obResult);
    $arrCol = array();
    for ($i = 0; $i < $intNumField; $i++) {
        $arrCol[pg_field_name($objQuery, $i)] = $obResult[$i];
    }

    $strSQL03 = "SELECT COUNT(*) AS countallspec from specimens ";
    $strSQL03 .= "left join collectionresbox on specimens.container_id = collectionresbox.collbox_id ";
    $strSQL03 .= "left join container_type on container_type.container_type_id = specimens.container_type ";
    $strSQL03 .= "WHERE container_type = 1 ";
    $strSQL03 .= "AND container_id ='" . $collbox_id . "' ";
    $strSQL03 .= "AND EXTRACT(MONTH FROM sreport_date) = " . $month . " AND EXTRACT(YEAR FROM sreport_date) = " . $year;

    $strSQLCountSpecimensInbox = "WITH countspecinbox as ( ";
    $strSQLCountSpecimensInbox .= "SELECT COUNT(*) AS countspec from specimens ";
    $strSQLCountSpecimensInbox .= "left join userlockbox on userlockbox.lockbox_boxid = specimens.container_id  ";
    $strSQLCountSpecimensInbox .= "left join container_type on container_type.container_type_id = specimens.container_type ";
    $strSQLCountSpecimensInbox .= "WHERE container_type = 1 ";
    $strSQLCountSpecimensInbox .= "AND EXTRACT(MONTH FROM sreport_date) = EXTRACT(MONTH FROM lockbox_mreport) ";
    $strSQLCountSpecimensInbox .= "AND EXTRACT(YEAR FROM sreport_date) = EXTRACT(YEAR FROM lockbox_mreport) ";
    $strSQLCountSpecimensInbox .= "AND lockbox_boxid ='" . $collbox_id . "'";
    $strSQLCountSpecimensInbox .= "AND EXTRACT(MONTH FROM lockbox_mreport) = " . $month . " AND EXTRACT(YEAR FROM lockbox_mreport) = " . $year;
    $strSQLCountSpecimensInbox .= " ), countundefinedspecinbox as ( ";
    $strSQLCountSpecimensInbox .= "SELECT COUNT(*) AS countundefinedspec from specimens ";
    $strSQLCountSpecimensInbox .= "left join userlockbox on userlockbox.lockbox_boxid = specimens.container_id  ";
    $strSQLCountSpecimensInbox .= "left join container_type on container_type.container_type_id = specimens.container_type ";
    $strSQLCountSpecimensInbox .= "left join species on specimens.species_species_id  = species.species_id  ";
    $strSQLCountSpecimensInbox .= "left join genus on species.genus_genus_id = genus.genus_id  ";
    $strSQLCountSpecimensInbox .= "left join family on genus.family_family_id = family.family_id  ";
    $strSQLCountSpecimensInbox .= "left join torder on family.torder_torder_id = torder.torder_id  "; 
    $strSQLCountSpecimensInbox .= "WHERE container_type = 1 ";
    $strSQLCountSpecimensInbox .= "AND EXTRACT(MONTH FROM sreport_date) = EXTRACT(MONTH FROM lockbox_mreport) ";
    $strSQLCountSpecimensInbox .= "AND EXTRACT(YEAR FROM sreport_date) = EXTRACT(YEAR FROM lockbox_mreport) ";
    $strSQLCountSpecimensInbox .= "AND lockbox_boxid ='" . $collbox_id . "' ";
    $strSQLCountSpecimensInbox .= "AND EXTRACT(MONTH FROM lockbox_mreport) = " . $month . " AND EXTRACT(YEAR FROM lockbox_mreport) = " . $year . " ";
    $strSQLCountSpecimensInbox .= "AND torder_id = 0";
    $strSQLCountSpecimensInbox .= ") ";
    $strSQLCountSpecimensInbox .= "SELECT (SELECT countspec from countspecinbox) , (SELECT countundefinedspec from countundefinedspecinbox)";

    $objQueryCountSpecimensInbox = pg_query($strSQLCountSpecimensInbox);
    $rowCountSpecimensInbox      = pg_fetch_array($objQueryCountSpecimensInbox);
    extract($rowCountSpecimensInbox);
    $arrCol['countallspec'] = $countspec;
    $arrCol['countundefinedspec'] = $countundefinedspec;

    $strSQL02 = "SELECT firstname,avartar from user_has_collresbox ";
    $strSQL02 .= "left join collectionresbox on collectionresbox.collbox_id = user_has_collresbox.collresbox_id ";
    $strSQL02 .= "left join users_auth on users_auth.uid = user_has_collresbox.user_id ";
    $strSQL02 .= "WHERE collbox_id ='" . $collbox_id . "'";
    $objQuery02    = pg_query($strSQL02);
    $resultArray01 = array();
    $intNumField01 = pg_num_fields($objQuery02);
    $countuser     = pg_num_rows($objQuery02);
    while ($obResult01 = pg_fetch_array($objQuery02)) {
        $arrCol01 = array();
        for ($i = 0; $i < $intNumField01; $i++) {
            $arrCol01[pg_field_name($objQuery02, $i)] = $obResult01[$i];
        }

        array_push($resultArray01, $arrCol01);
        $arrCol['avartars']  = $resultArray01;
        $arrCol['countuser'] = $countuser;
    }
    array_push($resultArray, $arrCol);

}

pg_close($conn);

echo json_encode($resultArray);

/*

$objQuery02  = pg_query($strSQL02);
$intNumField = pg_num_fields($objQuery02);
while ($obResult01 = pg_fetch_array($objQuery02)) {
$arrCol = array();
for ($i = 0; $i < $intNumField; $i++) {
$arrCol[pg_field_name($objQuery02, $i)] = $obResult01[$i];
}
array_push($resultArray, $arrCol);
$arrCol['avartars'] = $resultArray;
}

array_push($resultArray01, $collboxno);

}
 */
/*
$arrCol = array();
for ($i = 0; $i < $intNumField; $i++) {
$arrCol[pg_field_name($objQuery, $i)] = $obResult[$i];
}

array_push($resultArray, $arrCol);*/
