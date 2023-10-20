<?php
require('connectdb.php');




if (isset($_GET['sCode'])&&isset($_GET['sYear'])&&isset($_GET['sNumber'])&&isset($_GET['sSpecnum'])) 
    {
	
	$strSQL = "SELECT coll_code,coll_year,coll_number,specimens_number FROM collection
		LEFT JOIN specimens ON (collection.coll_id= specimens.collection_coll_id)
	    WHERE coll_code = '".$_GET["sCode"]."' AND coll_year = '".$_GET["sYear"]."' AND coll_number = '".$_GET["sNumber"]."' AND specimens_number = '".$_GET["sSpecnum"]."' ";

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
	
	pg_close($conn);
	
	echo json_encode($resultArray);	

   




	
?>
