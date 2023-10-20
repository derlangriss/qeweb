<?php
require_once 'libs/lgalookuplib.php';

$lat  = trim($_POST["flat"]);
$long = trim($_POST["flong"]);

$rjrestest = lookuplga(lookupthaigeo($long, $lat));
$latmap    = $lat;
$longmap   = $long;

while ($row = pg_fetch_array($rjrestest)) {
    extract($row);
}

echo $provinceen . "|" . $idamphurs . "|" . $amphuren . "|" . $idtambon . "|" . $tambonen;
