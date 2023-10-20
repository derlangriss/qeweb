<?php

$strMode = $_POST["tMode"];


require('_header.php');
require('collnolib.php');

if($strMode == "ADD")
{
	
	//'".$_POST["tMASL"]."','".$_POST["tNorthing"]."','".$_POST["tEasting"]."','".$_POST["tlong_d"]."','".$_POST["tlong_m"]."','".$_POST["tlong_s"]."'
	//'".$_POST["tlat_d"]."','".$_POST["tlat_m"]."','".$_POST["tlat_s"]."'
	//

	if($_POST["tMASL"]!=""){
	$statementadd .= ",collectionmasl";	
	$valuesadd .= ",'".$_POST["tMASL"]."'";	
	}
        if($_POST["tNorthing"]!=""){
	$statementadd .= ",collectionnorthing";		
	$valuesadd .= ",'".$_POST["tNorthing"]."'";		
	}
	
	$strSQL = "INSERT INTO collection ";
	$strSQL .="(collectionid,collectionmethods_idcollectionmethods,amphurs_idamphurs,collectionstartdate,collectionenddate,collectionlocality,collectionspecificlocality,collectionhabitat,collectionUTM,collectors_idcollectors$statementadd)";
	$strSQL .="VALUES ";
	$strSQL .="('".$_POST["tcollection_ID"]."','".$_POST["tcollection_method_ID"]."','".$_POST["tamphur_ID"]."' ";
	$strSQL .=",'".$_POST["tcollection_start_date"]."','".$_POST["tcollection_end_date"]."','".$_POST["tlocality"]."' ";
	$strSQL .=",'".$_POST["tspecific_locality"]."','".$_POST["thabitat"]."' ";
	$strSQL .=",'".$_POST["tUTM"]."','".$_POST["tcollector_ID"]."'$valuesadd )";
	

	
	
	$objQuery = pg_query($strSQL);
	$newcollnumber = collnofn();
}
$sql= "select * from collectioncounter LIMIT 1";
$res = pg_query($sql);

$row=pg_fetch_array($res);
extract($row);


$count = sprintf('%04d',$count);
$collno = ("QSBG-".$year . "-" . $count);



?>

<input type="text" class="collection" id="txtcollection_ID" name="txtcollection_ID" value="<?=$collno;?>" />
<?

pg_close($conn);
?>