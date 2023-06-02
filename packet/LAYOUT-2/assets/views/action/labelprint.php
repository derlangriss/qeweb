<?php
require_once('LatexTemplate.php');
require 'connectdb.php';
        $strSQL= "SELECT * FROM labelprintqueue
	           left join collection on labelidtoprint=idcollection
	           left join collectionmethods on idcollectionmethods=collectionmethods_idcollectionmethods
		   left join amphurs on idamphurs = amphurs_idamphurs
		   left join province on idprovince = province_idprovince
		   left join collectors on idcollectors = collectors_idcollectors ";
        

	
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
        	           
      


	
	  try {
		LatexTemplate::download($resultArray, 'labelprint.tex', 'label.pdf');
	} catch(Exception $e) {
		echo $e -> getMessage();
	}      






?>
<html>
<head>
<title>LaTeX test (invoice)</title>
</head>
</html>
<body>
	<p>Click to generate an invoice with some data</p>
	<form>
		<input type="hidden" name="t" /> <input type="submit" value="Generate" />
	</form>
</body>
