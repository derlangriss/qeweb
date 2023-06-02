<?php
if (!ini_get('date.timezone')) {
    date_default_timezone_set('GMT');
}

require 'connectdb.php';
require 'collnoeditlib.php';

/* id manage */

echo trim($_POST["tcoll_id"]);
$tcollid             = trim($_POST["tcoll_id"]);
$tcollector_ida      = $_POST["tcollectorid"];
$tarraydecode        = json_decode($tcollector_ida, true);
$tcollection_code_id = $_POST["tcollection_code_id"];

/* generate code */
$tcoll_code   = $_POST["tcoll_code"];
$tcoll_year   = $_POST["tcoll_year"];
$tcoll_number = $_POST["tcoll_number"];

/* date collection */
$tstart = trim($_POST["tcoll_start_date"]);
$tend   = trim($_POST["tcoll_end_date"]);

/* collection details */
$tmethod   = trim($_POST["tmethod_method_id"]);
$tdonation = $_POST["tdonations_id"];

/* location coordinate */
$tlatdec   = trim($_POST["tcoll_lat_dec"]);
$tlatd     = trim($_POST["tcoll_lat_d"]);
$tlatm     = trim($_POST["tcoll_lat_m"]);
$tlats     = trim($_POST["tcoll_lat_s"]);
$tlongdec  = trim($_POST["tcoll_long_dec"]);
$tlongd    = trim($_POST["tcoll_long_d"]);
$tlongm    = trim($_POST["tcoll_long_m"]);
$tlongs    = trim($_POST["tcoll_long_s"]);
$tmasl     = trim($_POST["tcoll_masl"]);
$tnorthing = trim($_POST["tcoll_northing"]);
$teasing   = trim($_POST["tcoll_easting"]);
$tutm      = trim($_POST["tcoll_utm"]);

/* location option */
$tamphur        = trim($_POST["tamphur_amphur_id"]);
$ttumbon        = trim($_POST["ttambon_tambon_id"]);
$tacceptable    = trim($_POST["tacceptable"]);
$tamphur_direct = trim($_POST["tamphur_direct_amphur_direct_id"]);
$ttumbon_direct = trim($_POST["ttambon_direct_tambon_direct_id"]);

/* location admistrative */
$tspeclocality = htmlentities($_POST["tcoll_specific_locality"], ENT_QUOTES);
$tlocality     = htmlentities($_POST["tcoll_locality"], ENT_QUOTES);
$thabitat      = htmlentities($_POST["tcoll_thabitat"], ENT_QUOTES);

$strSQL = "SELECT * FROM collection ";
$strSQL .= "WHERE coll_code   = '" . $tcoll_code . "' AND coll_year= '" . $tcoll_year . "' AND coll_number= '" . $tcoll_number . "'";
$objQuery    = pg_query($strSQL);
$intRowsColl = pg_num_rows($objQuery);

if ($intRowsColl === 0) {
    /** add new data **/
    $resultArray = array();
    if ($tacceptable === '1') {
        $tamphur_direct = $tamphur;
        $ttumbon_direct = $ttumbon;
    }

    $collfullid = $tcoll_code . "-" . $tcoll_year . "-" . $tcoll_number;

    $strSQL = "with sample_ids as (";
    $strSQL .= "INSERT INTO collection ";
    $strSQL .= "(coll_full_id,coll_locality,coll_specific_locality,coll_habitat,coll_utm,coll_code,coll_year,coll_number,collection_code_collection_code_id";
    $strSQL .= trim($tmasl != '' ? ',coll_masl' : '');
    $strSQL .= trim($tnorthing != '' ? ',coll_northing' : '');
    $strSQL .= trim($teasing != '' ? ',coll_easting' : '');
    $strSQL .= trim($tlatdec != '' ? ',coll_lat_dec' : '');
    $strSQL .= trim($tlatd != '' ? ',coll_lat_d' : '');
    $strSQL .= trim($tlatm != '' ? ',coll_lat_m' : '');
    $strSQL .= trim($tlats != '' ? ',coll_lat_s' : '');
    $strSQL .= trim($tlongdec != '' ? ',coll_long_dec' : '');
    $strSQL .= trim($tlongd != '' ? ',coll_long_d' : '');
    $strSQL .= trim($tlongm != '' ? ',coll_long_m' : '');
    $strSQL .= trim($tlongs != '' ? ',coll_long_s' : '');
    $strSQL .= trim($tstart != '' ? ',coll_start_date' : '');
    $strSQL .= trim($tend != '' ? ',coll_end_date' : '');
    $strSQL .= trim($tamphur != '' ? ',amphur_amphur_id' : '');
    $strSQL .= trim($ttumbon != '' ? ',tambon_tambon_id' : '');
    $strSQL .= trim($tamphur_direct != '' ? ',amphur_direct_amphur_direct_id' : '');
    $strSQL .= trim($ttumbon_direct != '' ? ',tambon_direct_tambon_direct_id' : '');
    $strSQL .= trim($tacceptable != '' ? ',acceptable' : '');
    $strSQL .= trim($tmethod != '' ? ',method_method_id' : '');
    $strSQL .= trim($tdonation != '' ? ',donation_donation_id' : '');
    $strSQL .= ")";
    $strSQL .= "VALUES ";
    $strSQL .= "('" . $collfullid . "'";
    $strSQL .= ",'" . $tlocality . "','" . $tspeclocality . "'";
    $strSQL .= ",'" . $thabitat . "','" . $tutm . "'";
    $strSQL .= ",'" . $tcoll_code . "','" . $tcoll_year . "'";
    $strSQL .= ",'" . $tcoll_number . "'";
    $strSQL .= ",'" . $tcollection_code_id . "'";
    $strSQL .= ($tmasl != '' ? ',' . $tmasl : '');
    $strSQL .= ($tnorthing != '' ? ',' . $tnorthing : '');
    $strSQL .= ($teasing != '' ? ',' . $teasing : '');
    $strSQL .= ($tlatdec != '' ? ',' . $tlatdec : '');
    $strSQL .= ($tlatd != '' ? ',' . $tlatd : '');
    $strSQL .= ($tlatm != '' ? ',' . $tlatm : '');
    $strSQL .= ($tlats != '' ? ',' . $tlats : '');
    $strSQL .= ($tlongdec != '' ? ',' . $tlongdec : '');
    $strSQL .= ($tlongd != '' ? ',' . $tlongd : '');
    $strSQL .= ($tlongm != '' ? ',' . $tlongm : '');
    $strSQL .= ($tlongs != '' ? ',' . $tlongs : '');
    $strSQL .= ($tstart != '' ? ',' . "'" . $tstart . "'" : '');
    $strSQL .= ($tend != '' ? ',' . "'" . $tend . "'" : '');
    $strSQL .= ($tamphur != '' ? ',' . $tamphur : '');
    $strSQL .= ($ttumbon != '' ? ',' . $ttumbon : '');
    $strSQL .= ($tamphur_direct != '' ? ',' . $tamphur_direct : '');
    $strSQL .= ($ttumbon_direct != '' ? ',' . $ttumbon_direct : '');
    $strSQL .= ($tacceptable != '' ? ',' . $tacceptable : '');
    $strSQL .= ($tmethod != '' ? ',' . $tmethod : '');
    $strSQL .= ($tdonation != '' ? ',' . $tdonation : '');
    $strSQL .= ") RETURNING coll_id )";
    $strSQL .= " SELECT coll_id from sample_ids;";
    $objQuery = pg_query($strSQL);
    $row      = pg_fetch_array($objQuery);
    extract($row);
    $i = 1;
    foreach ($tarraydecode as $row) //Extract the Array Values by using Foreach Loop
    {
        $collectoridarr = $row["collector_id"];
        $stmt           = $PDOconn->prepare("INSERT INTO collection_has_collector(collector_collector_id,collection_coll_id,collectorseq) VALUES (" . $collectoridarr . "," . $coll_id . "," . $i . ")");
        $stmt->execute();
        $i++;
    }

    $strSQL   = "SELECT DISTINCT MAX(coll_number)+1 AS newcoll_number,coll_code,coll_year FROM collection WHERE coll_year = '" . $tcoll_year . "' GROUP BY coll_code,coll_year";
    $objQuery = pg_query($strSQL);
    $row      = pg_fetch_array($objQuery);
    extract($row);
    $count = sprintf('%04d', $newcoll_number);
    $arr   = array('coll_code' => $coll_code, 'coll_year' => $coll_year, 'coll_number' => $count, 'coll_id' => $coll_id, 'Ins_mode' => 'ADD');

    array_push($resultArray, $arr);

} else {

    $resultArray = array();
    $start       = trim($tstart);
    $end         = trim($tend);
    $coll_id     = $tcollid;

    if ($tacceptable === '1') {
        $tamphur_direct = $tamphur;
        $ttumbon_direct = $ttumbon;
    }


    $strSQL        = "UPDATE collection SET ";
    $strSQL .= "coll_masl = '" . ($tmasl != '' ? $tmasl : 0) . "' ";
    $strSQL .= trim($tstart != '' ? ',coll_start_date = ' : '') . ($tstart != '' ? "'" . $tstart . "'" : '');
    $strSQL .= trim($tend != '' ? ',coll_end_date =' : '') . ($tend != '' ? "'" . $tend . "'" : '');

    $strSQL .= ",collection_code_collection_code_id = '" . $tcollection_code_id . "' ";
    $strSQL .= ",amphur_amphur_id = '" . $tamphur . "' ";
    $strSQL .= ",tambon_tambon_id = '" . $ttumbon . "' ";
    $strSQL .= ",amphur_direct_amphur_direct_id = '" . ($tamphur_direct != '' ? trim($tamphur_direct) : '') . "' ";
    $strSQL .= trim($ttumbon_direct != '' ? ',tambon_direct_tambon_direct_id = ' : '') . ($ttumbon_direct != '' ? trim($ttumbon_direct) : '');
    $strSQL .= ",acceptable = '" . $tacceptable . "' ";
    $strSQL .= ",method_method_id = '" . $tmethod . "' ";
    $strSQL .= ",donation_donation_id = '" . $tdonation . "' ";

    $strSQL .= ",coll_locality = '" . $tlocality . "' ";
    $strSQL .= ",coll_specific_locality = '" . $tspeclocality . "' ";
    $strSQL .= ",coll_habitat = '" . $thabitat . "' ";

    $strSQL .= ",coll_northing = '" . ($tnorthing != '' ? $tnorthing : '0') . "' ";
    $strSQL .= ",coll_easting = '" . ($teasing != '' ? $teasing : '0') . "' ";
    $strSQL .= ",coll_lat_dec = '" . ($tlatdec != '' ? $tlatdec : '0') . "' ";
    $strSQL .= ",coll_lat_d = '" . ($tlatd != '' ? $tlatd : '0') . "' ";
    $strSQL .= ",coll_lat_m = '" . ($tlatm != '' ? $tlatm : '0') . "' ";
    $strSQL .= ",coll_lat_s = '" . ($tlats != '' ? $tlats : '0') . "' ";
    $strSQL .= ",coll_long_dec = '" . ($tlongdec != '' ? $tlongdec : '0') . "' ";
    $strSQL .= ",coll_long_d = '" . ($tlongd != '' ? $tlongd : '0') . "' ";
    $strSQL .= ",coll_long_m = '" . ($tlongm != '' ? $tlongm : '0') . "' ";
    $strSQL .= ",coll_long_s = '" . ($tlongs != '' ? $tlongs : '0') . "' ";

    $strSQL .= "WHERE coll_code   = '" . $tcoll_code . "' AND coll_year= '" . $tcoll_year . "' AND coll_number= '" . $tcoll_number . "'";
    $objQuery = pg_query($strSQL);

    $SQLcountcollector   = "select count(collectorseq) AS countcollector from collection_has_collector where collection_coll_id = " . $tcollid;
    $QueryCountcollector = pg_query($SQLcountcollector);
    $row                 = pg_fetch_array($QueryCountcollector);
    extract($row);

    $countform = count($tarraydecode);
    if ($countform == $countcollector) {

        $i = 1;
        foreach ($arraydecode as $row) //Extract the Array Values by using Foreach Loop
        {

            $collectoridarr = $row["collector_id"];
            $stmt01         = $PDOconn->prepare("UPDATE collection_has_collector SET collector_collector_id = " . $collectoridarr . " WHERE collection_coll_id =" . $tcollid . " AND collectorseq = " . $i);
            $stmt01->execute();

            $i++;
        }

    }

    if ($countform > $countcollector) {

        $i = 1;
        foreach ($tarraydecode as $row) //Extract the Array Values by using Foreach Loop
        {

            $collectoridarr = $row["collector_id"];
            $stmt01         = $PDOconn->prepare("UPDATE collection_has_collector SET collector_collector_id = " . $collectoridarr . " WHERE collection_coll_id =" . $tcollid . " AND collectorseq = " . $i);
            $stmt01->execute();

            if ($i > $countcollector) {
                $stmt = $PDOconn->prepare("INSERT INTO collection_has_collector(collector_collector_id,collection_coll_id,collectorseq) VALUES (" . $collectoridarr . "," . $tcollid . "," . $i . ")");
                $stmt->execute();
            }

            $i++;
        }

    }
    if ($countform < $countcollector) {

        $stmt01 = $PDOconn->prepare("DELETE FROM collection_has_collector WHERE collection_coll_id = '" . $tcollid . "' AND collectorseq > " . $countform);
        $stmt01->execute();

        $i = 1;
        foreach ($tarraydecode as $row) //Extract the Array Values by using Foreach Loop
        {

            $collectoridarr = $row["collector_id"];
            $stmt01         = $PDOconn->prepare("UPDATE collection_has_collector SET collector_collector_id = " . $collectoridarr . " WHERE collection_coll_id =" . $tcollid . " AND collectorseq = " . $i);
            $stmt01->execute();
            $i++;
        }

    }

    $strSQL   = "SELECT coll_code,coll_year, (coll_number)+1 as coll_number from collection  order by coll_year desc,coll_number desc limit 1";
    $objQuery = pg_query($strSQL);
    $row      = pg_fetch_array($objQuery);
    extract($row);
    $count = sprintf('%04d', $coll_number);
    $arr   = array('coll_code' => $coll_code, 'coll_year' => $coll_year, 'coll_number' => $count, 'coll_id' => $coll_id, 'Ins_mode' => 'UPDATE');

    array_push($resultArray, $arr);

}

echo json_encode($resultArray);

pg_close($conn);
