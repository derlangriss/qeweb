<?php
require "postgresql2jsonPDO.class.php";
ini_set('display_errors', 1);
error_reporting(~0);

require 'connectdb.php';

if (isset($_GET['cType'])) {
    if ($_GET['cType'] === 'ROWCABINET') {
         $query = "SELECT * FROM cabinet
                LEFT JOIN rcabinet ON rcabinet.rcabinet_id = cabinet.rcabinet_rcabinet_id
                WHERE cabinet_id <> 0
                AND rcabinet.rcabinet_id  = '" . $_GET["sRowCabinetId"] . "' ORDER BY cabinet";

    }
    if ($_GET['cType'] === 'CABINET') {
        $query = "SELECT * FROM subcabinet
                LEFT JOIN cabinet ON cabinet.cabinet_id = subcabinet.cabinet_cabinet_id
                WHERE subcabinet_id <> 0
                AND cabinet.cabinet_id  = '" . $_GET["sCabinetId"] . "' ORDER BY sub_cabinet";
    }
    if ($_GET['cType'] === 'LOCKER') {
        $query = "SELECT * FROM drawer
                LEFT JOIN subcabinet ON drawer.subcabinet_subcabinet_id = subcabinet.subcabinet_id
                WHERE drawer_id <> 0
                AND subcabinet.subcabinet_id  = '" . $_GET["sSubCabinetId"] . "' ORDER BY drawer_code";
    }
    if ($_GET['cType'] === 'DRAWER') {
        $query = "SELECT * FROM specimensbox
                LEFT JOIN drawer ON specimensbox.drawer_drawer_id = drawer.drawer_id
                WHERE drawer_id <> 0
                AND drawer.drawer_id  = '" . $_GET["sDrawertId"] . "' ORDER BY spec_box_code";
    }

}

/*
if (empty($_GET['sOrderid']) && $_GET['emptytaxa'] == "emptyorder") {

$query = "SELECT * FROM family ORDER BY familyname ASC ";

} else if ($_GET['emptytaxa'] == "emptyorder") {
$query = "SELECT * FROM torder
LEFT JOIN family ON torder.idtorder = family.torder_idtorder
WHERE TRUE
AND torder.idtorder  = '" . $_GET["sOrderid"] . "'";
}

if (empty($_GET['sFamilyid']) && $_GET['emptytaxa'] == "emptyfamily") {

$query = "SELECT * FROM genus ORDER BY genusname ASC ";

} else if ($_GET['emptytaxa'] == "emptyfamily") {
$query = "SELECT * FROM torder
LEFT JOIN family ON torder.idtorder = family.torder_idtorder
LEFT JOIN genus  ON family.idfamily = genus.family_idfamily
WHERE TRUE
AND family.idfamily  = '" . $_GET["sFamilyid"] . "'";
}

if (empty($_GET['sGenusid']) && $_GET['emptytaxa'] == "emptygenus") {

$query = "SELECT * FROM species ORDER BY speciesname ASC ";

} else if ($_GET['emptytaxa'] == "emptygenus") {
$query = "SELECT * FROM torder
LEFT JOIN family ON torder.idtorder = family.torder_idtorder
LEFT JOIN genus  ON family.idfamily = genus.family_idfamily
LEFT JOIN species ON genus.idgenus = species.genus_idgenus
WHERE TRUE
AND genus.idgenus  = '" . $_GET["sGenusid"] . "'";
}

if (empty($_GET['sSpeciesid']) && $_GET['emptytaxa'] == "emptyspecies") {

$query = "SELECT * FROM species ORDER BY speciesname ASC ";

} else if ($_GET['emptytaxa'] == "emptyspecies") {
$query = "SELECT * FROM torder
LEFT JOIN family ON torder.idtorder = family.torder_idtorder
LEFT JOIN genus  ON family.idfamily = genus.family_idfamily
LEFT JOIN species ON genus.idgenus = species.genus_idgenus
WHERE TRUE
AND species.idspecies  = '" . $_GET["sSpeciesid"] . "'";
}
 */
$stmt = $PDOconn->prepare($query);
$stmt->execute();
$num = $stmt->rowCount();

$json = new postgresql2jsonPDO;
$data = $json->getJSON($stmt, $num);
echo $data;

/*

if (isset($_GET['sTorder']) && isset($_GET['taxaspec'])=='order')
{
$query="SELECT * FROM torder
LEFT JOIN family ON torder.idtorder = family.torder_idtorder
WHERE TRUE
AND torder.idtorder  = '".$_GET["sTorder"]."'";
$stmt = $conn->prepare($query);
$stmt->execute();
$num=$stmt->rowCount();*/

/*}/*
if (isset($_GET['sTorder']) && isset($_GET['taxaspec'])=='family')
{
$query="SELECT * FROM torder
LEFT JOIN family ON torder.idtorder = family.torder_idtorder
LEFT JOIN genus  ON family.idfamily = genus.family_idfamily
WHERE TRUE
AND family.idfamily  = '".$_GET["sTorder"]."'";
$stmt = $conn->prepare($query);
$stmt->execute();
$num=$stmt->rowCount();
}*/

/*
if (isset($_GET['sOrderid']))
{
echo "order";
}

if (isset($_GET['sFamilyid']))
{
echo "family";
}
 */
