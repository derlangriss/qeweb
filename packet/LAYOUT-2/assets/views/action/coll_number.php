<?php

require('connectdb.php');
$GetCollyear = $_POST['coll_year_on_inter'];
$intCollyear = (int)$GetCollyear;
    
    $strSQL = "SELECT DISTINCT MAX(coll_number)+1 AS newnumber FROM collection WHERE coll_year = '".$intCollyear."' ";    
    $objQuery = pg_query($strSQL);
    $intNumField = pg_num_fields($objQuery);
    $resultArray = array();
    while($obResult = pg_fetch_array($objQuery))
    {
        $arrCol = array();
        for($i=0;$i<$intNumField;$i++)
        {
            if(pg_field_name($objQuery,$i) == 'newnumber'){
                if($obResult[$i]==null){
                    $obResult[$i]=1;
                }
                
                $obResult[$i] = sprintf('%04d',$obResult[$i]);          
            }
            $arrCol[pg_field_name($objQuery,$i)] = $obResult[$i];
        }
        array_push($resultArray,$arrCol);
    }

    
    pg_close($conn);
    
    echo json_encode($resultArray); 
?>




