<?php
$strMode    = $_POST["tMode"];
$strRowid   = $_POST["tRowid"];
$strConmode = $_POST["tConmode"];
require 'connectdb.php';

if ($strMode == "SELECT") {
    if ($strConmode == "ROW") {
        $strSQL = "SELECT * FROM cabinet ";
        $strSQL .= "LEFT JOIN rcabinet on rcabinet.rcabinet_id = cabinet.rcabinet_rcabinet_id ";
        $strSQL .= "WHERE rcabinet_rcabinet_id = '" . $strRowid . "'";
        $strSQL .= " ORDER BY cabinet_id";
        $objQuery    = pg_query($strSQL);
        $intRowsColl = pg_num_rows($objQuery);

        if ($intRowsColl > 0) {
            $intNumField = pg_num_fields($objQuery);
            $resultArray = array();
            while ($obResult = pg_fetch_array($objQuery)) {
                $arrCol = array();
                for ($i = 0; $i < $intNumField; $i++) {

                    $arrCol[pg_field_name($objQuery, $i)] = $obResult[$i];
                }
                array_push($resultArray, $arrCol);
            }

        }
    }
    if ($strConmode == "CABINET") {
        $strSQL = "SELECT * FROM subcabinet ";
        $strSQL .= "WHERE cabinet_cabinet_id = '" . $strRowid . "'";
        $strSQL .= " ORDER BY subcabinet_id";
        $objQuery    = pg_query($strSQL);
        $intRowsColl = pg_num_rows($objQuery);

        if ($intRowsColl > 0) {
            $intNumField = pg_num_fields($objQuery);
            $resultArray = array();
            while ($obResult = pg_fetch_array($objQuery)) {
                $arrCol = array();
                for ($i = 0; $i < $intNumField; $i++) {

                    $arrCol[pg_field_name($objQuery, $i)] = $obResult[$i];
                }
                array_push($resultArray, $arrCol);
            }

        }
    }
    if ($strConmode == "SUBCABINET") {
        $strSQL = "SELECT * FROM specimensbox ";
        $strSQL .= "LEFT JOIN drawer on specimensbox.drawer_drawer_id = drawer.drawer_id ";
        $strSQL .= "LEFT JOIN family on drawer.family_family_id = family.family_id ";
        $strSQL .= "LEFT JOIN subcabinet on subcabinet.subcabinet_id = drawer.subcabinet_subcabinet_id ";
        $strSQL .= "WHERE subcabinet_subcabinet_id = '" . $strRowid . "'";
        $strSQL .= " ORDER BY drawer_id";
        $objQuery    = pg_query($strSQL);
        $intRowsColl = pg_num_rows($objQuery);

        if ($intRowsColl > 0) {
            $intNumField = pg_num_fields($objQuery);
            $resultArray = array();
            while ($obResult = pg_fetch_array($objQuery)) {
                $arrCol = array();
                for ($i = 0; $i < $intNumField; $i++) {

                    $arrCol[pg_field_name($objQuery, $i)] = $obResult[$i];
                }
                array_push($resultArray, $arrCol);
            }

        }
    }
}

pg_close($conn);

echo json_encode($resultArray);
