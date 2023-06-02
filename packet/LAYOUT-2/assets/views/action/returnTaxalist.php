<?php
require "postgresql2jsonPDO.class.php";
ini_set('display_errors', 1);
error_reporting(~0);
require 'connectdb.php';
if (isset($_GET['sOrder'])) {

    if ($_GET['sOrder'] !== '') {
        $query = "SELECT * FROM torder WHERE torder_name ILIKE '%" . $_GET['sOrder'] . "%' ORDER BY torder_id ASC ";
    } else {
        exit;
    }

}
if (isset($_GET['sFamily'])) {
    
    if ($_GET['sFamily'] !== '') {
        $query = "SELECT * FROM family WHERE family_name ILIKE '%" . $_GET['sFamily'] . "%'AND torder_torder_id =".$_GET['torderid']."
                                         ORDER BY family_id ASC ";
    } else {
        exit;
    }

}
if (isset($_GET['sGenus'])) {

    if ($_GET['sGenus'] !== '') {
        $query = "SELECT * FROM genus WHERE genus_name ILIKE '%" . $_GET['sGenus'] . "%'AND family_family_id =".$_GET['familyid']."
                                         ORDER BY genus_id ASC ";
    } else {
        exit;
    }

}
if (isset($_GET['sSpecies'])) {
    if ($_GET['sSpecies'] !== '') {
        $query = "SELECT * FROM species WHERE species_name ILIKE '%" . $_GET['sSpecies'] . "%'AND genus_genus_id =".$_GET['genusid']."
                                         ORDER BY species_id ASC ";
    } else {
        exit;
    }

}

$stmt = $PDOconn->prepare($query);
$stmt->execute();
$num  = $stmt->rowCount();
$json = new postgresql2jsonPDO;
$data = $json->getJSON($stmt, $num);
echo $data;
