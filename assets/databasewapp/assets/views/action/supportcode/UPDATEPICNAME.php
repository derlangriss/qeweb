<?php

require 'connectdbDu.php';



$strSQL = "select picture,durablelist_id,m_place_id from durablelist ";
$strSQL .= "ORDER BY durablelist_id ASC ";
$objQuery = pg_query($strSQL);

while ($row = pg_fetch_array($objQuery)) {
extract($row);

$realname = substr($picture,15);
$cutjpg = substr($realname,0,-4);


$strSQL03 = "UPDATE durablelist SET ";
$strSQL03 .= "pic_name = '" . $cutjpg . "' ";
$strSQL03 .= "WHERE durablelist_id   = '" . $durablelist_id . "'";
$objQuery03 = pg_query($strSQL03);


}
