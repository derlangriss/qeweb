<?php
$hostname = "localhost";
$dbUser = "mkmorgangling";
$dbPass = "nepenthes"; $dbName = "qsbgcoll"; 
// connect to the database
$objConnect = pg_connect("host=$hostname dbname=$dbName user=$dbUser password=$dbPass") or die("Cannot connect to the database");




if (isset($_GET['sCode'])&&isset($_GET['sYear'])&&isset($_GET['sNumber'])&&isset($_GET['sSpecnum'])) 
    {
	
	$strSQL = "SELECT coll_code,coll_year,coll_number,specimen_number FROM collection
	LEFT JOIN specimens ON (collection.idcollection = specimens.collection_idcollection)
	LEFT JOIN amphurs ON (collection.amphurs_idamphurs = amphurs.idamphurs)
    LEFT JOIN province ON (amphurs.province_idprovince = province.idprovince)
	LEFT JOIN collectionmethods ON (collection.collectionmethods_idcollectionmethods = collectionmethods.idcollectionmethods )
	LEFT JOIN collectors ON (collection.collectors_idcollectors = collectors.idcollectors )
	
	WHERE coll_code = '".$_GET["sCode"]."' AND coll_year = '".$_GET["sYear"]."' AND coll_number = '".$_GET["sNumber"]."' AND specimen_number = '".$_GET["sSpecnum"]."' ";

	/*
	
	WHERE coll_year = '".$_GET["sNumber"]."' AND coll_number  = '".$_GET["sNumber"]."' 
	order by specimen_number desc  limit 1";

	*/

    }    


    


  


	
	
	
	$objQuery = pg_query($strSQL);
	$intNumField = pg_num_fields($objQuery);
	$intNumRows = pg_num_rows($objQuery);
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
	
	pg_close($objConnect);
	
	echo json_encode($resultArray);	

   




	
?>
