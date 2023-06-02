<?php
require 'connectdb.php';

if (isset($_POST) && count($_POST)) {
    $strSQL = "SELECT * FROM preins_spec
left join collection on (preins_spec.preins_collid = collection.coll_id)
left join users_auth on (preins_spec.preins_staff_id = users_auth.uid)
WHERE preinsid  = '" . $_POST["tpreinsid"]."'";

    $objQuery    = pg_query($strSQL);
    $intNumField = pg_num_fields($objQuery);
    $resultArray = array();
    while ($obResult = pg_fetch_array($objQuery)) {
        $arrCol = array();
        for ($i = 0; $i < $intNumField; $i++) {
            if (pg_field_name($objQuery, $i) == 'specimens_number') {
                if ($obResult[$i] == null) {
                    $obResult[$i] = 1;
                }
                $obResult[$i] = sprintf('%04d', $obResult[$i]);
            }
            if (pg_field_name($objQuery, $i) == 'coll_number') {
                if ($obResult[$i] == null) {
                    $obResult[$i] = 1;
                } else {
                    $obResult[$i] = $obResult[$i];
                }
                $obResult[$i] = sprintf('%04d', $obResult[$i]);
            }
            $arrCol[pg_field_name($objQuery, $i)] = $obResult[$i];
        }
        array_push($resultArray, $arrCol);
    }
    pg_close($conn);
    echo json_encode($resultArray);
}
