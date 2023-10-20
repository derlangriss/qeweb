<?php

function collnofn(){

require_once('_header.php');

$sql= "select * from collectioncounter LIMIT 1";
$res = pg_query($sql);

$row=pg_fetch_array($res);
extract($row);


$curyear = date('Y'); 


if($year==$curyear)
  {
    //1. update year to current year
    //2. update count to 1
    $newcount = $count+1;
    $sql= "UPDATE collectioncounter SET year = $curyear, count = $newcount";
  }
else
  {
    //1. leave year unchanged
    //2. increment count
    $sql= "UPDATE collectioncounter SET year = $curyear, count = 1";
  }

//echo $sql;

$res = pg_query($sql);

$sql= "select * from collectioncounter LIMIT 1";
$res = pg_query($sql);

$row=pg_fetch_array($res);
extract($row);


$count = sprintf('%04d',$count);
$collno = ("QSBG-".$year . "-" . $count);
return $collno;

}



?>
