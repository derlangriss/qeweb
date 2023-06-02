<?php
if (!ini_get('date.timezone')) {
    date_default_timezone_set('GMT');
}
require 'connectdbDu.php';

$resultArray = array();

if (isset($_GET['durableid'])) {
    $strSQL = "SELECT *
                   FROM durablelist
                   LEFT JOIN sub_place ON sub_place.sub_place_id = durablelist.sub_place_sub_place_id
                   LEFT JOIN explace ON explace.explace_id = sub_place.explace_explace_id
                   LEFT JOIN owner ON durablelist.m_owner_id = owner.owner_id
                   LEFT JOIN responsible ON owner.responsible_response_id = responsible.response_id
                   LEFT JOIN orgsection ON durablelist.orgsection_orgsection_id = orgsection.orgsection_id
                   WHERE TRUE AND durablelist_id  = '" . $_GET["durableid"] . "'
                   ";

    $objQuery    = pg_query($strSQL);
    $intRowsColl = pg_num_rows($objQuery);
    if ($intRowsColl > 0) {
        $intNumField = pg_num_fields($objQuery);
        while ($obResult = pg_fetch_array($objQuery)) {
            $arrCol = array();
            for ($i = 0; $i < $intNumField; $i++) {

                $arrCol[pg_field_name($objQuery, $i)] = $obResult[$i];
            }
            array_push($resultArray, $arrCol);
        }
    } else {
        $resultArray = nocollfn();
    }
} else {
    $resultArray = nocollfn();
}
echo json_encode($resultArray);
