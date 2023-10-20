<?php
require 'connectdb.php';
$strSQL = "SELECT * FROM specimens
left join collection on (collection.idcollection = specimens.collection_idcollection)
left join torder on (specimens.torder_idtorder = torder.idtorder)
left join family on (specimens.family_idfamily = family.idfamily)
left join genus on (specimens.genus_idgenus = genus.idgenus)
left join species on (specimens.species_idspecies = species.idspecies)
WHERE coll_code  = '" . $_POST["sCode"] . "' AND coll_year  = '" . $_POST["sYear"] . "' AND coll_number  = '" . $_POST["sNumber"] . "' AND specimen_number = '" . $_POST["sSpecNumber"] . "'";
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
pg_close($objConnect);
echo json_encode($resultArray);
