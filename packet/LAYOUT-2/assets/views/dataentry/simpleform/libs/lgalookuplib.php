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
function lookuplga($geolocatedtambon=NULL)
{

    if (!empty($geolocatedtambon)) {

        connectdb("localhost", "mkmorgangling", "nepenthes", "qsbgcoll");

        $rjselect = "SELECT tambonen,idtambon,amphuren,idamphurs,provinceen,idprovince FROM tambons
 left join amphurs on tambons.amphurs_idamphur=amphurs.idamphurs
 left join province on amphurs.province_idprovince=province.idprovince ";

        $rjwhere = "WHERE idtambon = " . $geolocatedtambon;

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
