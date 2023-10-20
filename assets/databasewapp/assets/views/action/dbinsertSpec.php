<?php
if (!ini_get('date.timezone')) {
    date_default_timezone_set('GMT');
}
$strMode = $_GET["tMode"];
require '_header.php';
require 'collnolib.php';
if ($strMode == "ADD") {
    $strSQL = "INSERT INTO specimens ";
    $strSQL .= "(collection_idcollection,specimen_number,torder_idtorder,family_idfamily,genus_idgenus,species_idspecies,taxatypes_idtaxatypes,specimenfullnumber)";
    $strSQL .= "VALUES ";
    $strSQL .= "('" . $_GET["tidcollection"] . "','" . $_GET["tspecimen_number"] . "','" . $_GET["tOrder_ID"] . "','" . $_GET["tFamily_ID"] . "','" . $_GET["tGenus_ID"] . "','" . $_GET["tSpecies_ID"] . "','" . $_GET["taxatype"] . "','" . $_GET["tspecimenfullnumber"] . "')";
    $objQuery = pg_query($strSQL);
}
if ($strMode == "UPDATE") {
    $mixcollection = $_POST["tcoll_code"] . "-" . $_POST["tcoll_year"] . "-" . $_POST["tcoll_number"];
    $strSQL        = "UPDATE collection SET ";
    $strSQL .= "collectionid = '$mixcollection' ";
    $strSQL .= ",coll_code = '" . $_POST["tcoll_code"] . "' ";
    $strSQL .= ",coll_year = '" . $_POST["tcoll_year"] . "' ";
    $strSQL .= ",coll_number = '" . $_POST["tcoll_number"] . "' ";
    $strSQL .= ",collectionmethods_idcollectionmethods = '" . $_POST["tcollection_method_ID"] . "' ";
    $strSQL .= ",amphurs_idamphurs = '" . $_POST["tamphur_ID"] . "' ";
    $strSQL .= ",collectionlocality = '" . $_POST["tlocality"] . "' ";
    $strSQL .= ",collectionspecificlocality = '" . $_POST["tspecific_locality"] . "' ";
    $strSQL .= ",collectionhabitat = '" . $_POST["thabitat"] . "' ";
    $strSQL .= ",collectionutm = '" . $_POST["tUTM"] . "' ";
    $strSQL .= ",collectors_idcollectors = '" . $_POST["tcollector_ID"] . "' ";
    $strSQL .= ",collectionmasl = '" . ($_POST["tMASL"] != '' ? $_POST["tMASL"] : 0) . "' ";
    $strSQL .= ",collectionnorthing = '" . ($_POST["tNorthing"] != '' ? $_POST["tNorthing"] : '0') . "' ";
    $strSQL .= ",collectioneasting = '" . ($_POST["tEasting"] != '' ? $_POST["tEasting"] : '0') . "' ";
    $strSQL .= ",collectionlatdec = '" . ($_POST["tlatdec"] != '' ? $_POST["tlatdec"] : '0') . "' ";
    $strSQL .= ",collectionlatd = '" . ($_POST["tlat_d"] != '' ? $_POST["tlat_d"] : '0') . "' ";
    $strSQL .= ",collectionlatm = '" . ($_POST["tlat_m"] != '' ? $_POST["tlat_m"] : '0') . "' ";
    $strSQL .= ",collectionlats = '" . ($_POST["tlat_s"] != '' ? $_POST["tlat_s"] : '0') . "' ";
    $strSQL .= ",collectionlongdec = '" . ($_POST["tlongdec"] != '' ? $_POST["tlongdec"] : '0') . "' ";
    $strSQL .= ",collectionlongd = '" . ($_POST["tlong_d"] != '' ? $_POST["tlong_d"] : '0') . "' ";
    $strSQL .= ",collectionlongm = '" . ($_POST["tlong_m"] != '' ? $_POST["tlong_m"] : '0') . "' ";
    $strSQL .= ",collectionlongs = '" . ($_POST["tlong_s"] != '' ? $_POST["tlong_s"] : '0') . "' ";
    $strSQL .= ",collectionstartdate = '" . ($_POST["tcollection_start_date"] != '' ? trim($_POST["tcollection_start_date"]) : '') . "' ";
    $strSQL .= ",collectionenddate = '" . ($_POST["tcollection_end_date"] != '' ? trim($_POST["tcollection_end_date"]) : '') . "' ";
    $strSQL .= "WHERE idcollection   = '" . $_POST["tidcollection"] . "' ";
    $objQuery = pg_query($strSQL);
}
$resultArray = array();
$sql         = "select specimen_number from collection
left join specimens on
(collection.idcollection = specimens.collection_idcollection)
left join collectionmethods on idcollectionmethods=collectionmethods_idcollectionmethods
left join amphurs on idamphurs=amphurs_idamphurs
left join province on idprovince=province_idprovince
left join collectors on idcollectors=collectors_idcollectors
order by coll_year desc, coll_number desc ,specimen_number desc limit 1";
$res = pg_query($sql);
$row = pg_fetch_array($res);
extract($row);
$real_spec_number = $specimen_number + 1;
$spec_number      = sprintf('%04d', $real_spec_number);
$arr              = array('sprintf_number' => $spec_number);
array_push($resultArray, $arr);
echo json_encode($resultArray);
pg_close($conn);
