<?php
require_once('LatexTemplate.php');
$hostname = "localhost";
$dbUser = "mkmorgangling";
$dbPass = "nepenthes";
$dbName = "durable02"; 

// connect to the database 
$objConnect = mysqli_connect($hostname,$dbUser,$dbPass,$dbName) or die("Cannot connect to the database");
	
	if ( isset($_GET['labeltype']) )  {
	    
/*
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

	    }*/
	     if($_GET['labeltype']=="durable"){


		$strSQL = "SELECT DURABLELIST_ID,DURABLE_NO_MAIN,PLACE_ID,STATUS_ID FROM durablelist
		           WHERE PLACE_ID = 7 AND STATUS_ID = 1 and durablelist_id<=400";

		     
	    }
		
	}
	
        
	$objQuery = mysqli_query($objConnect,$strSQL) or die (mysqli_error($objConnect));

    function mysqli_field_name($objQuery, $field_offset)
	{
    $properties = mysqli_fetch_field_direct($objQuery, $field_offset);
    return is_object($properties) ? $properties->name : false;
	}



	$intNumField = mysqli_num_fields($objQuery);
	$resultArray = array();
	while($obResult = mysqli_fetch_array($objQuery))
	{
		$arrCol = array();
		for($i=0;$i<$intNumField;$i++)
		{
		$arrCol[mysqli_field_name($objQuery,$i)] = $obResult[$i];
		}
		array_push($resultArray,$arrCol);
	}
 


	$labeltype = $_GET['labeltype'].".tex";	 




	  try {
		LatexTemplate::download($resultArray, $labeltype, 'label.pdf');
	      }
	  catch(Exception $e) {
		echo $e -> getMessage();
	      }     



?>