<?php
require_once 'libs/lgalookuplib.php';
require 'connectdb.php';

$strSQL = "SELECT coll_id,coll_lat_dec,coll_long_dec FROM collection ";
$strSQL .= "WHERE coll_year = 2006";
/*
$strSQL .= "and coll_number >= 5000";
$strSQL .= "and coll_number < 7000";*/
/* and coll_number > 150 and coll_number < 300 */

$stmt = $PDOconn->prepare($strSQL);
$stmt->execute();

$num = $stmt->rowCount();
if ($num != 0) {

    $intNumField = $stmt->columnCount();
    while ($result = $stmt->fetch(PDO::FETCH_ASSOC)) {

        for ($i = 0; $i < $intNumField; $i++) {
            $col     = $stmt->getColumnMeta($i);
            $columns = $col['name'];

            $arrCol[$columns] = $result[$columns];
        }

        $queryplace = lookuplga(lookupthaigeo($arrCol['coll_long_dec'],$arrCol['coll_lat_dec']));

        while ($row02 = pg_fetch_array($queryplace)) {
            extract($row02);

            $strSQL = "UPDATE collection SET ";
            $strSQL .= "amphur_amphur_id = '" . $amphur_id . "' ";
            $strSQL .= ",tambon_tambon_id = '" . $tambon_id . "' ";
            $strSQL .= ",tambon_direct_tambon_direct_id = '" . $amphur_id . "' ";
            $strSQL .= ",amphur_direct_amphur_direct_id = '" . $tambon_id . "' ";
            $strSQL .= "WHERE coll_id   = " .$arrCol['coll_id'] ;
            $objQuery = pg_query($strSQL);
        }

       /* array_push($resultArray, $arrCol);*/
    }
} else {
    $arrCol['success'] = 'no';
    array_push($resultArray, $arrCol);
}
pg_close($conn);




/*
for ($x = 6515; $x <= 6536; $x++) {
    $strSQL = "SELECT coll_lat_dec,coll_long_dec FROM collection ";
    $strSQL .= "WHERE coll_id   = " . $x;
    $objQuery = pg_query($strSQL);
    $row01    = pg_fetch_array($objQuery);
    extract($row01);

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


}
*/

