<?php
require_once 'LatexTemplate.php';
// connect to the database
require 'connectdb.php';

if (isset($_GET['reportcontype']) && isset($_GET['reportboxid']) && isset($_GET['reportmonth']) && isset($_GET['reportyear'])) {

    $containertype = $_GET['reportcontype'];
    $boxid         = $_GET['reportboxid'];
    $month         = $_GET['reportmonth'];
    $year          = $_GET['reportyear'];

    $strSQL = "SELECT * from specimens ";
    $strSQL .= "left join collection on collection.coll_id = specimens.collection_coll_id ";
    $strSQL .= "left join collectionresbox on collectionresbox.collbox_id = specimens.container_id ";
    $strSQL .= "left join species on specimens.species_species_id  = species.species_id ";
    $strSQL .= "left join genus on species.genus_genus_id = genus.genus_id ";
    $strSQL .= "left join family on genus.family_family_id = family.family_id ";
    $strSQL .= "left join torder on family.torder_torder_id = torder.torder_id ";
    $strSQL .= "WHERE collbox_id ='" . $boxid . "' AND container_type ='" . $containertype . "' ";
    $strSQL .= "AND EXTRACT(MONTH FROM sreport_date) = " . $month . " AND EXTRACT(YEAR FROM sreport_date) = " . $year . " ";
    $strSQL .= "ORDER BY coll_full_id  ASC,minspec ASC";

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

}

$reporttype = "speclisteachbox.tex";
echo json_encode($resultArray);
/*
try {
    LatexTemplate::download($resultArray, $reporttype, 'label.pdf');
} catch (Exception $e) {
    echo $e->getMessage();
}
*/