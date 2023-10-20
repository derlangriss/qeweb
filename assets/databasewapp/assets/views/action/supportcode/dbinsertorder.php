<?php

require 'connectdb.php';

$strSQL = "select distinct(pretaxaorder) as pretaxaorder,torder_id from pretaxa ";
$strSQL .= "left join torder on  pretaxa.pretaxaorder = torder.torder_name ";
$strSQL .= "where torder_id IS NULL";


$objQuery = pg_query($strSQL);
 
while ($row01 = pg_fetch_array($objQuery)) {
    extract($row01);



  

    $strSQL03 = "INSERT INTO torder ";
    $strSQL03 .= "(torder_name)";
    $strSQL03 .= "VALUES ";
        $strSQL03 .= "('" . $pretaxaorder . "')";

    $objQuery03 = pg_query($strSQL03);

}

