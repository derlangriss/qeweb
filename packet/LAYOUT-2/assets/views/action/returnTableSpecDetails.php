<?php
require 'connectdb.php';

$strSQL = "SELECT * FROM specimens
left join species on (specimens.species_species_id = species .species_id)
left join genus on (species.genus_genus_id = genus .genus_id)
left join family on (genus.family_family_id= family.family_id)
left join torder on (family.torder_torder_id = torder.torder_id)
left join collection on (specimens.collection_coll_id = collection.coll_id)
left join pinor on (specimens.pinor_pinor_id= pinor.pinor_id)
left join labelor on (specimens.labelor_labelor_id = labelor.labelor_id)
left join identification on (specimens.identification_identification_id = identification.identification_id)
left join taxatype on (specimens.taxatype_taxatype_id = taxatype.taxatype_id)
WHERE coll_code  = '" . $_POST["sCode"] . "' AND coll_year  = '" . $_POST["sYear"] . "' AND coll_number  = '" . $_POST["sNumber"] . "' AND specimens_number = '" . $_POST["sSpecNumber"] . "'";

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
