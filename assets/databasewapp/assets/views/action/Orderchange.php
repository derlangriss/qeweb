<?php
if( ! ini_get('date.timezone') )
{
    date_default_timezone_set('GMT');
}
require('_header.php');
require('collnolib.php');
if ( isset($_GET['sCode']) )
    {
	$strSQL = "select * from torder
                  WHERE TRUE AND torder.idtorder  = '".$_GET["sCode"]."'  ";
	
	
	
	
	
	$objQuery = pg_query($strSQL);
	$intNumField = pg_num_fields($objQuery);
	$resultArray = array();
	while($obResult = pg_fetch_array($objQuery))
	{
		$arrCol = array();
		for($i=0;$i<$intNumField;$i++)
		{
			$arrCol[pg_field_name($objQuery,$i)] = $obResult[$i];
		}
		array_push($resultArray,$arrCol);
	}
	
	pg_close($conn);
	
	echo json_encode($resultArray);	
	
	
	
	
	}else{
$resultArray = array();
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


$arr = array('coll_code' => 'QSBG', 'coll_year' => $collyear, 'coll_number' => $count_number);
array_push($resultArray,$arr);

echo json_encode($resultArray);	
    }


    
    
?>
