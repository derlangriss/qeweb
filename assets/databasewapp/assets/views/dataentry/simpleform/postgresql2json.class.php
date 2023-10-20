<?php
/** 
* Filename: mysql2json.class.php 
* Purpose: Convert mysql resultset data into JSON(http://json.org) format
* Author: Adnan Siddiqi <kadnan@gmail.com> 
* License: PHP License 
* Date: Tuesday,June 21, 2006 
*
*/
class postgresql2json{
 function getJSON($resultSet,$affectedRecords){
 $numberRows=0;
 $arrfieldName=array();
 $i=0;
 $json="";
	//print("Test");
 	while ($i < pg_num_fields($resultSet))  {
 		$meta = pg_field_name($resultSet, $i);
                if (!$meta) {
		}else{
                $arrfieldName[$i]=$meta;
		}
		$i++;
 	}
        
        
	$i=0;
	$json="[\n";
	while($row=pg_fetch_array($resultSet,NULL, PGSQL_BOTH)) {
		$i++;
                $json.="{\n";
		for($r=0;$r < count($arrfieldName);$r++) {
                        
			$json.=" \"$arrfieldName[$r]\" :	\"$row[$r]\"";
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
