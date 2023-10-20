<?php

function collnofn(){
require_once('connectdb.php');

$resultArray = array();
$sql= "select * from collection_counter LIMIT 1";
$res = pg_query($sql);
$intRows = pg_num_rows($res);

if($intRows>0){

$row=pg_fetch_array($res);
extract($row);

$curyear = date('Y'); 

if($year==$curyear)
  {
    //1. update year to current year
    //2. update count to 1
    $newcount = $count+1;
    $sql= "UPDATE collection_counter SET year = $curyear, count = $newcount";
  }
else
  {
    //1. leave year unchanged
    //2. increment count
    $sql= "UPDATE collection_counter SET year = $curyear, count = 1";
  }
//echo $sql;
$res = pg_query($sql);

$sql= "select * from collection_counter LIMIT 1";
$res = pg_query($sql);

$row=pg_fetch_array($res);
extract($row);

$count = sprintf('%04d',$count);

$collno = ("QSBG-".$year . "-" . $count);

$arr = array('coll_code' => 'QSBG', 'coll_year' => $year, 'coll_number' => $count);
}else{


$checkCollection = "SELECT * FROM collection";
$res = pg_query($checkCollection);
$intRows = pg_num_rows($res);

if($intRows>0){

$collyear = date('Y');
$sql2 = "INSERT INTO collection_counter(count,year) 
    SELECT DISTINCT MAX(coll_number)+1,".$collyear ." FROM collection WHERE coll_year = '".$collyear."' "; 

$res = pg_query($sql2);

$sql3= "select * from collection_counter LIMIT 1";
$res = pg_query($sql3);

$row=pg_fetch_array($res);
extract($row);

$count = sprintf('%04d',$count);

$collno = ("QSBG-".$year . "-" . $count);


$arr = array('coll_code' => 'QSBG', 'coll_year' => $year, 'coll_number' => $count);

}else{

$curyear = date('Y'); 
$year = $curyear;
$count = 1;
$arr = array('coll_code' => 'QSBG', 'coll_year' => $year, 'coll_number' => $count);

}

array_push($resultArray,$arr);

/*return $collno;*/
return $resultArray;
}



?>
