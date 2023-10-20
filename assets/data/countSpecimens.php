<?php

require 'connectdb.php';
$month       = $_GET['month'];
$year        = $_GET['year'];
$resultArray = array();

if (isset($_GET) && count($_GET)) {

    if (isset($_GET['tcontainer_type']) && count($_GET['tcontainer_id'])) {
        $container_type = $_GET['tcontainer_type'];
        $container_id   = $_GET['tcontainer_id'];

        $strSQLex = "SELECT count(specimens_id) AS countspecinbox FROM specimens ";
        $strSQLex .= "where specimens_trash = 1 AND EXTRACT(MONTH FROM sreport_date) = " . $month . " AND EXTRACT(YEAR FROM sreport_date) = " . $year . " ";
        $strSQLex .= "AND container_type = " . $container_type . " ";
        $strSQLex .= "AND container_id = " . $container_id;
        $objQueryex = pg_query($conn,$strSQLex);

        $rowex = pg_fetch_array($objQueryex);
        extract($rowex);

        $strSQLex01 = "SELECT count(specimens_id) AS countundefinedspecinbox FROM specimens ";
        $strSQLex01 .= "left join species on specimens.species_species_id  = species.species_id ";
        $strSQLex01 .= "left join genus on species.genus_genus_id = genus.genus_id ";
        $strSQLex01 .= "left join family on genus.family_family_id = family.family_id ";
        $strSQLex01 .= "left join torder on family.torder_torder_id = torder.torder_id ";
        $strSQLex01 .= "where specimens_trash = 1 AND EXTRACT(MONTH FROM sreport_date) = " . $month . " AND EXTRACT(YEAR FROM sreport_date) = " . $year . " ";
        $strSQLex01 .= "AND torder_id = 0 ";
        $strSQLex01 .= "AND container_type = " . $container_type . " ";
        $strSQLex01 .= "AND container_id = " . $container_id;
        $objQueryex01 = pg_query($conn,$strSQLex01);

        $rowex01 = pg_fetch_array($objQueryex01);
        extract($rowex01);

        $strSQLex02 = "SELECT lockbox_boxstatus FROM userlockbox ";
        $strSQLex02 .= "where EXTRACT(MONTH FROM lockbox_mreport) = " . $month . " AND EXTRACT(YEAR FROM lockbox_mreport) = " . $year . " ";
        $strSQLex02 .= "AND lockbox_boxid = " . $container_id;

        $objQueryex02 = pg_query($conn,$strSQLex02);

        $rowex02 = pg_fetch_array($objQueryex02);
        extract($rowex02);

        $boxstatus          = $lockbox_boxstatus;
        $specinbox          = $countspecinbox;
        $undefinedspecinbox = $countundefinedspecinbox;

    } else {
        $boxstatus          = 0;
        $specinbox          = 0;
        $undefinedspecinbox = 0;

    }

    $strSQL01 = "SELECT count(specimens_id) AS allspecimens FROM specimens ";
    $strSQL01 .= "where specimens_trash = 1 AND EXTRACT(MONTH FROM sreport_date) = " . $month . " AND EXTRACT(YEAR FROM sreport_date) = " . $year;
    $objQuery01 = pg_query($conn,$strSQL01);

    $row01 = pg_fetch_array($objQuery01);
    extract($row01);

    $strSQL02 = "SELECT count(specimens_id) AS resspecimens FROM specimens ";
    $strSQL02 .= "where specimens_trash = 1 AND container_id = 0 AND EXTRACT(MONTH FROM sreport_date) = " . $month . " AND EXTRACT(YEAR FROM sreport_date) = " . $year;
    $objQuery02 = pg_query($conn,$strSQL02);

    $row02 = pg_fetch_array($objQuery02);
    extract($row02);

    $strSQL03 = "SELECT count(specimens_id) AS undefinedspecimens FROM specimens ";
    $strSQL03 .= "left join species on specimens.species_species_id  = species.species_id ";
    $strSQL03 .= "left join genus on species.genus_genus_id = genus.genus_id ";
    $strSQL03 .= "left join family on genus.family_family_id = family.family_id ";
    $strSQL03 .= "left join torder on family.torder_torder_id = torder.torder_id ";
    $strSQL03 .= "where specimens_trash = 1 AND container_id = 0 AND EXTRACT(MONTH FROM sreport_date) = " . $month . " AND EXTRACT(YEAR FROM sreport_date) = " . $year . " ";
    $strSQL03 .= "AND torder_id = 0";
    $objQuery03 = pg_query($conn,$strSQL03);

    $row03 = pg_fetch_array($objQuery03);
    extract($row03);

    $strSQL04 = "SELECT (SELECT count(specimens_id) FROM specimens ";
    $strSQL04 .= "left join species on specimens.species_species_id  = species.species_id ";
    $strSQL04 .= "left join genus on species.genus_genus_id = genus.genus_id ";
    $strSQL04 .= "left join family on genus.family_family_id = family.family_id ";
    $strSQL04 .= "left join torder on family.torder_torder_id = torder.torder_id ";
    $strSQL04 .= "where specimens_trash = 1 AND EXTRACT(MONTH FROM sreport_date) = " . $month . " AND EXTRACT(YEAR FROM sreport_date) = " . $year . " ";
    $strSQL04 .= "AND container_type = 0";
    $strSQL04 .= "AND torder_id > 0)+";
    $strSQL04 .= "(SELECT count(specimens_id) FROM specimens ";
    $strSQL04 .= "left join species on specimens.species_species_id  = species.species_id ";
    $strSQL04 .= "left join genus on species.genus_genus_id = genus.genus_id ";
    $strSQL04 .= "left join family on genus.family_family_id = family.family_id ";
    $strSQL04 .= "left join torder on family.torder_torder_id = torder.torder_id ";
    $strSQL04 .= "where specimens_trash = 1 AND EXTRACT(MONTH FROM sreport_date) = " . $month . " AND EXTRACT(YEAR FROM sreport_date) = " . $year . " ";
    $strSQL04 .= "AND container_type > 0) AS countregist";
    $objQuery04 = pg_query($conn,$strSQL04);

    $row04 = pg_fetch_array($objQuery04);
    extract($row04);

    $strSQL05 = "SELECT count(specimens_id) AS countmanaged FROM specimens ";
    $strSQL05 .= "where specimens_trash = 1 AND EXTRACT(MONTH FROM sreport_date) = " . $month . " AND EXTRACT(YEAR FROM sreport_date) = " . $year . " ";
    $strSQL05 .= "AND container_type = 2";
    $objQuery05 = pg_query($conn,$strSQL05);

    $row05 = pg_fetch_array($objQuery05);
    extract($row05);

    $strSQL06 = "SELECT count(DISTINCT family_id) AS countfamily FROM specimens ";
    $strSQL06 .= "left join species on specimens.species_species_id  = species.species_id ";
    $strSQL06 .= "left join genus on species.genus_genus_id = genus.genus_id ";
    $strSQL06 .= "left join family on genus.family_family_id = family.family_id ";
    $strSQL06 .= "left join torder on family.torder_torder_id = torder.torder_id ";
    $strSQL06 .= "where specimens_trash = 1 AND EXTRACT(MONTH FROM sreport_date) = " . $month . " AND EXTRACT(YEAR FROM sreport_date) = " . $year . " ";
    $strSQL06 .= "AND family_id > 0";

    $objQuery06 = pg_query($conn,$strSQL06);

    $row06 = pg_fetch_array($objQuery06);
    extract($row06);

    $arr = array('success' => '1', 'resspecimens' => $resspecimens, 'allspecimens' => $allspecimens, 'undefinedspecimens' => $undefinedspecimens, 'countregist' => $countregist, 'countmanaged' => $countmanaged, 'countfamily' => $countfamily, 'specinbox' => $specinbox, 'undefinedspecinbox' => $undefinedspecinbox, 'boxstatus' => $boxstatus);
    array_push($resultArray, $arr);

    echo json_encode($resultArray);

}
