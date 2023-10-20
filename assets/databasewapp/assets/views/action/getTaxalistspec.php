<?php
require "postgresql2jsonPDO.class.php";
ini_set('display_errors', 1);
error_reporting(~0);

require 'connectdb.php';

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
