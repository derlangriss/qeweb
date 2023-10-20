<?php
///////////////////////////////////////////
// Function to connect to the a database //
///////////////////////////////////////////
function connectdb($hostname, $dbUser, $dbPass, $dbName)
{
// connect to the database
    $conn = pg_connect("host=$hostname dbname=$dbName user=$dbUser password=$dbPass") or die("Cannot connect to the database");
}

////////////////////////////////////////////////////////
// Function to lookup tambon ID from decimal lat/long //
////////////////////////////////////////////////////////
function lookupthaigeo($long, $lat)
{
    if ($long && $lat != '') {
        connectdb("localhost", "mkmorgangling", "nepenthes", "thaigeo");
        $rjlatlong = "SELECT id_3,name_3 FROM tha_adm3 WHERE ST_Contains(the_geom, ST_MakePoint($long, $lat))";
        $rjres     = pg_query($rjlatlong);
        $row       = pg_fetch_array($rjres);
        if ($row != '') {
            extract($row);
            return $id_3;
        } else {
            return null;
        }

    }
}

///////////////////////////////////////////////////////////////////////////////////////////////////
// Function to lookup LGA details from the tambon (geolocated or otherwise), amphur or province //
///////////////////////////////////////////////////////////////////////////////////////////////////
function lookuplga($geolocatedtambon = null)
{
    connectdb("localhost", "mkmorgangling", "nepenthes", "QEinsectsDB");
    if (!empty($geolocatedtambon)) {

        $rjselect = "SELECT tambon_en,tambon_id,amphur_en,amphur_id,province_en,province_id FROM tambon
 left join amphur on tambon.amphur_amphur_id=amphur.amphur_id
 left join province on amphur.province_province_id=province.province_id ";

        $rjwhere = "WHERE tambon_id = " . $geolocatedtambon;

/*
if (!empty($geolocatedtambon)) {
$rjwhere .= " AND idtambon = '$geolocatedtambon'";
}
if (!empty($idamphurs)) {
$rjwhere .= " AND idamphurs = '$idamphurs'";
}
if (!empty($idprovince)) {
$rjwhere .= " AND idprovince = '$idprovince'";
}
 */
        $rjsql = ($rjselect . $rjwhere);
//echo $rjsql;

        $rjres = pg_query($rjsql);

        return $rjres;
    } else {

        $rjselect = "SELECT tambon_en,tambon_id,amphur_en,amphur_id,province_en,province_id FROM tambon
 left join amphur on tambon.amphur_amphur_id=amphur.amphur_id
 left join province on amphur.province_province_id=province.province_id ";

        $rjwhere = "WHERE tambon_id = 0";

/*
if (!empty($geolocatedtambon)) {
$rjwhere .= " AND idtambon = '$geolocatedtambon'";
}
if (!empty($idamphurs)) {
$rjwhere .= " AND idamphurs = '$idamphurs'";
}
if (!empty($idprovince)) {
$rjwhere .= " AND idprovince = '$idprovince'";
}
 */
        $rjsql = ($rjselect . $rjwhere);
//echo $rjsql;

        $rjres = pg_query($rjsql);

        return $rjres;

    }
    exit;
}
