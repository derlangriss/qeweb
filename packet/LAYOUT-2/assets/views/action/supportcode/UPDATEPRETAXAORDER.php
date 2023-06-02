<?php

require 'connectdb.php';
$unknownname = 'Unknown';

/** UPDATE pretaxaorder id **/


$strSQL = "select pretaxaorder,torder_id,pretaxa_id from pretaxa ";
$strSQL .= "left join torder on pretaxa.pretaxaorder = torder.torder_name ";
$strSQL .= "order by pretaxa_id ";

$objQuery = pg_query($strSQL);
while ($row = pg_fetch_array($objQuery)) {
extract($row);

echo $pretaxaorder . " " . $torder_id . " " . $pretaxa_id;
echo "<br>";

$strSQL03 = "UPDATE pretaxa SET ";
$strSQL03 .= "pretaxaorder_id = '" . $torder_id . "' ";
$strSQL03 .= "WHERE pretaxa_id   = '" . $pretaxa_id . "'";
$objQuery03 = pg_query($strSQL03);

} 
