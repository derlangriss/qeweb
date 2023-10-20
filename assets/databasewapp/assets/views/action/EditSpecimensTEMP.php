<?php
if (!ini_get('date.timezone')) {
    date_default_timezone_set('GMT');
}
require 'connectdb.php';
require 'collnoeditlib.php';

if (isset($_GET['specid'])) {
    $strSQL = "SELECT * FROM specimens
	           LEFT JOIN collection on collection.coll_id = specimens.collection_coll_id
               LEFT JOIN species ON species.species_id = specimens.species_species_id
			   LEFT JOIN genus ON genus.genus_id = species.genus_genus_id
			   LEFT JOIN family ON family.family_id = genus.family_family_id
			   LEFT JOIN torder ON torder.torder_id = family.torder_torder_id
               LEFT JOIN taxatype ON taxatype.taxatype_id = specimens.taxatype_taxatype_id
	           WHERE specimens.specimens_id   = '" . $_GET["specid"] . "'";
} else {
    $strSQL = "SELECT coll_code, coll_year, coll_number, specimens_number,coll_id FROM collection
               LEFT JOIN specimens ON (collection.coll_id= specimens.collection_coll_id)
		       ORDER BY coll_year DESC, coll_number DESC ,specimens_number DESC LIMIT 1";

}

$objQuery    = pg_query($strSQL);
$intNumField = pg_num_fields($objQuery);
$resultArray = array();
while ($obResult = pg_fetch_array($objQuery)) {
    $arrCol = array();
    for ($i = 0; $i < $intNumField; $i++) {
        if (pg_field_name($objQuery, $i) == 'specimens_number') {
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
