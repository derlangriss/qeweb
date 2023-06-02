<?php
if (!ini_get('date.timezone')) {
    date_default_timezone_set('GMT');
}
require 'connectdb.php'; 
$specimens_id                     = $_POST["tspecimens_id"];
$taxatype_taxatype_id             = $_POST["ttaxatype"];
$collection_id                    = $_POST["tcoll_id"];
$species_species_id               = $_POST["tspecies_id"];
$scpecimens_number                = $_POST["tspecimens_number"];
$number_of_records                = $_POST["tnumber_of_record"];
$coll_code                        = $_POST["tcoll_code"];
$coll_year                        = $_POST["tcoll_year"];
$coll_number                      = $_POST["tcoll_number"];
$pinor_pinor_id                   = $_POST["tpinor_id"];
$labelor_labelor_id               = $_POST["tlabelor_id"];
$identification_identification_id = $_POST["tidentification_id"];
$spec_full_num                    = $coll_code . "-" . $coll_year . "-" . $coll_number . "-" . $scpecimens_number;

$strSQL = "SELECT specimens_full_number FROM specimens ";
$strSQL .= "WHERE specimens_full_number ILIKE '" . $spec_full_num . "'";
$objQuery    = pg_query($strSQL);
$intRowsColl = pg_num_rows($objQuery);
$resultArray = array();

if ($intRowsColl === 0) {
    $strMode = "ADD";
    for ($i = 0; $i <= $number_of_records - 1; $i++) {
        $specimens_numberplus  = $scpecimens_number + $i;
        $specimens_full_STR    = sprintf('%04d', $specimens_numberplus);
        $specimens_full_number = $coll_code . "-" . $coll_year . "-" . $coll_number . "-" . $specimens_full_STR;
        $strSQL                = "INSERT INTO specimens ";
        $strSQL .= "(species_species_id, collection_coll_id, taxatype_taxatype_id, specimens_number, specimens_full_number,pinor_pinor_id,labelor_labelor_id,identification_identification_id)";
        $strSQL .= "VALUES ";
        $strSQL .= "('" . $species_species_id . "','" . $collection_id . "','" . $taxatype_taxatype_id . "','" . $specimens_numberplus . "','" . $specimens_full_number . "','" . $pinor_pinor_id . "','" . $labelor_labelor_id . "','" . $identification_identification_id . "')";
        $objQuery = pg_query($strSQL);
    }
    $strSQLspecno = "SELECT MAX(specimens_number)+1 as specmaxnumber,coll_code,coll_year,coll_number,coll_id
FROM specimens
LEFT JOIN collection ON collection.coll_id = specimens.collection_coll_id
WHERE specimens.collection_coll_id = " . $collection_id . "
GROUP BY coll_code,coll_year,coll_number,coll_id";
    $objQueryspecno = pg_query($strSQLspecno);
    $row            = pg_fetch_array($objQueryspecno);
    extract($row);
    $newcoll_number = sprintf('%04d', $coll_number);
    $specimenNo     = sprintf('%04d', $specmaxnumber);
    $arr            = array(
        'coll_code'        => $coll_code,
        'coll_year'        => $coll_year,
        'coll_number'      => $newcoll_number,
        'coll_id'          => $coll_id,
        'specimens_number' => $specimenNo,
        'Ins_mode'         => $strMode,
    );
} else {
    $strMode     = "UPDATE";
    $resultArray = array();
    $strSQL      = "UPDATE specimens SET ";
    $strSQL .= "species_species_id = '" . $species_species_id . "' ";
    $strSQL .= ",taxatype_taxatype_id = '" . $taxatype_taxatype_id . "' ";
    $strSQL .= ",pinor_pinor_id = '" . $pinor_pinor_id . "' ";
    $strSQL .= ",labelor_labelor_id = '" . $labelor_labelor_id . "' ";
    $strSQL .= ",identification_identification_id = '" . $identification_identification_id . "' ";
    $strSQL .= "WHERE specimens_id   = '" . $specimens_id . "'";
    $objQuery = pg_query($strSQL);

    $strSQLspecno = "SELECT MAX(specimens_number)+1 as specmaxnumber,coll_code,coll_year,coll_number,coll_id
FROM specimens
LEFT JOIN collection ON collection.coll_id = specimens.collection_coll_id
WHERE specimens.collection_coll_id = " . $collection_id . "
GROUP BY coll_code,coll_year,coll_number,coll_id";
    $objQueryspecno = pg_query($strSQLspecno);
    $row            = pg_fetch_array($objQueryspecno);
    extract($row);
    $newcoll_number = sprintf('%04d', $coll_number);
    $specimenNo     = sprintf('%04d', $specmaxnumber);
    $arr            = array(
        'coll_code'        => $coll_code,
        'coll_year'        => $coll_year,
        'coll_number'      => $newcoll_number,
        'coll_id'          => $coll_id,
        'specimens_number' => $specimenNo,
        'Ins_mode'         => $strMode,
    );
}

array_push($resultArray, $arr);

echo json_encode($resultArray);
