<?php
if( ! ini_get('date.timezone') )
{
    date_default_timezone_set('GMT');
}
require('_header.php');
require('collnolib.php'); 

if ( isset($_GET['labeltype']) )  {
    

    if($_GET['labeltype']=="collection"){

	$strSQL = "SELECT * FROM labelprintqueue
	           LEFT JOIN collection ON labelidtoprint=idcollection
	           LEFT JOIN collectionmethods ON idcollectionmethods=collectionmethods_idcollectionmethods
			   LEFT JOIN amphurs ON idamphurs=amphurs_idamphurs
			   LEFT JOIN province ON idprovince = province_idprovince
			   LEFT JOIN collectors ON idcollectors = collectors_idcollectors
			   WHERE labeltype = '".$_GET["labeltype"]."'";
    }
    if($_GET['labeltype']=="specimen"){

	$strSQL = "SELECT * FROM labelprintqueue
	           LEFT JOIN specimens ON labelidtoprint=idspecimens
	           LEFT JOIN torder ON specimens.torder_idtorder=torder.idtorder
			   LEFT JOIN family ON specimens.family_idfamily=family.idfamily
			   LEFT JOIN genus ON specimens.genus_idgenus = genus.idgenus
			   LEFT JOIN species ON specimens.species_idspecies = species.idspecies
			   WHERE labeltype = '".$_GET["labeltype"]."'";
    }



 



	
	}
	
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
	
	
	
	
	
    
    
?>
