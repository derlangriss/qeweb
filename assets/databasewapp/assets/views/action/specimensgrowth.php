<?php
require "postgresql2jsonPDO.class.php";
ini_set('display_errors', 1);
error_reporting(~0);
require 'connectdb.php';
$resultArray = array();
$resultArray01 = array();
$resultArray02 = array();
$resultArray03 = array();
$arrColex =array();
$strSQL = "SELECT COUNT(specimens_id) AS countspec,coll_year,specimens_trash FROM specimens ";
$strSQL .= "left join collection on collection.coll_id = specimens.collection_coll_id ";
$strSQL .= "where specimens_trash = 1 ";
$strSQL .= "GROUP BY coll_year,specimens_trash ";
$strSQL .= "ORDER BY coll_year DESC LIMIT 10";

$objQuery = pg_query($conn,$strSQL);
$intNumField = pg_num_fields($objQuery);

while ($obResult = pg_fetch_array($objQuery)) {
    extract($obResult);
    $arrCol = array();
    for ($i = 0; $i < $intNumField; $i++) {
        $arrCol[pg_field_name($objQuery, $i)] = (int)$obResult[$i];
    }
    array_push($resultArray, $arrCol['countspec']);
    array_push($resultArray03, $arrCol['coll_year']);
    
}
array_push($resultArray01, $resultArray);
$arrColex['ceachyear'] = $resultArray01;
$arrColex['cyear'] = $resultArray03;
array_push($resultArray02, $arrColex);
pg_close($conn);

echo json_encode($resultArray02);