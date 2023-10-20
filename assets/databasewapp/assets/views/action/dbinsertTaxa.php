<?php
$strMode     = $_POST["tMode"];
$strTaxatype = $_POST["ttaxatype"];
require 'connectdb.php';

if ($strMode == "ADD") {

    if ($strTaxatype == "Order") {

        $strSQL = "SELECT torder_name FROM torder ";
        $strSQL .= "WHERE torder_name   ILIKE '" . $_POST["torder_name"] . "'";
        $objQuery    = pg_query($strSQL);
        $intRowsColl = pg_num_rows($objQuery);
        if ($intRowsColl === 0) {
            $torder_name = htmlentities($_POST["torder_name"], ENT_QUOTES);
            $strSQL      = "INSERT INTO torder ";
            $strSQL .= "(torder_name)";
            $strSQL .= "VALUES ";
            $strSQL .= "('";
            $strSQL .= $torder_name;
            $strSQL .= "')";
            $objQuery = pg_query($strSQL);
            $answer   = array('answer' => 'added');
        } else {
            $answer = array('answer' => 'exist');
        }
        echo json_encode($answer);

    }
    if ($strTaxatype == "Family") {
        $tfamily_name     = htmlentities($_POST["tfamily_name"], ENT_QUOTES);
        $torder_torder_id = htmlentities($_POST["torder_id"], ENT_QUOTES);
        $strSQL           = "INSERT INTO family ";
        $strSQL .= "(family_name,torder_torder_id)";
        $strSQL .= "VALUES ";
        $strSQL .= "('";
        $strSQL .= $tfamily_name . "','" . $torder_torder_id;
        $strSQL .= "')";
        $objQuery = pg_query($strSQL);
    }
    if ($strTaxatype == "Genus") {
        $tgenus_name       = htmlentities($_POST["tgenus_name"], ENT_QUOTES);
        $sub_family        = htmlentities($_POST["tsub_family"], ENT_QUOTES);
        $tfamily_family_id = htmlentities($_POST["tfamily_id"], ENT_QUOTES);
        $strSQL            = "INSERT INTO genus ";
        $strSQL .= "(genus_name,sub_family,family_family_id)";
        $strSQL .= "VALUES ";
        $strSQL .= "('";
        $strSQL .= $tgenus_name . "','" . $sub_family . "','" . $tfamily_family_id;
        $strSQL .= "')";
        $objQuery = pg_query($strSQL);
    }
    if ($strTaxatype == "Species") {
        $tspecies_name   = htmlentities($_POST["tspecies_name"], ENT_QUOTES);
        $tsub_genus      = htmlentities($_POST["tsub_genus"], ENT_QUOTES);
        $tgenus_genus_id = htmlentities($_POST["tgenus_id"], ENT_QUOTES);
        $strSQL          = "INSERT INTO species ";
        $strSQL .= "(species_name,sub_genus,genus_genus_id)";
        $strSQL .= "VALUES ";
        $strSQL .= "('";
        $strSQL .= $tspecies_name . "','" . $tsub_genus . "','" . $tgenus_genus_id;
        $strSQL .= "')";
        $objQuery = pg_query($strSQL);
    }

}

pg_close($conn);
