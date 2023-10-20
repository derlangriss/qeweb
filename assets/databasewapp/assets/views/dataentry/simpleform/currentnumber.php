<?php
if( ! ini_get('date.timezone') )
{
    date_default_timezone_set('GMT');
}
require('_header.php');
require('collnolib.php');


$sql= "select * from collectioncounter LIMIT 1";
$res = pg_query($sql);

$row=pg_fetch_array($res);
extract($row);

$curyear = date('Y'); 

if($year==$curyear)
  {
    $collyear = $curyear;
    $newcount = $count+1;
    $count = $newcount;
    
  }else{
    $collyear = $curyear;
    $count = 1;
   
  }

$count_number = sprintf('%04d',$count);
$collno = ("QSBG-".$collyear . "-" . $count_number);
?>
