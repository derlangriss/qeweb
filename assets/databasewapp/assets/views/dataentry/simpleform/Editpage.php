<?php
$hostname = "localhost";
$dbUser = "mkmorgangling";
$dbPass = "nepenthes";
$dbName = "qsbgcoll";
// connect to the database
$objConnect = pg_connect("host=$hostname dbname=$dbName user=$dbUser password=$dbPass") or die("Cannot connect to the database");
	
	$strSQL = "SELECT * FROM collection as spec left join collectionmethods on spec.collectionmethods_idcollectionmethods=collectionmethods.idcollectionmethods
left join amphurs on spec.amphurs_idamphurs=amphurs.idamphurs
left join province on amphurs.province_idprovince=province.idprovince WHERE TRUE AND idcollection  = '".$_GET["contactid"]."'  ";
	
	
	
	
	
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
	
	pg_close($objConnect);
	
	echo json_encode($resultArray);
?>
