<?php
if (!ini_get('date.timezone')) {
    date_default_timezone_set('GMT');
}

require 'connectdb.php';
require 'collnoeditlib.php'; 
$start              = trim($_POST["tcoll_start_date"]);
$end                = trim($_POST["tcoll_end_date"]);
$collector_ida      = $_POST["tcollectorid"];
$arraydecode        = json_decode($collector_ida, true);
$speclocality       = htmlentities($_POST["tcoll_specific_locality"], ENT_QUOTES);
$locality           = htmlentities($_POST["tcoll_locality"], ENT_QUOTES);
$habitat            = htmlentities($_POST["tcoll_thabitat"], ENT_QUOTES);
$donationtest       = $_POST["tdonations_id"];
$collection_code_id = $_POST["tcollection_code_id"];
$tcoll_year         = $_POST["tcoll_year"]; 

$strSQL = "SELECT * FROM collection ";
$strSQL .= "WHERE coll_code   = '" . $_POST["tcoll_code"] . "' AND coll_year= '" . $_POST["tcoll_year"] . "' AND coll_number= '" . $_POST["tcoll_number"] . "'";
$objQuery    = pg_query($strSQL);
$intRowsColl = pg_num_rows($objQuery);
if ($intRowsColl === 0) {
    $strModetest = "ADD";
} else {
    $strModetest = "UPDATE";
}

if ($strModetest == "ADD") {

    $checkCollection = "SELECT * FROM collection";
    $resColl         = pg_query($checkCollection);
    $intRowsColl     = pg_num_rows($resColl);
    $resultArray     = array();

    if ($_POST["tacceptable"] === '1') {
        $_POST["tamphur_direct_amphur_direct_id"] = $_POST["tamphur_amphur_id"];
        $_POST["ttambon_direct_tambon_direct_id"] = $_POST["ttambon_tambon_id"];
    }

    $collfullid = $_POST["tcoll_code"] . "-" . $_POST["tcoll_year"] . "-" . $_POST["tcoll_number"];
    $strSQL     = "with sample_ids as (";
    $strSQL .= "INSERT INTO collection ";
    $strSQL .= "(coll_full_id,
    coll_locality,
    coll_specific_locality,
    coll_habitat,
    coll_utm,
    coll_code,
    coll_year,
    coll_number,
    collection_code_collection_code_id";
    $strSQL .= trim($_POST["tcoll_masl"] != '' ? ',coll_masl' : '');
    $strSQL .= trim($_POST["tcoll_northing"] != '' ? ',coll_northing' : '');
    $strSQL .= trim($_POST["tcoll_easting"] != '' ? ',coll_easting' : '');
    $strSQL .= trim($_POST["tcoll_lat_dec"] != '' ? ',coll_lat_dec' : '');
    $strSQL .= trim($_POST["tcoll_lat_d"] != '' ? ',coll_lat_d' : '');
    $strSQL .= trim($_POST["tcoll_lat_m"] != '' ? ',coll_lat_m' : '');
    $strSQL .= trim($_POST["tcoll_lat_s"] != '' ? ',coll_lat_s' : '');
    $strSQL .= trim($_POST["tcoll_long_dec"] != '' ? ',coll_long_dec' : '');
    $strSQL .= trim($_POST["tcoll_long_d"] != '' ? ',coll_long_d' : '');
    $strSQL .= trim($_POST["tcoll_long_m"] != '' ? ',coll_long_m' : '');
    $strSQL .= trim($_POST["tcoll_long_s"] != '' ? ',coll_long_s' : '');
    $strSQL .= trim($_POST["tcoll_start_date"] != '' ? ',coll_start_date' : '');
    $strSQL .= trim($_POST["tcoll_end_date"] != '' ? ',coll_end_date' : '');
    $strSQL .= trim($_POST["tamphur_amphur_id"] != '' ? ',amphur_amphur_id' : '');
    $strSQL .= trim($_POST["ttambon_tambon_id"] != '' ? ',tambon_tambon_id' : '');
    $strSQL .= trim($_POST["tamphur_direct_amphur_direct_id"] != '' ? ',amphur_direct_amphur_direct_id' : '');
    $strSQL .= trim($_POST["ttambon_direct_tambon_direct_id"] != '' ? ',tambon_direct_tambon_direct_id' : '');
    $strSQL .= trim($_POST["tacceptable"] != '' ? ',acceptable' : '');
    $strSQL .= trim($_POST["tmethod_method_id"] != '' ? ',method_method_id' : '');
    $strSQL .= trim($_POST["tdonations_id"] != '' ? ',donation_donation_id' : '');
    $strSQL .= ")";
    $strSQL .= "VALUES ";
    $strSQL .= "('" . $collfullid . "'";
    $strSQL .= ",'" . $locality . "','" . $speclocality . "'";
    $strSQL .= ",'" . $habitat . "','" . $_POST["tcoll_utm"] . "'";
    $strSQL .= ",'" . $_POST["tcoll_code"] . "','" . $_POST["tcoll_year"] . "'";
    $strSQL .= ",'" . $_POST["tcoll_number"] . "'";
    $strSQL .= ",'" . $collection_code_id . "'";
    $strSQL .= ($_POST["tcoll_masl"] != '' ? ',' . $_POST["tcoll_masl"] : '');
    $strSQL .= ($_POST["tcoll_northing"] != '' ? ',' . $_POST["tcoll_northing"] : '');
    $strSQL .= ($_POST["tcoll_easting"] != '' ? ',' . $_POST["tcoll_easting"] : '');
    $strSQL .= ($_POST["tcoll_lat_dec"] != '' ? ',' . $_POST["tcoll_lat_dec"] : '');
    $strSQL .= ($_POST["tcoll_lat_d"] != '' ? ',' . $_POST["tcoll_lat_d"] : '');
    $strSQL .= ($_POST["tcoll_lat_m"] != '' ? ',' . $_POST["tcoll_lat_m"] : '');
    $strSQL .= ($_POST["tcoll_lat_s"] != '' ? ',' . $_POST["tcoll_lat_s"] : '');
    $strSQL .= ($_POST["tcoll_long_dec"] != '' ? ',' . $_POST["tcoll_long_dec"] : '');
    $strSQL .= ($_POST["tcoll_long_d"] != '' ? ',' . $_POST["tcoll_long_d"] : '');
    $strSQL .= ($_POST["tcoll_long_m"] != '' ? ',' . $_POST["tcoll_long_m"] : '');
    $strSQL .= ($_POST["tcoll_long_s"] != '' ? ',' . $_POST["tcoll_long_s"] : '');
    $strSQL .= ($_POST["tcoll_start_date"] != '' ? ',' . "'" . $start . "'" : '');
    $strSQL .= ($_POST["tcoll_end_date"] != '' ? ',' . "'" . $end . "'" : '');
    $strSQL .= ($_POST["tamphur_amphur_id"] != '' ? ',' . $_POST["tamphur_amphur_id"] : '');
    $strSQL .= ($_POST["ttambon_tambon_id"] != '' ? ',' . $_POST["ttambon_tambon_id"] : '');
    $strSQL .= ($_POST["tamphur_direct_amphur_direct_id"] != '' ? ',' . $_POST["tamphur_direct_amphur_direct_id"] : '');
    $strSQL .= ($_POST["ttambon_direct_tambon_direct_id"] != '' ? ',' . $_POST["ttambon_direct_tambon_direct_id"] : '');
    $strSQL .= ($_POST["tacceptable"] != '' ? ',' . $_POST["tacceptable"] : '');
    $strSQL .= ($_POST["tmethod_method_id"] != '' ? ',' . $_POST["tmethod_method_id"] : '');
    $strSQL .= ($_POST["tdonations_id"] != '' ? ',' . $_POST["tdonations_id"] : '');
    $strSQL .= ") RETURNING coll_id )";
    $strSQL .= " SELECT coll_id from sample_ids;";
    $objQuery = pg_query($strSQL);
    $row      = pg_fetch_array($objQuery);
    extract($row);
    $i = 1;
    foreach ($arraydecode as $row) //Extract the Array Values by using Foreach Loop
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
    $arr   = array('coll_code' => $coll_code, 'coll_year' => $coll_year, 'coll_number' => $count, 'coll_id' => $coll_id, 'Ins_mode' => $strModetest);

    array_push($resultArray, $arr);

}
if ($strModetest == "UPDATE") {
    $resultArray = array();
    $start       = trim($_POST["tcoll_start_date"]);
    $end         = trim($_POST["tcoll_end_date"]);
    $coll_id     = $_POST["tcoll_id"];
    if ($_POST["tacceptable"] === '1') {
        $_POST["tamphur_direct_amphur_direct_id"] = $_POST["tamphur_amphur_id"];
        $_POST["ttambon_direct_tambon_direct_id"] = $_POST["ttambon_tambon_id"];
    }

    $collector_ida = $_POST["tcollectorid"];
    $arraydecode   = json_decode($collector_ida, true);
    $strSQL        = "UPDATE collection SET ";
    $strSQL .= "coll_masl = '" . ($_POST["tcoll_masl"] != '' ? $_POST["tcoll_masl"] : 0) . "' ";
    $strSQL .= trim($_POST["tcoll_start_date"] != '' ? ',coll_start_date = ' : '') . ($_POST["tcoll_start_date"] != '' ? "'" . $start . "'" : '');
    $strSQL .= trim($_POST["tcoll_end_date"] != '' ? ',coll_end_date =' : '') . ($_POST["tcoll_end_date"] != '' ? "'" . $end . "'" : '');

    $strSQL .= ",collection_code_collection_code_id = '" . $collection_code_id . "' ";
    $strSQL .= ",amphur_amphur_id = '" . $_POST["tamphur_amphur_id"] . "' ";
    $strSQL .= ",tambon_tambon_id = '" . $_POST["ttambon_tambon_id"] . "' ";
    $strSQL .= ",amphur_direct_amphur_direct_id = '" . ($_POST["tamphur_direct_amphur_direct_id"] != '' ? trim($_POST["tamphur_direct_amphur_direct_id"]) : '') . "' ";
    $strSQL .= trim($_POST["ttambon_direct_tambon_direct_id"] != '' ? ',tambon_direct_tambon_direct_id = ' : '') . ($_POST["ttambon_direct_tambon_direct_id"] != '' ? trim($_POST["ttambon_direct_tambon_direct_id"]) : '');
    $strSQL .= ",acceptable = '" . $_POST["tacceptable"] . "' ";
    $strSQL .= ",method_method_id = '" . $_POST["tmethod_method_id"] . "' ";
    $strSQL .= ",donation_donation_id = '" . $_POST["tdonations_id"] . "' ";

    $strSQL .= ",coll_locality = '" . $locality . "' ";
    $strSQL .= ",coll_specific_locality = '" . $speclocality . "' ";
    $strSQL .= ",coll_habitat = '" . $habitat . "' ";

    $strSQL .= ",coll_northing = '" . ($_POST["tcoll_northing"] != '' ? $_POST["tcoll_northing"] : '0') . "' ";
    $strSQL .= ",coll_easting = '" . ($_POST["tcoll_easting"] != '' ? $_POST["tcoll_easting"] : '0') . "' ";
    $strSQL .= ",coll_lat_dec = '" . ($_POST["tcoll_lat_dec"] != '' ? $_POST["tcoll_lat_dec"] : '0') . "' ";
    $strSQL .= ",coll_lat_d = '" . ($_POST["tcoll_lat_d"] != '' ? $_POST["tcoll_lat_d"] : '0') . "' ";
    $strSQL .= ",coll_lat_m = '" . ($_POST["tcoll_lat_m"] != '' ? $_POST["tcoll_lat_m"] : '0') . "' ";
    $strSQL .= ",coll_lat_s = '" . ($_POST["tcoll_lat_s"] != '' ? $_POST["tcoll_lat_s"] : '0') . "' ";
    $strSQL .= ",coll_long_dec = '" . ($_POST["tcoll_long_dec"] != '' ? $_POST["tcoll_long_dec"] : '0') . "' ";
    $strSQL .= ",coll_long_d = '" . ($_POST["tcoll_long_d"] != '' ? $_POST["tcoll_long_d"] : '0') . "' ";
    $strSQL .= ",coll_long_m = '" . ($_POST["tcoll_long_m"] != '' ? $_POST["tcoll_long_m"] : '0') . "' ";
    $strSQL .= ",coll_long_s = '" . ($_POST["tcoll_long_s"] != '' ? $_POST["tcoll_long_s"] : '0') . "' ";

    $strSQL .= "WHERE coll_code   = '" . $_POST["tcoll_code"] . "' AND coll_year= '" . $_POST["tcoll_year"] . "' AND coll_number= '" . $_POST["tcoll_number"] . "'";
    $objQuery = pg_query($strSQL);






    

    $SQLcountcollector   = "select count(collectorseq) AS countcollector from collection_has_collector where collection_coll_id = " . $_POST["tcoll_id"];
    $QueryCountcollector = pg_query($SQLcountcollector);
    $row                 = pg_fetch_array($QueryCountcollector);
    extract($row);

    $countform = count($arraydecode);
    if ($countform ==  $countcollector) {

        $i = 1;
        foreach ($arraydecode as $row) //Extract the Array Values by using Foreach Loop
        {

            $collectoridarr = $row["collector_id"];
            $stmt01         = $PDOconn->prepare("UPDATE collection_has_collector SET collector_collector_id = " . $collectoridarr . " WHERE collection_coll_id =" . $_POST["tcoll_id"] . " AND collectorseq = " . $i);
            $stmt01->execute();

            $i++;
        }

    } 

    if ($countform > $countcollector) {

        $i = 1;
        foreach ($arraydecode as $row) //Extract the Array Values by using Foreach Loop
        {

            $collectoridarr = $row["collector_id"];
            $stmt01         = $PDOconn->prepare("UPDATE collection_has_collector SET collector_collector_id = " . $collectoridarr . " WHERE collection_coll_id =" . $_POST["tcoll_id"] . " AND collectorseq = " . $i);
            $stmt01->execute();

            if ($i > $countcollector) {
                $stmt = $PDOconn->prepare("INSERT INTO collection_has_collector(collector_collector_id,collection_coll_id,collectorseq) VALUES (" . $collectoridarr . "," . $_POST["tcoll_id"] . "," . $i . ")");
                $stmt->execute();
            }

            $i++;
        }

    }
    if ($countform < $countcollector) {

        $stmt01 = $PDOconn->prepare("DELETE FROM collection_has_collector WHERE collection_coll_id = '" . $_POST["tcoll_id"] . "' AND collectorseq > " . $countform);
        $stmt01->execute();

        $i = 1;
        foreach ($arraydecode as $row) //Extract the Array Values by using Foreach Loop
        {

            $collectoridarr = $row["collector_id"];
            $stmt01         = $PDOconn->prepare("UPDATE collection_has_collector SET collector_collector_id = " . $collectoridarr . " WHERE collection_coll_id =" . $_POST["tcoll_id"] . " AND collectorseq = " . $i);
            $stmt01->execute();
            $i++;
        }

    }

    $strSQL   = "SELECT coll_code,coll_year, (coll_number)+1 as coll_number from collection  order by coll_year desc,coll_number desc limit 1";
    $objQuery = pg_query($strSQL);
    $row      = pg_fetch_array($objQuery);
    extract($row);
    $count = sprintf('%04d', $coll_number);
    $arr   = array('coll_code' => $coll_code, 'coll_year' => $coll_year, 'coll_number' => $count, 'coll_id' => $coll_id, 'Ins_mode' => $strModetest);

    array_push($resultArray, $arr);

}

echo json_encode($resultArray);

pg_close($conn);
