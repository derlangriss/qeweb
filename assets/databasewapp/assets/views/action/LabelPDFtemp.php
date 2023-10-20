<?php
require_once('LatexTemplate.php');
require 'connectdb.php';

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
	     if($_GET['labeltype']=="durable"){


		$strSQL = "SELECT DERABLELIST_ID,PICTURE_REF FROM durablelist
		           WHERE labeltype = '325'";

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
			if(pg_field_name($objQuery,$i) == 'numberofitemstoprint'){
				$number = $obResult[$i];			
			}

        $arrCol[pg_field_name($objQuery,$i)] = $obResult[$i];			
		}

		for($s=0;$s<$number;$s++)
		{
			array_push($resultArray,$arrCol);
		}
	}

	$labeltype = $_GET['labeltype'].".tex";	 




	  try {
		LatexTemplate::download($resultArray, $labeltype, 'label.pdf');
	      }
	  catch(Exception $e) {
		echo $e -> getMessage();
	      }     



?>