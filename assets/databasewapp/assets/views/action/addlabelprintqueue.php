<?php
if( ! ini_get('date.timezone') )
{
    date_default_timezone_set('GMT');
}
$strMode = $_POST["tMode"];


require('_header.php');
require('collnolib.php');



if($strMode == "ADD")
{
	

	
	$strSQL = "INSERT INTO labelprintqueue ";
	$strSQL .="(labelidtoprint,numberofitemstoprint)";
	$strSQL .="VALUES ";
	$strSQL .="('".$_POST["tlabel_id"]."','".$_POST["tnumber_of_items"]."')";
	
	$objQuery=pg_query($strSQL);

	
	
}




$resultArray = array();

$sql= "SELECT SUM(numberofitemstoprint) AS totaltest FROM labelprintqueue";
$res = pg_query($sql);

$row=pg_fetch_array($res);
extract($row);



$arr = array('showtotal' => $totaltest);
array_push($resultArray,$arr);
echo json_encode($resultArray);	 
pg_close($conn);
  
?>	  