<?php

require 'connectdb.php';

if (isset($_GET['sBoxid'])) {

    if ($_GET['sBoxid'] !== '') {
        $strSQL = "SELECT count(specimens_id) AS countspecinbox,count(specimens_id) AS countspecinbox,collbox_id,collboxno,state_color,boxstatus,boxstatus_id,boxlockstate_id,lockstate FROM specimens ";

        $strSQL .= "left join collectionresbox on collectionresbox.collbox_id = specimens.container_id ";
        $strSQL .= "left join container_type on container_type.container_type_id = specimens.container_type ";
        $strSQL .= "left join boxstatus on boxstatus.boxstatus_id = collectionresbox.box_status ";
        $strSQL .= "left join boxlockstate on boxlockstate.boxlockstate_id = collectionresbox.box_lock "; /*
        $strSQL .= "left join user_has_collresbox on collectionresbox.collbox_id = user_has_collresbox.collresbox_id ";
        $strSQL .= "left join users_auth on users_auth.uid = user_has_collresbox.user_id ";*/
        $strSQL .= "WHERE container_type = '" . $_GET["sContainer_type"] . "' AND collbox_id = '" . $_GET["sBoxid"] . "' ";
         $strSQL .= "GROUP BY collbox_id,state_color,state_color,boxstatus,boxstatus_id,boxlockstate_id,lockstate ";
        $strSQL .= "ORDER BY collbox_id ASC ";

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

    } else {
        exit;
    }

    pg_close($conn);

    echo json_encode($resultArray);
}
