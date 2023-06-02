<?php
$strMode     = $_POST["tMode"];
$strTaxatype = $_POST["ttaxatype"];
require 'connectdb.php';


if ($strMode == "ADD") {

    if ($strTaxatype == "Order") {
    	$torder_name = htmlentities($_POST["torder_name"], ENT_QUOTES);
        echo $torder_name;
    }
    if ($strTaxatype == "Family") {
        $strSQL = "INSERT INTO province_direct ";
        $strSQL .= "(province_direct_en,province_direct_th,country_direct_country_direct_id)";
        $strSQL .= "VALUES ";
        $strSQL .= "('";
        $strSQL .= $tprovince_direct_en_enter;
        $strSQL .= "','" . $tprovince_direct_th_enter;
        $strSQL .= "','" . $_POST["tcountry_direct_country_direct_id"];
        $strSQL .= "')";
        $objQuery = pg_query($strSQL);
    }
    if ($strTaxatype == "Genus") {
        $strSQL = "INSERT INTO province_direct ";
        $strSQL .= "(province_direct_en,province_direct_th,country_direct_country_direct_id)";
        $strSQL .= "VALUES ";
        $strSQL .= "('";
        $strSQL .= $tprovince_direct_en_enter;
        $strSQL .= "','" . $tprovince_direct_th_enter;
        $strSQL .= "','" . $_POST["tcountry_direct_country_direct_id"];
        $strSQL .= "')";
        $objQuery = pg_query($strSQL);
    }
    if ($strTaxatype == "Species") {
        $strSQL = "INSERT INTO province_direct ";
        $strSQL .= "(province_direct_en,province_direct_th,country_direct_country_direct_id)";
        $strSQL .= "VALUES ";
        $strSQL .= "('";
        $strSQL .= $tprovince_direct_en_enter;
        $strSQL .= "','" . $tprovince_direct_th_enter;
        $strSQL .= "','" . $_POST["tcountry_direct_country_direct_id"];
        $strSQL .= "')";
        $objQuery = pg_query($strSQL);
    }

}

pg_close($conn);
