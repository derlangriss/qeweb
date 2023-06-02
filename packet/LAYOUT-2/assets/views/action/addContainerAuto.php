<?php

require 'connectdb.php';

$strSQL = "select * from rcabinet ";
$strSQL .= "WHERE  rcabinet_id <> 0 ";
$strSQL .= "ORDER BY rcabinet ASC ";
$objQuery = pg_query($strSQL);
$s        = 1;
$q        = 1;
while ($row = pg_fetch_array($objQuery)) {
    extract($row);
    echo "<h4>".$rcabinet."</h4>";
    echo "<hr>";

    $b        = 4;
    $d        = 23;
    $e        = 'Q';
    $strSQL01 = "select * from cabinet ";
    $strSQL01 .= "WHERE  rcabinet_rcabinet_id =" . $rcabinet_id;
    $objQuery01 = pg_query($strSQL01);
    $intRows    = pg_num_rows($objQuery01);

    for ($i = 'A'; $i <= $e; $i++) {

        $lowerrow     = strtolower(substr($rcabinet, 0, 3));
        $char         = substr($rcabinet, 4);
        $mixlowerchar = "CABINET(" . $char . ")-" . $i;
        $count        = "CN" . sprintf('%03d', $s);

        if ($intRows > 0) {
            $row01 = pg_fetch_array($objQuery01);
            extract($row01);
            echo "<h4>".$cabinet."</h4>";

            $strSQLex = "select * from subcabinet ";
            $strSQLex .= "WHERE  cabinet_cabinet_id =" . $cabinet_id;
            $objQueryex = pg_query($strSQLex);
            $intRowsEX  = pg_num_rows($objQueryex);

            for ($k = 1; $k <= $b; $k++) {
                if ($intRowsEX > 0) {
                    $rowEx = pg_fetch_array($objQueryex);
                    extract($rowEx);
                    echo "<i>".$sub_cabinet."</i>";
                    echo "<br>";


                    $strSQLex01 = "select * from specimensbox ";
                    $strSQLex01 .= "WHERE  subcabinet_subcabinet_id =" . $subcabinet_id;
                    $objQueryex01 = pg_query($strSQLex01);
                    $intRowsEX01  = pg_num_rows($objQueryex01);


                    for ($l = 1; $l <= $d; $l++) {
                        if ($intRowsEX01 > 0) {
                            $rowEx01 = pg_fetch_array($objQueryex01);
                            extract($rowEx01);
                            echo $spec_box;
                            
                        }else{
                             $moJ = sprintf('%03d', $l);

                            $drawer     = "DR" . sprintf('%05d', $q);
                            $drawername = "DRAWER" . substr($sub_cabinet, 6) . "-" . $moJ;
                            echo $drawername." ".$drawer;
                            echo "<br>";

                            $strSQL04 = "INSERT INTO specimensbox ";
                            $strSQL04 .= "(spec_box,subcabinet_subcabinet_id,subcabinet_code)";
                            $strSQL04 .= "VALUES ";
                            $strSQL04 .= "('" . $drawername . "','" . $subcabinet_id . "','" . $drawer . "')";
                            $Result04 = pg_query($strSQL04);

                            $q++;
                        }

                        
                    
                    }






                }else{






                }





            }


            



        } else {

            $strSQL04 = "INSERT INTO cabinet ";
            $strSQL04 .= "(cabinet,rcabinet_rcabinet_id,cabinet_code)";
            $strSQL04 .= "VALUES ";
            $strSQL04 .= "('" . $mixlowerchar . "','" . $rcabinet_id . "','" . $count . "')";
            $Result04 = pg_query($strSQL04);
            $s++;
        }

    }

/*
$strSQL01 = "select count(*) AS countspec from prespecnumber ";
$strSQL01 .= "WHERE  exspecnumber >= 1 and excollyear = " . $excollyear . " and excollnumber =" . $excollnumber;
$objQuery01 = pg_query($strSQL01);

$row02 = pg_fetch_array($objQuery01);
extract($row02);

$strSQL03 = "UPDATE prepurecollid SET ";
$strSQL03 .= "specimenquality = '" . $countspec . "' ";
$strSQL03 .= "WHERE prepurecollyear   = '" . $excollyear . "'";
$strSQL03 .= " and prepurecollnumber   = '" . $excollnumber . "'";
$objQuery03 = pg_query($strSQL03);
 */
}

/*
$queryplace = lookuplga(lookupthaigeo($coll_long_dec, $coll_lat_dec));

while ($row02 = pg_fetch_array($queryplace)) {
extract($row02);
}

$strSQL = "UPDATE collection SET ";
$strSQL .= "amphur_amphur_id = '" . $amphur_id . "' ";
$strSQL .= ",tambon_tambon_id = '" . $tambon_id . "' ";
$strSQL .= ",tambon_direct_tambon_direct_id = '" . $amphur_id . "' ";
$strSQL .= ",amphur_direct_amphur_direct_id = '" . $tambon_id . "' ";
$strSQL .= "WHERE coll_id   = '" . $x . "'";
$objQuery = pg_query($strSQL);

 */
