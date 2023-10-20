<?php
if( ! ini_get('date.timezone') )
{
    date_default_timezone_set('GMT');
}
$strMode = $_POST["tMode"];

 
require('_header.php');
require('collnolib.php');



if($strMode == "ADD")
{
	
	$start = strtotime( $_POST["tcollection_start_date"] );
	$end = strtotime ($_POST["tcollection_end_date"]);
        $curyear = date('Y'); 
	
	
	
	
        if($_POST["tcollection_method_ID"]==''){
	exit;
        }
	if($_POST["tcollector_ID"]==''){
	exit;
        }
	if($_POST["tamphur_ID"]==''){
	exit;
        } 
	if($start==''){
	exit;
        }
	if($end==''){
	exit;
	}
	if($start > $end){
	exit;
	}
	if($_POST["tcollection_method_ID"]==''){
	exit;
        }
	if($_POST["tcoll_year"]==''){
	$_POST["tcoll_year"]=$curyear;
        }	
	$_POST["tcollection_ID"] = $_POST["tcoll_code"]."-".$_POST["tcoll_year"]."-".$_POST["tcoll_number"];
	
	$strSQL = "INSERT INTO collection ";
	$strSQL .="(collectionid,coll_code,coll_year,coll_number,collectionmethods_idcollectionmethods,amphurs_idamphurs,collectionlocality,collectionspecificlocality,collectionhabitat,collectionUTM,collectors_idcollectors".($_POST["tMASL"]!=''?',collectionmasl':'').($_POST["tNorthing"]!=''?',collectionnorthing':'').($_POST["tEasting"]!=''?',collectioneasting':'').($_POST["tlatdec"]!=''?',collectionlatdec':'').($_POST["tlat_d"]!=''?',collectionlatd':'').($_POST["tlat_m"]!=''?',collectionlatm':'').($_POST["tlat_s"]!=''?',collectionlats':'').($_POST["tlongdec"]!=''?',collectionlongdec':'').($_POST["tlong_d"]!=''?',collectionlongd':'').($_POST["tlong_m"]!=''?',collectionlongm':'').($_POST["tlong_s"]!=''?',collectionlongs':'').($_POST["tcollection_start_date"]!=''?',collectionstartdate':'').($_POST["tcollection_end_date"]!=''?',collectionenddate':'').")";
	$strSQL .="VALUES ";
	$strSQL .="('".$_POST["tcollection_ID"]."','".$_POST["tcoll_code"]."','".$_POST["tcoll_year"]."','".$_POST["tcoll_number"]."','".$_POST["tcollection_method_ID"]."','".$_POST["tamphur_ID"]."','".$_POST["tlocality"]."' ";
	$strSQL .=",'".$_POST["tspecific_locality"]."','".$_POST["thabitat"]."' ";
	$strSQL .=",'".$_POST["tUTM"]."','".$_POST["tcollector_ID"]."'".($_POST["tMASL"]!=''?','.$_POST["tMASL"]:'').($_POST["tNorthing"]!=''?','.$_POST["tNorthing"]:'').($_POST["tEasting"]!=''?','.$_POST["tEasting"]:'').($_POST["tlatdec"]!=''?','.$_POST["tlatdec"]:'').($_POST["tlat_d"]!=''?','.$_POST["tlat_d"]:'').($_POST["tlat_m"]!=''?','.$_POST["tlat_m"]:'').($_POST["tlat_s"]!=''?','.$_POST["tlat_s"]:'').($_POST["tlongdec"]!=''?','.$_POST["tlongdec"]:'').($_POST["tlong_d"]!=''?','.$_POST["tlong_d"]:'').($_POST["tlong_m"]!=''?','.$_POST["tlong_m"]:'').($_POST["tlong_s"]!=''?','.$_POST["tlong_s"]:'').($_POST["tcollection_start_date"]!=''?','."'".trim($_POST["tcollection_start_date"])."'":'').($_POST["tcollection_end_date"]!=''?','."'".trim($_POST["tcollection_end_date"])."'":'')." )";
	
	$objQuery=pg_query($strSQL);
	$newnumber =collnofn();
	
	
}

if($strMode == "UPDATE")

{
$mixcollection = $_POST["tcoll_code"]."-".$_POST["tcoll_year"]."-".$_POST["tcoll_number"]; 
    
$strSQL = "UPDATE collection SET ";
$strSQL .="collectionid = '$mixcollection' ";
$strSQL .=",coll_code = '".$_POST["tcoll_code"]."' ";
$strSQL .=",coll_year = '".$_POST["tcoll_year"]."' ";
$strSQL .=",coll_number = '".$_POST["tcoll_number"]."' ";
$strSQL .=",collectionmethods_idcollectionmethods = '".$_POST["tcollection_method_ID"]."' ";
$strSQL .=",amphurs_idamphurs = '".$_POST["tamphur_ID"]."' ";
$strSQL .=",collectionlocality = '".$_POST["tlocality"]."' ";
$strSQL .=",collectionspecificlocality = '".$_POST["tspecific_locality"]."' ";
$strSQL .=",collectionhabitat = '".$_POST["thabitat"]."' ";
$strSQL .=",collectionutm = '".$_POST["tUTM"]."' ";
$strSQL .=",collectors_idcollectors = '".$_POST["tcollector_ID"]."' ";
$strSQL .=",collectionmasl = '".($_POST["tMASL"]!=''?$_POST["tMASL"]:0)."' ";
$strSQL .=",collectionnorthing = '".($_POST["tNorthing"]!=''?$_POST["tNorthing"]:'0')."' ";
$strSQL .=",collectioneasting = '".($_POST["tEasting"]!=''?$_POST["tEasting"]:'0')."' ";
$strSQL .=",collectionlatdec = '".($_POST["tlatdec"]!=''?$_POST["tlatdec"]:'0')."' ";
$strSQL .=",collectionlatd = '".($_POST["tlat_d"]!=''?$_POST["tlat_d"]:'0')."' ";
$strSQL .=",collectionlatm = '".($_POST["tlat_m"]!=''?$_POST["tlat_m"]:'0')."' ";
$strSQL .=",collectionlats = '".($_POST["tlat_s"]!=''?$_POST["tlat_s"]:'0')."' ";
$strSQL .=",collectionlongdec = '".($_POST["tlongdec"]!=''?$_POST["tlongdec"]:'0')."' ";
$strSQL .=",collectionlongd = '".($_POST["tlong_d"]!=''?$_POST["tlong_d"]:'0')."' ";
$strSQL .=",collectionlongm = '".($_POST["tlong_m"]!=''?$_POST["tlong_m"]:'0')."' ";
$strSQL .=",collectionlongs = '".($_POST["tlong_s"]!=''?$_POST["tlong_s"]:'0')."' ";
$strSQL .=",collectionstartdate = '".($_POST["tcollection_start_date"]!=''?trim($_POST["tcollection_start_date"]):'')."' ";
$strSQL .=",collectionenddate = '".($_POST["tcollection_end_date"]!=''?trim($_POST["tcollection_end_date"]):'')."' ";	
$strSQL .="WHERE idcollection	 = '".$_POST["tidcollection"]."' ";
$objQuery = pg_query($strSQL);
}

$resultArray = array();
$sql= "select * from collectioncounter LIMIT 1";
$res = pg_query($sql);
$row=pg_fetch_array($res);
extract($row);

$curyear = date('Y'); 

if($year==$curyear)
  {
    $collyear = $curyear;
    $newcount = $count+1;
    $count = $newcount;
    
  }else{
    $collyear = $curyear;
    $count = 1;
   
  }

$count_number = sprintf('%04d',$count);
$collno = ("QSBG-".$collyear . "-" . $count_number);


$arr = array('code' => 'QSBG', 'year' => $collyear, 'number' => $count_number);
array_push($resultArray,$arr);

echo json_encode($resultArray);	

pg_close($conn);
?>