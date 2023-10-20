<?php

require 'connectdb.php';
$boxid = $_POST['boxid'];
while ($row01 = pg_fetch_array($objQuery)) {
    extract($row01);
/*
    $strSQL04 = "UPDATE collectionresbox SET ";
    $strSQL04 .= "box_lock = '" . $boxstate . "' ";
    $strSQL04 .= "where pregenus_id = " . $boxid;
    $objQuery04 = pg_query($strSQL04);*/

}
