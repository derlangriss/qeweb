<?php
require 'connectdb.php';
if (isset($_GET['sCode'])) {
    if ($_GET['sCode'] !== '') {
        $strSQL = "SELECT * FROM collection
    left join specimens on (collection.idcollection = specimens.collection_idcollection)
    left join amphurs on (collection.amphurs_idamphurs = amphurs.idamphurs)
left join province on (amphurs.province_idprovince = province.idprovince)
    left join collectionmethods on (collection.collectionmethods_idcollectionmethods = collectionmethods.idcollectionmethods )
    left join collectors on (collection.collectors_idcollectors = collectors.idcollectors )
    WHERE coll_code  ILIKE '" . $_GET["sCode"] . "'
    order by coll_year desc limit 1";
    } else {

        $resultArray = array();
        $arr         = array('coll_code' => '', 'coll_year' => '', 'coll_number' => '', 'specimen_number' => '');
        array_push($resultArray, $arr);
        echo json_encode($resultArray);
        exit;
    }
}
if (isset($_GET['sYear'])) {
    if ($_GET['sYear'] !== '') {
        $strSQL = "SELECT * FROM collection
    left join specimens on (collection.idcollection = specimens.collection_idcollection)
    left join amphurs on (collection.amphurs_idamphurs = amphurs.idamphurs)
left join province on (amphurs.province_idprovince = province.idprovince)
    left join collectionmethods on (collection.collectionmethods_idcollectionmethods = collectionmethods.idcollectionmethods )
    left join collectors on (collection.collectors_idcollectors = collectors.idcollectors )
    WHERE coll_year  = '" . $_GET["sYear"] . "'
    order by coll_number desc  limit 1";
    } else {
        exit;
    }
}
if (isset($_GET['sNumber'])) {
    $strSQL = "SELECT * FROM collection
    left join specimens on (collection.idcollection = specimens.collection_idcollection)
    left join amphurs on (collection.amphurs_idamphurs = amphurs.idamphurs)
left join province on (amphurs.province_idprovince = province.idprovince)
    left join collectionmethods on (collection.collectionmethods_idcollectionmethods = collectionmethods.idcollectionmethods )
    left join collectors on (collection.collectors_idcollectors = collectors.idcollectors )
    WHERE coll_number  = '" . $_GET["sNumber"] . "'
    order by specimen_number desc  limit 1";
}
if (isset($_GET['sYear']) && isset($_GET['sNumber'])) {
    $strSQL = "SELECT coll_year,coll_number,specimen_number FROM collection
    LEFT JOIN specimens ON (collection.idcollection = specimens.collection_idcollection)
    LEFT JOIN amphurs ON (collection.amphurs_idamphurs = amphurs.idamphurs)
LEFT JOIN province ON (amphurs.province_idprovince = province.idprovince)
    LEFT JOIN collectionmethods ON (collection.collectionmethods_idcollectionmethods = collectionmethods.idcollectionmethods )
    LEFT JOIN collectors ON (collection.collectors_idcollectors = collectors.idcollectors )
    WHERE coll_year = '" . $_GET["sYear"] . "' AND coll_number = '" . $_GET["sNumber"] . "'
    ORDER BY specimen_number desc limit 1";
/*
WHERE coll_year = '".$_GET["sNumber"]."' AND coll_number  = '".$_GET["sNumber"]."'
order by specimen_number desc  limit 1";
 */
}
if (isset($_GET['sCode']) && isset($_GET['sYear']) && isset($_GET['sNumber']) && isset($_GET['sSpecnum'])) {
    $strSQL = "SELECT coll_year,coll_number,specimen_number FROM collection
    LEFT JOIN specimens ON (collection.idcollection = specimens.collection_idcollection)
    LEFT JOIN amphurs ON (collection.amphurs_idamphurs = amphurs.idamphurs)
LEFT JOIN province ON (amphurs.province_idprovince = province.idprovince)
    LEFT JOIN collectionmethods ON (collection.collectionmethods_idcollectionmethods = collectionmethods.idcollectionmethods )
    LEFT JOIN collectors ON (collection.collectors_idcollectors = collectors.idcollectors )
    WHERE coll_code = '" . $_GET["sCode"] . "' AND coll_year = '" . $_GET["sYear"] . "' AND coll_number = '" . $_GET["sNumber"] . "' AND specimen_number = '" . $_GET["sNumber"] . "'
    ORDER BY specimen_number desc limit 1";
/*
WHERE coll_year = '".$_GET["sNumber"]."' AND coll_number  = '".$_GET["sNumber"]."'
order by specimen_number desc  limit 1";
 */
}
$objQuery    = pg_query($strSQL);
$intNumField = pg_num_fields($objQuery);
$intNumRows  = pg_num_rows($objQuery);
$resultArray = array();
if ($intNumRows === 0) {
    $resultArray = array();
    $arr         = array('coll_code' => '', 'coll_year' => '', 'coll_number' => '', 'specimen_number' => '');
    array_push($resultArray, $arr);
}
while ($obResult = pg_fetch_array($objQuery)) {
    $arrCol = array();
    for ($i = 0; $i < $intNumField; $i++) {
        if (pg_field_name($objQuery, $i) == 'specimen_number') {
            if ($obResult[$i] == null) {
                $obResult[$i] = 1;
            } else {
                $obResult[$i] = $obResult[$i] + 1;
            }
            $obResult[$i] = sprintf('%04d', $obResult[$i]);
        }
        $arrCol[pg_field_name($objQuery, $i)] = $obResult[$i];
    }
    array_push($resultArray, $arrCol);
}
pg_close($objConnect);
echo json_encode($resultArray);
