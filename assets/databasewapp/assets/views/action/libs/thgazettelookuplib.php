<?php
///////////////////////////////////////////
// Function to connect to the a database //
///////////////////////////////////////////
function connectdb2($hostname,$dbUser,$dbPass,$dbName)
{
// connect to the database
$conn = pg_connect("host=$hostname dbname=$dbName user=$dbUser password=$dbPass") or die("Cannot connect to the database");
}


////////////////////////////////////////////////////////////////////
// Function to lookup nearest gazetted na,e from decimal lat/long //
////////////////////////////////////////////////////////////////////
function lookupthaigazettedloc($long,$lat)
{
connectdb2("localhost","postgres","ren4enk1","thaigazette");
$rjlatlong = "SELECT gname FROM gazette WHERE pointcoordinates <-> POINT($lat,$long) < 0.1 ORDER BY pointcoordinates <-> POINT($lat,$long) LIMIT 5;";
echo $rjlatlong;
$rjres = pg_query($rjlatlong);
$row=pg_fetch_array($rjres);
extract($row);
return $gname;
}



?>
