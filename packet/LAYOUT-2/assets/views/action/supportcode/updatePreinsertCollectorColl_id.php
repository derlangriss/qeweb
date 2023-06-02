<?php

require 'connectdb.php';

$strSQL = "SELECT coll_id,prelim_id from preinsertcollector ";
$strSQL .= "LEFT JOIN collection on CONCAT(collection.coll_code,'-',collection.coll_year,'-',collection.coll_number) = preinsertcollector.precollfullid ";


$objQuery = pg_query($strSQL);

while ($row01 = pg_fetch_array($objQuery)) {
    extract($row01); 

    $strSQL03 = "UPDATE preinsertcollector SET ";
    $strSQL03 .= "precollector_collid = '" . $coll_id . "' ";
    $strSQL03 .= "WHERE prelim_id   = '" . $prelim_id . "'";
  
    $objQuery03 = pg_query($strSQL03);

}
 