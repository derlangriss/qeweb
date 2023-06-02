<?php
require 'connectdb.php';


	$strSQL = "SELECT * FROM collection
	left join specimens on (collection.idcollection = specimens.collection_idcollection)
	left join amphurs on (collection.amphurs_idamphurs = amphurs.idamphurs)
        left join province on (amphurs.province_idprovince = province.idprovince)
	left join collectionmethods on (collection.collectionmethods_idcollectionmethods = collectionmethods.idcollectionmethods )
	left join collectors on (collection.collectors_idcollectors = collectors.idcollectors )
	
	order by coll_year desc,coll_number desc,specimen_number desc limit 1";


	
	
	
	$objQuery = pg_query($strSQL);
	$intNumField = pg_num_fields($objQuery);
	$resultArray = array();
	while($obResult = pg_fetch_array($objQuery))
	{
		$arrCol = array();
		for($i=0;$i<$intNumField;$i++)
		{
			if(pg_field_name($objQuery,$i) == 'specimen_number'){
				if($obResult[$i]==null){
					$obResult[$i]=1;
				}else{
					$obResult[$i]=$obResult[$i]+1;
				}
				
				$obResult[$i] = sprintf('%04d',$obResult[$i]);			
			}
			
			$arrCol[pg_field_name($objQuery,$i)] = $obResult[$i];
		}
		array_push($resultArray,$arrCol);
	}
	
	pg_close($objConnect);
	
	echo json_encode($resultArray);	

   




	
?>
