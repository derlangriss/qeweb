<?php
if (!ini_get('date.timezone')) {
    date_default_timezone_set('GMT');
}
require '_header.php';
require 'collnolib.php';
if (empty($_GET['sCode'])) {

    echo json_encode($_GET['sCode']);

} else {
    $strSQL = "select * from torder
                    left join family on torder.idtorder = family.torder_idtorder
                    WHERE TRUE AND family.idfamily  = '" . $_GET["sCode"] . "'  ";

    $objQuery    = pg_query($strSQL);
    $intNumField = pg_num_fields($objQuery);
    $resultArray = array();
    while ($obResult = pg_fetch_array($objQuery)) {
        $arrCol = array();
        for ($i = 0; $i < $intNumField; $i++) {
            $arrCol[pg_field_name($objQuery, $i)] = $obResult[$i];
        }
        array_push($resultArray, $arrCol);
    }

    pg_close($conn);

    echo json_encode($resultArray);

}
