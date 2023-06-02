<?php
if (!ini_get('date.timezone')) {
    date_default_timezone_set('GMT');
}
$strMode = $_POST["tMode"];
require 'connectdb.php';
require 'collnolib.php';

 
if ($strMode == "ADD") {

    $start   = trim($_POST["tcoll_start_date"]);
    $end     = trim($_POST["tcoll_end_date"]);
    $testtest = $_POST["tcollectorid"];
    $test = '[  
   { 
     "id": 10
     
   },  
   { 
     "id": 12
      
   },  
   { 
     "id": 13
      
   },  
   { 
     "id": 14
      
   },  
   { 
     "id": 15
      
   },  
   { 
     "id": 16
      
   },  
   { 
     "id": 17
      
   },  
   { 
     "id": 18
      
   },  
   { 
     "id": 19
      
   },  
   { 
     "id": 20
      
   },  
   { 
     "id": 21
      
   },  
   { 
     "id": 22
      
   },  
   { 
     "id": 23
      
   }]';

var_dump($testtest);

var_dump($test);
 
     $arraytest = json_decode($testtest, true);
     foreach($arraytest as $row) //Extract the Array Values by using Foreach Loop
          {
            $idtest = $row["id"];
             $stmt = $newconn->prepare("INSERT INTO collection_has_collector(collector_collector_id) VALUES (".$idtest.")");
             $stmt->execute();           
                    
          }
   
/*
    if ($_POST["tmethod_method_id"] == '') {
        exit;
    }
    if ($_POST["tamphur_amphur_id"] == '') {
        exit;
    } 
    if ($start == '') {
        exit; 
    }
    if ($end == '') {
        exit; 
    }
    if ($start > $end) {
        exit;
    }
    if ($_POST["tcoll_year"] == '') {
        $_POST["tcoll_year"] = $curyear;
    }
*/

    /*
    $collfullid = $_POST["tcoll_code"] . "-" . $_POST["tcoll_year"] . "-" . $_POST["tcoll_number"];

    $strSQL = "with sample_ids as (";
    $strSQL .= "INSERT INTO collection ";
    $strSQL .= "(coll_full_id,coll_locality,coll_specific_locality,coll_habitat,coll_utm,coll_code,coll_year,coll_number";
    $strSQL .= ($_POST["tcoll_masl"]!=''?',coll_masl':'');
    $strSQL .= ($_POST["tcoll_northing"]!=''?',coll_northing':'');
    $strSQL .= ($_POST["tcoll_easting"]!=''?',coll_easting':'');
    $strSQL .= ($_POST["tcoll_lat_dec"] != '' ?',coll_lat_dec':'');
    $strSQL .= ($_POST["tcoll_lat_d"] != '' ?',coll_lat_d':'');
    $strSQL .= ($_POST["tcoll_lat_m"] != '' ?',coll_lat_m':'');
    $strSQL .= ($_POST["tcoll_lat_s"] != '' ?',coll_lat_s':'');
    $strSQL .= ($_POST["tcoll_long_dec"] != '' ?',coll_long_dec':'');
    $strSQL .= ($_POST["tcoll_long_d"] != '' ?',coll_long_d':'');
    $strSQL .= ($_POST["tcoll_long_m"] != '' ?',coll_long_m':'');
    $strSQL .= ($_POST["tcoll_long_s"] != '' ?',coll_long_s':'');
    $strSQL .= ($_POST["tcoll_start_date"]!=''?',coll_start_date':'');
    $strSQL .= ($_POST["tcoll_end_date"]!=''?',coll_end_date':'');
    $strSQL .= ($_POST["tamphur_amphur_id"]!=''?',amphur_amphur_id':'');   
    $strSQL .= ($_POST["ttambon_tambon_id"]!=''?',tambon_tambon_id':'');
    $strSQL .= ($_POST["tamphur_direct_amphur_direct_id"]!=''?',amphur_direct_amphur_direct_id':'');   
    $strSQL .= ($_POST["ttambon_direct_tambon_direct_id"]!=''?',tambon_direct_tambon_direct_id':'');
    $strSQL .= ($_POST["tmethod_method_id"]!=''?',method_method_id':'');
    $strSQL .= ($_POST["tdonations_id"]!=''?',donations_id':'');
    $strSQL .= ")";
    $strSQL .= "VALUES ";
    $strSQL .= "('" . $collfullid . "'";
    $strSQL .= ",'" . $_POST["tcoll_locality"] . "','" . $_POST["tcoll_specific_locality"] . "'";
    $strSQL .= ",'" . $_POST["tcoll_thabitat"] . "','" . $_POST["tcoll_utm"] . "'";
    $strSQL .= ",'" . $_POST["tcoll_code"] . "','" . $_POST["tcoll_year"] . "'";
    $strSQL .= ",'" . $_POST["tcoll_number"] . "'";  
    $strSQL .= ($_POST["tcoll_masl"] != '' ? ',' . $_POST["tcoll_masl"] : '');
    $strSQL .= ($_POST["tcoll_northing"] != '' ? ',' . $_POST["tcoll_northing"] : '');
    $strSQL .= ($_POST["tcoll_easting"] != '' ? ',' . $_POST["tcoll_easting"] : ''); 
    $strSQL .= ($_POST["tcoll_lat_dec"] != '' ? ',' . $_POST["tcoll_lat_dec"] : '');
    $strSQL .= ($_POST["tcoll_lat_d"] != '' ? ',' . $_POST["tcoll_lat_d"] : '');
    $strSQL .= ($_POST["tcoll_lat_m"] != '' ? ',' . $_POST["tcoll_lat_m"] : '');
    $strSQL .= ($_POST["tcoll_lat_s"] != '' ? ',' . $_POST["tcoll_lat_s"] : '');
    $strSQL .= ($_POST["tcoll_long_dec"] != '' ? ',' . $_POST["tcoll_long_dec"] : '');
    $strSQL .= ($_POST["tcoll_long_d"] != '' ? ',' . $_POST["tcoll_long_d"] : '');
    $strSQL .= ($_POST["tcoll_long_m"] != '' ? ',' . $_POST["tcoll_long_m"] : '');
    $strSQL .= ($_POST["tcoll_long_s"] != '' ? ',' . $_POST["tcoll_long_s"] : '');
    $strSQL .= ($_POST["tcoll_start_date"]!=''?','."'".$start."'":'');
    $strSQL .= ($_POST["tcoll_end_date"]!=''?','."'".$end."'":'');
    $strSQL .= ($_POST["tamphur_amphur_id"] != '' ? ',' . $_POST["tamphur_amphur_id"] : '');
    $strSQL .= ($_POST["ttambon_tambon_id"] != '' ? ',' . $_POST["ttambon_tambon_id"] : '');
    $strSQL .= ($_POST["tamphur_direct_amphur_direct_id"] != '' ? ',' . $_POST["tamphur_direct_amphur_direct_id"] : '');
    $strSQL .= ($_POST["ttambon_direct_tambon_direct_id"] != '' ? ',' . $_POST["ttambon_direct_tambon_direct_id"] : '');
    $strSQL .= ($_POST["tmethod_method_id"] != '' ? ',' . $_POST["tmethod_method_id"] : '');
    $strSQL .= ($_POST["tdonations_id"] != '' ? ',' . $_POST["tdonations_id"] : '');
    $strSQL .= ") RETURNING coll_id )";
    $strSQL .= ", sample1_ids as(";
    $strSQL .= "INSERT INTO collection_has_collector";
    $strSQL .= "(collector_collector_id, collection_coll_id)";
    $strSQL .= "select coll_id,'2'";
    $strSQL .= "from sample_ids ";
    $strSQL .= "RETURNING collection_has_collector_id)";
  






    $strSQL .= " SELECT coll_id from sample_ids;";


    $objQuery  = pg_query($strSQL);
    $newnumber =collnofn();
*/

}
if ($strMode == "UPDATE") {
    $mixcollection = $_POST["tcoll_code"] . "-" . $_POST["tcoll_year"] . "-" . $_POST["tcoll_number"];
    $strSQL        = "UPDATE collection SET ";
    $strSQL .= "collectionid = '$mixcollection' ";
    $strSQL .= ",coll_code = '" . $_POST["tcoll_code"] . "' ";
    $strSQL .= ",coll_year = '" . $_POST["tcoll_year"] . "' ";
    $strSQL .= ",coll_number = '" . $_POST["tcoll_number"] . "' ";
    $strSQL .= ",collectionmethods_idcollectionmethods = '" . $_POST["tcollection_method_ID"] . "' ";
    $strSQL .= ",amphurs_idamphurs = '" . $_POST["tamphur_ID"] . "' ";
    $strSQL .= ",collectionlocality = '" . $_POST["tlocality"] . "' ";
    $strSQL .= ",collectionspecificlocality = '" . $_POST["tspecific_locality"] . "' ";
    $strSQL .= ",collectionhabitat = '" . $_POST["thabitat"] . "' ";
    $strSQL .= ",collectionutm = '" . $_POST["tUTM"] . "' ";
    $strSQL .= ",collectors_idcollectors = '" . $_POST["tcollector_ID"] . "' ";
    $strSQL .= ",collectionmasl = '" . ($_POST["tMASL"] != '' ? $_POST["tMASL"] : 0) . "' ";
    $strSQL .= ",collectionnorthing = '" . ($_POST["tNorthing"] != '' ? $_POST["tNorthing"] : '0') . "' ";
    $strSQL .= ",collectioneasting = '" . ($_POST["tEasting"] != '' ? $_POST["tEasting"] : '0') . "' ";
    $strSQL .= ",collectionlatdec = '" . ($_POST["tlatdec"] != '' ? $_POST["tlatdec"] : '0') . "' ";
    $strSQL .= ",collectionlatd = '" . ($_POST["tlat_d"] != '' ? $_POST["tlat_d"] : '0') . "' ";
    $strSQL .= ",collectionlatm = '" . ($_POST["tlat_m"] != '' ? $_POST["tlat_m"] : '0') . "' ";
    $strSQL .= ",collectionlats = '" . ($_POST["tlat_s"] != '' ? $_POST["tlat_s"] : '0') . "' ";
    $strSQL .= ",collectionlongdec = '" . ($_POST["tlongdec"] != '' ? $_POST["tlongdec"] : '0') . "' ";
    $strSQL .= ",collectionlongd = '" . ($_POST["tlong_d"] != '' ? $_POST["tlong_d"] : '0') . "' ";
    $strSQL .= ",collectionlongm = '" . ($_POST["tlong_m"] != '' ? $_POST["tlong_m"] : '0') . "' ";
    $strSQL .= ",collectionlongs = '" . ($_POST["tlong_s"] != '' ? $_POST["tlong_s"] : '0') . "' ";
    $strSQL .= ",collectionstartdate = '" . ($_POST["tcollection_start_date"] != '' ? trim($_POST["tcollection_start_date"]) : '') . "' ";
    $strSQL .= ",collectionenddate = '" . ($_POST["tcollection_end_date"] != '' ? trim($_POST["tcollection_end_date"]) : '') . "' ";

    $strSQL .= "WHERE idcollection   = '" . $_POST["tidcollection"] . "' ";
    $objQuery = pg_query($strSQL);
}
$resultArray = array();
$sql= "select * from collection_counter LIMIT 1";
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
$arr = array('coll_code' => 'QSBG', 'coll_year' => $collyear, 'coll_number' => $count_number);
array_push($resultArray, $arr);

echo json_encode($resultArray);

pg_close($conn);
?>