<?php
if( ! ini_get('date.timezone') )
{ 
    date_default_timezone_set('GMT');
}
require('connectdb.php');
require('collnoeditlib.php');
$resultArray = array();
if ( isset($_GET['collid']) ){



    $strSQL = "SELECT * FROM collection as coll
                left join method on coll.method_method_id=method.method_id
                left join tambon on coll.tambon_tambon_id=tambon.tambon_id 
                left join amphur on coll.amphur_amphur_id=amphur.amphur_id
                left join donation on coll.donation_donation_id=donation.donation_id
                left join province on amphur.province_province_id=province.province_id
                
                left join tambon_direct on coll.tambon_direct_tambon_direct_id=tambon_direct.tambon_direct_id
                left join amphur_direct on coll.amphur_direct_amphur_direct_id=amphur_direct.amphur_direct_id
                left join province_direct on amphur_direct.province_direct_province_direct_id=province_direct.province_direct_id

                left join collection_has_collector on coll.coll_id = collection_has_collector.collection_coll_id
                left join collector on collector.collector_id =  collection_has_collector.collector_collector_id
                WHERE TRUE AND coll_id  = '".$_GET["collid"]."' 
                ORDER BY collection_has_collector.collectorseq";
    $objQuery = pg_query($strSQL);
    $intRowsColl = pg_num_rows($objQuery);

    if($intRowsColl>0){
    $intNumField = pg_num_fields($objQuery);
    $resultArray = array();
    while($obResult = pg_fetch_array($objQuery))
    {
        $arrCol = array();
        for($i=0;$i<$intNumField;$i++)
        {
          if(pg_field_name($objQuery,$i) == 'coll_number'){
            if($obResult[$i]==null){
              $obResult[$i]=1;
            }
            
            $obResult[$i] = sprintf('%04d',$obResult[$i]);      
          }
          
          $arrCol[pg_field_name($objQuery,$i)] = $obResult[$i];
        }
        array_push($resultArray,$arrCol);
    }

    }else{

              $collyear = date('Y');
              $sql2 = "INSERT INTO collection_counter(count,year) 
                  SELECT DISTINCT MAX(coll_number)+1,".$collyear ." FROM collection WHERE coll_year = '".$collyear."' "; 

              $res = pg_query($sql2);

              $sql3= "select * from collection_counter LIMIT 1";
              $res = pg_query($sql3);

              $row=pg_fetch_array($res);
              extract($row);

              $count = sprintf('%04d',$count);

              $collno = ("QSBG-".$year . "-" . $count);


              $arr = array('coll_code' => 'QSBG', 'coll_year' => $year, 'coll_number' => $count);
              array_push($resultArray,$arr);    
    
    }
    
    
    
    

}else{  

    $resultArray = array();
    $CollCountsql= "select * from collection_counter LIMIT 1";
    $res = pg_query($CollCountsql);
    $intRowsCount = pg_num_rows($res);

    
    $checkCollection = "SELECT * FROM collection";
    $resColl = pg_query($checkCollection);
    $intRowsColl = pg_num_rows($resColl);

     if($intRowsColl>0){

            
                
                $sql2 = "SELECT DISTINCT coll_year, MAX(coll_number)+1 AS newnumber FROM collection group by coll_year"; 
                $res = pg_query($sql2);
                $row=pg_fetch_array($res);
                extract($row);
                $newcount = $newnumber; 
                $count_number =sprintf('%04d',$newcount);
                $arr = array('coll_code' => 'QSBG', 'coll_year' => $coll_year, 'coll_number' => $count_number);
                array_push($resultArray,$arr);
          





     }else{



                $resultArray =  nocollfn(); 
         


     }  



     







}

   
echo json_encode($resultArray); 

    
    
?>