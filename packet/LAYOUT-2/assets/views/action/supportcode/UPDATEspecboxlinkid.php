<?php

require 'connectdb.php';



$strSQL = "SELECT * FROM specimens ";
$strSQL .= "left join userlockbox on userlockbox.lockbox_boxid = specimens.container_id ";
$strSQL .= "left join container_type on container_type.container_type_id = specimens.container_type ";
$strSQL .= "left join collectionresbox on collectionresbox.collbox_id  = userlockbox.lockbox_boxid ";
$strSQL .= "where EXTRACT(MONTH FROM sreport_date) = EXTRACT(MONTH FROM lockbox_mreport) ";
$strSQL .= "AND EXTRACT(YEAR FROM sreport_date) = EXTRACT(YEAR FROM lockbox_mreport) ";


$objQuery = pg_query($strSQL);

while ($row = pg_fetch_array($objQuery)) {
extract($row);

$strSQL03 = "UPDATE specimens SET ";
$strSQL03 .= "specboxlink_id = '" . $lockbox_id . "' ";
$strSQL03 .= "WHERE specimens_id   = '" . $specimens_id . "'";
$objQuery03 = pg_query($strSQL03);


}
