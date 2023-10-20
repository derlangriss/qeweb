<?php
$hostname = "localhost";
$dbUser   = "mkmorgangling";
$dbPass   = "nepenthes";
$dbName   = "durable02";
// connect to the database
$objConnect = mysqli_connect($hostname, $dbUser, $dbPass, $dbName) or die("Cannot connect to the database");
$strSQL     = "SELECT * FROM durablelist
left join owner on owner.owner_id = durablelist.owner_id
		left join place on place.place_id = durablelist.place_id
		left join placealways on placealways.place_always_id = durablelist.place_always_id
		left join room on room.room_id = durablelist.room_id
		left join durablename on durablename.durable_name_id = durablelist.durable_name_id
		left join status on status.status_id = durablelist.status_id
		left join durableno on durableno.durable_no_id = durablelist.durable_no_id
WHERE durablelist_id  = '" . $_POST["sCode"] . "'";
$objQuery = mysqli_query($objConnect, $strSQL) or die(mysqli_error($objConnect));
function mysqli_field_name($objQuery, $field_offset)
{
    $properties = mysqli_fetch_field_direct($objQuery, $field_offset);
    return is_object($properties) ? $properties->name : false;
}
$intNumField = mysqli_num_fields($objQuery);
$resultArray = array();
while ($obResult = mysqli_fetch_array($objQuery)) {
    $arrCol = array();
    for ($i = 0; $i < $intNumField; $i++) {
        $arrCol[mysqli_field_name($objQuery, $i)] = $obResult[$i];
    }
    array_push($resultArray, $arrCol);
}
mysqli_close($objConnect);
echo json_encode($resultArray);
