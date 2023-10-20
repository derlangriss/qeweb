<?php

class postgresql2jsonPDO{
 function getJSON($resultSet,$affectedRecords,$collectorfield){
 
 $numberRows=0;
 $arrfieldName=array();
 $i=0;
 $json="";
	//print("Test");
 	while ($i < $resultSet->columnCount())  {
 		$meta = $resultSet->getColumnMeta($i);
                if (!$meta) {
		}else{
                $arrfieldName[$i]=$meta['name'];
		}
		$i++;
 	}
        
               
	$i=0;
	$json="[\n";
	while($row=$resultSet->fetch(PDO::FETCH_BOTH)) {
              
		$i++;
                $json.="{\n";
		for($r=0;$r < count($arrfieldName);$r++) {
                        
			$json.=" \"$collectorfield[$r]\" :	\"$row[$r]\"";
			if($r < count($arrfieldName)-1){
				$json.=",\n";
			}else{
				$json.="\n";
			}
		}
		if($i!=$affectedRecords){
		 	$json.="\n},\n";
		 }else{
		 	$json.="\n}\n";
		}
	}
	$json.="\n]";
	
	return $json;
 }
}
?>
