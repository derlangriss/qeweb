<?php
if (!ini_get('date.timezone')) {
    date_default_timezone_set('GMT');
}
require '_header.php';
require 'collnolib.php';

if (isset($_GET['specid'])) {
    $strSQL = "SELECT * FROM specimens
	           LEFT JOIN collection ON specimens.collection_idcollection = collection.idcollection
	           WHERE specimens.idspecimens   = '" . $_GET["specid"] . "' order by specimen_number desc limit 1 ";
} else {
    $strSQL = "SELECT * FROM collection
			   LEFT JOIN specimens ON (collection.idcollection = specimens.collection_idcollection)
			   LEFT JOIN collectionmethods ON idcollectionmethods=collectionmethods_idcollectionmethods
			   LEFT JOIN amphurs ON idamphurs=amphurs_idamphurs
			   LEFT JOIN province ON idprovince=province_idprovince
			   LEFT JOIN collectors ON idcollectors=collectors_idcollectors
		       ORDER BY coll_year DESC, coll_number DESC ,specimen_number DESC LIMIT 1";

}

$objQuery    = pg_query($strSQL);
$intNumField = pg_num_fields($objQuery);
$resultArray = array();
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

pg_close($conn);

echo json_encode($resultArray);
